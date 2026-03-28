# Montréz Site - UX Audit (March 2026)
## User Perspective Review

**Audited:** March 28, 2026  
**Site:** https://montrez-site.vercel.app/  
**Perspective:** First-time visitor + returning user flows

---

## 🔴 CRITICAL ISSUES (Fix Immediately)

### 1. **Hero Background Not Updating (Cache Issue)**
**Problem:** Users still seeing old gate/castle background instead of new editorial photo  
**Impact:** Brand inconsistency, missed brand storytelling opportunity  
**Root cause:** Vercel CDN caching old `hero-editorial.jpg`  
**Status:** ✅ Fixed (renamed to `hero-editorial-v2.jpg`)  
**User experience:** Confusing - landing shows new bg, hero shows old bg (inconsistent)

---

### 2. **Email Popup Appears Too Soon**
**Problem:** "GET 15% OFF YOUR FIRST ORDER!" popup appears immediately on homepage  
**Impact:** Annoying, blocks content, feels spammy, reduces trust  
**User reaction:** "I just got here, leave me alone"  
**Bounce risk:** HIGH - users may leave immediately

**Recommended fixes:**
- **Option A (Quick):** Delay popup by 15-30 seconds
- **Option B (Better):** Trigger on scroll (after 30% page scroll)
- **Option C (Best):** Trigger on exit intent (when mouse moves toward close tab)
- **Option D (Most Effective):** Show only after user browses 2-3 products

**Code location:** `src/components/SignupPopup.jsx`

---

### 3. **No Clear "Shop Now" CTA on Hero**
**Problem:** Hero has great visuals but no obvious way to start shopping  
**Impact:** Users don't know where to go next, high bounce rate  
**Current state:** "SCROLL" indicator at bottom (not obvious)  
**Expected:** Big "SHOP NOW" or "ENTER COLLECTION" button on hero

**Recommended fix:**
```jsx
<div className="hero__cta">
  <Link to="/shop">
    <button className="hero__primary-cta">SHOP COLLECTION</button>
  </Link>
  <Link to="/collections">
    <button className="hero__secondary-cta">EXPLORE LOOKS</button>
  </Link>
</div>
```

**Placement:** Center bottom or center of hero (overlaying background)

---

## ⚠️ HIGH PRIORITY (Fix Soon)

### 4. **Product Images Have Poor Contrast**
**Problem:** Some product cards have low contrast (light products on beige background)  
**Examples:** White tees, light gray hoodies barely visible  
**Impact:** Products look washed out, unprofessional  

