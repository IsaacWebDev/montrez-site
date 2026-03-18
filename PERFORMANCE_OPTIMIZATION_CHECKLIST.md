# MONTREZ PERFORMANCE OPTIMIZATION - EXECUTION CHECKLIST

**Status:** Ready to implement  
**Estimated Time:** 60-90 minutes (including testing)  
**Expected Outcome:** Lighthouse 78/100 → 91+/100

---

## ✅ PRE-IMPLEMENTATION

### Environment Setup
- [ ] Node.js v18+ installed (`node -v`)
- [ ] `npm install` completed
- [ ] All dependencies resolved (`npm list`)
- [ ] Git repo clean (`git status`)
- [ ] Create branch: `git checkout -b perf/optimize-montrez`

### Verification
```bash
# Test current build
npm run build
npm run preview

# Run baseline Lighthouse (optional but recommended)
lighthouse http://localhost:4173 --view
# Note the baseline score
```

---

## 🔴 PRIORITY 1: CRITICAL FIXES (45 minutes)

### Step 1: Logo Optimization (15 min)
- [ ] **Install dependencies**
  ```bash
  npm install -D imagemin imagemin-pngquant
  ```
  
- [ ] **Run optimization script**
  ```bash
  node scripts/optimize-logos.js
  ```
  
- [ ] **Verify results**
  ```bash
  # Check new file sizes
  ls -lh public/images/logo/
  
  # Verify:
  # - 512px: <50KB ✅
  # - 256px: <25KB ✅
  # - 128px: <15KB ✅
  # - Total savings: >200KB ✅
  ```
  
- [ ] **Test visual quality**
  - [ ] Open landing page in browser
  - [ ] Verify logo quality matches original
  - [ ] Test on high-DPI screen
  - [ ] Test on mobile device
  
- [ ] **Mark complete**
  ```bash
  git add public/images/logo/
  git commit -m "perf: optimize logo files (-250KB)"
  ```

---

### Step 2: React.memo Optimizations (10 min)

#### 2.1: Update ProductCard.jsx
- [ ] **Edit file:** `src/components/ProductCard.jsx`
- [ ] **Add memo import:**
  ```javascript
  import { memo } from 'react'
  ```
- [ ] **Wrap export:**
  ```javascript
  export default memo(ProductCard, (prevProps, nextProps) => 
    prevProps.product.id === nextProps.product.id
  )
  ```
- [ ] **Verify:** No console warnings
  ```bash
  npm run dev
  # Open browser console - should be clean
  ```

#### 2.2: Update Collections.jsx
- [ ] **Edit file:** `src/components/Collections.jsx`
- [ ] **Add memo import**
- [ ] **Move collections array outside component**
  ```javascript
  const COLLECTIONS = [ ... ]
  ```
- [ ] **Wrap export**
  ```javascript
  export default memo(Collections)
  ```
- [ ] **Verify:** Collections still render correctly

#### 2.3: Memoize VideoIntro (optional)
- [ ] **Edit file:** `src/components/VideoIntro.jsx`
- [ ] **Add memo export**
  ```javascript
  export default memo(VideoIntro)
  ```

- [ ] **Commit changes**
  ```bash
  git add src/components/ProductCard.jsx src/components/Collections.jsx src/components/VideoIntro.jsx
  git commit -m "perf: add React.memo to prevent unnecessary re-renders (-200ms)"
  ```

---

### Step 3: Video Preload (5 min)

- [ ] **Edit file:** `index.html`
- [ ] **Add preload link in `<head>`**
  ```html
  <link rel="preload" as="video" href="/videos/intro.mp4" type="video/mp4">
  ```
- [ ] **Verify placement** (after viewport meta, before other links)
- [ ] **Test:** Open DevTools → Network tab
  - [ ] Verify `intro.mp4` starts downloading immediately
  - [ ] Video loads in parallel with CSS/JS
  
