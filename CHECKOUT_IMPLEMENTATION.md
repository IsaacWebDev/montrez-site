# Checkout & Payment Flow Implementation

## ✅ COMPLETE - Ready for Testing

### Overview
Complete checkout flow with PayFast integration for South African payments. Includes form validation, order management, and payment processing.

---

## 📋 Features Implemented

### 1. Checkout Page (`/checkout`)
- **Customer Information Form**
  - First Name & Last Name (required)
  - Email (validated format)
  - Phone (South African format: 0XX XXX XXXX)
  
- **Shipping Address Form**
  - Street Address
  - City
  - Postal Code
  - Province (dropdown with all 9 SA provinces)
  
- **Form Validation**
  - Real-time validation
  - Clear error messages
  - ARIA labels for accessibility
  - Keyboard navigation support
  
- **Order Summary Sidebar**
  - Cart items with images
  - Subtotal calculation
  - R100 flat rate shipping
  - Total amount
  - Sticky positioning on desktop

### 2. Payment Integration (`/api/payment/initiate`)
- **PayFast Gateway**
  - Sandbox mode for testing
  - Production-ready configuration
  - Secure signature generation (MD5 hash)
  - Automatic redirect to PayFast
  
- **Order Creation**
  - Generates unique order IDs (format: MNTRZ-{timestamp}-{random})
  - Stores order in JSON file (data/orders.json)
  - Validates cart total >= R100
  
- **Payment Flow**
  1. User submits checkout form
  2. Order created with "pending" status
  3. PayFast payment URL generated
  4. Cart cleared
  5. User redirected to PayFast
  6. After payment, returns to order confirmation

### 3. Payment Notification Handler (`/api/payment/notify`)
- **PayFast ITN (Instant Transaction Notification)**
  - Signature verification
  - IP validation (PayFast servers only)
  - Amount verification
  - Order status updates
  
- **Status Mapping**
  - COMPLETE → order status: "confirmed", payment: "completed"
  - FAILED → order status: "cancelled", payment: "failed"
  - PENDING → order status: "pending", payment: "pending"
  
- **Confirmation Email**
  - Automatically sent on successful payment
  - Uses existing send-order-email endpoint

### 4. Order Confirmation Page (`/order/{orderId}`)
- **Order Details Display**
  - Order number with status badge
  - Customer information
  - Shipping address
  - Estimated delivery (7-10 business days)
  
- **Items Ordered**
  - Product images
  - Names, sizes, quantities
  - Individual and total prices
  
- **Order Summary**
  - Subtotal
  - Shipping cost
  - Total paid
  
- **Actions**
  - Continue Shopping button
  - Print Order button
  - Support email link
  
- **Error Handling**
  - Loading spinner
  - Order not found handling
  - Clear error messages

---

## 🎨 Design System

