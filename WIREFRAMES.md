# MONTREZ SITE - WIREFRAMES & LAYOUTS

**Version:** 1.0  
**Date:** 2026-03-18

---

## WIREFRAME KEY

```
┌─────────────┐
│   ELEMENT   │  ← Section/container
└─────────────┘

[IMAGE]        ← Full-width image
[   ]          ← Placeholder/whitespace
[BUTTON]       ← Interactive button
[INPUT]        ← Form input field
```

---

## PAGE 1: LANDING PAGE (GATE)

### Desktop (1920px)
```
┌──────────────────────────────────────────────┐
│                                              │
│                                              │
│         [BACKGROUND IMAGE - GATE]            │
│                  (1920x1080)                 │
│                                              │
│              MONTREZ LOGO                    │
│            (140px width, centered)           │
│                                              │
│              [ENTER BUTTON]                  │
│           (white, no background)             │
│                                              │
│             "Pas pour Tout"                  │
│        (small, serif, bottom-center)         │
│                                              │
│                                              │
└──────────────────────────────────────────────┘
```

### Mobile (375px)
```
┌──────────────────────────┐
│                          │
│  [GATE IMAGE - CROPPED]  │
│     (375x667)            │
│                          │
│    MONTREZ LOGO          │
│   (100px width)          │
│                          │
│   [ENTER BUTTON]         │
│  (white, minimal)        │
│                          │
│  "Pas pour Tout"         │
│                          │
└──────────────────────────┘
```

---

## PAGE 2: AUTHENTICATION MODAL

### Password Tab (Both - 400px width modal)
```
┌──────────────────────────────┐
│ RETURNING  │  NEW USER       │  ← Tabs
├──────────────────────────────┤
│                              │
│  Enter Password              │  ← Label
│  [____________________]       │  ← Input (44px height)
│                              │
│  [   ENTER    ]              │  ← Button (44px height)
│                              │
│  Forgot password?            │  ← Link
│                              │
│  Or use email instead        │  ← CTA
│                              │
└──────────────────────────────┘
```

### Email Tab - Step 1
```
┌──────────────────────────────┐
│ RETURNING  │  NEW USER       │
├──────────────────────────────┤
│                              │
│  Enter Your Email            │
│  [____________________]       │
│                              │
│  [  GET CODE  ]              │
│                              │
│  Or use password             │
│  [____________________]       │
│  [   ENTER    ]              │
│                              │
└──────────────────────────────┘
```

### Email Tab - Step 2 (Verification)
```
┌──────────────────────────────┐
│ RETURNING  │  NEW USER       │
├──────────────────────────────┤
│                              │
│  ✓ Code sent to              │
│  example@email.com           │
│                              │
│  Enter 6-digit code:         │
│  [__][__][__][__][__][__]    │  ← Auto-focus fields
│                              │
│  Resend code in 2:45         │  ← Timer
│                              │
│  [   VERIFY   ]              │
│                              │
│  Didn't receive? [Resend]    │
│                              │
└──────────────────────────────┘
```

---

## PAGE 3: VIDEO INTRO

```
┌──────────────────────────────┐
│                              │
│     [VIDEO PLAYER]           │
│      (plays automatically)   │
│                              │
│                              │
│                  [Skip in 2s]│  ← Top-right (after 2s)
│                              │
└──────────────────────────────┘

Mobile:
┌──────────────┐
│ [  VIDEO  ]  │
│  (portrait   │
│  or fit)     │
│              │
│ [Skip now]   │  ← Bottom center
└──────────────┘
```

---

## PAGE 4: HOMEPAGE

