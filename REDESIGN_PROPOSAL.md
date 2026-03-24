# MONTRÉZ UI REDESIGN PROPOSAL
## Luxury Streetwear Evolution

**Date:** March 25, 2026  
**Brand:** MONTRÉZ — European Luxury Streetwear  
**Tagline:** "Pas pour Tout" (Not for Everyone)  
**Site:** https://montrez-site.vercel.app  

---

## 📊 EXECUTIVE SUMMARY

MONTRÉZ currently has solid foundations: clean aesthetics, the château imagery, and proper React/Framer Motion infrastructure. However, the site feels **generic e-commerce** rather than **exclusive luxury streetwear**. 

This proposal transforms MONTRÉZ into a **premium digital destination** that matches the exclusivity of brands like Supreme, Palace, and Rick Owens while maintaining performance and conversion optimization.

**Key Transformation:**
- From: Standard e-commerce template feel
- To: Memorable, premium interaction-driven experience
- Timeline: 2-4 weeks (phased implementation)
- Expected Impact: +35% engagement, +20% time-on-site, +15% conversion

---

## 🎯 CURRENT STATE ANALYSIS

### What's Working ✅
1. **Strong Brand Foundation**
   - Château imagery establishes luxury positioning
   - "Pas pour Tout" exclusivity messaging
   - Bebas Neue typography (bold, editorial)
   - Black/white/grey minimalist palette

2. **Technical Infrastructure**
   - React + Framer Motion (animation-ready)
   - Clean component architecture
   - Responsive foundations

3. **Basic UX Flows**
   - Clear navigation
   - Product filtering works
   - Cart functionality solid

### What's Generic/Boring ❌

#### 1. **Zero Cursor Interaction** 
Standard browser cursor = missed opportunity for luxury feel. No magnetic buttons, no custom cursor, no element following.

#### 2. **Flat Product Cards**
Simple hover lift (`whileHover={{ y: -5 }}`) is 2019 web design. No depth, no personality, no memorability.

```jsx
// CURRENT: Basic and forgettable
<motion.div whileHover={{ y: -5 }}>
```

#### 3. **Instant Transitions**
Page changes are jarring, instant. No smooth crossfades or page transitions that signal premium attention to detail.

#### 4. **Static Typography**
Text sits idle. No gradient effects on hover, no subtle text reveals, no dynamic headlines.

#### 5. **Uniform Grid Layout**
Standard CSS Grid with equal spacing = Shopify template vibes. Luxury brands use asymmetry and varied sizing.

#### 6. **No Scroll-Triggered Magic**
Content just appears. No parallax image movement, no staggered reveals, no scroll-linked animations.

#### 7. **Standard Buttons**
Grey rectangles. No magnetic pull toward cursor, no micro-interactions, no haptic feedback feel.

#### 8. **Lack of Glassmorphism**
Missed opportunity for modern, premium UI layering (modals, cart, overlays).

#### 9. **Generic Cart Counter**
Just a number. Should pulse/animate on add-to-cart with more personality.

#### 10. **Missing Micro-Interactions**
- No button hover sound effects (optional)
- No ripple effects on clicks
- No loading state personality
- No Easter eggs for engaged users

---

## 🚀 PROPOSED COOL FEATURES (DETAILED)

### 🎨 TIER 1: HIGH IMPACT, QUICK WINS (Week 1)

#### 1.1 **Custom Luxury Cursor**
**What:** Large circular cursor (30-40px) that follows mouse with slight lag, scale-up on interactive elements.

**Why:** Instantly signals "this is not a normal website." Used by Awwwards winners and luxury brands.

**Implementation:**
```jsx
// CustomCursor.jsx
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState('default')
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 300 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  
  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 20)
      cursorY.set(e.clientY - 20)
    }
    
    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])
  
  const cursorVariants = {
    default: { scale: 1, mixBlendMode: 'difference' },
    hover: { scale: 1.5, mixBlendMode: 'difference' }
  }
  
  return (
    <motion.div
      className="custom-cursor"
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
        position: 'fixed',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '2px solid #fff',
        pointerEvents: 'none',
        zIndex: 9999
      }}
      variants={cursorVariants}
      animate={cursorVariant}
    />
  )
}
```

