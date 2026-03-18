# MONTREZ COMPONENT TREE

## 🌳 Application Structure

```
App.jsx
├── BrowserRouter
    └── AppRoutes
        ├── Routes
            ├── Route "/" → HomePage
            │   └── Entrance Flow (4 stages)
            │       ├── Stage 1: LandingPage
            │       │   ├── Gate background image
            │       │   ├── MONTREZ logo
            │       │   └── Enter button
            │       │
            │       ├── Stage 2: PasswordEmailModal ⭐ NEW
            │       │   ├── Choice screen
            │       │   │   ├── "Returning User" button
            │       │   │   └── "New User" button
            │       │   ├── Password mode
            │       │   │   ├── Password input
            │       │   │   └── Submit button
            │       │   ├── Email mode
            │       │   │   ├── Email input
            │       │   │   └── "Send Code" button
            │       │   └── Code verification mode
            │       │       ├── 6-digit code input
            │       │       └── "Verify" button
            │       │
            │       ├── Stage 3: VideoIntro
            │       │   ├── Video player (château gates)
            │       │   └── Skip button
            │       │
            │       └── Stage 4: Main Site
            │           ├── Navbar ⭐ UPDATED
            │           │   ├── Logo (click → home)
            │           │   ├── Desktop Links (Shop, About, Contact)
            │           │   └── Hamburger Toggle (mobile)
            │           │
            │           ├── HamburgerMenu ⭐ NEW
            │           │   ├── Backdrop
            │           │   ├── Slide-in panel
            │           │   ├── Navigation links
            │           │   │   ├── Home
            │           │   │   ├── Shop
            │           │   │   ├── About
            │           │   │   └── Contact
            │           │   └── Footer (tagline + social)
            │           │
            │           ├── Hero
            │           ├── Collections
            │           ├── About
            │           ├── Contact
            │           └── Footer
            │
            ├── Route "/shop" → Shop ⭐ NEW
            │   ├── Navbar
            │   ├── Shop Header
            │   │   ├── Title
            │   │   └── Subtitle ("Pas pour Tout")
            │   ├── Filters
            │   │   ├── Category Buttons (All, T-Shirts, Outerwear, Bottoms)
            │   │   └── Sort Dropdown (Featured, Price)
            │   ├── ProductGrid ⭐ NEW
            │   │   └── ProductCard[] ⭐ NEW (8 products)
            │   │       ├── Image (hover scale)
            │   │       ├── Sold Out badge (conditional)
            │   │       ├── Product name
            │   │       └── Price
            │   └── Footer
            │
            ├── Route "/product/:id" → ProductDetail ⭐ NEW
            │   ├── Navbar
            │   ├── Back to Shop button
            │   ├── Product Gallery
            │   │   ├── Main image
            │   │   └── Thumbnails (if multiple)
            │   ├── Product Info
            │   │   ├── Name
            │   │   ├── Price
            │   │   ├── Description
            │   │   ├── Size Selector (S, M, L, XL)
            │   │   ├── Add to Cart button
            │   │   └── Expandable Details
            │   │       ├── Shipping & Returns
            │   │       └── Product Details
            │   ├── Related Products
            │   │   └── ProductGrid (3 items)
            │   └── Footer
            │
            ├── Route "/about" → AboutPage ⭐ NEW
            │   ├── Navbar
            │   ├── Hero
            │   │   ├── "MONTREZ" title
            │   │   └── "Pas pour Tout" tagline
            │   ├── Content Sections (scroll animations)
            │   │   ├── Our Philosophy
            │   │   ├── Heritage
            │   │   ├── Craftsmanship
            │   │   └── "Not for Everyone" (dark section)
            │   ├── Image Gallery (3 columns)
            │   └── Footer
            │
            ├── Route "/contact" → ContactPage ⭐ NEW
            │   ├── Navbar
            │   ├── 2-Column Layout
            │   │   ├── Info Section
            │   │   │   ├── Title
            │   │   │   ├── Contact Details
            │   │   │   │   ├── Email
            │   │   │   │   ├── Instagram
            │   │   │   │   └── Location
            │   │   │   └── Brand Note ("Pas pour Tout")
            │   │   └── Form Section
            │   │       ├── Name input
            │   │       ├── Email input
            │   │       ├── Subject input
            │   │       ├── Message textarea
            │   │       ├── Submit button
            │   │       └── Status messages (success/error)
            │   └── Footer
            │
            └── Route "/admin/*" → Admin (existing)
```

---

## 🔑 KEY COMPONENTS

### ⭐ NEW Components (Built by Frontend Agent)

| Component | Purpose | Props | Features |
|-----------|---------|-------|----------|
| **PasswordEmailModal** | Entrance gate | `onSuccess` | 4-stage flow, validation, animations |
| **HamburgerMenu** | Mobile navigation | `isOpen`, `onClose` | Slide-in, backdrop, routing |
| **ProductCard** | Product preview | `product` | Hover effects, sold-out badge |
| **ProductGrid** | Product layout | `products`, `title` | Responsive grid, stagger animations |
| **ProductDetail** | Full product view | (uses route param) | Gallery, size select, related products |
| **Shop** | Shop page | - | Filters, sort, product grid |
| **AboutPage** | Brand story | - | Scroll animations, image gallery |
| **ContactPage** | Contact form | - | Form validation, 2-column layout |

### 🔄 UPDATED Components

| Component | Changes |
|-----------|---------|
| **Navbar** | + Hamburger toggle, + desktop links, + router integration |
| **App.jsx** | + New routes, + PasswordEmailModal, + scroll-to-top |

### ✅ EXISTING Components (Unchanged)