- [ ] **Commit**
  ```bash
  git add index.html
  git commit -m "perf: preload video intro (-100ms start time)"
  ```

---

### Step 4: Critical CSS Inlining (15 min)

#### 4.1: Create critical CSS file
- [ ] **Copy critical CSS content** from `OPTIMIZATION_IMPLEMENTATION_GUIDE.md`
- [ ] **Create file:** `src/styles/critical.css`
- [ ] **Paste critical CSS content**
- [ ] **Verify file has:**
  - [ ] Body base styles
  - [ ] Landing page styles
  - [ ] Password modal styles
  - [ ] Video intro styles
  - [ ] Skip button styles
  - [ ] Responsive media queries

#### 4.2: Update index.html
- [ ] **Edit file:** `index.html`
- [ ] **Replace existing `<link>` tags with inline `<style>`**
  ```html
  <style>
    /* Copy content from src/styles/critical.css */
  </style>
  ```
- [ ] **Verify:**
  - [ ] No external CSS links in `<head>`
  - [ ] Video preload still present
  - [ ] HTML is now larger (~3KB more)

#### 4.3: Test FCP improvement
- [ ] **Run build & preview**
  ```bash
  npm run build
  npm run preview
  ```
- [ ] **Open DevTools → Performance tab**
- [ ] **Record performance trace**
  - [ ] FCP should be <1.5s
  - [ ] LCP should be <2s
  - [ ] First paint should show landing page
  
- [ ] **Verify visual consistency**
  - [ ] Landing page appears immediately
  - [ ] Password modal styles correct
  - [ ] Video intro container ready
  - [ ] No unstyled flash (FOUC)

- [ ] **Commit**
  ```bash
  git add src/styles/critical.css index.html
  git commit -m "perf: inline critical CSS (-100ms FCP)"
  ```

---

### Step 5: Verify PRIORITY 1 Fixes

- [ ] **Build & test**
  ```bash
  npm run build
  npm run preview
  ```

- [ ] **Manual quality checks**
  - [ ] Landing page loads instantly
  - [ ] No layout shifts during load
  - [ ] All images display correctly
  - [ ] Video intro works (click Enter)
  - [ ] Grid scrolling is smooth
  - [ ] Password modal functions
  - [ ] Mobile responsive

- [ ] **Check bundle sizes**
  ```bash
  # After build, check dist/assets/
  ls -lh dist/assets/
  
  # Should see:
  # - index.js: ~25KB (main code)
  # - index.css: ~7KB (non-critical CSS, async loaded)
  # - vendor.js: ~50KB (React dependencies)
  # - Total: <85KB gzipped
  ```

- [ ] **Run Lighthouse audit** ⭐ IMPORTANT
  ```bash
  # Install lighthouse globally if needed
  npm install -g lighthouse
  
  # Audit local preview
  lighthouse http://localhost:4173 --view
  
  # Expected scores:
  # - Performance: 85-88 ✅
  # - Accessibility: 95+
  # - Best Practices: 90+
  # - SEO: 95+
  # - Overall: 87-88/100
  ```

- [ ] **Document baseline improvement**
  ```bash
  # Capture screenshot of Lighthouse report
  # Save to: LIGHTHOUSE_BASELINE_PRIORITY1.png
  ```

- [ ] **Push PRIORITY 1 branch**
  ```bash
  git push origin perf/optimize-montrez
  ```

---

## 🟠 PRIORITY 2: HIGH-VALUE OPTIMIZATIONS (45 minutes)

### Step 6: Code-Split Admin Route (10 min)

- [ ] **Edit file:** `src/App.jsx`
- [ ] **Add lazy import at top**
  ```javascript
  import { lazy, Suspense } from 'react'
  const Admin = lazy(() => import('./components/Admin'))
  ```
- [ ] **Remove regular Admin import**
  ```javascript
  // DELETE: import Admin from './components/Admin'
  ```
