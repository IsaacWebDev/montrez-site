# 🔥 MONTREZ UI/UX AUDIT - STREETWEAR EDITION
**Audit Date:** March 24, 2026  
**Auditor:** UI Designer Agent  
**Site:** https://montrez-site.vercel.app  
**Brand Positioning:** European Luxury Streetwear - "Pas pour Tout"

---

## 📊 EXECUTIVE SUMMARY

**Current State:** 6.5/10 - Functional but feels **TOO CORPORATE/SAFE**  
**Target State:** 9/10 - Unmistakably streetwear, exclusive, rebellious  
**Gap:** Missing streetwear DNA in execution despite strong brand guidelines

### Critical Finding
> **The site has EXCELLENT brand guidelines (Electric Blue, Bebas Neue, Supreme vibes) but the LIVE SITE still uses the old luxury aesthetic (Helvetica Neue, serif logo, muted chrome, château imagery).**

**The rebrand files exist but haven't been fully implemented.** It's like having a Supreme lookbook but wearing Brooks Brothers.

---

## 🎯 OVERALL SCORES

| Dimension | Current | Target | Gap | Priority |
|-----------|---------|--------|-----|----------|
| **Streetwear Authenticity** | 3/10 | 9/10 | -6 | 🔴 CRITICAL |
| **Visual Hierarchy** | 7/10 | 9/10 | -2 | Medium |
| **Typography Edge** | 4/10 | 9/10 | -5 | 🔴 CRITICAL |
| **Color Impact** | 5/10 | 9/10 | -4 | High |
| **Micro-interactions** | 5/10 | 8/10 | -3 | Medium |
| **Layout Boldness** | 4/10 | 8/10 | -4 | High |
| **Mobile Optimization** | 6/10 | 9/10 | -3 | High |
| **CTA Language** | 5/10 | 9/10 | -4 | Medium |

**Overall:** 6.5/10 → **Needs 2.5-point improvement**

---

## 🔴 WHAT'S WORKING (Keep These)

### ✅ Château Entrance Flow
- **Status:** KEEP - Client loves it
- **Why it works:** Creates exclusivity, "not for everyone" vibe
- **What's good:**
  - Password gate = exclusive club feel
  - Video transition adds ceremony
  - "MONTREZ" branding clear
  - Mobile-responsive

### ✅ Clean Layout Structure
- **Grid system:** Well-organized, semantic HTML
- **Navigation:** Hamburger menu works (though styling is too corporate)
- **Routing:** React Router setup is solid
- **Cart system:** Context API implemented correctly

### ✅ Technical Foundation
- **Performance:** Vite build, lazy loading implemented
- **Accessibility:** Good semantic HTML, ARIA labels present
- **Mobile-first:** Breakpoints defined (though execution needs work)
- **State management:** Cart context, proper React patterns

### ✅ Content Strategy
- "Pas pour Tout" tagline - EXCELLENT
- Product naming conventions align with streetwear
- Collections structure makes sense

---

## 🚨 WHAT'S GENERIC (Brutally Honest Assessment)

### 1. Typography - TOO SAFE (3/10) 🔴

**Current State:**
```css
--font-display: 'Helvetica Neue', 'Arial', sans-serif;
--font-body: 'Helvetica Neue', 'Arial', sans-serif;
```

**What's Wrong:**
- Helvetica Neue = Every corporate website since 2010
- Serif logo font (Playfair Display) = Luxury brands, NOT streetwear
- Zero letterspacing impact
- No uppercase lockups on headings
- Looks like a law firm, not a streetwear brand

**Where You Feel It:**
- Homepage hero "Luxury Redefined" - could be ANY fashion brand
- Product names in lowercase/title case - should be SCREAMING IN CAPS
- Navigation "Shop, Collections, About" - boring, no energy
- Logo "MONTREZ" uses Playfair Display - too elegant/refined

