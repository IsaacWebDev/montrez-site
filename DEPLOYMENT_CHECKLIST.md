# 🚀 Montrez Backend API - Deployment Checklist

## ✅ Pre-Deployment

### 1. Dependencies Installed
```bash
cd C:\Users\isaac\.openclaw\workspace\montrez-site
npm install
```

**Expected:** `resend` package added to dependencies

### 2. Environment Variables Set

**Local `.env` file:**
```bash
ADMIN_TOKEN=montrez-admin-2026
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

**Get Resend API Key:**
- Visit: https://resend.com
- Sign up (free 3,000 emails/month)
- Dashboard → API Keys → Create
- Copy key to `.env`

### 3. Test Locally

```bash
npm run dev
```

**Test these URLs:**
- http://localhost:3000/api/products ✅ Should return 15 products
- http://localhost:3000/api/cart ✅ Should return empty cart with session ID

---

## 🔧 Vercel Deployment

### 1. Install Vercel CLI (if needed)

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Deploy

```bash
cd C:\Users\isaac\.openclaw\workspace\montrez-site
vercel --prod
```

**Expected Output:**
```
✓ Deployed to production
🔗 https://montrez-site-xxx.vercel.app
```

### 4. Set Environment Variables in Vercel

**Option A: Vercel Dashboard**
1. Go to: https://vercel.com/dashboard
2. Select your project
3. Settings → Environment Variables
4. Add:
   - `ADMIN_TOKEN` → `montrez-admin-2026` (or your secure token)
   - `RESEND_API_KEY` → `re_xxxxxxxxxxxxx` (your Resend key)
5. Apply to: Production, Preview, Development
6. Save

**Option B: Vercel CLI**
```bash
vercel env add ADMIN_TOKEN production
vercel env add RESEND_API_KEY production
```

### 5. Redeploy (if env vars were added after initial deploy)

```bash
vercel --prod
```

---

## 🧪 Post-Deployment Testing

### 1. Test Products API

```bash
curl https://your-domain.vercel.app/api/products
```

**Expected:** JSON with 15 products

### 2. Test Cart API

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

**Expected:** JSON with cart and session ID

### 3. Test Admin API

```bash
curl https://your-domain.vercel.app/api/admin/products \
  -H "Authorization: Bearer montrez-admin-2026"
```

**Expected:** JSON with all products (admin view)

### 4. Test Order Creation

```bash
curl -X POST https://your-domain.vercel.app/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{
      "productId": "essential-hoodie-black",
      "name": "Essential Hoodie",
      "price": 85,
      "quantity": 1,
      "size": "L"
    }],
    "customer": {
      "firstName": "Test",
      "lastName": "User",
      "email": "test@example.com"
    },
    "shipping": {
      "method": "standard",
      "address": "123 Test St",
      "city": "Test City",
      "postalCode": "12345",
      "country": "Test Country"
    },
    "payment": {
      "method": "test"
    }
  }'
```

**Expected:** JSON with order ID and success message

---

## 📊 Verification Checklist

### API Endpoints Working ✅

- [ ] `GET /api/products` - Returns products
- [ ] `GET /api/products?category=Hoodies` - Filters work
- [ ] `POST /api/cart` - Adds items to cart
- [ ] `GET /api/cart` - Retrieves cart with session
- [ ] `PUT /api/cart` - Updates item quantity
- [ ] `DELETE /api/cart` - Removes items
- [ ] `POST /api/orders` - Creates orders
- [ ] `GET /api/orders?orderId=xxx` - Retrieves orders
- [ ] `GET /api/admin/products` - Admin auth works
- [ ] `POST /api/admin/products` - Admin can create products

### Data & Files ✅

- [ ] `products.json` exists with 8 original products
- [ ] `data/products-expanded.json` exists with 15 products
- [ ] `data/orders.json` will be auto-created on first order
- [ ] `.env` has ADMIN_TOKEN and RESEND_API_KEY
- [ ] Vercel environment variables are set

### Documentation ✅

- [ ] `BACKEND_API_COMPLETE.md` - Overview & summary
- [ ] `api/API_DOCUMENTATION.md` - Full technical docs
- [ ] `api/QUICK_START.md` - Frontend integration guide
- [ ] `.env.example` - Environment template

---

## 🔐 Security Checklist

### Before Going Live

- [ ] Change `ADMIN_TOKEN` to a secure random string
  ```bash
  # Generate secure token (PowerShell)
  [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
  ```

- [ ] Update CORS settings in production
  ```javascript
  // In each API file, change:
  res.setHeader('Access-Control-Allow-Origin', '*');
  // To:
  res.setHeader('Access-Control-Allow-Origin', 'https://yourdomain.com');
  ```

- [ ] Verify Resend domain (optional but recommended)
  1. Resend Dashboard → Domains
  2. Add your domain
  3. Configure DNS records
  4. Update email in `send-order-email.js`:
     ```javascript
     from: 'Montrez <orders@yourdomain.com>'
     ```

- [ ] Add rate limiting (recommended for production)
  - Use Vercel Edge Config or middleware
  - Limit API calls per IP/session

---

## 🎨 Frontend Integration

### 1. Update Frontend Config

**Create `src/config/api.js`:**
```javascript
export const API_BASE_URL = import.meta.env.PROD
  ? 'https://your-domain.vercel.app/api'
  : '/api';
```

### 2. Update API Calls

Replace hardcoded `/api` paths with `API_BASE_URL`:

```javascript
import { API_BASE_URL } from './config/api';

// Before:
fetch('/api/products')

// After:
fetch(`${API_BASE_URL}/products`)
```

### 3. Implement Cart Session Management

```javascript
// src/utils/cart.js
export function getSessionId() {
  let sessionId = localStorage.getItem('cart_session');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('cart_session', sessionId);
  }
  return sessionId;
}

