# TOP 5 PRIORITY UX FIXES FOR MONTREZ
**Ranked by Impact & Urgency**

**Version:** 1.0 | **Date:** March 24, 2026

---

## SCORING METHODOLOGY

Each fix is scored on:

- **Revenue Impact:** How much revenue will this unlock? (0-100)
- **Effort:** How much dev work? (1-10, lower = easier)
- **Urgency:** How critical is it? (0-100)
- **User Pain:** How frustrated are users? (0-100)

**Priority Score = (Revenue Impact × 0.4) + (Urgency × 0.3) + (User Pain × 0.2) - (Effort × 0.1)**

---

## #1: BUILD FUNCTIONAL CHECKOUT FLOW ⚠️ CRITICAL

### Problem

There is NO checkout flow. Users cannot buy anything. Revenue = 0%.

### Current State

- ❌ No /checkout route
- ❌ No cart review step
- ❌ No shipping form
- ❌ No payment processing
- ❌ No order confirmation
- **Result:** Site cannot generate any revenue

### Why It Matters

- **Revenue Impact:** 100 (enables all sales)
- **Effort:** 8/10 (complex, needs payment integration)
- **Urgency:** 100 (blocks everything)
- **User Pain:** 100 (users can't buy)

**Priority Score: 92/100** ✅ **DO THIS FIRST**

### What to Build

```
Step 1: Cart Review
├─ Show items in cart
├─ Allow edit quantity
├─ Allow remove item
├─ Show subtotal + estimated shipping
└─ "Continue to Shipping" button

Step 2: Shipping Information
├─ Email input
├─ Full name input
├─ Address (street, number, city, postal)
├─ Country selector
├─ Shipping method selector
│  ├─ Standard (5-7 days) - Free
│  ├─ Express (2-3 days) - €30
│  └─ Overnight (1 day) - €60
└─ "Continue to Payment" button

Step 3: Payment
├─ Card number
├─ Expiration date
├─ CVC
├─ Billing address (same as shipping or custom)
└─ "Complete Order" button

Step 4: Confirmation (Auto)
├─ Order number
├─ Items ordered
├─ Total paid
├─ Estimated delivery date
├─ Email sent confirmation
├─ "View Order" button
└─ "Continue Shopping" button
```

### Implementation Details

**Tech Stack:**
- Frontend: React (form states, validation)
- Backend: Node.js (order processing)
- Payment: Stripe OR PayFast (South Africa option)
- Database: MongoDB (order storage)

**Key Features:**
- Real-time form validation (email, required fields)
- Country dropdown (searchable)
- Shipping method calculator (cost + time estimate)
- Payment security (PCI-DSS compliance)
- Order history tracking

**Estimated Timeline:** 12-16 hours

**Estimated Cost:** $200-400 (dev time, Stripe setup)

### Success Metrics

- ✅ Users can complete purchase
- ✅ Orders stored in database
- ✅ Email confirmation sent
- ✅ Payment processes without errors
- ✅ Conversion rate > 0% (even if 1-2%)

### Blockers

- Payment processor needs account (Stripe/PayFast)
- Email service needs setup (SendGrid/Mailgun)
- Database schema for orders

---

## #2: FIX MOBILE TOUCH TARGETS ⚠️ CRITICAL

### Problem

Navbar icons are 20-24px. Apple/Android standard is 44x44px. Users can't tap them.

### Current State

```
Navbar icons:
├─ 🔍 Search: 20x20px ❌
├─ 👤 Account: 20x20px ❌
├─ 🛒 Cart: 20x20px ❌
└─ ☰ Menu: 24x24px ❌

All below 44px minimum = Too small
```

### Why It Matters

- **Revenue Impact:** 60 (mobile is 80% of traffic)
- **Effort:** 2/10 (CSS only, no logic)
- **Urgency:** 95 (affects every mobile user)
- **User Pain:** 80 (frustrating touch misses)

**Priority Score: 74/10** ✅ **DO THIS SECOND**

### What to Fix

```css
/* BEFORE */
.navbar__icon {
  width: 20px;
  height: 20px;
}

/* AFTER */
.navbar__icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  min-height: 48px;
}

.navbar__icon svg {
  width: 20px;
  height: 20px;
}

/* All interactive elements */
button, a[role="button"] {
  min-height: 44px;
  min-width: 44px;
  padding: 8px;
}

/* Add safe area support for notched phones */
@supports (padding: max(0px)) {
  .navbar {
    padding-top: max(1rem, env(safe-area-inset-top));
  }
}
```

### Implementation Details

- Increase padding around all icons
- Keep visual size same (use padding)
- Test on actual mobile devices
- Check spacing doesn't break layout

**Estimated Timeline:** 1-2 hours

**Estimated Cost:** Free (CSS-only)

### Success Metrics

- ✅ All touch targets 44x44px minimum
- ✅ No layout breaks
- ✅ Desktop looks unchanged
- ✅ Mobile testing passes

---

## #3: IMPLEMENT CART DRAWER + CART STATE ⚠️ CRITICAL

### Problem

"Add to Cart" button doesn't work. Cart doesn't exist. Users can't see items they're buying.

### Current State

```
Product page:
└─ Click "Add to Cart"
   ├─ Alert says "Added to cart"
   └─ Nothing actually happens ❌

Cart icon:
└─ Click cart icon
   └─ Nothing happens ❌

Result: Users think they added item but didn't
```

### Why It Matters

- **Revenue Impact:** 85 (required for checkout)
- **Effort:** 6/10 (state management + UI component)
- **Urgency:** 100 (blocks all purchases)
- **User Pain:** 95 (biggest user frustration)

**Priority Score: 88/10** ✅ **DO THIS SECOND (with #2)**

### What to Build

```jsx
// 1. Cart Context (State Management)
const CartContext = createContext()

function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('montrez-cart')) || []
    } catch {
      return []
    }
  })

  const addToCart = (product, size) => {
    const item = { ...product, size, cartId: `${product.id}-${size}` }
    setItems([...items, item])
    localStorage.setItem('montrez-cart', JSON.stringify([...items, item]))
  }

  const removeFromCart = (cartId) => {
    const updated = items.filter(item => item.cartId !== cartId)
    setItems(updated)
    localStorage.setItem('montrez-cart', JSON.stringify(updated))
  }

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

// 2. Cart Drawer Component
function CartDrawer({ isOpen, onClose }) {
  const { items, removeFromCart } = useContext(CartContext)

  const total = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <motion.div
      className="cart-drawer"
      animate={{ x: isOpen ? 0 : 350 }}
      transition={{ duration: 0.25 }}
    >
      <div className="cart-drawer__header">
        <h2>CART ({items.length})</h2>
        <button onClick={onClose} aria-label="Close cart">✕</button>
      </div>

      {items.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty</p>
          <button onClick={() => { onClose(); navigate('/shop') }}>
            CONTINUE SHOPPING
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map(item => (
              <div key={item.cartId} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item__info">
                  <h3>{item.name}</h3>
                  <p>{item.size}</p>
                  <p className="price">€{item.price}</p>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.cartId)}
                  aria-label={`Remove ${item.name}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <div className="cart-total">
              <span>TOTAL:</span>
              <span>€{total}</span>
            </div>
            <button
              className="checkout-btn"
              onClick={() => { onClose(); navigate('/checkout') }}
            >
              CHECKOUT
            </button>
            <button
              className="continue-btn"
              onClick={() => { onClose(); navigate('/shop') }}
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </>
      )}
    </motion.div>
  )
}

