# PayFast Integration Guide - Montrez E-commerce

Complete PayFast payment processing integration with Supabase backend.

## 🎯 Overview

This integration provides:
- ✅ Secure PayFast payment gateway integration
- ✅ Supabase orders database with RLS policies
- ✅ Automated order confirmation emails via Resend
- ✅ Payment signature verification
- ✅ ITN (Instant Transaction Notification) handling
- ✅ Transaction audit trail

## 📁 Files Created

### Database
- `database/schema.sql` - Supabase orders table schema

### API Routes
- `api/payment/initiate.js` - Create order and generate PayFast payment
- `api/payment/callback.js` - Handle PayFast ITN notifications
- `api/payment/return.js` - Handle user return from PayFast

### Utilities
- `api/utils/payfast.js` - PayFast helper functions (signatures, validation)
- `api/utils/supabase.js` - Supabase client and order operations

### Email
- `api/send-order-confirmation.js` - Resend email template

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install @supabase/supabase-js
```

### 2. Setup Supabase

1. Create account at https://supabase.com
2. Create new project
3. Go to SQL Editor
4. Copy and run `database/schema.sql`
5. Verify table created: `orders` table should exist

Get your credentials:
- Go to Project Settings > API
- Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- Copy `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Copy `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

### 3. Setup PayFast

#### Sandbox (Testing)
1. Go to https://sandbox.payfast.co.za
2. Create account
3. Login to merchant dashboard
4. Go to Settings > Integration
5. Copy credentials:
   - Merchant ID: `10000100` (default sandbox)
   - Merchant Key: `46f0cd694581a` (default sandbox)
   - Passphrase: Create a secure passphrase

#### Production
1. Register at https://www.payfast.co.za
2. Complete business verification
3. Get your live merchant credentials
4. Set `PAYFAST_MODE=live`

### 4. Setup Resend (Email)

1. Go to https://resend.com
2. Create account (free: 3,000 emails/month)
3. Go to API Keys
4. Create new API key → Copy to `RESEND_API_KEY`
5. Verify your sending domain or use `onboarding@resend.dev` for testing

### 5. Environment Variables

Update `.env` with:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://montrez.vercel.app

# PayFast
PAYFAST_MERCHANT_ID=10000100
PAYFAST_MERCHANT_KEY=46f0cd694581a
PAYFAST_PASSPHRASE=your-secure-passphrase-here
PAYFAST_MODE=sandbox

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxx
EMAIL_FROM=MONTREZ <orders@montrez.co.za>

# Admin (existing)
ADMIN_TOKEN=montrez-admin-2026
VITE_PASSWORD=NOTFOREVERYONE
```

### 6. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Add environment variables
vercel env add PAYFAST_MERCHANT_ID
vercel env add PAYFAST_MERCHANT_KEY
vercel env add PAYFAST_PASSPHRASE
vercel env add PAYFAST_MODE
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add RESEND_API_KEY
vercel env add EMAIL_FROM
vercel env add NEXT_PUBLIC_SITE_URL
```

## 🔄 Payment Flow

### 1. User Checkout
```
POST /api/payment/initiate
{
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+27123456789"
  },
  "shipping": {
    "street": "123 Main St",
    "city": "Johannesburg",
    "postal_code": "2001",
    "province": "Gauteng"
  },
  "items": [
    {
      "productId": "tee-01",
      "name": "Classic Tee",
      "price": 45000,
      "quantity": 2,
      "size": "L",
      "color": "Black"
    }
  ],
  "subtotal": 90000,
  "shippingCost": 10000,
  "total": 100000
}

Response:
{
  "success": true,
  "order": {
    "id": "uuid",
    "order_number": "MTZ-20260324-A3F9K",
    "total": 100000,
    "payment_status": "pending"
  },
  "payment": {
    "url": "https://sandbox.payfast.co.za/eng/process",
    "data": { merchant_id, amount, signature, ... }
  }
}
```

### 2. Redirect to PayFast
Frontend creates form with payment data and submits to PayFast URL.

### 3. User Pays
User completes payment on PayFast.

### 4. PayFast ITN Callback
```
POST /api/payment/callback
(PayFast sends ITN data)

- Verifies PayFast IP
- Verifies signature
- Validates amount
- Updates order status
- Sends confirmation email (if paid)
```

### 5. User Returns
```
GET /api/payment/return?order_id=uuid

Redirects to:
- Success: /order-confirmation?order_number=MTZ-20260324-A3F9K&status=success
- Failed: /checkout?error=payment_failed
- Pending: /order-confirmation?order_number=MTZ-20260324-A3F9K&status=pending
```

## 💰 Pricing (South African Rands)

All amounts stored in **cents** (1 Rand = 100 cents):
- R100.00 = `10000` cents
- R500.00 = `50000` cents
- R1,499.00 = `149900` cents

**Example Order:**
```javascript
{
  subtotal: 90000,      // R900.00 (2 items × R450.00)
  shipping_cost: 10000, // R100.00 (flat rate)
  total: 100000         // R1,000.00
}
```

## 🔐 Security Features

### 1. Signature Verification
All PayFast requests verified with MD5 signature:
```javascript
import { verifySignature } from './api/utils/payfast.js';

const isValid = verifySignature(data, signature, passphrase);
```

### 2. IP Whitelisting
Only PayFast IPs can send ITN:
```javascript
import { verifyPayFastIP } from './api/utils/payfast.js';

