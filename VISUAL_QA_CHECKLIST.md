# Visual QA Checklist - Shop & Collections Pages

**Test Date:** _____________  
**Tester:** _____________  
**Browser:** _____________  
**Device:** _____________  

---

## 📱 Responsive Layout Testing

### Desktop (1920px)
- [ ] Shop page: 4-column product grid displayed correctly
- [ ] Collections: 4-column grid (2 rows, 8 cards total)
- [ ] Sidebar: 260px width, sticky positioning works
- [ ] All spacing matches design (60-80px section padding)
- [ ] Typography scales properly (3.5-4rem titles)
- [ ] Breadcrumbs visible and clickable
- [ ] Filter sidebar stays in view on scroll

### Laptop (1440px)
- [ ] Product grid maintains 4 columns
- [ ] Collections grid maintains 4 columns
- [ ] Sidebar width adjusted appropriately
- [ ] No horizontal scrolling
- [ ] All text remains readable

### Tablet (1024px)
- [ ] Shop grid switches to 2 columns
- [ ] Collections grid switches to 2 columns
- [ ] Sidebar width adjusted or hidden
- [ ] Touch targets minimum 44px
- [ ] Filter toggle button appears on mobile

### Mobile (768px)
- [ ] Product grid switches to 2 columns
- [ ] Collections grid switches to 1 column
- [ ] Sidebar becomes collapsible
- [ ] Breadcrumbs still visible
- [ ] All buttons remain tappable
- [ ] Typography scales down properly

### Small Mobile (480px)
- [ ] Product grid switches to 1 column
- [ ] All cards full width
- [ ] No layout breaking
- [ ] Images maintain aspect ratio
- [ ] Buttons stack vertically if needed

---

## 🎨 Visual Design Testing

### Colors & Backgrounds
- [ ] Background: #FAFAF8 (warm off-white)
- [ ] Cards: #FFFFFF (pure white)
- [ ] Text: #000 primary, rgba variations for secondary
- [ ] Borders: Subtle rgba(0,0,0,0.05-0.15)
- [ ] No color banding or gradients breaking

### Typography
- [ ] Bebas Neue loading for display text
- [ ] Inter loading for body text
- [ ] All text readable (minimum 0.75rem)
- [ ] Letter spacing applied correctly
- [ ] Line heights comfortable (1.5-1.6 for body)
- [ ] No text overflow or truncation issues

### Spacing & Alignment
- [ ] Consistent card gaps (24px/20px/16px)
- [ ] Section padding matches (80/60/50px)
- [ ] All elements aligned to grid
- [ ] No awkward spacing jumps
- [ ] Margins consistent throughout

### Images
- [ ] Product images: 4:5 aspect ratio
- [ ] Collection images: 4:5 aspect ratio
- [ ] No image distortion
- [ ] All images load correctly
- [ ] Fallback images work if main fails
- [ ] Object-fit: cover applied correctly

---

## 🖱️ Interaction Testing

### Hover States (Desktop/Laptop)

#### Product Cards
- [ ] Card lifts 4px on hover
- [ ] Border changes to rgba(0,0,0,0.15)
- [ ] Shadow appears (dual layer)
- [ ] Image zooms to scale(1.06)
- [ ] Quick View button shows opacity 1
- [ ] Transitions smooth (0.3-0.6s)

#### Collection Cards
- [ ] Card lifts 4px on hover
- [ ] Border darkens
- [ ] Shadow appears (8px blur)
- [ ] Image zooms to scale(1.08)
- [ ] Overlay fades in
- [ ] Arrow slides right on CTA hover

#### Buttons
- [ ] Filter buttons underline on active
- [ ] Load More button inverts colors
- [ ] Quick View button darkens
- [ ] Tab buttons lift slightly
- [ ] All hover states revert on mouse leave

### Click/Tap Interactions
- [ ] Breadcrumb links navigate correctly
- [ ] Filter buttons toggle active state
- [ ] Category filters update products
- [ ] Size filters work correctly
- [ ] Price range slider functional
- [ ] Sort dropdown changes order
- [ ] Reset filters button works
- [ ] Collection cards navigate to shop
- [ ] Load More button (placeholder) responds
- [ ] Quick View modal opens

### Mobile Touch
- [ ] All touch targets ≥ 44px
- [ ] No double-tap zoom on buttons
- [ ] Swipe gestures don't interfere
- [ ] Filter toggle shows/hides sidebar
- [ ] Dropdowns work on touch devices

---

## 🔍 Shop Page Specific

### Header Section
- [ ] Title: "SHOP" centered, uppercase
- [ ] Subtitle: "Pas pour Tout" italic, lighter
- [ ] Search info displays when searching
- [ ] Breadcrumbs: Home / Shop

### Filter Sidebar
- [ ] Sticky positioning below navbar
- [ ] "Filters" heading and "Reset" link visible
- [ ] Category filter buttons vertical stack
- [ ] Size grid: 3 columns (5 on small mobile)
- [ ] Price range inputs and slider work
- [ ] Active states clearly visible
- [ ] Filters collapse on mobile

