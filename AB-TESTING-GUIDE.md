# MONTREZ SITE - A/B TESTING RECOMMENDATIONS

**Version:** 1.0  
**Date:** 2026-03-18  
**Priority:** Post-launch optimization

---

## 1. TESTING FRAMEWORK

### 1.1 Test Planning Process

**Phase 1: Baseline Metrics (Week 1-2)**
- Establish control group performance
- Measure key metrics (conversion, engagement, time-on-site)
- Document user behavior

**Phase 2: Hypothesis Formation (Week 3-4)**
- Based on heatmaps, session recordings
- Identify friction points
- Prioritize high-impact tests

**Phase 3: Test Execution (Week 5+)**
- Run one test at a time (avoid confounding)
- 80/20 split (80% control, 20% variant)
- Run for minimum 1-2 weeks

**Phase 4: Analysis (Post-test)**
- Calculate statistical significance (95% confidence)
- Document results
- Roll winning variant to 100%

---

### 1.2 Key Metrics to Track

**Primary Metrics:**
- Conversion rate (gate → purchase)
- Email capture rate (new users)
- Add to cart rate
- Checkout completion rate
- Average order value

**Secondary Metrics:**
- Click-through rate (entrance)
- Product page views
- Time on site
- Bounce rate
- Cart abandonment rate

**Engagement Metrics:**
- Video completion rate
- Product gallery interactions
- Filter/search usage
- Wishlist saves

---

### 1.3 Statistical Significance

**Sample Size Calculator:**
```
Baseline conversion: 2%
Target lift: 25% (2% → 2.5%)
Confidence: 95%
Power: 80%

Required sample per variant: ~3,900 visitors
Total visitors needed: ~7,800

Days to achieve (assuming 1,000 visitors/day): 8 days
```

**Rule:** Always run for minimum 2 weeks (account for day-of-week variations)

---

## 2. ENTRANCE FLOW A/B TESTS

### Test 1: Email Verification (Required vs Optional)

**Hypothesis:** Making email optional increases gate conversion but hurts email capture

**Control (Current):**
- Email verification REQUIRED
- New users must verify email
- Password fallback available

**Variant A:**
- Email verification OPTIONAL
- Skip button: "Continue without email"
- Can verify later (in account)

**Variant B:**
- Email verification LAZY
- Pre-fill with random email (e.g., user+12345@example.com)
- Confirm/change in account later

**Metrics to Track:**
- Gate conversion rate (%)
- Email capture rate (%)
- Verified emails (post-conversion)
- Time spent at gate (seconds)

**Expected Outcome:**
- Variant A: Higher gate conversion, lower email capture
- Variant B: Balance between conversion and capture

**Winner:** Whichever maximizes: (Conversion % × Email Capture %)

**Implementation Complexity:** Medium (2 hours)

---

### Test 2: Modal UI - Tabs vs Toggle

**Hypothesis:** Toggle is simpler, tabs are more scannable

**Control (Tabs):**
```
RETURNING │ NEW USER  ← Click tabs
├─────────┼──────────┤
│ Password│          │
│ [Input] │          │
│ [Enter] │          │
```

**Variant (Toggle):**
```
◐ Returning  ○ New User  ← Click toggle
│
Password
[________]
[Enter]
```

**Variant B (Accordion):**
```
▼ Returning Users
  Password: [________]
  [Enter]
▶ New Users
  (collapsed)
```

**Metrics:**
- Completion rate by flow
- Time to submit
- Error rate
- Tab/toggle clicks

**Expected Outcome:**
- Tabs: Fastest for new users (scannability)
- Toggle: Simplest for returning (one interaction)
- Accordion: Clearest hierarchy

**Winner:** Whichever has lowest error rate + fastest completion

**Implementation Complexity:** Low (1 hour)

---

### Test 3: Video Skip Timing

**Hypothesis:** Longer video builds brand mystique, but shorter video increases completion

**Control (Current):**
- 5-second video
- Skip button after 2 seconds

**Variant A:**
- 3-second video (tighter edit)
- No skip button (forces view)

**Variant B:**
- 10-second video (extended, atmospheric)
- Skip button after 5 seconds

**Variant C:**
- Interactive video (click gate to open, sound on/off)
- 6 seconds

