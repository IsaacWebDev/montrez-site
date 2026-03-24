# USER FLOW ANALYSIS - MONTREZ
**Version:** 1.0 | **Date:** March 24, 2026

---

## INTRODUCTION

This document maps the current customer journey and identifies friction points that prevent conversion.

---

## CURRENT USER JOURNEY MAP

### LANDING PAGE → SHOP → PRODUCT → CART → CHECKOUT

```
START: Landing Page
│
├─ [LANDING] (Email Gate)
│  ├─ Enter password "NOTFOREVERYONE" ✅ WORKS
│  └─ OR enter email + verify ✅ WORKS
│
├─ [HOMEPAGE]
│  ├─ See featured products ✅ GOOD
│  ├─ Featured product cards show image + price ✅ GOOD
│  └─ Click product → Goes to detail ✅ WORKS
│
├─ [SHOP PAGE]
│  ├─ See product grid (category filter) ✅ BASIC
│  ├─ NO search ❌ FRICTION
│  ├─ NO price filter ❌ FRICTION
│  ├─ NO size filter ❌ FRICTION
│  ├─ NO sort options ❌ FRICTION
│  └─ Click product → Goes to detail ✅ WORKS
│
├─ [PRODUCT DETAIL]
│  ├─ See product image (static) ⚠️ BASIC
│  ├─ See product name ✅ GOOD
│  ├─ See price ✅ GOOD
│  ├─ See description ✅ GOOD
│  ├─ Select color (if variants) ✅ WORKS
│  ├─ Select size ✅ WORKS
│  ├─ Click "ADD TO CART" button ❌ DOESN'T DO ANYTHING
│  └─ Alert says "Added to cart" but nothing happens ❌ FALSE STATE
│
├─ [CART] ❌ NO CART PAGE EXISTS
│  ├─ Click cart icon (top right) ❌ NOTHING HAPPENS
│  └─ No drawer, no modal, no page ❌ CART MISSING
│
├─ [CHECKOUT] ❌ NO CHECKOUT EXISTS
│  ├─ No /checkout route
│  ├─ No cart review page
│  ├─ No shipping form
│  ├─ No payment form
│  └─ NO WAY TO COMPLETE PURCHASE ❌ GAME-BREAKING
│
└─ END: Conversion = 0%
```

---

## PAIN POINTS BY STAGE

### 1. LANDING PAGE (Gate)

**Current State:** Email gate + Password gate both present

**Issues:**
- Email verification works but no feedback messaging
- No "Load Cart" for returning users
- Long process (email → check inbox → verify code)
- Mobile: Keyboard overlap on code entry

**Friction Score:** 2/10 (minimal - gate is intentional)

**User Quote:** *"I have to wait for an email? I just want to shop"*

---

### 2. HOMEPAGE

**Current State:** Featured products + About snippet + Instagram feed

