# MONTREZ - Streetwear Brand Guidelines

## Brand Identity

**Positioning:** Urban streetwear for the confident and bold  
**Vibe:** Supreme meets Off-White meets Palace - minimal, statement-driven, unapologetically bold  
**Tagline:** "Show Up Bold" / "Pas pour Tout" (Not for Everyone)

---

## Color Palette

### Primary Colors
- **Black:** `#000000` - Base, dominant color
- **White:** `#FFFFFF` - Text, contrast, clean
- **Electric Blue:** `#00F0FF` - Bold accent, statements, energy

### Extended Palette
- **Charcoal:** `#1A1A1A` - Card backgrounds, subtle depth
- **Steel Gray:** `#808080` - Secondary text, borders
- **Off-White:** `#F5F5F5` - Soft contrast backgrounds

### Usage Rules
- **80/15/5 Rule:** 80% Black/White base, 15% Gray accents, 5% Electric Blue for impact
- Electric Blue ONLY for: CTAs, hover states, active elements, brand accents
- Never use Electric Blue for body text or large backgrounds
- Maintain high contrast for accessibility

---

## Typography

### Font Stack

**Display (Headlines & Logos):**
- Primary: **Bebas Neue** (bold, condensed, streetwear classic)
- Fallback: **Roboto Condensed Bold**, **Arial Black**, sans-serif
- Use: All-caps headings, logo, statements

**Body (Content):**
- Primary: **Inter** (clean, modern, readable)
- Weights: 400 (regular), 500 (medium), 700 (bold)
- Use: Body text, descriptions, UI elements

**Accent (Statement Pieces):**
- **Druk Wide Bold** or **Knockout** style
- Use: Hero text, product drops, limited releases

### Type Scale
```
Hero: 72-96px (4.5-6rem)
H1: 48px (3rem)
H2: 36px (2.25rem)
H3: 24px (1.5rem)
Body Large: 18px (1.125rem)
Body: 16px (1rem)
Small: 14px (0.875rem)
Micro: 12px (0.75rem)
```

### Text Styling
- **All Headlines:** UPPERCASE, letter-spacing: 0.05-0.1em
- **Body Text:** Sentence case, line-height: 1.6
- **Links/CTAs:** UPPERCASE, bold, electric blue hover
- **Product Names:** UPPERCASE, bold, 0.15em letter-spacing

---

## Logo System

### Primary Wordmark
```
M O N T R E Z
```
- Font: Bebas Neue Bold or Druk Wide
- All caps, expanded letter-spacing (0.2em)
- Monochrome: White on black OR Black on white
- Accent: Electric blue underline or background bar

### Minimal Mark
```
M / Z
```
- Stacked or side-by-side
- For social media avatars, favicons

### Lock-ups
1. **Standard:** MONTREZ (horizontal)
2. **Vertical:** M-O-N-T-R-E-Z stacked
3. **Statement:** MONTREZ with electric blue strike-through or underline
4. **Tag:** "MTZ" in condensed bold

### Clear Space
- Minimum clear space: Height of "M" on all sides
- Never stretch, rotate, or add effects

---

## Design System Components

### Buttons

**Primary CTA:**
- Background: Electric Blue `#00F0FF`
- Text: Black, bold, uppercase
- Padding: 16px 48px
- Border: None
- Hover: Scale 1.02, glow effect

**Secondary:**
- Background: Transparent
- Border: 2px solid white
- Text: White, bold, uppercase
- Hover: Background white, text black

**Minimal:**
- Text only, electric blue
- Underline on hover
- No background or border

### Cards

**Product Card:**
- Background: Charcoal `#1A1A1A`
- Border: 1px solid `rgba(255,255,255,0.1)`
- Image: B&W filter OR color with black overlay
- Hover: Border electric blue, lift 4px
- Text: White product name (uppercase), price below

**Info Card:**
- Background: Black
- Border-left: 4px solid electric blue
- Padding: 24px
- Shadow on hover

### Inputs

- Background: Transparent
- Border: 2px solid steel gray
- Text: White
- Focus: Electric blue border
- Placeholder: Gray, 0.6 opacity

### Spacing

