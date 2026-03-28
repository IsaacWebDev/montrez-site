# MONTREZ - Cinematic Chateau Intro Video Specification

## Project Overview
Create a luxury fashion brand intro animation featuring an ornate iron gate opening, camera zoom through a scenic lake, and dramatic chateau doors opening before fading to the main website.

**Client:** Montrez (Luxury Streetwear Brand)  
**Style Reference:** High-end fashion brands (Dior, Chanel, Louis Vuitton)  
**Total Duration:** 3-5 seconds maximum  
**Priority:** MEDIUM-HIGH

---

## 🎬 STORYBOARD SEQUENCE

### Scene 1: Ornate Iron Gates (0-1s)
**Visual:**
- Camera starts positioned directly facing ornate iron gates
- Gates are the primary focal point, filling most of frame
- Dark, elegant iron with intricate scrollwork and luxury details
- Slightly misty/atmospheric (add subtle fog/mist overlay)
- "MONTREZ" logo subtly embedded in gate design or floating overlay

**Camera Movement:**
- Static for first 0.5s
- Gates begin to slowly swing open (hinged at sides)

**Lighting:**
- Soft, diffused lighting from behind camera
- Slight glow/rim light from behind gates (teasing what's beyond)
- Golden hour aesthetic (warm, luxurious tones)

**Color Grading:**
- Deep blacks and rich golds
- Desaturated slightly for high-fashion feel
- Film grain texture overlay (subtle)

---

### Scene 2: Camera Zoom Forward - Lake Reveal (1-2.5s)
**Visual:**
- As gates open, camera begins smooth forward zoom
- **Lake appears gradually between gates and chateau**
- Lake should be elegant, reflective, serene
- Surface shows soft ripples (NOT choppy water)
- Chateau visible in distance beyond lake (still small/far)
- Maintain atmospheric mist/fog around lake edges

**Camera Movement:**
- Smooth dolly zoom forward (NOT a jarring zoom)
- Speed: Slow and deliberate (cinematic, not rushed)
- Height: Eye-level, gradually ascending slightly as it moves forward
- Camera crosses "threshold" of gate around 1.5s mark

**Lake Details:**
- Mirror-like reflections of sky and chateau
- Subtle golden/blue color palette
- Light shimmer/sparkle on water surface
- Optional: Single white swan or elegant element (NOT required)

**Lighting:**
- Transition from gate lighting to open landscape lighting
- Sky visible (golden hour, soft clouds)
- Water reflects sky colors

---

### Scene 3: Crossing Lake - Chateau Approach (2.5-4s)
**Visual:**
- Camera continues forward movement across lake
- Chateau grows larger in frame (approaching)
- Chateau architecture becomes visible: French Renaissance style
- **Focus on massive ornate wooden doors at entrance**
- Building should feel imposing yet elegant

**Chateau Architecture:**
- French/European luxury estate
- Light stone facade (cream/beige tones)
- Ornate window frames and architectural details
- Symmetrical design (centered doors)
- Possible small balconies or decorative elements

**Camera Movement:**
- Continues smooth forward dolly
- Slight upward tilt as chateau fills frame
- Camera height rises slightly (approaching entrance level)

**Transition:**
- By 3.5s, camera is directly facing chateau doors
- Doors begin to open at ~3.5s mark

---

### Scene 4: Chateau Doors Open (4-5s)
**Visual:**
- **Massive ornate wooden doors dramatically swing open**
- Doors are heavy, majestic, detailed (carved wood, gold accents)
- Doors open outward toward camera (NOT sliding)
- Opening should feel grand and welcoming

**Interior Glimpse (Optional Enhancement):**
- Brief glimpse of interior: marble floors, chandelier, luxury
- Warm golden light spills out from interior
- NOT fully lit interior (keep mysterious/elegant)

**Camera Movement:**
- Final push forward through doorway
- Camera enters threshold
- Slight slow-down as doors fully open (moment of pause)

**Lighting:**
- Warm interior light contrasts with exterior
- Light spills onto camera lens (subtle lens flare OK)
- Maintains cinematic/film quality look

---

### Scene 5: Fade to Site (5s)
**Transition:**
- Smooth fade to white (elegant, not abrupt)
- **OR** Fade to website's hero section directly
- Duration: 0.5-1s fade
- Website should load seamlessly after fade

**Logo Integration:**
- "MONTREZ" logo visible during fade (optional)
- OR logo has been subtly present throughout (top/center overlay)

---

## 📐 TECHNICAL SPECIFICATIONS

### Video Format
- **Resolution:** 1920x1080 (Full HD minimum)
- **Frame Rate:** 60fps (smooth cinematic motion)
- **Aspect Ratio:** 16:9 (standard web video)
- **Codec:** H.264 (MP4 container)
- **File Size Target:** <500KB (CRITICAL for web performance)
  - Use high-quality compression (ffmpeg, HandBrake, Adobe Media Encoder)
  - Prioritize smooth playback over perfect quality if needed
  - Test file size before final delivery

### Duration
- **Total Length:** 3-5 seconds maximum (prefer 4-5s)
- **Pacing:** Smooth, not rushed
- **No silence gaps** (continuous animation)

### Audio
- **Background Music:** Optional subtle luxury ambiance (strings, soft piano)
  - If included: very low volume, fade out before website loads
  - Prefer NO audio (auto-play restrictions on web)
- **Sound Effects:** Optional door creaking, ambient sounds
  - If included: subtle and high-quality
  - Must not interfere with website audio

### File Optimization
- **Compress aggressively** but maintain visual quality
- **Two-pass encoding** recommended
- **Variable bitrate (VBR)** for smaller file size
- **Remove audio track** if not essential (saves ~30-40%)
- **Test on mobile**: Must load quickly on 4G

---

## 🎨 VISUAL STYLE GUIDE

### Color Palette
- **Primary:** Deep blacks, rich golds, cream/ivory
- **Accent:** Soft blues (lake), warm amber (lighting)
- **Avoid:** Bright colors, overly saturated tones

### Aesthetic References
- **Fashion:** Dior, Chanel, Louis Vuitton brand films
- **Architecture:** Versailles, French chateaux
- **Cinematography:** Wes Anderson symmetry, high-fashion commercials
- **Mood:** Elegant, mysterious, exclusive, aspirational

### Lighting Style
- **Natural:** Golden hour, soft diffused light
- **Contrast:** Deep shadows, glowing highlights
- **No harsh lighting** or flat/clinical looks

### Texture & Effects
- **Film grain:** Subtle (2-5% opacity)
- **Vignette:** Soft edges (optional)
- **Color grading:** Cinematic LUT (warm shadows, cool highlights)
- **Motion blur:** Natural (camera movement)
- **Depth of field:** Slight bokeh on background elements

---

## 🛠️ PRODUCTION METHODS

### Option A: 3D Animation (RECOMMENDED)
**Software:** Blender, Cinema 4D, 3ds Max

**Workflow:**
1. Model iron gates, lake environment, chateau exterior
2. Rig doors for opening animations
3. Set up camera path (smooth dolly zoom)
4. Add water simulation (calm reflections)
5. Lighting setup (HDRI golden hour)
6. Render with realistic materials
7. Composite in After Effects (film grain, color grade)
8. Export & compress

**Pros:**
- Full creative control
- Photorealistic results
- Can iterate easily
- Best quality

**Cons:**
- Most time-intensive (2-5 days for experienced artist)
- Requires 3D modeling skills
- Render time (GPU required)

**Cost Estimate (Freelancer):** $100-200

---

### Option B: Live-Action + VFX Compositing
**Software:** After Effects, Premiere Pro, DaVinci Resolve

**Workflow:**
1. Source stock footage:
   - Ornate iron gates opening (Shutterstock, Envato, Pond5)
   - Scenic lake/reflection shots
   - Chateau/mansion exterior
   - Door opening footage
2. Composite layers in After Effects
3. Add smooth camera zoom effects
4. Color grade for consistency
5. Add film grain and effects
6. Export & compress

**Pros:**
- Faster turnaround (1-2 days)
- Photorealistic (real footage)
- Lower cost
- Less technical skill required

**Cons:**
- Limited by stock footage availability
- May lack perfect continuity
- Harder to achieve exact vision

**Cost Estimate (Freelancer):** $50-100

---

### Option C: CSS/WebGL Animation (NOT RECOMMENDED FOR THIS)
**Why Not:**
- Cannot achieve photorealistic lake/chateau
- File size would likely be LARGER (3D assets)
- Browser performance issues
- Much more complex development
- Lacks luxury aesthetic quality

**Only consider if:**
- Budget is $0 and no video skills available
- Interactive elements needed
- Website is already heavily WebGL-based

---

## 📦 DELIVERABLES

### Required Files
1. **Final video file:**
   - `montrez-intro-final.mp4`
   - H.264, 1080p, 60fps
   - <500KB file size
   - Muted (no audio) OR very subtle audio track

2. **Fallback poster image:**
   - `montrez-intro-poster.jpg`
   - 1920x1080 resolution
   - Shows first frame (iron gates)
   - <100KB file size
   - For slow connections or video load failures

3. **Source files (optional but appreciated):**
   - Blender/C4D project files
   - After Effects compositions
   - Raw footage used
   - For future edits/variations

### Integration Instructions
**Current Implementation:**
```jsx
// src/components/VideoIntro.jsx
<video
  ref={videoRef}
  muted
  playsInline
  autoPlay
  preload="auto"
  poster="/images/montrez-intro-poster.jpg"
>
  <source src="/videos/montrez-intro-final.mp4" type="video/mp4" />
</video>
```

**Developer Notes:**
- Replace `/videos/intro-pexels-compressed.mp4` with new file
- Update poster image path
- Test autoplay on iOS (requires `muted` + `playsInline`)
- Verify file loads in <3s on 4G connection
- Add fallback: if video fails to load after 10s, skip to site

---

## 🎯 SUCCESS CRITERIA

### Must-Have (Required)
✅ Smooth camera movement (no jitter or jarring cuts)  
✅ Lake appears naturally between gates and chateau  
✅ Doors open dramatically (majestic, not cartoonish)  
✅ Luxury/high-fashion aesthetic throughout  
✅ File size <500KB  
✅ 1080p resolution minimum  
✅ 60fps smooth playback  
✅ 3-5 second duration  
✅ Works on mobile (autoplay compatible)  

### Nice-to-Have (Bonus)
⭐ Film grain texture  
⭐ Subtle "MONTREZ" logo integration  
⭐ Realistic water reflections  
⭐ Interior glimpse when doors open  
⭐ Subtle background music (if web-safe)  
⭐ Extra compressed version (<300KB) for mobile  

### Deal-Breakers (Avoid)
❌ Choppy/laggy animation  
❌ Unrealistic or cheap-looking effects  
❌ File size >1MB  
❌ Generic stock footage look  
❌ Bright/oversaturated colors  
❌ Fast-fashion aesthetic (Zara/H&M style)  
❌ Visible watermarks  

---

## 💰 BUDGET & TIMELINE

### Recommended Budget
- **Low:** $50-75 (stock footage + basic compositing)
- **Medium:** $100-150 (custom 3D elements + professional grade)
- **High:** $200-300 (full custom 3D animation, multiple revisions)

**Recommended:** $100-150 range for best quality/speed balance

### Timeline
- **Option A (3D):** 3-5 business days
- **Option B (Stock + VFX):** 1-2 business days
- **Revisions:** 1-2 rounds included

### Where to Hire
1. **Fiverr** (Budget-friendly, wide selection)
   - Search: "luxury brand intro video" OR "3D animation intro"
   - Filter: Pro sellers, 4.9+ rating, video production category
   - Price range: $50-200

2. **Upwork** (Higher quality, professional)
   - Search: "motion graphics designer" OR "3D animator"
   - Look for: After Effects + Blender experience
   - Price range: $75-150

3. **Behance/Dribbble** (Premium quality)
   - Find portfolio first, then reach out directly
   - Best for high-end results
   - Price range: $150-300

### Hiring Brief Template
```
Title: Luxury Fashion Brand Intro Animation (3-5s)

Description:
I need a cinematic intro video for a luxury streetwear brand (MONTREZ). 
The animation should feature:
- Ornate iron gates opening
- Camera zoom through scenic lake
- Dramatic chateau doors opening
- Fade to website

Style: High-end fashion (Dior/Chanel aesthetic)
Duration: 3-5 seconds
Format: 1080p MP4, 60fps, <500KB
Budget: $100-150

Please see attached specification document for full details.
Deliverable: Final MP4 + poster image + source files

Timeline: 3-5 days preferred
Revisions: 1-2 rounds included

Please share portfolio examples of similar luxury brand work.
```

---

## 📋 QUALITY CHECKLIST

Before final delivery, verify:

**Technical:**
- [ ] Resolution: 1920x1080 or higher
- [ ] Frame rate: 60fps
- [ ] File size: <500KB (critical!)
- [ ] Format: MP4 (H.264 codec)
- [ ] No audio issues (muted OR subtle volume)
- [ ] Autoplay works (test on iOS Safari)
- [ ] Loads in <3s on 4G

**Visual:**
- [ ] Camera movement is smooth (no jitter)
- [ ] Lake appears naturally in sequence
- [ ] Doors open dramatically (good timing)
- [ ] Color grading matches luxury aesthetic
- [ ] No visible artifacts or compression glitches
- [ ] Film grain (if included) is subtle
- [ ] Lighting looks natural and high-end

**Branding:**
- [ ] Feels premium/exclusive
- [ ] Matches MONTREZ brand identity
- [ ] "MONTREZ" logo visible (if included)
- [ ] No competitor branding visible

**User Experience:**
- [ ] Not too long (keeps user engaged)
- [ ] Smooth transition to website
- [ ] Poster image loads instantly
- [ ] Works on mobile devices
- [ ] Doesn't feel like "skip this" moment

---

## 🔄 REVISION PROCESS

### Round 1 Feedback (Expected)
Likely changes:
- Timing adjustments (faster/slower camera)
- Color grading tweaks
- Door opening speed
- Lake reflections intensity
- Logo placement/visibility

### Round 2 (Polish)
- Final compression optimization
- Minor visual tweaks
- Cross-browser testing

### Red Flags (Request Changes)
- File size >1MB
- Laggy/choppy animation
- Looks generic or stock-like
- Colors too bright/wrong tone
- Camera movement feels unnatural

---

## 📞 CONTACT & SUPPORT

**Project Owner:** Isaac (Montrez)  
**Developer Handoff:** Once video delivered, update `VideoIntro.jsx`  
**Testing Required:** Desktop (Chrome, Safari, Firefox) + Mobile (iOS Safari, Android Chrome)

**Questions for Animator:**
- Can you provide 2 versions? (Standard <500KB, Ultra-compressed <300KB for mobile)
- Will source files be included for future edits?
- How many revision rounds included?
- Can you match the attached color palette exactly?

---

## 🎨 REFERENCE MATERIALS

### Visual References (Attach if hiring)
1. Current intro video: `/videos/intro-pexels-compressed.mp4` (for timing reference)
2. Brand colors: Deep blacks, rich golds, cream tones
3. Architectural style: French Renaissance chateaux
4. Lake aesthetic: Calm, reflective, golden hour lighting
5. Door style: Ornate wooden double doors with gold accents

### Competitor Inspiration
- Gucci brand films (cinematic quality)
- Dior runway intros (elegance)
- Louis Vuitton travel films (luxury aesthetic)
- Burberry seasonal campaigns (refined, classic)

### Avoid These Styles
❌ Fast fashion (H&M, Zara) - too commercial  
❌ Tech startup intros - too modern/minimal  
❌ Sports brands - too energetic  
❌ Gaming intros - too flashy/aggressive  

---

## 🚀 DEPLOYMENT PLAN

### Step 1: Receive Files
- Download `montrez-intro-final.mp4` + poster image
- Verify file size and quality

### Step 2: Upload to Project
```bash
# Copy to public directory
cp montrez-intro-final.mp4 C:\Users\isaac\.openclaw\workspace\montrez-site\public\videos\
cp montrez-intro-poster.jpg C:\Users\isaac\.openclaw\workspace\montrez-site\public\images\
```

### Step 3: Update Component
```jsx
// src/components/VideoIntro.jsx
<video
  ref={videoRef}
  muted
  playsInline
  autoPlay
  preload="auto"
  poster="/images/montrez-intro-poster.jpg"
>
  <source src="/videos/montrez-intro-final.mp4" type="video/mp4" />
</video>
```

### Step 4: Test Locally
```bash
npm run dev
# Open localhost, verify video plays smoothly
# Test on phone (network throttling)
```

### Step 5: Deploy
```bash
git add public/videos/montrez-intro-final.mp4 public/images/montrez-intro-poster.jpg src/components/VideoIntro.jsx
git commit -m "feat: upgrade intro video with cinematic chateau animation"
git push origin main
# Vercel auto-deploys
```

### Step 6: Verify Production
- Visit live site: montrez-site.vercel.app
- Test desktop + mobile
- Check load time (<3s)
- Verify autoplay works

---

## 📊 CURRENT vs. NEW COMPARISON

### Current Video (`intro-pexels-compressed.mp4`)
- **Duration:** 5 seconds
- **Resolution:** 1280x2276 (vertical!)
- **Frame Rate:** 25fps
- **File Size:** 398KB ✅
- **Style:** Generic stock footage (person walking)
- **Issues:** Vertical orientation, not branded, low-fps

### New Video (Target Specs)
- **Duration:** 3-5 seconds
- **Resolution:** 1920x1080 (proper web ratio)
- **Frame Rate:** 60fps (cinematic smooth)
- **File Size:** <500KB
- **Style:** Custom luxury brand animation
- **Improvements:** Branded, horizontal, high-fps, aligned with MONTREZ identity

---

## ✅ FINAL NOTES

**Priority Level:** MEDIUM-HIGH  
- Current video works, so this is an upgrade (not urgent fix)
- Client specifically requested this enhancement
- Will significantly improve brand perception
- Worth investing $100-150 for professional result

**Timeline:** 5-7 days total (3-5 days production + 2 days revisions)

**Next Steps:**
1. Review this spec document
2. Decide on budget ($50-150 range)
3. Post job on Fiverr/Upwork with spec attached
4. Review 2-3 animator portfolios
5. Hire best match
6. Provide feedback on first draft
7. Finalize and deploy

**Alternative:** If budget is $0, use Option B with free stock footage from Pexels/Pixabay (lower quality but functional)

---

**Document Version:** 1.0  
**Created:** 2026-03-27  
**Project:** Montrez Luxury Streetwear  
**Status:** Ready for Animator Handoff  

---

