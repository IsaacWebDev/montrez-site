import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// PayFast Configuration
// TODO: Replace with actual PayFast credentials
const PAYFAST_CONFIG = {
  merchantId: process.env.PAYFAST_MERCHANT_ID || '10000100',
  merchantKey: process.env.PAYFAST_MERCHANT_KEY || '46f0cd694581a',
  passphrase: process.env.PAYFAST_PASSPHRASE || '',
  sandbox: process.env.NODE_ENV !== 'production' // Use sandbox for testing
};

const PAYFAST_URL = PAYFAST_CONFIG.sandbox
  ? 'https://sandbox.payfast.co.za/eng/process'
  : 'https://www.payfast.co.za/eng/process';

// Orders file path
const ORDERS_FILE = path.join(process.cwd(), 'data', 'orders.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify({ orders: [] }, null, 2));
  }
}

// Load orders
function loadOrders() {
  ensureDataDir();
  const data = fs.readFileSync(ORDERS_FILE, 'utf8');
  return JSON.parse(data).orders;
}

// Save orders
function saveOrders(orders) {
  ensureDataDir();
  fs.writeFileSync(ORDERS_FILE, JSON.stringify({ orders }, null, 2));
}

// Generate order ID
function generateOrderId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `MNTRZ-${timestamp}-${random}`;
}

// Generate PayFast signature
function generateSignature(data, passphrase = '') {
  // Create parameter string
  let pfOutput = '';
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key] !== '') {
        pfOutput += `${key}=${encodeURIComponent(data[key].toString().trim()).replace(/%20/g, '+')}&`;
      }
    }
  }
  
  // Remove last ampersand
  pfOutput = pfOutput.slice(0, -1);
  
  // Add passphrase if set
  if (passphrase !== '') {
    pfOutput += `&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, '+')}`;
  }
  
  // Generate signature
  return crypto.createHash('md5').update(pfOutput).digest('hex');
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
    const { items, customer, shipping, payment } = req.body;

    // Validation
    if (!items || !items.length) {
      return res.status(400).json({
        success: false,
        error: 'Cart is empty'
      });
    }

    if (!customer || !customer.email || !customer.firstName || !customer.lastName) {
      return res.status(400).json({
        success: false,
        error: 'Customer information incomplete'
      });
    }

    if (!shipping || !shipping.address || !shipping.city || !shipping.postalCode || !shipping.state) {
      return res.status(400).json({
        success: false,
        error: 'Shipping information incomplete'
      });
    }

    // Calculate totals (in ZAR/Rands)
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping_cost = 100; // R100 flat rate
    const total = subtotal + shipping_cost;

    // Minimum order validation
    if (total < 100) {
      return res.status(400).json({
        success: false,
        error: 'Minimum order amount is R100'
      });
    }

    // Generate order
    const orderId = generateOrderId();
    const order = {
      orderId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      customer: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone || null
      },
      items: items.map(item => ({
        productId: item.productId || item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size || null,
        image: item.image || null
      })),
      shipping: {
        method: 'standard',
        address: shipping.address,
        city: shipping.city,
        state: shipping.state,
        postalCode: shipping.postalCode,
        country: 'South Africa'
      },
      payment: {
        method: 'payfast',
        status: 'pending'
      },
      pricing: {
        subtotal,
        shipping: shipping_cost,
        tax: 0,
        total,
        currency: 'ZAR'
      }
    };

    // Save order
    const orders = loadOrders();
    orders.push(order);
    saveOrders(orders);

    // Get base URL for return/notify URLs
    const baseUrl = req.headers.origin || `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}`;

    // PayFast payment data
    const payfastData = {
      // Merchant details
      merchant_id: PAYFAST_CONFIG.merchantId,
      merchant_key: PAYFAST_CONFIG.merchantKey,
      
      // URLs
      return_url: `${baseUrl}/order/${orderId}`,
      cancel_url: `${baseUrl}/checkout`,
      notify_url: `${baseUrl}/api/payment/notify`,
      
      // Buyer details
      name_first: customer.firstName,
      name_last: customer.lastName,
      email_address: customer.email,
      cell_number: customer.phone ? customer.phone.replace(/\s/g, '') : '',
      
      // Transaction details
      m_payment_id: orderId,
      amount: total.toFixed(2),
      item_name: `Montrez Order ${orderId}`,
      item_description: `${items.length} item(s) from Montrez`,
      
      // Additional
      custom_str1: orderId,
      custom_str2: customer.email,
      email_confirmation: '1',
      confirmation_address: customer.email
    };

    // Generate signature
    const signature = generateSignature(payfastData, PAYFAST_CONFIG.passphrase);
    payfastData.signature = signature;

    // Build PayFast URL
    const params = new URLSearchParams(payfastData);
    const payfastUrl = `${PAYFAST_URL}?${params.toString()}`;

    return res.status(200).json({
      success: true,
      orderId,
      payfastUrl,
      payfastData, // Include for debugging in sandbox
      message: 'Payment initialized successfully'
    });

  } catch (error) {
    console.error('Payment initiation error:', error);
    return res.status(500).json({
      success: false,
      error: 'Payment initiation failed',
      message: error.message
    });
  }
}