### Desktop (1920px)
```
┌──────────────────────────────────────────────┐
│ ☰  MONTREZ  🔍  👤  🛒                      │  ← Header (56px)
├──────────────────────────────────────────────┤
│                                              │
│                                              │
│     [HERO IMAGE - MOODY B&W]                 │
│            (1920x500)                        │
│                                              │
│                                              │
├──────────────────────────────────────────────┤
│  FEATURED                                    │
│                                              │
│  [Product1]  [Product2]  [Product3]  [P4]   │  ← 4 columns, 200px ea
│   $600       $1000       $1500        $800   │
│                                              │
├──────────────────────────────────────────────┤
│  Pas pour Tout                               │
│  European luxury streetwear with mystery...  │
│  [Learn More]                                │
│                                              │
├──────────────────────────────────────────────┤
│  INSTAGRAM                                   │
│                                              │
│  [Post1]  [Post2]  [Post3]  [Post4]         │  ← 4 columns
│  [Post5]  [Post6]  [Post7]  [Post8]         │
│                                              │
├──────────────────────────────────────────────┤
│ Copyright © 2026 MONTREZ | Privacy | Contact│
└──────────────────────────────────────────────┘
```

### Mobile (375px)
```
┌──────────────────────────┐
│ ☰  MONTREZ  🔍  👤  🛒 │  ← Header (56px)
├──────────────────────────┤
│                          │
│  [HERO IMAGE]            │
│   (375x250)              │
│                          │
├──────────────────────────┤
│  FEATURED                │
│                          │
│  [Product1]              │  ← 1 column
│   $600                   │
│   Add to Cart            │
│                          │
│  [Product2]              │
│   $1000                  │
│   Add to Cart            │
│                          │
├──────────────────────────┤
│  Pas pour Tout           │
│  European luxury...      │
│  [Learn More]            │
│                          │
├──────────────────────────┤
│  INSTAGRAM               │
│                          │
│  [Post1]  [Post2]        │  ← 2 columns
│  [Post3]  [Post4]        │
│  [Post5]  [Post6]        │
│                          │
├──────────────────────────┤
│ Copyright © 2026 MONTREZ │
└──────────────────────────┘
```

---

## PAGE 5: SHOP (PRODUCT GRID)

### Desktop (1920px)
```
┌──────────────────────────────────────────────┐
│ ☰  MONTREZ  🔍  👤  🛒                      │
├──────────────────────────────────────────────┤
│ Shop > All Products                          │
│                                              │
├────────────┬──────────────────────────────────┤
│ CATEGORY   │ Sort: Newest ▾                   │
│ ☐ All     │                                  │
│ ☐ T-Shirts│ [P1]  [P2]  [P3]  [P4]          │ ← 4 columns
│ ☐ Hoodies │ $600  $1000 $1500 $800          │
│ ☐ Shorts  │                                  │
│ ☐ Jackets │ [P5]  [P6]  [P7]  [P8]          │
│            │ $600  $1000 $1500 $800          │
│ PRICE RANGE│                                  │
│ $0─────$2k │ [P9]  [P10] [P11] [P12]         │
│            │ $600  $1000 $1500 $800          │
│ SIZE       │                                  │
│ ☐ XS  ☐ S │ [Load More]                      │
│ ☐ M   ☐ L │                                  │
│ ☐ XL  ☐XXL│                                  │
│            │                                  │
└────────────┴──────────────────────────────────┘
```

### Mobile (375px)
```
┌──────────────────────────┐
│ ☰  MONTREZ  🔍  👤  🛒 │
├──────────────────────────┤
│ Shop > All Products      │
│                          │
│ [Filter & Sort]          │  ← Opens modal
│                          │
│ [Product1]               │  ← 2 columns
│ $600                     │
│                          │
│ [Product2]               │
│ $1000                    │
│                          │
│ [Product3]               │
│ $1500                    │
│                          │
│ [Product4]               │
│ $800                     │
│                          │
│ [Load More]              │
│                          │
└──────────────────────────┘
```

---

## PAGE 6: PRODUCT DETAIL

