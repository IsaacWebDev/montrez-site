# COLOR PALETTE
## MONTRÉZ Luxury Streetwear

**Brand Identity:** Minimalist European luxury - Black, White, Grey

---

## 🎨 PRIMARY COLORS

### Black (Primary)
```css
--color-black: #000000;
--color-black-rgb: 0, 0, 0;
```

**Usage:**
- Main text
- Backgrounds
- Primary CTAs
- Logo

**Variants:**
- `rgba(0, 0, 0, 0.95)` - Solid overlays
- `rgba(0, 0, 0, 0.7)` - Glass panels (dark)
- `rgba(0, 0, 0, 0.3)` - Subtle overlays
- `rgba(0, 0, 0, 0.1)` - Very light tint

---

### White (Secondary)
```css
--color-white: #FFFFFF;
--color-white-rgb: 255, 255, 255;
```

**Usage:**
- Text on dark backgrounds
- Card backgrounds
- Borders
- Highlights

**Variants:**
- `rgba(255, 255, 255, 0.95)` - Solid overlays
- `rgba(255, 255, 255, 0.2)` - Glass effect borders
- `rgba(255, 255, 255, 0.1)` - Subtle glassmorphism
- `rgba(255, 255, 255, 0.05)` - Light glass backgrounds

---

## 🌫️ GREY SCALE

### Dark Grey
```css
--color-grey-dark: #333333;
```
**Usage:** Hover states, secondary text

### Medium Grey (Accent)
```css
--color-grey-medium: #666666;
```
**Usage:** Primary buttons, hover effects, icons

### Light Grey
```css
--color-grey-light: #999999;
```
**Usage:** Disabled states, subtle borders, secondary info

### Very Light Grey
```css
--color-grey-very-light: #CCCCCC;
```
**Usage:** Input borders, dividers

### Off-White
```css
--color-off-white: #F5F5F5;
```
**Usage:** Card backgrounds, subtle sections

---

## ✨ GRADIENT DEFINITIONS

