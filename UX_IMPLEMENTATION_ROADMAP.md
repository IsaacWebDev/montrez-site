# 🚀 UX IMPROVEMENT IMPLEMENTATION ROADMAP
## Montrez Streetwear E-Commerce
**Created:** 2026-03-18  
**Status:** Ready for Implementation

---

# 📊 PRIORITY MATRIX

## 🔴 CRITICAL (BLOCKS LAUNCH)
Must fix before going live. Directly impact revenue.

| Issue | Impact | Effort | Days | Status |
|-------|--------|--------|------|--------|
| **No Checkout Flow** | 💰 BLOCKS REVENUE | Hard | 4-5 | 🔴 |
| **No Cart Functionality** | 💰 BLOCKS REVENUE | Hard | 3-4 | 🔴 |
| **Undersized Touch Targets** | 📉 -30% Mobile Conv | Easy | 1 | 🔴 |
| **No Trust Signals** | 📉 -20% Conversion | Medium | 3-4 | 🔴 |
| **No Product Reviews** | 📉 -15% Avg Order | Medium | 3 | 🔴 |

---

## 🟠 HIGH (FIRST 2 WEEKS)
Important for user experience and discovery.

| Issue | Impact | Effort | Days | Status |
|-------|--------|--------|------|--------|
| **Poor Mobile Filtering** | 📉 -10% Discovery | Medium | 2 | 🟠 |
| **No Image Optimization** | 📉 -15% Mobile Speed | Medium | 2 | 🟠 |
| **Gallery Not Swipeable** | 📉 -5% Engagement | Easy | 1 | 🟠 |
| **Forms Not Mobile-Ready** | 📉 -25% Form Completion | Easy | 1 | 🟠 |
| **Safe Areas Not Handled** | 📉 Minor Mobile UX | Easy | 0.5 | 🟠 |

---

## 🟡 MEDIUM (WEEKS 3-4)
Optimization work; nice-to-haves that improve experience.

| Issue | Impact | Effort | Days | Status |
|-------|--------|--------|------|--------|
| **Incomplete Mobile Menu** | 📉 Minor Navigation | Easy | 0.5 | 🟡 |
| **No Accessibility Features** | 📉 -10% A11y Compliance | Medium | 2 | 🟡 |
| **Limited Sorting Options** | 📉 Minor Discovery | Easy | 1 | 🟡 |

---

# 🎯 LAUNCH TIMELINE (CRITICAL PATH)

```
WEEK 1 (Sprint 1: Foundation)
├─ Day 1: Setup cart context + localStorage
├─ Day 2: Build cart drawer component
├─ Day 3-4: Implement checkout flow (3-step form)
├─ Day 5: Order confirmation page
│
WEEK 2 (Sprint 2: Mobile UX + Trust)
├─ Day 1: Fix touch targets (all interactive elements)
├─ Day 2: Add reviews system (mock data first)
├─ Day 3: Add social proof badges + trust indicators
├─ Day 4: Mobile form optimization (16px fonts, 48px inputs)
├─ Day 5: Image gallery with swipe support
│
WEEK 3 (Sprint 3: Discovery + Polish)
├─ Day 1-2: Advanced filtering (price range, size, search)
├─ Day 3: Image lazy loading + responsive images
├─ Day 4: Safe area handling + header optimization
├─ Day 5: Accessibility audit + fixes
│
WEEK 4 (Sprint 4: Testing + Launch)
├─ Day 1-2: QA testing (mobile + desktop)
├─ Day 3: Performance optimization
├─ Day 4: Analytics setup + conversion tracking
├─ Day 5: Launch monitoring + fixes
```

---

# 💯 DETAILED IMPLEMENTATION PLAN

## PHASE 1: MAKE SITE FUNCTIONAL (4-5 DAYS) 🔴 CRITICAL

### 1.1 Cart Context & State Management (4 hours)
**Goal:** Create shared cart state across app

**Deliverables:**
- CartContext with localStorage persistence
- Add/remove/update cart functions
- useCart custom hook

**File:** `src/context/CartContext.jsx`