// 3. Usage in App
function App() {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <CartProvider>
      <Navbar cartOpen={cartOpen} onCartClick={() => setCartOpen(!cartOpen)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <Routes>
        {/* routes */}
      </Routes>
    </CartProvider>
  )
}
```

### CSS Styling

```css
.cart-drawer {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 350px;
  background: #000;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cart-drawer__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.cart-drawer__header h2 {
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.cart-item {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.cart-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.cart-item__info {
  flex: 1;
}

.cart-item__info h3 {
  font-size: 13px;
  font-weight: 600;
  margin: 0 0 4px;
  text-transform: uppercase;
}

.cart-item__info p {
  font-size: 12px;
  margin: 2px 0;
  color: rgba(255, 255, 255, 0.7);
}

.cart-item__info .price {
  font-weight: bold;
  color: #00F0FF;
}

.remove-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  font-size: 16px;
  transition: all 200ms ease-out;
}

.remove-btn:hover {
  color: #FF6B6B;
}

.cart-footer {
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.cart-total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-weight: bold;
  text-transform: uppercase;
}

.checkout-btn {
  width: 100%;
  padding: 16px;
  background: #00F0FF;
  color: #000;
  border: none;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  margin-bottom: 8px;
  transition: all 200ms ease-out;
}

.checkout-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
}

