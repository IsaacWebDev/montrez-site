# MONTREZ SITE - UX FLOW SPECIFICATIONS

**Version:** 1.0  
**Date:** 2026-03-18  
**Status:** Final Specification

---

## 1. ENTRANCE FLOW UX

### 1.1 Landing Page (Gate)

**Purpose:** Create exclusive, mysterious brand impression
**Duration on page:** 3-5 seconds (auto-advance possible)

**Layout:**
```
┌─────────────────────────────┐
│      FULL SCREEN IMAGE      │
│   (Château de Chambord gate)│
│                             │
│         MONTREZ LOGO        │
│        (centered)           │
│                             │
│        [ENTER]              │
│      (button, minimal)      │
│                             │
│     "Pas pour Tout"         │
│   (subtle, bottom)          │
└─────────────────────────────┘
```

**Specifications:**
- **Background:** file_421 (gate image, B&W, full-bleed)
- **Logo:** Centered, SVG/PNG, ~120px width
- **Button:** Text "ENTER", white, serif font, NO background, 2px border on hover
- **Tagline:** "Pas pour Tout" in small, elegant serif, 40% opacity, bottom-center
- **Animations:** Subtle fade-in on page load (300ms)
- **Click behavior:** "Enter" button → Password/Email modal

**Mobile considerations:**
- Touch target: 44x44px minimum (button)
- Readable at mobile (logo scales down, still prominent)
- Tagline: Smaller font size on mobile

**Desktop vs Mobile:**
| Element | Desktop | Mobile |
|---------|---------|--------|
| Logo width | 140px | 100px |
| Button size | 16px font | 14px font |
| Tagline size | 14px | 12px |

---

### 1.2 Password/Email Modal

**Purpose:** Gate access for returning/new users

**Decision Matrix:**

| Aspect | Recommendation | Rationale |
|--------|-----------------|-----------|
| **Email Verification** | REQUIRED (default) | Builds email list for marketing, validates real users |
| **Password Fallback** | OPTIONAL (NOTFOREVERYONE) | For VIP/press/early adopters, adds mystique |
| **Modal UI** | Tabs with slight styling | Cleaner than toggle, easier to scan |
| **Error States** | Clear, actionable messages | Guides user to resolution |
| **Loading States** | Subtle spinner + text | Feedback that action is processing |

**Modal Layout Option A: TABS (RECOMMENDED)**

```
┌──────────────────────────────┐
│  RETURNING   │   NEW USER    │
├──────────────┼───────────────┤
│                               │
│  Enter Password               │
│  [________________]           │
│                               │
│  [   ENTER    ]               │
│                               │
│  Forgot? Tap here             │
│                               │
└──────────────────────────────┘
```

```
┌──────────────────────────────┐
│  RETURNING   │   NEW USER    │
├──────────────┼───────────────┤
│                               │
│  Enter Your Email             │
│  [________________]           │
│                               │
│  [  GET CODE  ]               │
│                               │
│  Or use password              │
│  [________________]           │
│  [   ENTER    ]               │
│                               │
└──────────────────────────────┘
```

**Modal Layout Option B: TOGGLE (Alternative)**
```
┌──────────────────────────────┐
│  ◐ Returning   ○ New User    │
│                               │
│  Enter Password               │
│  [________________]           │
│                               │
│  [   ENTER    ]               │
│                               │
└──────────────────────────────┘
```

**RECOMMENDATION:** Use Tabs (Option A) - more scannable, clearer information hierarchy

---

### 1.3 Password Tab (Returning Users)

**Flow:**
1. User clicks "RETURNING" tab
2. Sees "Enter Password" input
3. Enters "NOTFOREVERYONE" (or custom password if set up)
4. Clicks "ENTER"
5. Validation → Success → Proceed to video

**Specifications:**
- **Input field:** Monospace font (for readability), password masked
- **Button:** White text, minimal styling, hover = slight opacity change
- **Fallback:** "Forgot password?" link → email reset option
- **Success:** Quick 200ms fade transition to video page