### Brand Colors (Montrez Light Theme)
- **Primary:** Black (#000000)
- **Background:** Light Grey (#fafafa)
- **Text:** Dark Grey (#333333)
- **Accent:** Red (#dc143c) for errors
- **Borders:** Light Grey (#999999)

### Typography
- **Font:** Helvetica Neue, Arial, sans-serif
- **Headings:** Letter-spacing 0.1-0.2em, uppercase
- **Body:** 1rem, line-height 1.6

### Responsive Breakpoints
- **Desktop:** 1024px+ (two-column grid)
- **Tablet:** 768px-1023px (single column)
- **Mobile:** 375px-767px (optimized forms)

---

## 🔒 Security Features

### Form Validation
- **Email:** RFC-compliant regex validation
- **Phone:** South African format (0XX XXX XXXX), 10 digits
- **Required Fields:** All fields marked with red asterisk
- **Error Display:** Inline errors with ARIA announcements

### Payment Security
- **Signature Verification:** MD5 hash of all payment data
- **Amount Verification:** Server-side total recalculation
- **IP Validation:** Only accept ITN from PayFast servers
- **Merchant ID Check:** Verify against configured merchant

### Data Protection
- **No Card Storage:** All payment data handled by PayFast
- **Order Privacy:** Order lookup requires orderId (no public listing)
- **Secure Transport:** HTTPS required for production

---

## 📱 Accessibility (WCAG 2.1 AA)

### Form Accessibility
- ✅ ARIA labels on all inputs
- ✅ `aria-required` on required fields
- ✅ `aria-invalid` for error states
- ✅ `aria-describedby` linking errors to inputs
- ✅ `role="alert"` for error announcements

### Keyboard Navigation
- ✅ Tab order follows visual flow
- ✅ Focus indicators (2px outline)
- ✅ Skip to content functionality
- ✅ Button states (hover, focus, disabled)

### Screen Reader Support
- ✅ Semantic HTML (`<form>`, `<label>`, `<button>`)
- ✅ Loading states announced (`aria-busy`)
- ✅ Status badges have proper labels
- ✅ Error summaries for form validation

---

## 🧪 Testing Guide

### Test Checkout Flow

1. **Add items to cart** (Shop page)
2. **Open cart sidebar** (cart icon in navbar)
3. **Click "Checkout" button**
4. **Fill checkout form:**
   ```
   First Name: Test
   Last Name: User
   Email: test@example.com
   Phone: 012 345 6789
   Street: 123 Test Street
   City: Johannesburg
   Postal Code: 2000
   Province: Gauteng
   ```
5. **Click "PROCEED TO PAYMENT"**
6. **PayFast Sandbox:**
   - Redirects to sandbox.payfast.co.za
   - Test payment with sandbox credentials
   - Returns to order confirmation

### PayFast Sandbox Test Cards
```
Card Number: 5200000000000015
CVV: 123
Expiry: Any future date
```

### Test Validation

**Email Validation:**
- ❌ `invalid-email` → Error
- ❌ `test@` → Error
- ✅ `test@example.com` → Valid

**Phone Validation:**
- ❌ `123456789` → Error (needs 10 digits)
- ❌ `1234567890` → Error (must start with 0)
- ✅ `012 345 6789` → Valid
- ✅ `0823456789` → Valid (auto-formatted)

**Minimum Order:**
- ❌ Cart total < R100 → Redirected to shop
- ✅ Cart total >= R100 → Proceed to checkout

---

## 📂 File Structure

```
montrez-site/
├── src/
│   ├── pages/
│   │   ├── CheckoutPage.jsx          # Checkout form & order summary
│   │   └── OrderConfirmationPage.jsx # Order details & thank you
│   ├── styles/
│   │   ├── checkout.css              # Checkout page styles
│   │   └── order-confirmation.css    # Order confirmation styles
│   └── context/
│       └── CartContext.jsx           # Cart management (clearCart added)
├── api/
│   └── payment/
│       ├── initiate.js               # Create order & generate PayFast URL
│       └── notify.js                 # PayFast ITN handler
└── data/
    └── orders.json                   # Order storage (auto-created)
```

---

## 🚀 Deployment Checklist

### Environment Variables (.env)
```bash
# PayFast Credentials
PAYFAST_MERCHANT_ID=your_live_merchant_id
PAYFAST_MERCHANT_KEY=your_live_merchant_key
PAYFAST_PASSPHRASE=your_secure_passphrase

# Production Mode
NODE_ENV=production

# Site URL (for return/notify URLs)
SITE_URL=https://montrez.vercel.app
```

### Vercel Configuration

1. **Add API Routes to `vercel.json`:**
```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api/:path*" }
  ]
}
```

2. **Environment Variables:**
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add all variables from .env
   - Redeploy after adding

3. **Test PayFast ITN:**
   - Ensure `/api/payment/notify` is publicly accessible
   - PayFast must be able to POST to this endpoint
   - Check Vercel function logs for ITN status

### PayFast Production Setup

1. **Create Live Account:**
   - Go to https://www.payfast.co.za
   - Complete merchant verification
   - Get live merchant_id and merchant_key

2. **Configure ITN:**
   - PayFast Dashboard → Settings → ITN
   - Set Notify URL: `https://montrez.vercel.app/api/payment/notify`
   - Enable ITN notifications

3. **Test Live Payment:**
   - Use real payment method
   - Verify order status updates
   - Check confirmation email delivery

---

## 🛠️ Customization

### Change Shipping Cost
```javascript
// CheckoutPage.jsx
const SHIPPING_COST = 150 // Change from R100 to R150
```

### Change Minimum Order
```javascript
// CheckoutPage.jsx
const MIN_ORDER = 200 // Change from R100 to R200
```

### Add Tax Calculation
```javascript
// api/payment/initiate.js
const tax = subtotal * 0.15 // 15% VAT
const total = subtotal + shipping_cost + tax
```

### Customize Email Template
- Edit `/api/send-order-email.js`
- Modify HTML template
- Add order details, branding, etc.

### Add Province-Based Shipping
```javascript
const shipping_cost = formData.province === 'Gauteng' ? 100 : 150
```

---

## 🐛 Troubleshooting

### Checkout Button Not Working
- Check browser console for errors
- Verify cart has items
- Ensure cart total >= R100

### PayFast Redirect Fails
- Check `.env` variables are set
- Verify PAYFAST_MERCHANT_ID and PAYFAST_MERCHANT_KEY
- Check Vercel function logs

### Order Not Found After Payment
- Verify order was created (check `data/orders.json`)
- Check PayFast ITN logs
- Ensure orderId in URL matches database

### ITN Not Updating Order Status
- Check PayFast ITN configuration
- Verify `/api/payment/notify` is publicly accessible
- Check signature verification (passphrase must match)
- Review Vercel function logs

---

## 📊 Order Data Structure

```json
{
  "orderId": "MNTRZ-1711234567890-A1B2C3",
  "status": "confirmed",
  "createdAt": "2026-03-24T00:00:00.000Z",
  "updatedAt": "2026-03-24T00:05:00.000Z",
  "customer": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "0123456789"
  },
  "items": [
    {
      "productId": "speak-no-evil-tee",
      "name": "SPEAK NO EVIL Graphic T-Shirt",
      "price": 600,
      "quantity": 1,
      "size": "M",
      "image": "/products/speak-no-evil-front.jpg"
    }
  ],
  "shipping": {
    "method": "standard",
    "address": "123 Main Street",
    "city": "Johannesburg",
    "state": "Gauteng",
    "postalCode": "2000",
    "country": "South Africa"
  },
  "payment": {
    "method": "payfast",
    "status": "completed",
    "payfastId": "123456",
    "completedAt": "2026-03-24T00:05:00.000Z"
  },
  "pricing": {
    "subtotal": 600,
    "shipping": 100,
    "tax": 0,
    "total": 700,
    "currency": "ZAR"
  }
}
```

---

## ✨ Future Enhancements

### Short-term (MVP+)
- [ ] Order tracking page
- [ ] Customer order history
- [ ] Email verification before checkout
- [ ] Promo code support
- [ ] Multiple shipping options

### Medium-term
- [ ] Express checkout (saved details)
- [ ] Guest checkout vs account
- [ ] Order status webhooks
- [ ] SMS notifications (Twilio)
- [ ] Inventory management integration

### Long-term
- [ ] Multiple payment gateways (PayStack, Stripe)
- [ ] International shipping
- [ ] Multi-currency support
- [ ] Subscription products
- [ ] Loyalty program integration

---

## 📞 Support

**Questions about implementation?**
- Check Vercel function logs
- Review PayFast documentation: https://developers.payfast.co.za
- Test in sandbox mode first

**PayFast Support:**
- Email: support@payfast.co.za
- Docs: https://developers.payfast.co.za

**Montrez Support:**
- Email: support@montrez.com
