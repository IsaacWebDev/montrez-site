# 🚀 PayFast Payment Integration - Quick Start

**Status**: ✅ Complete and ready to deploy  
**Integration**: PayFast + Supabase + Resend  
**Date**: March 24, 2026

---

## ⚡ 5-Minute Quick Start

```bash
# 1. Install dependencies
node scripts/install-dependencies.js

# 2. Setup services (get credentials from):
# - Supabase: https://supabase.com
# - PayFast: https://sandbox.payfast.co.za
# - Resend: https://resend.com

# 3. Update .env with your credentials

# 4. Run Supabase schema
# Copy database/schema.sql → Supabase SQL Editor → Run

# 5. Deploy
vercel --prod
```

---

## 📁 What's Included

### Backend API Routes
- ✅ `api/payment/initiate.js` - Create order & payment
- ✅ `api/payment/callback.js` - PayFast ITN handler  
- ✅ `api/payment/return.js` - User return handler
- ✅ `api/send-order-confirmation.js` - Email service

### Database & Utilities
- ✅ `database/schema.sql` - Supabase orders table
- ✅ `api/utils/payfast.js` - PayFast helpers
- ✅ `api/utils/supabase.js` - Database operations

### Documentation
- ✅ `PAYFAST_INTEGRATION_GUIDE.md` - Complete technical guide
- ✅ `DEPLOYMENT_CHECKLIST.md` - Step-by-step deployment
- ✅ `BACKEND_DELIVERY_FINAL.md` - Delivery summary

---

## 🔑 Environment Variables Required

```env
# PayFast (get from https://sandbox.payfast.co.za)
PAYFAST_MERCHANT_ID=10000100
PAYFAST_MERCHANT_KEY=46f0cd694581a
PAYFAST_PASSPHRASE=your-secure-passphrase
PAYFAST_MODE=sandbox

# Supabase (get from https://supabase.com)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Resend (get from https://resend.com)
RESEND_API_KEY=re_...
EMAIL_FROM=MONTREZ <orders@montrez.co.za>

# Site
NEXT_PUBLIC_SITE_URL=https://montrez.vercel.app
```

---

## 🎯 What It Does

1. **User checks out** → POST `/api/payment/initiate`
   - Creates order in Supabase
   - Generates PayFast payment form
   - Returns redirect URL

2. **User pays** → PayFast gateway

3. **PayFast notifies** → POST `/api/payment/callback`
   - Validates signature & amount
   - Updates order status
   - Sends confirmation email

4. **User returns** → GET `/api/payment/return`
   - Redirects based on payment status

---

## 🔐 Security Features

- ✅ MD5 signature verification
- ✅ PayFast IP whitelisting
- ✅ Amount validation
- ✅ Input sanitization
- ✅ Transaction logging
- ✅ RLS policies

---

## 📖 Full Documentation

| Guide | Purpose |
|-------|---------|
| **PAYFAST_INTEGRATION_GUIDE.md** | Complete technical documentation |
| **DEPLOYMENT_CHECKLIST.md** | Step-by-step deployment |
| **BACKEND_DELIVERY_FINAL.md** | Delivery summary & verification |

---

## 🧪 Test It

```bash
# Test order creation
curl -X POST http://localhost:3000/api/payment/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {"name": "Test", "email": "test@example.com"},
    "shipping": {"street": "123 St", "city": "JHB", "postal_code": "2001", "province": "GP"},
    "items": [{"productId": "test", "name": "Test", "price": 50000, "quantity": 1}],
    "subtotal": 50000,
    "shippingCost": 10000,
    "total": 60000
  }'
```

---

## 🚀 Deploy Now

```bash
vercel --prod
```

Add environment variables via Vercel Dashboard or:

```bash
vercel env add PAYFAST_MERCHANT_ID
vercel env add PAYFAST_MERCHANT_KEY
# ... (add all vars)
```

---

## 💰 Pricing

All amounts in **cents** (ZAR):
- R100 = `10000` cents
- R500 = `50000` cents  
- Shipping = R100 flat (`10000` cents)

---

## ✅ Checklist

Before deploying:
- [ ] Dependencies installed (`node scripts/install-dependencies.js`)
- [ ] Supabase project created & schema run
- [ ] PayFast sandbox account created
- [ ] Resend API key obtained
- [ ] Environment variables set in `.env`
- [ ] Environment variables added to Vercel

After deploying:
- [ ] Test payment flow end-to-end
- [ ] Verify order created in Supabase
- [ ] Check email delivered
- [ ] Monitor logs for errors

---

## 📞 Need Help?

**Read the guides:**
1. Technical details → `PAYFAST_INTEGRATION_GUIDE.md`
2. Step-by-step → `DEPLOYMENT_CHECKLIST.md`
3. Verification → `BACKEND_DELIVERY_FINAL.md`

**Service support:**
- PayFast: support@payfast.co.za
- Supabase: https://supabase.com/support
- Resend: support@resend.com

---

**Ready to go! 🎉**