### Desktop (1920px)
```
┌──────────────────────────────────────────────┐
│ ☰  MONTREZ  🔍  👤  🛒                      │
├──────────────────────────────────────────────┤
│ Shop > Hoodies > ARCHITECT ZIP HOODIE        │ ← Breadcrumb
│                                              │
├──────────────────┬─────────────────────────┤
│                  │                         │
│  [MAIN IMAGE]    │  ARCHITECT ZIP HOODIE   │
│   (400x500)      │  BLACK                  │
│                  │                         │
│ [Thumb1][Thumb2] │  $1,500                 │
│ [Thumb3][Thumb4] │                         │
│                  │  COLOR                  │
│                  │  ● Black (swatch)       │
│                  │  ○ Off-White (swatch)   │
│                  │                         │
│                  │  SIZE                   │
│                  │  [XS][S][M][L][XL][XXL]│
│                  │                         │
│                  │  [ADD TO CART]          │
│                  │  [❤ SAVE]               │
│                  │                         │
│                  │  [Size Guide]           │
│                  │                         │
│                  │  Description:           │
│                  │  Premium hoodie...      │
│                  │                         │
│                  │  Features:              │
│                  │  - 100% cotton          │
│                  │  - Embroidered logo     │
│                  │                         │
│                  │  Shipping:              │
│                  │  Free (5-7 days)        │
│                  │                         │
├──────────────────┴─────────────────────────┤
│  You Might Also Like                        │
│                                              │
│  [P1]      [P2]      [P3]      [P4]         │
│  $800      $600      $1500     $1000        │
│                                              │
└──────────────────────────────────────────────┘
```

### Mobile (375px)
```
┌──────────────────────────┐
│ ☰  MONTREZ  🔍  👤  🛒 │
├──────────────────────────┤
│ < Shop > ARCHITECT HOODIE│
│                          │
│ [IMAGE]                  │
│ (swipeable gallery)      │
│                          │
│ [Thumb1][Thumb2]         │
│                          │
│ ARCHITECT ZIP HOODIE     │
│ BLACK                    │
│ $1,500                   │
│                          │
│ COLOR                    │
│ ● Black                  │
│ ○ Off-White              │
│                          │
│ SIZE                     │
│ [▾ Select Size]          │ ← Modal picker
│                          │
│ [ADD TO CART]            │ ← 48px height
│ [❤ SAVE]                 │
│                          │
│ Description              │
│ Premium hoodie...        │
│                          │
│ Features                 │
│ - 100% cotton            │
│ - Embroidered logo       │
│                          │
│ You Might Also Like      │
│                          │
│ [P1]  [P2]               │ ← 2 columns, swipeable
│ $800  $600               │
│                          │
└──────────────────────────┘
```

---

## PAGE 7: CART PAGE

### Desktop (1920px)
```
┌──────────────────────────────────────────────┐
│ ☰  MONTREZ  🔍  👤  🛒                      │
├──────────────────────────────────────────────┤
│ SHOPPING CART                                │
│                                              │
│ Step 1 of 3: Review Items                    │
│ [●───○───○]                                  │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│ SPEAK NO EVIL T-SHIRT                        │
│ [Image]  $600  Qty: [-] 1 [+]  [×] Remove    │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│ ARCHITECT ZIP HOODIE - BLACK                 │
│ [Image]  $1,500  Qty: [-] 2 [+]  [×] Remove │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│ ARMY SHORTS                                  │
│ [Image]  $1,000  Qty: [-] 1 [+]  [×] Remove │
│                                              │
├──────────────────────────────────────────────┤
│                           Subtotal: $4,600   │
│                           Shipping: TBD      │
│                           Tax:      TBD      │
│                           ─────────────────  │
│                           TOTAL:    $4,600+  │
│                                              │
│ [Continue Shopping] [Continue to Shipping]   │
│                                              │
└──────────────────────────────────────────────┘
```

