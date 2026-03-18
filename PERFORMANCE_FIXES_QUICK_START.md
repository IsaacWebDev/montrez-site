# MONTREZ PERFORMANCE AUDIT - QUICK START FIXES

**Current Score:** 78/100  
**Target Score:** 90+/100  
**Estimated Fix Time:** 45 minutes (PRIORITY 1)

---

## 🔴 CRITICAL FIXES (Must Do Before Launch)

### 1. ⚡ Optimize Logo Files (-250KB)
**Time: 15 min | Impact: -250KB total**

```bash
# Option A: Convert PNG to SVG (RECOMMENDED - 1KB for all variants)
# Use online converter or Adobe Illustrator
# Result: 300KB → 1KB

# Option B: Compress PNG with pngquant
npm install -D imagemin imagemin-pngquant
pngquant --speed 1 --quality 90 public/images/logo/montrez-logo-512.png
# Result: 229KB → ~30KB

# Then update img srcset in components to use optimized versions
```

**Files to Fix:**
- `public/images/logo/montrez-logo-512.png` (229KB → <50KB)
- `public/images/logo/montrez-logo-256.png` (69KB → <20KB)
- `public/images/logo/montrez-logo-128.png` (20KB → <10KB)

---

### 2. 🔄 Add React.memo to ProductCard (-200ms FCP)
**Time: 3 min | Impact: Smoother grid rendering**

**File:** `src/components/ProductCard.jsx`

```javascript
// CHANGE THIS:
export default function ProductCard({ product }) {

// TO THIS:
export default React.memo(function ProductCard({ product }) {
  // ... rest of code
}, (prevProps, nextProps) => prevProps.product.id === nextProps.product.id)
```

---

### 3. 🧠 Memoize Collections Component (-100ms)
**Time: 2 min | Impact: Prevent unnecessary re-renders**

**File:** `src/components/Collections.jsx`

```javascript
// MOVE THIS TO TOP OF FILE:
const COLLECTIONS = [
  {
    id: 1,
    title: 'Shadow Series',
    description: 'Dark elegance meets urban edge',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80'
  },
  // ... rest of collections
]

// CHANGE THIS:
export default function Collections() {

// TO THIS:
export default React.memo(function Collections() {
  // ... rest of code (remove duplicate const collections = [...])
})
```

---

### 4. 📄 Inline Critical CSS (-50-100ms FCP)
**Time: 15 min | Impact: Critical path optimization**

**File:** `index.html`

Add critical CSS in `<style>` tag in `<head>`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Montrez - Luxury Fashion & Creative Studio" />
    <title>Montrez</title>
    
    <!-- CRITICAL CSS (inline) -->
    <style>
      /* Base styles - landing page critical path */
      :root {
        --black: #000000;
        --white: #ffffff;
        --light-grey: #808080;
      }
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      html {
        font-size: 16px;
        -webkit-font-smoothing: antialiased;
      }
      
      body {
        font-family: 'Helvetica Neue', 'Arial', sans-serif;
        color: var(--white);
        background: var(--black);
        line-height: 1.6;
        overflow-x: hidden;
      }
      
      /* Loading screen */
      #loading {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      }
      
      .loader {
        width: 2px;
        height: 40px;
        background: #fff;
        animation: pulse 1.5s ease-in-out infinite;
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 0.3; transform: scaleY(0.5); }
        50% { opacity: 1; transform: scaleY(1); }
      }
      
      /* Landing page critical */
      .landing-page {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
      }
      
      /* Password modal critical */
      .password-email-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }
      
      /* Video intro critical */
      .video-intro {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: black;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
      }
      
      .video-intro__video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    </style>
    
    <style>
      body {
        margin: 0;
        background: #000;
        overflow-x: hidden;
      }
      #loading {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      }
      .loader {
        width: 2px;
        height: 40px;
        background: #fff;
        animation: pulse 1.5s ease-in-out infinite;
      }
      @keyframes pulse {
        0%, 100% { opacity: 0.3; transform: scaleY(0.5); }
        50% { opacity: 1; transform: scaleY(1); }
      }
    </style>
  </head>
  <body>
    <div id="loading">
      <div class="loader"></div>
    </div>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

### 5. 🎬 Preload Video (-100ms video start)
**Time: 5 min | Impact: Faster video intro**

**File:** `index.html`

Add to `<head>`:
```html
<link rel="preload" as="video" href="/videos/intro.mp4" type="video/mp4">
```

---

## 📊 After These 5 Fixes:

✅ **Logo:** -250KB  
✅ **FCP:** -50-100ms  
✅ **ProductCard:** -200ms  
✅ **Collections:** -100ms  
✅ **Video Start:** -100ms  

**New Score: 87-88/100** (up from 78)

---

## 🟠 HIGH-PRIORITY (Post-Launch Optimizations)

### 6. Code-Split CSS by Route (-8KB)
```javascript
// src/App.jsx - Use lazy for Admin
const Admin = lazy(() => import('./components/Admin'))
```

### 7. Responsive Images (-10-15% mobile)
```jsx
// src/components/Collections.jsx
<img 
  srcSet="url?w=400&q=80 400w, url?w=800&q=80 800w"
  sizes="(max-width: 600px) 400px, 800px"
/>
```

### 8. Update Cache Headers (vercel.json)
```json
{
  "source": "/images/(.*)",
  "headers": [{
    "key": "Cache-Control",
    "value": "public, max-age=2592000, immutable"
  }]
}
```

---

## ✅ VERIFICATION CHECKLIST

After fixes, verify:

```bash
# 1. Run build
npm run build

# 2. Check bundle sizes
ls -lh dist/assets/

# 3. Run Lighthouse (requires lighthouse CLI)
npm install -g lighthouse
lighthouse https://montrez-site.vercel.app --view

# 4. Expected results:
# - Total gzipped: < 85KB (from 108KB)
# - FCP: < 1.5s
# - LCP: < 2.5s
# - CLS: < 0.1
```

---

## 🚀 DEPLOYMENT STEPS

1. Make the 5 critical fixes (45 min)
2. Test locally: `npm run build && npm run preview`
3. Push to git: `git push`
4. Vercel auto-deploys (2-3 min)
5. Run Lighthouse on production URL
6. Confirm score 87+/100

---

**Total Time to Launch:** ~1 hour  
**Expected Improvement:** 78 → 88/100  
**Timeline to 90+:** Add PRIORITY 2 fixes post-launch

Good luck! 🎯
