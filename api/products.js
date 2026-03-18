import fs from 'fs';
import path from 'path';

// CORS headers for all responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Load products from JSON file
function loadProducts() {
  const productsPath = path.join(process.cwd(), 'products.json');
  const data = fs.readFileSync(productsPath, 'utf8');
  return JSON.parse(data).products;
}

// GET /api/products - Fetch products with optional filters
export default function handler(req, res) {
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let products = loadProducts();
    const { size, color, collection, category, minPrice, maxPrice, inStock, featured, search } = req.query;

    // Apply filters
    if (size) {
      products = products.filter(p => p.sizes?.includes(size));
    }

    if (color) {
      products = products.filter(p => 
        p.color?.toLowerCase() === color.toLowerCase()
      );
    }

    if (collection) {
      products = products.filter(p => 
        p.collection?.toLowerCase() === collection.toLowerCase()
      );
    }

    if (category) {
      products = products.filter(p => 
        p.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (minPrice) {
      products = products.filter(p => p.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      products = products.filter(p => p.price <= parseFloat(maxPrice));
    }

    if (inStock === 'true') {
      products = products.filter(p => p.inStock === true);
    }

    if (featured === 'true') {
      products = products.filter(p => p.featured === true);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower) ||
        p.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    return res.status(200).json({
      success: true,
      count: products.length,
      products
    });

  } catch (error) {
    console.error('Products API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch products',
      message: error.message
    });
  }
}