**Metrics:**
- Video completion rate (%)
- Time spent on video
- Bounce rate post-video
- Entrance satisfaction (exit survey)

**Expected Outcome:**
- Variant A: Faster flow, but less brand impact
- Variant B: Better brand perception, lower completion
- Variant C: Most engagement, but slower progression

**Winner:** Measure impact on downstream conversion (does better branding → more purchases?)

**Implementation Complexity:** Low (video editing needed)

---

### Test 4: Landing Page Call-to-Action

**Hypothesis:** Different button text influences perception of exclusivity

**Control:**
```
[ENTER]  ← Minimalist, exclusive
"Pas pour Tout"
```

**Variant A:**
```
[ENTER MONTREZ]  ← More explicit
"Discover the brand"
```

**Variant B:**
```
[UNLOCK]  ← More intriguing
"Exclusive access"
```

**Variant C:**
```
[SHOP NOW]  ← Action-oriented
"Browse our collection"
```

**Metrics:**
- Click-through rate
- Time to click
- Exit rate (without clicking)

**Expected Outcome:**
- "ENTER" / "UNLOCK": Higher perceived exclusivity
- "SHOP NOW": More direct intent, lower brand perception

**Winner:** Whichever maximizes CTR without hurting brand perception

**Implementation Complexity:** Very low (text change only)

---

## 3. NAVIGATION & DISCOVERY A/B TESTS

### Test 5: Product Grid Size

**Hypothesis:** Larger product cards show detail better, but smaller cards show more products

**Control (Current):**
- 2 columns (mobile)
- 4 columns (desktop)

**Variant A:**
- 3 columns (desktop)
- Larger cards, fewer products visible
- More product detail (hover state)

**Variant B:**
- 5 columns (desktop)
- Smaller cards
- More products visible at once

**Metrics:**
- Products viewed per session
- Add-to-cart rate
- Time on shop page
- Scroll depth

**Expected Outcome:**
- Control: Balance
- Variant A: Longer sessions, higher CTR on product cards
- Variant B: More browsing, lower conversion

**Winner:** Whichever maximizes (CTR × Time on Page)

**Implementation Complexity:** Low (CSS grid change)

---

### Test 6: Search vs Browse

**Hypothesis:** Prominent search encourages discovery, but browse-first emphasizes collection

**Control (Current):**
- Search icon (small, right side)
- Products grid below

**Variant A:**
- Prominent search bar (top, large)
- Input: "Search products..."
- Below: Featured categories

**Variant B:**
- No search (initially)
- Large browse options: All, By Category, By Price
- Search appears after browsing

**Metrics:**
- Search usage rate (%)
- Products browsed vs searched
- Conversion rate (search vs browse)
- Time to first add-to-cart

**Expected Outcome:**
- Variant A: Higher search usage, faster conversions
- Variant B: Better category discovery, longer sessions
- Control: Balanced

**Winner:** Whichever drives most conversions from beginning of funnel

**Implementation Complexity:** Low (UI reorganization)

---

### Test 7: Filter Sidebar (Desktop)

**Hypothesis:** Always-visible sidebar speeds discovery, but wastes space

**Control (Current):**
- Sticky sidebar filters (left)
- Takes ~200px width

**Variant A:**
- Modal filter button (top)
- Opens on click
- Reclaims horizontal space

**Variant B:**
- Collapsible sidebar (toggle icon)
- Sidebar collapses to icons only
- Expands on hover/click

**Metrics:**
- Filter usage rate (%)
- Filters per session
- Conversion rate
- Time to first filter

**Expected Outcome:**
- Control: Most filters used
- Variant A: Faster browsing, fewer filters
- Variant B: Balanced (filters accessible, space saved)

**Winner:** Whichever has highest conversion rate

**Implementation Complexity:** Medium (JavaScript for collapse/modal)

---

## 4. PRODUCT DETAIL A/B TESTS

### Test 8: Image Gallery - Thumbnails Position

**Hypothesis:** Bottom thumbnails show more variety, side thumbnails focus on main image

**Control (Current):**
- Side thumbnails (left or bottom mobile)
- Hover to preview

**Variant A:**
- Bottom thumbnail strip (horizontal scroll)
- Always visible
- Touch-friendly carousel

**Variant B:**
- No thumbnails (zoom-on-hover main image)
- Lightbox for gallery
- Cleaner layout