### Mobile (375px)
```
┌──────────────────────────┐
│ ☰  MONTREZ  🔍  👤  🛒 │
├──────────────────────────┤
│ SHOPPING CART            │
│                          │
│ Step 1 of 3              │
│ [●─○─○]                  │
│                          │
├──────────────────────────┤
│ SPEAK NO EVIL T-SHIRT    │
│ [Image]                  │
│ $600  Qty: 1             │
│ [×] Remove               │
│                          │
├──────────────────────────┤
│ ARCHITECT ZIP HOODIE     │
│ [Image]                  │
│ $1,500  Qty: 2           │
│ [×] Remove               │
│                          │
├──────────────────────────┤
│ ARMY SHORTS              │
│ [Image]                  │
│ $1,000  Qty: 1           │
│ [×] Remove               │
│                          │
├──────────────────────────┤
│ Subtotal:    $4,600      │
│ Shipping:    TBD         │
│ Tax:         TBD         │
│ ─────────────────        │
│ TOTAL:       $4,600+     │
│                          │
│ [Continue to Shipping]   │
│ [Continue Shopping]      │
│                          │
└──────────────────────────┘
```

---

## PAGE 8: CHECKOUT - SHIPPING

### Desktop (1920px)
```
┌──────────────────────────────────────────────┐
│ ☰  MONTREZ  🔍  👤  🛒                      │
├──────────────────────────────────────────────┤
│ CHECKOUT                                     │
│ Step 2 of 3: Shipping Information            │
│ [○─●─○]                                      │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│ Email:                                       │
│ [________________________________]           │
│                                              │
│ Full Name:                                   │
│ [________________________________]           │
│                                              │
│ Address:                                     │
│ [________________________________]           │
│                                              │
│ City:                  Country:              │
│ [________________]      [▾ Select]           │
│                                              │
│ Postal Code:                                 │
│ [________________________________]           │
│                                              │
│ ☐ Billing same as shipping                   │
│                                              │
│ SHIPPING METHOD:                             │
│ ○ Standard (5-7 days) - Free                 │
│ ○ Express (2-3 days) - $30                   │
│ ○ Overnight (1 day) - $80                    │
│                                              │
│ [Back to Cart] [Continue to Payment]         │
│                                              │
└──────────────────────────────────────────────┘
```

### Mobile (375px)
```
┌──────────────────────────┐
│ ☰  MONTREZ  🔍  👤  🛒 │
├──────────────────────────┤
│ CHECKOUT                 │
│ Step 2 of 3              │
│ [○─●─○]                  │
│                          │
├──────────────────────────┤
│                          │
│ Email:                   │
│ [__________________]     │
│                          │
│ Full Name:               │
│ [__________________]     │
│                          │
│ Address:                 │
│ [__________________]     │
│                          │
│ City:                    │
│ [__________________]     │
│                          │
│ Country:                 │
│ [▾ Select Country]       │
│                          │
│ Postal Code:             │
│ [__________________]     │
│                          │
│ ☐ Billing same          │
│                          │
│ SHIPPING METHOD:         │
│ ○ Standard - Free        │
│ ○ Express - $30          │
│ ○ Overnight - $80        │
│                          │
│ [Back] [Continue]        │
│                          │
└──────────────────────────┘
```

---

## PAGE 9: CHECKOUT - PAYMENT

### Desktop (1920px)
```
┌──────────────────────────────────────────────┐
│ ☰  MONTREZ  🔍  👤  🛒                      │
├──────────────────────────────────────────────┤
│ CHECKOUT                                     │
│ Step 3 of 3: Payment                         │
│ [○─○─●]                                      │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│ Card Number:                                 │
│ [________________________________]           │
│                                              │
│ Expiration:           CVC:                   │
│ [__/____]             [___]                  │
│                                              │
│ Cardholder Name:                             │
│ [________________________________]           │
│                                              │
│ ☐ Save this card for next time               │
│                                              │
│                                              │
│ Order Summary:                               │
│ Subtotal:          $4,600                    │
│ Shipping:          $0 (Free)                 │
│ Tax:               $0                        │
│ ────────────────────────────────             │
│ TOTAL:             $4,600                    │
│                                              │
│ [Back] [Complete Order]                      │
│                                              │
└──────────────────────────────────────────────┘
```

