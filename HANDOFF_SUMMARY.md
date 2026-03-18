# MONTREZ SITE - DESIGN HANDOFF SUMMARY

## Mission Complete ✅

**UI Designer Agent** has completed visual design and logo preparation for the Montrez site rebuild.

---

## Deliverables

### 1. Logo Files ✅
**Location:** `montrez-site/public/images/logo/`

- ✅ `montrez-logo-512.png` (235KB) - High-res
- ✅ `montrez-logo-256.png` (71KB) - Social/Medium
- ✅ `montrez-logo-128.png` (21KB) - Navigation
- ✅ `montrez-logo-64.png` (6KB) - Tiny UI

**Quality:** Transparent PNG, tight crop, professional background removal

---

### 2. Design System CSS ✅
**File:** `montrez-site/design-system.css` (17.7KB)

**Contents:**
- ✅ Color palette (Black, White, Chrome + extended)
- ✅ Typography system (Playfair Display + Inter + Allura)
- ✅ Spacing system (Base 4px, 11 scale levels)
- ✅ Button components (Primary, Secondary, Minimal + sizes)
- ✅ Input components (Standard, Minimal)
- ✅ Card components (Product, Content)
- ✅ Navigation system (Desktop nav, Mobile hamburger)
- ✅ Animation system (Keyframes, timing, utilities)
- ✅ Effects (Film grain, B&W filters, Chrome shimmer)
- ✅ Responsive helpers (Mobile-first)
- ✅ Accessibility (Focus states, screen reader, reduced motion)

**Usage:** Import as foundation CSS, extend as needed per component

---

### 3. Complete Documentation ✅

#### DESIGN_SYSTEM_GUIDE.md (20.2KB)
**Comprehensive guide covering:**
- Brand aesthetic pillars
- Logo system usage rules
- Color system + functional usage
- Typography hierarchy + classes
- Spacing guidelines
- Button/Input/Card specifications
- Navigation system (desktop + mobile)
- Photography guidelines (2 modes: Studio Dark, Editorial Raw)
- Animation principles
- Responsive breakpoints
- Accessibility standards
- Component examples + code
- Brand voice + copy guidelines

#### UI_IMPROVEMENTS.md (18KB)
**Detailed improvement specs:**
- Before/after comparisons
- Entrance flow mockups (Landing → Modal → Video)
- Enhanced navigation (Hamburger menu)
- Better product grid (Hover effects, layouts)
- Improved typography hierarchy
- Smoother transitions (Timing, sequences)
- Cinematic effects (Parallax, grain, vignette)
- Mobile optimizations
- Loading states
- Accessibility enhancements
- Implementation priority

#### ASSETS_INVENTORY.md (9.8KB)
**Complete asset tracking:**
- Logo files inventory
- Photography assets (source files, usage, CSS treatments)
- Product images to be scraped
- Video intro specs
- Icon requirements
- Font loading
- Missing assets TODO
- File size guidelines
- Processing workflow

---

## Brand Identity Summary

### Core Aesthetic
**European luxury streetwear with French aristocratic heritage and contemporary edge**

### Visual Pillars
1. **Old-Money Heritage:** Château iconography, engraving style, serif typography
2. **Streetwear Edge:** Oversized silhouettes, anonymous models, industrial settings
3. **Exclusivity:** "Pas pour Tout", faceless subjects, password-gated
4. **Minimal Palette:** ONLY Black, White, Chrome (NO GOLD)

### Photography Styles
1. **Studio Dark:** Desaturated, low-key lighting, no grain (indoor/product)
2. **Editorial Raw:** Full B&W, film grain, high contrast, natural light (campaign)

### Typography
- **Display (Headings):** Playfair Display (serif, bold, uppercase)
- **Body (Paragraphs):** Inter (sans-serif, clean, neutral)
- **Accent (Tagline):** Allura (script, "Pas pour Tout" only)

### Colors (STRICT)
```css
--color-black: #000000      (Backgrounds, primary)
--color-white: #FFFFFF      (Text, buttons)
--color-chrome: #C0C0C0     (Accents, hovers)
```

---

## What's Ready to Use

