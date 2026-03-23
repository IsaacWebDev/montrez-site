# Checkout Flow - Quick Start Guide

## 🚀 Test Checkout in 5 Minutes

### Step 1: Start Dev Server
```bash
cd C:\Users\isaac\.openclaw\workspace\montrez-site
npm run dev
```

### Step 2: Add Products to Cart
1. Navigate to http://localhost:5173/shop
2. Click on any product
3. Select size
4. Click "ADD TO CART"
5. Repeat for multiple items (total must be >= R100)

### Step 3: Open Checkout
1. Click cart icon (top right)
2. Review cart items
3. Click "CHECKOUT" button

### Step 4: Fill Form (Test Data)
```
CUSTOMER INFORMATION:
- First Name: Isaac
- Last Name: Primo
- Email: test@montrez.com
- Phone: 012 345 6789

SHIPPING ADDRESS:
- Street: 123 Long Street
- City: Cape Town
- Postal Code: 8001
- Province: Western Cape
```

### Step 5: Submit Payment
1. Click "PROCEED TO PAYMENT"
2. Redirects to PayFast Sandbox
3. Use test card: `5200000000000015`
4. Click "Pay Now"
5. Redirects back to order confirmation

---

## ✅ What to Check

### Checkout Page
- [ ] Form validates correctly (try submitting empty)
- [ ] Phone formats as you type (0XX XXX XXXX)
- [ ] Email validation works
- [ ] Order summary shows correct totals
- [ ] Sticky sidebar on desktop
- [ ] Responsive on mobile (test 375px)

### Order Confirmation
- [ ] Order number displays
- [ ] Customer details shown
- [ ] Items list correct
- [ ] Total matches cart
- [ ] Estimated delivery calculated
- [ ] Print button works

### Cart Integration
- [ ] Cart clears after successful checkout
- [ ] Can't checkout with empty cart
- [ ] Min order R100 enforced
- [ ] Cart persists in localStorage

---

## 🧪 Test Scenarios

### Valid Form
✅ All fields filled → Success

### Invalid Email
❌ `test@` → Error: "Please enter a valid email address"

### Invalid Phone
❌ `123456789` → Error: "Please enter a valid South African phone number"

### Empty Cart
❌ Redirect to /shop with alert

### Cart < R100
❌ Redirect to /shop with "Minimum order amount is R100"

---

## 🎯 PayFast Sandbox Testing

### Test Card
```
Card Number: 5200 0000 0000 0015
CVV: 123
Expiry: 12/25 (any future date)
Name: Test User
```

### Payment Outcomes
- **Success:** Click "Pay Now" → Order confirmed
- **Cancel:** Click "Cancel" → Return to checkout
- **Failure:** Use invalid card → Payment failed

---

## 📱 Mobile Testing

### Chrome DevTools
1. Press F12
2. Click device toggle (Ctrl+Shift+M)
3. Select "iPhone 12 Pro" or "Pixel 5"
4. Test checkout flow

### Key Mobile Checks
- [ ] Form inputs are tappable (min 44px)
- [ ] Keyboard doesn't obscure submit button
- [ ] Error messages visible
- [ ] Order summary readable
- [ ] Print button hidden (mobile)

---

## 🔧 Common Issues

### "Cart is empty"
**Solution:** Add products before accessing /checkout

### PayFast redirect fails
**Solution:** Check console for API errors, verify .env variables

### Order not found after payment
**Solution:** Check `data/orders.json` file was created, verify orderId in URL

### Form doesn't submit
**Solution:** Check validation errors, ensure all required fields filled

---

## 📊 Expected Flow

```
1. Shop Page → Add to Cart
2. Cart Sidebar → Review → Click Checkout
3. Checkout Page → Fill Form → Validate
4. Payment API → Create Order → Generate PayFast URL
5. PayFast Sandbox → Enter Card → Pay
6. PayFast ITN → Update Order Status
7. Order Confirmation → Thank You → Continue Shopping
```

---

## 🎨 Visual Regression Testing

### Desktop (1440px)
- Two-column layout (form left, summary right)
- Sticky summary sidebar
- Wide form inputs

### Tablet (768px)
- Single column layout
- Summary below form
- Full-width buttons

### Mobile (375px)
- Compact form spacing
- Smaller text (0.875rem)
- Touch-friendly controls (min 44px)

---

## ✨ Success Criteria

Before considering done:
- [ ] Can complete full checkout flow
- [ ] Order appears in data/orders.json
- [ ] PayFast sandbox payment works
- [ ] Order confirmation displays correctly
- [ ] Cart clears after checkout
- [ ] Form validation prevents bad data
- [ ] Mobile experience is smooth
- [ ] Accessibility passes (keyboard nav)
- [ ] Loading states work
- [ ] Error handling graceful

---

## 🚢 Production Deployment

### Pre-Deploy Checklist
1. Update `.env` with live PayFast credentials
2. Set `NODE_ENV=production`
3. Configure PayFast ITN URL in dashboard
4. Test with real payment (small amount)
5. Verify confirmation email sends
6. Check order status updates
7. Test return URL flow

### Vercel Deploy
```bash
vercel --prod
```

### Post-Deploy
1. Test live checkout flow
2. Verify ITN endpoint accessible
3. Check function logs for errors
4. Monitor first few real orders

---

## 📞 Need Help?

- Review `CHECKOUT_IMPLEMENTATION.md` for full documentation
- Check Vercel function logs for API errors
- Inspect `data/orders.json` for order data
- Test in PayFast sandbox first
- Verify all environment variables set

**Ready to ship! 🚀**
