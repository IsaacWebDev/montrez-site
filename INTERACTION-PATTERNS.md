# MONTREZ SITE - INTERACTION PATTERNS & MICRO-INTERACTIONS

**Version:** 1.0  
**Date:** 2026-03-18

---

## MICRO-INTERACTIONS LIBRARY

### 1. ENTRANCE FLOW INTERACTIONS

#### 1.1 Landing Page → Modal Entrance

**Trigger:** Click "ENTER" button

**Animation Sequence:**
```
1. Button click → Scale down 0.98 (50ms)
2. Scale back to 1 (50ms)
3. Button opacity fade (100ms)
4. Modal slides up from bottom (250ms, ease-out)
5. Modal content fades in (200ms, staggered)
   - Tabs fade in first
   - Input fields fade in second (50ms delay)
   - Button fades in last (100ms delay)
```

**CSS Approach:**
```css
/* Button press */
button:active {
  transform: scale(0.98);
}

/* Modal entrance */
@keyframes slideUp {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal {
  animation: slideUp 0.25s ease-out;
}

/* Staggered content */
.modal-tab { animation: slideUp 0.25s ease-out; }
.modal-input { animation: slideUp 0.25s ease-out 0.05s both; }
.modal-button { animation: slideUp 0.25s ease-out 0.1s both; }
```

---

#### 1.2 Tab Switching (Password ↔ Email)

**Trigger:** Click tab

**Animation Sequence:**
```
1. Tab underline slides to new tab (150ms, ease-in-out)
2. Current content fades out (100ms)
3. New content fades in (100ms)
4. Content opacity: 0 → 1
```

**Interaction Details:**
- Active tab: White underline, bold text
- Inactive tab: 50% opacity
- Smooth color transition on hover (100ms)
- Content switches without delay (smoother feel)

**CSS:**
```css
@keyframes fadeInOut {
  0% { opacity: 0; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}

.modal-content {
  animation: fadeInOut 0.2s ease-out;
}

.tab-indicator {
  transition: left 0.15s ease-in-out;
}
```

---

#### 1.3 Code Input Auto-Focus

**Trigger:** User enters digit in code field

**Behavior:**
```
User enters "5" in field 1
↓
Field 1 shows "5"
↓
Auto-focus moves to field 2 (smooth focus ring animation)
↓
Field 2 ready for input
↓
If user presses backspace on empty field → Focus back to field 1
```

**Interaction Details:**
- No visual "jump", smooth focus transition
- Highlight next field (focus ring visible)
- Allow manual tab/click to reorder
- Delete/backspace deletes digit and moves focus back

**Implementation:**
```javascript
// Auto-focus to next field on input
codeInput[index].addEventListener('input', (e) => {
  if (e.target.value && index < 5) {
    codeInput[index + 1].focus();
  }
});

// Go back on delete
codeInput[index].addEventListener('keydown', (e) => {
  if (e.key === 'Backspace' && !e.target.value && index > 0) {
    codeInput[index - 1].focus();
  }
});
```

---

#### 1.4 Form Validation Feedback

**Real-time Validation (Email Input):**

```
User types: "example"
↓
Status: ❌ Invalid email format
Text color: Red (#FF4444), 12px, below input
↓
User types: "example@email"
↓
Status: ⚠ Almost there...
Text color: Orange (#FFA500)
↓
User types: "example@email.com"
↓
Status: ✓ Email valid
Text color: Green (#4CAF50)
Button enabled (from disabled state)
```

**Interactions:**
- Check after user stops typing (300ms debounce)
- Show icon + message
- Smooth color transition (150ms)
- Focus ring changes color based on state (red for error, green for valid)

---

#### 1.5 Error Shake Animation

**Trigger:** Wrong password or code

**Animation Sequence:**
```
1. Input field shakes left-right (150ms, keyframes)
   - translateX(-5px) → translateX(5px) → translateX(0)
2. Background flashes red (50% opacity, 200ms)
3. Error message appears below (fade in, 100ms)
4. Auto-clear input (optional)
```

**CSS:**
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.input.error {
  animation: shake 0.15s ease-in-out;
  background: rgba(255, 68, 68, 0.1);
  border-color: #FF4444;
}

