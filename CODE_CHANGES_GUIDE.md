# 🔧 MONTREZ - EXACT CODE CHANGES GUIDE

**Purpose:** Line-by-line instructions for implementing Phase 1 Quick Wins  
**Time:** 2.5 hours  
**Impact:** 6.5/10 → 8/10

---

## 🎯 CHANGE 1: ADD FONTS (5 minutes)

### File: `index.html`

**Location:** Inside `<head>` tag, before closing `</head>`

```html
<!-- BEFORE (nothing) -->

<!-- AFTER (add these lines) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet">
```

**Full context:**
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Montrez - Luxury Fashion</title>
    
    <!-- ADD THESE LINES ↓ -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet">
    <!-- ADD THESE LINES ↑ -->
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## 🎯 CHANGE 2: UPDATE CSS VARIABLES (10 minutes)

### File: `src/styles/theme.css`

**Location:** `:root` section (top of file)

**BEFORE:**
```css
:root {
  /* Core Colors - Light Theme */
  --black: #000000;
  --near-black: #1a1a1a;
  --dark-grey: #333333;
  --mid-grey: #666666;
  --light-grey: #999999;
  --white: #ffffff;
  --off-white: #f5f5f5;
  --bg-light: #fafafa;
  
  /* Accent Colors - Minimal */
  --chrome: #666666;
  --red: #dc143c;
  
  /* Typography */
  --font-display: 'Helvetica Neue', 'Arial', sans-serif;
  --font-body: 'Helvetica Neue', 'Arial', sans-serif;
  
  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 8rem;
  
  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-medium: 0.3s ease;
  --transition-slow: 0.6s ease;
  
  /* Z-index layers */
  --z-video: 1;
  --z-nav: 100;
  --z-overlay: 500;
  --z-modal: 1000;
}
```

**AFTER:**
```css
:root {
  /* Core Colors - Streetwear Theme */
  --black: #000000;
  --near-black: #1a1a1a;
  --dark-grey: #333333;
  --mid-grey: #666666;
  --light-grey: #999999;
  --white: #ffffff;
  --off-white: #f5f5f5;
  --bg-light: #fafafa;
  
  /* Accent Colors - Electric Blue */
  --electric-blue: #00F0FF;                    /* NEW */
  --electric-blue-glow: rgba(0, 240, 255, 0.5); /* NEW */
  --chrome: #00F0FF;                           /* CHANGED from #666666 */
  --red: #dc143c;
  
  /* Typography - Streetwear */
  --font-display: 'Bebas Neue', 'Impact', sans-serif;  /* CHANGED */
  --font-body: 'Inter', -apple-system, sans-serif;     /* CHANGED */
  
  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 8rem;
  
  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-medium: 0.3s ease;
  --transition-slow: 0.6s ease;
  
  /* Z-index layers */
  --z-video: 1;
  --z-nav: 100;
  --z-overlay: 500;
  --z-modal: 1000;
}
```

**Changes summary:**
- Added `--electric-blue: #00F0FF`
- Added `--electric-blue-glow: rgba(0, 240, 255, 0.5)`
- Changed `--chrome` from `#666666` to `#00F0FF`
- Changed `--font-display` from `'Helvetica Neue'` to `'Bebas Neue', 'Impact'`
- Changed `--font-body` from `'Helvetica Neue'` to `'Inter', -apple-system`

---

## 🎯 CHANGE 3: FORCE UPPERCASE HEADLINES (5 minutes)

### File: `src/styles/theme.css`

**Location:** Typography section (after `:root`)

**BEFORE:**
```css
/* Typography Scale */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 300;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

h1 {
  font-size: clamp(2.5rem, 8vw, 6rem);
  line-height: 1.1;
}

h2 {
  font-size: clamp(2rem, 6vw, 4rem);
}

h3 {
  font-size: clamp(1.5rem, 4vw, 3rem);
}
```

