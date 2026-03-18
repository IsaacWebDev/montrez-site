# MONTREZ ACCESSIBILITY FIXES - QUICK CHECKLIST

## 🔴 CRITICAL (Block Production Deploy)

### 1. Add Semantic Landmarks
- [ ] Wrap all page content in `<main id="main-content">` in App.jsx
- [ ] Add `<main>` to Shop.jsx
- [ ] Add `<main>` to ProductDetail.jsx
- [ ] Add `aria-label="Main navigation"` to Navbar

**Files:** `App.jsx`, `Shop.jsx`, `ProductDetail.jsx`, `Navbar.jsx`

---

### 2. Implement Modal Focus Trap (PasswordEmailModal)
```jsx
// Install: npm install focus-trap-react
import FocusTrap from 'focus-trap-react'

<FocusTrap>
  <motion.div className="password-modal" role="dialog" aria-modal="true">
    {/* modal content */}
  </motion.div>
</FocusTrap>
```

**Files:** `PasswordEmailModal.jsx`

---

### 3. Add Skip Navigation Link
```jsx
// In Navbar.jsx, BEFORE navbar container:
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only"
  style={{ 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    zIndex: 9999,
    background: 'white',
    color: 'black',
    padding: '1rem'
  }}
>
  Skip to main content
</a>
```

**Files:** `Navbar.jsx`

---

### 4. Error Messages as Live Regions
```jsx
// In PasswordEmailModal.jsx:
{error && (
  <span 
    className="password-error" 
    role="alert" 
    aria-live="assertive"
  >
    {error}
  </span>
)}
```

**Files:** `PasswordEmailModal.jsx`

---

## 🟠 HIGH PRIORITY (Before Production)

### 5. Add Escape Key Handler (PasswordEmailModal)
```jsx
useEffect(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      setMode('choice') // or close modal entirely
    }
  }
  window.addEventListener('keydown', handleEscape)
  return () => window.removeEventListener('keydown', handleEscape)
}, [])
```

**Files:** `PasswordEmailModal.jsx`

---

### 6. Fix Video Skip Button (VideoIntro)
```jsx
// Change:
const [canSkip, setCanSkip] = useState(false)
// To:
const [canSkip, setCanSkip] = useState(true)

// Remove auto-skip timeout:
// DELETE the 3-second loadTimeout that calls onComplete()
```

**Files:** `VideoIntro.jsx`

---

### 7. Add aria-expanded to Hamburger
```jsx
<button 
  className={`navbar__toggle ${menuOpen ? 'navbar__toggle--open' : ''}`}
  onClick={() => setMenuOpen(!menuOpen)}
  aria-label="Toggle menu"
  aria-expanded={menuOpen}
  aria-controls="hamburger-menu"
>
```

**Files:** `Navbar.jsx`, `HamburgerMenu.jsx` (add `id="hamburger-menu"`)

---

### 8. Shop Filters - Add aria-pressed
```jsx
<button
  className={`shop__category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
  onClick={() => setSelectedCategory(cat.id)}
  aria-pressed={selectedCategory === cat.id}
>
  {cat.label}
</button>
```

**Files:** `Shop.jsx`

---

### 9. Size Selector as Radio Group (ProductDetail)
```jsx
<fieldset className="product-detail__sizes">
  <legend className="product-detail__label">Select Size</legend>
  <div className="product-detail__size-grid" role="radiogroup">
    {product.sizes.map(size => (
      <button
        key={size}
        role="radio"
        aria-checked={selectedSize === size}
        className={`product-detail__size-btn ${selectedSize === size ? 'active' : ''}`}
        onClick={() => setSelectedSize(size)}
      >
        {size}
      </button>
    ))}
  </div>
</fieldset>
```

**Files:** `ProductDetail.jsx`

---

## 🟡 MEDIUM PRIORITY (Within 30 Days)

### 10. Increase Placeholder Contrast (design-system.css)
```css
.input::placeholder {
  color: var(--color-muted);
  opacity: 0.8; /* Changed from 0.6 */
}
```

**Files:** `design-system.css`

---

### 11. Add Modal Role Attributes (PasswordEmailModal)
```jsx
<motion.div 
  className="password-modal"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <h2 id="modal-title" className="password-modal__title">MONTREZ</h2>
```

**Files:** `PasswordEmailModal.jsx`

---

### 12. Fix Hamburger Backdrop
**Option A:** Remove backdrop entirely (recommended)  
**Option B:** Make it a button:
```jsx
<button 
  className="hamburger-backdrop"
  onClick={onClose}
  aria-label="Close menu"
/>
```

**Files:** `HamburgerMenu.jsx`

---

## 🟢 TESTING CHECKLIST

### Keyboard Navigation
- [ ] Tab through entrance flow (landing → modal → video → site)
- [ ] Escape closes modal
- [ ] Skip nav link appears on first Tab
- [ ] All buttons/links keyboard accessible
- [ ] Focus visible on all interactive elements

### Screen Reader
- [ ] Run NVDA/JAWS (Windows) or VoiceOver (Mac)
- [ ] Verify error messages announced
- [ ] Verify modal role announced
- [ ] Verify navigation landmarks work
- [ ] Verify form labels associated

### Automated Tools
- [ ] Run axe DevTools browser extension
- [ ] Run Lighthouse accessibility audit (aim for 95+)
- [ ] Run WAVE evaluation tool

---

## 📦 RECOMMENDED NPM PACKAGES

```bash
npm install focus-trap-react
npm install --save-dev jest-axe @testing-library/jest-dom
```

---

## 🎯 QUICK WIN SUMMARY

**Fastest Fixes (30 minutes):**
1. Add `role="alert"` to error spans
2. Add `aria-expanded` to hamburger
3. Add `aria-pressed` to filter buttons
4. Change `canSkip` to start as `true`

**Medium Effort (2 hours):**
5. Add semantic `<main>` landmarks
6. Implement Escape key handler
7. Convert size selector to radio group

**Requires Library (1 hour with focus-trap-react):**
8. Implement focus trap in modal

---

## ✅ DEFINITION OF DONE

- [ ] All 9 Critical + High issues resolved
- [ ] Lighthouse accessibility score 95+
- [ ] axe DevTools reports 0 violations
- [ ] Manual keyboard test passes
- [ ] Manual screen reader test passes
- [ ] CI/CD includes automated accessibility tests

---

**Questions?** Tag @frontend agent or @accessibility agent in task updates.
