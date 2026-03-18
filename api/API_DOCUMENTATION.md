# Montrez E-Commerce API Documentation

## Base URL
```
Production: https://your-domain.vercel.app/api
Development: http://localhost:3000/api
```

---

## 🛍️ Products API

### GET /api/products
Fetch products with optional filters.

**Query Parameters:**
- `size` - Filter by size (e.g., "S", "M", "L", "XL")
- `color` - Filter by color (e.g., "Black", "White")
- `collection` - Filter by collection (e.g., "Essentials", "Graphics")
- `category` - Filter by category (e.g., "Hoodies", "T-Shirts")
- `minPrice` - Minimum price filter (number)
- `maxPrice` - Maximum price filter (number)
- `inStock` - Filter in-stock only (boolean: "true")
- `featured` - Filter featured only (boolean: "true")
- `search` - Search by name/description/tags (string)

**Example Requests:**
```bash
# Get all products
GET /api/products

# Get black hoodies
GET /api/products?color=Black&category=Hoodies

# Get products under $50
GET /api/products?maxPrice=50

# Search for "essential"
GET /api/products?search=essential

# Get featured products in stock
GET /api/products?featured=true&inStock=true
```

**Response:**
```json
{
  "success": true,
  "count": 15,
  "products": [
    {
      "id": "essential-hoodie-black",
      "sku": "MNTRZ-ESS-HOO-BLK",
      "name": "Essential Hoodie",
      "price": 85,
      "currency": "USD",
      "category": "Hoodies",
      "collection": "Essentials",
      "color": "Black",
      "description": "Premium heavyweight cotton hoodie...",
      "sizes": ["S", "M", "L", "XL", "XXL"],
      "images": ["/products/hoodie-black-1.jpg"],
      "inStock": true,
      "featured": true,
      "tags": ["essential", "staple"]
    }
  ]
}
```

---

## 🛒 Cart API

### GET /api/cart
Get current cart contents.

**Headers:**
- `X-Session-ID` - (Optional) Session identifier for cart persistence

**Response:**
```json
{
  "success": true,
  "sessionId": "session_1234567890_abc123",
  "cart": {
    "items": [
      {
        "productId": "essential-hoodie-black",
        "name": "Essential Hoodie",
        "price": 85,
        "size": "L",
        "color": "Black",
        "quantity": 2,
        "image": "/products/hoodie-black-1.jpg",
        "addedAt": "2026-03-18T10:00:00.000Z"
      }
    ],
    "itemCount": 2,
    "total": 170
  }
}
```

### POST /api/cart
Add item to cart.

**Headers:**
- `X-Session-ID` - (Optional) Session identifier

**Body:**
```json
{
  "productId": "essential-hoodie-black",
  "name": "Essential Hoodie",
  "price": 85,
  "size": "L",
  "color": "Black",
  "quantity": 1,
  "image": "/products/hoodie-black-1.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "sessionId": "session_1234567890_abc123",
  "cart": {
    "items": [...],
    "itemCount": 3,
    "total": 255
  }
}
```

### PUT /api/cart
Update item quantity.

**Headers:**
- `X-Session-ID` - Session identifier

**Body:**
```json
{
  "productId": "essential-hoodie-black",
  "size": "L",
  "color": "Black",
  "quantity": 3
}
```

### DELETE /api/cart
Remove item from cart or clear entire cart.

**Headers:**
- `X-Session-ID` - Session identifier

**Query Parameters:**
- `productId` - (Optional) Product ID to remove
- `size` - (Optional) Size to match
- `color` - (Optional) Color to match

**Examples:**
```bash
# Clear entire cart
DELETE /api/cart

# Remove specific item
DELETE /api/cart?productId=essential-hoodie-black&size=L&color=Black
```

---

## 📦 Orders API

### POST /api/orders
Create a new order.

**Body:**
```json
{
  "items": [
    {
      "productId": "essential-hoodie-black",
      "name": "Essential Hoodie",
      "price": 85,
      "quantity": 2,
      "size": "L",
      "color": "Black",
      "image": "/products/hoodie-black-1.jpg"
    }
  ],
  "customer": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "notes": "Please ring doorbell"
  },
  "shipping": {
    "method": "standard",
    "address": "123 Main Street",
    "address2": "Apt 4B",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "United States"
  },
  "payment": {
    "method": "stripe"
  },
  "sessionId": "session_1234567890_abc123"
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "orderId": "MNTRZ-1710756000000-A1B2C3",
    "status": "pending",
    "total": 193.5,
    "currency": "USD",
    "createdAt": "2026-03-18T10:00:00.000Z"
  },
  "message": "Order created successfully"
}
```

### GET /api/orders
Retrieve orders by order ID or customer email.

**Query Parameters:**
- `orderId` - Order ID to retrieve
- `email` - Customer email to retrieve all orders

**Examples:**
```bash
# Get specific order
GET /api/orders?orderId=MNTRZ-1710756000000-A1B2C3

# Get all orders for email
GET /api/orders?email=john@example.com
```

**Response:**
```json
{
  "success": true,
  "count": 1,
  "orders": [
    {
      "orderId": "MNTRZ-1710756000000-A1B2C3",
      "status": "pending",
      "createdAt": "2026-03-18T10:00:00.000Z",
      "customer": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "phone": "+1234567890"
      },
      "items": [...],
      "shipping": {...},
      "pricing": {
        "subtotal": 170,
        "shipping": 10,
        "tax": 17,
        "total": 197,
        "currency": "USD"
      }
    }
  ]
}
```

---

## 📧 Email API

### POST /api/send-order-email
Send order confirmation email (called automatically by orders API).

**Environment Variable Required:**
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

