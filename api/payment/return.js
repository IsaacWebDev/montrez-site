// PayFast Return URL Handler
// GET /api/payment/return
// User lands here after payment on PayFast (success or cancel)

import { getOrderById } from '../utils/supabase.js';
import { logTransaction } from '../utils/payfast.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    const { order_id } = req.query;

    if (!order_id) {
      // No order ID - redirect to home
      return res.redirect(302, '/');
    }

    // Get order from database
    const order = await getOrderById(order_id);

    if (!order) {
      console.error('[PayFast Return] Order not found:', order_id);
      logTransaction('return_error', { reason: 'order_not_found', order_id });
      
      // Redirect to error page
      return res.redirect(302, '/order-not-found');
    }

    logTransaction('return_received', {
      order_id: order.id,
      order_number: order.order_number,
      payment_status: order.payment_status
    });

    // Redirect based on payment status
    if (order.payment_status === 'paid') {
      // Payment successful - redirect to confirmation page
      return res.redirect(302, `/order-confirmation?order_number=${order.order_number}&status=success`);
    } else if (order.payment_status === 'failed') {
      // Payment failed - redirect with error
      return res.redirect(302, `/checkout?error=payment_failed&order_number=${order.order_number}`);
    } else {
      // Payment pending - redirect to pending page
      // PayFast ITN might not have arrived yet (can take a few seconds)
      return res.redirect(302, `/order-confirmation?order_number=${order.order_number}&status=pending`);
    }

  } catch (error) {
    console.error('[PayFast Return] Error:', error);
    logTransaction('return_error', { error: error.message });
    
    // Redirect to generic error page
    return res.redirect(302, '/checkout?error=unknown');
  }
}
