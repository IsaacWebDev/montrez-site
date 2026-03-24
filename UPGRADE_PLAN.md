# 🚀 MONTREZ UPGRADE PLAN - PRIORITIZED ROADMAP

**Goal:** Transform from generic e-commerce to unmistakably streetwear  
**Timeline:** 3 phases (Quick Wins → Medium Effort → Bigger Vision)  
**Philosophy:** Maximum impact, minimum rewrite

---

## 🎯 PHASE 1: QUICK WINS (1-2 Hours Total)

**Impact:** 🔥🔥🔥 MASSIVE  
**Effort:** ⚡ EASY  
**Goal:** Make it FEEL streetwear immediately

### 1.1 Typography Swap (30 minutes) 🔴 CRITICAL

**What:** Replace Helvetica Neue with Bebas Neue + Inter  
**Why:** Single biggest visual impact, instantly changes vibe  
**How:**

**File:** `src/styles/theme.css`

```css
/* BEFORE */
--font-display: 'Helvetica Neue', 'Arial', sans-serif;
--font-body: 'Helvetica Neue', 'Arial', sans-serif;

/* AFTER */
--font-display: 'Bebas Neue', 'Impact', sans-serif;
--font-body: 'Inter', -apple-system, sans-serif;
```

**File:** `index.html` (add to `<head>`)

```html
<!-- Add Bebas Neue + Inter -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet">
```

**Expected Result:**  
- All headings instantly look streetwear (bold, condensed)
- Body text cleaner, more modern
- Logo gets edge

---

### 1.2 UPPERCASE All Headlines (30 minutes) 🔴 CRITICAL

**What:** Force all H1/H2/H3 to UPPERCASE  
**Why:** Streetwear convention, adds PUNCH  
**How:**

**File:** `src/styles/theme.css`

```css
/* Add to existing h1, h2, h3 rules */
h1, h2, h3 {
  font-family: var(--font-display);
  font-weight: 400;
  letter-spacing: 0.15em; /* Increased from 0.05em */
  text-transform: uppercase; /* NEW */
  line-height: 1.1;
}

/* Specific updates */
h1 {
  font-size: clamp(3rem, 10vw, 7rem); /* Bigger */
  letter-spacing: 0.2em; /* More spacing */
}

h2 {
  font-size: clamp(2rem, 6vw, 4rem);
  letter-spacing: 0.15em;
}

h3 {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  letter-spacing: 0.1em;
}
```

**Update Hero:**

**File:** `src/components/Hero.jsx`

```jsx
// BEFORE
<h1 className="hero__title">
  Luxury<br/>
  Redefined
</h1>

// AFTER
<h1 className="hero__title">
  DROP 04<br/>
  SPRING 2026
</h1>
<p className="hero__subtitle">
  PAS POUR TOUT
</p>
```

**Expected Result:**  
- Instant streetwear vibe
- Headlines COMMAND attention
- Matches Supreme/Palace energy

---

### 1.3 Electric Blue Activation (45 minutes) 🔴 CRITICAL

**What:** Replace chrome gray with electric blue #00F0FF  
**Why:** Signature color = brand recognition  
**How:**

**File:** `src/styles/theme.css`

```css
/* BEFORE */
--chrome: #666666;
--red: #dc143c;

/* AFTER */
--electric-blue: #00F0FF;
--electric-blue-glow: rgba(0, 240, 255, 0.5);
--chrome: #00F0FF; /* Replace chrome with electric blue */

/* Add glow effect utility */
.glow-blue {
  box-shadow: 0 0 20px var(--electric-blue-glow),
              0 0 40px var(--electric-blue-glow);
}
```

**Update Buttons:**

```css
/* Primary CTA - Electric Blue */
.btn-primary,
.btn-chrome {
  background: var(--electric-blue);
  color: #000000;
  border: none;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 18px 48px;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.btn-primary:hover,
.btn-chrome:hover {
  transform: scale(1.02);
  box-shadow: 0 0 25px var(--electric-blue-glow),
              0 0 50px var(--electric-blue-glow),
              0 4px 20px rgba(0, 0, 0, 0.3);
}

/* Secondary - White border with blue hover */
.btn {
  background: transparent;
  color: var(--white);
  border: 2px solid var(--white);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 18px 48px;
  position: relative;
  overflow: hidden;
  transition: all 0.25s ease;
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

**Expected Result:**  
- CTAs POP with electric blue
- Hover states have ENERGY (glow effect)
- Instant brand recognition

---

### 1.4 CTA Copy Rewrite (30 minutes) 🟠 HIGH IMPACT

**What:** Replace generic copy with attitude  
**Why:** Language shapes perception  
**How:**

**File:** `src/components/Hero.jsx`

```jsx
// BEFORE
<a href="#collections" className="btn btn-chrome">
  Explore Collections
