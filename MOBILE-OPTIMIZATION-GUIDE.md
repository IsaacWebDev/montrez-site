# MONTREZ SITE - MOBILE OPTIMIZATION GUIDE

**Version:** 1.0  
**Date:** 2026-03-18  
**Target Devices:** iPhone 12+, Samsung Galaxy S20+, iPad Air/Pro

---

## 1. MOBILE-FIRST DESIGN PRINCIPLES

### 1.1 Content-First Approach

**Strategy:**
- Design mobile layout FIRST
- Scale up to tablet/desktop
- Prioritize essential content

**Mobile Hierarchy:**
```
1. Hero image (emotional impact)
2. Call-to-action (Enter, Shop Now)
3. Featured products
4. Basic info (About, Contact)
5. Footer links
```

**Desktop Enhancement:**
```
+ Sidebar filters
+ Expanded navigation
+ Multi-column layouts
+ Advanced features
```

---

### 1.2 Touch-First Interaction

**Button & Link Sizing:**

| Element | Minimum | Recommended |
|---------|---------|-------------|
| Button | 44x44px | 48x56px |
| Link | 44x44px | 48px |
| Icon | 24x24px | 32x32px |
| Tap area | - | 56x56px |

**Safe Zone (Thumb Reach):**
```
┌─────────────────────┐
│ ■ HARD              │  Top (reach)
│                     │
│ ■ ■ ■ EASY          │  Middle (natural)
│                     │
│ ■ ■ ■ NATURAL       │  Bottom (thumb)
└─────────────────────┘

Place critical actions (Buy, Add to Cart) in NATURAL zone
```

**Spacing Between Touch Targets:**
- Minimum: 8px
- Recommended: 12px-16px
- Avoid cramped buttons

---

### 1.3 Performance on Mobile

**Target Metrics:**
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 3.5s

**Optimization Checklist:**
- ✓ Images: WebP + JPEG fallback
- ✓ Lazy load below-fold images
- ✓ Minify CSS/JS
- ✓ Use critical CSS inline
- ✓ Code splitting (route-based)
- ✓ Preload critical resources
- ✓ Gzip compression

---

## 2. SCREEN SIZES & BREAKPOINTS

### 2.1 Target Resolutions

| Device | Width | Height | Ratio |
|--------|-------|--------|-------|
| iPhone SE | 375px | 667px | 9:16 |
| iPhone 12 | 390px | 844px | 9:20 |
| iPhone 12 Pro | 390px | 844px | 9:20 |
| iPhone 13 Pro Max | 428px | 926px | 9:20 |
| Galaxy S20 | 360px | 800px | 9:20 |
| Galaxy S21 | 360px | 800px | 9:20 |
| iPad Air | 768px | 1024px | 3:4 |
| iPad Pro 11" | 834px | 1194px | 20:27 |

### 2.2 CSS Breakpoints (Recommended)

```css
/* Mobile-first approach */
@media (min-width: 480px) {
  /* Larger phones, small tablets */
}

@media (min-width: 768px) {
  /* Tablets */
}

@media (min-width: 1024px) {
  /* Desktop */
}

@media (min-width: 1920px) {
  /* Large desktop */
}
```

### 2.3 Safe Areas (Notch, Home Indicator)

```css
/* iOS safe areas */
@supports (padding: max(0px)) {
  .header {
    padding-top: max(16px, env(safe-area-inset-top));
  }
  
  .footer {
    padding-bottom: max(16px, env(safe-area-inset-bottom));
  }
}
```

**Spacing Rules:**
- Top: 44px header + safe area
- Bottom: 48px tab/button + safe area (iPhone X+)
- Sides: 16px margin minimum

---

## 3. MOBILE NAVIGATION PATTERNS

### 3.1 Header Sticky Bar

```
┌──────────────────────────┐
│ ☰  LOGO  🔍  👤  🛒    │ ← 56px (including safe area)
└──────────────────────────┘
```