### Mobile (375px)
```
┌──────────────────────────┐
│ ☰  MONTREZ  🔍  👤  🛒 │
├──────────────────────────┤
│ CHECKOUT                 │
│ Step 3 of 3              │
│ [○─○─●]                  │
│                          │
├──────────────────────────┤
│                          │
│ Card Number:             │
│ [__________________]     │
│                          │
│ Exp:        CVC:         │
│ [__/____]   [___]        │
│                          │
│ Cardholder:              │
│ [__________________]     │
│                          │
│ ☐ Save card              │
│                          │
│ Order Summary:           │
│ Subtotal:  $4,600        │
│ Shipping:  $0            │
│ Tax:       $0            │
│ ──────────────           │
│ TOTAL:     $4,600        │
│                          │
│ [Back] [Complete Order]  │
│                          │
└──────────────────────────┘
```

---

## PAGE 10: ORDER CONFIRMATION

### Desktop (1920px)
```
┌──────────────────────────────────────────────┐
│ ☰  MONTREZ  🔍  👤  🛒                      │
├──────────────────────────────────────────────┤
│                                              │
│               ✓ ORDER CONFIRMED              │
│                                              │
│            Order #MONT-2026-12345            │
│         Placed: March 18, 2026 at 3:45 PM   │
│                                              │
│        ✓ Confirmation email sent to          │
│           user@example.com                   │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│ ORDER DETAILS:                               │
│                                              │
│ Item 1: SPEAK NO EVIL T-SHIRT x1 - $600      │
│ Item 2: ARCHITECT ZIP HOODIE x2 - $3,000     │
│ Item 3: ARMY SHORTS x1 - $1,000              │
│                                              │
│ Subtotal:                       $4,600       │
│ Shipping:                       $0 (Free)    │
│ Tax:                            $0           │
│ ──────────────────────────────────           │
│ TOTAL:                          $4,600       │
│                                              │
│ SHIPPING TO:                                 │
│ John Doe                                     │
│ 123 Rue de Paris                             │
│ 75001 Paris, France                          │
│                                              │
│ Estimated Delivery: March 23-25, 2026        │
│                                              │
│ [Continue Shopping] [View Order Status]      │
│                                              │
└──────────────────────────────────────────────┘
```

### Mobile (375px)
```
┌──────────────────────────┐
│ ☰  MONTREZ  🔍  👤  🛒 │
├──────────────────────────┤
│                          │
│ ✓ ORDER CONFIRMED       │
│                          │
│ Order #MONT-2026-12345  │
│                          │
│ Confirmation sent to     │
│ user@example.com         │
│                          │
├──────────────────────────┤
│                          │
│ ITEMS:                   │
│ SPEAK NO EVIL T x1       │
│ $600                     │
│                          │
│ ARCHITECT HOODIE x2      │
│ $3,000                   │
│                          │
│ ARMY SHORTS x1           │
│ $1,000                   │
│                          │
│ Subtotal:     $4,600     │
│ Shipping:     $0         │
│ Tax:          $0         │
│ ──────────────           │
│ TOTAL:        $4,600     │
│                          │
│ Delivery: Mar 23-25      │
│                          │
│ [Continue Shopping]      │
│                          │
└──────────────────────────┘
```

---

## COMPONENT LIBRARY

### Product Card (Reusable)

**Default State:**
```
┌──────────────┐
│              │
│   [IMAGE]    │
│  (200x250)   │
│              │
│  $1,500      │
│  Product     │
│  Name Here   │
│              │
└──────────────┘
```

**Hover State (Desktop):**
```
┌──────────────┐
│              │
│   [IMAGE]    │
│ ◐ 0.9 opacity │
│   ZOOM 1.05  │
│              │
│  [View Details│  ← Appears on hover
│    ▶]        │
│              │
│  $1,500      │
│  Product     │
│  Name Here   │
│              │
└──────────────┘
```

