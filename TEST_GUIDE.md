# Testing Guide - Montrez Site Fixes

## Quick Start
```bash
cd C:\Users\isaac\.openclaw\workspace\montrez-site
npm run dev
```
Then open: http://localhost:3000

---

## 🧪 Test Scenarios

### Test 1: Admin Panel Access (CRITICAL)
**Goal:** Verify admin panel is accessible without video overlay

**Steps:**
1. Open http://localhost:3000/admin
2. ✅ Admin page should load immediately
3. ✅ NO black screen
4. ✅ NO video overlay
5. ✅ White background visible
6. ✅ Admin interface fully functional

**Expected:** Direct access to admin panel without any video interference

---

### Test 2: First-Time Homepage Visit
**Goal:** Verify video intro works for new users

**Steps:**
1. Clear sessionStorage: `sessionStorage.clear()`
2. Navigate to http://localhost:3000
3. ✅ Video intro plays automatically
4. ⏱️ Wait 2 seconds
5. ✅ Skip button appears
6. Click "Skip" or wait for video to end
7. ✅ Homepage content appears

**Expected:** 
- Video plays smoothly
- Skip button after 2 seconds
- Smooth transition to homepage

---

### Test 3: Returning User (Instant Skip)
**Goal:** Verify instant skip for returning users

**Steps:**
1. Visit homepage (video intro completes)
2. Navigate away: http://localhost:3000/admin
3. Return to homepage: http://localhost:3000
4. ✅ Skip button appears IMMEDIATELY (0 seconds)
5. ✅ No 2-second wait

**Expected:** 
- Skip button visible on load
- Can skip instantly

---

### Test 4: Video Timeout
**Goal:** Verify 3-second timeout prevents stuck screens

**Steps:**
1. Clear sessionStorage: `sessionStorage.clear()`
2. Open DevTools → Network tab
3. Throttle to "Slow 3G" or "Offline"
4. Navigate to http://localhost:3000
5. ⏱️ Wait 3 seconds
6. ✅ Intro auto-skips (timeout triggered)
7. ✅ Check console: "Video load timeout, skipping intro"

**Expected:** 
- Automatic skip after 3 seconds
- No infinite loading
- Console warning message

---

### Test 5: Video Error Handling
**Goal:** Verify graceful handling of missing video

**Steps:**
1. Rename `public/videos/intro.mp4` temporarily
2. Clear sessionStorage: `sessionStorage.clear()`
3. Navigate to http://localhost:3000
4. ✅ Intro skips automatically (error triggered)
5. ✅ Check console: "Video failed to load, skipping intro"
6. Rename video back

**Expected:** 
- No crash
- Auto-skip on error
- Console error message

---

### Test 6: Route Transitions
**Goal:** Verify loading indicators work

**Steps:**
1. Start on homepage: http://localhost:3000
2. Click "Admin" link (or navigate to /admin)
3. ✅ Brief loading spinner appears
4. ✅ Admin page loads
5. Navigate back to homepage
6. ✅ Loading spinner appears again

**Expected:** 
- 300ms loading indicator during transitions
- Smooth animations
- No flickering

---

### Test 7: Footer Links
**Goal:** Verify no dead links

**Steps:**
1. Scroll to footer
2. ✅ "Collections" link present (#collections)
3. ✅ "About" link present (#about)
4. ✅ "Contact" link present (#contact)
5. ✅ "Admin" link present (/admin)
6. ❌ NO "New Arrivals" link
7. ❌ NO "Exclusive" link
8. Click each link - verify it works

**Expected:** 
- Only functional links present
- All links work correctly
- No 404 or dead anchors

---

### Test 8: Session Storage Persistence
**Goal:** Verify intro state persists correctly

**Steps:**
1. Clear sessionStorage: `sessionStorage.clear()`
2. Visit homepage (watch intro or skip)
3. Check sessionStorage: `sessionStorage.getItem('montrez-intro-seen')`
4. ✅ Should be `"true"`
5. Refresh page
6. ✅ Intro should NOT play again
7. Close tab, reopen (same session)
8. ✅ Intro should NOT play
9. Clear sessionStorage again
10. ✅ Intro should play again

**Expected:** 
- State persists within session
- Cleared state triggers intro

---

### Test 9: Mobile Responsiveness
**Goal:** Verify fixes work on mobile

**Steps:**
1. Open DevTools → Toggle device toolbar
2. Select "iPhone 12 Pro" or similar
3. Run Tests 1-7 above
4. ✅ All functionality works on mobile
5. ✅ Skip button visible and clickable
6. ✅ Loading spinner looks good
7. ✅ Footer links accessible

**Expected:** 
- All features work on mobile
- Touch interactions smooth
- No layout issues

---

### Test 10: Performance
**Goal:** Verify no performance regressions

**Steps:**
1. Open DevTools → Lighthouse
2. Run performance audit
3. ✅ Performance score > 90
4. ✅ No console errors
5. ✅ No memory leaks (check Memory tab)
6. Navigate between pages multiple times
7. ✅ No slowdown over time

**Expected:** 
- High performance scores
- No memory leaks
- Smooth navigation

---

## 🐛 Known Issues (None Expected)

All critical issues have been fixed. If you encounter any problems:

1. Check browser console for errors
2. Verify sessionStorage in DevTools → Application tab
3. Ensure video file exists: `public/videos/intro.mp4`
4. Try clearing cache and hard refresh (Ctrl+Shift+R)

---

## 🔍 Debugging Tips

### Video Not Playing
```javascript
// Check video element in console
const video = document.querySelector('.video-intro__video')
console.log('Video loaded:', video.readyState)
console.log('Video error:', video.error)
```

### Session Storage Issues
```javascript
// Check intro state
console.log('Intro seen:', sessionStorage.getItem('montrez-intro-seen'))

// Reset intro
sessionStorage.removeItem('montrez-intro-seen')
location.reload()
```

### Route Issues
```javascript
// Check current route
console.log('Current path:', window.location.pathname)

// Check if admin route
console.log('Is admin route:', window.location.pathname.startsWith('/admin'))
```

---

## ✅ Sign-Off Checklist

Before considering testing complete:

- [ ] Admin panel accessible (Test 1) ✅
- [ ] First-time video works (Test 2) ✅
- [ ] Instant skip for returning users (Test 3) ✅
- [ ] Video timeout works (Test 4) ✅
- [ ] Error handling works (Test 5) ✅
- [ ] Loading indicators present (Test 6) ✅
- [ ] Footer links clean (Test 7) ✅
- [ ] Session storage correct (Test 8) ✅
- [ ] Mobile responsive (Test 9) ✅
- [ ] Performance good (Test 10) ✅

**All tests passing = READY FOR PRODUCTION** 🚀
