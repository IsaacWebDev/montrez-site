// Email API for order confirmations
// Using Resend (free tier: 3,000 emails/month)
// Install: npm install resend

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
    const { order } = req.body;

    if (!order || !order.customer || !order.customer.email) {
      return res.status(400).json({
        success: false,
        error: 'Invalid order data'
      });
    }

    // Check if Resend API key is configured
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured - email skipped');
      return res.status(200).json({
        success: true,
        message: 'Email skipped (API key not configured)',
        preview: generateEmailHTML(order)
      });
    }

    // Send email using Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Montrez <orders@montrez.com>', // Update with your verified domain
        to: [order.customer.email],
        subject: `Order Confirmation - ${order.orderId}`,
        html: generateEmailHTML(order)
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Email send failed');
    }

    return res.status(200).json({
      success: true,
      message: 'Order confirmation email sent',
      emailId: result.id
    });

  } catch (error) {
    console.error('Email API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send email',
      message: error.message
    });
  }
}

// Generate order confirmation email HTML
function generateEmailHTML(order) {
  const itemsHTML = order.items.map(item => `
    <tr>
      <td style="padding: 15px 0; border-bottom: 1px solid #eee;">
        <div style="display: flex; align-items: center;">
          ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; margin-right: 15px;">` : ''}
          <div>
            <strong>${item.name}</strong><br>
            ${item.size ? `Size: ${item.size}` : ''} ${item.color ? `| Color: ${item.color}` : ''}<br>
            Quantity: ${item.quantity}
          </div>
        </div>
      </td>
      <td style="padding: 15px 0; border-bottom: 1px solid #eee; text-align: right;">
        $${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      
      <!-- Header -->
      <div style="text-align: center; padding: 30px 0; border-bottom: 2px solid #000;">
        <h1 style="font-size: 32px; font-weight: 700; letter-spacing: 2px; margin: 0;">MONTREZ</h1>
        <p style="font-size: 12px; letter-spacing: 1px; color: #666; margin: 5px 0 0 0;">STREETWEAR LUXURY</p>
      </div>

      <!-- Order Confirmation -->
      <div style="padding: 40px 0;">
        <h2 style="font-size: 24px; margin: 0 0 10px 0;">Order Confirmed</h2>
        <p style="color: #666; margin: 0 0 20px 0;">Thank you for your order, ${order.customer.firstName}!</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <p style="margin: 0 0 10px 0;"><strong>Order Number:</strong> ${order.orderId}</p>
          <p style="margin: 0 0 10px 0;"><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p style="margin: 0;"><strong>Status:</strong> <span style="color: #28a745;">${order.status.toUpperCase()}</span></p>
        </div>

        <!-- Order Items -->
        <h3 style="font-size: 18px; margin: 0 0 20px 0;">Order Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          ${itemsHTML}
        </table>

        <!-- Pricing Summary -->
        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #000;">
          <table style="width: 100%; font-size: 14px;">
            <tr>
              <td style="padding: 5px 0;">Subtotal:</td>
              <td style="padding: 5px 0; text-align: right;">$${order.pricing.subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0;">Shipping (${order.shipping.method}):</td>
              <td style="padding: 5px 0; text-align: right;">$${order.pricing.shipping.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0;">Tax:</td>
              <td style="padding: 5px 0; text-align: right;">$${order.pricing.tax.toFixed(2)}</td>
            </tr>
            <tr style="font-size: 18px; font-weight: 700;">
              <td style="padding: 15px 0 0 0; border-top: 1px solid #ddd;">Total:</td>
              <td style="padding: 15px 0 0 0; text-align: right; border-top: 1px solid #ddd;">$${order.pricing.total.toFixed(2)} ${order.pricing.currency}</td>
            </tr>
          </table>
        </div>

        <!-- Shipping Address -->
        <div style="margin-top: 40px;">
          <h3 style="font-size: 18px; margin: 0 0 15px 0;">Shipping Address</h3>
          <p style="margin: 0; line-height: 1.8; color: #666;">
            ${order.customer.firstName} ${order.customer.lastName}<br>
            ${order.shipping.address}${order.shipping.address2 ? `<br>${order.shipping.address2}` : ''}<br>
            ${order.shipping.city}, ${order.shipping.state || ''} ${order.shipping.postalCode}<br>
            ${order.shipping.country}
          </p>
        </div>

        <!-- Footer -->
        <div style="margin-top: 50px; padding-top: 30px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;">
          <p>Questions about your order? Reply to this email or contact us at support@montrez.com</p>
          <p style="margin-top: 20px;">&copy; ${new Date().getFullYear()} Montrez. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
