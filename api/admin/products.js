import fs from 'fs';
import path from 'path';

// Admin authentication (simple token-based)
// In production, use proper JWT authentication
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'montrez-admin-2026';

// Products file path
const PRODUCTS_FILE = path.join(process.cwd(), 'products.json');

// Authenticate admin
function isAuthenticated(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return false;
  
  const token = authHeader.replace('Bearer ', '');
  return token === ADMIN_TOKEN;
}

// Load products
function loadProducts() {
  const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
  return JSON.parse(data);
}

// Save products
function saveProducts(productsData) {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(productsData, null, 2));
}

export default function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
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
    const productsData = loadProducts();
    const products = productsData.products;

    switch (req.method) {
      case 'GET':
        // GET /api/admin/products - List all products (admin view)
        return res.status(200).json({
          success: true,
          count: products.length,
          products
        });

      case 'POST':
        // POST /api/admin/products - Create new product
        const newProduct = req.body;

        // Validation
        if (!newProduct.id || !newProduct.name || !newProduct.price) {
          return res.status(400).json({
            success: false,
            error: 'Missing required fields: id, name, price'
          });
        }

        // Check if ID already exists
        if (products.find(p => p.id === newProduct.id)) {
          return res.status(409).json({
            success: false,
            error: 'Product with this ID already exists'
          });
        }

        // Add timestamps
        newProduct.createdAt = new Date().toISOString();
        newProduct.updatedAt = new Date().toISOString();

        products.push(newProduct);
        saveProducts(productsData);

        return res.status(201).json({
          success: true,
          product: newProduct,
          message: 'Product created successfully'
        });

      case 'PUT':
        // PUT /api/admin/products?id=xxx - Update product
        const { id } = req.query;
        const updates = req.body;

        if (!id) {
          return res.status(400).json({
            success: false,
            error: 'Product ID required'
          });
        }

        const productIndex = products.findIndex(p => p.id === id);

        if (productIndex === -1) {
          return res.status(404).json({
            success: false,
            error: 'Product not found'
          });
        }

        // Don't allow changing the ID
        delete updates.id;
        
        // Update product
        products[productIndex] = {
          ...products[productIndex],
          ...updates,
          updatedAt: new Date().toISOString()
        };

        saveProducts(productsData);

        return res.status(200).json({
          success: true,
          product: products[productIndex],
          message: 'Product updated successfully'
        });

      case 'DELETE':
        // DELETE /api/admin/products?id=xxx - Delete product
        const { id: deleteId } = req.query;

        if (!deleteId) {
          return res.status(400).json({
            success: false,
            error: 'Product ID required'
          });
        }

        const deleteIndex = products.findIndex(p => p.id === deleteId);

        if (deleteIndex === -1) {
          return res.status(404).json({
            success: false,
            error: 'Product not found'
          });
        }

        const deletedProduct = products.splice(deleteIndex, 1)[0];
        saveProducts(productsData);

        return res.status(200).json({
          success: true,
          product: deletedProduct,
          message: 'Product deleted successfully'
        });

      default:
        return res.status(405).json({
          success: false,
          error: 'Method not allowed'
        });
    }

  } catch (error) {
    console.error('Admin products API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Admin operation failed',
      message: error.message
    });
  }
}
