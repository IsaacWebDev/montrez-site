import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './IntroAnimation.css'

export default function IntroAnimation({ onComplete }) {
  const [currentPhase, setCurrentPhase] = useState('gate-opening')
  const [showSkip, setShowSkip] = useState(false)

  useEffect(() => {
    // Show skip button after 2 seconds
    const skipTimer = setTimeout(() => setShowSkip(true), 2000)

    // Phase timeline
    const gateTimer = setTimeout(() => setCurrentPhase('zoom-lake'), 3000) // 0-3s: Gate opens
    const zoomTimer = setTimeout(() => setCurrentPhase('doors-opening'), 6000) // 3-6s: Zoom to lake
    const doorsTimer = setTimeout(() => setCurrentPhase('fade-to-site'), 9000) // 6-9s: Doors open
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete()
    }, 10000) // 9-10s: Fade to site

    return () => {
      clearTimeout(skipTimer)
      clearTimeout(gateTimer)
      clearTimeout(zoomTimer)
      clearTimeout(doorsTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  const handleSkip = () => {
    if (onComplete) onComplete()
  }

  return (
    <div className="intro-animation-container">
      {/* Background Lake (visible after gate opens) */}
      <motion.div
        className="intro-layer intro-lake"
        initial={{ opacity: 0, scale: 1 }}
        animate={{
          opacity: currentPhase === 'gate-opening' ? 0 : 1,
          scale: currentPhase === 'zoom-lake' || currentPhase === 'doors-opening' || currentPhase === 'fade-to-site' ? 1.5 : 1
        }}
        transition={{ duration: 3, ease: 'easeInOut' }}
      />

      {/* Chateau Exterior (visible during zoom) */}
      <motion.div
        className="intro-layer intro-chateau"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: currentPhase === 'zoom-lake' || currentPhase === 'doors-opening' || currentPhase === 'fade-to-site' ? 1 : 0,
          scale: currentPhase === 'doors-opening' || currentPhase === 'fade-to-site' ? 1.2 : 0.8
        }}
        transition={{ duration: 3, ease: 'easeInOut' }}
      />

      {/* Iron Gate (opens outward) */}
      <div className="intro-gate-wrapper">
        <motion.div
          className="intro-gate intro-gate-left"
          initial={{ scaleX: 1 }}
          animate={{
            scaleX: currentPhase === 'gate-opening' ? 0.1 : 0,
            x: currentPhase === 'gate-opening' ? '-50%' : '-100%'
          }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />
        <motion.div
          className="intro-gate intro-gate-right"
          initial={{ scaleX: 1 }}
          animate={{
            scaleX: currentPhase === 'gate-opening' ? 0.1 : 0,
            x: currentPhase === 'gate-opening' ? '50%' : '100%'
          }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />
      </div>

      {/* Chateau Doors (open with 3D effect) */}
      <AnimatePresence>
        {(currentPhase === 'doors-opening' || currentPhase === 'fade-to-site') && (
          <div className="intro-doors-wrapper">
            <motion.div
              className="intro-door intro-door-left"
              initial={{ rotateY: 0, transformOrigin: 'left' }}
              animate={{ rotateY: -90 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, ease: 'easeInOut' }}
            />
            <motion.div
              className="intro-door intro-door-right"
              initial={{ rotateY: 0, transformOrigin: 'right' }}
              animate={{ rotateY: 90 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, ease: 'easeInOut' }}
            />
          </div>
        )}
      </AnimatePresence>

      {/* MONTREZ Logo Overlay */}
      <motion.div
        className="intro-logo"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: currentPhase === 'gate-opening' || currentPhase === 'zoom-lake' ? 1 : 0,
          scale: currentPhase === 'gate-opening' || currentPhase === 'zoom-lake' ? 1 : 0.8
        }}
        transition={{ duration: 1.5 }}
      >
        <h1 className="intro-logo-text">MONTREZ</h1>
      </motion.div>

      {/* Fade to White Transition */}
      <motion.div
        className="intro-fade-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: currentPhase === 'fade-to-site' ? 1 : 0 }}
        transition={{ duration: 1 }}
      />

      {/* Skip Button */}
      <AnimatePresence>
        {showSkip && currentPhase !== 'fade-to-site' && (
          <motion.button
            className="intro-skip-button"
            onClick={handleSkip}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            Skip Intro →
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
