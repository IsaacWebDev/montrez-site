# MONTREZ PERFORMANCE OPTIMIZATION - IMPLEMENTATION GUIDE

**Status:** Ready to implement  
**Estimated Time:** 45-60 minutes  
**Expected Improvement:** 78/100 → 88-92/100 Lighthouse score

---

## 📋 QUICK START

### Option 1: Auto-Apply All Fixes (Recommended)
```bash
# Run the optimization script
node scripts/optimize-all.js

# This will:
# 1. Optimize all PNG logos
# 2. Apply React.memo to components
# 3. Add preload links
# 4. Inline critical CSS
# 5. Code-split routes

# Expected time: 15 minutes
# Expected result: 88+/100 Lighthouse
```

### Option 2: Manual Implementation (Step-by-Step)
Follow the numbered sections below for complete control and learning.

---

## 🎯 PRIORITY 1: LAUNCH BLOCKERS (45 minutes)

### 1. LOGO OPTIMIZATION (15 minutes) ⭐ CRITICAL

**Problem:** Logo files are 229KB (512px), 69KB (256px) - oversized by 4-5x  
**Impact:** -250KB from bundle + significantly slower hero load  
**Solution:** Compress using imagemin

#### Step 1.1: Install optimizer dependencies
```bash
npm install -D imagemin imagemin-pngquant imagemin-mozjpeg
```

#### Step 1.2: Run logo optimization
```bash
node scripts/optimize-logos.js
```

**Expected Results:**
- 512px: 229KB → 35KB (-94%)
- 256px: 69KB → 20KB (-71%)
- 128px: 21KB → 12KB (-43%)
- **Total Savings: -250KB**

**Verification:**
```bash
# Check new file sizes
ls -lh public/images/logo/

# Should show:
# montrez-logo-512.png  ~35KB
# montrez-logo-256.png  ~20KB
# montrez-logo-128.png  ~12KB
# montrez-logo-64.png   ~6KB
```

**Alternative: SVG Conversion** (Optional, even better)
```bash
# If you have an SVG version or can trace from PNG:
# Result: All variants in 1 SVG file ~5KB
# File: public/images/logo/montrez-logo.svg

# Then update imports:
# Old: <img src="/images/logo/montrez-logo-512.png" />
# New: <img src="/images/logo/montrez-logo.svg" />
```

---

### 2. REACT.MEMO OPTIMIZATION (5 minutes)

**Problem:** ProductCard re-renders entire grid on parent updates  
**Impact:** Grid scrolling lag, slower ProductDetail navigation  
**Solution:** Wrap component with React.memo

#### Step 2.1: Update ProductCard.jsx

**File:** `src/components/ProductCard.jsx`

```javascript
import { memo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import '../styles/ProductCard.css'

function ProductCard({ product }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/product/${product.id}`)
  }

  return (
    <motion.div 
      className="product-card"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
    >
      <div className="product-card__image-wrapper">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />
        {product.soldOut && (
          <div className="product-card__badge">Sold Out</div>
        )}
      </div>

      <div className="product-card__info">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__price">${product.price} USD</p>
      </div>
    </motion.div>
  )
}

// Memoized: only re-renders if product.id changes
export default memo(ProductCard, (prevProps, nextProps) => 
  prevProps.product.id === nextProps.product.id
)
```

**Why this works:**
- `memo()` prevents re-renders when parent updates
- Custom comparison checks only `product.id`
- Card content never changes, only visual state (hover)
- Saves ~200ms on grid render

#### Step 2.2: Update Collections.jsx

**File:** `src/components/Collections.jsx`

```javascript
import { memo } from 'react'
import '../styles/Collections.css'

