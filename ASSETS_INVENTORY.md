# MONTREZ ASSETS INVENTORY

## Logo Files ✅ COMPLETE

### Location: `public/images/logo/`

| File | Size | Format | Usage |
|------|------|--------|-------|
| `montrez-logo-512.png` | 512x512 | PNG (transparent) | High-res web, print, large displays |
| `montrez-logo-256.png` | 256x256 | PNG (transparent) | Social avatars, favicons, medium UI |
| `montrez-logo-128.png` | 128x128 | PNG (transparent) | Navigation, small UI elements |
| `montrez-logo-64.png` | 64x64 | PNG (transparent) | Tiny UI, app icons |

**Processing Details:**
- ✅ Background removed (transparent PNG)
- ✅ Tight crop (stars-château-wordmark)
- ✅ Aspect ratio preserved (~3:4 vertical)
- ✅ High-quality LANCZOS resampling

---

## Photography Assets

### Source Files (Provided)

#### file_421: Château Gate (Landing Page)
**Location:** `C:\Users\isaac\.openclaw\media\inbound\file_421---189d6da7-29e2-433d-89c3-0eac53601f3d.jpg`

**Description:**
- B&W image of Château de Chambord gate
- High contrast, editorial
- Perfect for landing page background

**Recommended Usage:**
- Landing page hero background
- Apply: `.filter-bw-editorial`, `.effect-film-grain`

**Destination:** `public/images/editorial/landing-gate.jpg`

---

#### file_423: T-Shirt Product Shot (Studio Dark)
**Location:** `C:\Users\isaac\.openclaw\media\inbound\file_423---b935560b-d5b0-463c-8340-b3d6cb20af66.jpg`

**Description:**
- Seated model, back view
- Black t-shirt with oval back graphic
- Low-key lighting, desaturated
- Leather chair, industrial setting

**Style:** Studio Dark mode (see DESIGN_SYSTEM_GUIDE.md)

**Recommended Usage:**
- Product lookbook
- About page "Our Aesthetic" section
- Instagram feed

**Destination:** `public/images/editorial/lookbook-01.jpg`

**CSS Treatment:**
```css
filter: saturate(0.2) contrast(0.9) brightness(0.85);
```

---

#### file_424: Campaign Shot (Editorial Raw)
**Location:** `C:\Users\isaac\.openclaw\media\inbound\file_424---6fd4af25-1344-4ff4-a924-f4c381ea7bec.jpg`

**Description:**
- Front-facing model, faceless (hood obscures face)
- Studded hood, embroidered jacket
- Mercedes-AMG in background
- Natural daylight, full B&W
- Film grain visible

**Style:** Editorial Raw mode (see DESIGN_SYSTEM_GUIDE.md)

**Recommended Usage:**
- Homepage hero
- About page "Heritage" section
- Campaign banners

**Destination:** `public/images/editorial/campaign-01.jpg`

**CSS Treatment:**
```css
filter: grayscale(100%) contrast(1.15) brightness(0.95);
```

**Plus:**
```html
<div class="effect-film-grain">
  <img src="campaign-01.jpg" />
</div>
```

---

### Product Images ⏳ TO BE SCRAPED

**Source:** montrezofficial.com

**Products to Scrape:**
1. MONTREZ "SPEAK NO EVIL" GRAPHIC T-SHIRT - $600 USD
2. MONTREZ "ARMY 74" SHORTS - $1,000 USD
3. MONTREZ "MONEY" GRAPHIC T-SHIRT - $600 USD
4. MONTREZ ARCHITECT ZIP HOODIE - BLACK - $1,500 USD
5. MONTREZ ARCHITECT ZIP HOODIE - OFF-WHITE - $1,500 USD
6. MONTREZ ARCHIVE JACKET - $1,400 USD
7. MONTREZ ARMY SWEATPANTS - $800 USD
8. MONTREZ DAZZLED LOGO SHORTS - $1,000 USD

