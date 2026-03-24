# STREETWEAR E-COMMERCE PATTERNS
**A Pattern Library for Montrez Based on Industry Leaders**

**Version:** 1.0 | **Date:** March 24, 2026

---

## INTRODUCTION

This document collects proven patterns from Supreme, Off-White, Palace, and Stüssy and provides concrete implementation guidance for Montrez.

---

## PATTERN 1: SCARCITY INDICATORS

### Why It Works

Streetwear buyers are conditioned to expect limited availability. Scarcity signals:
- Create urgency ("act now or it's gone")
- Prove demand ("others want this too")
- Justify premium pricing ("limited = valuable")
- Drive impulse buying (FOMO)

### Pattern: Stock Count Badge

**Where:** Product card, product detail page

**Design:**

```html
<!-- When Stock > 10 -->
<div class="stock-badge">IN STOCK</div>

<!-- When Stock 5-10 -->
<div class="stock-badge warning">
  🔥 ONLY {count} LEFT
</div>

<!-- When Stock < 5 -->
<div class="stock-badge critical">
  ⚠️ ONLY {count} LEFT - HURRY!
</div>

<!-- When Out of Stock -->
<div class="stock-badge sold-out">
  SOLD OUT
</div>
```

**Styling:**

```css
.stock-badge {
  display: inline-block;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 2px;
  letter-spacing: 0.1em;
}

.stock-badge {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.stock-badge.warning {
  background: rgba(255, 200, 0, 0.2);
  color: #FFD700;
}

.stock-badge.critical {
  background: rgba(255, 0, 0, 0.2);
  color: #FF6B6B;
  animation: pulse 1.5s infinite;
}

.stock-badge.sold-out {
  background: rgba(128, 128, 128, 0.3);
  color: #999;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
```

**React Implementation:**

```jsx
export function StockBadge({ count, totalCount = 100 }) {
  let badge = null;

  if (count === 0) {
    badge = { text: 'SOLD OUT', className: 'sold-out' };
  } else if (count < 5) {
    badge = { text: `⚠️ ONLY ${count} LEFT - HURRY!`, className: 'critical' };
  } else if (count < 10) {
    badge = { text: `🔥 ONLY ${count} LEFT`, className: 'warning' };
  } else {
    badge = { text: 'IN STOCK', className: '' };
  }

  return (
    <div className={`stock-badge ${badge.className}`}>
      {badge.text}
    </div>
  );
}
```

### When to Use

✅ **USE:**
- Product cards (grid)
- Product detail page (prominent)
- Cart items (so user knows their item is secured)
- Email notifications (when restocking)

❌ **AVOID:**
- Navbar/header (too much clutter)
- Footer (not important enough)
- Every variant (confusing, use for in-stock only)

### Example Implementations

**Supreme:** "In Stock" simple badge

**Off-White:** Stock count on product page ("Only 2 available")

**Palace:** Size-specific stock ("5 available in Medium")

**Stüssy:** Simple checkmark when in stock

---

## PATTERN 2: SOLD-OUT STORYTELLING

### Why It Works

Showing *when* items sold out creates narrative of demand. "Sold out in 3 minutes" = proof that customers want this. Builds confidence for next drop.

### Pattern: Sell-Out Time Display

**Where:** Sold-out product cards, product detail page

**Design:**

```html
<!-- When Recently Sold Out -->
<div class="sold-out-notice">
  <span class="icon">⏰</span>
  <span class="text">Sold out in 4 minutes</span>
  <button class="notify-btn">Notify me on restock</button>
</div>

<!-- When Sold Out (No Time Info) -->
<div class="sold-out-notice">
  <span class="icon">❌</span>
  <span class="text">Sold Out</span>
  <button class="notify-btn">Notify me on restock</button>
</div>

<!-- When Sold Out (Old Item) -->
<div class="sold-out-notice archived">
  <span class="icon">📦</span>
  <span class="text">Sold Out (Not Returning)</span>
  <span class="note">Check new arrivals</span>
</div>
```

**Styling:**

