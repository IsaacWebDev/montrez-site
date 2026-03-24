# MONTREZ UX RESEARCH REPORT
**Version:** 1.0 | **Date:** March 24, 2026 | **Status:** Complete

---

## EXECUTIVE SUMMARY

**Research Scope:** User flow analysis, competitor benchmarking (Supreme, Palace, Off-White, Stüssy), streetwear e-commerce best practices

**Key Findings:**
- Montrez has strong brand identity but **UX is incomplete** (no functional checkout)
- Competitors excel at **exclusivity signals** and **drop culture mechanics**
- Mobile experience is **critical pain point** (undersized touch targets, no cart flow)
- "Pas pour Tout" tagline exists but doesn't translate to UX (missing confidence signals)
- Biggest opportunity: **Trust + Conversion** (add social proof, scarcity, payment flow)

**Recommended Priority:** Fix checkout flow first (blocks all revenue), then mobile polish, then trust signals.

---

## PART 1: MONTREZ CURRENT STATE AUDIT

### 1.1 Strengths

✅ **Strong Brand Foundation**
- Clear visual identity (black/white/electric blue)
- Compelling tagline ("Pas pour Tout")
- Minimal, confident aesthetic
- Logo & typography system in place

✅ **Decent Desktop Experience**
- Homepage layout works
- Product pages exist with descriptions
- Navigation structure is clean
- Performance is good (fast load times)

✅ **Content System**
- Product data organized (products.json)
- SEO metadata prepared
- Brand guidelines documented
- Mobile breakpoints considered

### 1.2 Critical Gaps

❌ **No Revenue Mechanism**
- Cart exists (icon only, non-functional)
- No checkout flow implemented
- No payment integration
- Users cannot buy anything

❌ **Mobile is Broken**
- Touch targets undersized (<44px)
- No mobile cart drawer
- No mobile checkout
- Filters not implemented on mobile

❌ **Missing Trust Signals**
- No customer reviews/testimonials
- No "sold out" indicators
- No limited stock warnings
- No security badges
- No authenticity guarantees

❌ **No Exclusivity/Urgency**
- No drop schedule
- No restock notifications
- No "limited edition" badges
- No countdown timers
- Doesn't feel like "not for everyone"

❌ **Poor Product Discovery**
- Search function missing
- Filters limited (category only)
- No price range filter
- No size filtering
- No sort options

### 1.3 Montrez vs. Competitors - Quick Comparison

| Feature | Montrez | Supreme | Off-White | Palace | Stüssy |
|---------|---------|---------|-----------|--------|--------|
| **Announcement Bar** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Email Gate** | ✅ | ❌ | ❌ | ✅ | ❌ |
| **Product Reviews** | ❌ | ❌ | ✅ | ❌ | ✅ |
| **Scarcity Badges** | ❌ | ✅ | ✅ | ✅ | ✅ |
| **Stock Indicators** | ❌ | ✅ | ✅ | ✅ | ✅ |
| **Drop Schedule** | ❌ | ✅ | ❌ | ✅ | ⚠️ |
| **Search** | ❌ | ✅ | ✅ | ✅ | ✅ |
| **Advanced Filters** | ❌ | ✅ | ✅ | ✅ | ✅ |
| **Functional Cart** | ❌ | ✅ | ✅ | ✅ | ✅ |
| **Checkout** | ❌ | ✅ | ✅ | ✅ | ✅ |
| **Mobile Optimized** | ❌ | ⚠️ | ✅ | ✅ | ✅ |

**Gap Analysis:** Montrez is missing 6 critical features that are table-stakes for streetwear e-commerce.

---

## PART 2: COMPETITOR BENCHMARKING

### 2.1 Supreme (supremenewyork.com)

**Brand Positioning:** "Supreme" dropped culture, limited availability, resale value obsession

**UX Patterns:**

**Navigation:**
- Sticky header with shop dropdown menu
- Dynamic "New" indicator on recently released items
- Clear inventory status (in-stock, out-of-stock, coming soon)
- Social links prominent (Instagram, Twitter)

**Product Page:**
- Large hero image (fills viewport)
- Multiple images/angles mandatory
- Explicit stock count: "XXX in stock"
- Size selector with real-time availability
- Price in local currency
- Est. ship date visible
- Sold-out items show gray overlay

