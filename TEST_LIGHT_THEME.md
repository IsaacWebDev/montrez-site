# Light Theme Testing Checklist

## Quick Visual Test Guide

### 1. Hero Section (MOST CRITICAL)
**Expected: WHITE TEXT on dark background image**
- [ ] Hero title is WHITE and clearly visible
- [ ] Hero subtitle is WHITE and clearly visible  
- [ ] Hero buttons have WHITE borders and WHITE text
- [ ] Scroll indicator is WHITE
- [ ] Background image is visible with dark overlay
- [ ] All text has strong contrast against background

### 2. Navbar
**Expected: WHITE background with BLACK text**
- [ ] Navbar background is white/light
- [ ] Logo text is BLACK
- [ ] Hamburger menu lines are BLACK
- [ ] Cart/search icons are BLACK
- [ ] On scroll, navbar remains white

### 3. Hamburger Menu
**Expected: WHITE slide-out with BLACK text**
- [ ] Menu slides out with white background
- [ ] Menu links are BLACK
- [ ] Close button (X) is BLACK
- [ ] Tagline text is gray

### 4. Collections Section
**Expected: WHITE background, light gray cards**
- [ ] Section background is WHITE
- [ ] Collection cards have light gray (#f5f5f5) background
- [ ] Card titles are BLACK
- [ ] Card descriptions are gray (#666)
- [ ] "Explore" links are BLACK

### 5. Footer
**Expected: WHITE background with BLACK text**
- [ ] Footer background is white
- [ ] Logo/brand text is BLACK
- [ ] Section headings are BLACK
- [ ] Links are gray, turn black on hover
- [ ] Copyright text is gray

### 6. Shop Page
**Expected: WHITE background throughout**
- [ ] Page background is white
- [ ] Sidebar has light gray background
- [ ] Filter buttons are light gray, black when active
- [ ] Product cards have light gray backgrounds
- [ ] Product names are BLACK
- [ ] Prices are dark gray

### 7. Product Cards
**Expected: Light backgrounds, black text**
- [ ] Image wrapper has light gray background
- [ ] Product name is BLACK
- [ ] Price is dark gray (#666)
- [ ] "Quick View" button works

### 8. About Page
**Expected: WHITE background**
- [ ] Section background is white
- [ ] Headings are BLACK
- [ ] Body text is dark gray
- [ ] Value cards have light gray background

### 9. Contact Page
**Expected: WHITE background, light gray form**
- [ ] Page background is white
- [ ] Contact info text is black
- [ ] Form has light gray background
- [ ] Form inputs are white with black text
- [ ] Labels are gray
- [ ] Submit button is black

### 10. Common Elements
- [ ] All headings (h1-h6) are BLACK
- [ ] Body text is dark gray (#333)
- [ ] Links are BLACK, gray on hover
- [ ] Buttons: Black border/text, fill black on hover
- [ ] No white text anywhere EXCEPT hero section

## Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Chrome
- [ ] Mobile Safari

## Accessibility Check
- [ ] All text has sufficient contrast (WCAG AA minimum)
- [ ] Focus states are visible (black outlines)
- [ ] Hero text readable on background image

## Issue Resolution
If hero text is NOT WHITE (appears black):
1. Check Hero.css has `color: #ffffff !important`
2. Clear browser cache
3. Check for conflicting CSS

If anything appears dark theme:
1. Check that specific CSS file was updated
2. Verify color variables in theme.css
3. Clear cache and hard reload

## Expected Behavior Summary
- **Default:** Light theme everywhere (white bg, black text)
- **Exception:** Hero section only (white text on dark image)
- **Buttons:** Black borders/text, fill black on hover
- **Cards:** Light gray (#f5f5f5) backgrounds
- **Navbar:** White with black elements
