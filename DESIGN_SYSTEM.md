# Montrez Design System - Shop & Collections

**Premium Fashion E-commerce Styling Reference**

---

## Color Palette

```css
/* Backgrounds */
--bg-primary: #FAFAF8;        /* Warm off-white */
--bg-card: #FFFFFF;           /* Pure white cards */
--bg-hover: rgba(0,0,0,0.02); /* Subtle hover */

/* Text */
--text-primary: #000000;              /* Headings, prices */
--text-secondary: rgba(0,0,0,0.7);    /* Body text */
--text-tertiary: rgba(0,0,0,0.5);     /* Labels, counts */
--text-quaternary: rgba(0,0,0,0.4);   /* Subtle text */

/* Borders */
--border-light: rgba(0,0,0,0.05);     /* Card borders */
--border-default: rgba(0,0,0,0.08);   /* Dividers */
--border-medium: rgba(0,0,0,0.12);    /* Input borders */
--border-dark: rgba(0,0,0,0.15);      /* Hover borders */

/* Accents */
--accent-black: #000000;              /* CTA buttons */
--accent-hover: rgba(0,0,0,0.9);      /* Button hover */
```

---

## Typography

### Font Families
```css
--font-display: 'Bebas Neue', sans-serif;  /* Headings, titles */
--font-body: 'Inter', sans-serif;          /* Body text, labels */
```

### Font Sizes
```css
/* Page Titles */
--fs-hero: clamp(2.5rem, 6vw, 4rem);       /* Shop/Collections titles */
--fs-page-title: clamp(2.5rem, 5vw, 3.5rem);

/* Section Titles */
--fs-section: 1.75rem;                     /* Collection names */
--fs-subsection: 1.25rem;                  /* Card titles */

/* Body Text */
--fs-body-lg: 0.938rem;                    /* Descriptions */
--fs-body: 0.875rem;                       /* Standard text */
--fs-body-sm: 0.813rem;                    /* Labels, prices */
--fs-caption: 0.75rem;                     /* Small labels */

/* Product Cards */
--fs-product-name: 1rem;
--fs-product-price: 0.938rem;
--fs-quick-view: 0.813rem;
```

### Font Weights
```css
--fw-light: 300;      /* Large headings */
--fw-regular: 400;    /* Display font */
--fw-medium: 500;     /* Active states */
--fw-semibold: 600;   /* Buttons, prices */
```

### Letter Spacing
```css
--ls-wide: 0.15em;    /* Page titles */
--ls-medium: 0.1em;   /* Buttons, labels */
--ls-default: 0.08em; /* Card titles */
--ls-tight: 0.02em;   /* Body text */
--ls-none: 0.01em;    /* Prices, descriptions */
```

---

## Spacing System

### Padding Scale
```css
/* Section Padding */
--pad-section-lg: 80px;   /* Desktop */
--pad-section-md: 60px;   /* Tablet */
--pad-section-sm: 50px;   /* Mobile */

/* Card Padding */
--pad-card-lg: 2rem;      /* Sidebar */
--pad-card-md: 1.75rem;   /* Collection cards */
--pad-card-sm: 1.25rem;   /* Product info */
--pad-card-xs: 1rem;      /* Mobile cards */

/* Component Padding */
--pad-btn: 0.75rem 2rem;
--pad-input: 0.625rem 1rem;
--pad-filter: 0.75rem 0.5rem;
```

### Gap System
```css
/* Grid Gaps */
--gap-grid-lg: 24px;      /* Desktop product grid */
--gap-grid-md: 20px;      /* Tablet/collections */
--gap-grid-sm: 16px;      /* Mobile */

/* Component Gaps */
--gap-section: 60px;      /* Between sections */
--gap-element: 1rem;      /* Between elements */
--gap-tight: 0.5rem;      /* Breadcrumbs, labels */
```

### Margins
```css
/* Section Margins */
--margin-section: 60px;
--margin-section-md: 40px;
--margin-section-sm: 30px;

/* Component Margins */
--margin-header: 3rem;
--margin-toolbar: 2rem;
--margin-card: 1.25rem;
```

---

## Grid Systems

### Shop Page
```css
/* Desktop: Sidebar + Products */
grid-template-columns: 260px 1fr;
gap: 60px;

/* Tablet */
grid-template-columns: 220px 1fr;
gap: 30px;

/* Mobile */
grid-template-columns: 1fr;
```

### Product Grid
```css
/* Desktop: 4 columns */
grid-template-columns: repeat(4, 1fr);
gap: 24px;

/* Laptop: 3 columns */
@media (max-width: 1200px) {
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* Tablet: 2 columns */
@media (max-width: 1024px) {
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

/* Mobile: 1 column */
@media (max-width: 768px) {
  grid-template-columns: 1fr;
  gap: 16px;
}
```