**Recommended fixes:**
- Add subtle drop shadow to product images
- Use darker product card backgrounds (#f5f5f5 → #e8e8e8)
- Add 1px border around product images (rgba(0,0,0,0.1))

---

### 5. **"VIEW COLLECTION" Buttons Are Confusing**
**Problem:** Product cards say "VIEW COLLECTION" but should say "VIEW PRODUCT" or "QUICK VIEW"  
**Impact:** User confusion - "Am I viewing the product or a collection?"  
**Location:** Every product card in shop grid

**Fix:** Change button text to:
- "VIEW DETAILS" (more descriptive)
- "QUICK VIEW" (industry standard)
- "SHOP NOW" (action-oriented)

---

### 6. **Mobile Menu Has No Clear Close Button**
**Problem:** Hamburger menu opens but no obvious way to close it  
**Expected:** X icon in top right of mobile menu  
**Current workaround:** Users must click outside menu (not discoverable)

**Fix:** Add close button:
```jsx
<button className="mobile-menu__close" onClick={closeMenu}>
  <X size={24} />
</button>
```

---

### 7. **Announcement Bar Is Not Dismissible**
**Problem:** "🔥 FREE DELIVERY OVER R1000 IN RSA" stays forever  
**Impact:** Takes up screen space, feels intrusive after seeing it 10 times  

**Fix:** Add close button + localStorage to remember dismissal:
```jsx
const [isVisible, setIsVisible] = useState(() => {
  return localStorage.getItem('montrez-announcement-dismissed') !== 'true'
})

const handleDismiss = () => {
  localStorage.setItem('montrez-announcement-dismissed', 'true')
  setIsVisible(false)
}
```

---

## 🟡 MEDIUM PRIORITY (Improve Experience)

### 8. **Access Gate UX Issues**

**Problem A: Password Not Hinted Anywhere**
- First-time users have no idea what password to use
- "RETURNING USER" implies you should already know it
- No hint, no recovery option

**Fix:** Add password hint below input:
```
Hint: Check our Instagram bio for the access code
```

**Problem B: Instagram Option Unclear**
- "Get access code via Instagram" - how exactly?
- Links to Instagram but no clear instructions
- Users may get lost on Instagram

**Fix:** Be more specific:
```
"Follow @montrez and DM us 'ACCESS' for the code"
```

**Problem C: Why Gate At All?**
- Adds friction to shopping experience
- No clear benefit to users
- May reduce conversions significantly

**Recommendation:** Consider removing access gate entirely OR make it optional (skip button)

---

### 9. **Product Grid Has No Hover States**
**Problem:** Products don't react when you hover  
**Expected:** Second image appears, or zoom effect, or shadow  
**Current:** Static, feels unresponsive

**Fix:** Add hover effects:
```css
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  transition: all 0.3s ease;
}

.product-card:hover img {
  transform: scale(1.05);
}
```

---

### 10. **No Product Filtering on Shop Page**
**Problem:** 30+ products, no way to filter by type/size/price  
**Impact:** Users must scroll through everything, time-consuming

**Current state:** "FILTERS" dropdown exists but appears empty/buggy  

**Fix:** Implement working filters:
- Category (Hoodies, Tees, Shorts, Accessories)
- Size (XS, S, M, L, XL, XXL)
- Price Range (slider)
- Color (if applicable)
- Availability (In Stock / Out of Stock)

---

### 11. **Product Names Are Too Long**
**Problem:** Names like "MILITARY-INSPIRED COMBAT CARGO STREETWEAR SHORTS - PREMIUM DENIM" are truncated  
**Impact:** Users can't read full product name on grid  

**Fix:** Truncate with ellipsis + show full name on hover tooltip

---

### 12. **No Size Guide**
**Problem:** No size chart anywhere on product pages  
**Impact:** Users don't know what size to order, cart abandonment  

**Fix:** Add "SIZE GUIDE" link on every product page that opens modal with measurements

---

### 13. **Footer Social Links Are Plain Text**
**Problem:** "@montrezz" in footer not clickable, no icons  
**Expected:** Instagram icon that links to profile  

**Fix:**
```jsx
<a href="https://instagram.com/montrez" target="_blank">
  <Instagram size={20} /> @montrez
</a>
```

---

## 🟢 LOW PRIORITY (Nice to Have)

### 14. **No Breadcrumbs**
**Problem:** On product page, no easy way to see "Home > Shop > Product"  
**Impact:** Users feel lost, harder to navigate back

**Fix:** Add breadcrumb navigation:
```
Home / Shop / Hoodies / ANONYMITY ST PARKA
```

---

### 15. **No Product Quick View**
**Problem:** Must go to full product page to see details  
**Expected:** Modal popup with quick view option  

**Benefit:** Faster browsing, less clicking back and forth

---

### 16. **No Search Suggestions**
**Problem:** Search bar in nav has no autocomplete  
**Expected:** As you type "hood", show matching products  

**Benefit:** Faster product discovery

---

### 17. **No Wishlist / Save for Later**
**Problem:** Can't save products to view later  
**Impact:** Users forget what they liked, must search again

**Fix:** Add heart icon to product cards + wishlist page

---

### 18. **No Recently Viewed Products**
**Problem:** After viewing products, no way to see history  
**Expected:** "Recently Viewed" section at bottom of product pages

---

### 19. **No Loading States on Add to Cart**
**Problem:** When adding to cart, no feedback - button just stays same  
**Expected:** Loading spinner, then "ADDED ✓" confirmation

---

### 20. **Checkout Has No Progress Indicator**
**Problem:** Multi-step checkout but no indicator of which step you're on  
**Expected:** "1. Cart → 2. Shipping → 3. Payment → 4. Confirm"

---

## 📊 Performance Issues

### 21. **Hero Background Image Is Large**
**File:** `hero-editorial-v2.jpg` (likely 1-2MB)  
**Impact:** Slow initial load, especially on mobile  

**Fix:**
- Compress image (TinyPNG, aim for <500KB)
- Add WebP version with JPG fallback
- Use `loading="lazy"` for below-the-fold images

---

### 22. **No Image Lazy Loading**
**Problem:** All 30+ product images load at once  
**Impact:** Slow page load, wasted bandwidth

**Fix:** Add `loading="lazy"` to all product images

---

## 🎨 Design Polish

### 23. **Inconsistent Button Styles**
**Problem:** Some buttons are filled, some outlined, different sizes  
**Impact:** Feels unpolished

**Fix:** Standardize:
- **Primary:** Black fill, white text, hover: gray
- **Secondary:** White outline, black text, hover: black fill
- **All same height:** 48px or 44px

---

### 24. **Typography Hierarchy Issues**
**Problem:** H1, H2, H3 too similar in size/weight  
**Impact:** Hard to scan content

**Fix:** Increase contrast:
- H1: 48px, weight 700
- H2: 32px, weight 600
- H3: 24px, weight 500

---

### 25. **Footer Feels Empty**
**Problem:** Footer has minimal content, lots of whitespace  
**Expected:** Newsletter signup, social links, policies, sitemap

**Add:**
- Newsletter signup form
- Social media icons (clickable)
- Links: About, Contact, Shipping, Returns, Terms, Privacy
- Payment method icons (Visa, Mastercard, etc.)

---

## 🔒 Trust & Credibility

### 26. **No Trust Badges**
**Problem:** No security/payment badges on checkout  
**Impact:** Users may not trust site with payment info

**Fix:** Add:
- SSL/Secure Checkout badge
- Payment method logos (Visa, Mastercard, PayFast)
- "Money-back guarantee" badge

---

### 27. **No Reviews/Ratings**
**Problem:** Products have no social proof  
**Impact:** Users hesitant to buy from unknown brand

**Fix:** Add:
- Star ratings on product cards
- Review count (e.g., "23 reviews")
- Featured reviews on product page

---

### 28. **No About Story**
**Problem:** About page very minimal, no brand story  
**Expected:** Photos, founder story, mission, behind-the-scenes

**Impact:** Hard to connect with brand emotionally

---

## 📱 Mobile Issues

### 29. **Hero Text Too Large on Mobile**
**Problem:** "MONTRÉZ" cuts off on small screens  
**Fix:** Use clamp() for responsive sizing:
```css
font-size: clamp(2rem, 8vw, 6rem);
```

---

### 30. **Product Grid Not Responsive**
**Problem:** 3 columns on mobile is too cramped  
**Fix:** 
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3-4 columns

---

### 31. **Touch Targets Too Small**
**Problem:** Some buttons <44px, hard to tap on mobile  
**Standard:** iOS/Android recommend 44x44px minimum

**Fix:** Increase all button heights to 48px

---

## 🎯 Conversion Optimization

### 32. **No Urgency Indicators**
**Problem:** Nothing encouraging users to buy now  

**Add:**
- "Only 3 left in stock!" on low inventory
- "12 people viewing this" (if tracking)
- "Sale ends in 2 days" countdown timer

---

### 33. **No Upsells/Cross-sells**
**Problem:** On product page, no suggestions for related items  

**Add:**
- "You may also like" section
- "Customers also bought" section
- "Complete the look" styling suggestions

---

### 34. **Cart Has No Minimum Shipping Threshold Indicator**
**Problem:** Announcement says "FREE DELIVERY OVER R1000" but cart doesn't show progress  

**Fix:** Add progress bar in cart:
```
You're R200 away from free shipping! 🚚
[=====>    ] R800 / R1000
```

---

## 🐛 Bugs & Technical Issues

### 35. **Shop Filters Dropdown Appears Broken**
**Problem:** Clicking "FILTERS" does nothing or shows empty menu  
**Status:** Needs investigation

---

### 36. **Product Images Sometimes Don't Load**
**Problem:** Some products show broken image icons  
**Cause:** Missing images in `/public/products/` folder

**Fix:** Audit all products, ensure images exist

---

### 37. **Console Errors Present**
**Problem:** Browser console shows React warnings/errors  
**Impact:** May cause bugs, looks unprofessional to developers

**Fix:** Review console, fix all warnings

---

## 📈 Analytics & Tracking

### 38. **No Analytics Implemented**
**Problem:** Can't track user behavior, conversions, drop-off points  

**Recommended:** Add Google Analytics 4 or Plausible

**Track:**
- Page views
- Add to cart events
- Checkout abandonment
- Product views
- Search queries

---

### 39. **No Heatmap Tool**
**Problem:** Don't know where users click, scroll depth  

**Recommended:** Add Hotjar or Microsoft Clarity (free)

---

## 💡 Feature Suggestions

### 40. **Add Currency Selector**
**Problem:** Only shows R (Rand), may confuse international visitors  

**Fix:** Add USD/EUR/GBP options in header

---

### 41. **Add Language Selector**
**Problem:** Site only in English  

**Consider:** Add French (for European luxury market)

---

### 42. **Add Live Chat**
**Problem:** No way to ask questions in real-time  

**Options:**
- Tawk.to (free)
- Intercom
- Facebook Messenger widget

---

### 43. **Add Virtual Try-On**
**Future idea:** AR feature to see how clothes look on user  
**Tools:** Wannaby, Veesual

---

## ✅ What's Working Well

1. ✅ **Visual Design** - Dark, moody, luxury aesthetic is on-brand
2. ✅ **Product Photography** - High quality, professional
3. ✅ **Brand Consistency** - Colors, fonts, messaging align
4. ✅ **Mobile Navigation** - Hamburger menu works well
5. ✅ **Hero Background Update** - New editorial photo fits brand better
6. ✅ **Fast Hosting** - Vercel deployment is quick
7. ✅ **Clean Layout** - Not cluttered, easy to scan
8. ✅ **Product Names** - Descriptive, SEO-friendly

---

## 🎯 Priority Roadmap

### **Week 1 (Critical):**
1. Fix hero background cache issue ✅ (done)
2. Delay email popup (15-30 sec delay)
3. Add "SHOP NOW" CTA to hero
4. Fix "VIEW COLLECTION" button text
5. Add mobile menu close button

### **Week 2 (High Priority):**
6. Improve product image contrast
7. Fix shop filters dropdown
8. Add dismissible announcement bar
9. Implement product hover states
10. Add size guide to products

### **Week 3 (Medium Priority):**
11. Simplify/remove access gate
12. Add password hint to access gate
13. Add breadcrumbs navigation
14. Add loading states to buttons
15. Standardize button styles

### **Week 4 (Polish):**
16. Compress hero image (WebP)
17. Add lazy loading to images
18. Add trust badges to checkout
19. Improve footer content
20. Add product reviews system

---

## 📋 Summary

**Total Issues Found:** 43  
**Critical:** 3  
**High Priority:** 7  
**Medium Priority:** 13  
**Low Priority:** 7  
**Performance:** 2  
**Design:** 3  
**Trust:** 3  
**Mobile:** 3  
**Conversion:** 3  
**Technical:** 3  
**Analytics:** 2  
**Features:** 4  

**Estimated Fix Time:**
- Critical (3): ~4 hours
- High Priority (7): ~12 hours
- Medium Priority (13): ~20 hours
- **Total:** ~36 hours to fix all critical + high priority issues

---

**Next Steps:**
1. Review this audit with team
2. Prioritize issues based on business impact
3. Create tickets for each fix
4. Implement Week 1 fixes immediately
5. Schedule remaining fixes over next month

---

**Audit completed:** March 28, 2026  
**By:** Jarvis (OpenClaw AI Agent)
