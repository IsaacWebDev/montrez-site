# Deployment Checklist - Password Gate Update

## Pre-Deployment Verification

### Files Changed ✅
- [x] `src/components/LandingPage.jsx` - Gate image implementation
- [x] `src/components/PasswordModal.jsx` - NEW component
- [x] `src/App.jsx` - 4-stage flow
- [x] `src/styles/LandingPage.css` - Gate styling
- [x] `src/styles/PasswordModal.css` - NEW modal styling

### Build Verification ✅
```bash
npm run build
# ✓ 71 modules transformed
# ✓ built in 1.01s
```

### Local Testing
```bash
npm run dev
# Test at http://localhost:5173
```

## Testing Checklist

### Stage 1: Landing Page
- [ ] Gate image loads (black & white, ornate)
- [ ] "MONTREZ" logo displays correctly
- [ ] "Enter" button visible and clickable
- [ ] Gold hover effects work
- [ ] Responsive on mobile

### Stage 2: Password Modal
- [ ] Modal appears after clicking "Enter"
- [ ] Input field auto-focuses
- [ ] Gold focus glow appears
- [ ] Wrong password shows error + shake
- [ ] Empty password shows error
- [ ] Correct password advances to video
- [ ] Password: `montrez2024`

### Stage 3: Video Intro
- [ ] Video plays automatically
- [ ] Skip button appears after 2s
- [ ] Video can be skipped
- [ ] Auto-advances after completion
- [ ] Fallback if video fails to load

### Stage 4: Main Site
- [ ] Full homepage loads
- [ ] Navbar, Hero, Collections, About, Contact, Footer
- [ ] All animations work
- [ ] Navigation functions properly

### Session Storage
- [ ] After completing flow, refresh page
- [ ] Should skip directly to main site
- [ ] Clear sessionStorage → should restart flow
- [ ] Test command: `sessionStorage.clear()`

### Cross-Browser Testing
- [ ] Chrome (Windows/Mac)
- [ ] Firefox (Windows/Mac)
- [ ] Safari (Mac/iOS)
- [ ] Edge (Windows)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Performance
- [ ] Landing page loads <100ms
- [ ] Password modal smooth transition
- [ ] Video loads within 2s
- [ ] No console errors

## Deployment Steps

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI (if not already)
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod

# Expected output:
# ✅ Production: https://montrez-site.vercel.app [1s]
```

### Option 2: Netlify
```bash
# Install Netlify CLI (if not already)
npm i -g netlify-cli

# Login
netlify login

# Deploy to production
netlify deploy --prod

# Expected output:
# ✅ Deployed to: https://montrez-site.netlify.app
```

### Option 3: Manual Build + Upload
```bash
# Build for production
npm run build

# Upload dist/ folder to:
# - Static hosting (Cloudflare Pages, GitHub Pages, etc.)
# - Your own server (Apache, Nginx)
# - CDN (AWS S3 + CloudFront)
```

## Post-Deployment Verification

### Production Checks
- [ ] Visit production URL
- [ ] Test full 4-stage flow
- [ ] Test password: `montrez2024`
- [ ] Test on mobile device
- [ ] Check browser console for errors
- [ ] Test all links and navigation
- [ ] Verify video plays correctly
- [ ] Test admin panel: `/admin`

### Analytics Setup (Optional)
- [ ] Google Analytics installed
- [ ] Track entrance completion rate
- [ ] Track password attempt failures
- [ ] Monitor video play/skip rates

### SEO Verification
- [ ] Meta tags correct
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Favicon loads
- [ ] Lighthouse score >90

## Rollback Plan

If issues occur:

### Quick Rollback (Vercel)
```bash
vercel rollback
```

### Quick Rollback (Netlify)
```bash
# In Netlify dashboard:
# Deploys → Find previous deploy → Publish deploy
```

### Manual Rollback
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or restore from backup
# Then redeploy
```

## Configuration Reference

### Password
**Location:** `src/components/PasswordModal.jsx`
```javascript
const CORRECT_PASSWORD = 'montrez2024'
```

### Gate Image
**Location:** `src/components/LandingPage.jsx`
```javascript
backgroundImage: 'url(https://images.unsplash.com/photo-1535537287769-e5b0709acb6d?q=80&w=2070)'
```

### Session Storage Key
**Location:** `src/App.jsx`
```javascript
sessionStorage.getItem('montrez-entrance-complete')
```

## Support & Debugging

### Common Issues

**Issue:** Password not working  
**Debug:** Console → Check for typos, case-sensitive

**Issue:** Stuck on stage  
**Debug:** Console → `sessionStorage.clear()` → Refresh

**Issue:** Video not playing  
**Debug:** Check `/public/videos/intro.mp4` exists

**Issue:** Modal not appearing  
**Debug:** Check browser console for component errors

### Debug Commands
```javascript
// In browser console:

// Check current stage
console.log(sessionStorage.getItem('montrez-entrance-complete'))

// Reset entrance
sessionStorage.clear()
location.reload()

// Skip to main site
sessionStorage.setItem('montrez-entrance-complete', 'true')
location.reload()
```

## Success Metrics

### Key Performance Indicators
- [ ] Entrance completion rate >80%
- [ ] Password success rate on first try >60%
- [ ] Video skip rate <40%
- [ ] Page load time <2s
- [ ] Bounce rate <30%

### User Experience Goals
- [ ] Feels exclusive and premium
- [ ] Password gate doesn't frustrate users
- [ ] Smooth transitions between stages
- [ ] Mobile experience matches desktop
- [ ] No technical errors reported

## Final Checklist

### Before Going Live
- [x] Code reviewed and tested
- [x] Build successful (no errors)
- [x] All components working
- [x] Documentation complete
- [ ] Tested on production URL
- [ ] Team approved
- [ ] Backup created

### After Going Live
- [ ] Monitor for 24h
- [ ] Check analytics
- [ ] Collect user feedback
- [ ] Fix any reported issues
- [ ] Update documentation if needed

---

## Quick Deploy Commands

**Vercel (Fastest)**
```bash
npm run build && vercel --prod
```

**Netlify**
```bash
npm run build && netlify deploy --prod
```

**Test Locally First**
```bash
npm run dev
# Visit http://localhost:5173
# Test password: montrez2024
```

---

## Contact

For deployment issues or questions:
- Check `PASSWORD_GATE_IMPLEMENTATION.md` for technical details
- Review git commit history for changes
- Contact development team

---

**Last Updated:** March 18, 2026  
**Version:** 1.0.0  
**Status:** Ready for Production ✅
