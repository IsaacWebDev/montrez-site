import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// PayFast Configuration
const PAYFAST_CONFIG = {
  merchantId: process.env.PAYFAST_MERCHANT_ID || '10000100',
  merchantKey: process.env.PAYFAST_MERCHANT_KEY || '46f0cd694581a',
  passphrase: process.env.PAYFAST_PASSPHRASE || '',
  sandbox: process.env.NODE_ENV !== 'production'
};

const PAYFAST_HOST = PAYFAST_CONFIG.sandbox
  ? 'sandbox.payfast.co.za'
  : 'www.payfast.co.za';

const ORDERS_FILE = path.join(process.cwd(), 'data', 'orders.json');

// Load and save orders
function loadOrders() {
  const data = fs.readFileSync(ORDERS_FILE, 'utf8');
  return JSON.parse(data).orders;
}

function saveOrders(orders) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify({ orders }, null, 2));
}

// Verify PayFast signature
function verifySignature(data, signature, passphrase = '') {
  let pfOutput = '';
  for (let key in data) {
    if (key !== 'signature') {
      pfOutput += `${key}=${encodeURIComponent(data[key].toString().trim()).replace(/%20/g, '+')}&`;
    }
  }
  
  pfOutput = pfOutput.slice(0, -1);
  
  if (passphrase !== '') {
    pfOutput += `&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, '+')}`;
  }
  
  const calculatedSignature = crypto.createHash('md5').update(pfOutput).digest('hex');
  return calculatedSignature === signature;
}

// Verify PayFast server IP
async function verifyPayFastIP(ip) {
  const validHosts = [
    'www.payfast.co.za',
    'sandbox.payfast.co.za',
    'w1w.payfast.co.za',
    'w2w.payfast.co.za'
  ];
  
  // In sandbox mode, allow localhost
  if (PAYFAST_CONFIG.sandbox) {
    return true;
  }
  
  // TODO: Implement proper IP verification using DNS lookup
  // For now, accept all in production (should be improved)
  return true;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  try {
    const pfData = req.body;
    
    // Log notification (for debugging)
    console.log('PayFast ITN received:', pfData);

    // 1. Verify source IP
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ipValid = await verifyPayFastIP(clientIp);
    
    if (!ipValid) {
      console.error('Invalid PayFast IP:', clientIp);
      return res.status(403).send('Invalid source IP');
    }

    // 2. Verify signature
    const signatureValid = verifySignature(
      pfData,
      pfData.signature,
      PAYFAST_CONFIG.passphrase
    );
    
    if (!signatureValid) {
      console.error('Invalid PayFast signature');
      return res.status(403).send('Invalid signature');
    }

    // 3. Verify payment data
    if (pfData.merchant_id !== PAYFAST_CONFIG.merchantId) {
      console.error('Invalid merchant ID');
      return res.status(403).send('Invalid merchant ID');
    }

    // 4. Get order
    const orderId = pfData.m_payment_id || pfData.custom_str1;
    const orders = loadOrders();
    const orderIndex = orders.findIndex(o => o.orderId === orderId);
    
    if (orderIndex === -1) {
      console.error('Order not found:', orderId);
      return res.status(404).send('Order not found');
    }

    const order = orders[orderIndex];

    // 5. Verify amount (within 0.01 tolerance)
    const expectedAmount = parseFloat(order.pricing.total.toFixed(2));
    const receivedAmount = parseFloat(pfData.amount_gross);
    
    if (Math.abs(expectedAmount - receivedAmount) > 0.01) {
      console.error('Amount mismatch:', { expected: expectedAmount, received: receivedAmount });
      return res.status(400).send('Amount mismatch');
    }

    // 6. Update order status based on payment status
    const paymentStatus = pfData.payment_status;
    
    switch (paymentStatus) {
      case 'COMPLETE':
        order.status = 'confirmed';
        order.payment.status = 'completed';
        order.payment.payfastId = pfData.pf_payment_id;
        order.payment.completedAt = new Date().toISOString();
        break;
        
      case 'FAILED':
        order.status = 'cancelled';
        order.payment.status = 'failed';
        break;
        
      case 'PENDING':
        order.status = 'pending';
        order.payment.status = 'pending';
        break;
        
      default:
        console.error('Unknown payment status:', paymentStatus);
        return res.status(400).send('Unknown payment status');
    }

    order.updatedAt = new Date().toISOString();
    
    // Save updated order
    orders[orderIndex] = order;
    saveOrders(orders);

    // 7. Send confirmation email (async, don't wait)
    if (paymentStatus === 'COMPLETE') {
      try {
        const baseUrl = `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}`;
        await fetch(`${baseUrl}/api/send-order-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order })
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't fail the ITN if email fails
      }
    }

    // Return 200 OK to acknowledge ITN
    return res.status(200).send('OK');

  } catch (error) {
    console.error('PayFast ITN error:', error);
    return res.status(500).send('Internal server error');
  }
}

// Configure bodyParser for raw body (required for signature verification)
export const config = {
  api: {
    bodyParser: {
      urlencoded: { extended: true }
    }
  }
};
