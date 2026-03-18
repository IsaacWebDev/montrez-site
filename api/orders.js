import fs from 'fs';
import path from 'path';

// In production, use a database
// For now, store orders in a JSON file
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

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'GET':
        // GET /api/orders?orderId=xxx or GET /api/orders?email=xxx
        const { orderId, email } = req.query;

        if (!orderId && !email) {
          return res.status(400).json({
            success: false,
            error: 'orderId or email required'
          });
        }

        const allOrders = loadOrders();
        let orders;

        if (orderId) {
          orders = allOrders.filter(o => o.orderId === orderId);
        } else {
          orders = allOrders.filter(o => o.customer.email === email);
        }

        return res.status(200).json({
          success: true,
          count: orders.length,
          orders
        });

      case 'POST':
        // POST /api/orders - Create new order
        const {
          items,
          customer,
          shipping,
          payment,
          sessionId
        } = req.body;

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

        if (!shipping || !shipping.address || !shipping.city || !shipping.country || !shipping.postalCode) {
          return res.status(400).json({
            success: false,
            error: 'Shipping information incomplete'
          });
        }

        // Calculate total
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping_cost = shipping.method === 'express' ? 25 : 10; // USD
        const tax = subtotal * 0.1; // 10% tax (adjust as needed)
        const total = subtotal + shipping_cost + tax;

        // Create order
        const order = {
          orderId: generateOrderId(),
          status: 'pending', // pending -> confirmed -> processing -> shipped -> delivered
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          customer: {
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phone: customer.phone || null
          },
          items: items.map(item => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size || null,
            color: item.color || null,
            image: item.image || null
          })),
          shipping: {
            method: shipping.method || 'standard',
            address: shipping.address,
            address2: shipping.address2 || null,
            city: shipping.city,
            state: shipping.state || null,
            postalCode: shipping.postalCode,
            country: shipping.country
          },
          payment: {
            method: payment?.method || 'pending',
            status: 'pending' // pending -> completed -> failed
          },
          pricing: {
            subtotal,
            shipping: shipping_cost,
            tax,
            total,
            currency: 'USD'
          },
          sessionId: sessionId || null,
          notes: customer.notes || null
        };

        // Save order
        const orders = loadOrders();
        orders.push(order);
        saveOrders(orders);

        // Trigger email notification (async)
        try {
          await fetch(`${req.headers.origin || 'http://localhost:3000'}/api/send-order-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order })
          });
        } catch (emailError) {
          console.error('Failed to send order email:', emailError);
          // Don't fail the order if email fails
        }

        return res.status(201).json({
          success: true,
          order: {
            orderId: order.orderId,
            status: order.status,
            total: order.pricing.total,
            currency: order.pricing.currency,
            createdAt: order.createdAt
          },
          message: 'Order created successfully'
        });

      default:
        return res.status(405).json({
          success: false,
          error: 'Method not allowed'
        });
    }

  } catch (error) {
    console.error('Orders API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Order operation failed',
      message: error.message
    });
  }
}
