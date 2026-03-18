# MONTREZ SITE - Content & Copy Implementation Guide

## 📦 Deliverables Overview

All content has been created and is ready for frontend implementation. This guide explains how to use each file.

---

## 🗂️ Files Created

### 1. **products.json** - Product Data
Complete product catalog with all 8 confirmed products.

**Structure:**
```json
{
  "products": [
    {
      "id": "unique-slug",
      "sku": "MNTRZ-XXX-XXX",
      "name": "Product Name",
      "price": 600,
      "currency": "USD",
      "category": "Category",
      "description": "2-3 sentence compelling description",
      "sizes": ["S", "M", "L", "XL"],
      "images": ["/products/image1.jpg", "/products/image2.jpg"],
      "inStock": true/false,
      "featured": true/false,
      "tags": ["tag1", "tag2"]
    }
  ]
}
```

**Implementation Notes:**
- **Image paths** are placeholders (`/products/...`). Replace with actual product images from montrezofficial.com or photoshoots.
- **Archive Jacket** is marked `"inStock": false` (sold out).
- **Featured** products (5 items) should appear on homepage.
- **Descriptions** are brand-voice compliant—use as-is.

**Usage Example (React):**
```jsx
import productsData from './products.json';

function ProductGrid() {
  return (
    <div>
      {productsData.products.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
```

---

### 2. **content-about.md** - About Page Copy

**Sections:**
1. **Main Content** (3 sections: The Château, Pas pour Tout, The Archive)
2. **Alternate Shorter Version** (if space-constrained)
3. **Key Messaging Points** (reference for consistency)

**Implementation:**
- Use **Main Content** for full About page (3-4 paragraphs).
- For mobile or condensed layouts, use **Alternate Shorter Version**.
- Typography: Keep it readable, elegant (serif headings, sans-serif body).

**Recommended Layout:**
```
[Hero Image: Château/gate B&W]
  ↓
[Section 1: The Château]
  ↓
[Section 2: Pas pour Tout]
  ↓
[Section 3: The Archive]
  ↓
[CTA: "Browse Collection"]
```

---

### 3. **content-homepage.md** - Homepage Copy

**Sections:**
1. **Hero Section** (5 headline options + subheadline + CTA)
2. **Featured Products Section** (headline + intro)
3. **Brand Statement Section** (headline + body + CTA)
4. **Collection Teaser** (headline + copy + CTA)
5. **Footer Callout**
6. **Microcopy** (navigation, buttons, loading states)

**Recommended Hero Headline:** *"PAS POUR TOUT"* (Primary)

**Implementation Flow:**
```
[Landing Gate Page] (see brief for entrance flow)
  ↓
[Password/Email Gate]
  ↓
[Video Intro]
  ↓
[HOMEPAGE]
  ├─ Hero: "PAS POUR TOUT" + CTA
  ├─ Featured Products: Grid of 5 featured items
  ├─ Brand Statement: "Built for the Few"
  ├─ Collection Teaser: Archive intro
  └─ Footer Callout: "Not for everyone. If you're here..."
```

**Key CTAs:**
- Primary: "Enter the Archive" (main CTA)
- Secondary: "Our Story" (About page)
- Shop: "Browse Collection" (Shop page)

---

### 4. **content-contact.md** - Contact Page Copy

**Sections:**
1. **Form Labels & Placeholders**
2. **Contact Information** (emails, social)
3. **Response Time Section**
4. **Form Validation Messages** (success, errors, loading)

**Implementation:**
- Use full form for professional feel OR minimal email-only for ultra-exclusive vibe.
- **Recommended:** Full form + direct email option.
- Response time: "24-48 hours (Mon-Fri)".

**Contact Form Fields:**
```
Name: [text input]
Email: [email input]
Subject: [text input or dropdown]
Message: [textarea]
[Submit Button: "Send Message"]
```

**Email Addresses:**
- General: `contact@montrezofficial.com`
- Press: `press@montrezofficial.com`