**Error States:**

| Error | Message | Action |
|-------|---------|--------|
| Empty field | "Password required" | Focus input |
| Wrong password | "Incorrect password. Try again or use email." | Clear field, offer email tab |
| Rate limit (5x) | "Too many attempts. Use email instead or try again in 15 minutes." | Disable input, show timer |

**Mobile:**
- Keyboard appears with password masking
- Input height: 48px+ (comfortable tap)
- Button below input (not beside)

---

### 1.4 New User Tab (Email Verification)

**Flow:**
1. User clicks "NEW USER" tab
2. Sees "Enter Your Email" input
3. Enters email → Clicks "GET CODE"
4. Backend sends 6-digit code to email
5. Modal updates → Shows "Enter Code" input
6. User enters code from email
7. Code validated → Success → Proceed to video

**Specifications:**

**Step 1: Email Input**
```
Enter Your Email
[____________________]

[  GET CODE  ]

Or use password
[____________________]
[   ENTER    ]
```

- **Input:** Standard email field, email keyboard on mobile
- **"GET CODE" button:** Styled same as password button
- **Password fallback:** Allow NOTFOREVERYONE fallback
- **Validation:** Real-time email format check (client-side)

**Step 2: Code Input (After sending email)**
```
Check your inbox!

Enter 6-digit code:
[__][__][__][__][__][__]

Resend code in 45s
(countdown timer)

[   VERIFY   ]
```

- **Code input:** 6 separate fields (auto-focus to next field)
- **Timer:** Shows countdown to "Resend code" availability
- **Resend:** Available after 2 minutes
- **Expiry:** Code valid for 10 minutes

**Success State:**
- ✅ "Code verified! Welcome to Montrez."
- Auto-transition to video after 1s

**Error States:**

| Error | Message | Action |
|-------|---------|--------|
| Invalid email | "Please enter a valid email" | Show tooltip, keep input focus |
| Already registered | "This email is already registered. Use password tab." | Suggest switching tabs |
| Sending failed | "Failed to send code. Try again?" | Show retry button |
| Code expired | "Code expired. Request new code?" | Show "GET NEW CODE" button |
| Wrong code | "Incorrect code. Try again (3/3 attempts)" | Show attempts remaining |
| Code attempts exhausted | "Too many failed attempts. Request new code." | Unlock after 5 min or new email |

---

### 1.5 Modal Styling (Global)

**Backdrop:**
- Semi-transparent black (rgba(0,0,0,0.7))
- Blur effect (8px)
- Click outside → Close modal (but stay on landing page)

**Modal Container:**
- Max width: 400px (desktop), full width - 30px (mobile)
- Background: #000000 (solid black)
- Border: 2px white
- Border radius: 0px (no radius, classic look)
- Shadow: Heavy drop shadow (luxury feel)
- Padding: 40px (desktop), 30px (mobile)

**Typography:**
- Labels: 12px, uppercase, letter-spacing 0.1em, 60% opacity
- Inputs: 14px, white text, placeholder 40% opacity
- Buttons: 14px, uppercase, letter-spacing 0.05em
- Messages: 12px, 80% opacity

**Animations:**
- Modal entrance: Slide up + fade (200ms, ease-out)
- Tab switch: Cross-fade content (150ms)
- Button hover: Slight scale (1.02) + opacity change
- Error shake: Subtle shake (100ms) + red text flash

**Focus States (Accessibility):**
- Visible focus ring: 2px white outline, 4px offset
- Tab order: Email/Password → Button → Fallback option

---

### 1.6 Video Intro

**Purpose:** Build brand mystique before entering site

**Specifications:**
- **Source:** Kling AI video (Château gates opening, 5 seconds)
- **Autoplay:** Yes, unmuted
- **Skip:** Available after 2 seconds ("Skip" text, bottom-right)
- **Fullscreen:** Optional (show icon, bottom-right)
- **End behavior:** Auto-transition to homepage after video ends

