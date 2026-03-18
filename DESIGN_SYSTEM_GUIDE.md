# MONTREZ DESIGN SYSTEM - IMPLEMENTATION GUIDE

## Overview
This design system captures the essence of Montrez: **European luxury streetwear with French aristocratic heritage and contemporary edge**. The aesthetic balances minimal, high-impact design with mystery and exclusivity.

---

## Brand Aesthetic Pillars

### 1. **European Old-Money Heritage**
- Classical French château iconography
- Engraving-style illustration (fine line, cross-hatch, stipple)
- High-contrast serif typography (Bodoni/Didot influence)
- Three-star prestige motif

### 2. **Contemporary Streetwear Edge**
- Oversized silhouettes
- Anonymous/faceless model photography
- Industrial/minimal settings
- Luxury prop styling (Mercedes, leather)

### 3. **Exclusivity & Mystery**
- "Pas pour Tout" (Not for Everyone) tagline
- Faceless subjects in photography
- Dark, moody lighting
- Password-gated access

### 4. **Minimal B&W Palette**
- Strictly Black, White, Chrome/Silver
- NO gold accents
- High contrast throughout
- Desaturated or full B&W photography

---

## Logo System

### Primary Logo (Full Mark)
**File:** `public/images/logo/montrez-logo-512.png`

**Components:**
- 3 stars (arranged in pyramid, prestige symbol)
- Château de Chambord engraving (central icon)
- Water reflection (symmetry, gravitas)
- "MONTREZ" wordmark (bold serif, all-caps)

**Usage:**
- Homepage hero
- Navigation center
- Email signatures
- Print materials

**Clear Space:** Minimum clear space = height of one star on all sides

**Sizes Available:**
- 512x512 (high-res web, print)
- 256x256 (social avatars, favicons)
- 128x128 (UI elements)
- 64x64 (tiny UI elements)

### Secondary Logo (Oval Badge)
**Description:** Chrome-treated oval emblem variant seen on garment back graphics

**Usage:**
- Garment labels
- Product tags
- Social media watermarks
- App icons

**Note:** This variant needs to be created from product photography or separate asset

### Monogram ("M")
**Description:** Gothic/decorative script "M" used as tertiary mark

**Usage:**
- Chest embroidery
- Small branding accents
- Loading animations
- Minimal contexts

---

## Color System

### Primary Palette
```css
--color-black: #000000
--color-white: #FFFFFF
--color-chrome: #C0C0C0
```

### Extended Palette
```css
--color-off-white: #F8F5F0    /* Warm cream for softer backgrounds */
--color-charcoal: #1A1A1A     /* Cards, secondary surfaces */
--color-steel: #8B8B8B        /* Borders, dividers */
--color-dark-chrome: #A0A0A0  /* Hover states */
```

### Functional Usage
| Element | Color | Variable |
|---------|-------|----------|
| Page background | Black | `--color-background` |
| Primary text | White | `--color-foreground` |
| Accent/hover | Chrome | `--color-accent` |
| Muted text | Steel | `--color-muted` |
| Product prices | Chrome | `--color-chrome` |
| Badges | White bg, Black text | — |

