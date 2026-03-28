# MONTREZ - Video Implementation & Deployment Guide

## Overview
This guide covers integrating the new cinematic intro video into the Montrez site once delivered by the animator.

---

## Pre-Delivery Checklist

Before accepting final delivery, verify:

### Video File Quality
- [ ] Resolution: 1920x1080 or higher
- [ ] Frame rate: 60fps (check with `ffprobe`)
- [ ] Format: MP4 with H.264 codec
- [ ] Duration: 3-5 seconds
- [ ] No visible compression artifacts
- [ ] Smooth playback (no frame drops)

### File Size (CRITICAL)
- [ ] File size <500KB (use `ls -lh` or File Explorer)
- [ ] If >500KB, request re-compression
- [ ] Test download speed on 4G (should be <2s)

### Visual Quality
- [ ] Camera movement is smooth (no jitter)
- [ ] Lake appears naturally in sequence
- [ ] Doors open dramatically (good timing)
- [ ] Color grading matches luxury aesthetic
- [ ] No watermarks or branding issues
- [ ] Film grain (if included) is subtle

### Technical Validation
```powershell
# Check video specs
ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,width,height,r_frame_rate,duration,bit_rate -of json montrez-intro-final.mp4

# Expected output:
# codec_name: h264
# width: 1920
# height: 1080
# r_frame_rate: 60/1 (or 30/1 acceptable)
# duration: 3-5 seconds
# bit_rate: <1000000 (for <500KB target)
```

---

## Implementation Steps

### Step 1: Receive & Validate Files

**Expected deliverables:**
1. `montrez-intro-final.mp4` - Main video (<500KB)
2. `montrez-intro-poster.jpg` - Poster frame (<100KB, 1920x1080)
3. Source files (optional) - `.blend`, `.aep`, etc.

**Validate locally:**
```powershell
# Check file size
Get-Item montrez-intro-final.mp4 | Select-Object Name, @{Name="SizeKB";Expression={[math]::Round($_.Length/1KB,2)}}

# Play video (test smooth playback)
# Use VLC or Windows Media Player
```

---

### Step 2: Backup Current Files

```powershell
cd C:\Users\isaac\.openclaw\workspace\montrez-site\public\videos

# Backup current video
Copy-Item intro-pexels-compressed.mp4 "intro-pexels-compressed-BACKUP-$(Get-Date -Format 'yyyy-MM-dd').mp4"

# Verify backup
Get-ChildItem *BACKUP*
```

---

### Step 3: Add New Files

```powershell
# Copy video to public/videos
Copy-Item "C:\Path\To\Downloaded\montrez-intro-final.mp4" "C:\Users\isaac\.openclaw\workspace\montrez-site\public\videos\"

# Copy poster to public/images
Copy-Item "C:\Path\To\Downloaded\montrez-intro-poster.jpg" "C:\Users\isaac\.openclaw\workspace\montrez-site\public\images\"

# Verify files exist
Get-ChildItem C:\Users\isaac\.openclaw\workspace\montrez-site\public\videos\montrez-intro-final.mp4
Get-ChildItem C:\Users\isaac\.openclaw\workspace\montrez-site\public\images\montrez-intro-poster.jpg
```

---

### Step 4: Update VideoIntro.jsx Component

**Edit the component:**

```jsx
// src/components/VideoIntro.jsx

import { useEffect, useRef, useState } from 'react'
import '../styles/VideoIntro.css'

export default function VideoIntro({ onComplete }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [canSkip, setCanSkip] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Shorter timeout for new optimized video
    const loadTimeout = setTimeout(() => {
      if (isLoading) {
        console.warn('Video load timeout after 10s')
        onComplete()
      }
    }, 10000)

    const playVideo = async () => {
      try {
        video.muted = true
        video.volume = 0
        
        const playPromise = video.play()
        if (playPromise !== undefined) {
          await playPromise
          console.log('Cinematic intro playing successfully')
          setIsPlaying(true)
          setIsLoading(false)
        }
      } catch (err) {
        console.error('Video autoplay failed:', err.name, err.message)
        setIsLoading(false)
        setTimeout(onComplete, 2000)
      }
    }

    const handleLoadedData = () => {
      console.log('Cinematic intro loaded')
      setIsLoading(false)
      clearTimeout(loadTimeout)
      playVideo()
    }

    const handleCanPlay = () => {
      setIsLoading(false)
      clearTimeout(loadTimeout)
    }

    const handleError = (e) => {
      console.error('Video failed to load:', e)
      console.error('Video src:', video.src)
      console.error('Video error code:', video.error?.code)
      onComplete()
    }

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('error', handleError)

    video.load()

    const handleEnded = () => {
      setTimeout(onComplete, 500)
    }

    video.addEventListener('ended', handleEnded)

    return () => {
      clearTimeout(loadTimeout)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('error', handleError)
    }
  }, [onComplete, isLoading])

  return (
    <div className="video-intro">
      {isLoading && (
        <div className="video-intro__loading">
          <div className="spinner"></div>
          <p className="loading-text">Loading luxury experience...</p>
        </div>
      )}
      
      <video
        ref={videoRef}
        className="video-intro__video"
        muted
        playsInline
        autoPlay
        preload="auto"
        poster="/images/montrez-intro-poster.jpg"
        style={{ opacity: isLoading ? 0 : 1 }}
      >
        {/* NEW CINEMATIC INTRO VIDEO */}
        <source src="/videos/montrez-intro-final.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="video-intro__overlay grain" />
      
      <div className="video-intro__branding">
        <h1 className="video-intro__logo">MONTREZ</h1>
      </div>
    </div>
  )
}
```