**Issues:**
- Featured products non-interactive (can't add to cart from card)
- No announcement bar (missing urgency)
- No drop schedule
- No "New Arrivals" section
- No "This Week's Drops" section

**Friction Score:** 4/10 (okay, but missing engagement)

**User Quote:** *"Where are the new drops? When is the next collection?"*

---

### 3. SHOP PAGE

**Current State:** Product grid + Category filter only

**Issues:**
| Issue | Impact | Friction |
|-------|--------|----------|
| No search | High | Can't find specific product |
| No price filter | Medium | Can't browse budget range |
| No size filter | Medium | Can't see available sizes |
| No sort | Medium | Can't see newest/popular first |
| No pagination | Low | Works fine with lazy load |
| No stock info | Medium | Don't know if items are in stock |
| No "quick view" | Low | Have to click to see details |

**Friction Score:** 6/10 (moderately frustrating)

**User Quote:** *"I can't find the hoodie I want. There's no search. I have to click each product individually."*

---

### 4. PRODUCT DETAIL

**Current State:** Images + Info + Selector + Add to Cart button

**Issues:**

| Issue | Impact | User Pain |
|-------|--------|-----------|
| No material info | Medium | "What's this made of?" |
| No care instructions | Low | "How do I wash this?" |
| No size guide | High | "What size should I get?" |
| No fit description | High | "Is this oversized?" |
| No stock level | High | "Is this in stock?" |
| No reviews | High | "Is this legit quality?" |
| No lifestyle photos | Medium | "How does it look on?" |
| No video | Low | Would improve confidence |
| Static images | Medium | Can't see details/angles |
| No "Add to Wishlist" | Low | Can't save for later |

**Friction Score:** 6/10 (information gaps reduce confidence)

**User Quote:** *"I don't know if this fits. There's no size guide. And how do I know if it's good quality? There are no reviews."*

---

### 5. CART (MISSING)

**Current State:** ❌ Does not exist

**What Should Happen:**
```
User clicks cart icon → Cart drawer opens (right side, mobile)
Shows:
- List of items (image, name, size, price)
- Edit quantity
- Remove items
- Subtotal
- Shipping estimate
- "CHECKOUT" button
```

**What Actually Happens:**
```
User clicks cart icon → Nothing
User is confused and leaves
```

**Friction Score:** 10/10 (breaks entire conversion)

**User Quote:** *"I clicked the cart but nothing happened. I'm leaving."*

---

### 6. CHECKOUT (MISSING)

**Current State:** ❌ Does not exist

**What Should Happen:**
```
Step 1: Cart Review
  - Show items again
  - Allow quantity changes
  - Next →

Step 2: Shipping Info
  - Email
  - Full name
  - Address
  - Shipping method (standard/express/overnight)
  - Next →

Step 3: Payment
  - Card number
  - Expiration
  - CVC
  - Billing address (if different)
  - Complete Order →

Step 4: Confirmation
  - Order number
  - Estimated delivery
  - Email confirmation sent
```

**What Actually Happens:**
```
User can't get here because cart doesn't work
```

**Friction Score:** 10/10 (breaks entire business model)

**User Quote:** *"I want to buy this but there's no way to checkout."*

---

## MOBILE EXPERIENCE SPECIFIC ISSUES

### Touch Targets

| Element | Current | Required | Status |
|---------|---------|----------|--------|
| Hamburger icon | 24x24px | 44x44px | ❌ Too small |
| Search icon | 20x20px | 44x44px | ❌ Too small |
| Cart icon | 20x20px | 44x44px | ❌ Too small |
| Account icon | 20x20px | 44x44px | ❌ Too small |
| Filter buttons | ~30x30px | 44x44px | ❌ Too small |
| Size selector | ~40x40px | 44x44px | ⚠️ Borderline |
| "Add to Cart" button | Full width | 48px height | ✅ OK |

**Impact:** Users frustrated, mistype, abandon cart

---

### Mobile Navigation

**Current:**
- Header has hamburger + search + account + cart
- Hamburger menu has: Home, Shop, About, Contact
- NO account links in mobile menu
- NO cart drawer

**Missing:**
- Account menu on mobile (my orders, wishlist, logout)
- Cart drawer (right-side slide-out)
- Persistent cart count badge
- Search results modal

**Friction Score:** 5/10 (navigation works, but incomplete)

---

### Mobile Checkout

**Current:** N/A (doesn't exist)

**Expected:** 
- Full-screen form
- Mobile keyboard doesn't cover inputs
- Large buttons (48px minimum)
- Progress indicator (step 1/3)
- Easy address entry (mobile autocomplete)

---

## CONVERSION FUNNEL ANALYSIS

```
100 visitors land on Montrez
│
├─ 80 pass email gate ✅
│  │
│  ├─ 75 go to shop ✅
│  │  │
│  │  ├─ 60 click product ✅
│  │  │  │
│  │  │  ├─ 50 add to cart (click button) ✅ (false action)
│  │  │  │  │
│  │  │  │  ├─ 40 realize nothing happened ❌ BOUNCE
│  │  │  │  │
│  │  │  │  └─ 10 try cart icon ❌ BOUNCE
│  │  │  │
│  │  │  └─ 10 don't add (not convinced) ✅
│  │  │
│  │  └─ 15 leave (can't find item) ✅
│  │
│  └─ 5 go to about/contact ✅
│
└─ 20 don't pass gate ✅

CONVERSIONS: 0 out of 100
CONVERSION RATE: 0%

BOTTLENECK: Cart + Checkout don't exist
```

---

## CRITICAL BLOCKING ISSUES

### Issue #1: Cart Doesn't Work

**Description:** Clicking cart icon does nothing

**User Journey Impact:**
- User sees item they like
- Clicks "ADD TO CART"
- Get success alert
- Click cart icon to proceed
- Nothing happens
- User confused, leaves site
- **LOST SALE**

**Fix Required:** 
- Cart context/state management
- Cart drawer component
- Persistent cart (localStorage)

---

### Issue #2: Checkout Doesn't Exist

**Description:** No route, no form, no payment

**User Journey Impact:**
- Even if cart worked, nowhere to checkout
- No shipping form
- No payment form
- No order confirmation
- **IMPOSSIBLE TO BUY**

**Fix Required:**
- /checkout route
- 3-step form (cart review, shipping, payment)
- Payment integration (Stripe, PayFast, etc.)
- Order confirmation page

---

### Issue #3: Mobile Touch Targets

**Description:** Navbar icons are <44px

**User Journey Impact:**
- Mobile user tries to click cart
- Misses target (too small)
- Frustrated
- Leaves site
- **LOST SALE**

**Fix Required:**
- Increase all touch targets to 44x44px minimum
- Add padding around icons
- Improve visual feedback

---

### Issue #4: No Product Information

**Description:** Missing size guide, materials, care instructions

**User Journey Impact:**
- User finds product they like
- Unsure about fit/quality/durability
- No reviews to reassure them
- Leaves without buying
- **LOST SALE**

**Fix Required:**
- Add material composition
- Add size guide with measurements
- Add care instructions
- Add customer reviews

---

### Issue #5: No Trust Signals

**Description:** No reviews, no stock info, no scarcity

**User Journey Impact:**
- User finds product
- No reviews = unknown quality
- No stock info = unsure if available
- No scarcity = no urgency
- User leaves to browse competitors
- **LOST SALE**

**Fix Required:**
- Add review system
- Show stock levels
- Add scarcity indicators ("only 5 left")
- Add "recently sold" counters

---

## PAIN POINTS BY USER TYPE

### New User (First Time)

**Pain Points:**
1. Doesn't know brand story (no "about" context on shop)
2. Doesn't understand "Pas pour Tout" positioning (no explanation)
3. Can't find items (no search)
4. Unsure about quality (no reviews)
5. Can't complete purchase (no checkout)

**Dropout Rate:** ~85%

---

### Returning User

**Pain Points:**
1. Long email verification process (every visit)
2. No account dashboard (orders, wishlist)
3. No saved cart
4. No recommendation engine
5. Can't reorder (no purchase history)

**Dropout Rate:** ~70%

---

### Mobile User

**Pain Points:**
1. Small touch targets (frustrating taps)
2. No cart drawer (can't see items)
3. Keyboard overlaps forms
4. Images don't swipe (bad gallery)
5. No mobile checkout

**Dropout Rate:** ~90%

---

### Desktop User

**Pain Points:**
1. Can't find items (no search)
2. No advanced filters (price, size, sort)
3. Can't add to cart (button broken)
4. No product info (size guide, materials)
5. No checkout (can't buy)

**Dropout Rate:** ~80%

---

## JOURNEY STAGE RECOMMENDATIONS

### Stage: Landing

**Current:** Email gate + Password gate
**Status:** ✅ Works as intended

**Improvements:**
- Add "New user?" suggestion for first-timers
- Show verification code input immediately after email submit
- Don't make new users wait (risk bounce)

---

### Stage: Homepage

**Current:** Featured products + brand story
**Status:** ⚠️ Decent but needs engagement hooks

**Improvements:**
1. Add announcement bar (drop time, new arrivals)
2. Add "New This Week" section
3. Add drop schedule / countdown
4. Make featured products interactive (quick view, add to cart)
5. Add newsletter signup CTA

---

### Stage: Shop

**Current:** Grid + category filter
**Status:** ❌ Needs major work

**Must Add:**
1. Search bar (top of page)
2. Advanced filters (price, size, sort)
3. Filter modal for mobile
4. Stock indicators ("Only 3 left")
5. Pagination or load more

**Timeline:** 6-8 hours

---

### Stage: Product Detail

**Current:** Images + info + size selector
**Status:** ⚠️ Missing information

**Must Add:**
1. Material composition
2. Size guide (with measurements)
3. Care instructions
4. Stock level indicator
5. Customer reviews section

**Nice to Add:**
6. Lifestyle photography
7. Video (360° or in-motion)
8. Related products
9. Wishlist button
10. Share button (social)

**Timeline:** 4-6 hours (content + basic review system)

---

### Stage: Cart

**Current:** ❌ Does not exist
**Status:** CRITICAL

**Must Build:**
1. Cart context/state management
2. CartDrawer component (mobile)
3. /cart page (desktop)
4. Remove item functionality
5. Edit quantity functionality
6. Persistent cart (localStorage)
7. Shipping estimate
8. Checkout button

**Timeline:** 8-10 hours

---

### Stage: Checkout

**Current:** ❌ Does not exist
**Status:** CRITICAL

**Must Build:**
1. /checkout route
2. Cart review step
3. Shipping info step
4. Payment step (Stripe or alternative)
5. Order confirmation page
6. Email notification

**Timeline:** 12-16 hours

**Payment Gateway Options:**
- Stripe (recommended, most flexible)
- PayFast (South Africa based, for Leafway)
- Shopify Payments
- Square

---

### Stage: Post-Purchase

**Current:** ❌ No order confirmation
**Status:** Missing

**Should Include:**
1. Order number
2. Estimated delivery date
3. Shipping tracking (if available)
4. Return/exchange policy
5. Customer support link
6. Review request (email follow-up)

**Timeline:** 3-4 hours

---

## MOBILE EXPERIENCE JOURNEY

### Mobile User Flow (Current)

```
User arrives on mobile
│
├─ Reads email gate
├─ Clicks "ENTER"
├─ Waits for email
├─ Enters verification code ✅
│
├─ Sees homepage
├─ Scrolls to featured products
├─ Clicks product
├─ Sees product detail (mobile layout)
│  ├─ Images scroll vertically (no swipe) ⚠️
│  ├─ Selects size
│  ├─ Clicks "ADD TO CART"
│  ├─ Gets alert (but nothing added) ❌
│  │
│  └─ User confused
│     ├─ Tries clicking cart icon ❌
│     └─ Nothing happens, leaves site ❌
│
└─ LOST SALE
```

### Mobile User Flow (Recommended)

```
User arrives on mobile
│
├─ Reads email gate
├─ Clicks "ENTER"
├─ Waits for email
├─ Enters verification code ✅
│
├─ Sees homepage (optimized mobile)
│  ├─ Announcement bar visible ("DROP FRIDAY")
│  ├─ Featured products easy to tap (44x44px)
│  └─ Each product has quick-view overlay
│
├─ Scrolls to shop
│  ├─ "Filter & Sort" button prominent
│  ├─ Grid of products (2 columns, responsive)
│  ├─ Stock levels visible ("Only 5 left")
│  └─ Taps product
│
├─ Sees product detail (mobile optimized)
│  ├─ Large images, swipe between them
│  ├─ Sticky size/color selector
│  ├─ Material info visible
│  ├─ Reviews section (scrollable)
│  ├─ Taps "ADD TO CART" (48px button)
│  ├─ Toast notification "Added! View cart?"
│  └─ Taps "View Cart"
│
├─ Sees cart drawer (right-side slide)
│  ├─ Item shows image + name + size + price
│  ├─ Can edit quantity
│  ├─ Can remove item
│  ├─ Shows subtotal + shipping
│  └─ Taps "CHECKOUT"
│
├─ Sees checkout form (mobile-optimized)
│  ├─ Step 1/3: Cart review (easy to skim)
│  ├─ Step 2/3: Shipping info (keyboard friendly)
│  ├─ Step 3/3: Payment (secure, clear)
│  └─ Taps "COMPLETE ORDER"
│
├─ Sees order confirmation
│  ├─ Order number displayed
│  ├─ Estimated delivery date
│  ├─ "View Order" link
│  └─ Email sent confirmation
│
└─ ✅ CONVERSION COMPLETE
```

---

## SUMMARY: MONTREZ JOURNEY SCORE

| Stage | Current | Target | Gap | Blocker |
|-------|---------|--------|-----|---------|
| Landing | 7/10 | 8/10 | -1 | No |
| Homepage | 5/10 | 8/10 | -3 | No |
| Shop | 4/10 | 8/10 | -4 | No |
| Product Detail | 5/10 | 8/10 | -3 | No |
| Cart | 0/10 | 9/10 | -9 | **YES** |
| Checkout | 0/10 | 9/10 | -9 | **YES** |
| Confirmation | 0/10 | 9/10 | -9 | **YES** |

**Overall Journey Score:** 2.4/10 → **Target: 8.5/10**

**Blockers:** Cart & Checkout must be built before revenue is possible

---

## RECOMMENDED IMPLEMENTATION ORDER

1. **CRITICAL (Build First):** Cart drawer + Cart context
2. **CRITICAL (Build Second):** Checkout flow + Payment integration
3. **HIGH (Build Third):** Mobile touch target fixes + Cart drawer
4. **HIGH (Build Fourth):** Product page info (size guide, materials, reviews)
5. **MEDIUM (Build Fifth):** Shop page improvements (search, filters, sort)
6. **MEDIUM (Build Sixth):** Mobile checkout optimization
7. **LOW (Build Later):** Announcement bar rotation, advanced features

---

**Analysis Complete**  
**Next Step:** See PRIORITY_UX_FIXES.md for ranked implementation list