*(Note: Set up email forwarding or use form backend like Formspree/Resend)*

---

### 5. **seo-metadata.json** - SEO Meta Tags

**Structure:**
```json
{
  "global": { /* Site-wide defaults */ },
  "pages": {
    "home": { /* Homepage SEO */ },
    "shop": { /* Shop page SEO */ },
    "about": { /* About page SEO */ },
    "contact": { /* Contact page SEO */ },
    "product": { /* Dynamic product SEO with templates */ }
  },
  "structuredData": { /* JSON-LD for Google */ }
}
```

**Implementation (React Helmet example):**
```jsx
import { Helmet } from 'react-helmet';
import metadata from './seo-metadata.json';

function HomePage() {
  const pageMeta = metadata.pages.home;
  
  return (
    <>
      <Helmet>
        <title>{pageMeta.title}</title>
        <meta name="description" content={pageMeta.description} />
        <meta property="og:title" content={pageMeta.ogTitle} />
        <meta property="og:description" content={pageMeta.ogDescription} />
        <meta property="og:image" content={pageMeta.ogImage} />
        <link rel="canonical" href={pageMeta.canonicalUrl} />
      </Helmet>
      {/* Page content */}
    </>
  );
}
```

**Dynamic Product SEO:**
Use `titleTemplate` and replace placeholders:
```js
const productTitle = metadata.pages.product.titleTemplate
  .replace('{productName}', product.name);
```

**Structured Data:**
Include `structuredData.organization` and `structuredData.website` in site-wide `<head>`.

---

### 6. **microcopy.json** - UI Microcopy

Comprehensive collection of all UI text (buttons, labels, messages, etc.).

**Categories:**
- **buttons** (primary, secondary, states)
- **navigation** (menu, links)
- **products** (status, actions, details)
- **forms** (placeholders, labels, validation)
- **cart** (empty state, actions)
- **checkout** (steps, labels)
- **messages** (success, error, info)
- **authentication** (sign in, sign up, password)
- **filters** (filter/sort options)
- **footer** (tagline, copyright, links)
- **accessibility** (screen reader labels)
- **newsletter** (email signup)
- **specialMessages** (brand statements)

**Usage Example:**
```jsx
import copy from './microcopy.json';

function AddToCartButton() {
  return (
    <button>
      {loading ? copy.buttons.states.loading : copy.buttons.primary.addToCart}
    </button>
  );
}

function ErrorMessage({ type }) {
  return <p>{copy.messages.error[type]}</p>;
}
```

**Special Messages** (for brand moments):
```jsx
<p>{copy.specialMessages.notForEveryone}</p>
// → "Pas pour Tout. Not for everyone."

<p>{copy.specialMessages.limitedEdition}</p>
// → "Limited production. No reissues."
```

---

## 🎨 Brand Voice Guidelines

### Tone
- **Exclusive, mysterious, confident**
- Not arrogant, but selective
- "Not for everyone" = selective, not elitist

### Language
- **Simple but elevated**
- Short sentences
- Poetic but not flowery
- Direct, impactful

### French Touches
- **Subtle, not overdone**
- "Pas pour Tout" (tagline)
- Château imagery/references
- European luxury positioning

### Writing Style
- **Product descriptions:** 2-3 sentences max
- **Headlines:** Short, punchy (2-5 words ideal)
- **Body copy:** Paragraph max 4 sentences
- **CTAs:** Action-oriented, mysterious ("Enter the Archive" not "Shop Now")

---

## 📝 Content Implementation Checklist

### Homepage
- [ ] Hero headline: "PAS POUR TOUT"
- [ ] Hero CTA: "Enter the Archive"
- [ ] Featured products grid (5 products with `"featured": true`)
- [ ] Brand statement section
- [ ] Collection teaser
- [ ] Footer callout

