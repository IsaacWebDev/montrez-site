# MONTREZ Popups - Visual Reference

## Popup #1: SignupPopup (Newsletter Capture)

### Layout Structure
```
╔════════════════════════════════════════╗
║  [Overlay: Dark blur background]      ║
║                                        ║
║   ┌──────────────────────────────┐    ║
║   │ [Modal: Dark card]        ×  │    ║
║   │                              │    ║
║   │  GET 15% OFF YOUR FIRST ORDER│    ║
║   │                              │    ║
║   │  Sign up for exclusive access│    ║
║   │  and early product drops     │    ║
║   │                              │    ║
║   │  ┌────────────────────────┐  │    ║
║   │  │ Email address          │  │    ║
║   │  └────────────────────────┘  │    ║
║   │                              │    ║
║   │  ┌────────────────────────┐  │    ║
║   │  │ Full name              │  │    ║
║   │  └────────────────────────┘  │    ║
║   │                              │    ║
║   │  ┌────────────────────────┐  │    ║
║   │  │      SIGN UP           │  │    ║
║   │  └────────────────────────┘  │    ║
║   └──────────────────────────────┘    ║
╚════════════════════════════════════════╝
```

### Color Palette
```
Overlay:     rgba(0, 0, 0, 0.6) + blur(4px)
Modal BG:    #0D0D0D (near-black)
Headline:    #FFFFFF (white)
Subtext:     #B0B0B0 (gray)
Input BG:    #1A1A1A
Input Border:#2A2A2A → #FFFFFF (focus)
Button BG:   #FFFFFF (white)
Button Text: #000000 (black)
Close (X):   #FFFFFF → #888 (hover)
```

### Typography
```
Headline:  1.75rem, 600 weight, 0.05em spacing
Subtext:   0.95rem, #B0B0B0
Inputs:    1rem, Inter font
Button:    1rem, 600 weight, uppercase
```

### Timing
- **Appears:** 15 seconds after landing on homepage
- **Shows:** Once per session (sessionStorage)
- **Success:** Displays for 2 seconds, then closes

---

## Popup #2: AccessGate (Redesigned)

### Layout Structure
```
╔════════════════════════════════════════╗
║  [Background: Cream #F2EDE6]           ║
║                                        ║
║        ┌──────────────────┐            ║
║        │   [Dark Card]    │            ║
║        │                  │            ║
║        │    MONTREZ       │            ║
║        │ ACCESS REQUIRED  │            ║
║        │                  │            ║
║        │ ┌──────────────┐ │            ║
║        │ │Returning User│ │            ║
║        │ │Enter password│ │            ║
║        │ │  [expandable]│ │            ║
║        │ └──────────────┘ │            ║
║        │                  │            ║
║        │ ──────OR──────   │            ║
║        │                  │            ║
║        │ ┌──────────────┐ │            ║
║        │ │  New User    │ │            ║
║        │ │Get access via│ │            ║
║        │ │  Instagram   │→│            ║
║        │ └──────────────┘ │            ║
║        │                  │            ║
║        └──────────────────┘            ║
╚════════════════════════════════════════╝
```

### Expanded Password State
```
║        │ ┌──────────────────────┐ │
║        │ │ Returning User       │ │
║        │ │ Enter password       │ │
║        │ │                      │ │
║        │ │ ┌──────────────────┐ │ │
║        │ │ │ Enter password   │ │ │
║        │ │ └──────────────────┘ │ │
║        │ │                      │ │
║        │ │ [Enter]  [Cancel]    │ │
║        │ └──────────────────────┘ │
```

### Color Palette
```
Page BG:       #F2EDE6 (cream)
Card BG:       #0D0D0D (near-black)
Logo:          #FFFFFF (white)
Subtitle:      #888 (gray)
Option BG:     #1A1A1A → #222 (hover)
Option Border: transparent → #333 (hover)
Option Title:  #FFFFFF
Option Desc:   #888
Divider:       #333
Input BG:      #0D0D0D
Input Border:  #333 → #FFFFFF (focus)
Button (Enter):#FFFFFF text on black
Button (Cancel):#888 text, #333 border
Instagram Icon:#888 → #FFFFFF (hover)
```

### Typography
```
Logo:         3rem, Playfair Display, 0.4em spacing
Subtitle:     0.875rem, 0.3em spacing, uppercase
Option Title: 1.125rem, 600 weight
Option Desc:  0.875rem, #888
Input:        1rem, Inter font
Buttons:      0.875rem, 600 weight, uppercase
```