### Immediate Implementation (No Changes Needed)
1. ✅ All logo files (4 sizes)
2. ✅ Full design system CSS (import and use)
3. ✅ Button classes (`.btn`, `.btn-primary`, `.btn-secondary`, `.btn-minimal`)
4. ✅ Input classes (`.input`, `.input-minimal`)
5. ✅ Card classes (`.card-product`, `.card-product-image`, etc.)
6. ✅ Navigation classes (`.nav`, `.hamburger`, `.menu-overlay`)
7. ✅ Typography classes (`.heading-hero`, `.body-base`, `.label-large`, etc.)
8. ✅ Animation utilities (`.animate-fade-in`, `.animate-slide-up`)
9. ✅ Effect classes (`.effect-film-grain`, `.filter-bw-editorial`, `.effect-chrome`)

### Copy Editorial Assets
**Source:** `C:\Users\isaac\.openclaw\media\inbound\`

```bash
# Landing gate
file_421---189d6da7-29e2-433d-89c3-0eac53601f3d.jpg
→ public/images/editorial/landing-gate.jpg

# Lookbook
file_423---b935560b-d5b0-463c-8340-b3d6cb20af66.jpg
→ public/images/editorial/lookbook-01.jpg

# Campaign
file_424---6fd4af25-1344-4ff4-a924-f4c381ea7bec.jpg
→ public/images/editorial/campaign-01.jpg
```

---

## What's Still Needed (Frontend Task)

### Priority 1: Product Assets (BLOCKING)
**Task:** Scrape product images from montrezofficial.com

**Products (8):**
1. "SPEAK NO EVIL" GRAPHIC T-SHIRT - $600
2. "ARMY 74" SHORTS - $1,000
3. "MONEY" GRAPHIC T-SHIRT - $600
4. ARCHITECT ZIP HOODIE - BLACK - $1,500
5. ARCHITECT ZIP HOODIE - OFF-WHITE - $1,500
6. ARCHIVE JACKET - $1,400
7. ARMY SWEATPANTS - $800
8. DAZZLED LOGO SHORTS - $1,000

**Destination:** `public/images/products/[product-slug]/[angle].jpg`

**Specs:**
- Max width: 1200px
- Aspect ratio: 3:4
- Format: JPG, 85% quality
- Apply: `filter: grayscale(100%) contrast(1.1);`

### Priority 2: Navigation Icons
**Needed:**
- Search icon (magnifying glass)
- Account icon (user silhouette)
- Cart icon (shopping bag)

**Source:** Feather Icons or Heroicons (24x24px, white)

**Destination:** `public/images/icons/`

### Priority 3: Video Intro
**File:** Château gates opening video (5s, MP4)

**Location:** ⏳ TO BE PROVIDED

**Destination:** `public/videos/intro.mp4`

### Priority 4: Favicons
**Generate from:** `montrez-logo-256.png`

**Needed:**
- `favicon.ico` (16x16, 32x32)
- `apple-touch-icon.png` (180x180)
- `og-image.png` (1200x630 with logo + tagline)

---

## Component Implementation Guide

### Example: Product Card

```html
<div class="card-product">
  <div class="card-product-image">
    <img 
      src="/images/products/architect-hoodie-black/front.jpg" 
      alt="Montrez Architect Zip Hoodie - Black" 
      loading="lazy"
    />
    <!-- Optional: Sold out badge -->
    <span class="badge-sold-out">SOLD OUT</span>
    
    <!-- Hover overlay -->
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

**CSS:** Already in `design-system.css`
- Default: Grayscale image
- Hover: Scales 105%, overlay fades in, card lifts 4px
- Smooth transitions (400ms)

### Example: Navigation