**Mobile:**
- Responsive container (maintains aspect ratio)
- Skip button: 44x44px, centered, easy to tap
- Portrait orientation: Letterbox or fill (test both)

**Skip Button:**
```
Skip in 2s...
[Skip]
```
- Changes to clickable after 2s
- Text: "Skip now" or countdown → "Skip"

---

## 2. NAVIGATION UX

### 2.1 Hamburger Menu (Mobile-First)

**Structure:**
```
┌─────────────────────────────┐
│  ☰  MONTREZ  🔍 👤 🛒      │
└─────────────────────────────┘

When ☰ clicked:
┌─────────────────────────────┐
│ ✕                           │
├─────────────────────────────┤
│ HOME                        │
│ SHOP                        │
│ ABOUT                       │
│ CONTACT                     │
├─────────────────────────────┤
│ ACCOUNT                     │
│ LOGOUT                      │
└─────────────────────────────┘
```

**Specifications:**

| Aspect | Specification |
|--------|---------------|
| **Trigger** | Hamburger icon (☰), left side |
| **Animation** | Slide-out from left, 250ms, ease-out |
| **Background** | Full-screen black overlay (0.9 opacity) |
| **Width** | 80% of screen (min 250px desktop) |
| **Items** | Left-aligned, 16px padding |
| **Font** | Serif bold, 16px, uppercase |
| **Item height** | 48px + padding (touch target) |
| **Divider** | 1px white, 20% opacity |
| **Close** | X icon (top-left), or click overlay |
| **Mobile** | Active (default state on mobile) |
| **Tablet** | Show as dropdown (test on iPad) |
| **Desktop** | Show full nav bar OR collapsible menu |

**Item Hover/Active:**
- Hover: 10% white background
- Active: White underline (bottom border, 2px)
- Click: Fade out menu, navigate with transition

---

### 2.2 Desktop Navigation (Alternate Layout)

For screens >1024px, consider showing full nav bar:

```
┌──────────────────────────────────────┐
│  🔍  HOME  SHOP  ABOUT  CONTACT  👤  │
│           MONTREZ                     │
│  ☰ MENU  HOME  SHOP  ABOUT  🛒 👤   │
└──────────────────────────────────────┘
```

**Recommendation:** Use sticky hamburger on all sizes (consistent UX), but show logo/menu items on desktop

---

### 2.3 Search (Header/Modal)

**Decision:** Inline search icon → Opens modal overlay

**Layout:**
```
Closed state:
┌─────────┐
│ 🔍      │
└─────────┘

Open state:
┌──────────────────────────┐
│ ✕  [______________]  🔍  │
│  Search by name...        │
│                           │
│ Recent:                   │
│ - SPEAK NO EVIL T-SHIRT   │
│ - ARMY 74 SHORTS          │
│                           │
│ Trending:                 │
│ - Hoodies                 │
│ - Shorts                  │
│                           │
└──────────────────────────┘
```

**Specifications:**
- **Icon:** 🔍 (magnifying glass), 20px, white
- **Modal:** Full-width header overlay
- **Input:** Focus on open, placeholder "Search products..."
- **Results:** Live results below (debounced 300ms)
- **Empty state:** Show recent searches + trending categories
- **Escape key:** Close modal
- **Mobile:** Input takes full width below icons

---

### 2.4 Cart (Slide-out or Modal)

**Decision:** Slide-out drawer (right side, mobile) OR modal (desktop)

**Layout - Slide-out:**
```
┌─────────────────────────────┐
│ ✕      CART (3 items)       │
├─────────────────────────────┤
│ [IMG] SPEAK NO EVIL T       │
│       $600 x1               │
│       [×] Remove            │
├─────────────────────────────┤
│ [IMG] ARCHITECT HOODIE      │
│       $1,500 x2             │
│       [×] Remove            │
├─────────────────────────────┤
│ [IMG] ARMY SHORTS           │
│       $1,000 x1             │
│       [×] Remove            │
├─────────────────────────────┤
│ Subtotal:      $4,600       │
│ Shipping:      TBD          │
│ Tax:           TBD          │
│ TOTAL:         $4,600+      │
├─────────────────────────────┤
│ [  CHECKOUT  ]              │
│ Continue Shopping           │
└─────────────────────────────┘
```

