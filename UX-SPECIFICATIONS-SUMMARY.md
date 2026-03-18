# MONTREZ SITE - UX SPECIFICATIONS SUMMARY

**Version:** 1.0  
**Date:** 2026-03-18  
**Status:** Ready for Frontend & UI Designer Implementation

---

## DELIVERABLES COMPLETED

✅ **UX-FLOWS.md** (25KB)
- Complete entrance flow specifications
- Navigation patterns
- Product discovery flows
- Product detail experience
- Checkout process
- Mobile experience guidelines
- Accessibility standards

✅ **WIREFRAMES.md** (26KB)
- Landing page layouts (desktop/mobile)
- Authentication modal variations
- Homepage structure
- Shop page grid layouts
- Product detail page layouts
- Cart and checkout pages
- Component library (product cards, drawers, etc.)

✅ **INTERACTION-PATTERNS.md** (19KB)
- Micro-interactions library
- Entrance flow animations
- Navigation interactions
- Product discovery behaviors
- Checkout flow interactions
- Mobile gestures
- Loading/empty states
- Error handling

✅ **MOBILE-OPTIMIZATION-GUIDE.md** (16KB)
- Mobile-first design principles
- Screen sizes & safe areas
- Touch target sizing (44x44px minimum)
- Navigation patterns (hamburger, tabs)
- Product display optimization
- Form input guidelines
- Checkout optimization
- Mobile accessibility
- Testing checklist

✅ **AB-TESTING-GUIDE.md** (20KB)
- 18 specific A/B tests with hypotheses
- High-impact, quick-win tests
- Testing timeline (3 phases)
- Statistical significance framework
- Testing infrastructure
- Success metrics dashboard

---

## KEY UX DECISIONS MADE

### 1. ENTRANCE FLOW