```html
<nav class="nav">
  <div class="nav-container">
    <!-- Hamburger -->
    <button class="hamburger" onclick="toggleMenu()">
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>
    
    <!-- Logo -->
    <a href="/">
      <img 
        src="/images/logo/montrez-logo-128.png" 
        alt="MONTREZ" 
        class="nav-logo" 
      />
    </a>
    
    <!-- Actions -->
    <div class="nav-actions">
      <button class="btn-icon">🔍</button>
      <button class="btn-icon">👤</button>
      <button class="btn-icon">🛒</button>
    </div>
  </div>
</nav>

<!-- Menu Overlay -->
<div class="menu-overlay" id="menu">
  <a href="/" class="menu-link">HOME</a>
  <a href="/shop" class="menu-link">SHOP</a>
  <a href="/about" class="menu-link">ABOUT</a>
  <a href="/contact" class="menu-link">CONTACT</a>
</div>
```

**JavaScript (Simple):**
```javascript
function toggleMenu() {
  const menu = document.getElementById('menu');
  const hamburger = document.querySelector('.hamburger');
  menu.classList.toggle('open');
  hamburger.classList.toggle('open');
}
```

### Example: Button Usage

```html
<!-- Primary CTA -->
<button class="btn btn-primary btn-lg">
  ENTER
</button>

<!-- Secondary action -->
<button class="btn btn-secondary">
  LEARN MORE
</button>

<!-- Minimal link-style -->
<button class="btn btn-minimal">
  Skip
</button>
```

---

## Key Design Principles (DO's and DON'Ts)

### ✅ DO:
- Use ONLY black, white, chrome colors
- Apply B&W filters to all images
- Use display serif for headings (Playfair Display)
- Use uppercase for labels and CTAs
- Add film grain to hero images
- Implement smooth hover effects (300-600ms)
- Maintain 3:4 aspect ratio for product images
- Use minimal, direct copy
- Prioritize exclusivity and mystery
- Follow mobile-first approach

### ❌ DON'T:
- Use gold or warm metallics
- Use color photography (must be B&W or desaturated)
- Mix multiple font families in one component
- Over-explain in copy
- Show faces in product photography
- Use bright, cheerful settings
- Skip accessibility features
- Ignore responsive breakpoints
- Add unnecessary animations

---

## Responsive Strategy

### Breakpoints
```css
Mobile:    < 640px   (1 column, stacked)
Tablet:    768px     (2 columns, hamburger → desktop nav)
Desktop:   1024px    (3-4 columns, full features)
Large:     1280px+   (4 columns, wider spacing)
```

### Mobile Optimizations
- Hamburger menu below 768px
- 1-column product grid on mobile
- Larger touch targets (44x44px minimum)
- Adjusted type scale (slightly smaller hero)
- Full-width cards
- Stacked footer

---

## Performance Guidelines

### Image Optimization
- Lazy load all images below fold (`loading="lazy"`)
- Use responsive images (`<picture>` + `srcset`)
- Consider WebP with JPG fallback
- Target: < 150KB per product image

### Font Loading
- Preconnect to Google Fonts
- Use `font-display: swap`
- Subset fonts if possible (Latin only)

### Critical CSS
- Inline design system above-the-fold styles
- Async load below-fold components
- Use CSS variables for theming

---

## Testing Checklist

### Visual Regression
- [ ] Logo displays correctly (all sizes)
- [ ] Typography hierarchy is clear
- [ ] Colors match spec (black, white, chrome only)
- [ ] Images are B&W/desaturated
- [ ] Hover states work smoothly
- [ ] Animations are subtle and performant

### Responsive
- [ ] Mobile (375px): 1 column, hamburger works
- [ ] Tablet (768px): 2 columns, nav transitions
- [ ] Desktop (1024px+): 3-4 columns, full features
- [ ] Touch targets are 44x44px minimum

### Accessibility
- [ ] All interactive elements keyboard accessible
- [ ] Focus states visible (2px white outline)
- [ ] Images have descriptive alt text
- [ ] ARIA labels on buttons/icons
- [ ] Screen reader tested
- [ ] Reduced motion respected

### Performance
- [ ] Largest Contentful Paint < 2.5s
- [ ] First Input Delay < 100ms
- [ ] Cumulative Layout Shift < 0.1
- [ ] All images optimized (< 150KB)
- [ ] Fonts loaded efficiently

---

## File Structure (Current)

