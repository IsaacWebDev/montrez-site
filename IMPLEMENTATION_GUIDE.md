# Implementation Guide: Luxury E-Commerce UX Patterns

## Tech Stack Recommendation

```json
{
  "Animation": {
    "Primary": "Framer Motion",
    "For timelines": "GSAP + ScrollTrigger",
    "As alternative": "React Spring"
  },
  "Scroll detection": "Intersection Observer API (native)",
  "CSS": "Tailwind + custom CSS for animations",
  "Build": "Next.js (Vercel-hosted, like current site)"
}
```

---

## 1. SCROLL-TRIGGERED ANIMATIONS

### Pattern: Content fades in as user scrolls into view

**Framer Motion Approach (Recommended for simplicity):**

```jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const FadeInOnScroll = ({ children }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true // Only animate once
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

// Usage
<FadeInOnScroll>
  <h2>Your content here</h2>
</FadeInOnScroll>
```

**Native Intersection Observer (Zero library, production-ready):**

```jsx
import { useEffect, useRef, useState } from 'react';

export const ScrollReveal = ({ children, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-600 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-5'
      }`}
    >
      {children}
    </div>
  );
};
```

**GSAP ScrollTrigger (For complex choreography):**

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ComplexScrollAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.product-item', {
        scrollTrigger: {
          trigger: '.product-grid',
          start: 'top center',
          end: 'bottom center',
          markers: false // set true for debugging
        },
        opacity: 1,
        duration: 0.8,
        stagger: 0.1 // 0.1s delay between each item
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <div className="product-grid">
        {/* Product items */}
      </div>
    </div>
  );
};
```

**CSS-only version (for simple cases):**

```css
.fade-in {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Trigger animation when in viewport using Intersection Observer JS */
.fade-in.visible {
  animation: fadeInUp 0.6s ease-out forwards;
}
```

**Performance checklist:**
- ✅ Use `will-change: opacity, transform` sparingly
- ✅ Avoid animating position (use `transform` instead)
- ✅ Test on iPhone SE, not just desktop
- ✅ Disable on `prefers-reduced-motion`

---

## 2. MAGNETIC/ATTRACTION BUTTONS

### Pattern: Button follows cursor on hover

**Pure JavaScript + CSS (Simplest):**

```jsx
import { useEffect, useRef } from 'react';

export const MagneticButton = ({ children, onClick }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      // Magnetic pull effect within 100px radius
      if (distance < 100) {
        const pull = (100 - distance) / 100;
        button.style.transform = `translate(${distanceX * pull * 0.3}px, ${distanceY * pull * 0.3}px)`;
      }
    };

    const handleMouseLeave = () => {
      button.style.transform = 'translate(0, 0)';
    };

    document.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className="px-6 py-3 bg-black text-white rounded-lg transition-transform duration-75 hover:bg-gray-800"
    >
      {children}
    </button>
  );
};

// Usage
<MagneticButton onClick={() => console.log('clicked')}>
  Add to Cart
</MagneticButton>
```

**Framer Motion + Gesture (More control):**

```jsx
import { motion } from 'framer-motion';
import { useState } from 'react';

export const MagneticButtonFramer = ({ children, onClick }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) * 0.2,
      y: (e.clientY - rect.top - rect.height / 2) * 0.2
    });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={mousePosition}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      onClick={onClick}
      className="px-6 py-3 bg-black text-white rounded-lg"
    >
      {children}
    </motion.button>
  );
};
```

**Performance:**
- ✅ Debounce mousemove listener (throttle to 16ms = 60fps)
- ✅ Only applies `transform` (GPU accelerated)
- ✅ Disable on mobile (no mouse)

**Accessibility:**
```jsx
export const AccessibleMagneticButton = ({ children, onClick }) => {
  // Check for prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    // Return standard button
    return <button onClick={onClick}>{children}</button>;
  }

  // Return magnetic button
  return <MagneticButton onClick={onClick}>{children}</MagneticButton>;
};
```

---

## 3. 3D CARD TILT EFFECTS

### Pattern: Product card tilts based on cursor position

**Using Tilt.js Library (Easiest):**

```jsx
import VanillaTilt from 'vanilla-tilt';
import { useEffect, useRef } from 'react';

export const TiltCard = ({ children }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    VanillaTilt.init(cardRef.current, {
      max: 25,
      scale: 1.05,
      speed: 400
    });
  }, []);

  return (
    <div ref={cardRef} style={{ transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  );
};

// Usage
<TiltCard>
  <img src="product.jpg" alt="Product" />
</TiltCard>
```