### Products Area
- [ ] Results count displays correctly
- [ ] Sort dropdown aligned right
- [ ] Grid updates when filters change
- [ ] "No products found" shows when empty
- [ ] Product cards uniform height
- [ ] Load more functionality (if implemented)

### Product Cards in Grid
- [ ] Image aspect ratio: 4:5
- [ ] Badges positioned top-right
- [ ] Quick View centered bottom
- [ ] Product name + price below image
- [ ] Hover states work correctly
- [ ] Second image shows on hover (if exists)

---

## 🎯 Collections Page Specific

### Header Section
- [ ] Title: "COLLECTIONS" centered
- [ ] Subtitle: "Curated selections..."
- [ ] Breadcrumbs: Home / Collections

### Collection Tabs
- [ ] All 4 tabs visible and labeled
- [ ] Active tab has black background
- [ ] Inactive tabs have border only
- [ ] Tab change updates content
- [ ] Mobile: tabs wrap correctly

### Collection Info
- [ ] Collection title displays
- [ ] Description text centered
- [ ] Product count shows (X pieces)
- [ ] Smooth fade-in on tab change

### Collection Cards (8 total)
- [ ] 4×2 grid on desktop
- [ ] Image aspect ratio: 4:5
- [ ] Title, description, CTA visible
- [ ] Left-aligned content
- [ ] Hover: lift, shadow, zoom
- [ ] Arrow animates on CTA hover
- [ ] All cards navigate to shop

### Footer
- [ ] Panther logo centered
- [ ] Logo opacity 0.7 → 0.9 on hover
- [ ] Load More button below logo
- [ ] Button hover: black bg, white text

---

## ♿ Accessibility Testing

### Semantic HTML
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Breadcrumbs use `<nav>` with aria-label
- [ ] Buttons use `<button>` not `<div>`
- [ ] Links use `<a>` for navigation
- [ ] Images have alt text

### Keyboard Navigation
- [ ] Tab key moves through interactive elements
- [ ] Focus states visible on all inputs
- [ ] Enter activates buttons
- [ ] Escape closes modals
- [ ] No keyboard traps

### Screen Reader
- [ ] Breadcrumb navigation announced
- [ ] Button purposes clear
- [ ] Product count announced
- [ ] Filter changes announced
- [ ] Images have descriptive alt text

### Color Contrast
- [ ] All text meets WCAG AA (4.5:1)
- [ ] Buttons have sufficient contrast
- [ ] Border colors visible
- [ ] Disabled states distinguishable

---

## 🚀 Performance Testing

### Load Times
- [ ] Images lazy load below fold
- [ ] Page interactive in < 3 seconds
- [ ] No layout shift (CLS)
- [ ] Fonts load without FOUT/FOIT
- [ ] No janky scrolling

### Animations
- [ ] Hover transitions smooth (60fps)
- [ ] Image zoom doesn't lag
- [ ] Grid transitions don't stutter
- [ ] No animation on reduced motion

### Network
- [ ] Works on slow 3G
- [ ] Images optimized (WebP preferred)
- [ ] CSS minified for production
- [ ] No unnecessary re-renders

---

## 🐛 Common Issues Checklist

### Layout Issues
- [ ] No horizontal overflow on any breakpoint
- [ ] Grid doesn't break with odd product counts
- [ ] Cards maintain equal height
- [ ] No orphaned elements
- [ ] Footer always at bottom

### Typography Issues
- [ ] No font-weight inconsistencies
- [ ] Letter-spacing not too wide
- [ ] Line-height prevents text overlap
- [ ] Uppercase doesn't cause text cut-off
- [ ] No text rendering artifacts

### Image Issues
- [ ] No stretched or squished images
- [ ] Consistent aspect ratios
- [ ] Background colors match design
- [ ] Hover images load properly
- [ ] No broken image icons

### Interaction Issues
- [ ] Hover states don't flicker
- [ ] Click doesn't trigger after hover
- [ ] Modal doesn't open twice
- [ ] Filters don't reset unexpectedly
- [ ] Breadcrumbs navigate correctly

---

## ✅ Final Checks

### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Device Testing
- [ ] Desktop monitor (1920px+)
- [ ] Laptop (1440px)
- [ ] iPad Pro (1024px)
- [ ] iPad (768px)
- [ ] iPhone Pro Max (430px)
- [ ] iPhone SE (375px)

### Production Ready
- [ ] All links functional
- [ ] All images loading
- [ ] All fonts loading
- [ ] No console errors
- [ ] No console warnings
- [ ] Lighthouse score > 90
- [ ] Accessibility score > 90

---

## 📝 Notes Section

**Issues Found:**
_______________________________________________
_______________________________________________
_______________________________________________

**Recommendations:**
_______________________________________________
_______________________________________________
_______________________________________________

**Sign-off:**
- [ ] Design approved
- [ ] Development approved
- [ ] Client approved
- [ ] Ready for deployment

---

**Tester Signature:** _______________  
**Date:** _______________  
**Status:** ⬜ Pass | ⬜ Fail | ⬜ Needs Review
