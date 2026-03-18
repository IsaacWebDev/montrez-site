# MONTREZ UI IMPROVEMENTS - DETAILED MOCKUPS

## Overview
This document details specific UI improvements over the original montrezofficial.com site, focusing on **better product presentation, sleeker navigation, enhanced interactivity, and a more cinematic feel**.

---

## Current Site Issues (montrezofficial.com)

### Problems Identified:
1. ❌ **Too plain/basic** - Generic e-commerce template feel
2. ❌ **No mobile hamburger menu** - Poor mobile UX
3. ❌ **Lacks brand mystique** - Doesn't convey exclusivity
4. ❌ **No entrance experience** - Immediate access, no build-up
5. ❌ **Generic product grid** - No hover effects, basic layout
6. ❌ **Poor imagery treatment** - Inconsistent B&W application
7. ❌ **Weak typography hierarchy** - Not enough contrast
8. ❌ **No animations** - Static, lifeless feel

---

## IMPROVEMENT 1: Cinematic Entrance Flow

### Landing Page (NEW)
**Visual:** Full-screen gate image with logo overlay

```
┌─────────────────────────────────────┐
│                                     │
│         [Gate Image - B&W]          │
│                                     │
│         ┌─────────────┐             │
│         │   MONTREZ   │             │
│         │   [Logo]    │             │
│         │  3 stars    │             │
│         │   château   │             │
│         └─────────────┘             │
│                                     │
│         [ENTER Button]              │
│         White, centered             │
│                                     │
└─────────────────────────────────────┘
```

**Specs:**
- Full viewport height
- B&W high-contrast gate image (file_421)
- Logo overlaid center-top (256px)
- "ENTER" button center-bottom (btn-primary btn-lg)
- Cinematic fade-in animation (600ms)
- No navigation visible

**Code Example:**
```html
<section class="landing-page">
  <div class="landing-background effect-film-grain filter-bw-editorial">
    <img src="/images/gate.jpg" alt="Château Gate" />
  </div>
  <div class="landing-content">
    <img src="/images/logo/montrez-logo-256.png" alt="MONTREZ" class="landing-logo animate-fade-in" />
    <button class="btn btn-primary btn-lg animate-slide-up">ENTER</button>
  </div>
</section>
```

### Password/Email Modal (NEW)
**Visual:** Clean, minimal modal with two sections

```
┌─────────────────────────────────────┐
│  ╔═══════════════════════════════╗  │
│  ║         ENTER                 ║  │
│  ║                               ║  │
│  ║   RETURNING                   ║  │
│  ║   [Password _________]        ║  │
│  ║   [ENTER Button]              ║  │
│  ║                               ║  │
│  ║   ───────────────────         ║  │
│  ║                               ║  │
│  ║   NEW                         ║  │
│  ║   [Email _________]           ║  │
│  ║   [GET CODE Button]           ║  │
│  ║                               ║  │
│  ╚═══════════════════════════════╝  │
└─────────────────────────────────────┘
```

**Specs:**
- Black background (95% opacity)
- White border, subtle glow
- Minimal inputs (bottom-border only)
- Two sections: Returning (password) & New (email)
- Centered, max-width 400px
- Smooth fade-in (400ms)

### Video Intro (EXISTING - ENHANCED)
**Improvements:**
- Skip button appears after 2s (btn-minimal, top-right)
- Fade-in animation
- Progress bar at bottom (chrome)
- Auto-advance after 5s

---

## IMPROVEMENT 2: Enhanced Navigation

### Mobile Hamburger Menu (NEW)

#### Closed State
```
┌─────────────────────────────────────┐
│ [☰]  [MONTREZ Logo]  [🔍 👤 🛒]   │
└─────────────────────────────────────┘
```

#### Open State
```
┌─────────────────────────────────────┐
│                                     │
│           HOME                      │
│           SHOP                      │
│           ABOUT                     │
│           CONTACT                   │
│                                     │
│         [Social Icons]              │
│                                     │
└─────────────────────────────────────┘
```

**Specs:**
- Hamburger icon: 28px wide, 2px lines, 5px gap
- Hover: Chrome color
- Open animation: X-shape transformation (300ms)
- Full-screen overlay: Black 95% opacity, blur 12px
- Links: Display serif, 48.83px, center-aligned
- Chrome underline on hover (expands from center)