```css
.sold-out-notice {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(128, 128, 128, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  font-size: 14px;
  margin: 12px 0;
}

.sold-out-notice .icon {
  font-size: 20px;
}

.sold-out-notice .text {
  flex: 1;
  font-weight: 600;
}

.notify-btn {
  padding: 8px 16px;
  background: rgba(0, 240, 255, 0.2);
  border: 1px solid rgba(0, 240, 255, 0.5);
  color: #00F0FF;
  font-size: 12px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 200ms ease-out;
}

.notify-btn:hover {
  background: rgba(0, 240, 255, 0.3);
  border-color: #00F0FF;
}

.sold-out-notice.archived {
  opacity: 0.6;
}
```

**React Implementation:**

```jsx
export function SoldOutNotice({ soldOutTime, willRestock }) {
  function getTimeSinceEvent(timestamp) {
    const now = new Date();
    const sold = new Date(timestamp);
    const seconds = Math.floor((now - sold) / 1000);

    if (seconds < 60) return `${seconds} seconds`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`;
    return `${Math.floor(seconds / 86400)} days`;
  }

  const timeSince = getTimeSinceEvent(soldOutTime);

  return (
    <div className="sold-out-notice">
      <span className="icon">⏰</span>
      <span className="text">Sold out in {timeSince}</span>
      {willRestock && (
        <button className="notify-btn">Notify me on restock</button>
      )}
    </div>
  );
}
```

### When to Use

✅ **USE:**
- Sold-out product pages
- Grid (optional, for recently sold items)
- In-stock product pages (show time last sold out - proof of demand)

❌ **AVOID:**
- Every product (only use for compelling timing)
- Fake data (be honest about sell-out time)
- Old items (only show if <7 days)

### Example Implementations

**Supreme:** "Sold out in 3 minutes" prominently displayed

**Palace:** "Sold out 2 hours ago" with restock notification

**Off-White:** Less emphasis, but available when checking sold-out item

---

## PATTERN 3: DROP SCHEDULE & COUNTDOWN

### Why It Works

Published drop schedule:
- Creates anticipation (something to look forward to)
- Drives repeat visits (check when next drop is)
- Converts casual browsers to fans (builds community)
- Gives urgency (limited window to buy)

### Pattern: Drop Schedule Widget

**Where:** Homepage hero, announcement bar, shop page

**Design:**

```html
<!-- Announcement Bar Version -->
<div class="announcement-bar">
  <span>DROP FRIDAY 11AM PARIS TIME</span>
  <a href="/drops">See schedule →</a>
</div>

<!-- Homepage Widget -->
<div class="next-drop-widget">
  <h3>NEXT DROP</h3>
  <p>SPRING 2026 COLLECTION</p>
  <div class="countdown">
    <div class="count-item">
      <span class="number">2</span>
      <span class="label">DAYS</span>
    </div>
    <div class="count-item">
      <span class="number">14</span>
      <span class="label">HOURS</span>
    </div>
    <div class="count-item">
      <span class="number">32</span>
      <span class="label">MINUTES</span>
    </div>
  </div>
  <button class="cta-btn">SET REMINDER</button>
  <a href="/drops" class="schedule-link">View full schedule →</a>
</div>

<!-- Drop Schedule Page -->
<div class="drops-calendar">
  <h1>DROP SCHEDULE</h1>
  
  <div class="upcoming-drops">
    <div class="drop-card next">
      <span class="badge">NEXT</span>
      <h3>SPRING 2026 COLLECTION</h3>
      <p>Friday, March 28, 2026</p>
      <p class="time">11:00 AM PARIS TIME (10:00 AM UTC)</p>
      <div class="countdown"><!-- countdown timer --></div>
      <button>SET REMINDER</button>
    </div>

    <div class="drop-card">
      <h3>SUMMER DROP 01</h3>
      <p>Friday, April 4, 2026</p>
      <p class="time">11:00 AM PARIS TIME</p>
      <button>SET REMINDER</button>
    </div>

    <div class="drop-card">
      <h3>COLLAB: PALACE x MONTREZ</h3>
      <p>Friday, April 11, 2026</p>
      <p class="time">11:00 AM PARIS TIME</p>
      <button>SET REMINDER</button>
    </div>
  </div>
