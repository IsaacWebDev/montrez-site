import { useEffect, useRef, useState } from 'react'
import '../styles/VideoIntroStreetwear.css'

export default function VideoIntroStreetwear({ onComplete }) {
  const [canSkip, setCanSkip] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Allow skip after 2 seconds
    const skipTimer = setTimeout(() => setCanSkip(true), 2000)

    // Auto-complete after 5 seconds (urban intro doesn't need 20MB video)
    const autoComplete = setTimeout(() => {
      handleComplete()
    }, 5000)

    return () => {
      clearTimeout(skipTimer)
      clearTimeout(autoComplete)
    }
  }, [])

  const handleComplete = () => {
    setFadeOut(true)
    setTimeout(() => {
      onComplete()
    }, 500)
  }

  const handleSkip = () => {
    if (canSkip) {
      handleComplete()
    }
  }

  return (
    <div className={`video-intro-streetwear ${fadeOut ? 'fade-out' : ''}`} onClick={handleSkip}>
      {/* Urban Background - Concrete Wall */}
      <div className="urban-background">
        <div className="concrete-texture"></div>
        <div className="scanlines"></div>
      </div>

      {/* Neon Sign Effect */}
      <div className="neon-container">
        <div className="neon-flicker">
          <h1 className="neon-logo">
            <span className="neon-letter">M</span>
            <span className="neon-letter">O</span>
            <span className="neon-letter">N</span>
            <span className="neon-letter">T</span>
            <span className="neon-letter">R</span>
            <span className="neon-letter">E</span>
            <span className="neon-letter">Z</span>
          </h1>
          <div className="neon-tagline">SHOW UP BOLD</div>
        </div>
      </div>

      {/* Electric Blue Glow Effect */}
      <div className="electric-glow"></div>

      {/* Grain Overlay */}
      <div className="grain-overlay"></div>

      {/* Skip Button */}
      {canSkip && (
        <button 
          className="skip-btn animate-fade-in"
          onClick={handleSkip}
          aria-label="Skip intro"
        >
          <span>SKIP</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 10h10M10 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  )
}