**Specifications:**
- **Trigger:** 🛒 icon, badge with item count
- **Position:** Right side, full-height drawer
- **Width:** 350px (desktop), full-width (mobile)
- **Animation:** Slide from right, 250ms
- **Items:** Image thumbnail (60x60px), name, price, quantity
- **Remove:** × button, 44x44px touch target
- **Edit quantity:** +/− buttons (or clickable number)
- **Empty state:** "Your cart is empty. Shop now."
- **Totals:** Clear breakdown
- **Buttons:** Checkout (primary), Continue Shopping (secondary)
- **Close:** X icon or click outside (with overlay)

**Desktop Alternative (Full-page cart):**
- Click cart icon → Navigate to /cart page
- Full-page view with better spacing
- Keep design consistent with slide-out

---

## 3. PRODUCT DISCOVERY UX

### 3.1 Homepage

**Purpose:** Showcase brand mystique + featured products

**Layout:**
```
[HERO IMAGE - full width, 400px height]
  Moody B&W, cinematic, no text overlay

[FEATURED PRODUCTS SECTION]
  "FEATURED" - centered, serif, small caps
  
  [Product 1]  [Product 2]  [Product 3]  [Product 4]
  
  Product format:
  [   IMAGE   ]
  Name
  $Price
  
  Hover: Slight zoom + "View Details"

[ABOUT SNIPPET]
  "Pas pour Tout"
  Brand story teaser (3 sentences)
  [Learn More] → /about

[INSTAGRAM FEED]
  Embedded Instagram grid (4-6 posts)
  Grid: 2 columns (mobile), 3 columns (tablet), 4 columns (desktop)

[FOOTER]
  Links, social, copyright
```

**Specifications:**

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Hero height | 250px | 350px | 500px |
| Featured grid | 1 col | 2 cols | 4 cols |
| Product card size | Full-width | 150px | 200px |
| Instagram grid | 2 cols | 3 cols | 4 cols |
| Font sizes | 12px body | 13px | 14px |

**Images:**
- Hero: B&W moody scene (file_421 variant or similar)
- Featured products: Real product images from montrezofficial.com
- Instagram: Auto-embedded via social plugin

---

### 3.2 Shop Page (Product Grid)

**Layout:**
```
[FILTERS (desktop)]  [PRODUCTS GRID]
├─ Category         [Product] [Product] [Product]
├─ Price Range      [Product] [Product] [Product]
├─ Size             [Product] [Product] [Product]
├─ Sort: ▾          
│  - Newest         [Load More] or [Pagination]
│  - Price (↑↓)
│  - Popular
```

**Specifications:**

**Grid Size:**

| Breakpoint | Columns | Width |
|------------|---------|-------|
| Mobile <480px | 1 | Full - 20px margin |
| Mobile 480-768px | 2 | 50% - gutters |
| Tablet 768-1024px | 3 | 33% - gutters |
| Desktop 1024px+ | 4 | 25% - gutters |

**Filters (Sidebar - Desktop Only):**
- Sticky on scroll (stays visible)
- Collapsible on mobile (use accordion)
- Max width: 200px

**Filter Options:**

```
CATEGORY
☑ All (default)
☐ T-Shirts
☐ Hoodies
☐ Shorts
☐ Jackets
☐ Accessories

PRICE RANGE
$0 ─────●──── $2,000
Min [____] Max [____]

SIZE
☐ XS  ☐ S  ☐ M  ☐ L  ☐ XL  ☐ XXL

SORT BY ▾
⦿ Newest
○ Price: Low to High
○ Price: High to Low
○ Most Popular
```

**Product Card:**
```
┌──────────────┐
│   [IMAGE]    │
│              │
│  Sold out ✓  │ (if applicable)
│              │
│ Price: $1000 │
│ PRODUCT NAME │
│ (truncate)   │
│              │
│[View Details]│ (on hover)
└──────────────┘
```