.error-message {
  animation: fadeIn 0.1s ease-out;
  color: #FF4444;
  font-size: 12px;
  margin-top: 4px;
}
```

---

#### 1.6 Video Skip Button

**Stage 1: Video playing (0-2 seconds)**
- "Skip in 2s..." text, 30% opacity
- Button disabled (grayed out)
- Countdown updates every second

**Stage 2: After 2 seconds**
- Text changes to "Skip now"
- Button enabled (white text, cursor pointer)
- Slight background color change

**Stage 3: Click Skip**
- Button changes to "Skipping..." (spinner)
- Video fades out (200ms)
- Transition to homepage

**CSS:**
```css
.skip-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.skip-button:enabled {
  opacity: 1;
  cursor: pointer;
  transition: background 0.2s;
}

.skip-button:enabled:hover {
  background: rgba(255, 255, 255, 0.1);
}
```

---

## 2. NAVIGATION INTERACTIONS

### 2.1 Hamburger Menu Open/Close

**Trigger:** Click hamburger icon (☰)

**Animation Sequence:**
```
1. Hamburger icon transforms:
   - Top line: rotates 45°, moves up
   - Middle line: opacity 0
   - Bottom line: rotates -45°, moves down
   Duration: 250ms, ease-in-out

2. Menu drawer slides in from left:
   - translateX(-100%) → translateX(0)
   Duration: 250ms, ease-out
   
3. Background overlay fades in:
   - opacity: 0 → 0.9
   Duration: 250ms

4. Menu items fade in (staggered):
   - Each item: opacity 0 → 1
   - Stagger delay: 30ms
   - Duration: 200ms
```

**Click Outside Behavior:**
- Click overlay → Menu slides out
- Same animation in reverse

**Mobile Considerations:**
- Use CSS transforms (GPU-accelerated)
- No lag on low-end devices
- Touch-friendly: 56px tall header, 48px items

---

### 2.2 Search Modal

**Trigger:** Click 🔍 icon

**Animation Sequence:**
```
1. Overlay fades in (150ms, ease-out)
2. Search header slides down from top (200ms, ease-out)
3. Input auto-focuses (no animation, instant)
4. Cursor blinks in input
```

**Typing Behavior:**
```
User types "speak"
↓
Debounce 300ms
↓
Filter products matching "speak no evil"
↓
Results fade in (100ms)
↓
Show 3-5 matching products
↓
If no results: "No products found. Browse shop?"
```

**Result Interaction:**
- Click result → Navigate to product page (fade out modal)
- Highlight on hover (slight background)
- Touch: Full-width tap area (44px+ height)

---

### 2.3 Account Dropdown (Desktop)

**Trigger:** Click 👤 icon (desktop only)

**Animation:**
```
Dropdown slides down from header (150ms, ease-out)
- transform: translateY(-10px) → translateY(0)
- opacity: 0 → 1

Click outside → Fade out and slide up (100ms)
```

**Menu Items:**
```
Account
Settings
Orders
Wishlist
────────
Logout
```

---

## 3. PRODUCT DISCOVERY INTERACTIONS

### 3.1 Product Card Hover Effect (Desktop)

**Trigger:** Mouse hover on product card

**Animation Sequence:**
```
1. Image zooms in slightly (1.05x, 200ms, ease-out)
2. Overlay appears (semi-transparent black, 0.3 opacity, 150ms)
3. "View Details" button fades in (100ms, with stagger)
4. Price shifts slightly (translateY(-2px), 200ms)
```

**Interaction:**
- Smooth transition (no jump)
- Button click → Navigate to product page
- Cursor changes to pointer on hover

**CSS:**
```css
.product-card {
  transition: transform 0.2s ease-out;
}

.product-card:hover {
  transform: scale(1.05);
}

.product-card:hover .product-overlay {
  opacity: 0.3;
  animation: fadeIn 0.15s ease-out;
}