**Key changes:**
1. Updated `poster` prop: `/images/montrez-intro-poster.jpg`
2. Updated `src`: `/videos/montrez-intro-final.mp4`
3. Updated loading text: "Loading luxury experience..." (optional branding touch)

---

### Step 5: Test Locally

```powershell
cd C:\Users\isaac\.openclaw\workspace\montrez-site

# Start dev server
npm run dev

# Open browser to http://localhost:5173
```

**Test checklist:**
- [ ] Video loads within 3 seconds
- [ ] Poster image displays immediately
- [ ] Video plays automatically (muted)
- [ ] Smooth 60fps playback
- [ ] No stuttering or frame drops
- [ ] Transition to site is smooth
- [ ] Loading spinner disappears when video ready
- [ ] "MONTREZ" branding overlay works

**Browser testing:**
- [ ] Chrome (desktop)
- [ ] Safari (desktop - if on Mac)
- [ ] Firefox (desktop)
- [ ] Chrome (mobile - use DevTools device emulation)
- [ ] Safari (mobile - test on actual iPhone if possible)

**Network throttling test:**
```
1. Open Chrome DevTools (F12)
2. Go to Network tab
3. Set throttling to "Fast 3G" or "Slow 3G"
4. Refresh page
5. Video should still load and play (may take longer)
6. Verify file size in Network tab (<500KB)
```

---

### Step 6: Commit Changes

```powershell
cd C:\Users\isaac\.openclaw\workspace\montrez-site

# Stage files
git add public/videos/montrez-intro-final.mp4
git add public/images/montrez-intro-poster.jpg
git add src/components/VideoIntro.jsx

# Commit with descriptive message
git commit -m "feat: upgrade intro video with cinematic chateau animation

- Replace stock footage with custom 3D animation
- Add ornate gates → lake → chateau doors sequence
- Optimize file size (<500KB for fast load)
- Update poster image for instant visual feedback
- Maintain luxury brand aesthetic throughout

Deliverables from [animator name] via [platform]"

# Verify commit
git log -1 --stat
```

---

### Step 7: Deploy to Production

**Automatic deployment (Vercel):**
```powershell
# Push to main branch (triggers Vercel deploy)
git push origin main

# Monitor deployment
# Visit: https://vercel.com/[your-account]/montrez-site
# Or check Vercel CLI: vercel --prod
```

**Wait for deployment:**
- Vercel typically takes 1-3 minutes
- Check deployment logs for any errors
- Verify build succeeds

---

### Step 8: Production Testing

**Once deployed, test live site:**

```
Visit: https://montrez-site.vercel.app (or your custom domain)
```

**Critical tests:**
- [ ] Video loads on first visit (cold cache)
- [ ] Video loads on refresh (warm cache)
- [ ] Mobile test (iOS Safari - autoplay restrictions)
- [ ] Mobile test (Android Chrome)
- [ ] Video plays without user interaction (autoplay works)
- [ ] Poster image shows before video loads
- [ ] Site continues if video fails to load

**Mobile iOS Safari test (CRITICAL):**
```
1. Open Safari on iPhone
2. Visit site
3. Video MUST have muted + playsInline attributes (already set)
4. Verify video plays automatically
5. If fails: Check Console for errors (Safari Dev Tools)
```

**Performance test:**
```
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run performance audit
4. Check metrics:
   - First Contentful Paint: <2s
   - Largest Contentful Paint: <3s
   - Video load time: <3s on Fast 3G
```

---

## Troubleshooting

### Video Doesn't Autoplay

**Symptoms:** Video poster shows, but video doesn't start

**Causes:**
1. Browser autoplay policy (especially Safari)
2. Missing `muted` attribute
3. Missing `playsInline` attribute (mobile)