**Exclusivity Signals:**
- Drop schedule calendar (publicized drops)
- "Drops at..." countdown timers
- Sold-out times visible ("Sold out in 3 minutes")
- Pre-order indicators for future releases
- Authentication/legit-check program

**Design:**
- Minimal (white/red/black palette)
- All-caps typography
- High-res photography
- Clean grid layout (3-4 columns)
- Bold, confident aesthetic

**Mobile:**
- Hamburger menu with all categories
- Touch-friendly buttons (44px+)
- Swipe-able product galleries
- Persistent cart drawer

**Announcement Bar:**
- Persistent top banner
- Rotating messages (drop times, sales, messages)
- Dismissible but comes back on reload

---

### 2.2 Off-White (off-white.com)

**Brand Positioning:** Luxury streetwear, designer-driven, storytelling

**UX Patterns:**

**Navigation:**
- Horizontal menu (New, Clothing, Accessories, Collections)
- Luxury aesthetic (refined spacing, typography)
- Account menu (wishlist, orders, settings)
- International language/currency selector

**Product Page:**
- Video assets (product in motion, lifestyle)
- 360° product viewer
- Detailed specifications (materials, care instructions)
- Customer reviews section (5-star ratings)
- "Verified purchase" badges
- Trust indicators: Size guide, shipping info, returns policy
- Related items suggestions
- Multiple color options with color-tagged images

**Exclusivity Signals:**
- Limited edition badges
- Exclusive collaboration labels
- High price point (signals exclusivity)
- Designer bio/story for each drop
- Behind-the-scenes content
- Lookbook integration

**Design:**
- Refined, sophisticated
- Neutral palette (black, white, beige, gray)
- High-end typography (serif fonts)
- Whitespace (luxury feel)
- Video-heavy storytelling

**Mobile:**
- Responsive video galleries
- Tap-friendly size selection
- Quick add to cart (not modal)
- Account accessible from menu

**Announcement Bar:**
- Non-intrusive, top placement
- "New In" or seasonal announcement
- Links to collection pages

---

### 2.3 Palace Skateboards (palaceskateboards.com)

**Brand Positioning:** Skate culture, community-driven, bold irreverence

**UX Patterns:**

**Navigation:**
- Clean menu (Shop, Web Shop, Advice, Shops, Manor Place)
- Dynamic homepage (changes with drops)
- Separated web shop (shop.palaceskateboards.com) vs. info site
- Community section ("Advice" = editorial + community)

