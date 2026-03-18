#!/usr/bin/env node

/**
 * Montrez Backend API Test Script
 * 
 * Usage:
 *   node test-backend.js [base-url]
 * 
 * Examples:
 *   node test-backend.js                                    # Test local dev server
 *   node test-backend.js https://your-domain.vercel.app     # Test production
 */

const API_BASE = process.argv[2] || 'http://localhost:3000';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'montrez-admin-2026';

console.log('\n🧪 Testing Montrez Backend API\n');
console.log(`Base URL: ${API_BASE}/api\n`);

let sessionId = '';
let testOrderId = '';

// Test helpers
async function test(name, fn) {
  try {
    process.stdout.write(`${name}... `);
    await fn();
    console.log('✅ PASS');
    return true;
  } catch (error) {
    console.log(`❌ FAIL: ${error.message}`);
    return false;
  }
}

async function fetchAPI(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}/api${endpoint}`, options);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || `HTTP ${response.status}`);
  }
  
  return data;
}

// Tests
async function runTests() {
  let passed = 0;
  let failed = 0;

  console.log('📦 Product API Tests\n');

  // Test 1: Get all products
  if (await test('1. GET /api/products (all products)', async () => {
    const data = await fetchAPI('/products');
    if (!data.success) throw new Error('Response not successful');
    if (!data.products || !Array.isArray(data.products)) throw new Error('No products array');
    if (data.products.length === 0) throw new Error('No products returned');
    console.log(`   → Found ${data.products.length} products`);
  })) passed++; else failed++;

  // Test 2: Filter by category
  if (await test('2. GET /api/products?category=Hoodies', async () => {
    const data = await fetchAPI('/products?category=Hoodies');
    if (!data.success) throw new Error('Response not successful');
    const nonHoodies = data.products.filter(p => p.category !== 'Hoodies');
    if (nonHoodies.length > 0) throw new Error('Filter not working');
    console.log(`   → Found ${data.products.length} hoodies`);
  })) passed++; else failed++;

  // Test 3: Filter by price
  if (await test('3. GET /api/products?maxPrice=50', async () => {
    const data = await fetchAPI('/products?maxPrice=50');
    if (!data.success) throw new Error('Response not successful');
    const overPriced = data.products.filter(p => p.price > 50);
    if (overPriced.length > 0) throw new Error('Price filter not working');
    console.log(`   → Found ${data.products.length} products under $50`);
  })) passed++; else failed++;

  // Test 4: Search
  if (await test('4. GET /api/products?search=essential', async () => {
    const data = await fetchAPI('/products?search=essential');
    if (!data.success) throw new Error('Response not successful');
    if (data.products.length === 0) throw new Error('Search returned no results');
    console.log(`   → Found ${data.products.length} results for "essential"`);
  })) passed++; else failed++;

  console.log('\n🛒 Cart API Tests\n');

  // Test 5: Get empty cart
  if (await test('5. GET /api/cart (empty cart)', async () => {
    const data = await fetchAPI('/cart');
    if (!data.success) throw new Error('Response not successful');
    if (!data.sessionId) throw new Error('No session ID returned');
    sessionId = data.sessionId;
    console.log(`   → Session ID: ${sessionId.substring(0, 20)}...`);
  })) passed++; else failed++;

  // Test 6: Add to cart
  if (await test('6. POST /api/cart (add item)', async () => {
    const data = await fetchAPI('/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-ID': sessionId
      },
      body: JSON.stringify({
        productId: 'test-product-001',
        name: 'Test Product',
        price: 99,
        size: 'L',
        color: 'Black',
        quantity: 2
      })
    });
    if (!data.success) throw new Error('Response not successful');
    if (data.cart.items.length === 0) throw new Error('Item not added');
    console.log(`   → Cart total: $${data.cart.total}`);
  })) passed++; else failed++;

  // Test 7: Update cart
  if (await test('7. PUT /api/cart (update quantity)', async () => {
    const data = await fetchAPI('/cart', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-ID': sessionId
      },
      body: JSON.stringify({
        productId: 'test-product-001',
        size: 'L',
        color: 'Black',
        quantity: 3
      })
    });
    if (!data.success) throw new Error('Response not successful');
    if (data.cart.items[0].quantity !== 3) throw new Error('Quantity not updated');
    console.log(`   → Updated to ${data.cart.items[0].quantity} items`);
  })) passed++; else failed++;

  // Test 8: Get cart (verify persistence)
  if (await test('8. GET /api/cart (verify persistence)', async () => {
    const data = await fetchAPI('/cart', {
      headers: { 'X-Session-ID': sessionId }
    });
    if (!data.success) throw new Error('Response not successful');
    if (data.cart.items.length === 0) throw new Error('Cart lost items');
    console.log(`   → Cart has ${data.cart.itemCount} items`);
  })) passed++; else failed++;

  console.log('\n📦 Order API Tests\n');

  // Test 9: Create order
  if (await test('9. POST /api/orders (create order)', async () => {
    const data = await fetchAPI('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [{
          productId: 'test-product-001',
          name: 'Test Product',
          price: 99,
          quantity: 1,
          size: 'L',
          color: 'Black'
        }],
        customer: {
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          phone: '+1234567890'
        },
        shipping: {
          method: 'standard',
          address: '123 Test Street',
          city: 'Test City',
          state: 'TS',
          postalCode: '12345',
          country: 'Test Country'
        },
        payment: { method: 'test' },
        sessionId: sessionId
      })
    });
    if (!data.success) throw new Error('Response not successful');
    if (!data.order || !data.order.orderId) throw new Error('No order ID returned');
    testOrderId = data.order.orderId;
    console.log(`   → Order ID: ${testOrderId}`);
  })) passed++; else failed++;

  // Test 10: Get order by ID
  if (await test('10. GET /api/orders?orderId=xxx', async () => {
    const data = await fetchAPI(`/orders?orderId=${testOrderId}`);
    if (!data.success) throw new Error('Response not successful');
    if (data.orders.length === 0) throw new Error('Order not found');
    console.log(`   → Retrieved order: ${data.orders[0].orderId}`);
  })) passed++; else failed++;

  console.log('\n🔐 Admin API Tests\n');

  // Test 11: Admin - List products
  if (await test('11. GET /api/admin/products (auth required)', async () => {
    const data = await fetchAPI('/admin/products', {
      headers: { 'Authorization': `Bearer ${ADMIN_TOKEN}` }
    });
    if (!data.success) throw new Error('Response not successful');
    if (!data.products) throw new Error('No products returned');
    console.log(`   → Admin view: ${data.products.length} products`);
  })) passed++; else failed++;

  // Test 12: Admin - Create product
  if (await test('12. POST /api/admin/products (create)', async () => {
    const data = await fetchAPI('/admin/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_TOKEN}`
      },
      body: JSON.stringify({
        id: 'test-product-new',
        sku: 'TEST-NEW-001',
        name: 'Test New Product',
        price: 79,
        currency: 'USD',
        category: 'Test',
        sizes: ['S', 'M', 'L'],
        images: ['/test.jpg'],
        inStock: true,
        featured: false
      })
    });
    if (!data.success) throw new Error('Response not successful');
    console.log(`   → Created: ${data.product.name}`);
  })) passed++; else failed++;

  // Test 13: Admin - Update product
  if (await test('13. PUT /api/admin/products?id=xxx (update)', async () => {
    const data = await fetchAPI('/admin/products?id=test-product-new', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_TOKEN}`
      },
      body: JSON.stringify({
        price: 69,
        featured: true
      })
    });
    if (!data.success) throw new Error('Response not successful');
    if (data.product.price !== 69) throw new Error('Price not updated');
    console.log(`   → Updated price to $${data.product.price}`);
  })) passed++; else failed++;

  // Test 14: Admin - Delete product
  if (await test('14. DELETE /api/admin/products?id=xxx', async () => {
    const data = await fetchAPI('/admin/products?id=test-product-new', {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${ADMIN_TOKEN}` }
    });
    if (!data.success) throw new Error('Response not successful');
    console.log(`   → Deleted: ${data.product.name}`);
  })) passed++; else failed++;

  // Test 15: Admin - List orders
  if (await test('15. GET /api/admin/orders (with stats)', async () => {
    const data = await fetchAPI('/admin/orders', {
      headers: { 'Authorization': `Bearer ${ADMIN_TOKEN}` }
    });
    if (!data.success) throw new Error('Response not successful');
    if (!data.stats) throw new Error('No stats returned');
    console.log(`   → Total orders: ${data.stats.total}, Revenue: $${data.stats.totalRevenue.toFixed(2)}`);
  })) passed++; else failed++;

  // Test 16: Clear test cart
  if (await test('16. DELETE /api/cart (cleanup)', async () => {
    const data = await fetchAPI('/cart', {
      method: 'DELETE',
      headers: { 'X-Session-ID': sessionId }
    });
    if (!data.success) throw new Error('Response not successful');
    if (data.cart.items.length !== 0) throw new Error('Cart not cleared');
    console.log(`   → Cart cleared`);
  })) passed++; else failed++;

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log(`\n📊 Test Results: ${passed}/${passed + failed} tests passed\n`);
  
  if (failed === 0) {
    console.log('✅ All tests passed! Your API is working perfectly.\n');
    console.log('Next steps:');
    console.log('  1. Deploy to Vercel: vercel --prod');
    console.log('  2. Set environment variables in Vercel dashboard');
    console.log('  3. Run tests against production URL');
    console.log('  4. Integrate with frontend\n');
  } else {
    console.log(`❌ ${failed} test(s) failed. Check the errors above.\n`);
    process.exit(1);
  }
}

// Run tests
runTests().catch(error => {
  console.error('\n💥 Fatal error:', error.message);
  process.exit(1);
});
