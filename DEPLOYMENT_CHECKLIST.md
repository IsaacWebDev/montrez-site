# PayFast Integration - Deployment Checklist

## ✅ Pre-Deployment

### 1. Dependencies
- [ ] Run `npm install @supabase/supabase-js`
- [ ] Verify package.json updated
- [ ] Test local build: `npm run build`

### 2. Supabase Setup
- [ ] Create Supabase account
- [ ] Create new project
- [ ] Run `database/schema.sql` in SQL Editor
- [ ] Verify `orders` table exists
- [ ] Copy Project URL → `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Copy anon key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Copy service_role key → `SUPABASE_SERVICE_ROLE_KEY`

### 3. PayFast Setup (Sandbox)
- [ ] Register at https://sandbox.payfast.co.za
- [ ] Login to merchant dashboard
- [ ] Go to Settings > Integration
- [ ] Use sandbox credentials:
  - Merchant ID: `10000100`
  - Merchant Key: `46f0cd694581a`
- [ ] Create secure passphrase → `PAYFAST_PASSPHRASE`
- [ ] Set `PAYFAST_MODE=sandbox`

### 4. Resend Setup
- [ ] Register at https://resend.com
- [ ] Create API key → `RESEND_API_KEY`
- [ ] Verify domain (or use onboarding@resend.dev for testing)
- [ ] Set `EMAIL_FROM=MONTREZ <orders@montrez.co.za>`

### 5. Environment Variables
Update `.env`:
```env
NEXT_PUBLIC_SITE_URL=https://montrez.vercel.app
PAYFAST_MERCHANT_ID=10000100
PAYFAST_MERCHANT_KEY=46f0cd694581a
PAYFAST_PASSPHRASE=your-secure-passphrase
PAYFAST_MODE=sandbox
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
RESEND_API_KEY=re_...
EMAIL_FROM=MONTREZ <orders@montrez.co.za>
ADMIN_TOKEN=montrez-admin-2026
VITE_PASSWORD=NOTFOREVERYONE
```

## 🚀 Deployment

### 1. Vercel Setup
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### 2. Add Environment Variables to Vercel
```bash
vercel env add NEXT_PUBLIC_SITE_URL
vercel env add PAYFAST_MERCHANT_ID
vercel env add PAYFAST_MERCHANT_KEY
vercel env add PAYFAST_PASSPHRASE
vercel env add PAYFAST_MODE
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add RESEND_API_KEY
vercel env add EMAIL_FROM
vercel env add ADMIN_TOKEN
vercel env add VITE_PASSWORD
```

Or add via Vercel Dashboard:
- Go to Project Settings > Environment Variables
- Add all variables above
- Apply to Production, Preview, Development

### 3. Redeploy After Adding Env Vars
```bash
vercel --prod
```

## 🧪 Testing

### 1. Test Order Creation
```bash
curl -X POST https://montrez.vercel.app/api/payment/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {
      "name": "Test User",
      "email": "test@example.com",
      "phone": "+27123456789"
    },
    "shipping": {
      "street": "123 Test St",
      "city": "Johannesburg",
      "postal_code": "2001",
      "province": "Gauteng"
    },
    "items": [{
      "productId": "test-01",
      "name": "Test Product",
      "price": 50000,
      "quantity": 1
    }],
    "subtotal": 50000,
    "shippingCost": 10000,
    "total": 60000
  }'
```

Expected response:
```json
{
  "success": true,
  "order": {
    "id": "uuid",
    "order_number": "MTZ-20260324-XXXXX",
    "total": 60000,
    "payment_status": "pending"
  },
  "payment": {
    "url": "https://sandbox.payfast.co.za/eng/process",
    "data": { ... }
  }
}
```

### 2. Test Payment Flow
1. Create test order (above)
2. Submit payment form to PayFast sandbox
3. Complete payment with test card
4. Verify order status updated in Supabase
5. Check email received

### 3. Verify Supabase
```sql
-- Check orders created
SELECT * FROM orders ORDER BY created_at DESC LIMIT 10;

-- Check payment statuses
SELECT order_number, payment_status, total FROM orders;
```

### 4. Check Logs
- Vercel Dashboard > Functions > Logs
- Look for `[PayFast]` and `[Email]` logs

## 🔒 Production Checklist

Before going live:

### PayFast Production
- [ ] Complete PayFast business verification
- [ ] Get live merchant credentials
- [ ] Update PayFast account with production URLs:
  - Return URL: `https://montrez.co.za/api/payment/return`
  - Cancel URL: `https://montrez.co.za/checkout?cancelled=true`
  - Notify URL: `https://montrez.co.za/api/payment/callback`
- [ ] Set `PAYFAST_MODE=live`
- [ ] Update merchant ID and key
- [ ] Test with small live transaction

### Email Production
- [ ] Verify custom domain with Resend
- [ ] Update `EMAIL_FROM` to verified domain
- [ ] Test email delivery
- [ ] Check spam ratings

### Security
- [ ] Rotate `ADMIN_TOKEN`
- [ ] Update `VITE_PASSWORD`
- [ ] Keep `SUPABASE_SERVICE_ROLE_KEY` secret
- [ ] Enable Supabase RLS policies
- [ ] Review CORS settings
- [ ] Enable rate limiting

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Monitor Vercel function logs
- [ ] Monitor Supabase dashboard
- [ ] Set up payment alerts
- [ ] Monitor email delivery rates

## 📊 Post-Deployment

### Week 1
- [ ] Monitor payment success rates
- [ ] Check email delivery rates
- [ ] Review error logs daily
- [ ] Test on mobile devices
- [ ] Collect user feedback

### Ongoing
- [ ] Weekly revenue reports
- [ ] Monthly payment reconciliation
- [ ] Review failed payments
- [ ] Optimize conversion rates
- [ ] Update email templates

## 🚨 Rollback Plan

If issues occur:

1. **Revert to JSON storage**:
   ```bash
   git checkout HEAD^ api/orders.js
   vercel --prod
   ```

2. **Disable PayFast**:
   - Set `PAYFAST_MODE=disabled` temporarily
   - Show "Coming Soon" on checkout

3. **Emergency contact**:
   - PayFast: support@payfast.co.za
   - Supabase: https://supabase.com/support

## ✅ Final Verification

Before marking complete:
- [ ] Test full checkout flow
- [ ] Verify order confirmation email
- [ ] Check Supabase order created
- [ ] Confirm payment status updates
- [ ] Test return URLs (success/cancel)
- [ ] Verify ITN callback working
- [ ] Test on multiple devices
- [ ] Review all logs clean

## 🎉 Ready for Production!

Once all checkboxes complete, your PayFast integration is production-ready.

**Congratulations! 🚀**