### Collections Grid
```css
/* Desktop: 4 columns */
grid-template-columns: repeat(4, 1fr);
gap: 20px;

/* 1200px: 3 columns */
grid-template-columns: repeat(3, 1fr);

/* 1024px: 2 columns */
grid-template-columns: repeat(2, 1fr);

/* 768px: 1 column */
grid-template-columns: 1fr;
gap: 16px;
```

---

## Shadows

```css
/* Cards */
--shadow-card-rest: 0 2px 8px rgba(0,0,0,0.02);
--shadow-card-hover: 
  0 4px 12px rgba(0,0,0,0.08),
  0 8px 24px rgba(0,0,0,0.06);

/* Product Cards */
--shadow-product-hover:
  0 4px 12px rgba(0,0,0,0.08),
  0 8px 24px rgba(0,0,0,0.06);

/* Buttons */
--shadow-button: 0 4px 16px rgba(0,0,0,0.25);
--shadow-tab: 0 2px 8px rgba(0,0,0,0.15);
```

---

## Transitions

### Timing Functions
```css
/* Premium Easing */
--ease-premium: cubic-bezier(0.4, 0, 0.2, 1);

/* Duration */
--duration-fast: 0.2s;    /* Buttons, hovers */
--duration-medium: 0.3s;  /* Card lifts */
--duration-slow: 0.6s;    /* Image zoom */
```

### Common Transitions
```css
/* Card Hover */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Image Zoom */
transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);

/* Button Hover */
transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

/* Border/Color */
transition: color 0.2s ease, border-color 0.2s ease;
```

---

## Hover States

### Product Cards
```css
/* Lift & Shadow */
transform: translateY(-4px);
box-shadow: 
  0 4px 12px rgba(0,0,0,0.08),
  0 8px 24px rgba(0,0,0,0.06);
border-color: rgba(0,0,0,0.15);

/* Image Zoom */
.product-card__image {
  transform: scale(1.06);
}
```

### Collection Cards
```css
/* Lift & Shadow */
transform: translateY(-4px);
box-shadow: 0 8px 24px rgba(0,0,0,0.08);
border-color: rgba(0,0,0,0.15);

/* Image Zoom */
.collection-card__image {
  transform: scale(1.08);
}

/* Overlay */
.collection-card__overlay {
  opacity: 1;
}
```

### Buttons
```css
/* Primary Button (Black) */
background: rgba(0,0,0,0.9);
transform: translateY(-2px);
box-shadow: 0 4px 16px rgba(0,0,0,0.25);

/* Load More Button */
background: #000;
color: #fff;
border-color: #000;
transform: translateY(-2px);
box-shadow: 0 4px 12px rgba(0,0,0,0.15);
```

---

## Responsive Breakpoints

```css
/* Large Desktop */
@media (min-width: 1200px) {
  /* 4 columns, max spacing */
}

/* Desktop/Laptop */
@media (max-width: 1199px) {
  /* 3-4 columns, reduced spacing */
}

/* Tablet */
@media (max-width: 1024px) {
  /* 2-3 columns, sidebar adjustments */
}

/* Mobile */
@media (max-width: 768px) {
  /* 1-2 columns, stacked layout */
}

/* Small Mobile */
@media (max-width: 480px) {
  /* 1 column, minimal spacing */
}
```

---

## Component-Specific Values

### Breadcrumbs
```css
font-size: 0.813rem;
letter-spacing: 0.02em;
gap: 0.5rem;
margin-bottom: 2rem;
```

### Filter Sidebar
```css
width: 260px;
padding: 2rem 1.5rem;
background: #fff;
border: 1px solid rgba(0,0,0,0.08);
position: sticky;
top: 120px;
```

### Product Card Image
```css
aspect-ratio: 4/5;
padding-bottom: 125%;
object-fit: cover;
background: #f5f5f5;
```

### Quick View Button
```css
background: #000;
color: #fff;
padding: 0.75rem 2rem;
font-size: 0.813rem;
letter-spacing: 0.1em;
min-height: 44px;
```

---

## Usage Examples

### Page Title
```css
.shop__title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 300;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-family: var(--font-display);
}
```

### Product Card
```css
.product-card {
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover {
  border-color: rgba(0,0,0,0.15);
  transform: translateY(-4px);
  box-shadow: 
    0 4px 12px rgba(0,0,0,0.08),
    0 8px 24px rgba(0,0,0,0.06);
}
```

### Filter Button
```css
.shop__filter-btn {
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  padding: 0.75rem 0.5rem;
  font-size: 0.875rem;
  letter-spacing: 0.02em;
}

.shop__filter-btn.active {
  color: #000;
  font-weight: 500;
  border-bottom-color: #000;
  border-bottom-width: 2px;
}
```

---

**Reference:** Inspired by Ssense, END. Clothing, Mr Porter, Net-a-Porter  
**Updated:** 2026-03-25  
**Status:** Production Ready ✅
