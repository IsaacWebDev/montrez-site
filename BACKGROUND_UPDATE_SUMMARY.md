# Landing Page Background Update - Summary

## ✅ What Changed

**Old Background:** European castle/château with ornate gate and lanterns
**New Background:** Editorial fashion photo - Person in Montréz studded jacket sitting in front of Mercedes-Benz

---

## 🎨 Visual Improvements

### Composition:
- **Subject:** Person in black Montréz-branded jacket with studded/riveted hood
- **Branding:** "MONTRÉZ" and "Pas pour Tout" visible on jacket
- **Background:** Mercedes-Benz three-pointed star emblem, overcast sky
- **Style:** High-fashion editorial, monochrome, gritty, raw luxury

### Positioning:
- **Desktop (1200px+):** Background positioned at `center 45%` - shows full subject + hint of Mercedes
- **Tablet (768-1199px):** Background positioned at `center 38%` - focused on upper torso/hood
- **Mobile (<768px):** Background positioned at `center 35%` - centered on subject, darker for text readability

### Filters Applied:
- **Grayscale:** 100% (maintains brand's monochrome aesthetic)
- **Contrast:** 1.25 (enhanced texture visibility)
- **Brightness:** 0.45 on desktop, 0.4 on mobile (darker for text legibility)

---

## 🔧 Technical Changes

### Files Modified:
1. **src/styles/LandingPage.css**
   - Updated `background-image` URL to `/images/landing-new-bg.jpg`
   - Enhanced filter values for editorial photo
   - Added responsive positioning for different screen sizes
   - Optimized gradient overlay for better text contrast

2. **public/images/landing-new-bg.jpg**
   - New background image added (950×1280px portrait)

### CSS Enhancements:

**Background positioning:**
```css
/* Desktop - show more context */
background-position: center 45%;

/* Tablet - focus on subject */
background-position: center 38%;

/* Mobile - centered on subject, darker */
background-position: center 35%;
filter: brightness(0.4);
```

**Gradient overlay updated:**
```css
/* Enhanced gradient for editorial photo */
background: linear-gradient(
  to bottom,
  rgba(0, 0, 0, 0.4) 0%,
  rgba(0, 0, 0, 0.3) 30%,   /* Lighter mid-section */
  rgba(0, 0, 0, 0.6) 70%,
  rgba(0, 0, 0, 0.8) 100%
);
```

---

## 🎯 Impact

### Brand Alignment:
✅ **Before:** European luxury (castle/gate aesthetic)
✅ **After:** European luxury **streetwear** (fashion editorial aesthetic)

**Alignment:** The new background better reflects Montréz's core identity - *European luxury streetwear*, not traditional European luxury.

### Visual Hierarchy:
- Text overlay (MONTRÉZ logo + tagline) remains highly legible
- Studded hood creates interesting texture behind text
- Subject's anonymous pose (head down, sunglasses) creates mystery
- Mercedes emblem subtly reinforces luxury positioning

### User Experience:
- Responsive design ensures good composition on all devices
- Darker filters on mobile maintain text readability
- Subtle zoom animation (20s) creates dynamic feel
- Smooth transitions maintain premium feel

---

## 📸 Before vs After

### Before:
- European château with ornate gate
- Symmetrical, classic luxury aesthetic
- More traditional/formal vibe

### After:
- Fashion editorial with Montréz product showcase
- Gritty, raw, streetwear luxury aesthetic
- Modern, edgy, exclusive vibe

---

## 🚀 Live Now

**Deployed:** https://montrez-site.vercel.app/

**Test on:**
- Desktop (wide viewport) - see full composition with Mercedes
- Tablet - focused on jacket branding
- Mobile - centered on subject, optimized darkness

---

## 💡 Additional Optimization Ideas (Optional)

### If you want to enhance further:

1. **Add subtle vignette effect:**
   ```css
   box-shadow: inset 0 0 200px rgba(0, 0, 0, 0.5);
   ```

2. **Parallax effect on scroll (if landing has scroll):**
   ```css
   background-attachment: fixed;
   ```

3. **Alternative backgrounds rotation:**
   - Could rotate between 2-3 editorial photos on each visit
   - JavaScript: randomly select from array of images

4. **Lazy loading optimization:**
   - Add WebP version for better performance
   - Fallback to JPG for older browsers

---

## 📋 Summary

**Time:** ~15 minutes
**Impact:** High - better brand alignment with streetwear identity
**Quality:** Premium - maintains luxury feel, improves brand story

**Key wins:**
✅ Product showcase (Montréz jacket visible)
✅ Streetwear aesthetic (gritty, editorial)
✅ Luxury cues (Mercedes, studs, monochrome)
✅ Responsive optimization (all devices)
✅ Brand alignment (luxury streetwear, not just luxury)

---

**Ready to deploy!** The new background is live and optimized for all devices.
