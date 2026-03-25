# Testing Guide: MONTREZ Popups

## Quick Test (5 minutes)

### 1. Start Development Server
```bash
cd C:\Users\isaac\.openclaw\workspace\montrez-site
npm run dev
```

### 2. Test SignupPopup
1. Open http://localhost:5173
2. Click "ENTER" → complete access gate → watch video
3. **Wait 15 seconds** on homepage
4. Popup should appear with "GET 15% OFF"
5. Test:
   - [ ] Enter invalid email → should show validation error
   - [ ] Enter valid email + name → click "SIGN UP"
   - [ ] Success message appears
   - [ ] Popup closes after 2 seconds
   - [ ] Refresh page → popup should NOT appear again (session storage)
6. Open new incognito window → popup should appear again after 15s

### 3. Test AccessGate
1. Clear session storage (F12 → Application → Session Storage → Clear)
2. Refresh page
3. Click "ENTER" on landing page
4. AccessGate appears with cream background
5. Test **Password Option:**
   - [ ] Click "Returning User"
   - [ ] Password input expands
   - [ ] Input is auto-focused
   - [ ] Enter wrong password → shake animation + error
   - [ ] Enter correct password → proceeds to video
   - [ ] Click "Cancel" → input collapses
6. Test **Instagram Option:**
   - [ ] Click "New User"
   - [ ] Instagram opens in new tab
   - [ ] Link is correct (https://instagram.com/montrez)

### 4. Test Mobile View
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select iPhone/Android
4. Test both popups:
   - [ ] SignupPopup is responsive (95% width)
   - [ ] AccessGate is responsive (95% width)
   - [ ] Text is readable
   - [ ] Buttons are tappable (not too small)
   - [ ] Forms work on mobile

### 5. Test Backend API
```bash
# Test newsletter signup
curl -X POST http://localhost:5173/api/newsletter-signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","fullName":"Test User","source":"test"}'

# Should return success or error
```

---

## Detailed Testing Checklist

### SignupPopup Component

#### Functionality
- [ ] Popup appears after 15 seconds
- [ ] Popup only shows once per session
- [ ] sessionStorage key set correctly
- [ ] Email field validates format
- [ ] Full name field is required
- [ ] Submit button disabled during submission
- [ ] Success state displays correctly
- [ ] Popup auto-closes after success
- [ ] Close button (×) works
- [ ] Clicking overlay closes popup
- [ ] Form doesn't submit on overlay click

#### Styling
- [ ] Modal width is 500px (desktop)
- [ ] Modal width is 95% (mobile)
- [ ] Background is #0D0D0D
- [ ] Overlay is semi-transparent + blurred
- [ ] Headline is white, uppercase
- [ ] Subtext is gray (#B0B0B0)
- [ ] Inputs have dark background (#1A1A1A)
- [ ] Submit button is white with black text
- [ ] Close (×) is white, gray on hover
- [ ] Success icon animates in

#### Animations
- [ ] Overlay fades in (0.3s)
- [ ] Modal slides up (0.4s)
- [ ] Close (×) rotates on hover
- [ ] Submit button lifts on hover
- [ ] Success icon scales in

#### Accessibility
- [ ] Close button has aria-label
- [ ] Form inputs have proper labels/placeholders
- [ ] Tab navigation works
- [ ] Enter key submits form
- [ ] Escape key closes popup (if implemented)
- [ ] Reduced motion respected

### AccessGate Component

#### Functionality
- [ ] Gate appears with cream background
- [ ] Logo renders correctly
- [ ] Subtitle shows "ACCESS REQUIRED"
- [ ] Both options visible initially
- [ ] "Returning User" expands on click
- [ ] Password input auto-focuses
- [ ] "Enter" button submits form
- [ ] "Cancel" button collapses input
- [ ] Wrong password triggers shake + error
- [ ] Correct password calls onSuccess
- [ ] Instagram link opens in new tab
- [ ] Instagram URL is correct

#### Styling
- [ ] Card width is 480px (desktop)
- [ ] Card background is #0D0D0D
- [ ] Page background is #F2EDE6 (cream)
- [ ] Logo is Playfair Display font
- [ ] Subtitle is uppercase, letter-spaced
- [ ] Options have #1A1A1A background
- [ ] Options lighten on hover (#222)
- [ ] Divider shows "OR" centered
- [ ] Password input has dark background
- [ ] Enter button is white on black
- [ ] Cancel button has gray text + border

#### Animations
- [ ] Gate fades in (0.6s)
- [ ] Options transition smoothly
- [ ] Password form slides down (0.3s)
- [ ] Input shakes on error
- [ ] Enter button lifts on hover

#### Accessibility
- [ ] Logo is semantic <h1>
- [ ] Options have proper headings
- [ ] Instagram link has rel="noopener noreferrer"
- [ ] Tab navigation works
- [ ] Enter key submits password form
- [ ] Reduced motion respected

### API Endpoint (/api/newsletter-signup)

#### Request Validation
- [ ] Rejects non-POST requests (405)
- [ ] Requires email and fullName (400)
- [ ] Validates email format (400)
- [ ] Accepts optional source parameter

#### Database Operations
- [ ] Creates new lead in Supabase
- [ ] Checks for duplicate emails
- [ ] Updates existing leads
- [ ] Stores email lowercase
- [ ] Sets tags: ['newsletter-signup']
- [ ] Sets created_at timestamp

#### Response
- [ ] Returns 200 on success
- [ ] Returns success message
- [ ] Returns lead data (id, email, etc.)
- [ ] Returns 500 on error
- [ ] Logs errors to console

### Integration (App.jsx)

#### Flow
- [ ] Landing page → Access gate transition works
- [ ] Access gate → Video intro transition works
- [ ] Video intro → Main site transition works
- [ ] SignupPopup appears on main site stage
- [ ] Session storage prevents repeated flows

#### Component Loading
- [ ] SignupPopup imports correctly
- [ ] AccessGate imports correctly
- [ ] Old PasswordEmailModal removed
- [ ] No console errors
- [ ] No React warnings

---

## Browser Testing Matrix

### Desktop
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Safari (latest) - Mac only

### Mobile
- [ ] iOS Safari (iPhone)
- [ ] Chrome Mobile (Android)
- [ ] Firefox Mobile (Android)

### Screen Sizes
- [ ] Desktop: 1920×1080
- [ ] Laptop: 1366×768
- [ ] Tablet: 768×1024
- [ ] Mobile: 375×667 (iPhone SE)
- [ ] Mobile: 414×896 (iPhone 11)

---

## Performance Testing

### SignupPopup
```javascript
// Measure popup render time
performance.mark('popup-start')
// ... popup renders ...
performance.mark('popup-end')
performance.measure('popup-render', 'popup-start', 'popup-end')
console.log(performance.getEntriesByName('popup-render'))

// Should be < 100ms
```

### Network
- [ ] API call completes in < 500ms
- [ ] No unnecessary re-renders
- [ ] CSS loads properly
- [ ] No CORS errors

### Memory
- [ ] No memory leaks
- [ ] Event listeners cleaned up
- [ ] Timers cleared on unmount

---

## Edge Cases

### SignupPopup
- [ ] What if user submits same email twice?
  - Should update existing lead, not error
- [ ] What if API is down?
  - Should show error, allow retry
- [ ] What if user closes popup mid-submit?
  - Should not show popup again (sessionStorage set)
- [ ] What if email has uppercase letters?
  - Should convert to lowercase
- [ ] What if fullName has special characters?
  - Should accept and store properly

### AccessGate
- [ ] What if password API is slow?
  - Should show "Verifying..." state
- [ ] What if user clicks password option twice?
  - Should not expand twice
- [ ] What if user spams Enter button?
  - Should disable during submission
- [ ] What if Instagram link is dead?
  - Should still open (user sees 404)
- [ ] What if user has no internet?
  - Should show network error

---

## Known Issues & Workarounds

### Issue: Popup appears too quickly in dev
**Cause:** Hot reload resets timer  
**Workaround:** Hard refresh (Ctrl+Shift+R) to test properly

### Issue: Session storage persists across tabs
**Expected behavior:** Each tab has independent session  
**Note:** This is correct - user needs fresh incognito for new session

### Issue: Password shake animation doesn't work
**Check:** Make sure `shake` class is in CSS  
**Check:** Verify `inputRef.current` exists before adding class

---

## Debug Mode

Add this to SignupPopup for faster testing:

```jsx
// TEMPORARY: Show immediately (remove for production)
setTimeout(() => {
  setIsVisible(true)
  sessionStorage.setItem('signup-popup-shown', 'true')
}, 1000) // 1 second instead of 15
```

Add this to AccessGate for API debugging:

```jsx
console.log('Password submitted:', password)
console.log('API response:', data)
console.log('Error:', err)
```

---

## Production Checklist

Before deploying to production:

- [ ] Remove debug console.logs
- [ ] Verify 15-second delay is correct
- [ ] Test on real Instagram account
- [ ] Verify Supabase connection works
- [ ] Check environment variables set
- [ ] Test email integration (if enabled)
- [ ] Verify discount code is valid
- [ ] Run Lighthouse audit (performance)
- [ ] Test with real client email
- [ ] Get client approval on timing
- [ ] Monitor first 24h for issues

---

## Rollback Plan

If something breaks in production:

1. **Quick Fix:** Disable popups
   ```jsx
   // In App.jsx, comment out:
   // <SignupPopup />
   ```

2. **Revert Access Gate:** 
   ```jsx
   // Replace AccessGate with old PasswordEmailModal
   import PasswordEmailModal from './components/PasswordEmailModal'
   ```

3. **Database Issues:**
   - Check Supabase logs
   - Verify table exists
   - Check API keys

4. **Full Rollback:**
   ```bash
   git revert HEAD
   git push
   ```

---

**Testing Status:** 🟡 Pending  
**Estimated Test Time:** 15-20 minutes  
**Priority:** High (client demo)