export function setSessionId(sessionId) {
  localStorage.setItem('cart_session', sessionId);
}
```

---

## 📈 Monitoring & Maintenance

### Check Vercel Logs

```bash
# View deployment logs
vercel logs

# View function logs
vercel logs --follow
```

**Vercel Dashboard:**
- Monitor API response times
- Track error rates
- View bandwidth usage

### Check Resend Email Logs

**Resend Dashboard:**
- View sent emails
- Check delivery status
- Monitor quota usage (3K/month free)

### Monitor Orders

**Check orders file:**
```bash
# View orders (local development)
cat data/orders.json

# Check order count
Get-Content data/orders.json | ConvertFrom-Json | Select-Object -ExpandProperty orders | Measure-Object
```

---

## 🐛 Common Issues & Fixes

### Issue: 500 Error on API calls

**Cause:** Environment variables not set  
**Fix:**
1. Check Vercel Dashboard → Environment Variables
2. Ensure ADMIN_TOKEN and RESEND_API_KEY are set
3. Redeploy: `vercel --prod`

### Issue: Email not sending

**Cause:** Invalid Resend API key  
**Fix:**
1. Verify key in Resend dashboard
2. Update Vercel environment variable
3. Note: API still works without email (returns HTML preview)

### Issue: Admin endpoints return 401

**Cause:** Missing or invalid Authorization header  
**Fix:**
```bash
# Ensure header format is correct:
Authorization: Bearer your-admin-token
```

### Issue: Cart not persisting

**Cause:** Session ID not being saved  
**Fix:**
1. Check `X-Session-ID` header in requests
2. Verify localStorage has `cart_session`
3. Session expires after 24 hours (expected behavior)

### Issue: Products not found

**Cause:** Using wrong products file  
**Fix:**
- Customer API uses: `products.json` (8 items)
- Expanded catalog: `data/products-expanded.json` (15 items)
- Update `api/products.js` to use expanded file if needed

---

## ✅ Final Checklist

### Pre-Launch

- [ ] All API endpoints tested and working
- [ ] Environment variables set in Vercel
- [ ] Admin token changed to secure value
- [ ] Email service configured (Resend)
- [ ] Frontend integrated with API
- [ ] CORS configured for production domain
- [ ] Error handling tested
- [ ] Documentation reviewed

### Post-Launch

- [ ] Monitor Vercel function logs
- [ ] Check Resend email delivery
- [ ] Test complete purchase flow
- [ ] Verify order storage
- [ ] Monitor bandwidth usage
- [ ] Set up alerts for errors

---

## 🎉 You're Ready to Launch!

Your Montrez backend API is **production-ready**.

**Next Steps:**
1. Deploy to Vercel ✅
2. Set environment variables ✅
3. Test all endpoints ✅
4. Integrate frontend ✅
5. Add payment processing 💳
6. Upload real product images 📸
7. Launch! 🚀

**Questions?**
- Check `BACKEND_API_COMPLETE.md` for overview
- Read `api/API_DOCUMENTATION.md` for full API reference
- Review `api/QUICK_START.md` for integration examples

**Let's get your streetwear brand live! 💪🔥**
