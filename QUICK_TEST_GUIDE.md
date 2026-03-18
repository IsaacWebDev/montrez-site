# QUICK TEST GUIDE - MONTREZ FRONTEND

## 🚀 Start Dev Server

```bash
cd C:\Users\isaac\.openclaw\workspace\montrez-site
npm run dev
```

Open: http://localhost:5173

---

## ✅ TEST FLOW (5 minutes)

### 1. ENTRANCE FLOW (NEW)

**Landing Page:**
- ✅ See château gate image (B&W)
- ✅ "MONTREZ" logo visible
- ✅ Click "Enter" button

**Password/Email Modal:**
- ✅ See 2 options: "Returning User" / "New User"

**Test Returning User:**
- ✅ Click "Returning User"
- ✅ Enter password: `NOTFOREVERYONE`
- ✅ Click "Enter"
- ✅ Should proceed to video

**Test New User:**
- ✅ Go back (refresh page)
- ✅ Click "Enter" → Click "New User"
- ✅ Enter any email: `test@test.com`
- ✅ Click "Send Code"
- ✅ See code verification screen
- ✅ Enter any 6-digit code: `123456`
- ✅ Click "Verify"
- ✅ Should proceed to video

**Video Intro:**
- ✅ Video plays (château gates)
- ✅ "Skip" button appears after 2s
- ✅ Can skip OR auto-completes after 5s
- ✅ Redirects to main site

---

### 2. NAVIGATION (NEW HAMBURGER MENU)

**Desktop (>768px):**
- ✅ See nav links in header: Shop, About, Contact
- ✅ Click each to navigate

**Mobile (<768px):**
- ✅ See hamburger icon (3 lines)
- ✅ Click hamburger
- ✅ Menu slides in from right
- ✅ Click links to navigate
- ✅ Close with X button

---

### 3. SHOP PAGE (NEW)

Visit: http://localhost:5173/shop

**Filters:**
- ✅ See category buttons: All, T-Shirts, Outerwear, Bottoms
- ✅ Click each category → products filter
- ✅ Use "Sort by" dropdown → products reorder

**Product Grid:**
- ✅ 8 products display in grid
- ✅ Hover on product → image scales, color shifts
- ✅ Click product → navigates to detail page

---

### 4. PRODUCT DETAIL (NEW)

Click any product from shop:

**Gallery:**
- ✅ Main product image displays
- ✅ If multiple images: thumbnails below
- ✅ Click thumbnail → main image changes

**Product Info:**
- ✅ Name, price display
- ✅ Click size (S/M/L/XL) → highlights
- ✅ "Add to Cart" button clickable
- ✅ If sold out: button disabled

**Details:**
- ✅ Expand "Shipping & Returns"
- ✅ Expand "Product Details"

**Related Products:**
- ✅ 3 related products at bottom
- ✅ Click to navigate

**Back Button:**
- ✅ "← Back to Shop" returns to shop page

---

### 5. ABOUT PAGE (NEW)

Visit: http://localhost:5173/about

**Content:**
- ✅ Hero: "MONTREZ" + "Pas pour Tout"
- ✅ 4 sections: Philosophy, Heritage, Craftsmanship, "Not for Everyone"
- ✅ Sections animate on scroll
- ✅ Quote section has dark background + border

**Gallery:**
- ✅ 3 images at bottom
- ✅ Hover → images scale and colorize slightly

---

### 6. CONTACT PAGE (NEW)

Visit: http://localhost:5173/contact

**Layout:**
- ✅ 2 columns: Info (left) + Form (right)

**Info Section:**
- ✅ Email, Instagram, Location listed
- ✅ Links clickable
- ✅ "Pas pour Tout" note at bottom

**Form:**
- ✅ Fill: Name, Email, Subject, Message
- ✅ Click "Send Message"
- ✅ Button shows "Sending..."
- ✅ Success message appears (mock)

---

### 7. RESPONSIVE TEST

**Mobile (375px):**
- ✅ Hamburger menu appears
- ✅ Product grid: 1 column
- ✅ Product detail: stacked layout
- ✅ About/Contact: single column

**Tablet (768px):**
- ✅ Product grid: 2 columns
- ✅ Nav still uses hamburger

**Desktop (1440px):**
- ✅ Product grid: 3+ columns
- ✅ Nav shows links (no hamburger)
- ✅ Product detail: 2-column layout

---

## 🎨 BRAND CHECK

- ✅ Black background throughout
- ✅ White text
- ✅ NO GOLD (should not see any gold)
- ✅ "Pas pour Tout" tagline visible
- ✅ Images grayscale/desaturated
- ✅ Cinematic grain effects
- ✅ Clean, luxury aesthetic

---

## 🐛 KNOWN ISSUES / TODO

### Backend Integration Needed:
1. **Email verification** - currently accepts any code
2. **Product data** - using mock data
3. **Contact form** - doesn't actually send

### Assets to Replace:
1. **Logo** - currently text, needs actual Montrez logo
2. **Gate image** - using Unsplash placeholder
3. **Product images** - using generic Unsplash

### Future Enhancements:
1. Shopping cart functionality
2. User authentication/accounts
3. Checkout flow
4. Admin CMS integration

---

## ✅ WHAT'S WORKING

- ✅ Full entrance flow (4 stages)
- ✅ Responsive hamburger menu
- ✅ Shop page with filters/sort
- ✅ Product detail with gallery
- ✅ About page with animations
- ✅ Contact page with form
- ✅ Mobile-first responsive design
- ✅ Framer Motion animations
- ✅ React Router navigation
- ✅ Brand-consistent styling

---

## 🚀 DEPLOYMENT READY

Build succeeds:
```bash
npm run build
# ✓ built in 3.25s
# dist/ folder ready for deployment
```

Deploy to Vercel:
```bash
vercel --prod
```

---

**Frontend is feature-complete and ready for backend integration.**