Use 8px grid system:
```
4px, 8px, 16px, 24px, 32px, 48px, 64px, 96px
```

---

## Photography & Imagery

### Style Guide
- **Street Photography:** Gritty, urban, authentic
- **Product Shots:** Clean, minimal, high contrast
- **Model Photography:** Natural poses, urban environments, candid
- **Filters:** B&W preferred, or desaturated with electric blue accent

### Do's
✅ High contrast black & white  
✅ Urban environments (concrete, graffiti, neon)  
✅ Movement and energy  
✅ Close-ups of details/textures  
✅ Neon/electric blue accent lights  

### Don'ts
❌ Overly polished/luxury settings  
❌ Studio white backgrounds  
❌ Soft, romantic lighting  
❌ Traditional fashion poses  

---

## Voice & Tone

### Brand Voice
- **Confident** - Not arrogant, but assured
- **Direct** - No fluff, straight to the point
- **Bold** - Make statements, take positions
- **Authentic** - Real, relatable, street-level

### Copywriting Guidelines

**Headlines:**
```
SHOW UP BOLD
DROP 03 // ELECTRIC NIGHTS
SOLD OUT IN 3 MINUTES
```

**Product Descriptions:**
```
Oversized fit. Premium cotton. Built to last.
No compromises.
```

**CTAs:**
```
GET IT NOW
JOIN THE DROP
SIGN UP
```

**Avoid:**
- "Luxury", "elegant", "refined"
- Long sentences
- Exclamation marks (use sparingly)
- Generic fashion terms

---

## Motion & Animation

### Principles
- **Quick & Snappy:** 200-300ms transitions
- **Bold Entrances:** Slide, fade, scale - no slow fades
- **Purposeful:** Animations guide attention, don't distract

### Effects
```css
Hover: transform: translateY(-4px)
Button: scale(1.02) + glow
Page Load: Slide up + fade in (staggered)
Product Grid: Stagger by 50ms per item
```

### Transitions
```css
ease-out: cubic-bezier(0, 0, 0.2, 1)
Duration: 250ms
```

---

## Grid & Layout

### Desktop Grid
- 12 columns
- 24px gutters
- Max-width: 1440px
- Side padding: 32px

### Mobile Grid
- 4 columns
- 16px gutters
- Side padding: 16px

### Breakpoints
```
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
Wide: > 1440px
```

---

## Iconography

### Style
- **Line icons** (2px stroke)
- **Minimal** - geometric, simple
- **Consistent** - same stroke weight across all icons
- Color: White or electric blue

### Icon Set
- Cart, User, Menu, Close, Arrow Right, Search, Heart, Share
- Use Feather Icons or Heroicons as base

---

## Accessibility

### Contrast Ratios (WCAG AA)
- White on Black: 21:1 ✅
- Electric Blue on Black: 8:1 ✅
- Gray on Black: 4.5:1+ ✅

### Best Practices
- Always provide text alternatives
- Maintain keyboard navigation
- Use semantic HTML
- Test with screen readers
- Never rely on color alone

---

## Application Examples

### Entrance Screen
**OLD:** Château gates, dark luxury  
**NEW:** Urban street scene - concrete wall with neon "MONTREZ" sign, electric blue glow, minimal grain texture

### Product Page
- Full-bleed product image (B&W or minimal color)
- Bold product name (BEBAS NEUE, uppercase)
- Electric blue "ADD TO CART" button
- Minimal product details below

### Homepage Hero
```
[Full-screen urban image]

M O N T R E Z
DROP 04 // SPRING 2026
[SHOP NOW] <- Electric blue button
```

---

## File Naming Conventions

```
logo-montrez-primary-white.svg
logo-montrez-minimal-blue.svg
product-tshirt-001-front.jpg
hero-drop04-desktop.jpg
icon-cart-white.svg
```

---

## Brand Assets Checklist

- [ ] Logo (SVG, PNG) - white, black, blue versions
- [ ] Typography (web fonts loaded)
- [ ] Color swatches (CSS variables)
- [ ] Icon set (SVG)
- [ ] Pattern/texture library
- [ ] Photography style guide
- [ ] Social media templates

---

**Version:** 1.0  
**Last Updated:** March 2026  
**Next Review:** Quarterly