</a>
<a href="#about" className="btn">
  Our Story
</a>

// AFTER
<a href="#collections" className="btn btn-chrome">
  SHOP THE DROP
</a>
<a href="#about" className="btn">
  THE BRAND
</a>
```

**File:** `src/components/Navbar.jsx`

```jsx
// Menu items - keep short, bold
const menuItems = [
  { label: 'SHOP', path: '/shop' },
  { label: 'DROPS', path: '/collections' }, // Changed from Collections
  { label: 'BRAND', path: '/about' }, // Changed from About
  { label: 'CONTACT', path: '/contact' }
]
```

**File:** `src/pages/Shop.jsx`

```jsx
// Title
<h1 className="shop__title">SHOP</h1>
<p className="shop__subtitle">PAS POUR TOUT</p>

// Filters
"Filter by Category" → "CATEGORY"
"Price Range" → "PRICE"
"Sort by:" → "SORT:"

// Results
"No products found" → "NOTHING HERE"
"Reset Filters" → "RESET"
```

**File:** `src/components/ProductDetail.jsx`

```jsx
// Size selection
"Select a size" → "PICK YOUR SIZE"

// Add to cart
<button className="btn-primary">
  ADD TO CART
</button>
// Change to:
<button className="btn-primary">
  COP IT NOW
</button>

// Out of stock
"Out of Stock" → "SOLD OUT"
```

**Expected Result:**  
- Copy has ATTITUDE
- Sounds like a streetwear brand, not Gap
- Matches "Pas pour Tout" rebellious tone

---

### 1.5 Logo Font Fix (15 minutes) 🟠 HIGH IMPACT

**What:** Replace Playfair Display serif logo with Bebas Neue  
**Why:** Serif = luxury, Sans = streetwear  
**How:**

**File:** `src/styles/Navbar.css`

```css
/* BEFORE */
.navbar__logo {
  font-family: 'Playfair Display', serif;
  font-weight: 300;
  letter-spacing: 0.5em;
}

/* AFTER */
.navbar__logo {
  font-family: 'Bebas Neue', 'Impact', sans-serif;
  font-weight: 400;
  letter-spacing: 0.3em;
  font-size: 1.75rem;
  text-transform: uppercase;
}
```

**Expected Result:**  
- Logo looks streetwear immediately
- Matches brand guidelines
- More impact, less refinement

---

**PHASE 1 TOTAL:** ~2.5 hours  
**IMPACT:** Site goes from 6.5/10 → 8/10 in vibe

---

## 🎨 PHASE 2: MEDIUM EFFORT (3-5 Hours Total)

**Impact:** 🔥🔥 HIGH  
**Effort:** ⚙️ MEDIUM  
**Goal:** Add streetwear-specific UI patterns

### 2.1 Product Card Glow Hover (1 hour) 🟠 HIGH

**What:** Electric blue border glow on product card hover  
**Why:** Streetwear sites have REACTIVE hover states  
**How:**

**File:** `src/styles/ProductCard.css`

```css
.product-card {
  background: var(--near-black);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
  position: relative;
}

.product-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px solid var(--electric-blue);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 0 30px var(--electric-blue-glow),
              0 8px 30px rgba(0, 0, 0, 0.4);
}

.product-card:hover::before {
  opacity: 1;
}

