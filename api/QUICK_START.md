# Backend API Quick Start Guide

## ✅ Setup Complete

Your Montrez backend API is ready to use! Here's what's been created:

### 📁 API Endpoints Created

```
/api/products.js          - Product catalog with filters
/api/cart.js              - Session-based cart management
/api/orders.js            - Order creation and retrieval
/api/send-order-email.js  - Email confirmations (Resend)
/api/admin/products.js    - Admin product management (CRUD)
/api/admin/orders.js      - Admin order management
```

### 📊 Sample Data

- **15 streetwear products** in `data/products-expanded.json`
- Categories: Hoodies, T-Shirts, Joggers, Shorts, Accessories
- Collections: Essentials, Graphics, Street, Premium, Archive
- Price range: $35 - $110

---

## 🚀 Quick Deploy to Vercel

### 1. Install Dependencies

```bash
cd C:\Users\isaac\.openclaw\workspace\montrez-site
npm install
```

### 2. Set Environment Variables

Create `.env` file:

```bash
# Admin Authentication (change this!)
ADMIN_TOKEN=your-secure-admin-token-here

# Email Service (get free API key from resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### 3. Test Locally

```bash
npm run dev
```

Visit: `http://localhost:3000/api/products`

### 4. Deploy to Vercel

```bash
# Install Vercel CLI (if not already)
npm install -g vercel

# Deploy
vercel --prod
```

In Vercel Dashboard:
1. Go to Settings → Environment Variables
2. Add `ADMIN_TOKEN` and `RESEND_API_KEY`
3. Redeploy if needed

---

## 🧪 Test Your API

### Test Products Endpoint

```bash
curl https://your-domain.vercel.app/api/products
```

Expected: JSON with 15 products

### Test Cart Endpoint

```bash
curl -X POST https://your-domain.vercel.app/api/cart \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "essential-hoodie-black",
    "name": "Essential Hoodie",
    "price": 85,
    "size": "L",
    "quantity": 1
  }'
```

Expected: Cart with session ID and item

### Test Admin Endpoint

```bash
curl https://your-domain.vercel.app/api/admin/products \
  -H "Authorization: Bearer your-admin-token"
```

Expected: All products (admin view)

---

## 🎨 Frontend Integration

### 1. Fetch Products

```javascript
// Fetch all products
async function getProducts() {
  const response = await fetch('/api/products');
  const data = await response.json();
  return data.products;
}

// Fetch with filters
async function getHoodies() {
  const response = await fetch('/api/products?category=Hoodies&inStock=true');
  const data = await response.json();
  return data.products;
}
```

### 2. Cart Management

```javascript
// Get or create session ID
let sessionId = localStorage.getItem('cart_session');

// Add to cart
async function addToCart(product, size, quantity = 1) {
  const response = await fetch('/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Session-ID': sessionId || ''
    },
    body: JSON.stringify({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: size,
      color: product.color,
      quantity: quantity,
      image: product.images[0]
    })
  });
  
  const data = await response.json();
  
  // Save session ID
  if (data.sessionId) {
    sessionId = data.sessionId;
    localStorage.setItem('cart_session', sessionId);
  }
  
  return data.cart;
}

// Get cart
async function getCart() {
  const response = await fetch('/api/cart', {
    headers: {
      'X-Session-ID': sessionId || ''
    }
  });
  
  const data = await response.json();
  
  if (data.sessionId) {
    sessionId = data.sessionId;
    localStorage.setItem('cart_session', sessionId);
  }
  
  return data.cart;
}

// Update quantity
async function updateCartItem(productId, size, color, newQuantity) {
  const response = await fetch('/api/cart', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Session-ID': sessionId
    },
    body: JSON.stringify({
      productId,
      size,
      color,
      quantity: newQuantity
    })
  });
  
  return await response.json();
}

// Remove item
async function removeFromCart(productId, size, color) {
  const url = new URL('/api/cart', window.location.origin);
  url.searchParams.append('productId', productId);
  if (size) url.searchParams.append('size', size);
  if (color) url.searchParams.append('color', color);
  
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'X-Session-ID': sessionId
    }
  });
  
  return await response.json();
}

// Clear cart
async function clearCart() {
  const response = await fetch('/api/cart', {
    method: 'DELETE',
    headers: {
      'X-Session-ID': sessionId
    }
  });
  
  return await response.json();
}
```

### 3. Checkout / Create Order

```javascript
async function createOrder(cart, customerInfo, shippingInfo) {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      items: cart.items,
      customer: {
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        email: customerInfo.email,
        phone: customerInfo.phone,
        notes: customerInfo.notes
      },
      shipping: {
        method: shippingInfo.method, // 'standard' or 'express'
        address: shippingInfo.address,
        address2: shippingInfo.address2,
        city: shippingInfo.city,
        state: shippingInfo.state,
        postalCode: shippingInfo.postalCode,
        country: shippingInfo.country
      },
      payment: {
        method: 'stripe' // or your payment method
      },
      sessionId: sessionId
    })
  });
  
  const data = await response.json();
  
  if (data.success) {
    // Order created! Clear cart
    localStorage.removeItem('cart_session');
    return data.order;
  } else {
    throw new Error(data.error);
  }
}
```