- [ ] **Wrap Admin route with Suspense**
  ```javascript
  <Route 
    path="/admin/*" 
    element={
      <Suspense fallback={<LoadingSpinner message="Loading admin..." />}>
        <div style={{ ... }}>
          <Admin />
        </div>
      </Suspense>
    } 
  />
  ```

- [ ] **Test**
  ```bash
  npm run dev
  # Navigate to /admin - should see loading spinner
  # Admin page should load normally
  ```

- [ ] **Commit**
  ```bash
  git add src/App.jsx
  git commit -m "perf: lazy load admin route (-9.4KB initial)"
  ```

---

### Step 7: Image Responsive srcset (5 min)

#### 7.1: Create image helper
- [ ] **Create file:** `src/utils/imageHelpers.js`
- [ ] **Copy content** from `OPTIMIZATION_IMPLEMENTATION_GUIDE.md`

#### 7.2: Update Collections
- [ ] **Edit file:** `src/components/Collections.jsx`
- [ ] **Add import**
  ```javascript
  import { generateUnsplashSrcset } from '../utils/imageHelpers'
  ```
- [ ] **Update img tags**
  ```javascript
  const { srcSet, sizes } = generateUnsplashSrcset(collection.image)
  <img 
    srcSet={srcSet}
    sizes={sizes}
    src={`${collection.image}?w=800...`}
    loading="lazy"
  />
  ```

- [ ] **Test on mobile**
  - [ ] DevTools → Device Toolbar (mobile)
  - [ ] Check Network → Images
  - [ ] Should download 400px versions (not 800px)
  - [ ] Verify image quality still good

- [ ] **Commit**
  ```bash
  git add src/utils/imageHelpers.js src/components/Collections.jsx
  git commit -m "perf: add responsive srcset for collections (-10% mobile)"
  ```

---

### Step 8: Refactor VideoIntro useEffect (10 min)

- [ ] **Edit file:** `src/components/VideoIntro.jsx`
- [ ] **Replace useEffect hooks** with separated version from guide
- [ ] **Verify:**
  - [ ] 3 separate useEffect hooks (initialization, skip, completion)
  - [ ] Clean dependency arrays
  - [ ] No console warnings
  - [ ] Video still plays correctly
  - [ ] Skip button still works

- [ ] **Test**
  ```bash
  npm run dev
  # Navigate to / (landing)
  # Click "Enter" → video should play
  # Wait 2s → skip button should appear
  # Click skip or wait for video to end
  ```

- [ ] **Commit**
  ```bash
  git add src/components/VideoIntro.jsx
  git commit -m "perf: refactor VideoIntro effects (-30ms)"
  ```

---

### Step 9: Update Vite Config (10 min)

- [ ] **Edit file:** `vite.config.js`
- [ ] **Update configuration** from guide
- [ ] **Key changes:**
  - [ ] Manual chunks for vendor/motion
  - [ ] Terser compression enabled
  - [ ] Console logs removed in production

- [ ] **Test build**
  ```bash
  npm run build
  
  # Check dist/assets/
  # Should see:
  # - vendor-xxx.js
  # - motion-xxx.js  (separated framer-motion)
  # - index-xxx.js
  # - page-xxx.js    (lazy routes)
  # - index.css
  ```

- [ ] **Commit**
  ```bash
  git add vite.config.js
  git commit -m "perf: optimize vite build config"
  ```

---

### Step 10: Verify PRIORITY 2 Fixes

- [ ] **Build & test**
  ```bash
  npm run build
  npm run preview
  ```

- [ ] **Verify code splitting**
  ```bash
  # Check chunk sizes
  npm run build | grep dist
  
  # Verify:
  # - Main bundle: <80KB gzipped
  # - Motion chunk: <30KB gzipped
  # - Vendor chunk: <50KB gzipped
  # - Admin NOT included in main bundle
  ```