**AFTER:**
```css
/* Typography Scale - Streetwear */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 400;                 /* CHANGED from 300 */
  letter-spacing: 0.15em;           /* CHANGED from 0.05em */
  text-transform: uppercase;
  line-height: 1.1;
}

h1 {
  font-size: clamp(3rem, 10vw, 7rem);   /* CHANGED for bigger impact */
  letter-spacing: 0.2em;                 /* CHANGED more spacing */
}

h2 {
  font-size: clamp(2rem, 6vw, 4rem);
  letter-spacing: 0.15em;                /* ADDED */
}

h3 {
  font-size: clamp(1.5rem, 4vw, 2.5rem); /* CHANGED */
  letter-spacing: 0.1em;                 /* ADDED */
}
```

---

## 🎯 CHANGE 4: UPDATE HERO TEXT (10 minutes)

### File: `src/components/Hero.jsx`

**Location:** Hero component JSX

**BEFORE:**
```jsx
<div className="hero__text fade-in">
  <h1 className="hero__title">
    Luxury<br/>
    Redefined
  </h1>
  <p className="hero__subtitle">
    Premium fashion for those who dare to stand out
  </p>
  <div className="hero__cta">
    <a href="#collections" className="btn btn-chrome">
      Explore Collections
    </a>
    <a href="#about" className="btn">
      Our Story
    </a>
  </div>
</div>
```

**AFTER:**
```jsx
<div className="hero__text fade-in">
  <h1 className="hero__title">
    DROP 04<br/>
    SPRING 2026
  </h1>
  <p className="hero__subtitle">
    PAS POUR TOUT
  </p>
  <div className="hero__cta">
    <a href="#collections" className="btn btn-chrome">
      SHOP THE DROP
    </a>
    <a href="#about" className="btn">
      THE BRAND
    </a>
  </div>
</div>
```

**Changes:**
- Title: "Luxury Redefined" → "DROP 04 / SPRING 2026"
- Subtitle: Long text → "PAS POUR TOUT"
- CTA 1: "Explore Collections" → "SHOP THE DROP"
- CTA 2: "Our Story" → "THE BRAND"

---

## 🎯 CHANGE 5: UPDATE NAVBAR LOGO FONT (5 minutes)

### File: `src/styles/Navbar.css`

**Location:** `.navbar__logo` class

**BEFORE:**
```css
.navbar__logo {
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.5em;
  color: #000000;
  text-transform: uppercase;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  font-family: 'Playfair Display', serif;  /* ← OLD */
  padding: 0 20px;
}
```

**AFTER:**
```css
.navbar__logo {
  font-size: 1.75rem;              /* Slightly bigger */
  font-weight: 400;                /* Bolder */
  letter-spacing: 0.3em;           /* Less spacing */
  color: #000000;
  text-transform: uppercase;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  font-family: var(--font-display); /* ← NEW (Bebas Neue) */
  padding: 0 20px;
}
```

---

## 🎯 CHANGE 6: UPDATE SHOP PAGE COPY (10 minutes)

### File: `src/pages/Shop.jsx`

**Location:** Multiple sections

**BEFORE:**
```jsx
<div className="shop__header">
  <h1 className="shop__title">Shop</h1>
  <p className="shop__subtitle">Pas pour Tout</p>
  {searchQuery && (
    <p className="shop__search-info">
      Search results for "{searchQuery}" ({filteredProducts.length} found)
    </p>
  )}
</div>
```

**AFTER:**
```jsx
<div className="shop__header">
  <h1 className="shop__title">SHOP</h1>           {/* Already uppercase in CSS */}
  <p className="shop__subtitle">PAS POUR TOUT</p> {/* Already uppercase */}
  {searchQuery && (
    <p className="shop__search-info">
      SEARCH: "{searchQuery}" ({filteredProducts.length} FOUND)
    </p>
  )}
</div>
```

**Also update:**

**Mobile filter toggle (before):**
```jsx
<button 
  className="shop__filter-toggle"
  onClick={() => setShowFilters(!showFilters)}
>
  {showFilters ? 'Hide Filters' : 'Show Filters'}
</button>
```

**Mobile filter toggle (after):**
```jsx
<button 
  className="shop__filter-toggle"
  onClick={() => setShowFilters(!showFilters)}
>
  {showFilters ? 'HIDE FILTERS' : 'SHOW FILTERS'}
</button>
```

