# Montrez - Feature Showcase

## 🎬 Cinematic Video Intro

**Implementation:**
- **Source:** Kling AI generated video (Château de Chambord gates opening)
- **Style:** Black & white, 35mm film grain, cinematic
- **Duration:** 5 seconds
- **Behavior:**
  - Autoplay on first visit
  - Skip button appears after 2 seconds
  - Session storage prevents replay
  - Smooth fade-out transition
  - "MONTREZ" logo overlay during playback

**Technical:**
- Component: `VideoIntro.jsx`
- Preload: Auto
- Format: MP4 (H.264)
- Fallback: Direct skip if autoplay blocked

## 🎨 Dark Theme System

**Color Palette:**
```
Primary: Pure black (#000000)
Surface: Near black (#0a0a0a), Dark grey (#1a1a1a)
Text: White (#ffffff), Light grey (#808080)
Accent: Gold (#d4af37)
```

**Design Philosophy:**
- High contrast for readability
- Minimal color use (B&W + gold accent)
- Film grain texture overlay
- Premium, luxury aesthetic
- Gritty streetwear editorial vibe

**Typography:**
- Helvetica Neue (300 weight)
- Wide letter spacing (0.05em - 0.25em)
- Uppercase headings
- Fluid sizing (responsive to viewport)

## 📱 Responsive Design

**Breakpoints:**
- Mobile: <768px
- Tablet: 768px - 968px
- Desktop: >968px

**Mobile Features:**
- Hamburger menu (animated)
- Full-screen navigation
- Touch-optimized buttons
- Optimized font sizes
- Stacked layouts

**Adaptive Elements:**
- Fluid typography (clamp)
- Flexible grids
- Responsive images
- Mobile-first approach

## ⚡ Performance Optimizations

**Code Splitting:**
- Vendor chunk (React, React DOM, Router)
- Main app chunk
- CSS chunk
- Total: ~173KB (gzipped: ~56KB)

**Asset Optimization:**
- Lazy loading images
- Video preload optimization
- Manual chunks configuration
- Tree shaking enabled

**Caching Strategy:**
- Long-term cache for assets
- Immutable video cache
- Service worker ready

**Loading States:**
- Initial loading animation
- Smooth transitions
- Progressive enhancement

## 🔐 Admin Dashboard

**Features:**
- Login authentication
- Content management panel
- Collections CRUD interface
- Settings configuration
- Responsive admin layout

**Default Credentials:**
- Username: `admin`
- Password: `montrez2024`
- **⚠️ Change before production!**

**Sections:**
1. **Content Management**
   - Edit hero section
   - Update text content
   - Change CTAs

2. **Collections**
   - Add/edit/delete collections
   - Manage collection items
   - Status management

3. **Settings**
   - Site configuration
   - Contact information
   - Video upload

## 🎭 Visual Effects

**Film Grain:**
```css
SVG-based noise overlay
Opacity: 0.15
Blend mode: Overlay
Always-on subtle texture
```

**Hover Effects:**
- Card lift on hover
- Image zoom (scale 1.05)
- Color transitions
- Transform animations

**Transitions:**
- Fast: 0.15s (hover states)
- Medium: 0.3s (UI elements)
- Slow: 0.6s (page transitions)

**Animations:**
- Fade in (opacity + translate)
- Slide in (translate X)
- Bounce (scroll indicator)
- Logo fade (video intro)

## 🧭 Navigation

**Desktop:**
- Fixed navbar
- Transparent initial state
- Solid background on scroll
- Smooth scroll to sections
- Gold underline on hover

**Mobile:**
- Hamburger icon (animated)
- Full-screen overlay menu
- Touch-friendly targets
- Smooth close animation

## 📝 Contact Form

**Fields:**
- Name (required)
- Email (required)
- Message (required)

**Validation:**
- HTML5 validation
- Required fields
- Email format check

**Styling:**
- Dark input fields
- Gold focus states
- Consistent spacing

**Backend:**
- Currently frontend only
- Ready for integration:
  - Netlify Forms
  - FormSpree
  - Custom API

## 🎨 Sections

### Hero
- Full viewport height
- Centered content
- Dual CTA buttons
- Scroll indicator
- Gradient background

### Collections
- Grid layout (3 columns)
- Image hover zoom
- Grayscale filter
- Card hover lift
- Responsive grid

### About
- Two-column layout
- Brand story
- Value propositions
- Card hover effects

### Contact
- Split layout
- Contact info + form
- Social links ready
- Responsive stacking

### Footer
- Brand info
- Link columns
- Social media
- Copyright info

## 🛠️ Tech Stack

**Frontend:**
- React 18.2.0
- React Router 6.22.0
- Vite 5.1.0

**Styling:**
- Pure CSS (no frameworks)
- Custom design system
- CSS variables
- Modern flexbox/grid

**Build:**
- Vite bundler
- Code splitting
- Tree shaking
- Minification

## 🌐 Deployment Ready

**Platforms:**
- ✅ Netlify (configured)
- ✅ Vercel (configured)
- ✅ GitHub Pages (documented)
- ✅ Static hosting (any)

**Configuration:**
- `netlify.toml` - Netlify config
- `vercel.json` - Vercel config
- SPA routing support
- Cache headers
- Security headers

## 📊 Metrics

**Build Stats:**
- HTML: 1.35 KB
- CSS: 16.85 KB (3.77 KB gzipped)
- JS (app): 16.26 KB (4.62 KB gzipped)
- JS (vendor): 156.78 KB (51.12 KB gzipped)
- **Total:** ~190 KB (~60 KB gzipped)

**Performance:**
- Build time: <1 second
- Cold start: <2 seconds
- Hot reload: <100ms

## 🎯 User Experience

**First Visit:**
1. Loading screen
2. Video intro (5s)
3. Skip available after 2s
4. Fade to homepage
5. Remove loading screen

**Return Visit:**
1. Direct to homepage
2. No video replay
3. Instant load

**Navigation:**
- Smooth scroll
- Section anchors
- Back to top
- Mobile friendly

**Interactions:**
- Hover effects
- Click feedback
- Form validation
- Smooth transitions

## 🔮 Future Enhancements

**Ready to Add:**
- Backend API integration
- CMS integration (Sanity, Contentful)
- E-commerce (Shopify, Stripe)
- Newsletter signup
- Blog section
- Product pages
- User accounts
- Shopping cart
- Payment processing
- Order management

**Infrastructure:**
- Analytics (GA, Plausible)
- Error tracking (Sentry)
- A/B testing
- SEO optimization
- PWA capabilities
- Offline support

---

**Built with attention to detail for a premium luxury experience.**