**Scraping Requirements:**
- Extract highest resolution available
- Download all product angles (front, back, detail shots)
- Maintain original filenames for reference
- Apply consistent B&W filter (`.filter-bw-editorial`)

**Destination Structure:**
```
public/images/products/
  ├── speak-no-evil-tshirt/
  │   ├── front.jpg
  │   ├── back.jpg
  │   └── detail.jpg
  ├── army-74-shorts/
  │   ├── front.jpg
  │   └── back.jpg
  ├── architect-hoodie-black/
  │   ├── front.jpg
  │   ├── back.jpg
  │   └── detail.jpg
  └── [other products...]
```

**Image Specs:**
- Format: JPG (optimized)
- Max width: 1200px
- Aspect ratio: 3:4 (product cards)
- Compression: 85% quality

---

## Video Assets

### Video Intro (Existing)
**Description:** Kling AI video - Château gates opening

**Specs:**
- Duration: 5 seconds
- Format: MP4 (assumed)
- Usage: Entrance flow (after password/email)

**Location:** ⏳ TO BE PROVIDED

**Integration:**
- Auto-play on modal close (successful login)
- Skip button after 2s (btn-minimal, top-right)
- Progress bar at bottom (chrome)
- Auto-advance to main site after 5s

**Destination:** `public/videos/intro.mp4`

---

## Design System Files ✅ COMPLETE

### CSS
**File:** `design-system.css`  
**Status:** ✅ COMPLETE

**Contents:**
- Color palette variables
- Typography system (scale, weights, families)
- Spacing system (base 4px)
- Button components (primary, secondary, minimal)
- Input components (standard, minimal)
- Card components (product, content)
- Navigation system (desktop, mobile hamburger)
- Animation system (keyframes, timing, utilities)
- Effects & filters (film grain, B&W, chrome shimmer)
- Utility classes
- Responsive helpers
- Accessibility styles

### Documentation
**File:** `DESIGN_SYSTEM_GUIDE.md`  
**Status:** ✅ COMPLETE

**Contents:**
- Brand aesthetic pillars
- Logo system usage
- Color system rules
- Typography hierarchy
- Spacing guidelines
- Component specifications
- Photography guidelines
- Animation principles
- Responsive breakpoints
- Accessibility standards
- Implementation examples

**File:** `UI_IMPROVEMENTS.md`  
**Status:** ✅ COMPLETE

**Contents:**
- Detailed UI improvement specs
- Before/after comparisons
- Entrance flow mockups
- Navigation enhancements
- Product grid improvements
- Typography hierarchy
- Animation sequences
- Mobile optimizations
- Loading states
- Accessibility enhancements

---

## Icon Assets ⏳ TO BE ADDED

### Navigation Icons
**Needed:**
- Search icon (magnifying glass)
- Account icon (user silhouette)
- Cart icon (shopping bag)
- Hamburger icon (handled by CSS - no asset needed)

**Style:** Minimal line icons, 24x24px, white stroke

**Recommended:** Use Feather Icons or Heroicons
- https://feathericons.com/
- https://heroicons.com/

**Destination:** `public/images/icons/`

---

## Font Assets

### Display Font (Serif)
**Primary:** Playfair Display  
**Source:** Google Fonts  
**Weights:** 600 (Semibold), 700 (Bold), 900 (Black)  
**Link:** `https://fonts.google.com/specimen/Playfair+Display`

**Alternative:** Bodoni Moda  
**Link:** `https://fonts.google.com/specimen/Bodoni+Moda`

### Body Font (Sans-Serif)
**Primary:** Inter  
**Source:** Google Fonts  
**Weights:** 400 (Regular), 500 (Medium), 600 (Semibold)  
**Link:** `https://fonts.google.com/specimen/Inter`

