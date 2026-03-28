# Luxury Intro Animation - Visual Reference Guide

## Animation Phases (Visual Breakdown)

### Phase 1: Gate Opening (0-3 seconds)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│         ████████████████      ████████████████              │
│         ████████████████      ████████████████              │
│         ████████████████      ████████████████              │
│         ████ GATES  ████      ████ OPENING ████             │
│         ████████████████      ████████████████              │
│         ████████████████      ████████████████              │
│         ████████████████      ████████████████              │
│                                                             │
│                    M O N T R E Z                            │
│                   (Elegant logo text)                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Animation: Gates swing outward (scaleX + translateX)
Effect: Iron gates part in the middle, revealing...
```

### Phase 2: Camera Zoom to Lake (3-6 seconds)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ██                                              ██        │
│   ██      🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊      ██        │
│   ██      🌊  L A K E   V I E W  🌊      ██        │
│   ██      🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊      ██        │
│   ██         (Lake background)           ██        │
│   ██      🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊      ██        │
│   ██      🌊  Blue gradient  🌊          ██        │
│   ██      🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊      ██        │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Animation: Scale 1.0 → 1.5 (zoom in effect)
Effect: Camera pushes through gates, lake fills screen
Logo: Fades out during zoom
```

### Phase 3: Chateau Doors Opening (6-9 seconds)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│             🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊                 │
│             🌊  Lake background  🌊                         │
│             🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊                 │
│                                                             │
│          ┌──────────┐    ┌──────────┐                      │
│          │ CHATEAU  │    │  DOORS   │                      │
│          │  DOOR    │ ←→ │ OPENING  │                      │
│          │  LEFT    │    │  RIGHT   │                      │
│          │ (Wood)   │    │ (Wood)   │                      │
│          └──────────┘    └──────────┘                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Animation: Doors rotateY (3D opening effect)
Effect: Chateau entrance doors swing inward
Perspective: 3D transformation (left: -90deg, right: +90deg)
```

### Phase 4: Fade to Website (9-10 seconds)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                                                             │
│                                                             │
│                      ░░░░░░░░░░                             │
│                   ░░░░░░░░░░░░░░░                          │
│                ░░░ FADE TO WHITE ░░░                        │
│                   ░░░░░░░░░░░░░░░                          │
│                      ░░░░░░░░░░                             │
│                                                             │
│              → Main website loads here ←                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Animation: White overlay opacity 0 → 1
Effect: Smooth fade transition to main site
Final: User sees Montrez homepage (Hero section)
```

## Layer Stack (Z-Index Order)

```
┌─────────────────────────────────────────────────┐
│  Z-400: Skip Button (top right)                │  ← Clickable
├─────────────────────────────────────────────────┤
│  Z-300: Fade to White Overlay                  │
├─────────────────────────────────────────────────┤
│  Z-200: MONTREZ Logo                           │
├─────────────────────────────────────────────────┤
│  Z-100: Iron Gates (Left + Right)              │
├─────────────────────────────────────────────────┤
│  Z-50:  Chateau Doors (Left + Right)           │
├─────────────────────────────────────────────────┤
│  Z-1:   Chateau Exterior                       │
├─────────────────────────────────────────────────┤
│  Z-0:   Lake Background (base layer)           │
└─────────────────────────────────────────────────┘
```

## Color Palette (Placeholders)

### Iron Gates
```
#1a1a1a  ████  Dark iron
#2d2d2d  ████  Mid iron
#0a0a0a  ████  Very dark
```

### Lake Background
```
#1a4d5e  ████  Deep lake blue
#2d6a7e  ████  Mid lake blue
#4a8a9e  ████  Light water
#87ceeb  ████  Sky blue
```

### Chateau Stone
```
#2a2520  ████  Dark stone
#4a3f35  ████  Mid stone
```

### Chateau Doors
```
#3d2817  ████  Rich wood brown
#5a3a22  ████  Mid wood
#2a1810  ████  Very dark wood
```

### UI Elements
```
#ffffff  ████  White (logo, skip button text)
rgba(255,255,255,0.1)  Glass effect (skip button)
```

## Typography

**Logo:**
- Font: Times New Roman (serif)
- Size: 4rem (desktop), 2.5rem (mobile)
- Weight: 300 (light)
- Spacing: 0.3em letter-spacing
- Color: White with glow effect

**Skip Button:**
- Font: System sans-serif
- Size: 14px (desktop), 12px (mobile)
- Weight: 500
- Color: White

## Motion Curves

All animations use:
```
transition: { duration: 3, ease: 'easeInOut' }
```

**Gate opening:** Smooth swing (scaleX + translateX)
**Camera zoom:** Gradual scale increase
**Doors opening:** 3D rotation (rotateY)
**Fade transition:** Linear opacity

## Responsive Breakpoints

**Desktop (>768px):**
- Full animation
- 3D effects enabled
- All layers visible

**Mobile (≤768px):**
- Simplified 3D (reduced perspective)
- Smaller text
- Same timeline

**Reduced Motion:**
- All animations disabled
- Instant transitions

## Skip Button Behavior

**Appearance:**
- Bottom right corner (40px from edges)
- Glass morphism effect
- Fade in after 2 seconds

**States:**
```
Default:  rgba(255,255,255,0.1) background
Hover:    rgba(255,255,255,0.2) background
          translateY(-2px) lift effect
```

## Technical Implementation

**Framer Motion Variants:**
- `initial`: Starting state
- `animate`: Target state
- `exit`: Removal state
- `transition`: Timing function

**Performance:**
- `will-change: transform, opacity` (GPU acceleration)
- `backface-visibility: hidden` (3D optimization)
- 60fps target on all devices

## Testing Checklist

- [ ] Gates open smoothly (3s)
- [ ] Lake reveals behind gates
- [ ] Camera zoom feels natural (3s)
- [ ] Chateau visible during zoom
- [ ] Doors open with 3D effect (3s)
- [ ] White fade transition smooth (1s)
- [ ] Skip button appears after 2s
- [ ] Skip button works immediately
- [ ] Mobile version loads/performs well
- [ ] No jank or stuttering

## Future Enhancement Ideas

**If adding real images:**
1. Progressive image loading (blur-up)
2. WebP format with JPG fallback
3. Lazy load non-critical layers
4. Preload critical images

**If switching to video:**
1. 10-second MP4 (H.264)
2. WebM version (smaller)
3. Poster frame (first frame)
4. Skip button overlay

**Premium touches:**
1. Sound effects (gate creak, door open)
2. Particle effects (dust, light rays)
3. Parallax scrolling layers
4. Dynamic lighting

---

**Current Status:** Working with premium gradient placeholders
**Ready for:** Client image assets OR deploy as-is
