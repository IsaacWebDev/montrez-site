import { useEffect } from 'react'
import '../styles/Hero.css'

export default function Hero() {
  useEffect(() => {
    // Disable scroll animation on mobile for performance
    const isMobile = window.innerWidth <= 768
    if (isMobile) return
    
    // Respect user's reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    let scrollHandler = null
    let isSetup = false
    
    // Ensure element is in DOM before attaching listener
    const setupScrollAnimation = () => {
      if (isSetup) return
      
      const heroTitle = document.querySelector('.hero__title')
      const heroSubtitle = document.querySelector('.hero__subtitle')
      const heroCta = document.querySelector('.hero__cta')
      
      if (!heroTitle) {
        // Retry after a short delay if element not found
        setTimeout(setupScrollAnimation, 50)
        return
      }
      
      isSetup = true
      
      const handleScroll = () => {
        const scrollY = window.scrollY
        const maxScroll = 800 // Stop animation at ~800px (near product section)
        const scrollProgress = Math.min(scrollY / maxScroll, 1)
        
        if (scrollY < maxScroll) {
          // Parallax effect: move down at 0.5x scroll speed
          const translateY = scrollY * 0.5
          
          // CRITICAL FIX: Combine with translateZ(0) for GPU acceleration
          // The CSS has translateZ(0), so we must preserve it
          heroTitle.style.transform = `translateY(${translateY}px) translateZ(0)`
          
          // Gradual fade out
          const opacity = 1 - scrollProgress
          heroTitle.style.opacity = opacity
          

          
          // Also fade subtitle and CTA for cohesive effect
          if (heroSubtitle) heroSubtitle.style.opacity = opacity
          if (heroCta) heroCta.style.opacity = opacity
        }
      }
      
      // Throttle scroll events for performance
      let ticking = false
      scrollHandler = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll()
            ticking = false
          })
          ticking = true
        }
      }
      
      window.addEventListener('scroll', scrollHandler)
    }
    
    // Start setup
    setupScrollAnimation()
    
    // Cleanup function
    return () => {
      if (scrollHandler) {
        window.removeEventListener('scroll', scrollHandler)
      }
    }
  }, [])
  
  return (
    <>
      <section className="hero grain">
        {/* Side Fades (for portrait image in wide container) */}
        <div className="hero__side-fade-left" aria-hidden="true"></div>
        <div className="hero__side-fade-right" aria-hidden="true"></div>
        
        {/* Bottom Gradient Fade */}
        <div className="hero__bottom-fade" aria-hidden="true"></div>
        
        <div className="hero__content container">
          <div className="hero__text fade-in">
            <h1 className="hero__title">
              MONTRÉZ
            </h1>
            <p className="hero__subtitle">
              PAS POUR TOUT LE MONDE
            </p>
            <div className="hero__cta">
              <a href="#collections" className="btn btn-chrome">
                ENTER COLLECTION
              </a>
              <a href="#contact" className="btn">
                GET IN TOUCH
              </a>
            </div>
          </div>
        </div>
        
        <div className="hero__scroll">
          <span>Scroll</span>
          <svg width="20" height="30" viewBox="0 0 20 30">
            <path d="M10 5v15M10 20l-5-5M10 20l5-5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>
      </section>

      {/* Editorial 2-Column Image Section */}
      <section className="hero-editorial-grid">
        <div className="editorial-image editorial-image--left">
          <img 
            src="/images/editorial-back-tee.jpg" 
            alt="MONTRÉZ back graphic tee editorial shot"
            loading="lazy"
          />
        </div>
        <div className="editorial-image editorial-image--right">
          <img 
            src="/images/editorial-crystal-tracksuit.jpg" 
            alt="MONTRÉZ crystal tracksuit editorial shot"
            loading="lazy"
          />
        </div>
      </section>
    </>
  )
}
