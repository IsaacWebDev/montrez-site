# MONTREZ Popups - Quick Start

## ⚡ 5-Minute Setup

### 1. Create Database Table (Supabase)

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  source TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at);
```

**How to run:**
1. Open Supabase Dashboard
2. Go to SQL Editor
3. Paste the code above
4. Click "Run"

### 2. Test Locally

```bash
cd C:\Users\isaac\.openclaw\workspace\montrez-site
npm run dev
```

**Then:**
1. Open http://localhost:5173
2. Click "ENTER" → complete access gate → watch video
3. Wait 15 seconds → signup popup appears
4. Test form submission

### 3. Deploy

```bash
git add .
git commit -m "Add signup popup and redesigned access gate"
git push
```

---

## 🎯 What Was Built

### Popup #1: SignupPopup
- Appears 15s after landing on homepage
- Captures email + name
- "GET 15% OFF" offer
- Dark design (#0D0D0D)
- Success confirmation

### Popup #2: AccessGate
- Dark card on cream background
- Two options: Password OR Instagram
- Cleaner UX than old modal
- Password validation + error handling

---

## 📁 Files Created

```
montrez-site/
├── src/
│   ├── components/
│   │   ├── SignupPopup.jsx          ← NEW
│   │   └── AccessGate.jsx           ← NEW
│   └── styles/
│       ├── SignupPopup.css          ← NEW
│       └── AccessGate.css           ← NEW
├── api/
│   └── newsletter-signup.js         ← NEW
└── [Documentation files]
```

---

## ⚙️ Configuration

### Change Popup Timing
**File:** `src/components/SignupPopup.jsx`  
**Line:** 15

```jsx
setTimeout(() => {
  setIsVisible(true)
}, 15000) // Change to X seconds * 1000
```

### Change Instagram URL
**File:** `src/components/AccessGate.jsx`  
**Line:** 80

```jsx
<a href="https://instagram.com/YOUR_HANDLE" ...>
```

### Change Offer Text
**File:** `src/components/SignupPopup.jsx`  
**Lines:** 57-58

```jsx
<h2>YOUR CUSTOM HEADLINE</h2>
<p>Your custom subtext</p>
```

---

## 🧪 Testing Checklist

- [ ] Supabase table created
- [ ] Dev server running
- [ ] Signup popup appears after 15s
- [ ] Form submission works
- [ ] Access gate displays correctly
- [ ] Password option expands/collapses
- [ ] Instagram link opens
- [ ] Mobile responsive (test on phone or DevTools)

---

## 🚨 Troubleshooting

### Popup doesn't appear
```javascript
// Clear session storage
sessionStorage.clear()
// Refresh page
location.reload()
```

### API error (500)
- Check Supabase table exists
- Verify `.env` has correct credentials
- Check console for error details

### Instagram link wrong
- Update URL in `AccessGate.jsx` line 80

---

## 📊 Monitor Signups

**Supabase Dashboard:**
1. Go to Table Editor
2. Select `leads` table
3. View new signups in real-time

**SQL Query:**
```sql
SELECT * FROM leads 
WHERE source = 'homepage-popup' 
ORDER BY created_at DESC;
```

---

## 🎨 Customization Examples

### Change Popup Colors
**File:** `src/styles/SignupPopup.css`

```css
.signup-popup-modal {
  background: #FFFFFF; /* White instead of black */
}

.signup-popup-submit {
  background: #000000; /* Black instead of white */
  color: #FFFFFF;
}
```

### Disable Popup (Emergency)
**File:** `src/App.jsx`

```jsx
{/* <SignupPopup /> */} {/* Comment out */}
```

### Change Session Storage Behavior
**Use localStorage for persistent tracking:**

```jsx
// src/components/SignupPopup.jsx
if (localStorage.getItem('signup-popup-shown')) return

localStorage.setItem('signup-popup-shown', 'true')
```

---

## 📧 Email Integration (Optional)

### Using Resend

```bash
npm install resend
```

**File:** `api/newsletter-signup.js`

```javascript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// After successful signup:
await resend.emails.send({
  from: 'MONTREZ <hello@montrez.co.za>',
  to: email,
  subject: 'Welcome to MONTREZ - 15% Off',
  html: `
    <h1>Welcome, ${fullName}!</h1>
    <p>Use code <strong>WELCOME15</strong> at checkout</p>
  `
})
```

**Add to `.env`:**
```
RESEND_API_KEY=your_key_here
```

---

## 🚀 Go Live Checklist

- [ ] Test on staging environment
- [ ] Client approves timing (15s)
- [ ] Client approves offer text
- [ ] Supabase production table created
- [ ] Instagram URL is correct
- [ ] Mobile tested on real device
- [ ] Email service configured (optional)
- [ ] Discount code system ready (optional)
- [ ] Analytics tracking added (optional)

---

## 📞 Support

**Common Files to Check:**
- Popup logic: `src/components/SignupPopup.jsx`
- Popup styling: `src/styles/SignupPopup.css`
- Access gate: `src/components/AccessGate.jsx`
- API: `api/newsletter-signup.js`
- Integration: `src/App.jsx`

**Documentation:**
- Full guide: `POPUPS_IMPLEMENTATION.md`
- Visual specs: `POPUPS_VISUAL_REFERENCE.md`
- Testing: `TEST_POPUPS.md`
- Completion report: `POPUPS_COMPLETION_REPORT.md`

---

**Status:** ✅ Ready for demo  
**Time to deploy:** < 5 minutes  
**Client impact:** High (lead capture + improved UX)