**Decision:** Email verification REQUIRED (default)
- **Rationale:** Builds email list, validates real users
- **Alternative:** Optional (Test later via A/B Test #1)
- **Fallback:** Password "NOTFOREVERYONE" for VIP access

**Decision:** Modal UI using TABS (not toggle)
- **Rationale:** More scannable, clearer hierarchy
- **Alternative:** Toggle (Test via A/B Test #2)
- **Tab layout:** Returning | New User (side-by-side)

**Decision:** Video is 5 seconds, skip available after 2 seconds
- **Rationale:** Builds brand mystique, still fast
- **Alternative:** Shorter/longer (Test via A/B Test #3)

### 2. NAVIGATION

**Decision:** Hamburger menu (mobile-first, all sizes)
- **Rationale:** Consistent, unifies UX across devices
- **Alternative:** Bottom tab bar (Test via A/B Test #14)
- **Sticky header:** 56px height (including safe areas)

**Decision:** Search as icon in header, opens modal
- **Rationale:** Minimalist, doesn't clutter header
- **Alternative:** Prominent search bar (Test via A/B Test #6)

**Decision:** Cart as side drawer (mobile), full page (desktop)
- **Rationale:** Space-efficient, matches hamburger pattern
- **Edit capabilities:** Quantity +/-, remove item

### 3. PRODUCT DISCOVERY

**Decision:** Grid size 2-col (mobile) → 3-col (tablet) → 4-col (desktop)
- **Rationale:** Balanced visibility vs. scrolling
- **Alternative:** 1/2/3 or 2/3/5 (Test via A/B Test #5)

**Decision:** Filters as sticky sidebar (desktop), modal (mobile)
- **Rationale:** Desktop users want persistent filters, mobile needs space
- **Alternative:** Hamburger-integrated filters (Test via A/B Test #7)

**Decision:** Product cards show: Image, Name, Price, Hover = Zoom + "View Details"
- **Rationale:** Clean, minimalist, mystique preserved
- **Hover animation:** Scale 1.05x, overlay 0.3 opacity

### 4. PRODUCT DETAIL

**Decision:** Image gallery with side/bottom thumbnails
- **Rationale:** Shows product variations, touch-friendly
- **Alternative:** Bottom strip or no thumbnails (Test via A/B Test #8)

**Decision:** Size selector as buttons [XS][S][M][L][XL][XXL]
- **Rationale:** Visible, accessible, no friction
- **Alternative:** Dropdown (Test via A/B Test #9)

**Decision:** Add to cart: Button state change (Adding... → Added ✓)
- **Rationale:** Clear feedback, no modal friction
- **Alternative:** Toast notification or cart preview (Test via A/B Test #10)

### 5. CHECKOUT

**Decision:** 3-step checkout (Cart → Shipping → Payment)
- **Rationale:** Clear progression, not overwhelming
- **Alternative:** 1-page or 4-step (Test via A/B Test #12)

**Decision:** Account creation OPTIONAL (guest checkout default)
- **Rationale:** Lowers friction for first purchase
- **Alternative:** Account required (Test via A/B Test #11)
- **Capture:** Option to create account after purchase

**Decision:** Payment: Credit card primary (Apple Pay / Google Pay secondary)
- **Rationale:** Everyone can pay by card, adds convenience
- **Alternative:** Add PayPal (Test via A/B Test #13)

### 6. MOBILE EXPERIENCE

**Decision:** Minimum touch targets 44x44px, critical actions in thumb zone (bottom)
- **Rationale:** Accessibility, comfortable one-handed use
- **Button height:** 48px-56px (mobile)

**Decision:** Full-width inputs, single column forms
- **Rationale:** Reduces cognitive load, easier scrolling
- **Form font:** 16px minimum (prevents auto-zoom iOS)

**Decision:** Swipe-enabled product gallery
- **Rationale:** Natural mobile interaction, expected gesture
- **Implementation:** Swipe left/right, pinch zoom, double-tap

### 7. ACCESSIBILITY

**Decision:** Focus indicators visible (2px white outline, 4px offset)
- **Rationale:** WCAG AA compliant, keyboard navigation essential

**Decision:** ARIA labels on all buttons/icons
- **Rationale:** Screen reader users (VoiceOver, TalkBack)

**Decision:** Color contrast 21:1 (black bg + white text)
- **Rationale:** WCAG AAA (highest standard), luxury brand suits high contrast

---

## CRITICAL SUCCESS FACTORS

### 1. Entrance Flow
✓ Gate image (B&W, cinematic)  
✓ Modal feels exclusive (no background, minimal)  
✓ Email verification smooth (code input with auto-focus)  
✓ Video impactful (5s atmospheric)  
✓ Transitions seamless (no loading delays)

### 2. Navigation
✓ Hamburger menu instant (no lag)  
✓ Touch targets generous (44x44px+)  
✓ Header sticky (always accessible)  
✓ Cart count badge updates (real-time)

### 3. Product Discovery
✓ Grid loads fast (skeleton loading)  
✓ Filters instant (no page reload)  
✓ Cards show hover effect (zoom, overlay)  
✓ Images lazy load (below fold)

### 4. Product Detail
✓ Gallery smooth (cross-fade images)  
✓ Size selection obvious (highlighted)  
✓ Add to cart feedback immediate (button state or toast)  
✓ Related products shown

### 5. Checkout
✓ Validation real-time (shows errors as user types)  
✓ Progress visible (Step X of 3)  
✓ Form prefilling (auto-detect country, etc.)  
✓ Confirmation immediate (celebratory state)

### 6. Mobile
✓ Safe areas respected (notch, home indicator)  
✓ Performance <2.5s LCP (lazy load, optimize images)  
✓ Gestures work (swipe, pinch, pull-to-refresh)  
✓ Forms accessible (large buttons, correct keyboard types)

---

## HAND-OFF TO FRONTEND & UI DESIGNER

### For Frontend Developer

**Start with:**
1. Routing structure (React Router)
   - / → Landing
   - /auth → Gate/modal
   - /video → Video intro
   - /home → Homepage
   - /shop → Product grid
   - /product/:id → Product detail
   - /cart → Cart review
   - /checkout → Multi-step form
   - /confirmation → Order confirmation

2. Component hierarchy
   - Header (sticky, responsive)
   - Navigation drawer (hamburger)
   - Cart drawer
   - Modal (password/email)
   - Product card (reusable)
   - Product gallery
   - Form inputs
   - Toast notifications

3. State management
   - User auth state
   - Cart state (Redux or Context)
   - Filter state
   - Form state (checkout)
   - UI state (modals, drawers)

4. API endpoints needed
   - POST /auth/email (send code)
   - POST /auth/verify (verify code)
   - POST /auth/password (verify password)
   - GET /products (with filters)
   - GET /products/:id
   - POST /cart/add
   - DELETE /cart/:item
   - POST /checkout
   - POST /orders

**Refer to:**
- **UX-FLOWS.md** for page-by-page behavior
- **WIREFRAMES.md** for layout dimensions
- **INTERACTION-PATTERNS.md** for animations/timing

---

### For UI Designer

**Visual specs needed:**
1. Color palette (provided)
   - Primary: #000000 (black)
   - Secondary: #FFFFFF (white)
   - Accent: Chrome/silver

2. Typography system
   - Logo: Serif bold (classic luxury)
   - Headings: Serif or sans-serif bold
   - Body: Clean sans-serif
   - Min font size: 12px, base: 14px, large: 16px+

3. Spacing system (8px grid)
   - Tight: 8px
   - Comfortable: 16px
   - Spacious: 24px
   - Section: 40px-60px

4. Component styles
   - Buttons: 2px white border, no fill
   - Inputs: 2px white border, black background
   - Cards: Simple, no shadow (luxury minimalism)
   - Hover states: Opacity + scale changes

5. Icons
   - Style: Minimal, outline
   - Size: 24px (icon) in 56x56px touch area
   - Color: White on black

**Refer to:**
- **WIREFRAMES.md** for exact layouts
- **MOBILE-OPTIMIZATION-GUIDE.md** for responsive sizes
- **INTERACTION-PATTERNS.md** for animation specs

---

## METRICS TO TRACK

### Launch Week (Baseline)

```
Entrance Flow:
- Landing page views
- Gate conversion rate (%)
- Email capture rate (%)
- Verification rate (%)
- Video completion rate (%)

Product Discovery:
- Shop page bounce rate
- Filter usage (%)
- Products viewed per session
- Avg session duration

Conversion:
- Add-to-cart rate
- Cart abandonment
- Checkout completion
- Order value
```

### A/B Testing (Weeks 2-12)

See **AB-TESTING-GUIDE.md** for 18 specific tests and metrics.

---

## IMPLEMENTATION TIMELINE

**Phase 1: Infrastructure (Days 1-3)**
- Set up routing
- Build header/nav components
- Implement cart state management
- Create reusable component library

**Phase 2: Entrance Flow (Days 4-5)**
- Landing page with gate image
- Modal (password/email)
- Email verification backend
- Video integration
- Session storage logic

**Phase 3: Main Site (Days 6-10)**
- Homepage (hero + featured products)
- Shop page with grid + filters
- Product detail page + gallery
- Search functionality

**Phase 4: Checkout (Days 11-12)**
- Cart page
- Multi-step form
- Payment integration
- Order confirmation

**Phase 5: Polish (Days 13-14)**
- Animations (micro-interactions)
- Mobile optimization
- Performance tuning
- Accessibility audit

**Phase 6: Testing (Days 15+)**
- QA across devices
- A/B test setup
- Live traffic
- Monitor metrics

---

## WHAT'S NOT INCLUDED

❌ Backend API (assumed separate)  
❌ Payment gateway integration (Stripe/Square setup)  
❌ Email service (SendGrid/Resend setup)  
❌ Image cropping/editing (for logo, products)  
❌ Analytics dashboard setup  
❌ Security review (passwords, PII handling)  

**Coordinate with backend team on:**
- Email verification API
- Password validation logic
- Product data structure
- Order fulfillment
- User accounts (if applicable)

---

## NEXT STEPS

1. **Frontend Dev:** Start with routing + header (Days 1-2)
2. **UI Designer:** Create design system (colors, typography, spacing)
3. **Backend Dev:** Email verification API + product endpoints
4. **Together:** Daily standups, mobile testing
5. **QA:** Full regression testing before launch
6. **Metrics:** Set up analytics before going live

---

## QUESTIONS & EDGE CASES

### Q: What if email verification fails?
**A:** Show error message with "Resend code" or "Try different email" options (see UX-FLOWS.md error states)

### Q: What if user closes modal without submitting?
**A:** Modal closes, user back at landing page. Can click "ENTER" again.

### Q: Should cart persist across sessions?
**A:** Yes (localStorage on client, or session cookie). Implement per backend design.

### Q: What's the password for returning users?
**A:** "NOTFOREVERYONE" (or custom password per user if accounts supported)

### Q: Mobile: Hamburger or bottom tabs?
**A:** Default hamburger (Test #14 will validate if bottom tabs better). Can support both via A/B test.

### Q: How many featured products on homepage?
**A:** 4 products (2x2 on mobile, 4x1 on tablet, 4x1 on desktop). Test #5 can adjust.

### Q: Should we show out-of-stock products?
**A:** Yes, with "Sold Out" badge + "Notify me" option (not implemented initially, can add later)

### Q: Payment: Only card, or Apple Pay first?
**A:** Card primary (simpler integration). Add Apple Pay/Google Pay in Test #13 phase.

### Q: Email capture is not working (bounce)?
**A:** Ensure backend email service (Resend/SendGrid) is configured and tested.

---

## SUCCESS CRITERIA (Launch)

**Minimum Viable Launch:**
✓ Entrance flow working (gate → password/email → video → site)  
✓ Products display correctly  
✓ Add to cart functional  
✓ Checkout completes orders  
✓ Mobile responsive (375px+)  
✓ No console errors  
✓ LCP < 3s  
✓ CLS < 0.1  

**Nice to Have:**
- Search functional
- Animations smooth
- A/B test framework ready
- Analytics integrated
- Email confirmations sending

---

## SUPPORT & QUESTIONS

**Clarifications on UX:**
- Refer to UX-FLOWS.md (detailed specs)
- Refer to WIREFRAMES.md (visual layouts)

**Animation/Interaction specifics:**
- Refer to INTERACTION-PATTERNS.md (timing, easing, sequences)

**Mobile/Accessibility details:**
- Refer to MOBILE-OPTIMIZATION-GUIDE.md
- Refer to A11y section in UX-FLOWS.md

**Testing strategy:**
- Refer to AB-TESTING-GUIDE.md

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-18 | Initial UX specifications |

---

**Document prepared by:** UX Researcher  
**For:** Isaac (Montrez Rebuild)  
**Status:** Ready for implementation  
**Files:** 5 detailed UX documents (100KB+)

All specifications ready for frontend and ui-designer handoff.

**Next: Frontend builds components, designer creates visual style guide.**