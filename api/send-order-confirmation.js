// Send Order Confirmation Email via Resend
// POST /api/send-order-confirmation
// Sends professional order confirmation email after successful payment

import { Resend } from 'resend';
import { getOrderById } from './utils/supabase.js';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Generate HTML email template for order confirmation
 */
function generateOrderEmailHTML(order) {
  const formatAmount = (cents) => `R${(cents / 100).toFixed(2)}`;
  
  const itemsHTML = order.items.map(item => `
    <tr style="border-bottom: 1px solid #eee;">
      <td style="padding: 15px 0;">
        <strong>${item.name}</strong><br/>
        ${item.size ? `Size: ${item.size}` : ''} 
        ${item.color ? `Color: ${item.color}` : ''}
      </td>
      <td style="padding: 15px 0; text-align: center;">${item.quantity}</td>
      <td style="padding: 15px 0; text-align: right;">${formatAmount(item.price)}</td>
      <td style="padding: 15px 0; text-align: right; font-weight: bold;">${formatAmount(item.price * item.quantity)}</td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation - MONTREZ</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #000 0%, #1a1a1a 100%); padding: 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 800; letter-spacing: 2px;">MONTREZ</h1>
              <p style="margin: 10px 0 0 0; color: #888; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Premium Streetwear</p>
            </td>
          </tr>

          <!-- Success Message -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center;">
              <div style="width: 60px; height: 60px; background-color: #10b981; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-size: 30px;">✓</span>
              </div>
              <h2 style="margin: 0 0 10px 0; color: #000; font-size: 28px; font-weight: 700;">Order Confirmed!</h2>
              <p style="margin: 0; color: #666; font-size: 16px;">Thank you for your purchase, ${order.customer_name}.</p>
            </td>
          </tr>

          <!-- Order Details -->
          <tr>
            <td style="padding: 0 40px 20px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; padding: 20px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Order Number</p>
                    <p style="margin: 0; color: #000; font-size: 20px; font-weight: 700;">${order.order_number}</p>
                  </td>
                  <td align="right">
                    <p style="margin: 0 0 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Order Date</p>
                    <p style="margin: 0; color: #000; font-size: 14px;">${new Date(order.created_at).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Items -->
          <tr>
            <td style="padding: 20px 40px;">
              <h3 style="margin: 0 0 20px 0; color: #000; font-size: 18px; font-weight: 700; text-transform: uppercase;">Order Items</h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr style="border-bottom: 2px solid #000;">
                  <th style="padding: 10px 0; text-align: left; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Item</th>
                  <th style="padding: 10px 0; text-align: center; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Qty</th>
                  <th style="padding: 10px 0; text-align: right; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Price</th>
                  <th style="padding: 10px 0; text-align: right; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Total</th>
                </tr>
                ${itemsHTML}
              </table>
            </td>
          </tr>

          <!-- Totals -->
          <tr>
            <td style="padding: 20px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 8px 0; color: #666;">Subtotal</td>
                  <td style="padding: 8px 0; text-align: right; color: #000;">${formatAmount(order.subtotal)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Shipping</td>
                  <td style="padding: 8px 0; text-align: right; color: #000;">${formatAmount(order.shipping_cost)}</td>
                </tr>
                <tr style="border-top: 2px solid #000;">
                  <td style="padding: 15px 0; color: #000; font-size: 18px; font-weight: 700;">Total</td>
                  <td style="padding: 15px 0; text-align: right; color: #000; font-size: 18px; font-weight: 700;">${formatAmount(order.total)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Shipping Address -->
          <tr>
            <td style="padding: 20px 40px;">
              <h3 style="margin: 0 0 15px 0; color: #000; font-size: 18px; font-weight: 700; text-transform: uppercase;">Shipping Address</h3>
              <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px;">
                <p style="margin: 0; color: #000; font-weight: 600;">${order.customer_name}</p>
                <p style="margin: 8px 0 0 0; color: #666; line-height: 1.6;">
                  ${order.shipping_address.street}<br/>
                  ${order.shipping_address.city}, ${order.shipping_address.postal_code}<br/>
                  ${order.shipping_address.province}
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 40px; text-align: center; background-color: #f9fafb; border-top: 1px solid #eee;">
              <p style="margin: 0 0 10px 0; color: #000; font-weight: 600;">Questions about your order?</p>
              <p style="margin: 0 0 20px 0; color: #666; font-size: 14px;">Contact us at <a href="mailto:orders@montrez.co.za" style="color: #000; text-decoration: underline;">orders@montrez.co.za</a></p>
              <p style="margin: 0; color: #888; font-size: 12px;">© ${new Date().getFullYear()} MONTREZ. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        error: 'Order ID required'
      });
    }

    // Get order from database
    const order = await getOrderById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // Only send email for paid orders
    if (order.payment_status !== 'paid') {
      return res.status(400).json({
        success: false,
        error: 'Order not paid yet'
      });
    }

    // Send email via Resend
    const emailResult = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'MONTREZ <onboarding@resend.dev>',
      to: order.customer_email,
      subject: `Order Confirmation - ${order.order_number}`,
      html: generateOrderEmailHTML(order)
    });

    console.log('[Email] Order confirmation sent:', emailResult.id);

    return res.status(200).json({
      success: true,
      emailId: emailResult.id,
      message: 'Order confirmation email sent'
    });

  } catch (error) {
    console.error('[Email] Error sending order confirmation:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send email',
      message: error.message
    });
  }
}
