import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import '../styles/LandingPage.css'

export default function LandingPage({ onEnter }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Fade in on mount
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const handleEnter = () => {
    setIsVisible(false)
    setTimeout(() => {
      onEnter()
    }, 800) // Smoother transition
  }

  return (
    <div className={`landing-page-wrapper ${isVisible ? 'visible' : ''}`}>
      {/* High-Quality Gate Background Image */}
      <div className="landing-background-image"></div>
      
      {/* Premium Dark Gradient Overlay */}
      <div className="landing-dark-overlay"></div>
      
      {/* Grain Texture for Luxury Feel */}
      <div className="landing-grain grain" aria-hidden="true"></div>
      
      {/* Animated Content (Logo + Tagline + Button) */}
      <motion.div 
        className="landing-center-content"
        initial={{ 
          opacity: 0,
          x: '-50%',
          y: '-50%'
        }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          x: '-50%',
          y: '-50%'
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%'
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.h1 
          className="landing-brand-logo"
          initial={{ opacity: 0, letterSpacing: '0.3em' }}
          animate={{ 
            opacity: isVisible ? 1 : 0, 
            letterSpacing: isVisible ? '0.15em' : '0.3em' 
          }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          MONTREZ
        </motion.h1>
        
        <motion.p 
          className="landing-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          PAS POUR TOUT LE MONDE
        </motion.p>
        
        <motion.button 
          className="landing-enter-button" 
          onClick={handleEnter}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: isVisible ? 1 : 0, 
            scale: isVisible ? 1 : 0.9 
          }}
          transition={{ delay: 0.9, duration: 0.6 }}
          whileHover={{ scale: 1.05, letterSpacing: '0.3em' }}
          whileTap={{ scale: 0.98 }}
        >
          ENTER
        </motion.button>
      </motion.div>
    </div>
  )
}