.continue-btn {
  width: 100%;
  padding: 16px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 200ms ease-out;
}

.continue-btn:hover {
  border-color: rgba(255, 255, 255, 0.6);
}

/* Mobile */
@media (max-width: 768px) {
  .cart-drawer {
    width: 100%;
  }
}
```

### Implementation Details

**Key Features:**
- Persistent cart (localStorage)
- Real-time quantity
- Remove item functionality
- Mobile-responsive drawer
- Sticky footer with checkout CTA

**Estimated Timeline:** 8-10 hours

**Estimated Cost:** $150-250 (dev time)

### Success Metrics

- ✅ Items persist in cart
- ✅ Cart drawer opens/closes smoothly
- ✅ Remove item works
- ✅ Total calculated correctly
- ✅ Mobile responsive

---

## #4: ADD PRODUCT PAGE INFORMATION ⚠️ HIGH

### Problem

Product pages missing critical info: size guide, materials, care instructions, reviews

### Current State

```
Product Page Shows:
├─ Image ✅
├─ Name ✅
├─ Price ✅
├─ Description ✅
├─ Size selector ✅
└─ Add to cart button ✅

Product Page Missing:
├─ Material composition ❌
├─ Size guide with measurements ❌
├─ Fit description (oversized? TTS?) ❌
├─ Care instructions ❌
├─ Stock level ❌
├─ Customer reviews ❌
├─ Shipping info ❌
└─ Return policy ❌
```

### Why It Matters

- **Revenue Impact:** 70 (improves confidence, reduces returns)
- **Effort:** 4/10 (mostly content + basic UI)
- **Urgency:** 75 (users asking for this)
- **User Pain:** 75 (can't make informed decision)

**Priority Score: 70/10** ✅ **DO THIS THIRD**

### What to Add

#### 4a. Material Composition (Quick Win)

```jsx
<details open>
  <summary>MATERIALS & CARE</summary>
  <div className="materials">
    <p><strong>Material:</strong> 100% Premium Cotton</p>
    <p><strong>Weight:</strong> 280gsm</p>
    <p><strong>Made in:</strong> Portugal</p>
    <p><strong>Care:</strong> Cold wash, tumble dry low</p>
  </div>
</details>
```

#### 4b. Size Guide Table

```jsx
<details>
  <summary>SIZE GUIDE</summary>
  <table className="size-guide">
    <thead>
      <tr>
        <th>Size</th>
        <th>Chest</th>
        <th>Length</th>
        <th>Sleeve</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>XS</td>
        <td>48cm</td>
        <td>68cm</td>
        <td>78cm</td>
      </tr>
      <tr>
        <td>S</td>
        <td>52cm</td>
        <td>71cm</td>
        <td>82cm</td>
      </tr>
      {/* etc */}
    </tbody>
  </table>