**No results (before):**
```jsx
<div className="shop__no-results">
  <p>No products found matching your filters.</p>
  <button 
    className="shop__reset-btn"
    onClick={resetFilters}
  >
    Reset Filters
  </button>
</div>
```

**No results (after):**
```jsx
<div className="shop__no-results">
  <p>NOTHING HERE</p>
  <button 
    className="shop__reset-btn"
    onClick={resetFilters}
  >
    RESET
  </button>
</div>
```

---

## 🎯 CHANGE 7: UPDATE BUTTON STYLES (15 minutes)

### File: `src/styles/theme.css`

**Location:** Button section (add after typography)

**ADD THIS CODE:**
```css
/* ================================================================
   BUTTONS - STREETWEAR STYLE
   ================================================================ */

/* Primary CTA - Electric Blue */
.btn-primary,
.btn-chrome {
  background: var(--electric-blue);
  color: #000000;
  border: none;
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 18px 48px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  overflow: hidden;
}

.btn-primary:hover,
.btn-chrome:hover {
  transform: scale(1.02);
  box-shadow: 
    0 0 25px var(--electric-blue-glow),
    0 0 50px var(--electric-blue-glow),
    0 4px 20px rgba(0, 0, 0, 0.3);
}

/* Secondary CTA - White border with blue fill on hover */
.btn {
  background: transparent;
  color: var(--white);
  border: 2px solid var(--white);
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 18px 48px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.25s ease;
  text-decoration: none;
  display: inline-block;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: var(--electric-blue);
  transition: left 0.3s ease;
  z-index: -1;
}

.btn:hover {
  color: #000000;
  border-color: var(--electric-blue);
}

.btn:hover::before {
  left: 0;
}
```

---

## 🎯 CHANGE 8: UPDATE PRODUCT DETAIL PAGE (10 minutes)

### File: `src/components/ProductDetail.jsx`

**BEFORE:**
```jsx
// Size selection label
<p>Select a size</p>

// Add to cart button
const handleAddToCart = () => {
  if (!selectedSize) {
    alert('Please select a size')
    return
  }
  alert(`Added ${product.name} (${selectedSize}) to cart`)
}

return (
  <button onClick={handleAddToCart}>
    Add to Cart
  </button>
)
```

**AFTER:**
```jsx
// Size selection label
<p className="product-detail__size-label">PICK YOUR SIZE</p>

// Add to cart button
const handleAddToCart = () => {
  if (!selectedSize) {
    alert('PICK A SIZE FIRST')
    return
  }
  alert(`ADDED TO CART: ${product.name.toUpperCase()} (${selectedSize})`)
}

return (
  <button className="btn-primary" onClick={handleAddToCart}>
    COP IT NOW
  </button>
)
```

---

## 🎯 CHANGE 9: UPDATE NAVBAR MENU (10 minutes)

### File: `src/components/Navbar.jsx`

**BEFORE:**
```jsx
const menuItems = [
  { label: 'Shop', path: '/shop' },
  { label: 'Collections', path: '/collections' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' }
]
```

**AFTER:**
```jsx
const menuItems = [
  { label: 'SHOP', path: '/shop' },
  { label: 'DROPS', path: '/collections' },     // Changed from "Collections"
  { label: 'BRAND', path: '/about' },           // Changed from "About"
  { label: 'CONTACT', path: '/contact' }
]
```

**Also update menu footer:**

**BEFORE:**
```jsx
<div className="navbar__menu-footer">
  <p className="navbar__menu-tagline">Pas pour Tout</p>
</div>
```

**AFTER:**
```jsx
<div className="navbar__menu-footer">
  <p className="navbar__menu-tagline">PAS POUR TOUT</p>
  <p className="navbar__menu-subtitle">NOT FOR EVERYONE</p>
</div>
```

**Add CSS for subtitle:**

**File:** `src/styles/Navbar.css`

```css
.navbar__menu-subtitle {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.15em;
  margin-top: 0.5rem;
}
```

---

## 🎯 CHANGE 10: ADD ELECTRIC BLUE GLOW UTILITY (5 minutes)

### File: `src/styles/theme.css`

**Location:** After buttons section

