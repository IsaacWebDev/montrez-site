# Deployment Guide - Montrez

## Quick Deploy (Netlify - Recommended)

### Option 1: Drag & Drop
1. Build the site:
   ```bash
   npm run build
   ```
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag the `dist` folder onto the page
4. Your site is live! 🚀

### Option 2: Netlify CLI
1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
2. Login:
   ```bash
   netlify login
   ```
3. Deploy:
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

## Alternative Platforms

### Vercel
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Deploy:
   ```bash
   vercel
   ```
3. Follow the prompts

### GitHub Pages
1. Add to `package.json`:
   ```json
   "homepage": "https://your-username.github.io/montrez",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```
3. Deploy:
   ```bash
   npm run deploy
   ```

## Performance Optimization

### 1. Optimize Video (IMPORTANT)
The video is currently ~20MB. Optimize before production:

```bash
npm run optimize-video
```

This will create `intro-optimized.mp4` (typically 2-5MB).

Replace the original:
```bash
move public\videos\intro-optimized.mp4 public\videos\intro.mp4
```

### 2. Image Optimization
Current images use Unsplash CDN (already optimized).

For custom images:
- Use WebP format
- Max width: 1200px
- Compress with tools like [TinyPNG](https://tinypng.com)

### 3. Enable Caching
Add `netlify.toml` for cache headers:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "/videos/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## Environment Variables

If you add backend features, create `.env`:

```bash
VITE_API_URL=https://api.montrez.com
VITE_ADMIN_PASSWORD=change-this-in-production
```

**⚠️ Never commit `.env` to Git!**

## Custom Domain

### Netlify
1. Go to Site Settings → Domain Management
2. Click "Add custom domain"
3. Follow DNS instructions

### Typical DNS Setup
- **A Record**: `@` → Netlify IP
- **CNAME**: `www` → your-site.netlify.app

## Pre-Deploy Checklist

- [ ] Video optimized (<5MB)
- [ ] Admin password changed
- [ ] Images compressed
- [ ] Test on mobile devices
- [ ] Check all links work
- [ ] Verify forms (contact)
- [ ] Test video intro on different browsers
- [ ] Enable HTTPS
- [ ] Set up analytics (optional)

## Post-Deploy

1. **Test the site:**
   - Video intro plays
   - Navigation works
   - Mobile responsive
   - Admin login works
   - All sections load

2. **Monitor performance:**
   - Use [PageSpeed Insights](https://pagespeed.web.dev/)
   - Target: 90+ score

3. **Set up monitoring:**
   - Uptime monitoring: [UptimeRobot](https://uptimerobot.com/)
   - Analytics: Google Analytics or Plausible

## Troubleshooting

### Video Won't Play
- Check file size (<5MB recommended)
- Ensure MP4 format (H.264 codec)
- Test on different browsers
- Check browser console for errors

### Site Won't Build
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `rm -rf dist .vite`
- Check Node version: `node -v` (requires v16+)

### Admin Page Not Found
- Ensure React Router is configured
- Check build output includes all routes
- Verify hosting supports SPA routing

## Support

For issues, check:
- README.md
- Browser console (F12)
- Build logs
- Network tab (F12 → Network)