**Pure CSS + JavaScript (No library):**

```jsx
import { useRef } from 'react';

export const TiltCardManual = ({ children }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -25; // Max 25deg
    const rotateY = ((x - centerX) / centerX) * 25;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="transition-transform duration-200"
    >
      {children}
    </div>
  );
};
```

**Performance:**
- ✅ Throttle mousemove (16ms)
- ✅ Test on lower-end devices
- ✅ Disable on mobile (computationally expensive)

---

## 4. STAGGERED GRID ANIMATIONS

### Pattern: Product grid items animate in sequence

**Framer Motion Container + Children:**

```jsx
import { motion } from 'framer-motion';

export const StaggeredGrid = ({ items }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <motion.div
      className="grid grid-cols-3 gap-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          variants={itemVariants}
          className="bg-white p-4 rounded-lg"
        >
          {item.content}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Usage
<StaggeredGrid items={products} />
```

**Pure CSS version:**

```css
.grid-item {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.grid-item:nth-child(1) { animation-delay: 0.1s; }
.grid-item:nth-child(2) { animation-delay: 0.2s; }
.grid-item:nth-child(3) { animation-delay: 0.3s; }
/* etc. */

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Performance:**
- ✅ Excellent (CSS animations, minimal JS overhead)
- ✅ Works perfectly on all devices
- ✅ Use `will-change` on container, not items

---

## 5. CUSTOM CURSORS

### Pattern: Replace default cursor with branded icon

**Static custom cursor:**

```css
body {
  cursor: url('path/to/cursor.svg') 5 5, auto;
}

a,
button {
  cursor: url('path/to/pointer.svg') 10 5, pointer;
}
```

**Interactive cursor (scales on hover):**

```jsx
import { useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <style>{`
        body { cursor: none; }
        a, button { cursor: none; }
      `}</style>

      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: isHovering ? 'transform 0.2s' : 'none'
        }}
      >
        <div
          className={`w-4 h-4 border-2 border-black rounded-full transition-transform ${
            isHovering ? 'scale-150' : 'scale-100'
          }`}
        />
      </div>

      {/* Wrap interactive elements */}
      <InteractiveElements onHoverChange={setIsHovering} />
    </>
  );
};
```

**Performance:**
- ✅ Use SVG cursors (smaller than PNG)
- ✅ Keep cursor DOM simple (single div)
- ✅ Debounce mousemove

---

## 6. MICRO-INTERACTIONS

### Pattern: Hover effects, loading states, form feedback

**Button hover with scale + color:**

```jsx
export const InteractiveButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 bg-black text-white rounded-lg
        transition-all duration-200 ease-out
        hover:bg-gray-800 hover:scale-105 hover:shadow-xl
        active:scale-95
      `}
    >
      {children}
    </button>
  );
};
```

**Form field with focus animation:**

```jsx
export const AnimatedInput = ({ label, value, onChange }) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          w-full px-4 py-2 border-2 border-gray-300 rounded-lg
          transition-all duration-300
          ${isFocused ? 'border-black shadow-lg bg-yellow-50' : ''}
        `}
      />
      <label
        className={`
          absolute -top-2 left-2 px-2 bg-white transition-all
          ${isFocused || value ? 'text-sm text-black' : 'text-base text-gray-500'}
        `}
      >
        {label}
      </label>
    </div>
  );
};
```

**Add-to-cart animation:**

```jsx
import { motion } from 'framer-motion';

export const AddToCartButton = ({ onAdd }) => {
  const [added, setAdded] = React.useState(false);

  const handleClick = () => {
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.button
      onClick={handleClick}
      animate={added ? { scale: 0.95 } : { scale: 1 }}
      className="px-6 py-3 bg-black text-white"
    >
      {added ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          ✓ Added to Cart
        </motion.span>
      ) : (
        'Add to Cart'
      )}
    </motion.button>
  );
};
```

---

## 7. PARALLAX SCROLLING

### Pattern: Background scrolls slower than foreground

**CSS-only (Simple):**

```jsx
export const ParallaxSection = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(background.jpg)',
          backgroundAttachment: 'fixed' // Creates parallax effect
        }}
      />

      {/* Content overlaid */}
      <div className="relative z-10 flex items-center justify-center h-screen">
        <h1 className="text-4xl text-white">Our Collection</h1>
      </div>
    </div>
  );
};
```

**JavaScript version (More control):**

```jsx
import { useEffect, useRef } from 'react';

