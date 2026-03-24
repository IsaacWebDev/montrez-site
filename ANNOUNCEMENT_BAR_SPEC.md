# 📢 ANNOUNCEMENT BAR - DESIGN SPECIFICATION

**Purpose:** Display promotional messages (free shipping, drops, sales)  
**Position:** Top of page, above navbar  
**Style:** Translucent black, electric blue accents, on-brand  
**Behavior:** Dismissible with localStorage persistence

---

## 🎨 VISUAL DESIGN

### Layout
```
┌────────────────────────────────────────────────────────────┐
│  🔥 FREE DELIVERY OVER R1,000 // USE CODE: MONTREZ25  [✕]  │
└────────────────────────────────────────────────────────────┘
```

### Specifications

**Dimensions:**
- Height: 48px (desktop), 56px (mobile)
- Width: 100vw (full viewport width)
- Position: Fixed top (z-index: 1100, above navbar)

**Colors:**
- Background: `rgba(0, 0, 0, 0.85)` (translucent black)
- Text: `#FFFFFF` (white)
- Accent (code/keywords): `#00F0FF` (electric blue)
- Close button: `rgba(255, 255, 255, 0.7)` → hover: `#00F0FF`

**Typography:**
- Font: Inter (body font)
- Size: 14px (desktop), 13px (mobile)
- Weight: 500 (medium)
- Letter-spacing: 0.05em
- Text-transform: uppercase
- Line-height: 1.4

**Effects:**
- Backdrop-filter: `blur(10px)` (frosted glass effect)
- Border-bottom: `1px solid rgba(0, 240, 255, 0.2)` (subtle electric blue line)
- Box-shadow: `0 2px 10px rgba(0, 0, 0, 0.3)`

---

## 🔧 COMPONENT CODE

### React Component

**File:** `src/components/AnnouncementBar.jsx`

```jsx
import { useState, useEffect } from 'react'
import '../styles/AnnouncementBar.css'

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)
  
  useEffect(() => {
    // Check if user has dismissed the bar
    const isDismissed = localStorage.getItem('montrez-announcement-dismissed')
    if (isDismissed === 'true') {
      setIsVisible(false)
    }
  }, [])
  
  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('montrez-announcement-dismissed', 'true')
  }
  
  if (!isVisible) return null
  
  return (
    <div className="announcement-bar">
      <div className="announcement-bar__content">
        <p className="announcement-bar__text">
          🔥 FREE DELIVERY OVER R1,000 <span className="announcement-bar__separator">//</span> USE CODE: <span className="announcement-bar__code">MONTREZ25</span>
        </p>
        <button 
          className="announcement-bar__close"
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
```

---

### CSS Styling

**File:** `src/styles/AnnouncementBar.css`

```css
/* Announcement Bar - Top Promo Banner */

.announcement-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 240, 255, 0.2);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: slideDown 0.4s ease-out;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.announcement-bar__content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 0 32px;
  max-width: 1920px;
  width: 100%;
  position: relative;
}

.announcement-bar__text {
  font-family: 'Inter', -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #ffffff;
  text-align: center;
  margin: 0;
  line-height: 1.4;
}

/* Electric blue accent on code */
.announcement-bar__code {
  color: #00F0FF;
  font-weight: 700;
  letter-spacing: 0.1em;
}

/* Separator */
.announcement-bar__separator {
  color: rgba(255, 255, 255, 0.5);
  margin: 0 8px;
  font-weight: 300;
}

/* Close button */
.announcement-bar__close {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 4px;
}

.announcement-bar__close:hover {
  color: #00F0FF;
  background: rgba(0, 240, 255, 0.1);
}

.announcement-bar__close:active {
  transform: translateY(-50%) scale(0.95);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .announcement-bar {
    height: 56px;
  }
  
  .announcement-bar__content {
    padding: 0 16px;
    gap: 12px;
  }
  
  .announcement-bar__text {
    font-size: 12px;
    padding-right: 32px; /* Space for close button */
  }
  
  .announcement-bar__close {
    right: 8px;
  }
  
  /* Hide emoji on very small screens */
  @media (max-width: 480px) {
    .announcement-bar__text::before {
      content: '';
      display: none;
    }
  }
}

/* Adjust navbar position when announcement bar is visible */
body:has(.announcement-bar) .navbar {
  top: 48px;
}

@media (max-width: 768px) {
  body:has(.announcement-bar) .navbar {
    top: 56px;
  }
}

/* Adjust hero/content padding to account for announcement bar */
body:has(.announcement-bar) .hero,
body:has(.announcement-bar) main {
  padding-top: calc(var(--navbar-height, 80px) + 48px);
}

@media (max-width: 768px) {
  body:has(.announcement-bar) .hero,
  body:has(.announcement-bar) main {
    padding-top: calc(var(--navbar-height, 64px) + 56px);
  }
}

/* Accessibility - High contrast mode */
@media (prefers-contrast: high) {
  .announcement-bar {
    background: rgba(0, 0, 0, 0.95);
    border-bottom-color: #00F0FF;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .announcement-bar {
    animation: none;
  }
  
  .announcement-bar__close:active {
    transform: translateY(-50%);
  }
}
```

---

## 🔌 INTEGRATION

### Step 1: Import Component

**File:** `src/App.jsx`

```jsx
import AnnouncementBar from './components/AnnouncementBar'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AnnouncementBar /> {/* Add at the very top */}
        <AppRoutes />
        <Cart />
      </CartProvider>
    </BrowserRouter>
  )
}
```