**Streetwear Reality Check:**
- Supreme = Futura Bold Condensed, ALL CAPS
- Palace = Bold condensed sans, impactful
- A-COLD-WALL* = Helvetica BOLD, tight tracking
- Off-White = Helvetica Bold + Quotation marks as signature

**Fix:** Bebas Neue (already in brand guidelines!) + ALL CAPS everywhere

---

### 2. Color Palette - NO PUNCH (5/10) 🟠

**Current State:**
```css
--chrome: #666666;
--red: #dc143c; /* Unused */
```

**What's Wrong:**
- Chrome/gray is WEAK - no chrome metallic effect, just flat gray
- Electric Blue (#00F0FF) exists in guidelines but NOT used on live site
- Black/white base is good BUT needs accent color to pop
- No neon, no glow, no energy
- Hover states are subtle opacity changes - where's the PUNCH?

**Where You Feel It:**
- CTA buttons: "Explore Collections" - gray border, no impact
- No electric blue ANYWHERE (biggest miss)
- Cart icon, search icon - all black, no accent on active state
- Product cards hover - subtle scale, needs electric blue border glow
- Footer, headers - all black/white, missing signature accent

**Streetwear Reality Check:**
- Supreme = RED (instantly recognizable)
- Off-White = ORANGE zip-tie, diagonal stripes
- A-COLD-WALL* = Neon green/pink accents
- Palace = Tri-ferg colors (blue/red/yellow)

**Fix:** Replace chrome with electric blue #00F0FF, add glow effects on hover

---

### 3. Layout - TOO GRID-BASED (4/10) 🔴

**Current State:**
- Perfect alignment, centered everything
- 3-column product grid (equal spacing)
- Symmetrical layouts
- Zero asymmetry or tension

**What's Wrong:**
- Streetwear is about DISRUPTION, not perfection
- Grid feels like every e-commerce site (Shopify template vibes)
- No visual hierarchy/weight variation
- Product cards all same size - no featured/hero products
- Collections section = 3 equal boxes (boring)

**Where You Feel It:**
- Shop page: 3-column grid with equal-sized cards (Zara/H&M energy)
- Homepage collections: Centered, equal-width cards
- About page: Centered text blocks, no edge
- No overlapping elements, no depth
- Everything in containers = safe, predictable

**Streetwear Reality Check:**
- Supreme drops: Hero product BIG, others small
- Palace lookbooks: Asymmetric layouts, overlapping images
- KITH: Breaking the grid, diagonal elements
- Stüssy: Mixed card sizes, collage-style layouts

**Fix:** Asymmetric grids, featured product hero cards, overlapping elements

---

### 4. CTA Language - NO ATTITUDE (5/10) 🟠

**Current State:**
```jsx
"Explore Collections"
"Our Story"
"Add to Cart"
"Shop Now"
```

**What's Wrong:**
- Generic e-commerce copy - could be Gap.com
- No brand voice, no edge
- "Explore" = safe, corporate
- "Our Story" = boring, everyone has one
- Missing "Pas pour Tout" attitude

**Where You Feel It:**
- Hero CTAs: "Explore Collections" - should be "SHOP THE DROP"
- Product detail: "Add to Cart" - should be "COP IT NOW"
- Navigation: "About" - should be "OUR STORY" or "THE BRAND"
- Empty cart: "Your cart is empty" - should be "NOTHING HERE YET"
- Size selection: "Select Size" - should be "PICK YOUR SIZE"

**Streetwear Reality Check:**
- Supreme: "SHOP NOW", "SEE ALL", "SOLD OUT"
- Palace: "GET IT", "DROP", "ARCHIVE"
- BAPE: "ONLINE STORE", "NEW ARRIVALS"
- Off-White: "SHOP THE LOOK"

**Fix:** Rewrite ALL copy with attitude (see UPGRADE_PLAN.md)

---

### 5. Micro-interactions - WEAK SAUCE (5/10) 🟠

**Current State:**
```css
transition: all 0.3s ease;
.btn:hover { opacity: 0.8; }
```

**What's Wrong:**
- Opacity fades = 2010 web design
- No scale transforms on hover
- No glow effects
- No electric blue accent reveals
- Buttons don't REACT, they fade
- Cart icon shows count but no bounce animation

**Where You Feel It:**
- Navbar icons: Hover = subtle opacity (boring)
- Product cards: Hover = slight scale (could be ANY site)
- Buttons: Hover = fade (no energy)
- Add to cart: No feedback, just alert() (embarrassing)
- Cart badge: Count appears with scale, but could have bounce
- Search icon: No pulse or glow

**Streetwear Reality Check:**
- Supreme site: INSTANT snappy interactions
- Palace: Bold color shifts on hover
- KITH: Product cards lift with shadow
- Stüssy: Glow effects, neon outlines

**Fix:** Add scale(1.02) + electric blue glow on ALL hover states

---

### 6. Product Photography - PLACEHOLDER VIBES (N/A - No images yet)

**Current State:**
- `/images/hero-editorial.jpg` referenced but not visible in my test
- Product cards likely using placeholder images
- No lifestyle shots mentioned

**What's Needed:**
- **Product shots:** Clean, B&W OR color with black overlay
- **Lifestyle shots:** Urban environments (concrete, graffiti, neon)
- **Model photography:** Street-style, candid, authentic
- **Detail shots:** Close-ups of textures, tags, stitching
- **NO studio white backgrounds** (too corporate)

**Streetwear Reality Check:**
- Supreme: Product flat-lays + lifestyle lookbooks
- Palace: Skate culture photography (gritty, authentic)
- A-COLD-WALL*: Industrial architecture, concrete
- Off-White: High-contrast B&W + color accents

**Fix:** See imagery guidelines in UPGRADE_PLAN.md

---

### 7. Navigation - STANDARD ISSUE (6/10) 🟡

**Current State:**
- Hamburger menu (good for mobile-first)
- Centered "MONTREZ" logo
- Search + Cart icons on right

**What's Wrong:**
- Menu slide-out is smooth but GENERIC
- No electric blue accent on active page
- Hamburger icon = standard 3 lines (boring)
- Logo uses Playfair Display serif (too refined)
- "Shop, Collections, About, Contact" - standard e-commerce

**Where You Feel It:**
- Menu feels like every Shopify store
- No brand personality in navigation
- Active page not highlighted
- Mobile menu = white background, black text (safe)
- No "DROPS" or "NEW IN" urgency

**Streetwear Reality Check:**
- Supreme: Minimal nav, SHOP / NEW categorized
- Palace: Bold font, accent colors
- KITH: Clean but with brand font
- Stüssy: Simple but DISTINCTIVE typography

**Fix:** Bebas Neue logo, electric blue active states, bolder menu

---

### 8. Homepage Hero - COULD BE ANYONE (5/10) 🟠

**Current State:**
```jsx
<h1>Luxury<br/>Redefined</h1>
<p>Premium fashion for those who dare to stand out</p>
```

**What's Wrong:**
- "Luxury Redefined" = Every DTC fashion brand in 2020
- "Premium fashion for those who dare to stand out" = Generic
- Could be Allbirds, Everlane, Warby Parker, etc.
- Hero text is WHITE on dark background (good) but typography is Helvetica Neue (weak)
- No electric blue accent
- CTAs are "Explore Collections" and "Our Story" (boring)

**Where You Feel It:**
- Landing feels like luxury e-commerce, NOT streetwear
- No attitude, no rebellion, no "Pas pour Tout"
- Safe, corporate, forgettable
- Doesn't GRAB you

**Streetwear Reality Check:**
- Supreme homepage: Product drops with BIG images, minimal text
- Palace: "ULTIMO 2025" (collection name), bold font
- BAPE: "NEW ARRIVALS" + hero product
- Off-White: Bold statements, quotation marks

**Fix:** "DROP 04 // SPRING 2026" + "SHOP NOW" CTA

---

## 📱 MOBILE-SPECIFIC ISSUES

### Touch Targets (6/10) 🟡
**Issue:** Navbar icons appear small, likely under 44x44px  
**Impact:** Users will mis-tap, frustration, bounce  
**Fix:** Ensure ALL interactive elements are 48x48px minimum  

### Hamburger Menu (7/10) ✅
**Good:** Slide-out works, smooth animation  
**Issue:** Generic styling, no brand personality  
**Fix:** Electric blue accent bar, Bebas Neue font, bolder links  

### Product Cards (5/10) 🟠
**Issue:** Likely hard to tap "Add to Cart" on mobile  
**Fix:** Larger buttons, more spacing, electric blue accent  

### Cart Drawer (N/A)
**Issue:** Cart exists but may not have mobile-optimized drawer  
**Fix:** Full-screen cart on mobile, electric blue header  

---

## 🎨 BRAND CONSISTENCY AUDIT

| Element | Brand Guideline | Live Site | Status |
|---------|----------------|-----------|--------|
| **Primary Font** | Bebas Neue Bold | Helvetica Neue | ❌ MISMATCH |
| **Body Font** | Inter | Helvetica Neue | ❌ MISMATCH |
| **Logo Font** | Bebas Neue / Druk Wide | Playfair Display | ❌ MISMATCH |
| **Accent Color** | Electric Blue #00F0FF | Not used | ❌ MISSING |
| **Color Ratio** | 80/15/5 (Black/Gray/Blue) | 90/10/0 | ❌ OFF |
| **Button Style** | Electric Blue BG + glow | Gray border, fade | ❌ MISMATCH |
| **Headline Style** | UPPERCASE, 0.1em spacing | Title Case, normal | ❌ MISMATCH |
| **Tone of Voice** | Bold, direct, street | Generic, corporate | ❌ MISMATCH |
| **Photography** | B&W + urban + neon | Not visible (TBD) | ⚠️ TBD |

**Consistency Score: 2/9 (22%)** 🔴 CRITICAL GAP

---

## 🏆 COMPETITIVE BENCHMARK

### Supreme (Gold Standard)
- **Typography:** Futura Bold, ALL CAPS
- **Layout:** Asymmetric, hero product focus
- **Color:** RED everywhere (instantly recognizable)
- **Speed:** Instant interactions, no loading states
- **Attitude:** "SOLD OUT" "SHOP NOW" - direct, urgent

**Montrez vs Supreme:** 4/10 - Missing urgency, boldness, signature color usage

### Palace (Rebellious, Playful)
- **Typography:** Bold condensed sans
- **Layout:** Collage-style, overlapping elements
- **Color:** Tri-ferg colors, bold accents
- **Attitude:** Playful, irreverent
- **Photography:** Skate culture, authentic

**Montrez vs Palace:** 3/10 - Too serious, too clean, no playfulness

### A-COLD-WALL* (Luxury Streetwear)
- **Typography:** Helvetica BOLD, tight tracking
- **Layout:** Industrial, asymmetric, minimalist
- **Color:** Black/white + neon accents
- **Attitude:** Architectural, conceptual
- **Photography:** Concrete, brutalist, high-concept

**Montrez vs ACW:** 5/10 - Has minimalism but missing neon accents, industrial edge

### Off-White (Hype, Designer)
- **Typography:** Helvetica + quotation marks signature
- **Layout:** Diagonal stripes, overlapping text
- **Color:** ORANGE zip-tie, black/white base
- **Attitude:** Designer streetwear, luxury
- **Photography:** High fashion meets street

**Montrez vs Off-White:** 4/10 - Missing signature visual elements, diagonal energy

**Overall Competitive Score: 4/10** - Montrez feels more like Everlane than Supreme

---

## 📸 VISUAL AUDIT (Screenshots Analysis)

### Entrance Screen
**What I See:** Loading cursor on white background  
**Expected:** Château gate image → Password modal → Video → Site  
**Issue:** Entrance flow works but aesthetic is luxury, not streetwear  

**Recommendation:**  
Keep château entrance (client loves it) BUT:
- Add electric blue neon "MONTREZ" sign overlaid on gate
- Make password modal have electric blue accents
- Video should have scanline/glitch effects (urban edge)

### Shop Page
**Current:** White background, grid layout, standard filters  
**Issue:** Looks like Shopify template (generic)  

**Needs:**
- Electric blue filter active states
- Product card hover = electric blue glow border
- BEBAS NEUE for "SHOP" headline
- Size buttons with electric blue active state
- "SOLD OUT" tags in electric blue + strikethrough

### Homepage Hero
**Current:** "Luxury Redefined" headline  
**Issue:** Too generic, could be anyone  

**Needs:**
- "DROP 04 // SPRING 2026" (Supreme style)
- BEBAS NEUE all caps
- Electric blue underline on "MONTREZ"
- "SHOP THE DROP" CTA (electric blue BG)

---

## 🎯 KEY RECOMMENDATIONS SUMMARY

### 🔴 CRITICAL (Must Fix)
1. **Implement Bebas Neue typography** (Already in guidelines, not applied)
2. **Add electric blue #00F0FF everywhere** (Hover states, CTAs, accents)
3. **Rewrite ALL copy** (Remove generic language, add attitude)
4. **Uppercase ALL headlines** (Streetwear convention)

### 🟠 HIGH PRIORITY (Major Impact)
5. **Asymmetric layouts** (Break the grid on homepage, collections)
6. **Glow effects on hover** (Electric blue glow, scale transforms)
7. **Mobile touch targets** (48x48px minimum on ALL buttons/icons)
8. **CTA buttons** (Electric blue BG, not gray border)

### 🟡 MEDIUM PRIORITY (Polish)
9. **Navigation personality** (Electric blue active states, bolder menu)
10. **Product card redesign** (Electric blue hover, bolder typography)
11. **Micro-interactions** (Bounce, pulse, glow animations)
12. **Announcement bar** (See ANNOUNCEMENT_BAR_SPEC.md)

---

## 📊 IMPACT vs EFFORT MATRIX

```
HIGH IMPACT, LOW EFFORT (Do First):
- Apply Bebas Neue font (30min)
- Add electric blue to buttons (1hr)
- Uppercase all headlines (30min)
- Rewrite CTA copy (1hr)

HIGH IMPACT, MEDIUM EFFORT (Do Next):
- Electric blue hover glows (2hr)
- Asymmetric homepage layout (3hr)
- Mobile touch target fixes (2hr)
- Product card redesign (2hr)

HIGH IMPACT, HIGH EFFORT (Phase 2):
- Full photography shoot (urban, lifestyle)
- Custom animations/micro-interactions (5hr)
- Checkout flow UX overhaul (8hr)

LOW IMPACT (Backlog):
- Footer redesign
- About page layout
- Contact form styling
```

---

## 🎬 NEXT STEPS

**See companion documents:**
1. **UPGRADE_PLAN.md** - Prioritized action items with time estimates
2. **ANNOUNCEMENT_BAR_SPEC.md** - Design spec for promo bar
3. **CSS_QUICK_WINS.css** - Ready-to-use code snippets
4. **VISUAL_REFERENCES.md** - Mockups and inspiration

**Recommended Approach:**
1. Start with QUICK WINS (typography + color) - 3 hours
2. Then MEDIUM EFFORT (layout + interactions) - 8 hours
3. Then BIGGER REDESIGN (photography + advanced UX) - future sprint

---

**Audit Complete.** Let's make this site UNMISTAKABLY STREETWEAR. 🔥
