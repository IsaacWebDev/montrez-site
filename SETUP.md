# Montrez Setup Instructions

## ✅ Completed

The Montrez website is **built and ready to deploy**!

### What's Been Done

✅ Full dark theme with cinematic luxury aesthetic  
✅ Video intro integrated (Château de Chambord - 5s B&W cinematic)  
✅ Mobile-first responsive design  
✅ Homepage with Hero, Collections, About, Contact sections  
✅ Admin dashboard with authentication  
✅ Performance optimized (build tested: 173KB total)  
✅ Film grain effects & premium styling  
✅ Deploy-ready configuration (Netlify & Vercel)  

## 🚀 Quick Start

### 1. View Locally

```bash
cd montrez-site
npm run dev
```

Open: http://localhost:3000

### 2. Test Production Build

```bash
npm run build
npm run preview
```

Open: http://localhost:4173

## 📦 What's Included

### Project Structure
```
montrez-site/
├── public/
│   ├── videos/
│   │   └── intro.mp4          # Kling AI video (20MB)
│   └── favicon.svg            # Montrez logo
├── src/
│   ├── components/
│   │   ├── VideoIntro.jsx     # Cinematic intro
│   │   ├── Navbar.jsx         # Navigation
│   │   ├── Hero.jsx           # Hero section
│   │   ├── Collections.jsx    # Product showcase
│   │   ├── About.jsx          # Brand story
│   │   ├── Contact.jsx        # Contact form
│   │   ├── Footer.jsx         # Footer
│   │   └── Admin.jsx          # Admin dashboard
│   ├── styles/
│   │   ├── theme.css          # Dark theme system
│   │   ├── VideoIntro.css     # Intro styling
│   │   ├── Navbar.css         # Nav styling
│   │   ├── Hero.css           # Hero styling
│   │   ├── Collections.css    # Collections styling
│   │   ├── About.css          # About styling
│   │   ├── Contact.css        # Contact styling
│   │   ├── Footer.css         # Footer styling
│   │   └── Admin.css          # Admin styling
│   ├── App.jsx                # Main app component
│   └── main.jsx               # Entry point
├── index.html                 # HTML template
├── vite.config.js             # Build config
├── netlify.toml               # Netlify config
├── vercel.json                # Vercel config
└── README.md                  # Documentation
```

### Key Features

**🎬 Video Intro**
- Autoplay on first visit
- Skip button after 2s
- Session storage (won't replay)
- Optimized for mobile

**🎨 Dark Theme**
- B&W cinematic aesthetic
- Film grain overlay
- Gold accent color (#d4af37)
- High contrast luxury feel

**📱 Responsive**
- Mobile-first design
- Hamburger menu on mobile
- Fluid typography
- Touch-optimized

**⚡ Performance**
- Code splitting (vendor chunk)
- Lazy loading
- Optimized assets
- Fast page loads

**🔐 Admin Dashboard**
- Login: admin / montrez2024
- Content management
- Collections management
- Settings panel

## 🎯 Next Steps

### 1. Optimize Video (Recommended)

Current video is 20MB. Reduce to ~3-5MB:

```bash
# Option A: Use included script (requires FFmpeg)
npm run optimize-video

# Option B: Manual FFmpeg command
ffmpeg -i public/videos/intro.mp4 -c:v libx264 -crf 28 -preset slow -vf "scale=1280:-2" -c:a aac -b:a 128k -movflags +faststart public/videos/intro-optimized.mp4
```

Then replace:
```bash
move public\videos\intro-optimized.mp4 public\videos\intro.mp4
```

### 2. Deploy to Production

**Netlify (Easiest):**
```bash
# Build
npm run build

# Option 1: Drag & drop 'dist' folder to netlify.com/drop
# Option 2: Use Netlify CLI
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

**Vercel:**
```bash
npm install -g vercel
vercel
```

See `deploy.md` for detailed deployment instructions.

### 3. Customize Content

**Update Site Content:**
- Edit `src/components/Hero.jsx` - Hero text
- Edit `src/components/Collections.jsx` - Collection items
- Edit `src/components/About.jsx` - About text
- Edit `src/components/Contact.jsx` - Contact details

**Change Colors:**
- Edit `src/styles/theme.css` - Update CSS variables

**Replace Images:**
- Current: Unsplash placeholders
- Add your images to `public/images/`
- Update image URLs in components

**Change Admin Password:**
- Edit `src/components/Admin.jsx`
- Line ~12: Update credentials check
- **Important: Do this before deploying!**

### 4. Add Backend (Optional)

Current site is static. To add backend:

1. Contact form → Use Netlify Forms or FormSpree
2. Database → Use Supabase or Firebase
3. CMS → Use Sanity.io or Contentful

## 🎨 Design System

### Colors
```css
--black: #000000
--near-black: #0a0a0a
--dark-grey: #1a1a1a
--mid-grey: #2a2a2a
--light-grey: #808080
--white: #ffffff
--gold: #d4af37 (accent)
```

### Typography
- Font: Helvetica Neue (300 weight)
- Wide letter spacing (0.05em - 0.25em)
- Uppercase headings
- Fluid sizes (clamp)

### Effects
- Film grain overlay
- Smooth transitions (0.3s - 0.6s)
- Hover lift on cards
- Subtle shadows

## 🔧 Troubleshooting

### Video Won't Play
- Check file size (<5MB recommended for web)
- Verify MP4 format (H.264 codec)
- Test in different browsers
- Check browser console for errors

### Build Fails
```bash
# Clear and reinstall
rm -rf node_modules dist
npm install
npm run build
```

### Admin Page 404
- Ensure hosting supports SPA routing
- Check netlify.toml or vercel.json is deployed
- For Netlify: Add redirect rule in dashboard

### Slow Loading
- Optimize video (see step 1)
- Check image sizes
- Test with Lighthouse

## 📊 Performance Targets

Current build:
- Total JS: ~173KB (gzipped: ~56KB)
- Total CSS: ~17KB (gzipped: ~4KB)
- HTML: ~1.4KB

Targets:
- Lighthouse Score: 90+
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Total Bundle: <200KB

## 🎯 Pre-Launch Checklist

- [ ] Video optimized (<5MB)
- [ ] Admin password changed
- [ ] Contact email updated
- [ ] Social links added
- [ ] Tested on Chrome, Firefox, Safari
- [ ] Tested on mobile devices
- [ ] All links working
- [ ] Forms tested
- [ ] SEO meta tags added
- [ ] Analytics setup (optional)
- [ ] SSL enabled (HTTPS)

## 📞 Support

**Built by:** OpenClaw Agent (Jarvis)  
**For:** Isaac Senior Primo  
**Date:** March 18, 2026  
**Tech:** React + Vite + Custom CSS

**Issues?**
- Check README.md
- See deploy.md for deployment help
- Review browser console (F12)
- Check build logs

---

**🚀 Your site is ready to go live!**

Run `npm run dev` to start developing or `npm run build` to deploy.