.product-card__name {
  font-family: var(--font-display);
  font-size: 1.25rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.product-card__price {
  font-weight: 700;
  color: var(--electric-blue);
  font-size: 1.1rem;
}
```

**Expected Result:**  
- Cards feel ALIVE on hover
- Electric blue signature color visible
- Premium tactile interaction

---

### 2.2 Mobile Touch Targets Fix (1.5 hours) 🟠 HIGH

**What:** Ensure ALL interactive elements are 48x48px minimum  
**Why:** Mobile users = 80% of traffic, mis-taps = bounce  
**How:**

**File:** `src/styles/Navbar.css`

```css
/* Mobile touch targets */
@media (max-width: 768px) {
  /* Hamburger menu */
  .navbar__hamburger {
    min-width: 48px;
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
  }
  
  /* Icons (search, cart) */
  .navbar__icon {
    min-width: 48px;
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
  }
  
  /* Add spacing between icons */
  .navbar__right {
    gap: 4px; /* Reduced gap, icons are bigger now */
  }
}
```

**File:** `src/styles/Shop.css`

```css
@media (max-width: 768px) {
  /* Filter buttons */
  .shop__filter-btn {
    min-height: 48px;
    padding: 12px 20px;
    font-size: 0.9rem;
  }
  
  /* Size buttons */
  .shop__size-btn {
    min-width: 48px;
    min-height: 48px;
    font-size: 1rem;
  }
  
  /* Sort dropdown */
  .shop__toolbar select {
    min-height: 48px;
    padding: 12px;
    font-size: 1rem;
  }
}
```

**File:** `src/styles/ProductDetail.css`

```css
@media (max-width: 768px) {
  /* Size selector buttons */
  .product-detail__size-btn {
    min-width: 56px;
    min-height: 56px;
    font-size: 1.1rem;
    margin: 4px;
  }
  
  /* Add to cart button */
  .product-detail__cta .btn-primary {
    min-height: 56px;
    width: 100%;
    font-size: 1.1rem;
  }
}
```

**Expected Result:**  
- Zero mis-taps on mobile
- Professional mobile UX
- Reduced bounce rate

---

### 2.3 Navigation Electric Blue Accents (45 minutes) 🟡 MEDIUM

**What:** Active page indicator + hover states in electric blue  
**Why:** Navigation should reflect brand color  
**How:**

**File:** `src/styles/Navbar.css`

```css
/* Slide-out menu links */
.navbar__menu-link {
  font-family: var(--font-display);
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--white);
  background: transparent;
  border: none;
  padding: 16px 32px;
  text-align: left;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

/* Electric blue accent bar on left */
.navbar__menu-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: var(--electric-blue);
  transition: width 0.3s ease;
}

.navbar__menu-link:hover::before,
.navbar__menu-link.active::before {
  width: 4px;
}

.navbar__menu-link:hover {
  color: var(--electric-blue);
  padding-left: 40px;
}

.navbar__menu-link.active {
  color: var(--electric-blue);
}
```

**Update Component:**

**File:** `src/components/Navbar.jsx`

```jsx
// Add active page detection
const location = useLocation()

{menuItems.map((item, index) => (
  <motion.button
    key={item.path}
    className={`navbar__menu-link ${location.pathname === item.path ? 'active' : ''}`}
    onClick={() => handleMenuClick(item.path)}
    // ... rest of props
  >
    {item.label}
  </motion.button>
))}
```

**Expected Result:**  
- Active page is CLEAR (electric blue)
- Hover states are engaging
- Navigation feels branded

---

### 2.4 Asymmetric Homepage Layout (2 hours) 🟡 MEDIUM

**What:** Break the grid on Collections section  
**Why:** Streetwear embraces asymmetry, disruption  
**How:**

**File:** `src/components/Collections.jsx`

```jsx
// Replace 3-column equal grid with asymmetric layout
<div className="collections__grid-asymmetric">
  <div className="collections__card collections__card--large">
    {/* Featured collection - 2x size */}
    <img src="/images/collection-1.jpg" alt="New Arrivals" />
    <div className="collections__overlay">
      <h3>NEW ARRIVALS</h3>
      <a href="/collections?category=new" className="btn-primary">
        SHOP NOW
      </a>
    </div>
  </div>
  
  <div className="collections__card collections__card--small">
    {/* Collection 2 - smaller */}
    <img src="/images/collection-2.jpg" alt="Outerwear" />
    <div className="collections__overlay">
      <h3>OUTERWEAR</h3>
      <a href="/collections?category=outerwear">
        VIEW
      </a>
    </div>
  </div>
  
  <div className="collections__card collections__card--small">
    {/* Collection 3 - smaller */}
    <img src="/images/collection-3.jpg" alt="Bottoms" />
    <div className="collections__overlay">
      <h3>BOTTOMS</h3>
      <a href="/collections?category=bottoms">
        VIEW
      </a>
    </div>
  </div>
</div>
```

**File:** `src/styles/Collections.css`

```css
.collections__grid-asymmetric {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 600px 300px;
  gap: 24px;
  margin: var(--space-lg) 0;
}

.collections__card--large {
  grid-column: 1 / 2;
  grid-row: 1 / 3;
}

.collections__card--small {
  grid-column: span 1;
}