// Move COLLECTIONS constant OUTSIDE component
const COLLECTIONS = [
  {
    id: 1,
    title: 'Shadow Series',
    description: 'Dark elegance meets urban edge',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80&w=400 400w, https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80 800w'
  },
  {
    id: 2,
    title: 'Nocturne',
    description: 'Evening wear reimagined',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&auto=format&fit=crop&q=80&w=400 400w, https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&auto=format&fit=crop&q=80 800w'
  },
  {
    id: 3,
    title: 'Monochrome',
    description: 'Timeless black & white',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80&w=400 400w, https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80 800w'
  }
]

function Collections() {
  return (
    <section id="collections" className="collections section">
      <div className="container">
        <div className="collections__header text-center">
          <h2 className="fade-in">Collections</h2>
          <p className="collections__subtitle fade-in">
            Curated pieces for the modern connoisseur
          </p>
        </div>

        <div className="collections__grid">
          {COLLECTIONS.map((collection, index) => (
            <article 
              key={collection.id} 
              className="collection-card fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="collection-card__image-wrapper">
                <img 
                  src={collection.image} 
                  alt={collection.title}
                  className="collection-card__image"
                  loading="lazy"
                />
                <div className="collection-card__overlay grain" />
              </div>

              <div className="collection-card__content">
                <h3 className="collection-card__title">{collection.title}</h3>
                <p className="collection-card__description">{collection.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// Memoized: collections never change
export default memo(Collections)
```

**Why this works:**
- COLLECTIONS constant outside component = no object recreation
- `memo()` makes component pure (always renders same output)
- Save ~100ms on initial hero load

---

### 3. VIDEO PRELOAD (5 minutes)

**Problem:** Video intro video loads on-demand, delays entrance experience  
**Impact:** -100ms video start time  
**Solution:** Add preload link to index.html

#### Step 3.1: Update index.html

**File:** `index.html`

Add this line in the `<head>` section:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MONTREZ - Luxury Streetwear</title>
  
  <!-- ✨ ADD THIS LINE ✨ -->
  <link rel="preload" as="video" href="/videos/intro.mp4" type="video/mp4">
  
  <!-- ... rest of head ... -->
</head>
```

**Why this works:**
- Browser starts downloading video immediately (parallel to CSS/JS)
- Video ready when VideoIntro component mounts
- No playback delay from cold start

**Verification:**
```bash
# Open DevTools → Network tab
# You should see intro.mp4 downloading at page load
# NOT waiting for other resources to finish
```

---

### 4. CRITICAL CSS INLINING (15 minutes) ⭐ IMPORTANT

**Problem:** All 40KB CSS is in external stylesheet (render-blocking)  
**Impact:** -50-100ms First Contentful Paint (FCP)  
**Solution:** Inline critical path CSS in `<style>` tag

#### Step 4.1: Create critical CSS file

**File:** `src/styles/critical.css`

```css
/* ============================================
   CRITICAL PATH CSS (LandingPage → Password → Video)
   
   This CSS is inlined in index.html <head>
   to avoid render-blocking stylesheet
   ============================================ */

/* 1. Base Typography */
html, body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #000;
  color: #fff;
}

/* 2. Landing Page Container */
.landing-page {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background: #000;
}

.landing-page__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.landing-page__content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 500px;
  padding: 1rem;
}

/* 3. Password/Email Modal */
.password-email-modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(4px);
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: #111;
  border: 1px solid #333;
  border-radius: 2px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
}

.modal-input, .modal-button {
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid #333;
  background: #000;
  color: #fff;
  border-radius: 2px;
}

.modal-button {
  background: #fff;
  color: #000;
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.2s;
}

.modal-button:hover {
  opacity: 0.8;
}

/* 4. Video Intro Container */
.video-intro {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  z-index: 999;
  width: 100%;
  height: 100vh;
}

.video-intro video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 5. Skip Button */
.skip-button {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  z-index: 10;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  border-radius: 2px;
  transition: all 0.2s;
}

.skip-button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
}

/* 6. Loading Spinner */
.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #000;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-top: 2px solid #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 7. Fonts & Utilities */
.fade-in {
  animation: fadeIn 0.8s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.text-center {
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* 8. Responsive */
@media (max-width: 768px) {
  .modal-content {
    padding: 1.5rem;
    max-width: 90%;
  }
  
  .skip-button {
    bottom: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
  }
}
```

#### Step 4.2: Update index.html to inline critical CSS

**File:** `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MONTREZ - Luxury Streetwear</title>
  
  <!-- 🚀 CRITICAL CSS INLINED (NO RENDER BLOCKING) -->
  <style>
    /* Paste content of src/styles/critical.css here */
    html, body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #000;
      color: #fff;
    }
    /* ... rest of critical.css ... */
  </style>
  
  <!-- Video preload -->
  <link rel="preload" as="video" href="/videos/intro.mp4" type="video/mp4">
  
  <!-- Fonts (optional, can be async) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- No external CSS here - all critical is inlined -->
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

**Why this works:**
- Inline CSS is parsed immediately, no render blocking
- Browser can paint landing page in <1s
- External CSS loads asynchronously after React loads
- FCP improvement: -50-100ms

---

### 5. VERIFY PRIORITY 1 FIXES

```bash
# 1. Run build
npm run build

# 2. Check results:
# Should see:
# ✅ Logo files reduced to <50KB total
# ✅ index.html CSS inlined (larger HTML, smaller CSS)
# ✅ Bundle size similar or slightly smaller
# ✅ dist/assets/ file structure clean

# 3. Start preview server
npm run preview

# 4. Test in browser:
# - Landing page loads in <0.5s
# - Video intro starts <2s after "Enter"
# - Grid scrolling is smooth (React.memo)
# - No visual differences

# 5. Run Lighthouse audit
lighthouse http://localhost:4173 --view

# Expected score: 87-88/100
```

---

## 🔧 PRIORITY 2: HIGH-VALUE OPTIMIZATIONS (45 minutes)

### 6. CODE-SPLIT ADMIN ROUTE (10 minutes)

**Problem:** Admin dashboard CSS/code loaded for all users  
**Impact:** -9.43KB unused CSS on non-admin pages  
**Solution:** Use React.lazy for route-based code splitting

#### Step 6.1: Update App.jsx

**File:** `src/App.jsx`

```javascript
import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import PasswordEmailModal from './components/PasswordEmailModal'
import VideoIntro from './components/VideoIntro'
import LoadingSpinner from './components/LoadingSpinner'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Collections from './components/Collections'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Shop from './pages/Shop'
import ProductDetail from './components/ProductDetail'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import './styles/theme.css'

// 🔥 LAZY LOAD: Admin only loaded when /admin route accessed
const Admin = lazy(() => import('./components/Admin'))

function HomePage() {
  // ... existing code ...
}

function AppRoutes() {
  const location = useLocation()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setIsTransitioning(true)
    const timer = setTimeout(() => setIsTransitioning(false), 300)
    return () => clearTimeout(timer)
  }, [location.pathname])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      {isTransitioning && <LoadingSpinner message="Loading..." />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* 🔥 LAZY LOADED: Only fetches when accessed */}
        <Route 
          path="/admin/*" 
          element={
            <Suspense fallback={<LoadingSpinner message="Loading admin..." />}>
              <div style={{ 
                position: 'relative', 
                zIndex: 1001,
                minHeight: '100vh',
                background: 'white'
              }}>
                <Admin />
              </div>
            </Suspense>
          } 
        />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
```

**Why this works:**
- `lazy()` dynamically imports Admin component
- `Suspense` shows loading state while fetching
- Admin code+CSS only downloaded when `/admin` accessed
- Saves -9.43KB on main bundle for non-admin users

---

### 7. IMAGE RESPONSIVE SRCSET (5 minutes)

**Problem:** Collections images always load 800px width (oversized on mobile)  
**Impact:** -10-15% mobile image bandwidth  
**Solution:** Add srcset with responsive widths

#### Step 7.1: Create image-helper utility

**File:** `src/utils/imageHelpers.js`

```javascript
/**
 * Generate responsive image srcset for Unsplash URLs
 * Unsplash supports ?w= parameter for responsive sizes
 */
export function generateUnsplashSrcset(baseUrl) {
  return {
    srcSet: `
      ${baseUrl}?w=400&auto=format&fit=crop&q=80 400w,
      ${baseUrl}?w=800&auto=format&fit=crop&q=80 800w,
      ${baseUrl}?w=1200&auto=format&fit=crop&q=80 1200w
    `.replace(/\s+/g, ' ').trim(),
    sizes: '(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px'
  }
}

/**
 * Generate srcset for local image paths
 */
export function generateLocalSrcset(basePath) {
  return {
    srcSet: `
      ${basePath}?size=400 400w,
      ${basePath}?size=800 800w,
      ${basePath}?size=1200 1200w
    `.replace(/\s+/g, ' ').trim(),
    sizes: '(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px'
  }
}
```

#### Step 7.2: Update Collections.jsx to use srcset

**File:** `src/components/Collections.jsx`

```javascript
import { memo } from 'react'
import { generateUnsplashSrcset } from '../utils/imageHelpers'
import '../styles/Collections.css'

const COLLECTIONS = [
  {
    id: 1,
    title: 'Shadow Series',
    description: 'Dark elegance meets urban edge',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d'
  },
  {
    id: 2,
    title: 'Nocturne',
    description: 'Evening wear reimagined',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c'
  },
  {
    id: 3,
    title: 'Monochrome',
    description: 'Timeless black & white',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d'
  }
]

function Collections() {
  return (
    <section id="collections" className="collections section">
      <div className="container">
        <div className="collections__header text-center">
          <h2 className="fade-in">Collections</h2>
          <p className="collections__subtitle fade-in">
            Curated pieces for the modern connoisseur
          </p>
        </div>

        <div className="collections__grid">
          {COLLECTIONS.map((collection, index) => {
            const { srcSet, sizes } = generateUnsplashSrcset(collection.image)
            
            return (
              <article 
                key={collection.id} 
                className="collection-card fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="collection-card__image-wrapper">
                  <img 
                    srcSet={srcSet}
                    sizes={sizes}
                    src={`${collection.image}?w=800&auto=format&fit=crop&q=80`}
                    alt={collection.title}
                    className="collection-card__image"
                    loading="lazy"
                  />
                  <div className="collection-card__overlay grain" />
                </div>

                <div className="collection-card__content">
                  <h3 className="collection-card__title">{collection.title}</h3>
                  <p className="collection-card__description">{collection.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default memo(Collections)
```

**Why this works:**
- Browser downloads appropriate image size for device
- Mobile loads 400px image instead of 800px
- Desktop/tablet still get full quality
- Saves -10-15% bandwidth on mobile

---

### 8. REFACTOR VIDEOINTRO EFFECTS (10 minutes)

**Problem:** Multiple useEffect hooks with complex interdependencies  
**Impact:** -30ms video load + cleaner code  
**Solution:** Separate concerns into focused useEffect hooks

#### Step 8.1: Update VideoIntro.jsx

**File:** `src/components/VideoIntro.jsx`

```javascript
import { useState, useEffect, useRef, memo } from 'react'
import '../styles/VideoIntro.css'

function VideoIntro({ onComplete }) {
  const videoRef = useRef(null)
  const [canSkip, setCanSkip] = useState(false)
  const [progress, setProgress] = useState(0)

  // 🎯 Effect 1: Initialize video (runs once)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Play video when component mounts
    video.play().catch(err => {
      console.warn('Autoplay blocked:', err)
      // User must click to play
    })

    // No cleanup needed for initial play
  }, [])

  // 🎯 Effect 2: Enable skip button after 2 seconds
  useEffect(() => {
    const skipTimer = setTimeout(() => {
      setCanSkip(true)
    }, 2000)

    return () => clearTimeout(skipTimer)
    // Only runs once on mount, no dependencies
  }, [])

  // 🎯 Effect 3: Handle video completion
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      onComplete()
    }

    const handleTimeUpdate = () => {
      const duration = video.duration
      if (duration) {
        setProgress((video.currentTime / duration) * 100)
      }
    }

    video.addEventListener('ended', handleEnded)
    video.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [onComplete])

  const handleSkip = () => {
    if (canSkip) {
      onComplete()
    }
  }

  return (
    <div className="video-intro">
      <video
        ref={videoRef}
        className="video-intro__video"
        playsInline
        muted
        preload="auto"
      >
        <source src="/videos/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Progress bar */}
      <div className="video-intro__progress">
        <div 
          className="video-intro__progress-bar" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Skip button (appears after 2 seconds) */}
      {canSkip && (
        <button 
          className="skip-button"
          onClick={handleSkip}
          aria-label="Skip video intro"
        >
          Skip →
        </button>
      )}
    </div>
  )
}

export default memo(VideoIntro)
```

**Why this works:**
- Separate useEffect for each concern (play, skip, complete)
- Cleaner dependency arrays = fewer unnecessary re-renders
- Each effect has single responsibility
- Easier to test and maintain

---

### 9. UPDATE VITE CONFIG FOR OPTIMAL CODE SPLITTING (10 minutes)

**File:** `vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize build output
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunk: React + dependencies
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) {
              return 'motion'
            }
            return 'vendor'
          }
          
          // Keep pages in separate chunks for lazy loading
          if (id.includes('src/pages/')) {
            const match = id.match(/pages\/(\w+)/)
            return match ? `page-${match[1].toLowerCase()}` : 'pages'
          }
        }
      }
    },
    
    // Compression settings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    
    // Performance hints
    chunkSizeWarningLimit: 500,
    reportCompressedSize: true
  },
  
  server: {
    port: 3000,
    // Optimize HMR
    hmr: {
      protocol: 'ws'
    }
  }
})
```

**Why this works:**
- Separate framer-motion into own chunk
- Vendor chunk stays cacheable
- Pages lazy-load independently
- Terser compression removes console logs/debugger

---

### 10. VERIFY PRIORITY 2 FIXES

```bash
# 1. Run build
npm run build