### Color Rules
- ✅ **DO:** Use pure black (#000) for backgrounds
- ✅ **DO:** Use white text on black backgrounds
- ✅ **DO:** Use chrome for subtle accents and hover states
- ❌ **DON'T:** Use gold or warm metallics
- ❌ **DON'T:** Use gradients (except chrome shimmer effect)
- ❌ **DON'T:** Use bright colors

---

## Typography System

### Font Stack

#### Display (Headings, Logo Text)
**Primary:** Playfair Display, Bodoni Moda, Didot  
**Fallback:** Serif

**Characteristics:**
- High contrast (thick/thin strokes)
- Elegant bracketed serifs
- Classic luxury feel
- Use for all headings, product names, navigation

#### Body (Paragraphs, UI)
**Primary:** Inter  
**Fallback:** System UI stack (-apple-system, BlinkMacSystemFont, 'Segoe UI')

**Characteristics:**
- Clean, modern sans-serif
- Excellent readability
- Neutral, doesn't compete with display type

#### Script (Accents)
**Primary:** Allura, Great Vibes  
**Fallback:** Cursive

**Characteristics:**
- Elegant cursive
- Use sparingly for "Pas pour Tout" and sleeve embroidery text
- Not for body copy

### Type Scale (Major Third: 1.250)
```
Hero:      76.29px (4.768rem)
H1:        61.04px (3.815rem)
H2:        48.83px (3.052rem)
H3:        39.00px (2.441rem)
Large:     31.25px (1.953rem)
XL:        25.00px (1.563rem)
Base:      16.00px (1rem)
Small:     12.80px (0.8rem)
XS:        10.24px (0.64rem)
```

### Typography Classes

#### Headings
```html
<h1 class="heading-hero">MONTREZ</h1>
<!-- 76.29px, bold, uppercase, tight tracking -->

<h1 class="heading-1">NEW COLLECTION</h1>
<!-- 61.04px, bold, uppercase -->

<h2 class="heading-2">Archive Jacket</h2>
<!-- 48.83px, semibold, normal case -->

<h3 class="heading-3">Product Details</h3>
<!-- 39px, semibold, wide tracking -->
```

#### Body Text
```html
<p class="body-large">Featured product description</p>
<!-- 25px, regular, relaxed line-height -->

<p class="body-base">Standard paragraph text</p>
<!-- 16px, regular, 1.5 line-height -->

<p class="body-small">Fine print, captions</p>
<!-- 12.8px, regular, wide tracking -->
```

#### Labels
```html
<span class="label-large">SHOP NOW</span>
<!-- 16px, medium, uppercase, widest tracking -->

<span class="label-small">SOLD OUT</span>
<!-- 12.8px, medium, uppercase, widest tracking -->
```

#### Accent
```html
<span class="accent-script">Pas pour Tout</span>
<!-- 39px, script font, normal tracking -->
```

### Typography Rules
- ✅ **DO:** Use display serif for all headings and product names
- ✅ **DO:** Use uppercase for navigation, buttons, labels
- ✅ **DO:** Use wide letter-spacing (tracking) on uppercase text
- ✅ **DO:** Use tight line-height on headings (1.1-1.3)
- ❌ **DON'T:** Use script font for body copy
- ❌ **DON'T:** Mix multiple font families in one component

---

## Spacing System

### Scale (Base 4px)
```
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  24px
--space-6:  32px
--space-8:  48px
--space-10: 64px
--space-12: 96px
--space-16: 128px
--space-20: 160px
```

### Usage Guidelines
| Context | Mobile | Desktop |
|---------|--------|---------|
| Component padding | 16px | 24px |
| Section padding | 48px | 96px |
| Section gap | 64px | 64px |
| Grid gap | 24px | 32px |
| Button padding | 16px 32px | 16px 48px |

---

## Button Components

### Primary Button (CTA)
**Visual:** White background, black text, minimal

```html
<button class="btn btn-primary">
  ENTER
</button>
```

**States:**
- Default: White bg, black text
- Hover: Chrome bg, black text, lift 2px
- Active: No lift
- Focus: 2px white outline

**Usage:** Primary actions (Enter site, Add to Cart, Submit)

### Secondary Button (Outline)
**Visual:** Transparent background, white border, white text

```html
<button class="btn btn-secondary">
  LEARN MORE
</button>
```

**States:**
- Default: Transparent bg, white border & text
- Hover: White bg, black text, lift 2px
- Active: No lift
- Focus: 2px white outline

**Usage:** Secondary actions (View Details, Cancel)

### Minimal Button (Text Only)
**Visual:** No background, no border, chrome underline on hover

```html
<button class="btn btn-minimal">
  Skip
</button>
```

**States:**
- Default: White text, no underline
- Hover: Chrome underline animates in
- Focus: 2px white outline

**Usage:** Tertiary actions (Skip intro, Close modal, navigation links)

### Size Variants
```html
<button class="btn btn-primary btn-lg">LARGE</button>
<button class="btn btn-primary">DEFAULT</button>
<button class="btn btn-primary btn-sm">SMALL</button>
```

---

## Input Components

### Standard Input
**Visual:** Transparent bg, steel border, white text

```html
<input 
  type="text" 
  class="input" 
  placeholder="Enter email"
/>
```

**States:**
- Default: 1px steel border (#8B8B8B)
- Hover: Chrome border (#C0C0C0)
- Focus: White border + white outline
- Disabled: 40% opacity, not-allowed cursor

### Minimal Input (Bottom Border Only)
```html
<input 
  type="text" 
  class="input input-minimal" 
  placeholder="Password"
/>
```

**Usage:** Modal forms, minimal contexts

---

## Card Components

### Product Card
**Structure:**
- Image (3:4 aspect ratio)
- Hover overlay (gradient from bottom)
- Product info (name, price)
- Optional "SOLD OUT" badge

```html
<div class="card-product">
  <div class="card-product-image">
    <img src="product.jpg" alt="Product Name" />
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

**Interaction:**
- Default: Grayscale image filter
- Hover: Image scales 105%, overlay fades in, "VIEW" button appears

**Image Treatment:**
```css
filter: grayscale(100%) contrast(1.1);
```

### Content Card
**Usage:** About sections, editorial blocks

```html
<div class="card">
  <div class="card-content">
    <!-- Content here -->
  </div>
</div>
```

**Visual:** Charcoal bg (#1A1A1A), subtle white border (10% opacity)

---

## Navigation System

### Desktop Navigation
**Structure:**
```
[Hamburger] [Logo Center] [Search | Account | Cart]
```

**Specs:**
- Fixed position, top of viewport
- Black background (90% opacity)
- Backdrop blur (8px)
- 1px bottom border (white, 10% opacity)
- Logo: 40px height
- Padding: 16px 24px

### Mobile Hamburger Menu
**Icon:** 3 horizontal lines (28px wide, 2px thick, 5px gap)

**States:**
- Default: White lines
- Hover: Chrome lines
- Open: Top line rotates 45°, middle fades out, bottom rotates -45° (X shape)

**Menu Overlay:**
- Full-screen overlay (95% black, 12px blur)
- Center-aligned vertical menu
- Large display serif type (48.83px)
- Chrome underline on hover
- Fade in/out animation (400ms)

```html
<nav class="nav">
  <div class="nav-container">
    <button class="hamburger">
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>
    
    <img src="/images/logo/montrez-logo-128.png" alt="MONTREZ" class="nav-logo" />
    
    <div class="nav-actions">
      <!-- Search, Account, Cart icons -->
    </div>
  </div>
</nav>

<div class="menu-overlay">
  <a href="/" class="menu-link">HOME</a>
  <a href="/shop" class="menu-link">SHOP</a>
  <a href="/about" class="menu-link">ABOUT</a>
  <a href="/contact" class="menu-link">CONTACT</a>
</div>
```

---

## Photography Guidelines

### Style Modes

#### Mode 1: Studio Dark (Indoor/Product)
**Reference:** file_423 (seated back-view t-shirt shot)

**Specs:**
- Desaturated color (NOT full B&W)
- Low-key lighting (single soft source)
- Dark, controlled environment
- Black leather, industrial props
- No visible grain
- Medium-low contrast

**CSS Treatment:**
```css
filter: saturate(0.2) contrast(0.9) brightness(0.85);
```

**Usage:** Product detail pages, lookbook shots, close-ups

#### Mode 2: Editorial Raw (Outdoor/Campaign)
**Reference:** file_424 (front-facing lookbook with Mercedes)

**Specs:**
- Full B&W conversion
- Natural daylight (overcast preferred)
- High contrast
- Visible film grain
- Luxury props (cars, architecture)
- Faceless/anonymous subjects

**CSS Treatment:**
```css
filter: grayscale(100%) contrast(1.15) brightness(0.95);
```

**Plus grain overlay:**
```css
.effect-film-grain::after {
  background-image: url('data:image/svg+xml...');
  opacity: 0.4;
  mix-blend-mode: overlay;
}
```

**Usage:** Homepage hero, About page, Instagram feed, campaign imagery

### Composition Rules
- ✅ **DO:** Use high/low camera angles for drama
- ✅ **DO:** Obscure faces (hoods, angles, shadows)
- ✅ **DO:** Include luxury signifiers (Mercedes, leather, architecture)
- ✅ **DO:** Use negative space for impact
- ✅ **DO:** Center key visual elements
- ❌ **DON'T:** Show full faces
- ❌ **DON'T:** Use bright, cheerful settings
- ❌ **DON'T:** Use color photography (B&W or desaturated only)

### Image Aspect Ratios
| Context | Ratio | Example |
|---------|-------|---------|
| Product cards | 3:4 | 600x800px |
| Hero images | 16:9 | 1920x1080px |
| Square posts | 1:1 | 1080x1080px |
| Logo | ~3:4 (vertical) | Variable |

---

## Animation & Motion

### Timing Functions
```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)    /* Standard */
--ease-out: cubic-bezier(0, 0, 0.2, 1)         /* Enter */
--ease-in: cubic-bezier(0.4, 0, 1, 1)          /* Exit */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)  /* Playful */
```

### Durations
```css
--duration-fast: 200ms     /* Micro-interactions */
--duration-base: 300ms     /* Standard transitions */
--duration-slow: 400ms     /* Entrances, emphasis */
--duration-slower: 600ms   /* Hero animations */
```

### Key Animations

#### Product Card Hover
```css
/* Image scales 5%, overlay fades in, card lifts 4px */
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
```

#### Button Hover
```css
/* Background changes, lifts 2px */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

#### Menu Link Hover
```css
/* Chrome underline expands from center */
transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
```

#### Page Load
```css
/* Fade in + slide up */
animation: slideUp 600ms cubic-bezier(0, 0, 0.2, 1);
```

### Cinematic Effects

#### Chrome Shimmer (For logos, badges)
```css
background: linear-gradient(135deg, #C0C0C0, #E8E8E8, #C0C0C0, #A0A0A0, #C0C0C0);
background-size: 200% 200%;
animation: chromeShimmer 3s ease-in-out infinite;
```

#### Film Grain Overlay
```html
<div class="effect-film-grain">
  <img src="hero.jpg" />
</div>
```

---

## Responsive Breakpoints

```css
--breakpoint-sm: 640px   /* Mobile landscape */
--breakpoint-md: 768px   /* Tablet */
--breakpoint-lg: 1024px  /* Desktop */
--breakpoint-xl: 1280px  /* Large desktop */
--breakpoint-2xl: 1536px /* Extra large */
```

### Mobile-First Strategy
- Design for 375px width first (iPhone SE)
- Stack vertically on mobile
- Use hamburger menu below 768px
- Full desktop nav above 768px
- 2-column product grid on mobile, 3-4 columns on desktop

---

## Accessibility

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- `focus-visible` styles: 2px white outline, 2px offset
- Tab order: logical flow (top-to-bottom, left-to-right)

### Screen Readers
- Use semantic HTML (`<nav>`, `<main>`, `<article>`)
- All images have descriptive `alt` text
- Use `.sr-only` class for screen-reader-only text

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  /* All animations reduced to 0.01ms */
}
```

### Color Contrast
- White on black: 21:1 (AAA)
- Chrome (#C0C0C0) on black: 7.6:1 (AA+)
- Steel (#8B8B8B) on black: 5.2:1 (AA)

---

## Component Examples

### Homepage Hero
```html
<section class="hero">
  <div class="hero-image effect-film-grain filter-bw-editorial">
    <img src="/images/hero.jpg" alt="Montrez Collection" />
  </div>
  <div class="hero-content">
    <h1 class="heading-hero">MONTREZ</h1>
    <p class="accent-script">Pas pour Tout</p>
    <button class="btn btn-primary btn-lg">SHOP NOW</button>
  </div>