**Code:**
```javascript
import { createContext, useContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('montrez-cart')
      return saved ? JSON.parse(saved) : []
    } catch (e) {
      console.error('Failed to load cart:', e)
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('montrez-cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, size, quantity = 1) => {
    const itemId = `${product.id}-${size}`
    
    setCartItems(prev => {
      const existing = prev.find(item => item.id === itemId)
      if (existing) {
        return prev.map(item => 
          item.id === itemId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { ...product, size, quantity, id: itemId }]
    })
  }

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId))
  }

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
    } else {
      setCartItems(prev => 
        prev.map(item => 
          item.id === itemId ? { ...item, quantity } : item
        )
      )
    }
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
```

**Update App.jsx:**
```javascript
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </CartProvider>
  )
}
```

**Checklist:**
- [ ] CartContext created
- [ ] localStorage persistence working
- [ ] All CRUD operations functional
- [ ] useCart hook exported
- [ ] Wrapped in App.jsx
- [ ] No errors in console

---

### 1.2 Cart Drawer Component (3 hours)
**Goal:** Mobile-friendly right-side slide-out cart

**Deliverables:**
- CartDrawer component with animations
- Item display + remove functionality
- Cart totals
- Checkout button

**File:** `src/components/CartDrawer.jsx`

```javascript
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/CartDrawer.css'

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="cart-drawer"
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            {/* Header */}
            <div className="cart-drawer__header">
              <h2>CART ({cartItems.length})</h2>
              <button 
                className="cart-drawer__close"
                onClick={onClose}
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            {/* Items */}
            {cartItems.length === 0 ? (
              <div className="cart-drawer__empty">
                <p>Your cart is empty</p>
                <button 
                  className="btn-secondary"
                  onClick={() => {
                    onClose()
                    navigate('/shop')
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-drawer__items">
                  {cartItems.map(item => (
                    <motion.div
                      key={item.id}
                      className="cart-item"
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item__info">
                        <h3>{item.name}</h3>
                        <p className="size">Size: {item.size}</p>
                        <p className="price">${item.price}</p>
                      </div>
                      <div className="cart-item__controls">
                        <div className="quantity-control">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            +
                          </button>
                        </div>
                        <button
                          className="remove-btn"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove from cart"
                        >
                          ✕
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Summary */}
                <div className="cart-drawer__footer">
                  <div className="cart-summary">
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <span>${totalPrice}</span>
                    </div>
                    <div className="summary-row">
                      <span>Shipping</span>
                      <span>{totalPrice > 500 ? 'FREE' : '$30'}</span>
                    </div>
                    <div className="summary-row total">
                      <span>TOTAL</span>
                      <span>${totalPrice > 500 ? totalPrice : totalPrice + 30}</span>
                    </div>
                  </div>

                  <button 
                    className="btn-primary"
                    onClick={handleCheckout}
                  >
                    CHECKOUT
                  </button>

                  <button
                    className="btn-secondary"
                    onClick={() => {
                      onClose()
                      navigate('/shop')
                    }}
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

**File:** `src/styles/CartDrawer.css`

```css
.cart-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 998;
}

.cart-drawer {
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  max-width: 400px;
  background: #000;
  z-index: 999;
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.cart-drawer__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  background: #000;
  z-index: 10;
}