const isValidIP = verifyPayFastIP(clientIP);
```

### 3. Amount Validation
Order totals verified against PayFast amounts:
```javascript
import { validateAmount } from './api/utils/payfast.js';

const isValid = validateAmount(payfastAmount, orderTotal);
```

### 4. Input Sanitization
All payment data sanitized:
```javascript
import { sanitizePaymentData } from './api/utils/payfast.js';

const clean = sanitizePaymentData(rawData);
```

### 5. Transaction Logging
All transactions logged for audit:
```javascript
import { logTransaction } from './api/utils/payfast.js';

logTransaction('callback_received', data);
```

## 📧 Email Template

Professional HTML email sent after successful payment includes:
- ✅ Order confirmation
- ✅ Order number
- ✅ Order date
- ✅ Itemized list with quantities
- ✅ Pricing breakdown (subtotal, shipping, total)
- ✅ Shipping address
- ✅ Contact information
- ✅ Montrez brand styling

## 🧪 Testing

### Test Payment Flow

1. **Sandbox Mode**: Use PayFast sandbox credentials
2. **Test Cards**: Use PayFast test card numbers
3. **Check Logs**: Monitor console for PayFast transactions

### Test Orders

```bash
# Test order creation
curl -X POST http://localhost:3000/api/payment/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {"name": "Test User", "email": "test@example.com"},
    "shipping": {"street": "123 Test St", "city": "JHB", "postal_code": "2001", "province": "Gauteng"},
    "items": [{"productId": "test", "name": "Test Item", "price": 50000, "quantity": 1}],
    "subtotal": 50000,
    "shippingCost": 10000,
    "total": 60000
  }'
```

## 📊 Database Schema

### Orders Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `order_number` | TEXT | Format: MTZ-YYYYMMDD-XXXXX |
| `customer_email` | TEXT | Customer email |
| `customer_name` | TEXT | Customer name |
| `customer_phone` | TEXT | Customer phone (optional) |
| `shipping_address` | JSONB | Shipping address object |
| `items` | JSONB | Array of order items |
| `subtotal` | INTEGER | Subtotal in cents |
| `shipping_cost` | INTEGER | Shipping in cents (R100 = 10000) |
| `total` | INTEGER | Total in cents |
| `payment_status` | TEXT | pending/paid/failed/refunded |
| `payment_id` | TEXT | PayFast transaction ID |
| `payfast_data` | JSONB | Full PayFast ITN data |
| `created_at` | TIMESTAMPTZ | Order creation time |
| `updated_at` | TIMESTAMPTZ | Last update time |

### Query Examples

```sql
-- Get all paid orders
SELECT * FROM orders WHERE payment_status = 'paid' ORDER BY created_at DESC;

-- Get customer orders
SELECT * FROM orders WHERE customer_email = 'john@example.com';

-- Get order by number
SELECT * FROM orders WHERE order_number = 'MTZ-20260324-A3F9K';

-- Orders today
SELECT * FROM orders WHERE DATE(created_at) = CURRENT_DATE;

-- Revenue today
SELECT SUM(total) / 100.0 as revenue_zar 
FROM orders 
WHERE payment_status = 'paid' 
AND DATE(created_at) = CURRENT_DATE;
```

## 🚨 Common Issues

### 1. ITN Not Received
**Problem**: PayFast ITN callback not hitting your server.

**Solution**:
- Ensure `notify_url` is publicly accessible (not localhost)
- Check PayFast dashboard for ITN logs
- Verify no firewall blocking PayFast IPs

### 2. Signature Mismatch
**Problem**: Signature verification failing.

**Solution**:
- Ensure passphrase matches PayFast settings
- Check URL encoding in signature generation
- Verify no extra spaces in merchant credentials

### 3. Amount Mismatch
**Problem**: Amount validation failing.

**Solution**:
- Ensure amounts in cents, not rands
- PayFast sends format "500.00" (rands with decimals)
- Convert properly: `Math.round(parseFloat(amount) * 100)`

### 4. Email Not Sending
**Problem**: Order confirmation emails not delivered.

**Solution**:
- Verify Resend API key
- Check email domain verification
- Check spam folder
- Review Resend dashboard logs

## 🔄 Migration from JSON Files

Current `api/orders.js` uses JSON file storage. To migrate:

1. Export existing orders:
```javascript
const orders = JSON.parse(fs.readFileSync('data/orders.json'));
```

2. Import to Supabase:
```javascript
for (const order of orders) {
  await supabase.from('orders').insert({
    order_number: order.orderId,
    customer_email: order.customer.email,
    customer_name: `${order.customer.firstName} ${order.customer.lastName}`,
    // ... map other fields
  });
}
```

3. Update frontend to use new endpoints

## 📞 Support

**PayFast Support**: support@payfast.co.za  
**Supabase Support**: https://supabase.com/support  
**Resend Support**: support@resend.com  

## 🎉 Ready to Deploy

All backend infrastructure complete:
✅ Database schema  
✅ Payment gateway integration  
✅ Email notifications  
✅ Security & validation  
✅ Audit logging  
✅ Error handling  

**Next Steps:**
1. Add environment variables to Vercel
2. Deploy application
3. Test payment flow
4. Switch to live mode when ready