export const ParallaxHero = () => {
  const bgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      bgRef.current.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover"
        style={{ backgroundImage: 'url(background.jpg)' }}
      />
      <div className="relative z-10">Content</div>
    </div>
  );
};
```

**⚠️ Accessibility:**

```jsx
export const AccessibleParallax = () => {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    return <div className="bg-cover">Content</div>;
  }

  return <ParallaxHero />;
};
```

---

## 8. GLASSMORPHISM

### Pattern: Frosted glass effect for overlays

```css
.glassmorphism {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Dark variant */
.glassmorphism-dark {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

**React component:**

```jsx
export const GlassmorphicModal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <>
          {/* Backdrop blur */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Glass card */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="
                w-96 p-8 rounded-2xl
                bg-white bg-opacity-10 backdrop-blur-md
                border border-white border-opacity-20
                shadow-xl
              "
            >
              {children}
            </div>
          </div>
        </>
      )}
    </>
  );
};
```

**Performance:**
- ⚠️ Expensive on mobile (avoid)
- ✅ Use for non-critical overlays only
- ✅ Provide solid fallback

---

## ACCESSIBILITY CHECKLIST

```jsx
// 1. Respect prefers-reduced-motion
const canAnimate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 2. Ensure color contrast
// Use tools: https://webaim.org/resources/contrastchecker/
// Target: WCAG AA (4.5:1 for text, 3:1 for graphics)

// 3. Keyboard navigation
<button onKeyDown={(e) => e.key === 'Enter' && onClick()}>
  Interactive element
</button>

// 4. ARIA labels for animations
<motion.div aria-label="Loading...">
  Loading spinner
</motion.div>

// 5. Test with screen readers
// Use: NVDA (Windows), VoiceOver (Mac)

// 6. Don't convey meaning with animation alone
<div>
  <motion.span animate={{ x: 10 }}>✓</motion.span>
  Success! (text is necessary)
</div>
```

---

## PERFORMANCE OPTIMIZATION CHECKLIST

### Critical (Must have)
- ✅ Only animate `transform` and `opacity`
- ✅ Use CSS animations when possible
- ✅ Debounce scroll/resize listeners
- ✅ Use `will-change` sparingly (max 3-5 elements)
- ✅ Test on iPhone SE 2nd gen (baseline)

### Important
- ✅ Lazy-load animation libraries
- ✅ Use `requestAnimationFrame` for custom animations
- ✅ Monitor Core Web Vitals (LCP, CLS, FID)
- ✅ Profile with DevTools Performance tab

### Nice-to-have
- ✅ Use CSS custom properties for animation values
- ✅ Hardware accelerate with `translate3d(0,0,0)`
- ✅ Reduce motion on battery saver mode

---

## TESTING CHECKLIST

```bash
# Desktop browsers
- Chrome (latest + 2 versions back)
- Firefox (latest)
- Safari (latest)

# Mobile browsers
- iOS Safari (iPhone SE 2 minimum)
- Chrome Android (Moto G7 minimum)

# Accessibility
- NVDA (Windows) with animations
- VoiceOver (macOS) with animations
- Keyboard-only navigation
- Color contrast verification

# Performance
- Lighthouse score >90
- First Input Delay <100ms
- Cumulative Layout Shift <0.1
```

---

## RESOURCES & LIBRARIES

### Animation Libraries
- **Framer Motion** – https://www.framer.com/motion/
- **GSAP** – https://greensock.com/gsap/
- **React Spring** – https://www.react-spring.dev/
- **Motion One** – https://motion.dev/ (lightweight alternative)

### Tools
- **Vanilla Tilt** – https://micku7zu.github.io/vanilla-tilt.js/
- **AOS (Animate On Scroll)** – https://michalsnik.github.io/aos/
- **Lottie** – https://lottiefiles.com/ (for complex animations)

### Learning
- **Framer** – https://www.framer.com/ (official docs + tutorials)
- **Web Animation Performance** – https://web.dev/animations-guide/
- **WCAG 2.1** – https://www.w3.org/WAI/WCAG21/quickref/

---

## NEXT STEPS

1. ✅ **Start with scroll-triggered animations** (biggest impact, easy to implement)
2. ✅ **Add micro-interactions** to buttons/forms (improves UX, boosts perceived quality)
3. ✅ **Implement magnetic buttons** on key CTAs (playful, memorable)
4. ✅ **Add parallax** to hero (only if mobile fallback is solid)
5. ✅ **Test thoroughly** on real devices

See **QUICK_WINS_VS_BIG_BETS.md** for phased rollout plan.