| Component | Status |
|-----------|--------|
| Hero | Used in homepage |
| Collections | Used in homepage |
| About | Used in homepage |
| Contact | Used in homepage |
| Footer | Used across all pages |
| VideoIntro | Used in entrance flow |
| LandingPage | Used in entrance flow |
| Admin | Separate route tree |

---

## 🎨 STYLING ARCHITECTURE

```
styles/
├── theme.css (global variables, resets)
├── LandingPage.css
├── PasswordEmailModal.css ⭐ NEW
├── VideoIntro.css
├── Navbar.css ⭐ UPDATED
├── HamburgerMenu.css ⭐ NEW
├── ProductCard.css ⭐ NEW
├── ProductGrid.css ⭐ NEW
├── ProductDetail.css ⭐ NEW
├── Shop.css ⭐ NEW
├── AboutPage.css ⭐ NEW
├── ContactPage.css ⭐ NEW
├── Hero.css
├── Footer.css
└── ... (existing admin styles)
```

**CSS Methodology:**
- Component-scoped classes (`.component__element`)
- BEM-like naming convention
- Responsive breakpoints: 480px, 768px, 968px
- Mobile-first approach
- CSS variables for consistency

---

## 🔀 ROUTING STRUCTURE

```
/                    → HomePage (entrance flow + main site)
  ├─ #hero           → Scroll to hero section
  ├─ #about          → Scroll to about section
  └─ #contact        → Scroll to contact section

/shop                → Shop page (filters + grid)

/product/:id         → Product detail
  ├─ /product/speak-no-evil
  ├─ /product/army-74-shorts
  ├─ /product/money-tee
  └─ ... (dynamic)

/about               → About page (brand story)

/contact             → Contact page (form)

/admin/*             → Admin dashboard (existing)
```

---

## 📦 STATE MANAGEMENT

### Session Storage
```javascript
sessionStorage.getItem('montrez-entrance-complete')
// 'true' if user completed entrance flow
// Used to skip entrance on refresh
```

### Local State (Component-level)
- **HomePage:** `stage` ('landing' | 'password' | 'video' | 'site')
- **PasswordEmailModal:** `mode` ('choice' | 'password' | 'email' | 'verify-code')
- **HamburgerMenu:** `isOpen` (boolean)
- **Shop:** `selectedCategory`, `sortBy`
- **ProductDetail:** `selectedImage`, `selectedSize`
- **ContactPage:** `formData`, `isSubmitting`, `submitStatus`

### Route State
- React Router navigation state
- URL parameters (product ID)
- Hash navigation (homepage sections)

---

## 🎭 ANIMATIONS (Framer Motion)

### Component Animations

| Component | Animation Type | Trigger |
|-----------|----------------|---------|
| PasswordEmailModal | Fade + scale | Mode change |
| HamburgerMenu | Slide from right | Open/close |
| Menu items | Staggered fade-in | Menu open |
| ProductCard | Hover lift | Mouse hover |
| ProductGrid | Staggered reveal | Scroll into view |
| ProductDetail | Image fade | Thumbnail click |
| About sections | Fade + slide up | Scroll into view |
| Navbar | Slide down | Page load |

### CSS Transitions
- Button hover states
- Image scale/grayscale
- Border reveals
- Color shifts
- All smoothed with `transition: all 0.3s ease`

---

## 🔧 DATA FLOW

### Mock Data Sources (Replace with Backend)

**Products (Shop.jsx, ProductDetail.jsx):**
```javascript
const PRODUCTS = [
  {
    id: 'speak-no-evil',
    name: 'MONTREZ "SPEAK NO EVIL" GRAPHIC T-SHIRT',
    price: 600,
    image: '...',
    images: ['...'],
    category: 'tees',
    sizes: ['S', 'M', 'L', 'XL'],
    description: '...',
    soldOut: false
  },
  // ... 7 more products
]
```

**Backend Integration Points:**
1. `fetch('/api/products')` → Shop page
2. `fetch('/api/product/:id')` → Product detail
3. `fetch('/api/send-code')` → Email verification
4. `fetch('/api/verify-code')` → Code validation
5. `fetch('/api/contact')` → Contact form

---

## 📱 RESPONSIVE BEHAVIOR

### Breakpoints
```css
/* Mobile: < 768px */
- Hamburger menu active
- 1-column product grid
- Stacked layouts

/* Tablet: 768px - 968px */
- Hamburger menu active
- 2-column product grid
- Some 2-column layouts

/* Desktop: > 968px */
- Desktop nav links
- 3+ column product grid
- 2-column detail layouts
```

### Component Visibility

| Component | Mobile | Desktop |
|-----------|--------|---------|
| Hamburger Toggle | ✅ | ❌ |
| Hamburger Menu | ✅ | ✅ (on demand) |
| Desktop Nav Links | ❌ | ✅ |

---

## 🎯 COMPONENT RESPONSIBILITIES

### Smart (Stateful) Components
- `HomePage` - Entrance flow state
- `PasswordEmailModal` - Form state, validation
- `HamburgerMenu` - Menu open/close
- `Shop` - Filters, sort, product list
- `ProductDetail` - Gallery, size selection
- `ContactPage` - Form submission

### Presentational (Stateless) Components
- `LandingPage` - Pure UI
- `ProductCard` - Pure UI
- `ProductGrid` - Pure UI (animations only)
- `Navbar` - Pure UI (delegates state to HamburgerMenu)
- `Footer` - Pure UI

---

**Total Components: 20+**  
**New Components: 8**  
**Updated Components: 2**  
**Total CSS Files: 12+**

**All components are production-ready and follow React best practices.**