</details>
```

#### 4c. Fit Description

```jsx
<div className="fit-description">
  <h3>FIT</h3>
  <p>
    <strong>Oversized fit</strong> – Recommended to size down for true-to-size
  </p>
  <p>Model is 180cm and wears size M</p>
</div>
```

#### 4d. Basic Review Section

```jsx
<div className="reviews-section">
  <h3>CUSTOMER REVIEWS</h3>
  
  <div className="review-summary">
    <span className="average">4.8 ⭐</span>
    <span className="count">142 reviews</span>
  </div>

  {reviews.map(review => (
    <div key={review.id} className="review">
      <div className="review-header">
        <span className="author">{review.author}</span>
        <span className="verified">✓ Verified</span>
      </div>
      <div className="rating">{review.rating} ⭐</div>
      <p>{review.text}</p>
      <span className="date">{review.date}</span>
    </div>
  ))}
</div>
```

### Data Structure

```javascript
// Product schema update
{
  id: 'architect-hoodie',
  name: 'ARCHITECT ZIP HOODIE',
  price: 1500,
  description: '...',
  materials: {
    composition: '100% Premium Cotton',
    weight: '280gsm',
    madeIn: 'Portugal',
    care: 'Cold wash, tumble dry low'
  },
  sizeGuide: [
    { size: 'XS', chest: '48cm', length: '68cm', sleeve: '78cm' },
    // etc
  ],
  fitDescription: 'Oversized fit – size down for TTS',
  stockLevel: 12,
  reviews: [
    {
      id: 1,
      author: 'Alex M.',
      rating: 5,
      text: 'Amazing quality...',
      verified: true,
      date: '2 weeks ago'
    }
    // etc
  ]
}
```

### Estimated Timeline:** 3-4 hours

**Estimated Cost:** Free-$50 (content work, no dev)

### Success Metrics

- ✅ All product info visible
- ✅ Size guide shows measurements
- ✅ Materials clear
- ✅ Reviews display
- ✅ Accordion/details UI works

---

## #5: IMPLEMENT ADVANCED SHOP FILTERS ⚠️ MEDIUM

### Problem

Shop page only has category filter. No search, price range, size, or sort.

### Current State

```
Shop Page Filters:
├─ Category buttons only ✅
├─ No search ❌
├─ No price filter ❌
├─ No size filter ❌
├─ No sort options ❌
└─ Result: Users can't find items
```

### Why It Matters

- **Revenue Impact:** 50 (improves discoverability)
- **Effort:** 5/10 (modal + filter logic)
- **Urgency:** 65 (users frustrated)
- **User Pain:** 70 (hard to browse)

**Priority Score: 58/10** ✅ **DO THIS FOURTH**

### What to Build

```jsx
// Filter Modal (Mobile)
function FilterModal({ isOpen, onClose, onApply }) {
  const [filters, setFilters] = useState({
    category: 'all',
    priceMin: 0,
    priceMax: 2000,
    sizes: [],
    sort: 'featured'
  })

  return (
    <motion.div
      className="filter-modal"
      animate={{ y: isOpen ? 0 : '100%' }}
    >
      <div className="filter-modal__header">
        <h2>FILTERS</h2>
        <button onClick={onClose}>✕</button>
      </div>

      {/* Category */}
      <div className="filter-group">
        <h3>CATEGORY</h3>
        {categories.map(cat => (
          <label key={cat.id}>
            <input
              type="checkbox"
              checked={filters.category === cat.id}
              onChange={() => setFilters({...filters, category: cat.id})}
            />
            {cat.label}
          </label>
        ))}
      </div>

      {/* Price */}
      <div className="filter-group">
        <h3>PRICE</h3>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceMin}
            onChange={(e) => setFilters({...filters, priceMin: parseInt(e.target.value)})}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.priceMax}
            onChange={(e) => setFilters({...filters, priceMax: parseInt(e.target.value)})}
          />
        </div>
        <div className="price-range">€{filters.priceMin} - €{filters.priceMax}</div>
      </div>

      {/* Size */}
      <div className="filter-group">
        <h3>SIZE</h3>
        {sizes.map(size => (
          <label key={size}>
            <input
              type="checkbox"
              checked={filters.sizes.includes(size)}
              onChange={() => {
                if (filters.sizes.includes(size)) {
                  setFilters({
                    ...filters,
                    sizes: filters.sizes.filter(s => s !== size)
                  })
                } else {
                  setFilters({...filters, sizes: [...filters.sizes, size]})
                }
              }}
            />
            {size}
          </label>
        ))}
      </div>

      {/* Sort */}
      <div className="filter-group">
        <h3>SORT BY</h3>
        <select
          value={filters.sort}
          onChange={(e) => setFilters({...filters, sort: e.target.value})}
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      <button
        className="apply-btn"
        onClick={() => {
          onApply(filters)
          onClose()
        }}
      >
        APPLY FILTERS
      </button>
    </motion.div>
  )
}