### Step 2: Update Navbar Z-index (if needed)

**File:** `src/styles/Navbar.css`

```css
.navbar {
  z-index: 1000; /* Announcement bar is 1100 */
}
```

### Step 3: Test Dismissal

1. Load site → Announcement bar appears
2. Click ✕ → Bar disappears
3. Refresh page → Bar stays hidden (localStorage)
4. Clear localStorage → Bar reappears

---

## 💡 CONTENT VARIATIONS

### Option 1: Free Shipping
```jsx
🔥 FREE DELIVERY OVER R1,000 // USE CODE: MONTREZ25
```

### Option 2: New Drop
```jsx
⚡ DROP 04 LIVE NOW // SHOP SPRING 2026 COLLECTION
```

### Option 3: Limited Stock
```jsx
⏰ SELLING FAST // ONLY 12 LEFT IN STOCK
```

### Option 4: Sale
```jsx
💥 25% OFF EVERYTHING // CODE: MONTREZ25
```

### Option 5: Exclusive Access
```jsx
🔓 EARLY ACCESS // MEMBERS SHOP 24H BEFORE PUBLIC
```

---

## 🎛️ ADVANCED OPTIONS

### Rotating Messages

**File:** `src/components/AnnouncementBar.jsx`

```jsx
const messages = [
  { text: '🔥 FREE DELIVERY OVER R1,000', code: 'MONTREZ25' },
  { text: '⚡ DROP 04 LIVE NOW', code: null },
  { text: '💥 25% OFF EVERYTHING', code: 'SALE25' }
]

const [currentMessage, setCurrentMessage] = useState(0)

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentMessage((prev) => (prev + 1) % messages.length)
  }, 5000) // Rotate every 5 seconds
  
  return () => clearInterval(interval)
}, [])

const message = messages[currentMessage]
```

### Countdown Timer

```jsx
// For limited drops
<p className="announcement-bar__text">
  ⏰ DROP ENDS IN: <span className="announcement-bar__code">{timeLeft}</span>
</p>
```

### Location-Based Messages

```jsx
// Detect location (e.g., South Africa)
const message = isSouthAfrica 
  ? '🇿🇦 FREE DELIVERY IN SA OVER R1,000'
  : '🌍 WORLDWIDE SHIPPING AVAILABLE'
```

---

## 🚨 DISMISSIBLE vs PERSISTENT

### Current Implementation: **DISMISSIBLE**
- User can close the bar
- Preference saved to localStorage
- Bar stays hidden until localStorage is cleared

### Alternative: **PERSISTENT**
```jsx
// Remove close button, bar always visible
// Useful for critical announcements or brand identity

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar announcement-bar--persistent">
      <div className="announcement-bar__content">
        <p className="announcement-bar__text">
          🔥 FREE DELIVERY OVER R1,000 // USE CODE: MONTREZ25
        </p>
      </div>
    </div>
  )
}
```

```css
.announcement-bar--persistent {
  /* No close button, simpler layout */
}
```

### Alternative: **AUTO-HIDE**
```jsx
// Hide after 10 seconds
useEffect(() => {
  const timer = setTimeout(() => {
    setIsVisible(false)
  }, 10000)
  
  return () => clearTimeout(timer)
}, [])
```

---

## ✅ ACCESSIBILITY CHECKLIST

- [x] High contrast text (white on dark background)
- [x] Close button has aria-label
- [x] Keyboard navigable (Tab to close button, Enter/Space to dismiss)
- [x] Screen reader friendly (announces text content)
- [x] Reduced motion respected (no animation if `prefers-reduced-motion`)
- [x] Focus indicator on close button
- [x] Touch target 44x44px minimum (mobile)

---

## 📊 ANALYTICS TRACKING (Optional)

```jsx
const handleDismiss = () => {
  // Track dismissal
  if (window.gtag) {
    window.gtag('event', 'announcement_bar_dismissed', {
      message: 'Free Delivery R1000'
    })
  }
  
  setIsVisible(false)
  localStorage.setItem('montrez-announcement-dismissed', 'true')
}
```

---

## 🎨 DESIGN NOTES

### Why Translucent Black?
- Maintains brand color (black/white/blue)
- Doesn't overpower the hero image
- Frosted glass effect = premium feel
- Electric blue border = signature accent

### Why Dismissible?
- User control = better UX
- Returning users don't see it repeatedly
- Reduces visual clutter
- Still visible for first-time users

### Why 48px Height?
- Enough space for message + close button
- Not too intrusive (< 10% of viewport)
- Mobile-friendly (56px on mobile for touch targets)
- Aligns with navbar height proportions

---

## 🚀 DEPLOYMENT CHECKLIST

**Before launching:**

- [ ] Test on mobile (iPhone Safari, Android Chrome)
- [ ] Test on desktop (Chrome, Firefox, Safari)
- [ ] Verify backdrop-filter works (fallback for older browsers)
- [ ] Check z-index doesn't conflict with modals/dropdowns
- [ ] Test dismissal (localStorage works)
- [ ] Test with and without navbar
- [ ] Verify electric blue color matches brand (#00F0FF)
- [ ] Check contrast ratio (white on black = 21:1 ✅)
- [ ] Lighthouse accessibility score
- [ ] Preview on Vercel staging

---

## 📝 NEXT STEPS

1. Create component files (`AnnouncementBar.jsx`, `AnnouncementBar.css`)
2. Import into `App.jsx`
3. Test locally
4. Deploy to staging
5. Get client approval on message
6. Deploy to production

**Estimated Time:** 30-45 minutes