.product-card:hover .view-button {
  animation: slideUp 0.2s ease-out;
}
```

---

### 3.2 Filter Application (Mobile)

**Trigger:** Click "Filter & Sort" button

**Animation Sequence:**
```
1. Modal slides up from bottom (250ms, ease-out)
2. Backdrop overlay fades in (200ms)
3. Filter groups fade in (staggered, 30ms per group)
4. User adjusts filters
5. Click "Apply"
6. Modal slides down (150ms, ease-in)
7. Grid updates with skeleton loading
8. Products fade in (100ms)
```

**Empty State:**
```
If no products match filters:
- Show skeleton cards briefly (300ms)
- Fade to "No products found" message
- "Clear filters" button appears
- Click to reset
```

---

### 3.3 Pagination / Load More

**Option A: Load More Button**
```
Button click
↓
Button changes to spinner (100ms)
↓
Text: "Loading..." (disabled state)
↓
API request completes
↓
New products fade in (100ms, staggered)
↓
Button returns to "Load More"
```

**Option B: Infinite Scroll (Alt)**
```
User scrolls near bottom
↓
Automatic load (no button)
↓
Skeleton cards appear
↓
Products fade in
↓
Repeat
```

**Recommendation:** Load More (better for UX, allows control)

---

## 4. PRODUCT DETAIL INTERACTIONS

### 4.1 Image Gallery (Desktop)

**Thumbnail Hover:**
```
Hover on thumbnail
↓
Thumbnail gets border highlight (2px white, 100ms)
↓
Main image cross-fades to new image (200ms)
↓
Smooth transition (no jump)
```

**Click Thumbnail → Lightbox:**
```
Click main image
↓
Lightbox fades in (200ms)
↓
Image centered, full-width
↓
Swipe left/right → Navigate gallery
↓
Close button (×) top-right
↓
Click overlay → Close lightbox
```

**Keyboard Navigation (Lightbox):**
- Arrow keys: Navigate gallery
- Escape: Close lightbox
- Space: Toggle fullscreen

---

### 4.2 Image Gallery (Mobile)

**Swipe Gestures:**
```
Swipe left
↓
Current image fades out (100ms)
↓
Next image fades in (100ms)
↓
Auto-play next (if video)
```

**Lazy Loading:**
```
Load primary image first
↓
Lazy load thumbnails below fold
↓
Show placeholders while loading
```

---

### 4.3 Color/Size Selector Interaction

**Color Selector:**
```
Click color swatch
↓
Swatch gets white border (150ms transition)
↓
Previously selected: border removed
↓
Main image updates (if multiple colors)
↓
Price may change
```

**Size Selector:**
```
Available sizes: [XS][S][M][L][XL][XXL]
Unavailable sizes: Grayed out (50% opacity)

Click size
↓
Size gets white border + background highlight
↓
Button enables (if previously disabled)
↓
"Only 2 left" label appears if low stock
```

**Error State:**
```
User tries to add to cart without selecting size
↓
Button shows error shake (150ms)
↓
Red outline appears around size selector (200ms)
↓
Message: "Please select a size to continue"
↓
Auto-focus size selector (keyboard)
```

---

### 4.4 Add to Cart Interaction

**Option A: Button State Change (Recommended)**
```
Click [ADD TO CART]
↓
Button disables (opacity 0.5)
↓
Text changes to "Adding..." with spinner
↓
After 500ms delay (simulating API)
↓
Text changes to "Added ✓"
↓
Button background changes (slight color shift)
↓
After 2s: Button returns to "ADD TO CART"
```

**Option B: Toast Notification (Alt)**
```
Click [ADD TO CART]
↓
Toast appears bottom-right
↓
"✓ Added 1x ARCHITECT HOODIE to cart"
↓
Optional [View Cart] link in toast
↓
Toast auto-dismisses after 4s (or click ×)
↓
Toast slides in from right (200ms)
↓
Toast slides out to right (200ms, on dismiss)
```

**Wishlist Interaction:**
```
Click ❤ (unfilled)
↓
Heart fills in red (150ms, scale animation)
↓
Heart animates: scale 0.8 → 1.1 → 1 (200ms)
↓
Text appears: "Saved to wishlist"
↓
On next visit: Heart starts filled
```

---

### 4.5 Related Products Carousel (Mobile)

**Horizontal Scroll (Native):**
```
Swipe left
↓
Products slide left (momentum scroll)
↓
Show next products
↓
Snap to grid (iOS-style)
```

**Pagination Dots (Optional):**
```
Show dots below carousel
- Filled dot = visible product
- Empty dot = off-screen

Click dot
↓
Scroll to that product (smooth scroll)
↓
Dot highlights
```

---

## 5. CHECKOUT INTERACTIONS

### 5.1 Multi-Step Form Navigation

**Step Progress Indicator:**
```
[●───○───○]
Step 1 | Step 2 | Step 3