</section>
```

### Product Grid
```html
<div class="product-grid">
  <div class="card-product">
    <!-- Product 1 -->
  </div>
  <div class="card-product">
    <!-- Product 2 -->
  </div>
  <div class="card-product">
    <!-- Product 3 -->
  </div>
  <!-- ... -->
</div>

<style>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-6);
}
</style>
```

### Password Modal
```html
<div class="modal">
  <div class="modal-content">
    <h2 class="heading-2">ENTER</h2>
    
    <div class="form-section">
      <h3 class="label-large">Returning</h3>
      <input type="password" class="input input-minimal" placeholder="Password" />
      <button class="btn btn-primary">ENTER</button>
    </div>
    
    <div class="divider"></div>
    
    <div class="form-section">
      <h3 class="label-large">New</h3>
      <input type="email" class="input input-minimal" placeholder="Email" />
      <button class="btn btn-secondary">GET CODE</button>
    </div>
  </div>
</div>
```

---

## Brand Voice & Copy

### Tone
- **Confident, not arrogant**
- **Exclusive, not elitist**
- **Minimal, not empty**
- **Mysterious, not confusing**

### Copy Examples
| Context | Bad | Good |
|---------|-----|------|
| Product description | "This hoodie is made from premium materials and features our signature design." | "ARCHITECT ZIP HOODIE. Off-white. Studded hood. Pas pour Tout." |
| CTA | "Click here to see more products" | "ENTER" / "SHOP NOW" / "DISCOVER" |
| About | "We're a streetwear brand founded in..." | "European luxury streetwear. Not for everyone." |
| Sold out | "This item is currently unavailable" | "SOLD OUT" |

### Writing Rules
- ✅ **DO:** Use short, declarative sentences
- ✅ **DO:** Use all-caps for emphasis (sparingly)
- ✅ **DO:** Include French phrases ("Pas pour Tout")
- ✅ **DO:** Be direct and concise
- ❌ **DON'T:** Over-explain
- ❌ **DON'T:** Use marketing clichés
- ❌ **DON'T:** Be overly friendly or casual

---

## File Structure

```
montrez-site/
├── public/
│   └── images/
│       ├── logo/
│       │   ├── montrez-logo-512.png  ✅ DONE
│       │   ├── montrez-logo-256.png  ✅ DONE
│       │   ├── montrez-logo-128.png  ✅ DONE
│       │   └── montrez-logo-64.png   ✅ DONE
│       ├── products/
│       │   └── [product images to be scraped]
│       └── editorial/
│           └── [campaign/hero images]
├── src/
│   ├── styles/
│   │   └── design-system.css  ✅ DONE
│   └── components/
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── Input.jsx
│       ├── Navigation.jsx
│       └── [other components]
└── DESIGN_SYSTEM_GUIDE.md  ✅ DONE (this file)
```

---

## Next Steps for Frontend Implementation

### Priority 1: Core Components (Use design-system.css)
1. ✅ Logo files generated (all sizes)
2. ✅ Design system CSS complete
3. ✅ Documentation written
4. ⏳ Button component (use `.btn` classes)
5. ⏳ Input component (use `.input` classes)
6. ⏳ Product card component (use `.card-product`)
7. ⏳ Navigation component (use `.nav`, `.hamburger`)

### Priority 2: Product Assets
8. ⏳ Scrape product images from montrezofficial.com
9. ⏳ Apply B&W filters (`.filter-bw-editorial`)
10. ⏳ Save to `public/images/products/`

### Priority 3: Layout & Pages
11. ⏳ Homepage hero (use `.hero`, `.effect-film-grain`)
12. ⏳ Product grid (use `.product-grid`, `.card-product`)
13. ⏳ Product detail page
14. ⏳ About page (editorial imagery)

### Priority 4: Entrance Flow
15. ⏳ Landing page (gate image + "ENTER" button)
16. ⏳ Password/Email modal (`.modal`, `.input-minimal`)
17. ⏳ Video intro integration
18. ⏳ Session state management

### Priority 5: Polish
19. ⏳ Animations (`.animate-fade-in`, `.animate-slide-up`)
20. ⏳ Mobile optimization (hamburger menu, responsive grid)
21. ⏳ Performance (image optimization, lazy loading)
22. ⏳ Accessibility (ARIA labels, keyboard navigation)

---

## Design System Checklist

- ✅ Logo processing (512, 256, 128, 64 PNG)
- ✅ Color palette (Black, White, Chrome)
- ✅ Typography scale (Major Third)
- ✅ Spacing system (Base 4px)
- ✅ Button components (Primary, Secondary, Minimal)
- ✅ Input components (Standard, Minimal)
- ✅ Card components (Product, Content)
- ✅ Navigation system (Desktop, Mobile hamburger)
- ✅ Animation system (Timing, keyframes, utilities)
- ✅ Photography guidelines (Studio Dark, Editorial Raw)
- ✅ Responsive breakpoints
- ✅ Accessibility standards
- ⏳ Product image scraping
- ⏳ Component implementation (React)

---

## Support & Questions

**For frontend agent:**
- All CSS classes are documented above
- Use `design-system.css` as foundation
- Extend with component-specific styles as needed
- Follow mobile-first approach
- Maintain brand aesthetic: minimal, B&W, high-impact

**Brand consistency checklist before any design decision:**
1. Does it use ONLY black, white, chrome?
2. Is typography serif (display) or sans-serif (body)?
3. Are images B&W or heavily desaturated?
4. Does it feel exclusive, mysterious, European luxury?
5. Is it minimal and high-impact?

If all answers are YES → Proceed
If any answer is NO → Revise

---

**Design System Status:** ✅ COMPLETE  
**Ready for Frontend Implementation:** ✅ YES  
**Brand Guardian Approval Required:** ⏳ PENDING