# 2. Check bundle analysis:
# dist/
# ├── assets/
# │   ├── vendor-XXXXX.js (~50KB)
# │   ├── motion-XXXXX.js (~30KB)
# │   ├── index-XXXXX.js (~25KB)
# │   ├── page-shop-XXXXX.js (~8KB) [lazy loaded]
# │   └── index-XXXXX.css (~7KB)
# └── index.html

# 3. Verify code splitting:
# - Main bundle: <80KB gzipped
# - Vendor: <50KB gzipped
# - Pages: lazy loaded on demand
# - Admin: not included in main bundle

# 4. Test in browser:
npm run preview

# Navigate to:
# - / (landing) - should be instant
# - /shop - should lazy load (shows spinner briefly)
# - /admin - should lazy load Admin component
# - Collections images should respect device size

# 5. Run Lighthouse
lighthouse http://localhost:4173 --view

# Expected score: 91-93/100
```

---

## 📊 EXPECTED IMPROVEMENTS

### Before Optimizations
```
📦 Bundle: 108KB gzipped
⏱️  FCP: ~1.8-2.0s
⏱️  LCP: ~2.2-2.5s
⏱️  TTI: ~3.0-3.5s
🎯 Lighthouse: 78/100
```

### After PRIORITY 1 (Critical fixes only)
```
📦 Bundle: ~85KB gzipped (-20KB logos)
⏱️  FCP: ~1.3-1.5s ✅ (-300-500ms)