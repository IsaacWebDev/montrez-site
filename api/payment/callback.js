// PayFast ITN (Instant Transaction Notification) Callback Handler
// POST /api/payment/callback
// Receives payment notifications from PayFast servers

import { getOrderById, updateOrderPayment } from '../utils/supabase.js';
import { 
  verifySignature, 
  verifyPayFastIP, 
  getClientIP, 
  validateAmount,
  parseAmount,
  logTransaction,
  getPayFastConfig
} from '../utils/payfast.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  try {
    // Get client IP
    const clientIP = getClientIP(req);
    
    // Verify IP is from PayFast (security check)
    if (!verifyPayFastIP(clientIP)) {
      console.error('[PayFast] Invalid IP:', clientIP);
      logTransaction('callback_rejected', { reason: 'invalid_ip', ip: clientIP });
      return res.status(403).send('Forbidden');
    }

    // Parse POST data
    const data = req.body;
    
    // Log incoming ITN
    logTransaction('callback_received', data);

    // Extract signature
    const receivedSignature = data.signature;
    delete data.signature; // Remove signature from data for verification

    // Verify signature
    const config = getPayFastConfig();
    if (!verifySignature(data, receivedSignature, config.passphrase)) {
      console.error('[PayFast] Invalid signature');
      logTransaction('callback_rejected', { reason: 'invalid_signature', data });
      return res.status(400).send('Invalid signature');
    }

    // Get order from database
    const orderId = data.m_payment_id; // This is our order UUID
    
    if (!orderId) {
      console.error('[PayFast] Missing m_payment_id');
      logTransaction('callback_rejected', { reason: 'missing_order_id', data });
      return res.status(400).send('Missing order ID');
    }

    const order = await getOrderById(orderId);
    
    if (!order) {
      console.error('[PayFast] Order not found:', orderId);
      logTransaction('callback_rejected', { reason: 'order_not_found', order_id: orderId });
      return res.status(404).send('Order not found');
    }

    // Validate amount matches order total
    const payfastAmount = parseAmount(data.amount_gross);
    if (!validateAmount(payfastAmount, order.total)) {
      console.error('[PayFast] Amount mismatch. Expected:', order.total, 'Got:', payfastAmount);
      logTransaction('callback_rejected', { 
        reason: 'amount_mismatch', 
        order_id: orderId,
        expected: order.total,
        received: payfastAmount
      });
      return res.status(400).send('Amount mismatch');
    }

    // Determine payment status from PayFast payment_status
    let paymentStatus;
    if (data.payment_status === 'COMPLETE') {
      paymentStatus = 'paid';
    } else if (data.payment_status === 'FAILED' || data.payment_status === 'CANCELLED') {
      paymentStatus = 'failed';
    } else {
      paymentStatus = 'pending';
    }

    // Update order in database
    const updatedOrder = await updateOrderPayment(orderId, {
      status: paymentStatus,
      paymentId: data.pf_payment_id, // PayFast's internal payment ID
      fullData: data // Store full ITN data for audit
    });

    logTransaction('callback_processed', {
      order_id: orderId,
      order_number: updatedOrder.order_number,
      payment_status: paymentStatus,
      pf_payment_id: data.pf_payment_id
    });

    // Send order confirmation email if payment successful
    if (paymentStatus === 'paid') {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://montrez.vercel.app';
        await fetch(`${baseUrl}/api/send-order-confirmation`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: updatedOrder.id })
        });
      } catch (emailError) {
        console.error('[PayFast] Email notification failed:', emailError);
        // Don't fail ITN if email fails
      }
    }

    // PayFast requires 200 OK response
    return res.status(200).send('OK');

  } catch (error) {
    console.error('[PayFast] Callback error:', error);
    logTransaction('callback_error', { error: error.message });
    
    // Return 200 to prevent PayFast retries on permanent errors
    return res.status(200).send('Error logged');
  }
}