Clicking a completed step (●) → Go back
Clicking next step (○) → Validate current step first
```

**Step Validation:**
```
User fills Step 1 → Clicks "Continue"
↓
Validate form
↓
If error: Shake error fields, show error message
↓
If valid: Button disables → Shows spinner
↓
Fade out Step 1 (150ms)
↓
Fade in Step 2 (150ms)
↓
Auto-focus first input in Step 2
```

**Back Button:**
```
Click "Back"
↓
Fade out current step (100ms)
↓
Fade in previous step (100ms)
↓
Preserve form data (use session storage)
↓
Focus on first field
```

---

### 5.2 Address Autocomplete (Form)

**Trigger:** User starts typing in address field

**Behavior:**
```
User types "123 rue"
↓
Debounce 300ms
↓
Show dropdown with suggestions
↓
Fade in suggestions (100ms)
↓
Highlight first suggestion (hover effect)
↓
Arrow keys navigate suggestions
↓
Click or Enter → Select suggestion
↓
Auto-fill: Address, City, Postal Code
```

---

### 5.3 Payment Form Interaction

**Card Number Input:**
```
User types: "4111111111111111"
↓
Real-time formatting: "4111 1111 1111 1111"
↓
Card type detection (Visa/Mastercard icon appears)
↓
Auto-advance to Exp field after complete
```

**Expiry Field:**
```
User types: "12"
↓
Format: "12/"
↓
Auto-advance to CVC field
```

**CVC Field:**
```
User types: "123"
↓
All fields filled
↓
"Complete Order" button enables
```

**Submit:**
```
Click "Complete Order"
↓
Form disables (opacity 0.5)
↓
Spinner appears in button
↓
Text changes: "Processing payment..."
↓
Submit to backend
↓
If error: Form re-enables, show error message, shake
↓
If success: Redirect to confirmation (fade out, fade in)
```

---

### 5.4 Cart Mini-Preview

**Option A: Toast on Add**
```
User adds product to cart
↓
Toast slides in from bottom-right
↓
Shows: [Product Image] [Name] [$Price] ✓
↓
Toast stays 3s
↓
Slide out
```

**Option B: Header Badge Update**
```
Cart count badge: "0" → "1"
↓
Badge scales up (1 → 1.2) then down (1.2 → 1)
↓
Animation: 300ms, elastic easing
↓
Number updates immediately
```

---

## 6. MOBILE-SPECIFIC INTERACTIONS

### 6.1 Pull to Refresh (Homepage)

**Gesture:**
```
User drags down on hero section
↓
Pull down 80px
↓
Show refresh icon (rotate as drag continues)
↓
Release → API call (simulated)
↓
Spinner shows while loading (2s)
↓
Fade in new products
↓
Scroll back to top (smooth)
```

**Interaction:**
- Works on homepage only (hero section)
- Visual feedback (icon rotation)
- Haptic feedback (if device supports)

---

### 6.2 Long Press Context Menu

**Trigger:** Long press (hold 500ms) on product

**Menu Options:**
```
Share
Save to Wishlist
View Details
```

**Animation:**
```
Haptic feedback + sound
↓
Context menu slides up from bottom
↓
Overlay fades in (semi-transparent)
↓
Click option → Execute action
↓
Menu closes (slide down)
```

---

### 6.3 Swipe to Go Back

**Navigation Stack:**
```
Home → Shop → Product Detail

Swipe right from Product Detail
↓
Product page slides out to right (200ms)
↓
Shop page slides back in from left
↓
Navigation updates
```

**Implementation:**
- Horizontal swipe distance > 50px
- Animation: 200ms, ease-out
- Auto-scroll to previous scroll position

---

## 7. LOADING & EMPTY STATES

### 7.1 Skeleton Loading

**Appearance:**
```
[████████████████]  ← Gray placeholder
[━━━━━━━━━━━━━━━]
[████████████████]
```

**Animation:**
```
Pulse animation: opacity 0.6 → 1 → 0.6
Duration: 1.5s, loop
Easing: ease-in-out
```

**Timing:**
- Show skeletons immediately (no delay)
- Replace with real content when loaded (fade in)
- Minimum 300ms display (avoid flashing)

---

### 7.2 Empty Cart State

```
🛒 Your cart is empty