</div>
```

**Styling:**

```css
.next-drop-widget {
  background: linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(0, 0, 0, 0.5));
  border: 2px solid rgba(0, 240, 255, 0.3);
  padding: 32px;
  text-align: center;
  margin: 40px 0;
}

.next-drop-widget h3 {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #00F0FF;
  margin-bottom: 8px;
}

.next-drop-widget p {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
}

.countdown {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin: 32px 0;
}

.count-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.count-item .number {
  font-size: 48px;
  font-weight: bold;
  color: #00F0FF;
  line-height: 1;
}

.count-item .label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 8px;
}

.cta-btn {
  display: inline-block;
  padding: 16px 48px;
  background: #00F0FF;
  color: #000;
  border: none;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  margin-bottom: 16px;
  transition: all 200ms ease-out;
}

.cta-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
}

.schedule-link {
  display: inline-block;
  color: #00F0FF;
  text-decoration: none;
  font-size: 14px;
  transition: all 200ms ease-out;
}

.schedule-link:hover {
  text-decoration: underline;
}

/* Drop Schedule Page */
.drops-calendar {
  padding: 40px 20px;
}

.drop-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 24px;
  margin-bottom: 16px;
  border-radius: 2px;
  position: relative;
  transition: all 200ms ease-out;
}

.drop-card:hover {
  border-color: rgba(0, 240, 255, 0.5);
  background: rgba(0, 240, 255, 0.05);
}

.drop-card.next {
  border-color: #00F0FF;
  background: rgba(0, 240, 255, 0.1);
}

.drop-card .badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #00F0FF;
  color: #000;
  padding: 4px 12px;
  font-size: 10px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.1em;
}

@media (max-width: 768px) {
  .countdown {
    gap: 12px;
  }

  .count-item .number {
    font-size: 32px;
  }

  .count-item .label {
    font-size: 10px;
  }
}
```

**React Implementation:**

```jsx
export function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="countdown">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="count-item">
          <span className="number">{String(value).padStart(2, '0')}</span>
          <span className="label">{label.toUpperCase()}</span>
        </div>
      ))}
    </div>
  );
}

export function NextDropWidget() {
  const nextDrop = {
    name: 'SPRING 2026 COLLECTION',
    date: '2026-03-28T11:00:00+01:00', // Paris time
    timezone: 'PARIS TIME (10:00 AM UTC)',
  };

  return (
    <div className="next-drop-widget">
      <h3>NEXT DROP</h3>
      <p>{nextDrop.name}</p>
      <CountdownTimer targetDate={nextDrop.date} />
      <button className="cta-btn">SET REMINDER</button>
      <a href="/drops" className="schedule-link">View full schedule →</a>
    </div>
  );
}
```

### When to Use

✅ **USE:**
- Homepage hero area (must-have)
- Announcement bar rotation
- Shop page (above grid)
- Product pages (if drop is coming soon)

❌ **AVOID:**
- Overuse on every page (clutter)
- If no drops scheduled (don't speculate)
- Multiple countdowns (confusing)

### Example Implementations

**Supreme:** Classic "Drop Thursday 11am EST" announcement

**Off-White:** Seasonal drop announcements with countdown

**Palace:** Regular drop dates publicized on shop

**Stüssy:** Quarterly seasonal releases highlighted

---

## PATTERN 4: TRUST SIGNALS & SECURITY

### Why It Works

E-commerce requires trust. Streetwear is expensive. Buyers want assurance they're:
- Buying legitimate product
- Getting what they ordered
- Protected if something goes wrong

### Pattern: Trust Indicators

**Where:** Product detail page (top section), checkout page

**Design:**

```html
<!-- Product Detail Page -->
<div class="trust-indicators">
  <div class="trust-item">
    <span class="icon">✅</span>
    <div>
      <strong>AUTHENTIC GUARANTEED</strong>
      <p>All items 100% genuine. Legit-check program.</p>
    </div>
  </div>

  <div class="trust-item">
    <span class="icon">🔒</span>
    <div>
      <strong>SECURE CHECKOUT</strong>
      <p>SSL encrypted. Trusted payment processing.</p>
    </div>
  </div>

  <div class="trust-item">
    <span class="icon">↩️</span>
    <div>
      <strong>14-DAY RETURNS</strong>
      <p>Free returns within 14 days of delivery.</p>
    </div>
  </div>

  <div class="trust-item">
    <span class="icon">🚚</span>
    <div>
      <strong>FREE SHIPPING €500+</strong>
      <p>Express options available. Track your order.</p>
    </div>
  </div>