**Product Card Hover State:**
- Slight zoom (1.05x)
- Overlay: Semi-transparent black (0.3)
- "View Details" button appears
- Smooth transition (200ms)

**Pagination/Load More:**
- Show 12 products initially
- "Load More" button OR pagination dots
- Mobile: Always "Load More" (easier than pagination)

---

### 3.3 Sorting & Filtering Flow

**Mobile:**
1. Top bar shows "Filter & Sort" button
2. Click → Modal overlay appears
3. User selects category, price, size, sort
4. Click "Apply" → Grid updates with animation
5. Modal closes, shows "Filters Applied" badge

**Desktop:**
1. Sidebar filters visible (sticky)
2. Change filter → Grid updates instantly (no page reload)
3. "Clear Filters" button appears when filters active
4. Sort dropdown at top of grid

**Behavior:**
- Debounce filter changes (500ms) to avoid hammering
- Show loading state (skeleton cards) while updating
- Preserve scroll position (stay on same grid area)
- Update URL params so page is shareable

---

## 4. PRODUCT DETAIL UX

### 4.1 Product Detail Page

**Layout:**
```
[NAV BAR]
┌──────────────────────────────┐

[BREADCRUMB]
Shop > Hoodies > Architect

[MAIN CONTENT]
┌──────────────┬────────────────┐
│              │ ARCHITECT ZIP   │
│              │ HOODIE - BLACK  │
│  [GALLERY]   │                │
│              │ $1,500          │
│              │                │
│              │ Color: ▾       │
│              │ ○ Black        │
│              │ ○ Off-White    │
│              │                │
│              │ Size: ▾        │
│              │ [XS][S][M][L]  │
│              │ [XL][XXL]      │
│              │                │
│              │ [ADD TO CART]  │
│              │ [❤ Save]       │
│              │                │
│              │ Description    │
│              │ Features       │
│              │ Shipping info  │
└──────────────┴────────────────┘

[RELATED PRODUCTS]
Recommended For You
[Product] [Product] [Product] [Product]

[REVIEWS/COMMENTS]
Customer Testimonials
⭐⭐⭐⭐⭐ "Amazing quality"
```

**Specifications:**

**Image Gallery:**

| Aspect | Specification |
|--------|---------------|
| **Primary image** | Large (400x500px on desktop) |
| **Thumbnails** | Bottom carousel or side strip |
| **Mobile** | Vertical swipe gallery (fullscreen on tap) |
| **Desktop** | Hover zoom (1.2x, shows detail) |
| **Lightbox** | Click image → fullscreen gallery |
| **Transition** | Fade between images (200ms) |
| **"Sold Out"** | Gray overlay + "Sold Out" badge (top-left) |

**Color/Size Selector:**

```
COLOR
Selected color: Black (with swatch)

○ Black (swatch)
○ Off-White (swatch)

SIZE
Selected: M

[XS] [S] [M] [L] [XL] [XXL]

[Size Guide] link
```

- Show color swatch + name
- Disable unavailable sizes (gray out)
- Show "Only X left" if low stock
- Size guide link → Modal with measurements

**Add to Cart Button:**
- **Default:** "ADD TO CART", white text, 2px border
- **Hover:** Slight scale (1.02), opacity change
- **Click behavior:** 
  - Option A: Button changes to "Added ✓" (2s)
  - Option B: Toast notification "Added to cart"
  - Option C: Cart mini-preview (show item + count)
- **Selection required:** If color/size not selected, button shows "Select [missing] to continue"

**Save/Wishlist:**
- ❤ Icon (unfilled) → Click to save
- Changes to ❤ (filled) when saved
- Shows "Saved" tooltip

**Mobile Layout:**
```
[GALLERY - fullscreen swipe]

[Details below gallery]
Name: ARCHITECT ZIP HOODIE - BLACK
Price: $1,500

Color: ▾ (modal selector)
Size: ▾ (modal selector)

[ADD TO CART] (full width, 48px height)
[❤ SAVE] (50% width)
```