.cart-drawer__close {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-drawer__items {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.cart-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.cart-item__info {
  flex: 1;
  min-width: 0;
}

.cart-item__info h3 {
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cart-item__controls {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.quantity-control button {
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
}

.remove-btn {
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
}

.cart-drawer__empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.cart-drawer__footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-summary {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.summary-row.total {
  font-weight: 700;
  color: #fff;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* Mobile */
@media (max-width: 480px) {
  .cart-drawer {
    max-width: 100%;
  }
}
```

**Update Navbar.jsx:**
```javascript
// Add state and drawer
import CartDrawer from './CartDrawer'

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <>
      <motion.nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        {/* ... existing nav ... */}
        <button 
          className="navbar__cart"
          onClick={() => setCartOpen(true)}
          aria-label={`Shopping cart, ${totalItems} items`}
        >
          🛒 {totalItems > 0 && <span className="badge">{totalItems}</span>}
        </button>
      </motion.nav>
      
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
```

**Checklist:**
- [ ] CartDrawer component created
- [ ] CSS styled and responsive
- [ ] Add/remove items working
- [ ] Quantity control functional
- [ ] Totals calculated correctly
- [ ] Checkout navigation working
- [ ] Mobile responsive (<480px)

---

### 1.3 Checkout Flow Pages (8-10 hours)
**Goal:** Full 3-step checkout process

**Files to create:**
- `src/pages/Checkout.jsx` (main form)
- `src/pages/OrderConfirmation.jsx` (post-purchase)
- `src/styles/Checkout.css`

*(Full code in UX_AUDIT_REPORT_2026.md - too long to repeat here)*

**Key Components:**
1. **CartReview** - Show items, allow edits
2. **ShippingForm** - Email, address, shipping method
3. **PaymentForm** - Card details (integrate Stripe later)
4. **OrderConfirmation** - Order number, shipping estimate

**Routes to add:**
```javascript
<Route path="/checkout" element={<Checkout />} />
<Route path="/order-confirmation" element={<OrderConfirmation />} />
```

**Checklist:**
- [ ] All 3 forms built
- [ ] Form validation working
- [ ] Progress bar functional
- [ ] Order confirmation page built
- [ ] Mobile responsive
- [ ] Error handling in place

**Timeline:** Day 3-4 of Week 1

---

## PHASE 2: MOBILE UX FIXES (2-3 DAYS) 🔴 + 🟠

### 2.1 Fix Touch Targets (2 hours) 🔴 CRITICAL
**Goal:** All interactive elements ≥44x44px

**Files to update:**
- `src/styles/Navbar.css`
- `src/styles/ProductDetail.css`
- `src/styles/Shop.css`

**Changes:**
```css
/* Navbar buttons - ALL MUST BE 48x48px */
.navbar__toggle {
  width: 48px;
  height: 48px;
  padding: 8px;
}

.navbar__link {
  min-height: 48px;
  display: flex;
  align-items: center;
}

.navbar__icon-btn {
  width: 48px;
  height: 48px;
  min-width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Shop filter buttons */
.shop__category-btn {
  min-height: 44px;
  min-width: 60px;
  padding: 8px 16px;
}

/* Product detail size buttons */
.product-detail__size-btn {
  min-width: 48px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* All buttons */
button {
  min-height: 44px;
}

/* Spacing between touch targets */
button + button {
  margin-left: 8px;
}
```

**Checklist:**
- [ ] All nav icons 48x48px
- [ ] All buttons 44x44px minimum
- [ ] Spacing between buttons 8px+
- [ ] No overlapping tap targets
- [ ] Focus indicators visible

---

### 2.2 Add Review System (3-4 hours)
**Goal:** Display customer reviews, build trust

**File:** `src/components/ReviewSection.jsx`

```javascript
import { useState } from 'react'
import { motion } from 'framer-motion'
import '../styles/ReviewSection.css'

export function ReviewSection({ productId, reviews = [] }) {
  const defaultReviews = [
    {
      id: 1,
      author: 'Alex M.',
      verified: true,
      rating: 5,
      text: 'Incredible quality. The Architect hoodie is a masterpiece. Fits perfectly.',
      date: '2 weeks ago'
    },
    {
      id: 2,
      author: 'Jordan K.',
      verified: true,
      rating: 5,
      text: 'Finally found a brand that gets streetwear. Attention to detail is insane.',
      date: '1 week ago'
    },
    {
      id: 3,
      author: 'Casey T.',
      verified: true,
      rating: 4,
      text: 'Great product, shipping was slower than expected but arrived safely.',
      date: '3 days ago'
    }
  ]

  const allReviews = reviews.length > 0 ? reviews : defaultReviews
  const avgRating = (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)

  return (
    <motion.section 
      className="reviews-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2>Customer Reviews</h2>

      {/* Rating Summary */}
      <div className="reviews__summary">
        <div className="rating-box">
          <div className="rating-value">{avgRating}</div>
          <div className="stars">{'⭐'.repeat(Math.round(avgRating))}</div>
          <p>{allReviews.length} verified reviews</p>
        </div>

        {/* Rating Distribution */}
        <div className="rating-distribution">
          {[5, 4, 3, 2, 1].map(stars => {
            const count = allReviews.filter(r => r.rating === stars).length
            const percentage = (count / allReviews.length) * 100
            return (
              <div key={stars} className="distribution-row">
                <span>{stars} ⭐</span>
                <div className="bar">
                  <div className="fill" style={{ width: `${percentage}%` }} />
                </div>
                <span>{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Reviews List */}
      <div className="reviews__list">
        {allReviews.map((review, i) => (
          <motion.div
            key={review.id}
            className="review-item"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="review__header">
              <div>
                <span className="author">{review.author}</span>
                {review.verified && <span className="badge">✓ Verified</span>}
              </div>
              <span className="date">{review.date}</span>
            </div>

            <div className="review__rating">
              {'⭐'.repeat(review.rating)}
              <span className="rating-text">
                {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][review.rating]}
              </span>
            </div>

            <p className="review__text">{review.text}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <button className="reviews__cta">Write a Review</button>
    </motion.section>
  )
}
```

**File:** `src/styles/ReviewSection.css`

```css
.reviews-section {
  margin: 3rem 0;
  padding: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.reviews-section h2 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 3px;
}

.reviews__summary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.rating-box {
  text-align: center;
}

.rating-value {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stars {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.rating-distribution {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.distribution-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.distribution-row > span:first-child {
  width: 40px;
}

.bar {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.bar .fill {
  height: 100%;
  background: #fff;
  transition: width 0.3s ease;
}

.reviews__list {
  margin-bottom: 2rem;
}

.review-item {
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.review__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.author {
  font-weight: 600;
  margin-right: 0.5rem;
}

.badge {
  display: inline-block;
  font-size: 0.75rem;
  color: #00d084;
  background: rgba(0, 208, 132, 0.1);
  padding: 2px 8px;
  border-radius: 12px;
}

.date {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
}

.review__rating {
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rating-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.review__text {
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}

.reviews__cta {
  width: 100%;
  padding: 1rem;
  border: 2px solid #fff;
  background: none;
  color: #fff;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reviews__cta:hover {
  background: rgba(255, 255, 255, 0.05);
}

@media (max-width: 768px) {
  .reviews__summary {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .reviews-section h2 {
    font-size: 1.2rem;
  }
}
```

**Update ProductDetail.jsx:**
```javascript
import { ReviewSection } from './ReviewSection'

// Add before </ProductDetail>
<ReviewSection productId={id} />
```

**Checklist:**
- [ ] ReviewSection component created
- [ ] Styles responsive
- [ ] Rating distribution calculated
- [ ] Verify badge shown
- [ ] Mobile layout working

---

### 2.3 Trust Signals Bar (2 hours)
**Goal:** Display trust indicators prominently

**File:** `src/components/TrustSignals.jsx`

```javascript
export function TrustSignals() {
  return (
    <div className="trust-signals">
      <div className="trust-signal">
        <span className="icon">🔒</span>
        <span>Secure Checkout</span>
      </div>
      <div className="trust-signal">
        <span className="icon">↩️</span>
        <span>14-Day Returns</span>
      </div>
      <div className="trust-signal">
        <span className="icon">🚚</span>
        <span>Free Shipping $500+</span>
      </div>
      <div className="trust-signal">
        <span className="icon">🇪🇺</span>
        <span>Made in Europe</span>
      </div>
    </div>
  )
}
```

**CSS:**
```css
.trust-signals {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 4px;
  margin: 2rem 0;
}

.trust-signal {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.trust-signal .icon {
  font-size: 1.5rem;
}

@media (max-width: 480px) {
  .trust-signals {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .trust-signal {
    font-size: 0.8rem;
  }
}
```

**Add to ProductDetail, Shop pages**

**Checklist:**
- [ ] Trust signals component created
- [ ] Icons display correctly
- [ ] Mobile layout responsive
- [ ] Added to product pages

---

### 2.4 Mobile Form Optimization (2 hours) 🟠

**Update all forms:** `src/styles/*.css`

```css
/* Universal form improvements */
input, textarea, select {
  font-size: 16px !important; /* Prevent iOS auto-zoom */
  padding: 12px 16px;
  height: 48px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  width: 100%;
}

input:focus {
  outline: none;
  border-color: #fff;
  background: rgba(255, 255, 255, 0.1);
}