**Fix:**
```jsx
// Ensure these attributes are set:
<video
  muted            // REQUIRED for autoplay
  playsInline      // REQUIRED for iOS
  autoPlay         // Triggers autoplay
  preload="auto"   // Start loading immediately
>
```

**Still not working?**
- Check browser console for errors
- Test in incognito mode (disable extensions)
- Verify video codec (H.264 is most compatible)

---

### Video File Too Large

**Symptoms:** Video loads slowly, >500KB file size

**Causes:**
1. Insufficient compression
2. High bitrate
3. Unoptimized export settings

**Fix (request from animator):**
```
Ask animator to re-export with:
- Target bitrate: 800-1000 kbps
- Two-pass encoding
- Remove audio track (if not needed)
- Use HandBrake or ffmpeg for aggressive compression
```

**DIY compression (if animator can't):**
```powershell
# Using ffmpeg (install first: choco install ffmpeg)
ffmpeg -i montrez-intro-final.mp4 -c:v libx264 -preset slow -crf 28 -b:v 800k -maxrate 1000k -bufsize 2000k -vf scale=1920:1080 -an montrez-intro-compressed.mp4

# Explanation:
# -crf 28: Compression quality (23=high, 28=balanced, 32=low)
# -b:v 800k: Target bitrate
# -maxrate 1000k: Max bitrate (prevents spikes)
# -an: Remove audio track
# -vf scale=1920:1080: Ensure correct resolution
```

---

### Video Quality Issues

**Symptoms:** Blocky, pixelated, or blurry video

**Causes:**
1. Over-compression
2. Wrong export settings
3. Bitrate too low

**Fix:**
- Request higher quality version from animator
- Target bitrate: 1000-1500 kbps (may exceed 500KB)
- Balance quality vs. file size
- Test if 600-700KB is acceptable (still loads fast)

**Acceptable trade-off:**
```
Option A: 450KB, lower quality (fast load, ok visuals)
Option B: 650KB, higher quality (slightly slower, great visuals)

Recommended: Option B (650KB) - Still fast on 4G, better brand impression
```

---

### Poster Image Not Showing

**Symptoms:** Blank screen before video loads

**Causes:**
1. Incorrect file path
2. Image not in public/images
3. Typo in filename

**Fix:**
```jsx
// Verify path matches actual file location
poster="/images/montrez-intro-poster.jpg"

// Check file exists:
// public/images/montrez-intro-poster.jpg
```

**Test poster separately:**
```html
<!-- Add temporary img tag to test -->
<img src="/images/montrez-intro-poster.jpg" alt="test" />
<!-- If image loads, path is correct -->
```

---

### Video Plays But Site Doesn't Load After

**Symptoms:** Video ends, but `onComplete()` not called

**Causes:**
1. Event listener not attached
2. Video duration mismatch
3. JavaScript error

**Fix:**
```jsx
// Verify this event listener exists:
video.addEventListener('ended', handleEnded)

// Check console for errors
console.log('Video ended, calling onComplete')
```

**Debug:**
```jsx
const handleEnded = () => {
  console.log('VIDEO ENDED - Transitioning to site')
  setTimeout(() => {
    console.log('Calling onComplete')
    onComplete()
  }, 500)
}
```

---

## Rollback Plan

If new video causes issues, rollback immediately:

```powershell
cd C:\Users\isaac\.openclaw\workspace\montrez-site

# Revert component changes
git checkout HEAD -- src/components/VideoIntro.jsx

# Remove new files (optional)
Remove-Item public/videos/montrez-intro-final.mp4
Remove-Item public/images/montrez-intro-poster.jpg

# Restore backup (if needed)
Copy-Item "public/videos/intro-pexels-compressed-BACKUP-*.mp4" "public/videos/intro-pexels-compressed.mp4"

# Commit rollback
git add .
git commit -m "revert: rollback to previous intro video due to [issue]"
git push origin main
```

**When to rollback:**
- Video won't play on iOS Safari (autoplay failure)
- File size causes poor mobile performance
- Quality issues (too compressed/blurry)
- Client rejects final result

---

## Performance Monitoring

### Post-Deploy Checklist (First 48 Hours)

**Monitor these metrics:**

1. **Load Time (Google Analytics or Vercel Analytics)**
   - Target: <3s First Contentful Paint
   - Check: Desktop vs. Mobile performance

2. **Bounce Rate**
   - Compare: Before vs. After video change
   - If bounce rate increases >10%: Investigate

3. **User Engagement**
   - Do users wait for video to finish?
   - Or skip/close immediately?
   - Tool: Hotjar or Microsoft Clarity (session recordings)

4. **Mobile Performance**
   - iOS vs. Android metrics
   - 4G vs. WiFi performance

**Red flags:**
- ⚠️ Bounce rate increases significantly
- ⚠️ Load time >5s on mobile
- ⚠️ High skip rate (users leaving during intro)
- ⚠️ Increased error rate in logs

**Green lights:**
- ✅ Load time <3s across devices
- ✅ Users watch full video (3-5s engagement)
- ✅ Smooth transition to site
- ✅ No increase in bounce rate

---

## Optimization (Post-Launch)

### Create Multiple Versions (Optional)

**If needed, create device-specific versions:**

```powershell
# Desktop version (higher quality, 650KB)
ffmpeg -i montrez-intro-final.mp4 -c:v libx264 -crf 23 -b:v 1200k montrez-intro-desktop.mp4

# Mobile version (lower quality, 350KB)
ffmpeg -i montrez-intro-final.mp4 -c:v libx264 -crf 28 -b:v 600k -vf scale=1280:720 montrez-intro-mobile.mp4
```

**Then use responsive loading:**
```jsx
<video ref={videoRef} muted playsInline autoPlay preload="auto" poster="/images/montrez-intro-poster.jpg">
  {/* Mobile: serve smaller file */}
  <source src="/videos/montrez-intro-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
  
  {/* Desktop: serve higher quality */}
  <source src="/videos/montrez-intro-desktop.mp4" type="video/mp4" />
</video>
```

---

### Add Analytics Tracking

Track video performance:

```jsx
useEffect(() => {
  const video = videoRef.current
  if (!video) return

  // Track video load time
  const loadStart = Date.now()
  
  const handleLoadedData = () => {
    const loadTime = Date.now() - loadStart
    console.log(`Video loaded in ${loadTime}ms`)
    
    // Send to analytics (if GA4 configured)
    if (window.gtag) {
      window.gtag('event', 'video_load', {
        load_time_ms: loadTime,
        video_name: 'intro_cinematic'
      })
    }
  }

  const handleEnded = () => {
    // Track completion
    if (window.gtag) {
      window.gtag('event', 'video_complete', {
        video_name: 'intro_cinematic'
      })
    }
    setTimeout(onComplete, 500)
  }

  video.addEventListener('loadeddata', handleLoadedData)
  video.addEventListener('ended', handleEnded)

  return () => {
    video.removeEventListener('loadeddata', handleLoadedData)
    video.removeEventListener('ended', handleEnded)
  }
}, [onComplete])
```

---

## Success Criteria

### Video is successful if:

✅ **Performance:**
- Loads in <3s on 4G
- File size <500KB (or <650KB if approved)
- Smooth 60fps playback

✅ **Functionality:**
- Autoplay works on all major browsers
- Works on iOS Safari (critical!)
- Poster image shows immediately
- Graceful fallback if video fails

✅ **Aesthetics:**
- Matches luxury brand identity
- Camera movements are smooth
- Lake and doors look realistic
- Color grading is premium

✅ **User Experience:**
- Doesn't feel like a slow loading screen
- Adds to brand perception (not annoying)
- Short enough to not frustrate users (3-5s)
- Smooth transition to main site

✅ **Business Impact:**
- No increase in bounce rate
- Positive client feedback
- Elevates brand perception
- Works across all devices

---

## Final Checklist

Before marking as COMPLETE:

- [ ] Video file <500KB (or approved size)
- [ ] Tested on desktop (Chrome, Safari, Firefox)
- [ ] Tested on mobile (iOS Safari, Android Chrome)
- [ ] Poster image loads instantly
- [ ] Autoplay works (muted + playsInline)
- [ ] Smooth transition to site after video
- [ ] No console errors
- [ ] Deployed to production
- [ ] Verified on live site
- [ ] Performance metrics acceptable
- [ ] Client approved final result
- [ ] Source files backed up
- [ ] Documentation updated

---

## Support & Maintenance

### Future Updates

**If you need to update the video:**
1. Contact original animator (if within warranty period)
2. Provide source files (`.blend`, `.aep`)
3. Request specific changes (e.g., seasonal version)
4. Follow this guide again for deployment

**Seasonal Variations (Optional Future Enhancement):**
- Winter: Snow on chateau, ice on lake
- Spring: Flowers around gates, green foliage
- Summer: Bright sunshine, clear blue water
- Fall: Autumn colors, leaves falling

**Cost:** $25-50 per variation (since base animation exists)

---

## Document Info

**Version:** 1.0  
**Created:** 2026-03-27  
**Project:** Montrez Luxury Streetwear  
**Status:** Ready for Implementation  

**Next Steps:**
1. Wait for animator delivery
2. Follow Step 1-8 in this guide
3. Test thoroughly before deploying
4. Monitor performance post-launch

