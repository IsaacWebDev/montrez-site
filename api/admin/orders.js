import fs from 'fs';
import path from 'path';

// Admin authentication
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'montrez-admin-2026';

// Orders file path
const ORDERS_FILE = path.join(process.cwd(), 'data', 'orders.json');

// Authenticate admin
function isAuthenticated(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return false;
  
  const token = authHeader.replace('Bearer ', '');
  return token === ADMIN_TOKEN;
}

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

export default function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Check authentication
  if (!isAuthenticated(req)) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized - Invalid or missing admin token'
    });
  }

  try {
    const orders = loadOrders();

    switch (req.method) {
      case 'GET':
        // GET /api/admin/orders - List all orders with filters
        const { status, email, startDate, endDate, limit = 100 } = req.query;
        
        let filteredOrders = [...orders];

        if (status) {
          filteredOrders = filteredOrders.filter(o => o.status === status);
        }

        if (email) {
          filteredOrders = filteredOrders.filter(o => o.customer.email === email);
        }

        if (startDate) {
          filteredOrders = filteredOrders.filter(o => 
            new Date(o.createdAt) >= new Date(startDate)
          );
        }

        if (endDate) {
          filteredOrders = filteredOrders.filter(o => 
            new Date(o.createdAt) <= new Date(endDate)
          );
        }

        // Sort by most recent first
        filteredOrders.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        // Limit results
        filteredOrders = filteredOrders.slice(0, parseInt(limit));

        // Calculate stats
        const stats = {
          total: orders.length,
          filtered: filteredOrders.length,
          pending: orders.filter(o => o.status === 'pending').length,
          confirmed: orders.filter(o => o.status === 'confirmed').length,
          processing: orders.filter(o => o.status === 'processing').length,
          shipped: orders.filter(o => o.status === 'shipped').length,
          delivered: orders.filter(o => o.status === 'delivered').length,
          totalRevenue: orders.reduce((sum, o) => sum + o.pricing.total, 0)
        };

        return res.status(200).json({
          success: true,
          stats,
          count: filteredOrders.length,
          orders: filteredOrders
        });

      case 'PUT':
        // PUT /api/admin/orders?orderId=xxx - Update order status
        const { orderId } = req.query;
        const { status: newStatus, notes } = req.body;

        if (!orderId) {
          return res.status(400).json({
            success: false,
            error: 'Order ID required'
          });
        }

        const orderIndex = orders.findIndex(o => o.orderId === orderId);

        if (orderIndex === -1) {
          return res.status(404).json({
            success: false,
            error: 'Order not found'
          });
        }

        // Valid status transitions
        const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
        
        if (newStatus && !validStatuses.includes(newStatus)) {
          return res.status(400).json({
            success: false,
            error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
          });
        }

        // Update order
        if (newStatus) {
          orders[orderIndex].status = newStatus;
        }
        
        if (notes) {
          orders[orderIndex].adminNotes = notes;
        }

        orders[orderIndex].updatedAt = new Date().toISOString();

        saveOrders(orders);

        return res.status(200).json({
          success: true,
          order: orders[orderIndex],
          message: 'Order updated successfully'
        });

      case 'DELETE':
        // DELETE /api/admin/orders?orderId=xxx - Delete order (soft delete)
        const { orderId: deleteId } = req.query;

        if (!deleteId) {
          return res.status(400).json({
            success: false,
            error: 'Order ID required'
          });
        }

        const deleteIndex = orders.findIndex(o => o.orderId === deleteId);

        if (deleteIndex === -1) {
          return res.status(404).json({
            success: false,
            error: 'Order not found'
          });
        }

        // Soft delete - mark as cancelled instead of removing
        orders[deleteIndex].status = 'cancelled';
        orders[deleteIndex].deletedAt = new Date().toISOString();
        orders[deleteIndex].updatedAt = new Date().toISOString();

        saveOrders(orders);

        return res.status(200).json({
          success: true,
          message: 'Order cancelled successfully'
        });

      default:
        return res.status(405).json({
          success: false,
          error: 'Method not allowed'
        });
    }

  } catch (error) {
    console.error('Admin orders API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Admin operation failed',
      message: error.message
    });
  }
}
