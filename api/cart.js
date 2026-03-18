// Simple in-memory cart storage (session-based)
// In production, use Redis or database with session IDs
const carts = new Map();

// Session timeout: 24 hours
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000;

// Cleanup expired sessions every hour
setInterval(() => {
  const now = Date.now();
  for (const [sessionId, cart] of carts.entries()) {
    if (now - cart.lastUpdated > SESSION_TIMEOUT) {
      carts.delete(sessionId);
    }
  }
}, 60 * 60 * 1000);

// Generate session ID
function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Get or create cart
function getCart(sessionId) {
  if (!carts.has(sessionId)) {
    carts.set(sessionId, {
      items: [],
      lastUpdated: Date.now()
    });
  }
  return carts.get(sessionId);
}

export default function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Session-ID');
  res.setHeader('Access-Control-Expose-Headers', 'X-Session-ID');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Get or create session ID
    let sessionId = req.headers['x-session-id'] || req.query.sessionId;
    
    if (!sessionId) {
      sessionId = generateSessionId();
    }

    const cart = getCart(sessionId);

    switch (req.method) {
      case 'GET':
        // GET /api/cart - Get cart contents
        res.setHeader('X-Session-ID', sessionId);
        return res.status(200).json({
          success: true,
          sessionId,
          cart: {
            items: cart.items,
            itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
            total: cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          }
        });

      case 'POST':
        // POST /api/cart - Add item to cart
        const { productId, name, price, size, color, quantity = 1, image } = req.body;

        if (!productId || !name || !price) {
          return res.status(400).json({
            success: false,
            error: 'Missing required fields: productId, name, price'
          });
        }

        // Check if item already exists
        const existingIndex = cart.items.findIndex(
          item => item.productId === productId && item.size === size && item.color === color
        );

        if (existingIndex >= 0) {
          // Update quantity
          cart.items[existingIndex].quantity += quantity;
        } else {
          // Add new item
          cart.items.push({
            productId,
            name,
            price,
            size,
            color,
            quantity,
            image,
            addedAt: new Date().toISOString()
          });
        }

        cart.lastUpdated = Date.now();
        
        res.setHeader('X-Session-ID', sessionId);
        return res.status(200).json({
          success: true,
          sessionId,
          cart: {
            items: cart.items,
            itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
            total: cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          }
        });

      case 'PUT':
        // PUT /api/cart - Update item quantity
        const { productId: updateId, size: updateSize, color: updateColor, quantity: newQuantity } = req.body;

        const updateIndex = cart.items.findIndex(
          item => item.productId === updateId && item.size === updateSize && item.color === updateColor
        );

        if (updateIndex === -1) {
          return res.status(404).json({
            success: false,
            error: 'Item not found in cart'
          });
        }

        if (newQuantity <= 0) {
          cart.items.splice(updateIndex, 1);
        } else {
          cart.items[updateIndex].quantity = newQuantity;
        }

        cart.lastUpdated = Date.now();

        res.setHeader('X-Session-ID', sessionId);
        return res.status(200).json({
          success: true,
          sessionId,
          cart: {
            items: cart.items,
            itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
            total: cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          }
        });

      case 'DELETE':
        // DELETE /api/cart - Clear cart or remove specific item
        const { productId: deleteId, size: deleteSize, color: deleteColor } = req.query;

        if (deleteId) {
          // Remove specific item
          const deleteIndex = cart.items.findIndex(
            item => item.productId === deleteId && 
                   (!deleteSize || item.size === deleteSize) && 
                   (!deleteColor || item.color === deleteColor)
          );

          if (deleteIndex >= 0) {
            cart.items.splice(deleteIndex, 1);
          }
        } else {
          // Clear entire cart
          cart.items = [];
        }

        cart.lastUpdated = Date.now();

        res.setHeader('X-Session-ID', sessionId);
        return res.status(200).json({
          success: true,
          sessionId,
          cart: {
            items: cart.items,
            itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
            total: cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          }
        });

      default:
        return res.status(405).json({
          success: false,
          error: 'Method not allowed'
        });
    }

  } catch (error) {
    console.error('Cart API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Cart operation failed',
      message: error.message
    });
  }
}