**Code Example:**
```html
<nav class="nav">
  <div class="nav-container">
    <button class="hamburger" onclick="toggleMenu()">
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>
    
    <img src="/images/logo/montrez-logo-128.png" alt="MONTREZ" class="nav-logo" />
    
    <div class="nav-actions">
      <button class="btn-icon">🔍</button>
      <button class="btn-icon">👤</button>
      <button class="btn-icon">🛒</button>
    </div>
  </div>
</nav>

<div class="menu-overlay" id="menu">
  <a href="/" class="menu-link">HOME</a>
  <a href="/shop" class="menu-link">SHOP</a>
  <a href="/about" class="menu-link">ABOUT</a>
  <a href="/contact" class="menu-link">CONTACT</a>
</div>
```

### Desktop Navigation (ENHANCED)
**Improvements over original:**
- Fixed position (stays on scroll)
- Backdrop blur (8px)
- Subtle bottom border (white 10% opacity)
- Logo scales on hover (105%)
- Search icon opens elegant search bar (slides down)

---

## IMPROVEMENT 3: Better Product Grid

### Before (Original Site):
- Basic grid, no hover effects
- Generic spacing
- Inconsistent image treatment
- No loading states

### After (Our Site):

#### Product Card Hover Sequence
```
DEFAULT STATE:
┌─────────────────┐
│                 │
│                 │
│  [Product Img]  │
│   Grayscale     │
│                 │
│                 │
│  PRODUCT NAME   │
│  $X,XXX USD     │
└─────────────────┘

HOVER STATE:
┌─────────────────┐
│    [SOLD OUT]   │ ← Badge (if applicable)
│                 │
│  [Product Img]  │ ← Scales 105%
│   + Overlay     │ ← Dark gradient
│                 │
│   [VIEW BTN]    │ ← Appears
│                 │
│  PRODUCT NAME   │ ← Lifts 4px
│  $X,XXX USD     │
└─────────────────┘
```

**Specs:**
- Default: Grayscale filter (100%), contrast 1.1
- Hover: Image scales 105%, overlay fades in (0→1, 400ms)
- Entire card lifts 4px
- "VIEW" button fades in center-bottom
- Smooth cubic-bezier easing
- Chrome color on price hover

**Code Example:**
```html
<div class="card-product">
  <div class="card-product-image">
    <img src="/images/products/architect-hoodie.jpg" alt="Architect Zip Hoodie" />
    <span class="badge-sold-out">SOLD OUT</span>
    <div class="card-product-overlay">
      <button class="btn btn-primary">VIEW</button>
    </div>
  </div>
  <div class="card-product-info">
    <h3 class="card-product-name">ARCHITECT ZIP HOODIE</h3>
    <p class="card-product-price">$1,500 USD</p>
  </div>
</div>
```

### Grid Layout (IMPROVED)
```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px; /* Wider gap than original */
  padding: 64px 24px;
}

/* Mobile: 1 column */
@media (max-width: 767px) {
  .product-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}

/* Tablet: 2 columns */
@media (min-width: 768px) and (max-width: 1023px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 3-4 columns */
@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

---

## IMPROVEMENT 4: Enhanced Product Page

### Hero Section (IMPROVED)
```
┌───────────────────────────────────────────────────┐
│  ┌─────────────────┐  │  ARCHITECT ZIP HOODIE   │
│  │                 │  │  $1,500 USD              │
│  │                 │  │                          │
│  │  Main Image     │  │  Black oversized hoodie  │
│  │  (Large)        │  │  with studded hood...    │
│  │                 │  │                          │
│  │                 │  │  SIZE: [S][M][L][XL]     │
│  └─────────────────┘  │                          │
│                       │  [ADD TO CART]           │
│  [Thumb][Thumb][...]  │  [SOLD OUT]              │
└───────────────────────────────────────────────────┘
```

**Improvements:**
- Larger main image (60% width on desktop)
- Thumbnail gallery below (horizontal scroll on mobile)
- Sticky product info on desktop (stays visible on scroll)
- Size selector: minimal buttons, white border, chrome fill on selection
- Clear "SOLD OUT" state (disabled, 40% opacity)

### Image Gallery (ENHANCED)
**Features:**
- Zoom on hover (cursor: zoom-in)
- Click to open fullscreen lightbox
- Swipe gestures on mobile
- B&W editorial filter applied
- Film grain effect on hover

---

## IMPROVEMENT 5: Improved Typography Hierarchy

### Before (Original):
- All headings similar size
- Poor contrast between heading levels
- Not enough whitespace

### After (Our Site):

#### Homepage
```
MONTREZ                    ← Hero (76.29px, bold serif, uppercase)
Pas pour Tout              ← Script (39px, cursive)

NEW ARRIVALS               ← Section (61.04px, bold serif)
  ARCHITECT ZIP HOODIE     ← Product (12.8px, medium sans, uppercase)
  $1,500 USD               ← Price (16px, regular sans)

