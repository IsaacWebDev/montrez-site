# Montrez Backend API

Complete e-commerce backend built with Vercel serverless functions.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env and add your keys
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Test API
```bash
npm run test:api
```

### 5. Deploy to Production
```bash
vercel --prod
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [BACKEND_API_COMPLETE.md](../BACKEND_API_COMPLETE.md) | Complete overview & guide |
| [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) | Full API reference |
| [QUICK_START.md](./QUICK_START.md) | Frontend integration guide |
| [DEPLOYMENT_CHECKLIST.md](../DEPLOYMENT_CHECKLIST.md) | Deployment steps |
| [BACKEND_DELIVERY_SUMMARY.md](../BACKEND_DELIVERY_SUMMARY.md) | What was delivered |

---

## 📦 Endpoints

### Customer APIs
- `GET /api/products` - Product catalog with filters
- `GET /api/cart` - Get cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart` - Update cart
- `DELETE /api/cart` - Remove from cart
- `POST /api/orders` - Create order
- `GET /api/orders` - Get order

### Admin APIs (Auth Required)
- `GET /api/admin/products` - List products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products` - Update product
- `DELETE /api/admin/products` - Delete product
- `GET /api/admin/orders` - List orders
- `PUT /api/admin/orders` - Update order
- `DELETE /api/admin/orders` - Cancel order

---

## 🧪 Testing

### Local Testing
```bash
# Test local dev server
npm run test:api

# Or manually
node test-backend.js
```

### Production Testing
```bash
# Test production deployment
npm run test:api:prod

# Or with custom URL
node test-backend.js https://your-domain.vercel.app
```

### Manual Testing with cURL
```bash
# Get products
curl http://localhost:3000/api/products

# Add to cart
curl -X POST http://localhost:3000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId":"essential-hoodie-black","name":"Essential Hoodie","price":85,"size":"L","quantity":1}'

# Admin: List products
curl http://localhost:3000/api/admin/products \
  -H "Authorization: Bearer montrez-admin-2026"
```

---

## ⚙️ Configuration

### Environment Variables

**Required:**
- `ADMIN_TOKEN` - Admin authentication token
- `RESEND_API_KEY` - Email service API key (from resend.com)

**Optional:**
- `DATABASE_URL` - Database connection (for future migration)
- `REDIS_URL` - Redis connection (for cart sessions)

### Get Resend API Key
1. Visit https://resend.com
2. Sign up (free: 3,000 emails/month)
3. Dashboard → API Keys → Create
4. Copy to `.env`: `RESEND_API_KEY=re_xxxxx`

---

## 📊 Data Files

### Products
- `products.json` - Original 8 products (used by API)
- `data/products-expanded.json` - Extended 15 products

**To use expanded products:**
Edit `api/products.js`:
```javascript
// Change this line:
const productsPath = path.join(process.cwd(), 'products.json');

// To this:
const productsPath = path.join(process.cwd(), 'data', 'products-expanded.json');
```

### Orders
- `data/orders.json` - Auto-created on first order
- JSON file storage (migrate to database for production scale)

---

## 🔧 Development

### Project Structure
```
api/
├── products.js              # Product catalog
├── cart.js                  # Cart management
├── orders.js                # Order processing
├── send-order-email.js      # Email service
└── admin/
    ├── products.js          # Product CRUD
    └── orders.js            # Order management
```

### Adding New Endpoints

1. Create file in `/api` folder
2. Export default function:
```javascript
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'GET') {
    return res.status(200).json({ success: true });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
```

3. Test locally: `http://localhost:3000/api/your-endpoint`

### Adding Products

**Option 1: Admin API**
```bash
curl -X POST http://localhost:3000/api/admin/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token" \
  -d '{
    "id": "new-product",
    "name": "New Product",
    "price": 99,
    "category": "T-Shirts",
    "sizes": ["S", "M", "L"],
    "images": ["/products/new.jpg"],
    "inStock": true
  }'
```

**Option 2: Edit JSON directly**
- Edit `products.json` or `data/products-expanded.json`
- Add new product object
- Restart dev server

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login**
```bash
vercel login
```

3. **Deploy**
```bash
vercel --prod
```

4. **Set Environment Variables**
- Vercel Dashboard → Project → Settings → Environment Variables
- Add `ADMIN_TOKEN` and `RESEND_API_KEY`
- Redeploy if needed

### Other Platforms

The API works on any platform supporting Node.js serverless functions:
- Netlify Functions
- AWS Lambda
- Azure Functions
- Cloudflare Workers (with modifications)

---

## 🔒 Security

### Admin Authentication
- Change `ADMIN_TOKEN` to a secure random string
- Use environment variables, never hardcode
- Rotate token periodically

### CORS
Current: Allows all origins (`*`)

**For production:**
```javascript
// Change in each API file:
res.setHeader('Access-Control-Allow-Origin', 'https://yourdomain.com');
```

### Rate Limiting
Not implemented by default.

**Add rate limiting:**
- Use Vercel Edge Config
- Or add middleware with `@vercel/edge`
- Recommended: 100 requests/minute per IP

---

## 📈 Performance

### Current Limits
- **Vercel Function Timeout:** 10s (free), 60s (pro)
- **Response Size:** 4.5MB max
- **Concurrent Executions:** Unlimited (auto-scales)

### Optimization Tips
1. **Cache products** (already cached in API)
2. **Use CDN** for product images
3. **Lazy load** non-critical data
4. **Paginate** large result sets
5. **Migrate to database** for >1000 products

---

## 🐛 Troubleshooting

### Common Issues

**"Cannot find module 'resend'"**
```bash
npm install
```

**"500 Internal Server Error"**
- Check environment variables are set
- View logs: `vercel logs`
- Check Node version: `node -v` (need v18+)

**"Email not sending"**
- Verify `RESEND_API_KEY` is correct
- Check Resend dashboard for errors
- API works without key (returns HTML preview)

**"401 Unauthorized" (Admin APIs)**
- Check Authorization header: `Bearer your-token`
- Verify token matches `ADMIN_TOKEN` in .env
- Ensure environment variables deployed to Vercel

**"Cart not persisting"**
- Check `X-Session-ID` header is sent
- Verify localStorage has `cart_session`
- Sessions expire after 24 hours

---

## 📞 Support

### Resources
- **Full docs:** See documentation files listed above
- **GitHub:** [Create issue](https://github.com/your-repo/issues)
- **Email:** support@montrez.com

### Quick Links
- API Docs: `./API_DOCUMENTATION.md`
- Integration Guide: `./QUICK_START.md`
- Deployment Guide: `../DEPLOYMENT_CHECKLIST.md`

---

## ✅ Checklist

Before going live:

- [ ] Deploy to Vercel
- [ ] Set environment variables
- [ ] Change ADMIN_TOKEN to secure value
- [ ] Test all endpoints (run `npm run test:api:prod`)
- [ ] Verify email sending works
- [ ] Update CORS for production domain
- [ ] Add rate limiting
- [ ] Upload real product images
- [ ] Test complete purchase flow
- [ ] Set up monitoring/alerts

---

**Built with ❤️ for Montrez**