**Metrics:**
- Images viewed per product
- Gallery interactions
- Lightbox usage (if applicable)
- Product page time

**Expected Outcome:**
- Control: Good balance
- Variant A: Most gallery interaction
- Variant B: Cleaner, but less product exploration

**Winner:** Whichever drives highest add-to-cart rate

**Implementation Complexity:** Medium (gallery refactor)

---

### Test 9: Size Selector - Dropdown vs Buttons

**Hypothesis:** Buttons are more visible, dropdown saves space

**Control (Current):**
- Buttons: [XS][S][M][L][XL][XXL]
- Each 40px wide, wraps on mobile

**Variant A:**
- Dropdown: "Select Size ▾"
- Opens menu
- More space for description

**Variant B:**
- Carousel selector: ← [Size] →
- Swipe-friendly on mobile

**Metrics:**
- Time to select size
- Size change frequency
- Wrong size selections (return rate)
- Add-to-cart rate

**Expected Outcome:**
- Control: Fastest (visible)
- Variant A: More space, but slower
- Variant B: Mobile-friendly, equal speed

**Winner:** Whichever minimizes wrong-size returns + maximizes conversions

**Implementation Complexity:** Low (UI change)

---

### Test 10: Add to Cart Flow

**Hypothesis:** Immediate add has lower friction, but confirmation ensures correct choice

**Control (Current):**
- Button: "ADD TO CART"
- Click → Item added (toast notification)
- Cart count badge updates

**Variant A:**
- Button: "ADD TO CART"
- Click → Modal confirmation
  - "Added 1x ARCHITECT HOODIE"
  - [Continue Shopping] [View Cart]

**Variant B:**
- Button: "ADD TO CART"
- Click → Drawer slides out
- Shows added item
- Quick re-order option

**Metrics:**
- Add-to-cart rate (%)
- Cart abandonment (after add)
- Checkout conversion
- Cart value

**Expected Outcome:**
- Control: Highest add rate (low friction)
- Variant A: Lower add rate, higher checkout rate
- Variant B: Balanced (shows cart, allows continuation)

**Winner:** Whichever maximizes (Add-to-cart rate × Checkout conversion)

**Implementation Complexity:** Medium (modal/drawer logic)

---

## 5. CHECKOUT A/B TESTS

### Test 11: Guest Checkout vs Account Required

**Hypothesis:** Guest checkout increases first-time conversions, account requirement builds loyalty

**Control:**
- Account required
- Create account during checkout

**Variant A:**
- Guest checkout
- Option to create account after purchase

**Variant B:**
- Guest checkout mandatory
- No account option

**Metrics:**
- Checkout completion rate (%)
- Cart abandonment rate
- New accounts created
- Repeat purchase rate (30 days)

**Expected Outcome:**
- Control: Lower conversion, more repeat orders
- Variant A: Highest conversion, some repeat orders
- Variant B: High conversion, no repeat data

**Winner:** Guest checkout (Variant A) likely wins initial conversion, but measure repeat impact

**Implementation Complexity:** High (backend logic for dual-flow)

---

### Test 12: Checkout Steps

**Hypothesis:** Fewer steps = higher completion, but more steps = clearer process

**Control (Current):**
- Step 1: Cart Review
- Step 2: Shipping
- Step 3: Payment

**Variant A:**
- One-page checkout
- All fields visible
- Section dividers

**Variant B:**
- 4 steps (more granular)
- Confirm Order added as step 4
- Longer but clearer

**Metrics:**
- Checkout completion rate (%)
- Form errors
- Time to completion
- Step-by-step abandonment

**Expected Outcome:**
- Control: Good balance
- Variant A: Fastest completion, but more errors (cognitive overload)
- Variant B: Slower, but fewer errors

**Winner:** Whichever has highest completion rate despite step count

**Implementation Complexity:** High (checkout flow redesign)

---

### Test 13: Payment Options

**Hypothesis:** Apple Pay / Google Pay increase completion, but require setup

**Control:**
- Credit card only

**Variant A:**
- Apple Pay (primary)
- Google Pay
- Card (fallback)

**Variant B:**
- All three above
- + PayPal

**Metrics:**
- Checkout completion rate (%)
- Payment method selection
- Platform usage (iOS vs Android)
- Fraud rate