**Mobile/Active State:**
```
┌──────────────┐
│              │
│   [IMAGE]    │
│ ◐ Loading    │
│              │
│ [ADD TO CART]│
│              │
│  $1,500      │
│  Product     │
│  Name Here   │
│              │
└──────────────┘
```

---

### Navigation Drawer (Mobile)

**Closed:**
```
┌──────────────┐
│ ☰  MONTREZ  │
└──────────────┘
```

**Open:**
```
┌──────────────┐
│ ✕            │ ← Close button
├──────────────┤
│ HOME         │
│ SHOP         │
│ ABOUT        │
│ CONTACT      │
├──────────────┤
│ ACCOUNT      │
│ LOGOUT       │
└──────────────┘

(Full-width overlay, slide from left)
```

---

### Cart Mini Drawer (Mobile)

```
┌──────────────┐
│ ✕  CART (3)  │ ← Cart count badge
├──────────────┤
│ [IMG] NAME   │
│ $600 x1      │
│ [×] Remove   │
├──────────────┤
│ [IMG] NAME   │
│ $1,500 x2    │
│ [×] Remove   │
├──────────────┤
│ [IMG] NAME   │
│ $1,000 x1    │
│ [×] Remove   │
├──────────────┤
│ Total: $4,600│
├──────────────┤
│ [CHECKOUT]   │
└──────────────┘
```

---

### Filter Modal (Mobile)

```
┌──────────────┐
│ Filter & Sort│
├──────────────┤
│              │
│ CATEGORY     │
│ ☑ All        │
│ ☐ T-Shirts   │
│ ☐ Hoodies    │
│ ☐ Shorts     │
│              │
│ PRICE RANGE  │
│ $0─────●─$2k │
│              │
│ SIZE         │
│ ☐ XS ☐ S    │
│ ☐ M  ☐ L    │
│ ☐ XL ☐ XXL  │
│              │
│ SORT BY      │
│ ○ Newest     │
│ ○ Price ↑    │
│ ○ Price ↓    │
│ ○ Popular    │
│              │
│ [APPLY] [×]  │
└──────────────┘
```

---

### Toast Notifications

**Add to Cart Success:**
```
┌─────────────────────────────┐
│ ✓ Added to cart             │
│ [View Cart]                 │ ← Optional action
└─────────────────────────────┘

(Slides in from bottom, disappears after 4s)
```

**Error State:**
```
┌─────────────────────────────┐
│ ✕ Oops! Please select a size│
│                             │
└─────────────────────────────┘

(Red bg, 5s duration or manual dismiss)
```

**Loading State:**
```
┌─────────────────────────────┐
│ ⟳ Processing payment...     │
└─────────────────────────────┘

(Spinner, no auto-dismiss)
```

---

### Loading States (Skeleton)

**Product Grid Loading:**
```
[████] [████] [████] [████]
[━━━━] [━━━━] [━━━━] [━━━━]
[████] [████] [████] [████]

(Gray placeholder cards, subtle animation pulse)
```

---

## SPACING SYSTEM

**Desktop:**
- Outer margins: 40px
- Section padding: 40px
- Grid gutter: 24px
- Component padding: 20px

**Mobile:**
- Outer margins: 15px
- Section padding: 20px
- Grid gutter: 10px
- Component padding: 15px

**Vertical Rhythm:**
- Section spacing: 60px (desktop), 40px (mobile)
- Element spacing: 20px (desktop), 15px (mobile)
- Tight spacing: 8px

---

## RESPONSIVE BREAKPOINTS

```css
mobile:      < 480px
mobile-lg:   480px - 768px
tablet:      768px - 1024px
desktop:     1024px - 1920px
desktop-xl:  > 1920px
```

**Key Changes:**
- 1 col (mobile) → 2 col (tablet) → 4 col (desktop)
- Menu: Hamburger (mobile) → Hamburger (tablet) → Full nav (desktop)
- Product cards: Stack → Grid
- Forms: Full-width → Narrower container