**ADD THIS CODE:**
```css
/* ================================================================
   UTILITY CLASSES
   ================================================================ */

/* Electric blue glow effect */
.glow-blue {
  box-shadow: 
    0 0 20px var(--electric-blue-glow),
    0 0 40px var(--electric-blue-glow);
}

/* Uppercase text */
.uppercase {
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

/* Display font */
.font-display {
  font-family: var(--font-display);
}

/* Electric blue text color */
.text-blue {
  color: var(--electric-blue);
}
```

---

## ✅ TESTING CHECKLIST

After making all changes:

### Visual Testing
- [ ] Load site in browser
- [ ] Verify Bebas Neue font is loaded (check Network tab)
- [ ] Headlines are UPPERCASE and bold
- [ ] Hero says "DROP 04 // SPRING 2026"
- [ ] CTAs say "SHOP THE DROP" / "THE BRAND"
- [ ] Logo uses Bebas Neue (not Playfair Display)
- [ ] Buttons are electric blue (#00F0FF)
- [ ] Hover states show glow effect

### Mobile Testing
- [ ] Test on iPhone Safari
- [ ] Test on Android Chrome
- [ ] Verify text is readable
- [ ] Buttons are easy to tap
- [ ] Navigation works smoothly

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Accessibility
- [ ] Tab navigation works
- [ ] Focus indicators visible
- [ ] Screen reader friendly
- [ ] Contrast ratios pass WCAG AA

---

## 🚀 DEPLOYMENT

### Local Testing
```bash
# Start dev server
npm run dev

# Open in browser
http://localhost:5173

# Test all changes
```

### Staging Deployment
```bash
# Build for production
npm run build

# Deploy to Vercel staging
vercel --prod=false

# Test staging URL
# Get approval
```

### Production Deployment
```bash
# Deploy to production
vercel --prod

# or
git push origin main
# (if auto-deploy is enabled)
```

---

## 📊 EXPECTED BEFORE/AFTER

### Typography
- **Before:** Helvetica Neue (generic)
- **After:** Bebas Neue (streetwear)

### Colors
- **Before:** Gray #666666 (muted)
- **After:** Electric Blue #00F0FF (signature)

### Copy
- **Before:** "Explore Collections" (corporate)
- **After:** "SHOP THE DROP" (streetwear)

### Hero
- **Before:** "Luxury Redefined" (generic)
- **After:** "DROP 04 // SPRING 2026" (Supreme vibes)

### Overall Vibe
- **Before:** Generic luxury e-commerce (6.5/10)
- **After:** Unmistakably streetwear (8/10)

---

## ⏱️ TIME BREAKDOWN

| Task | Time | File |
|------|------|------|
| Add fonts | 5min | `index.html` |
| Update CSS variables | 10min | `theme.css` |
| Force uppercase headlines | 5min | `theme.css` |
| Update hero text | 10min | `Hero.jsx` |
| Fix navbar logo font | 5min | `Navbar.css` |
| Update shop page copy | 10min | `Shop.jsx` |
| Add button styles | 15min | `theme.css` |
| Update product detail | 10min | `ProductDetail.jsx` |
| Update navbar menu | 10min | `Navbar.jsx` |
| Add utility classes | 5min | `theme.css` |
| **TOTAL** | **1hr 25min** | |

**Buffer time:** 1hr for testing/debugging  
**Total Phase 1:** 2.5 hours

---

## 🆘 TROUBLESHOOTING

### Fonts not loading?
- Check Network tab in DevTools
- Verify font links in `<head>`
- Clear browser cache
- Try hard refresh (Ctrl+Shift+R)

### Electric blue not showing?
- Check CSS variables in `:root`
- Verify `--chrome: #00F0FF`
- Inspect element to see computed styles
- Check for CSS specificity conflicts

### Headlines still lowercase?
- Check `text-transform: uppercase` in h1/h2/h3
- Verify Bebas Neue is loaded
- Check if other CSS is overriding

### Buttons not glowing?
- Check hover state CSS
- Verify `--electric-blue-glow` variable
- Test in different browsers
- Check if backdrop-filter is supported

---

**Code changes guide complete. Time to build.** 🔧🚀