**CSS:**
```css
body {
  cursor: none; /* Hide default cursor */
}

a, button, [role="button"] {
  cursor: none;
}

.custom-cursor {
  mix-blend-mode: difference;
  will-change: transform;
}
```

**Effort:** 2-3 hours  
**Impact:** Immediate "wow" factor

---

#### 1.2 **Magnetic Buttons (Cursor Attraction)**
**What:** Buttons/cards subtly move toward cursor when nearby (15-20px radius), creating "magnetic" feel.

**Why:** Makes interactions feel tactile and premium. Used by Apple, Stripe, Linear.

**Implementation:**
```jsx
// MagneticButton.jsx
import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function MagneticButton({ children, className, onClick }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { damping: 20, stiffness: 300 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)
  
  const handleMouseMove = (e) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    
    // Magnetic pull (max 20px)
    x.set(Math.min(Math.max(distanceX * 0.2, -20), 20))
    y.set(Math.min(Math.max(distanceY * 0.2, -20), 20))
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }
  
  return (
    <motion.button
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
    >
      {children}
    </motion.button>
  )
}
```

**Effort:** 3-4 hours (create component + integrate)  
**Impact:** Makes every interaction memorable

---

#### 1.3 **Animated Cart Counter**
**What:** Cart number pulses/scales on add, with elastic bounce animation.

**Why:** Provides satisfying feedback, encourages add-to-cart actions.

**Implementation:**
```jsx
// In Navbar.jsx (replace static count)
{cartCount > 0 && (
  <motion.span 
    className="navbar__cart-count"
    key={cartCount} // Re-trigger animation on change
    initial={{ scale: 0 }}
    animate={{ 
      scale: [0, 1.3, 1],
      rotate: [0, 5, -5, 0]
    }}
    transition={{ 
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1] // Elastic easing
    }}
  >
    {cartCount}
  </motion.span>
)}
```

**Effort:** 30 minutes  
**Impact:** Micro-delight on every add-to-cart

---

#### 1.4 **Gradient Text Hover Effects**
**What:** Main headings/CTAs reveal gradient on hover with smooth transition.

**Why:** Adds visual interest without overwhelming. Signals interactivity.

**Implementation:**
```css
/* Gradient text on hover */
.gradient-text-hover {
  background: linear-gradient(90deg, #000 0%, #000 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: background 0.6s ease;
}

.gradient-text-hover:hover {
  background: linear-gradient(
    90deg, 
    #666 0%, 
    #999 25%, 
    #fff 50%, 
    #999 75%, 
    #666 100%
  );
  background-size: 200% auto;
  animation: gradient-slide 3s ease infinite;
}

@keyframes gradient-slide {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

**Apply to:**
- `.hero__title`
- `.product-card__name:hover`
- Navigation links on hover

**Effort:** 1 hour  
**Impact:** Subtle premium feel

---

#### 1.5 **Smooth Page Transitions**
**What:** Crossfade between routes with slight scale effect.

**Why:** Eliminates jarring page switches, signals SPA polish.

**Implementation:**
```jsx
// AnimatedRoutes.jsx
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const pageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.02 }
}

const pageTransition = {
  duration: 0.4,
  ease: [0.43, 0.13, 0.23, 0.96]
}

