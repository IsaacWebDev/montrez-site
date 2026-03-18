# Montrez - Luxury Fashion Website

A dark-themed luxury fashion website with cinematic video intro featuring the Château de Chambord.

## Features

- ✨ Cinematic B&W video intro (Kling AI - Château de Chambord gates opening)
- 🎨 Full dark theme with luxury aesthetic
- 📱 Mobile-first responsive design
- ⚡ Optimized performance
- 🔐 Admin dashboard with authentication
- 🎞️ 35mm film grain effect
- 🖤 High contrast, moody, premium feel

## Tech Stack

- React 18
- Vite (build tool)
- React Router (routing)
- Pure CSS (no frameworks, custom design system)

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add video file:**
   Copy the video to `public/videos/intro.mp4`:
   ```bash
   mkdir public/videos
   copy "C:\Users\isaac\OneDrive\Documents\solvexai\customers\kling_20260318_Image_to_Video_Cinematic__2822_0.mp4" public\videos\intro.mp4
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## Admin Access

- URL: `/admin`
- Default credentials:
  - Username: `admin`
  - Password: `montrez2024`

**⚠️ Change these credentials before deploying to production!**

## Video Optimization

The original video is ~20MB. For production, optimize it:

```bash
# Install FFmpeg if not already installed
# Windows: choco install ffmpeg
# or download from https://ffmpeg.org/

# Optimize video (reduce size while maintaining quality)
ffmpeg -i public/videos/intro.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k public/videos/intro-optimized.mp4
```

Then replace `intro.mp4` with `intro-optimized.mp4`.

## Deployment

### Netlify (Recommended)
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Drag and drop the `dist` folder to Netlify

### Vercel
1. Import repository
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

### Manual
1. Run `npm run build`
2. Upload the `dist` folder to your hosting provider

## Design System

### Colors
- Black: `#000000`
- Dark Grey: `#1a1a1a`
- Mid Grey: `#2a2a2a`
- Light Grey: `#808080`
- White: `#ffffff`
- Gold (accent): `#d4af37`

### Typography
- Display: Helvetica Neue (300 weight)
- Body: Helvetica Neue (300 weight)
- Letter spacing: 0.05em - 0.25em (wide spacing for luxury feel)

### Effects
- Film grain overlay
- High contrast B&W aesthetic
- Smooth transitions (0.3s - 0.6s)
- Subtle hover effects

## Performance

- Video lazy loads after initial page load
- Session storage prevents intro replay
- Manual chunks for vendor code
- Optimized images via Unsplash CDN
- Minimal CSS (no frameworks)

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## License

All rights reserved © 2026 Montrez