```
montrez-site/
├── public/
│   └── images/
│       └── logo/
│           ├── montrez-logo-512.png  ✅
│           ├── montrez-logo-256.png  ✅
│           ├── montrez-logo-128.png  ✅
│           └── montrez-logo-64.png   ✅
├── design-system.css                 ✅
├── DESIGN_SYSTEM_GUIDE.md            ✅
├── UI_IMPROVEMENTS.md                ✅
├── ASSETS_INVENTORY.md               ✅
├── HANDOFF_SUMMARY.md                ✅ (this file)
└── montrez-rebuild-brief.md          ✅
```

---

## Next Steps (Frontend Agent)

### Immediate (Today):
1. Import `design-system.css` into project
2. Copy editorial assets to `public/images/editorial/`
3. Download navigation icons
4. Build navigation component (hamburger menu)
5. Build button components (already styled in CSS)

### Week 1:
6. Scrape product images from montrezofficial.com
7. Build product card component
8. Implement entrance flow (landing → modal → video)
9. Build homepage hero (cinematic, with film grain)
10. Implement product grid (responsive, hover effects)

### Week 2:
11. Build product detail pages
12. Build about page (editorial imagery)
13. Implement animations (staggered loads)
14. Add loading states
15. Mobile optimization pass
16. Accessibility audit
17. Performance optimization

---

## Support References

### Documentation Files
- **DESIGN_SYSTEM_GUIDE.md** - Complete design system reference
- **UI_IMPROVEMENTS.md** - Detailed UI specs and mockups
- **ASSETS_INVENTORY.md** - Asset tracking and workflows
- **montrez-rebuild-brief.md** - Original project brief

### External Resources
- **Fonts:** Google Fonts (Playfair Display, Inter, Allura)
- **Icons:** Feather Icons (feathericons.com) or Heroicons (heroicons.com)
- **Product Data:** montrezofficial.com (scrape)

### Design System CSS
- **File:** `design-system.css`
- **All classes documented** in DESIGN_SYSTEM_GUIDE.md
- **Copy-paste ready** examples in UI_IMPROVEMENTS.md

---

## Contact & Questions

**For Design Questions:**
- Refer to DESIGN_SYSTEM_GUIDE.md (comprehensive)
- Check UI_IMPROVEMENTS.md for specific component specs
- Review ASSETS_INVENTORY.md for asset details

**For Brand Consistency:**
- ONLY use black, white, chrome
- All images must be B&W or heavily desaturated
- Maintain exclusivity/mystery aesthetic
- Follow "Pas pour Tout" (Not for Everyone) philosophy

**Brand Consistency Check:**
Before implementing any component, ask:
1. Does it use ONLY black, white, chrome?
2. Is typography serif (headings) or sans (body)?
3. Are images B&W/desaturated?
4. Does it feel exclusive, mysterious, luxury?
5. Is it minimal and high-impact?

If all YES → Proceed  
If any NO → Revise

---

## Handoff Status

| Deliverable | Status | Notes |
|-------------|--------|-------|
| Logo files (4 sizes) | ✅ COMPLETE | Transparent PNG, tight crop |
| Design system CSS | ✅ COMPLETE | 17.7KB, all components |
| Design documentation | ✅ COMPLETE | 3 comprehensive guides |
| Asset inventory | ✅ COMPLETE | Full tracking document |
| Photography treatment spec | ✅ COMPLETE | 2 modes documented |
| Component examples | ✅ COMPLETE | Copy-paste ready |
| Product images | ⏳ PENDING | Frontend to scrape |
| Navigation icons | ⏳ PENDING | Frontend to download |
| Video intro | ⏳ PENDING | File to be provided |

---

**Design Phase:** ✅ COMPLETE  
**Ready for Frontend Implementation:** ✅ YES  
**Handoff Date:** 2026-03-18  
**Designer:** UI Designer Agent (Subagent)  
**Next Agent:** Frontend Agent

---

**THE DESIGN SYSTEM IS PRODUCTION-READY. ALL CLASSES ARE DOCUMENTED. ALL ASSETS ARE PROCESSED. FRONTEND CAN START BUILDING IMMEDIATELY.**

**Good luck. Make it cinematic. Make it exclusive. Make it Montrez.**

**Pas pour Tout. 🏰**