- [ ] **Test lazy loading**
  - [ ] Navigate to /admin - should show loading spinner
  - [ ] Admin chunk downloads on demand
  - [ ] Check Network tab for admin-*.js file

- [ ] **Test responsive images**
  - [ ] Mobile (iPhone): collections load 400px images
  - [ ] Tablet: collections load 800px images
  - [ ] Desktop: collections load 1200px images

- [ ] **Run final Lighthouse audit**
  ```bash
  lighthouse http://localhost:4173 --view
  
  # Expected scores:
  # - Performance: 90-93 ✅
  # - Accessibility: 95+
  # - Best Practices: 90+
  # - SEO: 95+
  # - Overall: 91-93/100
  ```

- [ ] **Document final improvement**
  ```bash
  # Capture Lighthouse screenshot
  # Save to: LIGHTHOUSE_FINAL_PRIORITY2.png
  ```

---

## 🟢 PRIORITY 3: NICE-TO-HAVE (Optional, 30+ minutes)

### Optional Enhancements
- [ ] **Font subsetting**
  - [ ] Use google-fonts-webpack-plugin
  - [ ] Only load used characters
  - [ ] Expected: -5KB CSS

- [ ] **Service Worker**
  - [ ] Install workbox
  - [ ] Cache critical assets
  - [ ] Offline support

- [ ] **Image compression further**
  - [ ] Convert SVGs to optimized versions
  - [ ] Consider WebP for some images

- [ ] **Analytics monitoring**
  - [ ] Install web-vitals package
  - [ ] Add Core Web Vitals tracking
  - [ ] Monitor in production

---

## 📊 FINAL VERIFICATION

### Pre-Deployment Checklist

#### Performance
- [ ] FCP <1.5s ✅
- [ ] LCP <2.5s ✅
- [ ] TTI <3s ✅
- [ ] Bundle size <200KB ✅
- [ ] Mobile Lighthouse 90+ ✅
- [ ] Desktop Lighthouse 93+ ✅

#### Functionality
- [ ] Landing page loads instantly
- [ ] Password modal works
- [ ] Video intro plays (auto + manual skip)
- [ ] Collections load with images
- [ ] Product grid scrolls smoothly
- [ ] Product detail page loads
- [ ] Shop page functional
- [ ] Admin accessible and loads on demand
- [ ] All navigation works
- [ ] Mobile responsive

#### Browser Compatibility
- [ ] Chrome/Edge (latest) ✅
- [ ] Firefox (latest) ✅
- [ ] Safari (latest) ✅
- [ ] Mobile browsers ✅

#### Network Conditions
- [ ] Fast 3G (tested in DevTools)
- [ ] Slow 3G (tested in DevTools)
- [ ] 4G mobile (tested on real device)
- [ ] Desktop (tested)

#### SEO & Accessibility
- [ ] No console errors
- [ ] No accessibility warnings (Lighthouse)
- [ ] Meta tags correct
- [ ] Open Graph tags present
- [ ] Images have alt text
- [ ] Proper heading hierarchy

---

## 🚀 DEPLOYMENT

### Before Merging
```bash
# Ensure all tests pass
npm run build

# Run final audit
lighthouse https://montrez-site.vercel.app

# Expected score: 91+ Lighthouse, <1.5s FCP, <2.5s LCP
```

### Git Workflow
```bash
# 1. Commit all changes
git add .
git commit -m "perf: complete montrez optimization (78→93 Lighthouse)"

# 2. Push to branch
git push origin perf/optimize-montrez

# 3. Create PR with checklist
git pull-request --title "Performance: Optimize Montrez for launch"

# 4. After approval, merge
git checkout main
git merge perf/optimize-montrez
git push origin main

# Vercel auto-deploys on push to main ✅
```

### Post-Deployment Monitoring
- [ ] Monitor Core Web Vitals in Vercel Analytics
- [ ] Check error tracking (Sentry if installed)
- [ ] Monitor Lighthouse scores weekly
- [ ] Test on real devices in target markets
- [ ] A/B test if conversion tracking available

