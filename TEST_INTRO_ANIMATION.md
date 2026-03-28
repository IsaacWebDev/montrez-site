# Test Guide: Luxury Intro Animation

## Quick Test (Development)

1. **Start dev server:**
   ```bash
   cd montrez-site
   npm run dev
   ```

2. **Open browser:**
   ```
   http://localhost:5173
   ```

3. **Test flow:**
   - ✅ See landing page (gate image)
   - ✅ Click "Enter" button
   - ✅ Complete access gate (password: `montrez2026` or Instagram)
   - ✅ See intro animation (10 seconds)
   - ✅ Site loads after fade

## Test Each Phase

### Phase 1: Gate Opening (0-3s)
**Expected:**
- Iron gates visible (dark gradient)
- "MONTREZ" logo in center
- Gates swing outward
- Logo fades out by 3s

**Check:**
- [ ] Gates animate smoothly
- [ ] No jank or stuttering
- [ ] Logo visible at start
- [ ] Logo fades at right time

### Phase 2: Camera Zoom (3-6s)
**Expected:**
- Lake background visible
- Scale increases (zoom effect)
- Chateau appears in center
- Smooth transition from gates

**Check:**
- [ ] Lake gradient appears
- [ ] Zoom feels natural
- [ ] Chateau fades in
- [ ] No sudden jumps

### Phase 3: Doors Opening (6-9s)
**Expected:**
- Chateau doors visible
- 3D rotation (left: -90deg, right: +90deg)
- Wood texture visible
- Entrance revealed

**Check:**
- [ ] Doors visible at 6s
- [ ] 3D effect works
- [ ] Rotation smooth
- [ ] Perspective looks right

### Phase 4: Fade to Site (9-10s)
**Expected:**
- White overlay appears
- Opacity increases to 1
- Main site loads
- Hero section visible

**Check:**
- [ ] Fade starts at 9s
- [ ] Transition smooth
- [ ] Site loads correctly
- [ ] No flash or jump

## Test Skip Button

**Expected:**
- Skip button appears at 2s
- Bottom right corner
- Glass effect background
- Hover state works

**Actions:**
1. Wait 2 seconds
2. Skip button fades in
3. Hover over button (should lift)
4. Click skip
5. Site loads immediately

**Check:**
- [ ] Appears after 2s
- [ ] Positioned correctly
- [ ] Hover effect works
- [ ] Click skips to site
- [ ] No errors

## Test Mobile (Responsive)

**Resize browser to <768px or use DevTools:**

**Expected:**
- Smaller logo text (2.5rem)
- Smaller skip button
- Same animation timeline
- Better performance

**Check:**
- [ ] Text scales down
- [ ] Skip button repositioned
- [ ] Animations still smooth
- [ ] No overflow issues

## Test Accessibility

**1. Prefers Reduced Motion:**
```javascript
// In DevTools Console:
// Emulate CSS media: prefers-reduced-motion: reduce
```

**Expected:**
- Animations disabled
- Instant transitions
- No motion

**2. Keyboard Navigation:**
- Tab to skip button
- Enter to activate

## Performance Check

**Open DevTools → Performance:**

1. Start recording
2. Trigger intro animation
3. Let it complete
4. Stop recording

**Expected:**
- 60fps throughout
- No dropped frames
- No layout shifts
- GPU acceleration active

**Check:**
- [ ] Frame rate stable
- [ ] No long tasks
- [ ] No reflows
- [ ] Memory stable

## Test Session Persistence

**Test 1: Complete Flow**
1. Complete intro animation
2. Refresh page
3. Should skip directly to main site

**Test 2: Reset**
```javascript
// In DevTools Console:
sessionStorage.removeItem('montrez-entrance-complete')
```
4. Refresh page
5. Should show landing page again

**Check:**
- [ ] Session saved on completion
- [ ] Refresh skips intro
- [ ] Manual reset works
- [ ] Can replay intro

## Browser Compatibility

**Test in:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

**Known Issues:**
- Safari may have 3D transform quirks (fallback: 2D)
- Older browsers: Framer Motion may polyfill

## Edge Cases

**Test 1: Slow Connection**
- Throttle network in DevTools (Slow 3G)
- Animation should still run smoothly (no images to load)

**Test 2: Quick Skip**
- Click skip at 0.5s
- Should transition immediately
- No animation artifacts

**Test 3: Back Button**
- Complete intro
- Navigate to /shop
- Click back
- Should show main homepage (skip intro)

**Test 4: Direct Link**
- Visit /shop directly
- Should mark entrance complete
- Homepage link should skip intro

## Console Errors

**Expected:**
- No errors
- No warnings
- No memory leaks

**If errors:**
- Check Framer Motion version
- Check CSS import
- Check component import path

## Visual QA Checklist

- [ ] Gates aligned center
- [ ] Lake fills screen correctly
- [ ] Chateau positioned center
- [ ] Doors aligned with chateau
- [ ] Logo centered
- [ ] Skip button positioned correctly
- [ ] White fade covers entire screen
- [ ] No visual artifacts
- [ ] No flickering
- [ ] Smooth transitions

## Timeline Accuracy

Use stopwatch to verify:
- [ ] 0-3s: Gate opening
- [ ] 3-6s: Camera zoom
- [ ] 6-9s: Doors opening
- [ ] 9-10s: Fade to site
- [ ] Total: Exactly 10 seconds

## User Experience

**Subjective quality check:**
- [ ] Feels premium/luxury
- [ ] Smooth and polished
- [ ] Not too long
- [ ] Not annoying
- [ ] Skip option clear
- [ ] Matches brand

## Production Test (After Deploy)

1. **Deploy to Vercel:**
   ```bash
   npm run build
   git add .
   git commit -m "Add luxury intro animation"
   git push
   ```

2. **Test on production:**
   ```
   https://montrez-site.vercel.app
   ```

3. **Verify:**
   - [ ] Loads on production
   - [ ] Animations work
   - [ ] Skip button works
   - [ ] Session persists
   - [ ] No 404s
   - [ ] No console errors

## Common Issues & Fixes

**Issue: Animation jerky/laggy**
- Solution: Check GPU acceleration (will-change)
- Check: DevTools → Rendering → Paint flashing

**Issue: Skip button not appearing**
- Solution: Check z-index (should be 400)
- Check: Console for errors

**Issue: White fade not covering screen**
- Solution: Check fixed positioning
- Verify: width: 100vw, height: 100vh

**Issue: Logo not centered**
- Solution: Check transform: translate(-50%, -50%)
- Verify: position: absolute + top/left: 50%

**Issue: 3D doors look flat**
- Solution: Check perspective values
- Verify: perspective on container, backface-visibility

**Issue: Animation doesn't start**
- Solution: Check Framer Motion import
- Verify: CSS file imported

## Success Criteria

✅ **All phases complete in 10 seconds**
✅ **Smooth 60fps animations**
✅ **Skip button works**
✅ **Mobile responsive**
✅ **Session persistence works**
✅ **No console errors**
✅ **Accessible (reduced motion)**
✅ **Feels premium/luxury**

---

**Status:** Ready to test
**Estimated test time:** 15-20 minutes (full checklist)
**Quick test:** 2 minutes (happy path only)
