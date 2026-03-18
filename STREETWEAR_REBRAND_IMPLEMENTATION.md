# Montrez Streetwear Rebrand - Implementation Guide

## Overview
This guide walks through implementing the streetwear rebrand for Montrez. The rebrand shifts from luxury château aesthetics to urban streetwear (Supreme/Off-White/Palace inspired).

---

## 1. Design System Files

### ✅ Created Files
1. **`BRAND_GUIDELINES_STREETWEAR.md`**  
   - Complete brand identity document
   - Color palette, typography, voice & tone
   - Photography guidelines
   - Component specifications

2. **`design-system-streetwear.css`**  
   - New CSS design system with streetwear aesthetics
   - Electric blue accent color (#00F0FF)
   - Bebas Neue typography
   - Glow effects, neon styling
   - Updated button, card, input systems

3. **`src/components/VideoIntroStreetwear.jsx`**  
   - Redesigned entrance screen
   - Urban neon sign effect (no video needed)
   - Electric blue glow, concrete texture
   - "MONTREZ" in neon with "SHOW UP BOLD" tagline

4. **`src/styles/VideoIntroStreetwear.css`**  
   - Styling for new entrance screen
   - Neon glow animations
   - Scanline effects, grain overlay

---

## 2. Implementation Steps

### Step 1: Replace Design System
```bash
# Backup old design system
cp design-system.css design-system-luxury-backup.css

# Replace with streetwear version
cp design-system-streetwear.css design-system.css
```

**OR** update imports in components to use `design-system-streetwear.css` directly.

### Step 2: Update Entrance Screen

**In `src/App.jsx` (or wherever VideoIntro is used):**

```jsx
// OLD
import VideoIntro from './components/VideoIntro'

// NEW
import VideoIntroStreetwear from './components/VideoIntroStreetwear'

// Then replace component usage:
// OLD
<VideoIntro onComplete={handleIntroComplete} />

// NEW
<VideoIntroStreetwear onComplete={handleIntroComplete} />
```

### Step 3: Update Typography

**Load Bebas Neue font in `index.html`:**

```html
<head>
  <!-- Add this before closing </head> -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
</head>
```

### Step 4: Update Logo

**Create new text-based logo in Navbar:**

```jsx
// In src/components/Navbar.jsx
<div className="nav-logo">
  MONTREZ
</div>
```

**Style it:**
```css
.nav-logo {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  color: var(--color-white);
  text-decoration: none;
  transition: all 0.3s ease;
}

.nav-logo:hover {
  color: var(--color-electric-blue);
  text-shadow: 0 0 20px rgba(0, 240, 255, 0.5);
}
```

### Step 5: Update Button Classes

**Find and replace button classes across components:**

```jsx
// OLD (luxury)
<button className="btn-primary">Shop Now</button>

// UPDATED (ensure classes match new system)
<button className="btn-primary">SHOP NOW</button>
```

**Key changes:**
- All button text should be UPPERCASE
- Primary buttons now have electric blue background + glow
- Secondary buttons have white outline

### Step 6: Update Product Cards

**In `src/components/ProductCard.jsx` or similar:**

```jsx
// Ensure structure matches new card system
<div className="card-product">
  <div className="card-product-image">
    <img src={product.image} alt={product.name} />
    {product.soldOut && <div className="badge-sold-out">SOLD OUT</div>}
    {product.isNew && <div className="badge-new">NEW DROP</div>}
    <div className="card-product-overlay">
      <button className="btn-primary btn-sm">VIEW</button>
    </div>
  </div>
  <div className="card-product-info">
    <h3 className="card-product-name">{product.name}</h3>
    <p className="card-product-price">${product.price}</p>
  </div>
</div>
```

**Product card styling updates:**
- Images now have 50% grayscale by default (full color on hover)
- Electric blue border on hover
- New/Sold Out badges with electric blue accent

### Step 7: Update Color References

**Global search and replace:**

1. **Chrome color → Electric Blue**
   - Find: `var(--color-chrome)`
   - Replace: `var(--color-electric-blue)`

2. **Serif fonts → Bebas Neue**
   - Find: `var(--font-display)` (if using Playfair)
   - Update definition to Bebas Neue

3. **Soft transitions → Snappy transitions**
   - Find: `400ms` or `600ms`
   - Replace: `250ms` or `300ms`

### Step 8: Update Hero Section

**Example hero update:**

```jsx
<section className="hero">
  <div className="hero-content">
    <h1 className="heading-hero">
      <span className="effect-neon">DROP 04</span>
      <br />
      SPRING 2026
    </h1>
    <p className="body-large">
      New collection. Limited quantities.
    </p>
    <button className="btn-primary btn-lg">
      SHOP NOW
    </button>
  </div>
</section>
```

**Hero styling:**
```css
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: 
    linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
    url('/images/hero-urban.jpg') center/cover;
  position: relative;
}

.hero::after {
  /* Add scanline effect */
}
```

---

## 3. Content Updates

### Messaging Changes

**OLD (Luxury):**
```
"Experience refined elegance"
"Château-inspired luxury"
"Timeless sophistication"
```

**NEW (Streetwear):**
```
"SHOW UP BOLD"
"DROP 04 // LIMITED"
"NOT FOR EVERYONE"
```

### Product Descriptions

**OLD:**
```
Crafted from the finest Italian silk, this elegant piece 
embodies timeless sophistication and refined taste.
```

**NEW:**
```
Premium heavyweight cotton. Oversized fit. Built to last.
Limited to 100 pieces.
```

---

## 4. Component-by-Component Updates

### 4.1 Navbar
- ✅ Update logo to text-based "MONTREZ"
- ✅ Electric blue accent on hover
- ✅ Maintain hamburger menu (updated styling)

### 4.2 Hero Section
- Replace château imagery with urban street photography
- Update headline typography (Bebas Neue, all-caps)
- Electric blue CTA button
- Add neon glow effects

### 4.3 Product Grid
- Update card styling (charcoal background, electric blue border hover)
- Grayscale filter on images
- Bold product names (uppercase)
- New/Sold Out badges

### 4.4 Footer
- Minimal, centered layout
- Electric blue links
- Social icons with glow on hover

### 4.5 About Page
- Urban photography
- Bold statement copy
- Timeline/history in clean minimal cards

### 4.6 Contact Page
- Inputs with electric blue focus state
- Minimal form layout
- Bold submit button

---

## 5. Asset Updates Needed

### Images to Replace
1. **Hero image:** Urban street scene (concrete, neon, city)
2. **Product images:** Streetwear-appropriate styling (models in urban settings)
3. **About page:** Team photos in casual/street settings
4. **Background textures:** Concrete, brick, graffiti (subtle)

### Image Treatment
- Desaturated color OR full B&W
- High contrast
- Optional: Electric blue color pop on specific elements

### Icon Updates
- Use simple line icons (2px stroke)
- Consistent stroke weight
- White or electric blue color
- **Recommended:** Feather Icons or Heroicons

---

## 6. Testing Checklist

### Visual Testing
- [ ] All headings use Bebas Neue
- [ ] All buttons have uppercase text
- [ ] Primary buttons have electric blue background + glow
- [ ] Product cards show electric blue border on hover
- [ ] Navigation has electric blue accents
- [ ] Entrance screen shows neon "MONTREZ" sign
- [ ] No luxury/château imagery remains

### Functional Testing
- [ ] Entrance screen completes after 5s or on click
- [ ] Skip button appears after 2s
- [ ] All buttons have proper hover states
- [ ] Product grid is responsive
- [ ] Forms have electric blue focus states
- [ ] Mobile menu works properly

### Accessibility Testing
- [ ] Color contrast meets WCAG AA (electric blue on black = 8:1 ✅)
- [ ] All interactive elements have focus states
- [ ] Keyboard navigation works
- [ ] Screen reader labels present
- [ ] Reduced motion preferences respected

### Performance Testing
- [ ] No 20MB video on entrance screen (new version is CSS only)
- [ ] Fonts load quickly (preconnect to Google Fonts)
- [ ] Images optimized
- [ ] Animations don't cause jank

---

## 7. Deployment

### Pre-Deploy Checklist
- [ ] All old design system references removed/replaced
- [ ] New fonts loaded
- [ ] Entrance screen updated
- [ ] Product images updated (or placeholder)
- [ ] Content/copy updated to streetwear voice
- [ ] Test on mobile devices
- [ ] Test on Chrome, Firefox, Safari

### Deploy Steps
```bash
# 1. Build
npm run build

# 2. Test production build locally
npm run preview

# 3. Deploy to Vercel/Netlify
npm run deploy
# or
vercel --prod
```

---

## 8. Quick Reference

### Color Variables
```css
--color-black: #000000
--color-white: #FFFFFF
--color-electric-blue: #00F0FF
--color-charcoal: #1A1A1A
--color-steel: #808080
```

### Typography Classes
```css
.heading-hero    /* MONTREZ - 96px, Bebas Neue */
.heading-1       /* 72px, Bebas Neue */
.heading-2       /* 48px, Bebas Neue */
.heading-3       /* 36px, Bebas Neue */
.body-large      /* 18px, Inter */
.body-base       /* 16px, Inter */
.label-large     /* 16px, Inter Bold, Uppercase */
```

### Button Classes
```css
.btn-primary     /* Electric blue, black text, glow */
.btn-secondary   /* Transparent, white border */
.btn-minimal     /* Text only, electric blue */
.btn-lg          /* Large size */
.btn-sm          /* Small size */
```

### Effect Classes
```css
.effect-neon     /* Electric blue glow text */
.effect-grain    /* Subtle grain texture overlay */
.effect-scanlines /* Urban scanline effect */
```

---

## 9. Future Enhancements

### Phase 2 (Optional)
- [ ] 3D product viewers
- [ ] Product drop countdown timers
- [ ] Limited edition badges with glow animation
- [ ] User-generated content gallery (Instagram feed)
- [ ] Augmented reality try-on

### Phase 3 (Optional)
- [ ] Membership/loyalty program
- [ ] Exclusive early access drops
- [ ] Community forum/Discord integration
- [ ] Collaborative drops with artists

---

## 10. Troubleshooting

### Issue: Fonts not loading
**Fix:** Ensure Google Fonts link is in `<head>` of `index.html`, before CSS

### Issue: Electric blue not showing
**Fix:** Check CSS variable is defined in `:root` and imported properly

### Issue: Entrance screen flickers on mobile
**Fix:** Add `will-change: opacity` to `.video-intro-streetwear`

### Issue: Buttons look wrong
**Fix:** Ensure `design-system-streetwear.css` is imported after any component CSS

### Issue: Images not grayscale
**Fix:** Check `.card-product-image img` has `filter: grayscale(50%)`

---

## Support

For questions or issues during implementation:
1. Check `BRAND_GUIDELINES_STREETWEAR.md` for design decisions
2. Review `design-system-streetwear.css` for component styles
3. Test in isolation (CodePen/CodeSandbox) if needed

---

**Version:** 1.0  
**Created:** March 2026  
**Last Updated:** March 2026