</div>

<!-- Checkout Page - Top -->
<div class="checkout-security">
  <span class="badge">🔒 SSL SECURE</span>
  <span class="badge">✅ VERIFIED</span>
</div>

<!-- Product Detail - Reviews Section -->
<div class="verified-badge">
  ✓ Verified Purchase
</div>
```

**Styling:**

```css
.trust-indicators {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin: 32px 0;
  padding: 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.trust-item {
  display: flex;
  gap: 12px;
}

.trust-item .icon {
  font-size: 24px;
  flex-shrink: 0;
}

.trust-item strong {
  display: block;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.trust-item p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

.verified-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #00F0FF;
  margin: 8px 0;
}

@media (max-width: 768px) {
  .trust-indicators {
    grid-template-columns: 1fr;
  }
}
```

### When to Use

✅ **USE:**
- Product detail page (high-visibility)
- Checkout page (build confidence before payment)
- FAQ page (answer common concerns)
- Return policy page

❌ **AVOID:**
- Every section (clutter)
- If indicators aren't true (be honest)
- Product cards (not enough space)

### Example Implementations

**Off-White:** Security badges + return policy details

**Supreme:** Authentication + return window clearly stated

**Stüssy:** Trust icons near checkout CTA

---

## PATTERN 5: SOCIAL PROOF (Reviews)

### Why It Works

Customer reviews = external validation. Converts 10-25% better. Shows real people bought and liked it.

### Pattern: Review Section

**Design:**

```html
<!-- Rating Summary -->
<div class="reviews-summary">
  <div class="rating-average">
    <span class="value">4.8</span>
    <div class="stars">⭐⭐⭐⭐⭐</div>
    <span class="count">142 reviews</span>
  </div>

  <div class="rating-breakdown">
    <div class="rating-row">
      <span>⭐⭐⭐⭐⭐</span>
      <div class="bar"></div>
      <span class="pct">87%</span>
    </div>
    <div class="rating-row">
      <span>⭐⭐⭐⭐</span>
      <div class="bar"></div>
      <span class="pct">10%</span>
    </div>
    <div class="rating-row">
      <span>⭐⭐⭐</span>
      <div class="bar"></div>
      <span class="pct">2%</span>
    </div>
    <div class="rating-row">
      <span>⭐⭐</span>
      <div class="bar"></div>
      <span class="pct">1%</span>
    </div>
    <div class="rating-row">
      <span>⭐</span>
      <div class="bar"></div>
      <span class="pct">0%</span>
    </div>
  </div>
</div>

<!-- Individual Reviews -->
<div class="reviews-list">
  <div class="review-card">
    <div class="review-header">
      <span class="author">Alex M.</span>
      <span class="verified">✓ Verified Purchase</span>
    </div>
    
    <div class="rating">⭐⭐⭐⭐⭐</div>
    
    <h4 class="review-title">Incredible quality. Exactly as described.</h4>
    
    <p class="review-text">
      This hoodie is amazing. The material is premium, the fit is perfect, and 
      it arrived faster than expected. Definitely buying more from Montrez.
    </p>
    
    <div class="review-image">
      <img src="/user-review-photo.jpg" alt="Customer wearing product" />
    </div>
    
    <div class="review-footer">
      <span class="date">2 weeks ago</span>
      <button class="helpful-btn">👍 Helpful (23)</button>
    </div>
  </div>
</div>
```

**Styling:**

```css
.reviews-summary {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 32px;
  margin: 32px 0;
  padding: 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.rating-average {
  text-align: center;
}

.rating-average .value {
  display: block;
  font-size: 48px;
  font-weight: bold;
  color: #00F0FF;
}

.rating-average .stars {
  display: block;
  font-size: 24px;
  margin: 8px 0;
}

.rating-average .count {
  display: block;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.rating-breakdown {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.rating-row .bar {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.rating-row .bar::before {
  content: '';
  display: block;
  height: 100%;
  background: #00F0FF;
}

.review-card {
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 16px;
  border-radius: 2px;
}

.review-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.review-header .author {
  font-weight: bold;
}

.review-header .verified {
  font-size: 12px;
  color: #00F0FF;
}

.rating {
  font-size: 16px;
  margin-bottom: 8px;
}

.review-title {
  font-size: 16px;
  font-weight: 600;
  margin: 8px 0;
}

.review-text {
  font-size: 14px;
  line-height: 1.6;
  margin: 12px 0;
  color: rgba(255, 255, 255, 0.9);
}

.review-image {
  margin: 16px 0;
}

.review-image img {
  max-width: 300px;
  border-radius: 2px;
}

.review-footer {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 12px;
}

.helpful-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
  padding: 4px 12px;
  cursor: pointer;
  border-radius: 2px;
  transition: all 200ms ease-out;
}

.helpful-btn:hover {
  border-color: #00F0FF;
  color: #00F0FF;
}

@media (max-width: 768px) {
  .reviews-summary {
    grid-template-columns: 1fr;
  }

  .review-image img {
    max-width: 100%;
  }
}
```

### Implementation Notes

- Store reviews in database
- Show recent reviews first
- Allow filtering by rating
- Require verified purchase badge
- Moderate offensive reviews
- Respond to negative reviews

---

## PATTERN 6: ANNOUNCEMENT BAR (ROTATING)

### Why It Works

Drives urgency, announces drops/sales, always visible. Industry standard.

### Pattern: Sticky Announcement Bar

**Design:**

```html
<div class="announcement-bar" id="announcementBar">
  <div class="announcement-content">
    <span id="announcementText">DROP FRIDAY 11AM PARIS TIME</span>
    <a href="/drops">See schedule →</a>
  </div>
  <button class="close-btn" onclick="closeAnnouncement()">✕</button>
</div>
```

**Styling:**

```css
.announcement-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 240, 255, 0.1);
  border-bottom: 1px solid rgba(0, 240, 255, 0.3);
  padding: 12px 20px;
  text-align: center;
  z-index: 100;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.announcement-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.announcement-content a {
  color: #00F0FF;
  text-decoration: none;
  font-weight: bold;
  transition: all 200ms ease-out;
}

.announcement-content a:hover {
  text-decoration: underline;
}

.close-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 200ms ease-out;
}

.close-btn:hover {
  color: #fff;
}

/* Adjust navbar top when announcement visible */
.navbar {
  margin-top: 44px; /* height of announcement bar */
}

@media (max-width: 768px) {
  .announcement-bar {
    flex-direction: column;
    padding: 12px 16px;
  }

  .announcement-content {
    flex-direction: column;
  }

  .navbar {
    margin-top: 56px; /* taller on mobile */
  }
}
```

**React Implementation:**

```jsx
export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    { text: 'DROP FRIDAY 11AM PARIS TIME', link: '/drops' },
    { text: 'FREE SHIPPING ON ORDERS €500+', link: '/shop' },
    { text: 'NEW ARRIVALS - SHOP NOW', link: '/shop?new=true' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 8000); // Rotate every 8 seconds

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const { text, link } = messages[messageIndex];

  return (
    <div className="announcement-bar">
      <div className="announcement-content">
        <span>{text}</span>
        <a href={link}>See more →</a>
      </div>
      <button
        className="close-btn"
        onClick={() => setIsVisible(false)}
        aria-label="Close announcement"
      >
        ✕
      </button>
    </div>