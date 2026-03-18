# MONTREZ - Editorial Images Integration TODO

## Images to Add

The following images need to be copied to the project:

### 1. Gate Image (file_421)
- **Destination:** `public/images/landing-gate.jpg`
- **Usage:** LandingPage.jsx - Background image
- **Current Status:** ⚠️ File needs to be located and copied
- **Search locations:**
  - OneDrive/Documents/solvexai/customers/
  - Downloads folder
  - Desktop

### 2. Instagram Editorial 1 (file_423)
- **Destination:** `public/images/editorial-1.jpg`
- **Usage:** Hero.jsx or About.jsx - Featured editorial content
- **Current Status:** ⚠️ File needs to be located and copied

### 3. Instagram Editorial 2 (file_424)
- **Destination:** `public/images/editorial-2.jpg`
- **Usage:** Hero.jsx or About.jsx - Featured editorial content
- **Current Status:** ⚠️ File needs to be located and copied

## How to Add Images

1. Locate the files (file_421, file_423, file_424)
2. Copy to appropriate paths in `public/images/`
3. Update components:

### LandingPage.jsx
```jsx
// Replace line with gate image background
<div 
  className="landing-background gate-image"
  style={{ backgroundImage: 'url(/images/landing-gate.jpg)' }}
>
```

### Hero.jsx or About.jsx
```jsx
// Add editorial images to gallery/showcase
<img src="/images/editorial-1.jpg" alt="MONTREZ Editorial Feature" />
<img src="/images/editorial-2.jpg" alt="MONTREZ Editorial Feature" />
```

## Directory Structure Created
```
public/
  images/        ✅ Created
  videos/        ✅ Created
    intro.mp4    ✅ Copied (20.1MB)
```

## Next Steps
1. Find and copy image files
2. Update LandingPage.jsx background
3. Integrate editorial images in Hero/About components
4. Test image loading and optimization