### Script Font (Accent)
**Primary:** Allura  
**Source:** Google Fonts  
**Weights:** 400 (Regular)  
**Link:** `https://fonts.google.com/specimen/Allura`

**Usage:** "Pas pour Tout" tagline only

### Font Loading
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;900&family=Inter:wght@400;500;600&family=Allura&display=swap" rel="stylesheet">
```

---

## Missing Assets (TODO)

### Priority 1 (Blocking)
1. ⏳ Product images (8 products, ~24 images total)
2. ⏳ Video intro file (`intro.mp4`)
3. ⏳ Navigation icons (search, account, cart)

### Priority 2 (Nice-to-Have)
4. ⏳ Favicon (generated from logo-64.png)
5. ⏳ OG image (social sharing, 1200x630)
6. ⏳ Apple touch icon (180x180)
7. ⏳ Additional editorial/hero images (for homepage sections)

### Priority 3 (Future)
8. ⏳ Oval badge variant (from garment photos)
9. ⏳ Monogram "M" (separate asset)
10. ⏳ Instagram feed images (API integration or static)

---

## Asset Processing Workflow

### For Frontend Agent:

#### Step 1: Copy Editorial Assets
```bash
# Landing gate
cp "C:\Users\isaac\.openclaw\media\inbound\file_421---189d6da7-29e2-433d-89c3-0eac53601f3d.jpg" public/images/editorial/landing-gate.jpg

# Lookbook
cp "C:\Users\isaac\.openclaw\media\inbound\file_423---b935560b-d5b0-463c-8340-b3d6cb20af66.jpg" public/images/editorial/lookbook-01.jpg

# Campaign
cp "C:\Users\isaac\.openclaw\media\inbound\file_424---6fd4af25-1344-4ff4-a924-f4c381ea7bec.jpg" public/images/editorial/campaign-01.jpg
```

#### Step 2: Optimize Images
```bash
# Use sharp, imagemagick, or similar
# Target: 85% quality, max-width 1200-1920px
```

#### Step 3: Scrape Product Images
```javascript
// Scraper script needed
// Target: montrezofficial.com product pages
// Output: public/images/products/[product-name]/[angle].jpg
```

#### Step 4: Generate Favicons
```bash
# From logo-256.png, generate:
# - favicon.ico (16x16, 32x32)
# - apple-touch-icon.png (180x180)
# - og-image.png (1200x630)
```

---

## Asset Checklist

### Completed ✅
- [x] Logo files (4 sizes, transparent PNG)
- [x] Design system CSS
- [x] Documentation (DESIGN_SYSTEM_GUIDE.md)
- [x] UI improvements spec (UI_IMPROVEMENTS.md)
- [x] Asset inventory (this file)

### In Progress ⏳
- [ ] Product images (scraping)
- [ ] Editorial images (copy + optimize)
- [ ] Navigation icons
- [ ] Video intro file
- [ ] Favicons generation

### Blocked ⚠️
- None currently

---

## File Size Guidelines

| Asset Type | Max Size | Format | Compression |
|------------|----------|--------|-------------|
| Logo | 250KB | PNG | Lossless |
| Product images | 150KB | JPG | 85% |
| Hero images | 300KB | JPG | 85% |
| Editorial images | 200KB | JPG | 85% |
| Video intro | 5MB | MP4 | H.264 |
| Icons | 5KB | SVG or PNG | Optimized |

---

## Next Actions (Frontend Agent)

1. **Copy editorial assets** to `public/images/editorial/`
2. **Scrape product images** from montrezofficial.com
3. **Download navigation icons** (Feather/Heroicons)
4. **Generate favicons** from logo-256.png
5. **Integrate assets** into components
6. **Test all image paths** (broken image audit)
7. **Optimize performance** (lazy loading, WebP conversion)

---

**Assets Inventory Status:** ✅ COMPLETE  
**Logo Processing:** ✅ DONE  
**Next Step:** Frontend agent to scrape product images and integrate assets