---

## 📈 EXPECTED METRICS

### Before Optimization
```
First Contentful Paint:    ~1.8-2.0s
Largest Contentful Paint:  ~2.2-2.5s
Time to Interactive:       ~3.0-3.5s
Total Bundle Size:         108KB gzipped
Mobile Lighthouse Score:   78/100
Desktop Lighthouse Score:  80/100
```

### After PRIORITY 1
```
First Contentful Paint:    ~1.3-1.5s ✅ (-400ms)
Largest Contentful Paint:  ~2.0-2.2s ✅ (-400ms)
Time to Interactive:       ~3.0-3.2s ✅ (-300ms)
Total Bundle Size:         ~85KB gzipped (-20KB)
Mobile Lighthouse Score:   87/100 (+9)
Desktop Lighthouse Score:  88/100 (+8)
```

### After PRIORITY 2
```
First Contentful Paint:    ~1.2s ✅ (-600ms)
Largest Contentful Paint:  ~1.8s ✅ (-700ms)
Time to Interactive:       ~2.8s ✅ (-700ms)
Total Bundle Size:         ~77KB gzipped (-30KB)
Mobile Lighthouse Score:   91-92/100 (+13-14)
Desktop Lighthouse Score:  92-93/100 (+12-13)
```

---

## 🎓 LEARNING NOTES

### Key Concepts Implemented

1. **Logo Optimization**
   - PNG compression with pngquant (80-95% quality)
   - Backup/restore workflow
   - Safe optimization without quality loss

2. **React.memo**
   - Prevents unnecessary re-renders
   - Custom comparison functions
   - Memoization of pure components

3. **Video Preloading**
   - Link rel="preload" for resource hints
   - Parallel downloading with CSS/JS
   - Browser resource priority

4. **Critical CSS**
   - Inline critical path CSS
   - Remove render-blocking stylesheets
   - Defer non-critical CSS

5. **Code Splitting**
   - React.lazy() for dynamic imports
   - Suspense boundaries for loading states
   - Route-based chunking

6. **Responsive Images**
   - srcset for different device sizes
   - sizes for device-aware loading
   - Reduced bandwidth on mobile

7. **Build Optimization**
   - Vite chunking strategies
   - Terser compression settings
   - Tree-shaking configuration

---

## ❓ TROUBLESHOOTING

### Issue: Logo optimization fails
```bash
# Solution: Ensure imagemin deps installed
npm install -D imagemin imagemin-pngquant

# If still failing:
# 1. Delete node_modules
# 2. npm install
# 3. Try script again
```

### Issue: Video doesn't preload
```bash
# Check:
# 1. Preload link is in <head>
# 2. Video file exists at /videos/intro.mp4
# 3. DevTools Network tab shows video downloading
# 4. Check CORS headers if served from CDN
```

### Issue: CSS not inlined properly
```bash
# Verify:
# 1. <style> tag is in <head> (not <body>)
# 2. CSS is minified/optimized
# 3. HTML file is updated (not cached)
# 4. Browser DevTools shows inline CSS in Sources tab
```

### Issue: Lighthouse score didn't improve
```bash
# Check:
# 1. Build is production mode (npm run build)
# 2. Testing on unthrottled network (disable DevTools throttling)
# 3. Clear cache (Hard refresh Ctrl+Shift+R)
# 4. Test on different device/network
# 5. Check Lighthouse report for remaining opportunities
```

---

## 📞 SUPPORT

For issues or questions:
1. Check OPTIMIZATION_IMPLEMENTATION_GUIDE.md
2. Review Lighthouse audit details
3. Check console for errors
4. Test on different browser/device

---

**Last Updated:** March 18, 2026  
**Status:** Ready to implement  
**Estimated Completion:** 90 minutes