---

### 4.2 Related Products Section

**Layout:**
```
You Might Also Like

[Product] [Product] [Product] [Product]
  (horizontal scroll on mobile)
```

**Specifications:**
- **Position:** Below description/details
- **Title:** "You Might Also Like" or "Related Products"
- **Count:** 4 products (desktop), 2 visible (mobile, swipeable)
- **Lazy load:** Load when section comes into view
- **Carousel:** On mobile, horizontal swipe (or use arrows)
- **On desktop:** Static grid, no carousel

---

## 5. CHECKOUT FLOW UX

### 5.1 Cart Page (/cart)

**Layout:**
```
[NAV]

[CART ITEMS]
─────────────────────────────
Item 1: SPEAK NO EVIL T-SHIRT
$600 x1
[×] Remove  [Edit]

Item 2: ARCHITECT HOODIE
$1,500 x2
[×] Remove  [Edit]

Item 3: ARMY SHORTS
$1,000 x1
[×] Remove  [Edit]
─────────────────────────────

[SUMMARY]
Subtotal:    $4,600
Shipping:    $0 (Free)
Tax:         $0
─────────────────────────────
TOTAL:       $4,600
─────────────────────────────

[CHECKOUT] [Continue Shopping]
```

**Specifications:**
- **Edit:** Click "Edit" → quantity selector appears inline
- **Remove:** × button → confirmation toast
- **Quantity:** +/− buttons to adjust
- **Empty cart:** Show message + link to shop
- **Shipping:** Show estimated (calculated at checkout)
- **Progress:** Show "Step 1 of 3" at bottom

---

### 5.2 Checkout Steps (Multi-Step Form)

**Flow:**
```
Step 1: Cart Review
Step 2: Shipping Info
Step 3: Payment
```

**Progress Indicator:**
```
[●─────○─────○]
Cart Review | Shipping | Payment
```

**Step 1: Cart Review (Done on /cart page)**
- Show items again (small view)
- Allow edits
- "Continue to Shipping" → Step 2

**Step 2: Shipping Information**
```
[SHIPPING DETAILS]

Email: [________________]
Full Name: [________________]
Address: [________________]
City: [________________]
Country: [▾ Select]
Postal Code: [________________]

☐ Billing same as shipping

[Billing Address fields if unchecked]

Shipping Method:
○ Standard (5-7 days) - Free
○ Express (2-3 days) - $30
○ Overnight (1 day) - $80

[Back] [Continue to Payment]
```

**Specifications:**
- **Validation:** Real-time (email, required fields)
- **Country dropdown:** Searchable
- **Shipping methods:** Show arrival estimate
- **Billing checkbox:** Default checked (same as shipping)
- **Progress:** Show "Step 2 of 3"

**Step 3: Payment**
```
[PAYMENT DETAILS]

Card Number: [________________]
Exp: [__/__]  CVC: [___]

Billing Address:
(Already filled from Step 2)

☐ Save this card for next time

[Back] [Complete Order]
```

**Specifications:**
- **Card input:** Masked, auto-format
- **Save card:** Optional, shown if account exists
- **Error handling:** Show clear message + retry
- **Processing:** Show spinner + "Processing payment..."
- **Success:** Redirect to order confirmation

---

### 5.3 Order Confirmation

```
✓ ORDER CONFIRMED

Order #12345
Placed: March 18, 2026

[EMAIL CONFIRMATION SENT]

Items:
- SPEAK NO EVIL T-SHIRT x1 - $600
- ARCHITECT HOODIE x2 - $3,000
- ARMY SHORTS x1 - $1,000

SUBTOTAL: $4,600
SHIPPING: FREE
TAX: $0
TOTAL: $4,600

Estimated Delivery: March 23-25, 2026

[Continue Shopping] [View Account]
```

---

## 6. MOBILE EXPERIENCE

### 6.1 Touch Target Guidelines