// Search Bar (Top of Shop)
function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = (value) => {
    setQuery(value)
    // Search products
    const found = products.filter(p =>
      p.name.toLowerCase().includes(value.toLowerCase()) ||
      p.description.toLowerCase().includes(value.toLowerCase())
    )
    setResults(found)
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {results.length > 0 && (
        <div className="search-results">
          {results.slice(0, 5).map(product => (
            <a key={product.id} href={`/product/${product.id}`}>
              {product.name}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
```

### Estimated Timeline:** 4-6 hours

**Estimated Cost:** $100-150 (dev time)

### Success Metrics

- ✅ Search finds products
- ✅ Price filter works
- ✅ Size filter works
- ✅ Sort works
- ✅ Results update in real-time
- ✅ Mobile-friendly

---

## IMPLEMENTATION ROADMAP

### Week 1 (Critical Fixes)

```
Monday-Tuesday:
├─ Fix mobile touch targets (#2) - 2 hours
├─ Start checkout flow (#1) - 8 hours
└─ Total: 10 hours

Wednesday-Friday:
├─ Finish checkout flow (#1) - 8 hours
├─ Build cart drawer (#3) - 10 hours
├─ Test everything - 2 hours
└─ Total: 20 hours

Weekend:
├─ Buffer/bug fixes
└─ Testing
```

### Week 2 (High Priority)

```
Monday-Tuesday:
├─ Add product page info (#4) - 4 hours
└─ Create reviews system - 3 hours

Wednesday-Friday:
├─ Implement shop filters (#5) - 6 hours
├─ Mobile search - 2 hours
├─ Testing - 3 hours
└─ Total: 11 hours
```

### Total Timeline: 2-3 weeks

### Total Dev Cost: $600-1,000

---

## SUCCESS METRICS (POST-FIX)

| Metric | Current | Target | Improvement |
|--------|---------|--------|-------------|
| Conversion Rate | 0% | 2-3% | +200%+ |
| Cart Abandonment | 100% | 40% | +60% |
| Mobile Usability | 4/10 | 8/10 | +4 points |
| Product Confidence | 3/10 | 7/10 | +4 points |
| Avg Order Value | $0 | €300-500 | Revenue unlocked |
| User Frustration | 9/10 | 3/10 | -6 points |

---

## SUMMARY

| Fix # | Fix | Impact | Effort | Timeline | Cost |
|-------|-----|--------|--------|----------|------|
| #1 | Checkout Flow | Critical | 8h | 16h | $250 |
| #2 | Touch Targets | Critical | 2h | 2h | Free |
| #3 | Cart Drawer | Critical | 6h | 10h | $200 |
| #4 | Product Info | High | 4h | 4h | Free |
| #5 | Filters | Medium | 5h | 6h | $150 |
| **TOTAL** | | | | **38-40h** | **$600** |

---

**Recommendation:** Implement all 5 fixes in order. After fixes, Montrez will have a functional e-commerce site capable of converting customers and generating revenue.

**Next Step:** Get stakeholder approval, allocate dev resources, and begin implementation.