@media (max-width: 768px) {
  .collections__grid-asymmetric {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
  
  .collections__card--large {
    grid-column: 1;
    grid-row: auto;
  }
}

.collections__card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.collections__card:hover {
  transform: scale(1.02);
}

.collections__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 32px;
  background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
}

.collections__overlay h3 {
  font-family: var(--font-display);
  font-size: 2rem;
  letter-spacing: 0.2em;
  color: var(--white);
  margin-bottom: 16px;
}
```

**Expected Result:**  
- Homepage feels DYNAMIC
- Featured collection gets prominence
- Less "template-y", more custom

---

### 2.5 Sold Out Tags (30 minutes) 🟡 MEDIUM

**What:** Electric blue "SOLD OUT" tags on product cards  
**Why:** Creates urgency, scarcity  
**How:**

**File:** `src/components/ProductCard.jsx`

```jsx
export default function ProductCard({ product }) {
  const isSoldOut = product.stock === 0 || product.soldOut
  
  return (
    <div className={`product-card ${isSoldOut ? 'product-card--sold-out' : ''}`}>
      {isSoldOut && (
        <div className="product-card__sold-out-tag">
          SOLD OUT
        </div>
      )}
      <img src={product.image} alt={product.name} />
      <h3 className="product-card__name">{product.name}</h3>
      <p className="product-card__price">R{product.price}</p>
    </div>
  )
}
```

**File:** `src/styles/ProductCard.css`

```css
.product-card--sold-out {
  opacity: 0.6;
  pointer-events: none;
}

.product-card__sold-out-tag {
  position: absolute;
  top: 16px;
  right: 16px;
  background: var(--electric-blue);
  color: #000000;
  font-family: var(--font-display);
  font-size: 0.9rem;
  letter-spacing: 0.15em;
  padding: 8px 16px;
  text-transform: uppercase;
  font-weight: 700;
  z-index: 10;
  box-shadow: 0 0 20px var(--electric-blue-glow);
}

.product-card--sold-out img {
  filter: grayscale(100%);
}
```

**Expected Result:**  
- Creates urgency (scarcity principle)
- Electric blue tag pops
- Matches Supreme "SOLD OUT" aesthetic

---

**PHASE 2 TOTAL:** ~5.5 hours  
**IMPACT:** Site goes from 8/10 → 8.5/10 in execution

---

## 🌟 PHASE 3: BIGGER REDESIGN (Future Sprint)

**Impact:** 🔥 HIGH  
**Effort:** ⚙️⚙️⚙️ COMPLEX  
**Goal:** World-class streetwear site

### 3.1 Photography Overhaul (External - Not coded)

**What:** Professional streetwear photography  
**Investment:** $2,000-5,000 for photographer + models  
**Deliverables:**
- 10-15 hero product shots (B&W + color)
- 20-30 lifestyle shots (urban environments)
- 10 detail shots (textures, tags, stitching)
- Model photography (street-style, candid)

**Style Guide:**
- **Locations:** Concrete walls, graffiti, neon signs, industrial areas
- **Lighting:** Natural light, neon accents, high contrast
- **Models:** Authentic street style, NOT traditional fashion poses
- **Filters:** B&W preferred OR desaturated with electric blue accent

**Reference Mood Board:**
- Supreme FW25 lookbook
- Palace skate photography
- A-COLD-WALL* campaign imagery
- Carhartt WIP street photography

---

### 3.2 Advanced Micro-interactions (3-4 hours)

**What:** Boutique animations and interactions  
**Why:** Polish separates good from great  
**Examples:**

**3.2.1 Cart Badge Bounce Animation**

```css
@keyframes cart-badge-bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
}

.navbar__cart-count {
  animation: cart-badge-bounce 0.5s ease;
}
```

**3.2.2 Product Card Image Zoom on Hover**

```css
.product-card__image-wrapper {
  overflow: hidden;
}

.product-card__image {
  transition: transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.product-card:hover .product-card__image {
  transform: scale(1.1);
}
```

**3.2.3 Neon Pulse on CTA**

```css
@keyframes neon-pulse {
  0%, 100% { box-shadow: 0 0 20px var(--electric-blue-glow); }
  50% { box-shadow: 0 0 40px var(--electric-blue-glow); }
}

.btn-primary:hover {
  animation: neon-pulse 2s ease-in-out infinite;
}
```

**3.2.4 Scanline Effect on Hero**

```css
.hero::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 240, 255, 0.03),
    rgba(0, 240, 255, 0.03) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
  opacity: 0.5;
  animation: scanline 8s linear infinite;
}