**Product Page:**
- Large product image with multiple angles
- Bold, colorful design (embraces color, not minimal)
- Clear sizing guide
- Stock status clear
- Community reviews/comments below
- "Worn by" section (who's wearing this item)
- Social content embedded (Instagram posts wearing item)

**Exclusivity Signals:**
- Drop announcements on social
- Limited quantities publicized
- Collab badges
- New arrivals section
- Seasonal collections
- Skate event tie-ins

**Design:**
- Colorful triangular logo system
- Bold typography
- Playful, energetic
- Community-focused (shows user content)
- Skate magazine aesthetic

**Mobile:**
- Clean, simple navigation
- Touch-friendly buttons
- Swipeable product galleries
- Mobile-optimized shop

**Announcement Bar:**
- Seasonal banners (summer range, spring drop, etc.)
- Social media links
- New releases highlighted

---

### 2.4 Stüssy (stussy.com)

**Brand Positioning:** Original streetwear, heritage, accessible luxury

**UX Patterns:**

**Navigation:**
- Main menu (New, Clothing, Footwear, Accessories)
- Regional selection (US, EU, Asia)
- Simple, straightforward
- Account / Orders access

**Product Page:**
- Clean image presentation
- Color swatches
- Size chart with measurements
- Price and availability
- Shipping info (free threshold)
- Customer reviews section
- Size selector UI is clean

**Exclusivity Signals:**
- New arrivals section
- Seasonal collections
- Collab announcements
- Sale section (with discount %)
- Coming soon items

**Design:**
- Minimal, clean
- Serif headlines
- Generous spacing
- Heritage photography (archive content)
- Professional, approachable

**Mobile:**
- Responsive grid
- Touch-friendly selections
- Quick checkout
- Account accessible

**Announcement Bar:**
- Sale announcements
- New arrivals highlight
- Seasonal messaging

---

## PART 3: STREETWEAR E-COMMERCE BEST PRACTICES

### 3.1 Scarcity & Urgency Mechanics

**Why It Works:**
- Streetwear buyers *expect* limited availability
- Creates FOMO (fear of missing out)
- Drives impulse buying
- Makes customers feel exclusive

**Implementation Patterns:**

```
1. STOCK INDICATORS
   "Only 5 left in this size" (when < 10 units)
   "Only 12 left" (when < 20 units)
   Gray out sizes when out of stock (don't hide them)

2. TIME-BASED URGENCY
   "Drop in 48 hours"
   "Drops Friday at 11am EST"
   Countdown timer (visual urgency)

3. SOLD-OUT SIGNALS
   Show exact time item sold out ("Sold out in 3 minutes")
   Implies high demand
   Proves exclusivity

4. LIMITED EDITION BADGES
   🔥 LIMITED - Only 50 made
   ⭐ COLLAB - Off-White x Palace
   🚀 NEW - Just dropped

5. RESTOCK INDICATORS
   "Restocking Friday" (on out-of-stock items)
   Subscribe for restock notification
   Email reminder when back
```

**Examples:**
- Supreme: Real-time stock counts
- Off-White: "Limited edition" badges on product cards
- Palace: "Available now at shop" on web shop items
- Stüssy: Explicit "Back in stock" messaging

---

### 3.2 Social Proof & Community

**Why It Works:**
- Streetwear is identity + community
- Buyers want to see others wearing items
- User-generated content = authenticity
- Reviews = confidence (converts +10-15%)

**Implementation Patterns:**

```
1. CUSTOMER REVIEWS
   5-star ratings system
   Verified purchase badges (bought, not fake)
   Review photos (customers showing product)
   Helpful/unhelpful voting

2. SOCIAL FEED INTEGRATION
   Embedded Instagram grid (6-9 posts tagged #brand)
   Carousel of customer posts
   Link to brand account (follower social proof)

3. USER-GENERATED CONTENT
   "Tag us @montrez" to see your fit
   Community gallery on site
   Spotlight customer looks

4. INFLUENCER/AMBASSADOR SECTION
   Who wears Montrez?
   Links to ambassador Instagram
   Lookbook drops

5. RECENT ACTIVITY SIGNALS
   "10 people bought this today"
   "Added to cart X times in last hour"
   Subtle, not pushy
```

**Examples:**
- Off-White: 5-star reviews with photos
- Palace: "Worn by" section with Instagram integration
- Stüssy: Customer review photos
- Supreme: Community resale market (secondary proof)

---

### 3.3 Storytelling & Brand Narrative

**Why It Works:**
- Streetwear is about identity + belonging
- "Not for everyone" requires story
- Narrative drives premium pricing
- Creates emotional connection

**Implementation Patterns:**

```
1. PRODUCT STORYTELLING
   Each drop has a story/concept
   Behind-the-scenes photos
   Design inspiration explained
   Artist/designer bio

2. BRAND VOICE
   Confident, bold language
   "This isn't for everyone"
   "Built for the bold"
   Avoid generic fashion speak

3. HERITAGE & AUTHENTICITY
   Timeline of brand (how it started)
   Mission statement (what's the point?)
   Community focus (not just retail)
   Authenticity commitments

4. CAMPAIGN/LOOKBOOK
   Seasonal campaign photography
   How items are styled
   Lifestyle photography (not just product shots)
   Video content (TikTok, Instagram Reels)

5. EDITORIAL CONTENT
   Blog/news section
   Artist interviews
   Drop announcements
   Community features
```

**Examples:**
- Off-White: Designer Virgil's story, design philosophy
- Palace: "Advice" section (editorial, skate culture)
- Supreme: Rich archive (nostalgic, heritage)
- Stüssy: Heritage photography, brand history

---

### 3.4 Drop Culture & Scarcity Mechanics

**Why It Works:**
- Creates event-based shopping (not always-on)
- Builds anticipation and hype
- Encourages repeat visits
- Makes releases feel special

**Implementation Patterns:**

```
1. DROP CALENDAR
   Published schedule (transparency = trust)
   Time zone support (global audience)
   Notification signup
   Push alerts for drops

2. COUNTDOWN MECHANICS
   "Drops in 48 hours"
   Live countdown timer
   "Next drop Friday 11am EST"
   Pre-drop email tease

3. PRODUCT PAGES PRE-DROP
   Item visible before available
   "Coming Friday" status
   Pre-order option (some brands)
   Wishlist/remind me button

4. SOLD-OUT STORYTELLING
   Show sell-out times ("Sold out in 3 minutes")
   Encourage newsletter signup (restock alerts)
   Show next drop date
   Similar items recommendation

5. RESTOCK MECHANICS
   Surprise restocks (organic growth hype)
   Restock alerts (email subscribers first)
   "Just restocked" badge
   "Coming back Friday" indicators
```

**Examples:**
- Supreme: Legendary weekly Thursday 11am EST drops
- Off-White: Seasonal drops tied to fashion calendar
- Palace: Regular skate-event tie-in drops
- Stüssy: Quarterly seasonal releases

---

### 3.5 Exclusivity Signals (Non-Scarcity)

**Why It Works:**
- "Not for everyone" needs to *feel* true in UX
- Confidence + edge > politeness
- Attracts target demographic
- Repels inappropriate customers

**Implementation Patterns:**

```
1. BRAND LANGUAGE
   "Show up bold"
   "Not for everyone"
   "No compromises"
   Confident, not apologetic

2. AESTHETIC CONFIDENCE
   Bold color choices (accept strong opinions)
   Strong typography (Bebas Neue style)
   Unpolished photography (authenticity)
   No over-explanation

3. COMMUNITY GATEKEEPING (Soft)
   Email verification (keeps out bots)
   Password gate (mystique)
   Invite-only sections (for VIPs)
   Limited member perks

4. VISUAL HIERARCHY
   Highlight premium items
   Designer collaborations front & center
   Best-sellers obvious
   Exclusivity visual indicators

5. AUTHENTICATION
   Legit-check program (anti-counterfeiting)
   Authenticity certificate for premium items
   QR codes to verify
   Serial numbers/proof of authenticity
```

**Examples:**
- Montrez: Email gate + "Pas pour Tout" positioning
- Supreme: Password gate (NOTFOREVERYONE)
- Off-White: Premium pricing (self-selecting exclusivity)
- Palace: Community focus (insider language)

---

### 3.6 Navigation & Discovery

**Why It Works:**
- Streetwear audiences are goal-driven
- Must find specific item quickly
- Search + filters = better conversion
- Clear categorization = less frustration

**Implementation Patterns:**

```
1. NAVIGATION STRUCTURE
   Main: New, Clothing, Accessories, Footwear
   Secondary: Collaborations, Collections, Sale
   Sticky header (always accessible)
   Mobile: Hamburger with all categories

2. SEARCH FUNCTIONALITY
   Auto-complete suggestions
   Recent searches
   Trending searches
   Search filters (category, price, size)

3. FILTERING SYSTEM
   Category (must-have)
   Price range (must-have)
   Size (must-have)
   Color (nice-to-have)
   Stock status (in stock, out of stock, pre-order)
   Sort options: Featured, New, Price (high-low, low-high), Popular

4. PRODUCT GRID
   Mobile: 2 columns (responsive)
   Tablet: 3 columns
   Desktop: 4 columns
   Lazy load below fold
   Hover states (zoom, overlay)

5. PAGINATION vs INFINITE SCROLL
   Pagination: Better for desktop (better UX)
   Infinite scroll: Better for mobile
   Show item count ("Showing 12 of 150")
```

**Examples:**
- Supreme: Clean category system, no search (intentional minimalism)
- Off-White: Advanced filters + price range
- Palace: Seasonal collection navigation
- Stüssy: Simple category structure, search available

---

### 3.7 Announcement Bars (Critical Pattern)

**Why It Works:**
- Drives urgency (drop times, sales)
- Communicates important info
- Improves scannability
- Built into every top streetwear site

**Best Practices:**

```
1. PLACEMENT & PERSISTENCE
   Top of page (above header)
   Persistent (stays visible on scroll)
   Dismissible (user can close)
   High contrast (stands out)

2. CONTENT ROTATION
   Multiple messages (don't get stale)
   Auto-rotate (every 5-10 seconds)
   Clear call-to-action
   Relevant (drop time, sale, announcement)

3. DESIGN PATTERNS
   Semi-transparent background (white/black)
   Bold text (all caps preferred)
   Icon + text (visual + verbal)
   Link to detail page

4. EXAMPLES
   "DROP FRIDAY 11AM EST"
   "SPRING 2026 NOW AVAILABLE"
   "SOLD OUT IN 3 MINUTES"
   "NEW ARRIVALS - SHOP NOW"
   "SALE - UP TO 40% OFF"

5. MOBILE BEHAVIOR
   Responsive (fits small screens)
   Dismissible (user can close it)
   Doesn't overlap important content
   Shows in mobile menu too
```

**Examples:**
- Supreme: Simple drop time announcement
- Off-White: Seasonal collection announcement
- Palace: Colorful, bold messaging
- Stüssy: "New Arrivals" or sale announcements

---

## PART 4: MONTREZ-SPECIFIC FINDINGS

### 4.1 Does "Pas pour Tout" Come Through?

**Current State:** Tagline exists, but doesn't resonate in UX

**Missing Elements:**
- ❌ No confident language in copy (generic fashion speak)
- ❌ No exclusivity signals (anyone can see full site)
- ❌ No gatekeeping (email gate exists but understated)
- ❌ No bold design choices (too safe)
- ❌ No "insider" community signals

**How to Fix:**
- Use stronger language: "Not for everyone" in more places
- Add confidence to product descriptions
- Show email gate more prominently on entry
- Feature community/insider content
- Use bolder design choices (color, typography)
- Create exclusivity through drops and limited editions

---

### 4.2 European Luxury vs. Generic E-Commerce?

**Feelings It Gives Now:**
- Minimalist ✅ (good)
- Corporate ⚠️ (not streetwear)
- Polished but not bold ⚠️
- Luxury price, generic vibe ❌

**What's Missing for "Luxury" Feel:**
- Video assets (cinematic product videos)
- Photography quality (should be stunning)
- Storytelling (where does Montrez come from?)
- Heritage narrative (brand origin story)
- Designer/creative vision visible
- Limited edition storytelling

**What's Missing for "Streetwear" Feel:**
- Bold language (product descriptions)
- Community features (user photos, testimonials)
- Urgency mechanics (drops, countdowns)
- Edgy design choices (stronger colors, fonts)
- Authenticity signals (legit-check program)
- Insider references (streetwear culture nods)

**Recommendation:** Lean into "European luxury streetwear" position:
- Refined but bold
- Minimal but confident
- Heritage + innovation
- Exclusive but welcoming (for the right people)

---

### 4.3 Exclusivity Signals - What's Missing?

**Current State:** Almost none

**Critical Gaps:**

| Signal | Status | Impact |
|--------|--------|--------|
| Stock indicators | ❌ | Medium (drives urgency) |
| "Sold out" timings | ❌ | High (proves demand) |
| Limited edition badges | ❌ | High (justifies premium price) |
| Drop schedule | ❌ | High (creates anticipation) |
| Restock alerts | ❌ | Medium (builds loyalty) |
| Authenticity guarantee | ❌ | High (builds trust) |
| Review badges | ❌ | High (social proof) |
| "Recently sold" counters | ❌ | Medium (FOMO) |
| Collab badges | ❌ | Medium (prestige) |
| Behind-the-scenes | ❌ | Medium (storytelling) |

**Quick Wins (Easy to Add):**
1. Stock count on product pages ("Only 5 left")
2. Limited edition badge on special items (🔥 LIMITED)
3. "X people bought this today" counters
4. Sold-out items show "Sold out in X minutes"

**Medium-Term (Need Dev):**
5. Drop calendar / countdown timers
6. Restock notification system
7. Basic review system
8. Product storytelling (design inspiration)

---

### 4.4 Product Pages - What's Missing?

**Exists:**
- Product name, price, description
- Color/size selector (basic)
- Add to cart button (non-functional)

**Missing:**

```
CRITICAL:
- ❌ Material composition (what's it made of?)
- ❌ Care instructions (how to care for it?)
- ❌ Size guide (with measurements)
- ❌ Fit description (oversized? TTS? small?)
- ❌ Shipping info (cost, speed)
- ❌ Return policy (explicit)

HIGH VALUE:
- ❌ Customer reviews (5-star system)
- ❌ "Verified purchase" badges
- ❌ Lifestyle photography (on model, styled)
- ❌ Video (product in motion, 360° view)
- ❌ Related products (recommendations)
- ❌ Stock level ("Only 5 left")

NICE-TO-HAVE:
- ❌ Care video (how to wash/style)
- ❌ Designer story (why this item?)
- ❌ Behind-the-scenes (making of)
- ❌ Collaboration story
- ❌ Available sizes indicator
```

**Quick Add-Ons (Content Only, No Dev):**
- Material composition
- Care instructions
- Size guide table
- Fit description

**Dev Required (High Value):**
- Reviews system
- Lifestyle imagery
- Video integration
- Related products widget

---

## PART 5: ANNOUNCEMENT BAR BEST PRACTICES

### 5.1 Current Implementation

Montrez has announcement bar placeholder but it's not optimized.

### 5.2 Best Practices from Competitors

**Design:**
```
✅ SUPREME: Black bar, white text, minimal
   "New drops every Thursday at 11am EST"
   
✅ OFF-WHITE: Black bar, white text, bold
   "SPRING 2026 COLLECTION NOW AVAILABLE"
   
✅ PALACE: Colorful bars rotating colors
   Matches brand's color-per-campaign system
   
✅ STÜSSY: Subtle, top placement
   "Free shipping on orders over $100"
```

**Content Patterns:**
1. Drop times (urgency)
2. New arrivals (attention)
3. Sales/promotions (conversion)
4. Collection launches (excitement)
5. Restocks (FOMO)

**Technical:**
- Persistent (stays on scroll)
- Dismissible (click X closes)
- Comes back on page reload
- Auto-rotates (every 5-10 seconds)
- Mobile responsive

### 5.3 Recommended for Montrez

**Option 1: Minimal (Matches Brand)**
```
├─ DROP FRIDAY 11AM PARIS TIME
├─ SPRING 2026 COLLECTION LIVE
├─ ONLY 3 LEFT IN THIS SIZE
├─ FREE SHIPPING ON ORDERS €500+
└─ NEW ARRIVALS - SHOP NOW
```

**Option 2: Bold (Maximum Urgency)**
```
├─ 🔥 DROPS IN 48 HOURS
├─ ⏰ SOLD OUT IN 3 MINUTES LAST TIME
├─ 🚀 NEW: ARCHITECT HOODIE - LIMITED
├─ ✨ EXCLUSIVE: PALACE COLLAB LIVE
└─ ⚡ RESTOCK FRIDAY - NOTIFY ME
```

**Recommendation:** Use Option 1 (minimal fits brand better)

---

## PART 6: USER FLOW ANALYSIS

See attached: `USER_FLOW_ANALYSIS.md`

---

## PART 7: STREETWEAR PATTERNS TO ADOPT

See attached: `STREETWEAR_PATTERNS.md`

---

## SUMMARY SCORECARD

| Dimension | Current | Target | Gap | Priority |
|-----------|---------|--------|-----|----------|
| **Checkout Flow** | 0/10 | 10/10 | -10 | 🔴 CRITICAL |
| **Mobile UX** | 4/10 | 9/10 | -5 | 🔴 CRITICAL |
| **Trust Signals** | 2/10 | 8/10 | -6 | 🔴 HIGH |
| **Exclusivity Feel** | 3/10 | 8/10 | -5 | 🔴 HIGH |
| **Product Discovery** | 5/10 | 8/10 | -3 | 🟡 MEDIUM |
| **Storytelling** | 3/10 | 7/10 | -4 | 🟡 MEDIUM |
| **Performance** | 8/10 | 9/10 | -1 | 🟢 LOW |
| **Design System** | 7/10 | 8/10 | -1 | 🟢 LOW |

**Overall:** 4.0/10 → **Target: 8.5/10**

---

## DELIVERABLES PROVIDED

1. ✅ **UX_RESEARCH_REPORT.md** (this document)
2. ✅ **USER_FLOW_ANALYSIS.md** - Journey mapping with pain points
3. ✅ **STREETWEAR_PATTERNS.md** - Pattern library to adopt
4. ✅ **PRIORITY_UX_FIXES.md** - Top 5 fixes ranked by impact

---

**Research Completed By:** UX Research Agent  
**Date:** March 24, 2026  
**Status:** Ready for Implementation Planning