### Text Hover Gradient (Primary)
```css
.gradient-text {
  background: linear-gradient(
    90deg,
    #666666 0%,
    #999999 25%,
    #FFFFFF 50%,
    #999999 75%,
    #666666 100%
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

**Animation:**
```css
@keyframes gradient-slide {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

---

### Product Card Overlay Gradient
```css
.product-overlay {
  background: linear-gradient(
    135deg,
    transparent 0%,
    rgba(153, 153, 153, 0.15) 100%
  );
}
```

---

### Hero Bottom Fade
```css
.hero-fade {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 1) 100%
  );
}
```

---

## 🔲 GLASSMORPHISM VALUES

### Dark Glass Panel
```css
.glass-dark {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(20px) saturate(150%);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
```

### Light Glass Panel
```css
.glass-light {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
```

---

## 💫 SHADOW DEFINITIONS

### Elevated Shadow (Hover States)
```css
--shadow-elevated: 
  0 20px 40px rgba(0, 0, 0, 0.2),
  0 0 0 1px rgba(153, 153, 153, 0.3);
```

### Subtle Shadow (Default Cards)
```css
--shadow-subtle: 
  0 4px 20px rgba(0, 0, 0, 0.1);
```

### Strong Shadow (Modals)
```css
--shadow-strong: 
  0 30px 60px rgba(0, 0, 0, 0.4);
```

### Text Shadow (Hero on Image)
```css
--shadow-text: 
  0 4px 25px rgba(0, 0, 0, 0.9);
```

---

## 🎯 BUTTON COLOR SCHEMES

### Primary Button (Grey)
```css
.btn-primary {
  background: #666666;
  color: #FFFFFF;
  border: none;
}

.btn-primary:hover {
  background: #555555;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
```

### Secondary Button (Outline)
```css
.btn-secondary {
  background: transparent;
  color: #000000;
  border: 2px solid #000000;
}

.btn-secondary:hover {
  background: #666666;
  color: #FFFFFF;
  border-color: #666666;
}
```

### Ghost Button (Light Backgrounds)
```css
.btn-ghost {
  background: transparent;
  color: #FFFFFF;
  border: 2px solid #FFFFFF;
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #999999;
}
```

---

## 📱 RESPONSIVE COLOR ADJUSTMENTS

### Mobile Optimizations
```css
/* Lighter glass blur on mobile (performance) */
@media (hover: none) and (pointer: coarse) {
  .glass-panel {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
}

/* Higher contrast for small screens */
@media (max-width: 768px) {
  --color-grey-medium: #555555; /* Darker for better visibility */
}
```

---

## 🌙 DARK MODE (Optional Future Enhancement)

### Dark Mode Variables
```css
[data-theme="dark"] {
  --color-background: #000000;
  --color-text: #FFFFFF;
  --color-accent: #999999;
  --color-border: rgba(255, 255, 255, 0.1);
}

[data-theme="light"] {
  --color-background: #FFFFFF;
  --color-text: #000000;
  --color-accent: #666666;
  --color-border: rgba(0, 0, 0, 0.1);
}
```

---

## 🎨 CSS CUSTOM PROPERTIES (Full Set)

```css
:root {
  /* Base Colors */
  --color-black: #000000;
  --color-white: #FFFFFF;
  --color-grey-dark: #333333;
  --color-grey-medium: #666666;
  --color-grey-light: #999999;
  --color-grey-very-light: #CCCCCC;
  --color-off-white: #F5F5F5;
  
  /* Opacity Variants */
  --opacity-full: 1;
  --opacity-high: 0.95;
  --opacity-medium: 0.7;
  --opacity-low: 0.3;
  --opacity-very-low: 0.1;
  
  /* Shadows */
  --shadow-text: 0 4px 25px rgba(0, 0, 0, 0.9);
  --shadow-subtle: 0 4px 20px rgba(0, 0, 0, 0.1);
  --shadow-elevated: 0 20px 40px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(153, 153, 153, 0.3);
  --shadow-strong: 0 30px 60px rgba(0, 0, 0, 0.4);
  
  /* Glass Effects */
  --glass-bg-dark: rgba(0, 0, 0, 0.7);
  --glass-bg-light: rgba(255, 255, 255, 0.05);
  --glass-border-dark: rgba(255, 255, 255, 0.05);
  --glass-border-light: rgba(255, 255, 255, 0.1);
  --glass-blur: 20px;
  --glass-blur-mobile: 10px;
  
  /* Overlays */
  --overlay-dark: rgba(0, 0, 0, 0.7);
  --overlay-darker: rgba(0, 0, 0, 0.9);
  --overlay-light: rgba(255, 255, 255, 0.7);
}
```

---

## 🔍 USAGE EXAMPLES

### Navbar (Glass Effect)
```css
.navbar {
  background: var(--glass-bg-dark);
  backdrop-filter: blur(var(--glass-blur));
  border-bottom: 1px solid var(--glass-border-dark);
}
```

### Product Card Hover
```css
.product-card:hover {
  box-shadow: var(--shadow-elevated);
}
```

### Hero Text
```css
.hero__title {
  color: var(--color-white);
  text-shadow: var(--shadow-text);
}
```

### Button
```css
.btn-primary {
  background: var(--color-grey-medium);
  color: var(--color-white);
}

.btn-primary:hover {
  background: var(--color-grey-dark);
  box-shadow: var(--shadow-subtle);
}
```

---

## ✅ ACCESSIBILITY CONSIDERATIONS

### Contrast Ratios (WCAG 2.1 AA)

**Text on Backgrounds:**
- Black text on white: **21:1** ✅ (Passes AAA)
- White text on #666: **3.9:1** ✅ (Passes AA for large text)
- White text on black: **21:1** ✅ (Passes AAA)
- Grey (#999) on white: **2.8:1** ⚠️ (Use for large text only)

**Button States:**
- Primary button (#666 bg, white text): **3.9:1** ✅
- Primary button hover (#555 bg, white text): **4.6:1** ✅
- Secondary button (black border, white bg): **21:1** ✅

**Recommendations:**
- Use #666 (medium grey) for buttons, not body text
- For small text on grey, use #333 (dark grey) minimum
- Ensure hover states don't reduce contrast

---

## 🎯 BRAND CONSISTENCY CHECKLIST

When applying colors:
- [ ] Black/white/grey only (no other colors)
- [ ] Grey (#666) for primary CTAs
- [ ] Glass effects use specified rgba values
- [ ] Gradients limited to hovers/reveals
- [ ] Shadows match defined presets
- [ ] Contrast ratios meet WCAG AA minimum

---

**End of Color Palette**

*"Luxury is in the restraint. Three colors, infinite possibilities."*