### Interactive States
1. **Initial:** Both options visible, collapsed
2. **Hover:** Option background lightens (#1A1A1A → #222)
3. **Clicked (Password):** 
   - Option expands
   - Input field appears
   - Auto-focus on input
   - Enter/Cancel buttons show
4. **Clicked (Instagram):** 
   - Opens Instagram in new tab
   - User returns with access code
5. **Error:** 
   - Red border on input
   - Shake animation
   - Error message below input

---

## Comparison: Old vs New

### Old PasswordEmailModal
❌ Complex multi-step flow  
❌ Email verification required  
❌ Framer Motion dependency  
❌ 4 different modes (choice → password → email → verify-code)  
❌ Heavier component (~300+ lines)  

### New AccessGate
✅ Simple 2-option choice  
✅ Direct password entry OR Instagram link  
✅ No external animation libraries  
✅ Cleaner UX (password → success, 2 steps max)  
✅ Lighter component (~150 lines)  

---

## User Flows

### Signup Popup Flow
```
User lands on homepage
         ↓
Waits 15 seconds
         ↓
Popup appears
         ↓
User enters email + name
         ↓
Clicks "SIGN UP"
         ↓
Success message shows
         ↓
Popup closes after 2s
         ↓
Lead saved to database
```

### Access Gate Flow (Password)
```
User clicks "ENTER" on landing
         ↓
Access gate appears
         ↓
Clicks "Returning User"
         ↓
Password input expands
         ↓
Types password → clicks "Enter"
         ↓
Validates via API
         ↓
Success → Video intro plays
```

### Access Gate Flow (Instagram)
```
User clicks "ENTER" on landing
         ↓
Access gate appears
         ↓
Clicks "New User"
         ↓
Instagram opens (new tab)
         ↓
Gets access code from DM/bio
         ↓
Returns to site
         ↓
Uses "Returning User" option
         ↓
Enters code → proceeds
```

---

## Responsive Breakpoints

### Desktop (> 640px)
- SignupPopup: 500px width
- AccessGate: 480px width
- Full padding and spacing

### Mobile (≤ 640px)
- SignupPopup: 95% width
- AccessGate: 95% width
- Reduced font sizes
- Tighter padding
- Smaller logo on AccessGate

---

## Animation Details

### SignupPopup
```css
Overlay:    fadeIn 0.3s
Modal:      slideUp 0.4s (from 30px below)
Close (×):  rotate 90deg on hover
Button:     translateY(-2px) on hover
Success:    scaleIn 0.5s (from 0.5 scale)
```

### AccessGate
```css
Gate:        opacity 0 → 1 (0.6s)
Option:      background transition (0.3s)
Input:       slideDown 0.3s
Error:       shake 0.5s (±5px horizontal)
Submit:      translateY(-2px) on hover
```

---

## Session Storage Keys

### SignupPopup
```javascript
sessionStorage.getItem('signup-popup-shown')
// Value: 'true' (set when popup first appears)
```

### App (Entrance)
```javascript
sessionStorage.getItem('montrez-entrance-complete')
// Value: 'true' (set after video completes)
```

### AccessGate (Token)
```javascript
sessionStorage.getItem('montrez_access_token')
// Value: JWT token from API (if password correct)
```

---

## API Endpoints

### POST /api/newsletter-signup
**Request:**
```json
{
  "email": "user@example.com",
  "fullName": "John Doe",
  "source": "homepage-popup"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Successfully signed up",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "created_at": "2026-03-25T12:30:00Z"
  }
}
```

**Response (Existing):**
```json
{
  "success": true,
  "message": "Already subscribed",
  "existing": true
}
```

### POST /api/verify-password
**Request:**
```json
{
  "password": "secret123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "token": "jwt_token_here"
}
```

**Response (Error):**
```json
{
  "error": "Incorrect password"
}
```

---

## File Sizes (Estimated)

### Components
- `SignupPopup.jsx`: ~4KB
- `SignupPopup.css`: ~4KB
- `AccessGate.jsx`: ~5KB
- `AccessGate.css`: ~5KB

### Total Addition
~18KB (minified/gzipped: ~5-6KB)

---

**Built:** 2026-03-25  
**Status:** ✅ Production-ready  
**Client:** Montrez  
**Priority:** Critical (demo requirement)