### Shop Page
- [ ] Product grid (all 8 products)
- [ ] "Sold Out" badge on Archive Jacket (`"inStock": false`)
- [ ] Filter/sort UI (use microcopy.json filters)
- [ ] Product cards: image, name, price, status

### Product Pages
- [ ] Product name, price from products.json
- [ ] Description (from products.json)
- [ ] Size selector (from `sizes` array)
- [ ] "Add to Cart" or "Sold Out" button
- [ ] Image gallery (from `images` array)
- [ ] Related products (same category or tags)
- [ ] SEO meta tags (dynamic from seo-metadata.json)

### About Page
- [ ] Hero image (château/gate B&W)
- [ ] 3 content sections (The Château, Pas pour Tout, The Archive)
- [ ] CTA to Shop page
- [ ] SEO meta tags

### Contact Page
- [ ] Contact form (name, email, subject, message)
- [ ] Email addresses (general + press)
- [ ] Social links (Instagram, Twitter)
- [ ] Response time section
- [ ] Form validation messages (from microcopy.json)
- [ ] SEO meta tags

### Global Elements
- [ ] Navigation menu (Home, Shop, About, Contact)
- [ ] Hamburger menu (mobile)
- [ ] Search (placeholder: "Search the archive...")
- [ ] Cart icon
- [ ] Footer (tagline, copyright, links)
- [ ] Loading states (use microcopy.json messages)
- [ ] Error messages (use microcopy.json messages)

---

## 🖼️ Image Assets Needed

### Product Images
Replace placeholder paths in `products.json` with actual images:

**Required per product:**
- Front view
- Back view (if applicable)
- Detail shot (close-up of graphics/hardware)
- Lifestyle/worn shot (optional but recommended)

**Image specs:**
- Format: JPG or WebP
- Size: 1200x1500px minimum (portrait)
- Quality: High-res for zoom functionality
- Background: White or lifestyle setting (match montrezofficial.com style)

**Sourcing:**
1. Scrape from montrezofficial.com (if accessible)
2. Request from brand/client
3. Use photoshoot images if available

### Site Assets
- **Logo:** Cropped from `file_422` (transparent PNG)
- **OG Image:** 1200x630px for social sharing
- **Favicon:** 32x32px, 192x192px, 512x512px
- **Gate Image:** `file_421` (Château gate, B&W) for landing page

---

## 🔍 SEO Optimization

### Per-Page Meta Tags
All pages have pre-written SEO metadata in `seo-metadata.json`:
- Title (50-60 chars)
- Description (150-160 chars)
- OG tags (social sharing)
- Canonical URLs
- Keywords

### Structured Data (JSON-LD)
Include in `<head>`:
```html
<script type="application/ld+json">
  {/* Organization schema */}
  {/* Website schema */}
  {/* Product schema on product pages */}
</script>
```

### Image Alt Text
Use descriptive alt text:
```jsx
<img 
  src={product.images[0]} 
  alt={`${product.name} - Front view`}
/>
```

### Performance
- Lazy load images
- Optimize image sizes (WebP, responsive srcset)
- Minimize JavaScript bundles
- Use Next.js Image component (if using Next.js)

---

## 🚀 Next Steps for Frontend

1. **Set up project structure** (React + Vite recommended)
2. **Import content files** into `src/data/` or similar
3. **Create components** for each section
4. **Replace image placeholders** with actual product images
5. **Implement entrance flow** (gate → password → video → site)
6. **Style components** (TailwindCSS, match montrezofficial.com aesthetic)
7. **Test all copy** (check for typos, brand consistency)
8. **SEO implementation** (meta tags, structured data)
9. **Form functionality** (contact form backend)
10. **Deploy to Vercel**

---

## 📞 Questions?

If any copy needs adjustment or additional content is needed:
- Check brand voice guidelines above
- Refer to montrez-rebuild-brief.md
- Request clarification from content team

---

**Content created by:** content-creator subagent  
**Date:** March 18, 2026  
**Status:** ✅ Complete - Ready for frontend implementation