**Body:**
```json
{
  "order": {
    "orderId": "MNTRZ-1710756000000-A1B2C3",
    "customer": { "email": "john@example.com", ... },
    "items": [...],
    "pricing": {...}
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order confirmation email sent",
  "emailId": "email_xxxxxxxxxxxxx"
}
```

---

## 🔐 Admin API

**Authentication Required:**
All admin endpoints require Bearer token authentication.

**Headers:**
```
Authorization: Bearer montrez-admin-2026
```

Set custom token via environment variable:
```bash
ADMIN_TOKEN=your-secure-token
```

### GET /api/admin/products
List all products (admin view).

**Response:**
```json
{
  "success": true,
  "count": 15,
  "products": [...]
}
```

### POST /api/admin/products
Create new product.

**Body:**
```json
{
  "id": "new-product-001",
  "sku": "MNTRZ-NEW-001",
  "name": "New Product",
  "price": 99,
  "currency": "USD",
  "category": "T-Shirts",
  "collection": "New",
  "description": "Product description",
  "sizes": ["S", "M", "L"],
  "images": ["/products/new-1.jpg"],
  "inStock": true,
  "featured": false,
  "tags": ["new", "limited"]
}
```

### PUT /api/admin/products?id={productId}
Update existing product.

**Body:** (any product fields to update)
```json
{
  "price": 79,
  "inStock": false,
  "featured": true
}
```

### DELETE /api/admin/products?id={productId}
Delete product.

---

### GET /api/admin/orders
List all orders with filters.

**Query Parameters:**
- `status` - Filter by status (pending, confirmed, processing, shipped, delivered, cancelled)
- `email` - Filter by customer email
- `startDate` - Filter orders after this date (YYYY-MM-DD)
- `endDate` - Filter orders before this date (YYYY-MM-DD)
- `limit` - Max results (default: 100)

**Response:**
```json
{
  "success": true,
  "stats": {
    "total": 156,
    "filtered": 10,
    "pending": 5,
    "confirmed": 3,
    "processing": 2,
    "shipped": 1,
    "delivered": 145,
    "totalRevenue": 23450.50
  },
  "count": 10,
  "orders": [...]
}
```

### PUT /api/admin/orders?orderId={orderId}
Update order status.

**Body:**
```json
{
  "status": "shipped",
  "notes": "Tracking number: 1234567890"
}
```

### DELETE /api/admin/orders?orderId={orderId}
Cancel order (soft delete).

---

## 🔒 Environment Variables

Create `.env` file in project root:

```bash
# Admin Authentication
ADMIN_TOKEN=your-secure-admin-token

# Email Service (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Optional: Database (future)
# DATABASE_URL=postgresql://...
```

---

## 🚀 Deployment

### Vercel Deployment

1. **Install dependencies:**
```bash
npm install
```

2. **Set environment variables in Vercel:**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add `ADMIN_TOKEN` and `RESEND_API_KEY`

3. **Deploy:**
```bash
vercel --prod
```

### Local Development

```bash
# Install dependencies
npm install

# Create .env file
echo "ADMIN_TOKEN=dev-token" > .env
echo "RESEND_API_KEY=re_xxxxx" >> .env

# Start dev server
npm run dev
```

API will be available at: `http://localhost:3000/api`

---

## 📊 Data Storage

**Current Implementation:**
- Products: `products.json` (file-based, read-only for customers)
- Orders: `data/orders.json` (file-based, appended on each order)
- Cart: In-memory with 24h session timeout

**Production Recommendations:**
- **Products:** Keep file-based or move to database for larger catalogs
- **Orders:** Use PostgreSQL/MongoDB for scalability
- **Cart:** Use Redis for session management
- **Admin:** Implement proper JWT authentication

---

## 🔧 Testing

### Using cURL

```bash
# Get products
curl https://your-domain.vercel.app/api/products

# Add to cart
curl -X POST https://your-domain.vercel.app/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId":"essential-hoodie-black","name":"Essential Hoodie","price":85,"size":"L","quantity":1}'

# Create order
curl -X POST https://your-domain.vercel.app/api/orders \
  -H "Content-Type: application/json" \
  -d @order.json

# Admin: List products
curl https://your-domain.vercel.app/api/admin/products \
  -H "Authorization: Bearer montrez-admin-2026"
```

### Using JavaScript

```javascript
// Fetch products
const products = await fetch('/api/products?category=Hoodies').then(r => r.json());

// Add to cart
const cartResponse = await fetch('/api/cart', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Session-ID': sessionId
  },
  body: JSON.stringify({
    productId: 'essential-hoodie-black',
    name: 'Essential Hoodie',
    price: 85,
    size: 'L',
    quantity: 1
  })
});

const cart = await cartResponse.json();
console.log('Cart:', cart);
```

---

## 🐛 Error Responses

All endpoints return consistent error format:

```json
{
  "success": false,
  "error": "Human-readable error message",
  "message": "Technical error details (optional)"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (admin only)
- `404` - Not Found
- `405` - Method Not Allowed
- `409` - Conflict (duplicate)
- `500` - Internal Server Error

---

## 📝 Notes

1. **Session Management:** Cart uses `X-Session-ID` header for persistence. Store this in localStorage on frontend.

2. **CORS:** All endpoints allow cross-origin requests (`*`). Restrict in production.

3. **Rate Limiting:** Not implemented. Add rate limiting middleware for production.

4. **Payment Integration:** Order API accepts payment method but doesn't process payments. Integrate Stripe/PayPal separately.

5. **Image Uploads:** Product images are referenced by path. Implement image upload endpoint separately.

6. **Inventory Management:** No real-time inventory tracking. Add inventory decrement logic when orders are placed.

---

## 📞 Support

For issues or questions:
- Email: support@montrez.com
- GitHub: [your-repo]/issues