**Specifications:**
- Height: 56px (includes 8px padding)
- Sticky on scroll (stays at top)
- Background: Solid black (#000000)
- Icons: 24px, white, centered in 56x56px area
- Logo: Center, ~80px width

**On Scroll Down:**
- Header stays sticky
- No delay or lag
- Use position: sticky (better performance)

**On Scroll Up:**
- Optional: Fade in header if hidden
- Better: Keep always visible

---

### 3.2 Hamburger Menu

**Closed State:**
```
☰  LOGO  [right icons]
```

**Open State:**
```
┌──────────────────────────┐
│ ✕                        │ ← Close
├──────────────────────────┤
│ HOME        [48px height]│
│ SHOP        [48px height]│
│ ABOUT       [48px height]│
│ CONTACT     [48px height]│
├──────────────────────────┤
│ ACCOUNT                  │
│ LOGOUT                   │
└──────────────────────────┘
```

**Animation:**
- Slide from left (transform, GPU-friendly)
- Duration: 250ms, ease-out
- Overlay: Semi-transparent black (0.8)

**Touch Targets:**
- Menu items: 48px height minimum
- Extra padding: 16px left, 12px right
- Dividers: Subtle (1px, 20% opacity)

**Scrolling Inside Menu:**
- Allow scroll if menu taller than viewport
- Hide scroll indicators (overflow-y: auto; scrollbar-width: none)

---

### 3.3 Bottom Tab Bar (Alternative)

**Optional for e-commerce (Common pattern):**
```
┌──────────────────────────┐
│ [Content Area]           │
├──────────────────────────┤
│ 🏠 Home │ 🔍 Shop │ ❤ ... │
└──────────────────────────┘
```

**If Using Bottom Tabs:**
- Height: 56px
- 4-5 tabs maximum
- Icons + labels (optional)
- Always visible (fixed bottom)
- Safe area padding

**Recommendation:** Hamburger menu preferred for multi-section navigation

---

## 4. MOBILE PRODUCT DISPLAY

### 4.1 Product Grid Responsive

```
Phone (375px):  1 column
                [Product] [Product]
                (full width, 2 cols)

Tablet (768px): 2-3 columns
                [P1] [P2] [P3]

Desktop (1024px+): 4+ columns
                [P1] [P2] [P3] [P4]
```

**Grid Spacing:**
- Mobile: 10px gutter, 15px margins
- Tablet: 16px gutter, 20px margins
- Desktop: 24px gutter, 40px margins

**Product Card (Mobile - 2 columns):**
```
┌──────────┐
│ [Image]  │  ← 160px x 200px (full width)
├──────────┤
│ $600     │
│ Name...  │
│ Add Cart │
└──────────┘

Width: (375 - 30 margin - 10 gutter) / 2 = 167px
```

---

### 4.2 Image Optimization

**Image Formats:**

| Format | Use | Size | Browser |
|--------|-----|------|---------|
| WebP | Primary | ~30% smaller | Modern |
| JPEG | Fallback | Standard | All |
| AVIF | Premium | ~40% smaller | Safari 16+, Chrome |

**Responsive Images:**
```html
<picture>
  <source srcset="product-mobile.webp" media="(max-width: 480px)" type="image/webp">
  <source srcset="product-mobile.jpg" media="(max-width: 480px)" type="image/jpeg">
  <source srcset="product-tablet.webp" media="(max-width: 768px)" type="image/webp">
  <source srcset="product-tablet.jpg" media="(max-width: 768px)" type="image/jpeg">
  <img src="product-desktop.jpg" alt="Product" loading="lazy">
</picture>
```

**Image Sizes:**

| Use | Mobile | Tablet | Desktop |
|-----|--------|--------|---------|
| Grid | 160px | 250px | 300px |
| Hero | 375px | 768px | 1920px |
| Detail | 375px | 600px | 800px |
| Thumbnail | 60px | 80px | 100px |

**Lazy Loading:**
```html
<img src="product.jpg" alt="Product" loading="lazy">
```

---

### 4.3 Image Gallery (Mobile)

**Gallery Interaction:**
```
[Main Image] ← Touchable, swipeable
(375x500px)

[Thumbs]     ← Horizontal scroll
[T1][T2][T3][T4]...
```

**Swipe Behavior:**
- Swipe left → Next image
- Swipe right → Previous image
- Snap to image (velocity-based)
- Momentum scroll (natural feel)

**Touch Implementation:**
```javascript
// Simple swipe detection
let touchStartX = 0;

img.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

img.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const diff = touchStartX - touchEndX;
  
  if (diff > 50) nextImage();  // Swipe left
  if (diff < -50) prevImage(); // Swipe right
});
```

---

## 5. MOBILE FORMS

### 5.1 Input Field Design

**Height:** 44px-48px (touch-friendly)
**Padding:** 12px left/right, 8px top/bottom
**Font size:** 16px (prevents auto-zoom on iOS)

```css
input {
  height: 48px;
  padding: 8px 12px;
  font-size: 16px;
  border: 2px solid #fff;
  border-radius: 0;
  background: #000;
  color: #fff;
}
```

**Input Types (Mobile Keyboards):**

| Input Type | Mobile Keyboard | Use Case |
|------------|-----------------|----------|
| `type="email"` | Email with @ | Email |
| `type="tel"` | Numeric + symbols | Phone |
| `type="number"` | Numeric only | Quantity |
| `type="text"` | Standard | Name, search |
| `type="password"` | Hidden, secure | Password |

**Example:**
```html
<input type="email" inputmode="email" placeholder="Enter email">
<input type="tel" inputmode="tel" placeholder="Phone number">
```

---

### 5.2 Form Layout (Mobile)

**Stack vertically (no side-by-side):**
```
┌─────────────────┐
│ Email           │
│ [__________]    │
│                 │
│ Full Name       │
│ [__________]    │
│                 │
│ Address         │
│ [__________]    │
│                 │
│ [SUBMIT]        │
└─────────────────┘
```

**Avoid:**
- Side-by-side inputs (too cramped)
- Floating labels (confusing)
- Placeholders without labels (accessibility)

**Recommended Pattern:**
```html
<label for="email">Email</label>
<input id="email" type="email" required>
<span class="error-message"></span>
```

---

### 5.3 Button Sizing (Forms)

**Primary Button:**
- Full width
- Height: 48px-56px
- Font: 16px, uppercase
- Padding: Top/bottom 12px, sides 20px

```css
button {
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.05em;
  border: 2px solid #fff;
  background: none;
  color: #fff;
  cursor: pointer;
}

button:active {
  transform: scale(0.98);
  opacity: 0.8;
}
```

**Multiple Buttons (Stacked):**
```html
<button class="primary">Checkout</button>
<button class="secondary">Continue Shopping</button>

/* Secondary button: less prominent */
.secondary {
  border-color: rgba(255, 255, 255, 0.5);
  color: rgba(255, 255, 255, 0.8);
}
```

---

## 6. MOBILE CHECKOUT OPTIMIZATION

### 6.1 Single-Column Form

**Step-by-step layout:**
```
┌──────────────────┐
│ STEP 1 OF 3      │
│ [●───○───○]      │
├──────────────────┤
│ Email            │
│ [__________]     │
│                  │
│ Full Name        │
│ [__________]     │
│                  │
│ [NEXT STEP]      │
└──────────────────┘
```

**Progress Indicator:**
- Show step number: "Step 1 of 3"
- Visual bar: [●───○───○]
- Current step bold, others dimmed

---

### 6.2 Address Input (Mobile)

**Problem:** Address entry is complex on mobile

**Solution: Structured Inputs**
```
Street Address
[______________]

City
[______________]

Country
[▾ Select Country]

Postal Code
[______________]
```

**Alternative: Auto-complete**
- Detect location from IP
- Suggest address via Google Places API
- User confirms or edits

---

### 6.3 Payment Input (Mobile)

**Problem:** Credit card input is error-prone

**Solution: Clear, Segmented Fields**
```
Card Number
[____][____][____][____]
 1-4  5-8   9-12  13-16

Exp Date  CVC
[__/__]   [___]
MM/YY

Name on Card
[______________]
```

**Implementation:**
- Auto-format: "4111 1111 1111 1111"
- Auto-advance: Card → Exp → CVC
- Validation: Real-time, visual feedback
- Icon: Card type detected (Visa, MC)

---

### 6.4 Mobile Payment (Apple Pay / Google Pay)

**Primary CTA (if supported):**
```
[  Apple Pay  ]
[  Google Pay ]
──── OR ─────
Card payment form below
```

**Benefits:**
- One-tap checkout
- Pre-filled address/payment
- Fast, secure
- 10-20% higher conversion

**Implementation:**
```javascript
if (ApplePaySession.canMakePayments()) {
  showApplePayButton();
}

if (google.payments.api.PaymentsClient.canMakePayments()) {
  showGooglePayButton();
}
```

---

## 7. MOBILE PERFORMANCE

### 7.1 Network Optimization

**Compression:**
- Enable Gzip (all text)
- Minify CSS, JS
- WebP images (30% smaller)
- Remove unused CSS/JS

**Caching:**
- Service Worker for offline
- Cache images (30 days)
- Cache API responses (5 min)

**HTTP/2:**
- Push critical CSS
- Parallelize requests
- Reduce DNS lookups

---

### 7.2 Critical Path

**Load Order (Priority):**
```
1. HTML structure
2. Critical CSS (inline, <14kb)
3. Hero image (high-quality)
4. Above-fold content
5. JS bundle (async/defer)
6. Below-fold images (lazy)
7. Analytics, tracking (defer)
```

**Target: LCP < 2.5s**

---

### 7.3 Bundle Size

**Recommended Limits:**

| Type | Mobile | Desktop |
|------|--------|---------|
| JS | < 150kb | < 250kb |
| CSS | < 50kb | < 100kb |
| Total | < 250kb | < 500kb |

**Optimize:**
- Code splitting (per route)
- Tree-shake unused code
- Defer non-critical JS
- Inline SVG icons (avoid sprite sheets)

---

## 8. MOBILE ACCESSIBILITY

### 8.1 Touch Accessibility

**Button Sizing:**
- 44x44px minimum
- 16px+ font
- Clear visual states

**Color Contrast:**
- WCAG AA: 4.5:1 for text
- WCAG AAA: 7:1 for preferred

**Example:**
```css
/* Good contrast */
color: #ffffff;  /* White */
background: #000000;  /* Black */
/* Ratio: 21:1 ✓ */

/* Avoid */
color: #888888;  /* Gray */
background: #999999;  /* Light gray */
/* Ratio: 1.2:1 ✗ */
```

---

### 8.2 Focus Management

**Visible focus indicators:**
```css
button:focus {
  outline: 2px solid #fff;
  outline-offset: 4px;
}
```

**Focus order:**
- Tab moves logically (top → bottom)
- Trap focus in modals
- Skip links for long pages

---

### 8.3 Screen Reader Optimization

**ARIA Labels:**
```html
<button aria-label="Close menu">✕</button>
<input aria-label="Search products" type="search">
<div aria-live="polite" aria-atomic="true">
  Item added to cart
</div>
```

**Semantic HTML:**
```html
<button>Click me</button>  <!-- ✓ Good -->
<div onclick="...">Click me</div>  <!-- ✗ Bad -->
```

---

## 9. MOBILE TESTING CHECKLIST

### 9.1 Device Testing

- [ ] iPhone 12 (390px)
- [ ] iPhone SE (375px)
- [ ] Samsung Galaxy S20 (360px)
- [ ] iPad Air (768px)
- [ ] iPad Pro (1024px)
- [ ] Android tablets

### 9.2 Browser Testing

- [ ] Safari (iOS 14+)
- [ ] Chrome (Android)
- [ ] Firefox (Android)
- [ ] Samsung Internet

### 9.3 Network Testing

- [ ] 4G (LTE) - realistic
- [ ] 3G (slow) - graceful degradation
- [ ] Offline - service worker

### 9.4 Orientation Testing

- [ ] Portrait (primary)
- [ ] Landscape (secondary)
- [ ] Safe areas (notch, home indicator)

### 9.5 Interaction Testing

- [ ] Touch targets (44x44px minimum)
- [ ] Gestures (swipe, scroll, pinch)
- [ ] Keyboard (tab order, focus)
- [ ] Screen reader (VoiceOver, TalkBack)

### 9.6 Performance Testing

- [ ] Lighthouse score > 80
- [ ] FCP < 1.5s
- [ ] LCP < 2.5s
- [ ] CLS < 0.1

---

## 10. MOBILE UX PATTERNS (MONTREZ-SPECIFIC)

### 10.1 Entrance Flow on Mobile

**Landing Page:**
- Full-bleed image (hero)
- Centered logo (100px)
- [ENTER] button (full-width, bottom)

**Modal (Simplified for mobile):**
- Single column
- Tabs: Less important, use toggle instead
- Focus: Email entry (primary path)

**Video:**
- Full-width, auto-play, muted
- Skip button: Large, bottom-right (44x44px)

---

### 10.2 Product Gallery (Mobile)

**Primary interaction: Swipe**
```
Swipe left → Next image
Swipe right ← Previous image
Pinch zoom → Zoom in on detail
Double tap → Zoom in/out
```

**Lazy load thumbnails below fold**

---

### 10.3 Checkout on Mobile

**One-step at a time:**
1. Cart review
2. Shipping info
3. Payment (Apple Pay first, card fallback)

**Auto-fill:**
- Detect address from IP
- Pre-fill city/country
- Save card option

---

## 11. MOBILE OPTIMIZATION SUMMARY

**Critical Mobile UX Principles:**

1. **Touch-first** - 44x44px minimum
2. **Thumb zone** - Critical actions at bottom
3. **Single column** - Stack vertically
4. **Large fonts** - 16px+ (no zoom)
5. **Fast interactions** - Instant feedback
6. **Lazy loading** - Load-on-demand
7. **Gesture support** - Swipe, pinch
8. **Performance** - LCP < 2.5s
9. **Accessibility** - High contrast, focus
10. **Offline-ready** - Service workers

**Mobile Navigation Best Practice:**
```
Hamburger menu (top-left)
↓
Sticky header (56px)
↓
Full-width content
↓
Sticky footer buttons (on checkout)
```

**Expected Mobile Metrics:**
- Page load: 2-3 seconds
- Interaction: 100-200ms feedback
- Conversion: 60-80% of desktop
- Bounce rate: < 40% (good)

---

**Next Steps:**
- Test on real devices (iOS + Android)
- Use Chrome DevTools mobile emulation
- Run Lighthouse audits
- A/B test on production (if applicable)
- Monitor Core Web Vitals