**Minimum Touch Target:** 44x44px (Apple HIG recommendation)

| Element | Minimum Size |
|---------|---------------|
| Button | 44x44px |
| Link | 44x44px |
| Icon | 24x24px (in 44x44px tap area) |
| Input field | 44px height |
| Menu item | 48px height |
| Checkbox | 44x44px |
| Radio button | 44x44px |

---

### 6.2 Thumb Zone & Gestures

**Thumb Zone (Reachable on single-hand hold):**
```
Phone held in right hand:
┌─────────────────────┐
│ ■ HARD REACH        │  ← Top (hard)
│                     │
│ ■ EASY REACH        │  ← Middle (easy)
│ ■ EASY REACH        │
│                     │
│ ■ NATURAL REACH     │  ← Bottom thumb area (natural)
└─────────────────────┘
```

**Critical Actions Placement:**
- Primary button (Checkout, Add to Cart) → Bottom thumb zone
- Menu, search → Top (acceptable, less frequent)
- Back button → Top-left (standard iOS/Android)

**Gestures:**
| Gesture | Action | Location |
|---------|--------|----------|
| **Swipe left** | Next product/image | Gallery, carousel |
| **Swipe right** | Previous product/image | Gallery, carousel |
| **Swipe down** | Refresh homepage | Hero section |
| **Long press** | Show context menu | Product card (save, share) |
| **Pinch zoom** | Zoom product image | Lightbox gallery |
| **Double tap** | Like/favorite product | Product image |

---

### 6.3 Mobile Layout Rules

**Spacing:**
- Margin between sections: 20px
- Padding inside containers: 15px
- Gutter between grid items: 10px

**Typography:**
- Body text: 14px minimum
- Headings: 20px-24px
- Small text: 12px (only for secondary info)

**Images:**
- Full-width product images
- Maintain aspect ratio
- Lazy load below fold

**Navigation:**
- Hamburger menu (always)
- Search + account + cart in header
- Header height: 56px (includes safe areas)

---

## 7. ACCESSIBILITY (A11y)

### 7.1 Keyboard Navigation

**Tab Order:**
1. Hamburger menu
2. Search icon
3. Account icon
4. Cart icon
5. Main content (products, links)
6. Footer links

**Focus Indicators:**
- 2px white outline, 4px offset
- Visible on all interactive elements
- High contrast against background

**Skip Links:**
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

**Enter/Space Key:**
- Buttons activate on Space or Enter
- Links activate on Enter
- Form submission on Enter in form context

---

### 7.2 Screen Reader Considerations

**ARIA Labels:**

```html
<!-- Button with icon -->
<button aria-label="Open navigation menu">☰</button>

<!-- Search -->
<input type="search" aria-label="Search products" placeholder="Search...">

<!-- Cart -->
<button aria-label="Shopping cart, 3 items">🛒 <span aria-hidden="true">3</span></button>

<!-- Product card -->
<article aria-label="ARCHITECT HOODIE - $1,500">
  <img alt="ARCHITECT ZIP HOODIE - Black color">
  ...
</article>

<!-- Pagination -->
<nav aria-label="Pagination">
  <a aria-label="Page 1, current page">1</a>
  <a aria-label="Go to page 2">2</a>
</nav>
```

**Heading Hierarchy:**
- `<h1>` - Page title (only one)
- `<h2>` - Major sections
- `<h3>` - Subsections
- NO skipping levels (h1 → h3)

**Image Alt Text:**
```html
<!-- Product image -->
<img alt="SPEAK NO EVIL graphic t-shirt in black">

<!-- Decorative (use aria-hidden) -->
<img alt="" aria-hidden="true" src="decorative.svg">

<!-- Icon buttons -->
<button aria-label="Save to wishlist">❤</button>
```

**Form Labels:**
```html
<!-- Always use label -->
<label for="email">Email</label>
<input id="email" type="email">

<!-- Or use aria-label -->
<input aria-label="Email" type="email">
```

**Error Messages:**
```html
<!-- Link error to input