**Expected Outcome:**
- Control: Lower completion, high friction
- Variant A: Highest completion on iOS/Android
- Variant B: Highest completion across all platforms

**Winner:** Variant A or B (likely PayPal isn't worth complexity for luxury brand)

**Implementation Complexity:** High (multiple payment gateways)

---

## 6. MOBILE-SPECIFIC A/B TESTS

### Test 14: Mobile Navigation - Hamburger vs Bottom Tabs

**Hypothesis:** Bottom tabs are more thumb-friendly, hamburger is more common

**Control (Mobile Only):**
- Hamburger menu (top-left)
- Header icons (right)

**Variant A:**
- Bottom navigation bar
- 4-5 tabs: Home, Shop, Account, Cart, Menu
- Always visible

**Metrics:**
- Navigation usage (% of sessions)
- Menu interaction time
- Shop conversion on mobile
- Mobile-specific bounce rate

**Expected Outcome:**
- Control: Good, but requires reaching top
- Variant A: More navigation, potentially better engagement

**Winner:** Likely Variant A for e-commerce, but test to confirm

**Implementation Complexity:** Medium (layout restructure)

---

### Test 15: Product Card Interaction (Mobile)

**Hypothesis:** Tap to expand vs slide-to-details affects discovery

**Control:**
- Tap card → Product detail page

**Variant A:**
- Slide card left → Quick preview (modal)
- Quick add to cart
- Tap → Full page

**Variant B:**
- 3D flip animation
- Front: Image + price
- Back: Features + size selector
- Full interaction on card

**Metrics:**
- Quick add rate
- Product detail page visits
- Time to add-to-cart
- Mobile conversion rate

**Expected Outcome:**
- Control: Standard flow
- Variant A: More quick adds, potentially lower detail page views
- Variant B: Higher engagement, but complexity

**Winner:** Variant A if it increases conversion rate

**Implementation Complexity:** High (gesture detection + animation)

---

## 7. CONTENT & MESSAGING A/B TESTS

### Test 16: Product Description Length

**Hypothesis:** Detailed descriptions build trust, but short descriptions avoid reading fatigue

**Control:**
- 2-3 sentences
- Key features (bulleted)

**Variant A:**
- Extended: 5-7 sentences
- Full feature list
- Care instructions
- Material breakdown

**Variant B:**
- Minimal: 1 sentence
- One key feature
- "Learn more" for details

**Metrics:**
- Time spent on product page
- Scroll depth
- Questions/support tickets
- Conversion rate

**Expected Outcome:**
- Control: Balanced
- Variant A: Higher engagement, possibly lower conversion (overwhelm)
- Variant B: Faster decisions, some missing context

**Winner:** Measure by (Conversion rate × Return rate) to account for quality

**Implementation Complexity:** Very low (content change)

---

### Test 17: Social Proof

**Hypothesis:** Customer testimonials / reviews increase trust and conversion

**Control:**
- No reviews (new site)

**Variant A:**
- 5-star average badge
- "2,300 happy customers"
- No individual reviews

**Variant B:**
- Individual reviews
- "Great quality!" - @user
- Star ratings

**Variant C:**
- Instagram integration
- User-generated content
- Posts from customers

**Metrics:**
- Conversion rate
- Trust score (exit survey)
- Time on product page
- Return rate

**Expected Outcome:**
- Control: Baseline
- Variant A: 5-15% conversion lift (trust signals)
- Variant B: Similar to A, but more detail
- Variant C: Highest if content is authentic

**Winner:** Variant A or B (data exists, UGC takes time to build)

**Implementation Complexity:** Low to Medium (depends on integration)

---

## 8. EMAIL CAPTURE A/B TESTS

### Test 18: Welcome Discount for Email Capture

**Hypothesis:** Discount incentivizes email capture, but hurts perceived exclusivity

**Control:**
- Email capture (no incentive)

**Variant A:**
- "15% off first order with email"
- Shows in modal

**Variant B:**
- "Early access to new drops"
- No discount, different incentive

**Variant C:**
- No incentive, but reminder: "Verify email for updates"
- Reframe as benefit, not requirement

**Metrics:**
- Email capture rate (%)
- Email verification rate
- First order discount usage
- AOV (average order value)

**Expected Outcome:**
- Control: Baseline email rate
- Variant A: Higher capture, lower AOV (discount hunters)
- Variant B: Balanced capture, higher AOV
- Variant C: Lower capture, highest AOV

**Winner:** Variant B or C (maintain brand prestige)

**Implementation Complexity:** Medium (logic for incentive display)

---

## 9. TESTING TIMELINE & PRIORITY

### Phase 1: High-Impact, Low-Effort (Week 1-3)

1. **Test 4:** CTA button text (1 hour)
2. **Test 16:** Product description length (1 hour)
3. **Test 2:** Modal UI (Tabs vs Toggle) (1 hour)
4. **Test 5:** Product grid size (1 hour)

**Expected lift:** 5-10% conversion improvement

---

### Phase 2: Medium-Impact Tests (Week 4-6)

5. **Test 1:** Email verification (required vs optional) (2 hours)
6. **Test 9:** Size selector (dropdown vs buttons) (1 hour)
7. **Test 6:** Search prominence (2 hours)
8. **Test 17:** Social proof (3 hours)

**Expected lift:** 10-20% additional improvement

---

### Phase 3: Major UX Redesigns (Week 7+)

9. **Test 11:** Guest checkout (8 hours backend)
10. **Test 12:** Checkout steps (8 hours)
11. **Test 13:** Payment options (12 hours)
12. **Test 14:** Mobile navigation (6 hours)

**Expected lift:** 15-30% conversion improvement (compound effect)

---

## 10. A/B TESTING INFRASTRUCTURE

### 10.1 Tools Needed

**Testing Platform:**
- Optimizely, VWO, or Convert.com
- Allows 50/50 split traffic
- Real-time analytics

**Analytics:**
- Google Analytics 4
- Track custom events per variant
- UTM parameters for traffic source

**Heatmap/Session Recording:**
- Hotjar, Crazy Egg, or Microsoft Clarity
- Understand user behavior in each variant
- Identify friction points

**Statistical Significance Calculator:**
- https://www.abtestguide.com/sample-size/
- Determine required sample size
- Validate test results

---

### 10.2 Test Tracking Template

```markdown
# Test: [Name]
**Hypothesis:** [What we're testing and why]

**Control (A):** [Current state]
**Variant (B):** [New state]

**Primary Metric:** [e.g., conversion rate]
**Secondary Metrics:** [Additional metrics]

**Target Lift:** [e.g., 15%]
**Statistical Significance:** 95%
**Required Sample:** [X visitors]
**Test Duration:** [Days]

**Results:**
- Control: [Result]
- Variant: [Result]
- Lift: [X%]
- Significance: [Yes/No]

**Winner:** [Which variant won]
**Learnings:** [Key insights]
**Rollout Date:** [When deployed]
```

---

## 11. WHAT NOT TO TEST

**Avoid Testing:**
- ❌ Brand colors (black + white is locked)
- ❌ Logo placement (centered is brand standard)
- ❌ Tagline "Pas pour Tout" (brand identity)
- ❌ Entrance gate flow structure (core to brand)

**Test Instead:**
- Copy variations (keeping brand voice)
- Interaction speed (animations)
- Information hierarchy (layout)
- Secondary CTAs (buttons, links)

---

## 12. TESTING METRICS DASHBOARD

**Create dashboard showing:**

| Metric | Control | Variant | Lift | Significance |
|--------|---------|---------|------|--------------|
| Conversion Rate | 2.1% | 2.5% | +19% | ✓ 96% |
| AOV | $750 | $745 | -0.7% | ✗ |
| Cart Abandonment | 62% | 58% | -6% | ✓ 92% |
| Avg Session Time | 3:45 | 4:12 | +11% | ✓ 98% |

**Reported Weekly:**
- Top test progress
- Winning variants
- Next test queue
- Compound improvement (cumulative)

---

## SUMMARY: A/B TESTING ROADMAP

**Week 1-2:** Baseline metrics, 1 quick test (CTA)  
**Week 3-4:** 3 low-effort tests (grid, description, modal)  
**Week 5-8:** 4 medium tests (email, search, size, social proof)  
**Week 9+:** Major UX tests (checkout, payment, mobile nav)  

**Expected Results (12 weeks):**
- Cumulative conversion lift: 30-50%
- Email capture: +20-25%
- AOV increase: 5-10%
- Customer satisfaction: +15-20%

**Success = Data-driven decisions, not guesses**