ABOUT                      ← Section (61.04px, bold serif)
  European luxury...       ← Body (16px, regular sans)
```

**Ratios:**
- Hero : Section = 1.25:1
- Section : Product = 4.8:1
- Product : Body = 0.8:1

**Spacing:**
- Section padding: 96px (desktop), 48px (mobile)
- Component gap: 64px
- Line-height: 1.1 (headings), 1.5 (body)

---

## IMPROVEMENT 6: Smoother Transitions & Animations

### Page Load Sequence
```
1. Background fades in (0ms - 600ms)
2. Logo scales in (300ms - 900ms)
3. Heading slides up (600ms - 1200ms)
4. Content fades in (900ms - 1500ms)
```

**Staggered Product Grid:**
```css
.card-product:nth-child(1) { animation-delay: 0ms; }
.card-product:nth-child(2) { animation-delay: 100ms; }
.card-product:nth-child(3) { animation-delay: 200ms; }
/* etc. */
```

### Hover Transitions
| Element | Property | Duration | Easing |
|---------|----------|----------|--------|
| Button | background, transform | 300ms | ease-in-out |
| Card | transform, border | 400ms | ease-in-out |
| Image | transform, filter | 600ms | ease-in-out |
| Overlay | opacity | 400ms | ease-out |
| Underline | width | 400ms | ease-in-out |

### Micro-interactions
- **Cart icon:** Bounce on item add (200ms, ease-bounce)
- **Heart icon:** Scale on like (300ms, ease-out)
- **Price:** Color shift to chrome on hover (300ms)
- **Input focus:** Border expands + glow (300ms)

---

## IMPROVEMENT 7: More Cinematic Feel

### Homepage Hero (ENHANCED)
```
┌─────────────────────────────────────────────────┐
│                                                 │
│         [Full-screen editorial image]          │
│              B&W, film grain                    │
│           Slow zoom (10s loop)                  │
│                                                 │
│              MONTREZ                            │
│            Pas pour Tout                        │
│           [DISCOVER]                            │
│                                                 │
│         Scroll indicator (animated)             │
│                ↓                                │
└─────────────────────────────────────────────────┘
```

**Effects:**
- Background: Slow zoom (scale 1.0 → 1.05 over 10s, loop)
- Film grain overlay (40% opacity, mix-blend: overlay)
- Vignette edges (radial gradient)
- Parallax scroll (background moves slower than content)

**Code Example:**
```css
.hero-image {
  animation: cinematicZoom 10s ease-in-out infinite alternate;
  filter: grayscale(100%) contrast(1.15) brightness(0.95);
}

.hero-image::after {
  /* Film grain */
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('data:image/svg+xml...');
  opacity: 0.4;
  mix-blend-mode: overlay;
  pointer-events: none;
}

.hero-image::before {
  /* Vignette */
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, transparent 40%, black 100%);
  opacity: 0.3;
  pointer-events: none;
}
```

### About Page (CINEMATIC)
```
┌─────────────────────────────────────────────────┐
│  [Large editorial image - faceless model]       │
│         Parallax background                     │
└─────────────────────────────────────────────────┘
│                                                 │
│         "NOT FOR EVERYONE"                      │
│                                                 │
│  European luxury streetwear born from           │
│  French aristocratic heritage...                │
│                                                 │
│  [Château engraving illustration]               │
│                                                 │
│         Pas pour Tout                           │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Features:**
- Large hero image (100vh)
- Parallax scroll (background moves 0.5x content speed)
- Content overlays image at bottom (gradient fade)
- Full-width château illustration (centered)
- Script tagline at end

---

## IMPROVEMENT 8: Better Mobile Experience

### Mobile Optimizations

#### Touch Targets
- Minimum 44x44px for all tappable elements
- Increased button padding on mobile (20px vs 16px)
- Larger hamburger icon (32px vs 28px)

#### Mobile-Specific Layouts
```
DESKTOP (>768px):
[Nav: Hamburger | Logo | Icons]
[Hero: Full-screen]
[Products: 3-4 columns]
[Footer: 4 columns]

MOBILE (<768px):
[Nav: Hamburger | Logo | Cart]
[Hero: Full-screen, adjusted text size]
[Products: 1 column, larger cards]
[Footer: 1 column, stacked]
```

#### Mobile Navigation
- Swipe right to open menu (gesture support)
- Swipe left to close
- Backdrop click to close
- Links larger (48.83px → 61.04px on mobile)

#### Mobile Product Grid
- 1 column, full-width cards
- Larger product images (100% width, 4:3 ratio)
- Tap to view (no hover state)
- "VIEW" button always visible on mobile