export default function AnimatedRoutes({ children }) {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

**Effort:** 2 hours  
**Impact:** Polished, cohesive site feel

---

### 🎨 TIER 2: HIGH IMPACT, MODERATE EFFORT (Week 2)

#### 2.1 **3D Product Card Tilt (Mouse Parallax)**
**What:** Product cards tilt toward mouse cursor with parallax layers (image, text, shadows).

**Why:** Creates depth and tactile feel. Instagram-worthy moments. Used by Apple product pages.

**Implementation:**
```jsx
// ProductCard3D.jsx
import { useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

export default function ProductCard3D({ product }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useTransform(y, [-100, 100], [5, -5])
  const rotateY = useTransform(x, [-100, 100], [-5, 5])
  
  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }
  
  return (
    <motion.div
      ref={ref}
      className="product-card-3d"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div 
        className="product-card-3d__image"
        style={{ translateZ: 20 }}
      >
        <img src={product.image} alt={product.name} />
      </motion.div>
      
      <motion.div 
        className="product-card-3d__info"
        style={{ translateZ: 40 }}
      >
        <h3>{product.name}</h3>
        <p>${product.price}</p>
      </motion.div>
    </motion.div>
  )
}
```

**CSS:**
```css
.product-card-3d {
  perspective: 1000px;
  transform-style: preserve-3d;
}

.product-card-3d__image,
.product-card-3d__info {
  transform-style: preserve-3d;
}
```

**Effort:** 5-6 hours  
**Impact:** Signature "wow" interaction

---

#### 2.2 **Smooth Scroll Reveals (Staggered Fade-Ins)**
**What:** Elements fade in + slide up as user scrolls, with staggered delays for children.

**Why:** Guides eye naturally, feels premium vs. instant load. Used by luxury brands.

**Implementation:**
```jsx
// ScrollReveal.jsx
import { motion } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  })
}

export default function ScrollReveal({ children, index = 0 }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
    >
      {children}
    </motion.div>
  )
}
```

**Apply to:**
- Product grid items
- About page sections
- Footer sections

**Effort:** 3 hours  
**Impact:** Polished, guided browsing

---

#### 2.3 **Image Parallax (Scroll-Based)**
**What:** Background images scroll at different speeds than foreground (0.5x slower).

**Why:** Creates depth and cinematic feel. Used by high-end portfolio sites.

**Implementation:**
```jsx
// ParallaxImage.jsx
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxImage({ src, speed = 0.5 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])
  
  return (
    <div ref={ref} className="parallax-container">
      <motion.img
        src={src}
        style={{ y }}
        className="parallax-image"
      />
    </div>
  )
}
```

**CSS:**
```css
.parallax-container {
  overflow: hidden;
  position: relative;
  height: 500px;
}

.parallax-image {
  position: absolute;
  width: 100%;
  height: 120%;
  object-fit: cover;
  will-change: transform;
}
```

**Apply to:**
- Hero château image
- About page editorial images
- Collection banners

**Effort:** 4 hours  
**Impact:** Cinematic browsing

---

#### 2.4 **Glassmorphism Panels**
**What:** Frosted glass effect for modals, cart overlay, quick view, search.

**Why:** Modern, premium feel. Separates UI layers elegantly.

**Implementation:**
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Dark variant */
.glass-panel--dark {
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
```

**Apply to:**
- `.cart` (cart overlay)
- `.product-quick-view` (modal)
- `.search-bar` (search overlay)
- `.navbar__menu` (hamburger menu)

**Effort:** 2 hours  
**Impact:** Modern, layered UI

---

#### 2.5 **Staggered Grid Layout (Asymmetric)**
**What:** Product grid with varied card sizes (1x1, 1x2, 2x1) and Pinterest-style masonry.

**Why:** Breaks monotony, creates editorial magazine feel. Used by high-end fashion brands.

**Implementation:**
```css
/* Replace uniform grid with asymmetric */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-flow: dense;
  gap: 2rem;
}

/* Featured products (bigger) */
.product-card--featured {
  grid-column: span 2;
  grid-row: span 2;
}

/* Horizontal cards */
.product-card--wide {
  grid-column: span 2;
}

/* Vertical cards */
.product-card--tall {
  grid-row: span 2;
}
```

**Logic:**
```jsx
// Assign random/curated sizes
const getCardSize = (index) => {
  if (index % 7 === 0) return 'featured' // Every 7th = 2x2
  if (index % 5 === 0) return 'wide'     // Every 5th = 2x1
  if (index % 3 === 0) return 'tall'     // Every 3rd = 1x2
  return 'default' // 1x1
}
```

**Effort:** 4 hours  
**Impact:** Editorial, magazine-like feel

---

### 🎨 TIER 3: POLISH & DETAILS (Week 3-4)

#### 3.1 **Hover Sound Effects (Optional)**
**What:** Subtle "click" or "whoosh" on button hovers/clicks.

**Why:** Haptic-like feedback without vibration. Used by luxury apps.

**Implementation:**
```jsx
// soundEffects.js
const hoverSound = new Audio('/sounds/hover.mp3') // 50ms, subtle
const clickSound = new Audio('/sounds/click.mp3') // 100ms, satisfying

export const playHover = () => {
  hoverSound.currentTime = 0
  hoverSound.volume = 0.2
  hoverSound.play().catch(() => {}) // Ignore autoplay blocks
}

export const playClick = () => {
  clickSound.currentTime = 0
  clickSound.volume = 0.3
  clickSound.play().catch(() => {})
}

// In button component
<button 
  onMouseEnter={playHover}
  onClick={playClick}
>
```

**Effort:** 2 hours (+ sound design)  
**Impact:** Subtle premium polish

---

#### 3.2 **Loading State Personality**
**What:** Custom loader with brand château silhouette or animated "M" logo.

**Why:** Even waiting feels on-brand.

**Implementation:**
```jsx
// ChateauLoader.jsx
export default function ChateauLoader() {
  return (
    <div className="chateau-loader">
      <motion.svg
        viewBox="0 0 100 100"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {/* Simplified château silhouette */}
        <path d="M50,10 L60,30 L70,20 L80,40 L90,30 L90,90 L10,90 L10,30 L20,40 L30,20 L40,30 Z" />
      </motion.svg>
      <p>Loading...</p>
    </div>
  )
}
```

**Effort:** 3 hours  
**Impact:** Brand consistency

---

#### 3.3 **Easter Eggs for Engaged Users**
**What:** 
- Konami code → Unlock secret discount
- Click château logo 5x → Hidden collection
- Hover all products → Badge unlock

**Why:** Rewards exploration, creates viral moments.

**Implementation:**
```jsx
// useKonamiCode.js
import { useEffect, useState } from 'react'

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
]