### 4. Order Tracking

```javascript
// Get order by ID
async function getOrder(orderId) {
  const response = await fetch(`/api/orders?orderId=${orderId}`);
  const data = await response.json();
  return data.orders[0];
}

// Get all orders for email
async function getCustomerOrders(email) {
  const response = await fetch(`/api/orders?email=${encodeURIComponent(email)}`);
  const data = await response.json();
  return data.orders;
}
```

---

## 🎯 React Component Example

### Product Listing

```jsx
import { useEffect, useState } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products?inStock=true')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  const addToCart = async (size) => {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-ID': localStorage.getItem('cart_session') || ''
      },
      body: JSON.stringify({
        productId: product.id,
        name: product.name,
        price: product.price,
        size: size,
        color: product.color,
        quantity: 1,
        image: product.images[0]
      })
    });

    const data = await response.json();
    if (data.sessionId) {
      localStorage.setItem('cart_session', data.sessionId);
    }

    alert('Added to cart!');
  };

  return (
    <div className="product-card">
      <img src={product.images[0]} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <select onChange={(e) => addToCart(e.target.value)}>
        <option value="">Select Size</option>
        {product.sizes.map(size => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select>
    </div>
  );
}
```

### Shopping Cart

```jsx
import { useEffect, useState } from 'react';

function ShoppingCart() {
  const [cart, setCart] = useState(null);
  const sessionId = localStorage.getItem('cart_session');

  useEffect(() => {
    if (sessionId) {
      fetch('/api/cart', {
        headers: { 'X-Session-ID': sessionId }
      })
        .then(res => res.json())
        .then(data => setCart(data.cart));
    }
  }, [sessionId]);

  const updateQuantity = async (item, newQty) => {
    const response = await fetch('/api/cart', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-ID': sessionId
      },
      body: JSON.stringify({
        productId: item.productId,
        size: item.size,
        color: item.color,
        quantity: newQty
      })
    });

    const data = await response.json();
    setCart(data.cart);
  };

  if (!cart || cart.items.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div className="cart">
      <h2>Shopping Cart ({cart.itemCount} items)</h2>
      {cart.items.map((item, i) => (
        <div key={i} className="cart-item">
          <img src={item.image} alt={item.name} />
          <div>
            <h4>{item.name}</h4>
            <p>Size: {item.size} | Color: {item.color}</p>
            <p>${item.price}</p>
          </div>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateQuantity(item, parseInt(e.target.value))}
            min="0"
          />
          <p>${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}
      <div className="cart-total">
        <h3>Total: ${cart.total.toFixed(2)}</h3>
        <button onClick={() => window.location.href = '/checkout'}>
          Checkout
        </button>
      </div>
    </div>
  );
}
```

---

## 🔐 Admin Panel Integration

```javascript
const ADMIN_TOKEN = 'your-admin-token';

// Fetch all orders (admin)
async function getAdminOrders(filters = {}) {
  const params = new URLSearchParams(filters);
  
  const response = await fetch(`/api/admin/orders?${params}`, {
    headers: {
      'Authorization': `Bearer ${ADMIN_TOKEN}`
    }
  });
  
  return await response.json();
}

// Update order status
async function updateOrderStatus(orderId, newStatus) {
  const response = await fetch(`/api/admin/orders?orderId=${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ADMIN_TOKEN}`
    },
    body: JSON.stringify({
      status: newStatus
    })
  });
  
  return await response.json();
}

// Add new product
async function addProduct(productData) {
  const response = await fetch('/api/admin/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ADMIN_TOKEN}`
    },
    body: JSON.stringify(productData)
  });
  
  return await response.json();
}
```

---

## 📧 Email Setup

### Get Resend API Key (FREE)

1. Go to [resend.com](https://resend.com)
2. Sign up (free 3,000 emails/month)
3. Get API key
4. Add to `.env`: `RESEND_API_KEY=re_xxxxx`

### Verify Domain (Optional)

For production, verify your domain:
1. Resend Dashboard → Domains
2. Add your domain
3. Add DNS records
4. Update email in `/api/send-order-email.js`:
   ```javascript
   from: 'Montrez <orders@yourdomain.com>'
   ```

---

## 🎉 You're Ready!

Your backend API is fully functional and ready to use with your frontend.

**Next steps:**
1. Deploy to Vercel
2. Set environment variables
3. Integrate with frontend
4. Add payment processing (Stripe/PayPal)
5. Add product images
6. Test checkout flow

**Need help?**
- Full API docs: `api/API_DOCUMENTATION.md`
- Test endpoints with the examples above
- Check console logs for errors