---

## IMPROVEMENT 9: Loading States & Skeletons

### Product Grid Loading
```
┌─────────────────┐
│                 │
│  ░░░░░░░░░░░    │  ← Skeleton (animated shimmer)
│  ░░░░░░░░░░░    │
│  ░░░░░░░░░░░    │
│                 │
│  ░░░░░░░        │  ← Name skeleton
│  ░░░            │  ← Price skeleton
└─────────────────┘
```

**Specs:**
- Chrome shimmer effect (200% width, animated)
- Maintains aspect ratio (no layout shift)
- Fades to actual content (300ms)

### Image Loading
- Blurred low-res placeholder (progressive load)
- Fade-in once loaded (600ms)
- Retry button on error

---

## IMPROVEMENT 10: Accessibility Enhancements

### Keyboard Navigation
- Tab order: Logo → Hamburger → Search → Account → Cart
- Focus visible: 2px white outline, 2px offset
- Escape to close modals/menus
- Arrow keys to navigate product grid

### Screen Reader Improvements
```html
<nav aria-label="Main navigation">
  <button 
    class="hamburger" 
    aria-label="Toggle menu"
    aria-expanded="false"
    aria-controls="menu-overlay"
  >
    <!-- Icon -->
  </button>
</nav>

<div 
  class="menu-overlay" 
  id="menu-overlay"
  role="dialog"
  aria-modal="true"
>
  <!-- Menu items -->
</div>

<img 
  src="/images/products/hoodie.jpg" 
  alt="Montrez Architect Zip Hoodie - Black oversized hoodie with studded hood and embroidered logo"
/>
```

### ARIA Labels
- All interactive elements have labels
- Product cards announce: "Product name, price, availability status"
- Form inputs have visible labels or aria-label
- Status messages use aria-live regions

---

## Component Comparison: Before vs. After

### Product Card

#### BEFORE (Original)
```
┌─────────────┐
│             │
│   [Image]   │  ← No hover effect
│             │
│ Product     │  ← Small text
│ $XXX        │  ← Generic
└─────────────┘
```

#### AFTER (Our Site)
```
┌─────────────┐
│  [SOLD OUT] │  ← Badge
│   ╭─────╮   │
│   │     │   │  ← Image scales, overlay
│   │[VIEW]│  │  ← Button appears
│   ╰─────╯   │
│ PRODUCT     │  ← Larger, bolder
│ $XXX USD    │  ← Chrome on hover
└─────────────┘  ← Card lifts 4px
```

### Navigation

#### BEFORE (Original)
- Desktop: Full nav always visible
- Mobile: Collapsed, but no hamburger
- No animations
- Basic styling

#### AFTER (Our Site)
- Desktop: Fixed, backdrop blur, logo hover scale
- Mobile: Elegant hamburger → full-screen overlay
- Smooth animations (300-400ms)
- Chrome accent on hover
- Search icon slides down search bar

---

## Implementation Priority

### Phase 1: Core Improvements (Week 1)
1. ✅ Logo processing (DONE)
2. ✅ Design system CSS (DONE)
3. ⏳ Navigation with hamburger menu
4. ⏳ Enhanced product cards
5. ⏳ Button/input components

### Phase 2: Entrance Flow (Week 1)
6. ⏳ Landing page
7. ⏳ Password/email modal
8. ⏳ Video intro integration
9. ⏳ Session state

### Phase 3: Pages & Content (Week 2)
10. ⏳ Homepage hero (cinematic)
11. ⏳ Product grid (improved layout)
12. ⏳ Product detail pages
13. ⏳ About page (editorial)

### Phase 4: Polish (Week 2)
14. ⏳ Animations (staggered loads)
15. ⏳ Loading states
16. ⏳ Mobile optimizations
17. ⏳ Accessibility audit

---

## Visual Design Checklist

Before launching any page/component, verify:

- [ ] Uses ONLY black, white, chrome colors
- [ ] Typography follows hierarchy (display serif / body sans)
- [ ] Images are B&W or heavily desaturated
- [ ] Hover states are smooth (300-600ms)
- [ ] Spacing uses design system scale (4px base)
- [ ] Mobile layout is optimized (1 column, larger touch targets)
- [ ] All interactive elements have focus states
- [ ] Loading states are implemented
- [ ] Film grain / vignette applied to hero images
- [ ] Animations are subtle and elegant
- [ ] Copy is minimal and direct
- [ ] Feels exclusive, mysterious, European luxury

---

**UI Improvements Status:** ✅ DOCUMENTED  
**Ready for Implementation:** ✅ YES  
**Next Step:** Frontend agent to build components using design-system.css