@keyframes scanline {
  0% { transform: translateY(0); }
  100% { transform: translateY(100%); }
}
```

---

### 3.3 Checkout Flow UX Overhaul (5-8 hours)

**What:** Frictionless, mobile-first checkout  
**Why:** Cart abandonment = lost revenue  
**Features:**

**3.3.1 One-Page Checkout (Mobile)**
- All fields visible at once (no multi-step on mobile)
- Electric blue progress indicator
- Auto-save to localStorage
- Guest checkout (no forced account creation)

**3.3.2 PayFast Integration Polish**
- Electric blue payment button
- Loading states with spinner
- Error messages in brand voice ("SOMETHING WENT WRONG" not "Error 500")
- Success screen with confetti animation

**3.3.3 Order Confirmation Shareability**
- "SHARE YOUR COP" CTA
- Instagram story template generator
- Electric blue "JUST COPPED" badge

---

### 3.4 Limited Drop Timer (2 hours)

**What:** Countdown timer for product drops  
**Why:** Urgency = conversions  
**How:**

```jsx
// components/DropTimer.jsx
export default function DropTimer({ launchDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  
  return (
    <div className="drop-timer">
      <p className="drop-timer__label">DROP GOES LIVE IN:</p>
      <div className="drop-timer__countdown">
        <div className="drop-timer__unit">
          <span className="drop-timer__number">{timeLeft.days}</span>
          <span className="drop-timer__label">DAYS</span>
        </div>
        <div className="drop-timer__unit">
          <span className="drop-timer__number">{timeLeft.hours}</span>
          <span className="drop-timer__label">HRS</span>
        </div>
        <div className="drop-timer__unit">
          <span className="drop-timer__number">{timeLeft.minutes}</span>
          <span className="drop-timer__label">MIN</span>
        </div>
        <div className="drop-timer__unit">
          <span className="drop-timer__number">{timeLeft.seconds}</span>
          <span className="drop-timer__label">SEC</span>
        </div>
      </div>
    </div>
  )
}
```

**Style:**
```css
.drop-timer__number {
  font-family: var(--font-display);
  font-size: 3rem;
  color: var(--electric-blue);
  text-shadow: 0 0 20px var(--electric-blue-glow);
}
```

---

### 3.5 "Cop or Drop" Quick Poll (1 hour)

**What:** Votable product previews (hype builder)  
**Why:** Community engagement, social proof  
**How:**

```jsx
// On product cards
<div className="product-card__poll">
  <button className="poll-btn poll-btn--cop">
    🔥 COP ({copCount})
  </button>
  <button className="poll-btn poll-btn--drop">
    💀 DROP ({dropCount})
  </button>
</div>
```

**Result:** Users interact before buying = higher engagement

---

**PHASE 3 TOTAL:** ~15-20 hours + photography budget  
**IMPACT:** Site goes from 8.5/10 → 9.5/10 (world-class)

---

## 📦 SUMMARY: EFFORT vs IMPACT

| Phase | Tasks | Time | Impact | Result |
|-------|-------|------|--------|--------|
| **Phase 1** | Typography, Color, Copy | 2.5hr | 🔥🔥🔥 MASSIVE | 6.5→8/10 |
| **Phase 2** | Interactions, Mobile, Layout | 5.5hr | 🔥🔥 HIGH | 8→8.5/10 |
| **Phase 3** | Photography, Advanced UX | 15-20hr | 🔥 HIGH | 8.5→9.5/10 |

**Recommended Path:**
1. **Start with Phase 1** (2.5hr) → Deploy immediately
2. **Review feedback** → Iterate
3. **Add Phase 2** (5.5hr) → Deploy next week
4. **Plan Phase 3** → Schedule for future sprint

---

## 🚀 DEPLOYMENT CHECKLIST

**Before deploying each phase:**

- [ ] Test on mobile (iPhone Safari + Chrome)
- [ ] Test on desktop (Chrome, Firefox, Safari)
- [ ] Check contrast ratios (electric blue on black = WCAG AA?)
- [ ] Verify touch targets (48x48px minimum)
- [ ] Test navigation flow (all links work)
- [ ] Check cart functionality
- [ ] Lighthouse score > 90
- [ ] Preview on Vercel staging URL
- [ ] Get client approval
- [ ] Deploy to production

---

**Next Steps:** See ANNOUNCEMENT_BAR_SPEC.md + CSS_QUICK_WINS.css for implementation details.