Shop now and find your next favorite piece.

[CONTINUE SHOPPING] button
```

**Animation:**
- Icon appears first (bounce in, 300ms)
- Text fades in (200ms, 100ms delay)
- Button slides up (200ms, 150ms delay)

---

### 7.3 No Products Found (Filters)

```
🔍 No products found

Try adjusting your filters or search terms.

[CLEAR FILTERS] [GO BACK TO SHOP]
```

**Animation:**
- Fade in (200ms)
- Show suggestion text
- Clear filters button prominent

---

## 8. ERROR HANDLING

### 8.1 Network Error

**Display:**
```
⚠ Something went wrong

Please check your connection and try again.

[RETRY]
```

**Interaction:**
- Click Retry → Try API call again
- Show spinner while retrying
- Auto-retry after 5s (optional)

---

### 8.2 Validation Error (Form)

```
Form field border turns red (150ms transition)
Red text appears below: "This field is required"
Field shakes (100ms)
Auto-focus field (keyboard)
```

---

### 8.3 Out of Stock

```
Product card shows "Sold Out" badge
Image darkens (0.5 opacity)
Add to Cart button disabled
Shows "Notify me" button instead
```

---

## 9. ANIMATION EASING FUNCTIONS

**Standard Easing Presets:**

| Easing | Use Case | Timing |
|--------|----------|--------|
| **ease-out** | Entering, appearing | 200-300ms |
| **ease-in-out** | State changes, switching | 150-250ms |
| **ease-in** | Exiting, dismissing | 100-200ms |
| **cubic-bezier(0.34, 1.56, 0.64, 1)** | Bouncy, playful | 300-500ms |
| **cubic-bezier(0.68, -0.55, 0.265, 1.55)** | Elastic, springy | 400-600ms |

**CSS Variables (Recommended):**
```css
:root {
  --transition-short: 150ms ease-in-out;
  --transition-medium: 250ms ease-out;
  --transition-long: 400ms ease-in-out;
  --transition-bounce: 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 10. ACCESSIBILITY IN INTERACTIONS

### 10.1 Reduced Motion

**For users with `prefers-reduced-motion`:**

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Result:** Instant state changes, no animations

---

### 10.2 Focus Management

**Modal Opening:**
```
Modal opens
↓
Focus moves to first input in modal (auto-focus)
↓
Tab order restricted to modal only (trap focus)
↓
Modal closes
↓
Focus returns to button that opened modal
```

---

### 10.3 Keyboard Navigation

**All interactions must work with keyboard:**
- Tab: Move to next element
- Shift+Tab: Move to previous element
- Enter: Activate button/link
- Space: Toggle checkbox/radio
- Arrow keys: Navigate carousel/menu

**Visible Focus Indicators:**
- 2px white outline
- 4px offset from element
- High contrast background

---

## 11. PERFORMANCE OPTIMIZATION

### 11.1 GPU Acceleration

**Use transforms and opacity (GPU-friendly):**
```css
/* ✓ GOOD - GPU accelerated */
transform: translateX(10px);
opacity: 0.5;

/* ✗ AVOID - CPU rendering */
left: 10px;
background-color: rgba(255, 255, 255, 0.5);
```

---

### 11.2 Debouncing

**Debounce delays:**
| Action | Delay |
|--------|-------|
| Search input | 300ms |
| Window resize | 250ms |
| Scroll events | 150ms |
| Form validation | 500ms |

---

### 11.3 Lazy Loading Images

```javascript
// Use IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadImage(entry.target);
      observer.unobserve(entry.target);
    }
  });
});
```

---

## SUMMARY: INTERACTION CHECKLIST

✓ Entrance flow (smooth, exclusive feel)  
✓ Navigation (responsive, touch-friendly)  
✓ Product discovery (visual feedback, hover states)  
✓ Product details (gallery, selections, cart)  
✓ Checkout (validation, progression, confirmation)  
✓ Mobile (gestures, thumb zones, touch targets)  
✓ Loading states (skeleton, feedback)  
✓ Error handling (clear messages, recovery)  
✓ Accessibility (keyboard, focus, reduced motion)  
✓ Performance (GPU acceleration, debouncing)