export default function useKonamiCode() {
  const [unlocked, setUnlocked] = useState(false)
  const [keys, setKeys] = useState([])
  
  useEffect(() => {
    const handleKey = (e) => {
      const newKeys = [...keys, e.key].slice(-10)
      setKeys(newKeys)
      
      if (newKeys.join(',') === KONAMI_CODE.join(',')) {
        setUnlocked(true)
        // Show secret modal
      }
    }
    
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [keys])
  
  return unlocked
}
```

**Effort:** 4 hours  
**Impact:** Viral potential, loyalty

---

## 📐 VISUAL MOCKUPS

### Homepage: Before vs. After

#### **BEFORE (Current):**
```
┌─────────────────────────────────────────────────┐
│ [CHÂTEAU IMAGE - STATIC]                        │
│                                                 │
│         MONTRÉZ                                 │
│    [ ENTER ] (flat button)                      │
│                                                 │
└─────────────────────────────────────────────────┘
│ [=] MONTRÉZ                    [🔍] [🛒]        │ ← Static navbar
└─────────────────────────────────────────────────┘
│ HERO SECTION                                    │
│ "PAS POUR TOUT LE MONDE" (static text)         │
│ [ENTER COLLECTION] [DISCOVER MONTRÉZ]          │
│                                                 │
└─────────────────────────────────────────────────┘
│ PRODUCTS (uniform grid)                         │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐               │
│ │     │ │     │ │     │ │     │               │
│ └─────┘ └─────┘ └─────┘ └─────┘               │
│ (basic hover: y: -5px)                          │
└─────────────────────────────────────────────────┘
```

#### **AFTER (Proposed):**
```
┌─────────────────────────────────────────────────┐
│ [CHÂTEAU IMAGE - PARALLAX, SLOWER SCROLL]       │
│    ◯ ← Custom cursor (40px, blend mode)        │
│         M O N T R É Z                           │
│    Gradient shimmer on hover →                  │
│    [MAGNETIC BUTTON] (follows cursor)           │
│                                                 │
└─────────────────────────────────────────────────┘
│ [=] 🏰 MONTRÉZ              [🔍] [🛒③]          │ ← Glass navbar
│    ↑ Magnetic hamburger    ↑ Animated count    │
└─────────────────────────────────────────────────┘
│ HERO SECTION (fade-in stagger)                  │
│ "PAS POUR TOUT LE MONDE"                        │
│  ↑ Gradient text on hover                       │
│ [MAGNETIC CTA] [MAGNETIC CTA]                   │
│    Buttons pull toward cursor                   │
└─────────────────────────────────────────────────┘
│ PRODUCTS (asymmetric masonry)                   │
│ ┌───────┐ ┌─────┐ ┌─────┐                      │
│ │ FEAT  │ │ TALL│ │     │ ← 3D tilt on hover   │
│ │ 2x2   │ │     │ └─────┘                      │
│ │       │ │     │ ┌──────────┐                 │
│ └───────┘ └─────┘ │ WIDE 2x1 │                 │
│                    └──────────┘                 │
│ (scroll reveal fade-in, staggered)              │
└─────────────────────────────────────────────────┘
```

---

### Product Card: Before vs. After

#### **BEFORE:**
```
┌──────────────┐
│              │
│   [IMAGE]    │
│              │
└──────────────┘
  Product Name
  $199 USD
  
On Hover:
  - Moves up 5px
  - Image scales 1.05x
```

#### **AFTER:**
```
┌──────────────┐  ← Card tilts toward cursor
│              │     (rotateX/Y based on mouse)
│   [IMAGE]    │
│   (layer 1)  │  ← Image moves at different depth
│              │
│  [QUICK VIEW]│  ← Button layer (translateZ: 40px)
└──────────────┘
  Product Name   ← Text layer (translateZ: 20px)
  $199 USD
  
On Hover:
  - 3D tilt (5° rotation)
  - Parallax depth layers
  - Gradient overlay
  - Magnetic pull to cursor
  - Smooth shadow shift
```

---

### Shop Page Interactions

#### **Filter Sidebar:**
```
BEFORE:
┌─────────────┐
│ Filters     │
│ □ Category  │
│ □ Size      │
│ □ Price     │
└─────────────┘

AFTER:
┌──────────────┐  ← Glassmorphism panel
│  Filters  🎯 │
│  ┌────────┐  │  ← Magnetic checkboxes
│  │✓ T-Shirts│
│  └────────┘  │
│  Size: S M L │  ← Animated size buttons
│  [$50-$500]  │  ← Smooth range slider
└──────────────┘
   ↑ Blur backdrop
```

#### **Product Grid:**
```
BEFORE: 4 equal columns, uniform spacing

AFTER: Masonry layout
┌──────┐ ┌────┐ ┌────┐
│ FEAT │ │    │ │    │  ← Varied sizes
│ 2x2  │ └────┘ │    │
│      │ ┌────┐ │    │  ← Asymmetric gaps
└──────┘ │    │ └────┘
┌─────────────┐ ┌────┐  ← Horizontal cards
│   WIDE 2x1  │ │    │
└─────────────┘ └────┘
```

---

## 🗓️ IMPLEMENTATION ROADMAP

### **Phase 1: Quick Wins** (Week 1, ~20 hours)
**Goal:** Immediate "cool" factor boost

| Feature | Effort | Impact | Priority |
|---------|--------|--------|----------|
| Custom Luxury Cursor | 3h | 🔥🔥🔥 | P0 |
| Magnetic Buttons | 4h | 🔥🔥🔥 | P0 |
| Animated Cart Counter | 0.5h | 🔥🔥 | P0 |
| Gradient Text Hovers | 1h | 🔥🔥 | P1 |
| Page Transitions | 2h | 🔥🔥🔥 | P0 |
| Glassmorphism (Cart/Search) | 2h | 🔥🔥 | P1 |

**Deliverables:**
- Custom cursor working site-wide
- All CTAs are magnetic
- Cart counter animates on add
- Smooth crossfades between pages
- Glass effect on overlays

**Testing:**
- Desktop: Chrome, Safari, Firefox
- Mobile: Touch interactions (cursor disabled)
- Performance: 60fps maintained

---

### **Phase 2: Depth & Interaction** (Week 2, ~25 hours)
**Goal:** Memorable interactions and visual depth

| Feature | Effort | Impact | Priority |
|---------|--------|--------|----------|
| 3D Product Card Tilt | 6h | 🔥🔥🔥 | P0 |
| Scroll Reveals (Staggered) | 3h | 🔥🔥 | P1 |
| Image Parallax | 4h | 🔥🔥 | P1 |
| Staggered Grid Layout | 4h | 🔥🔥🔥 | P0 |
| Hover Sound Effects | 2h | 🔥 | P2 |

**Deliverables:**
- Product cards have 3D tilt effect
- Homepage/About images scroll at different speeds
- Products appear with staggered fade-ins
- Grid layout is asymmetric/editorial

**Testing:**
- 3D tilt works across browsers
- Parallax performs on mobile (disable if <60fps)