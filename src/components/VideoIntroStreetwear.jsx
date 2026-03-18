import { useEffect, useRef, useState } from 'react'
import '../styles/VideoIntroStreetwear.css'

export default function VideoIntroStreetwear({ onComplete }) {
  const [canSkip, setCanSkip] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Auto-complete after 5 seconds (no skip button)
    const autoComplete = setTimeout(() => {
      handleComplete()
    }, 5000)

    return () => {
      clearTimeout(autoComplete)
    }
  }, [])

  const handleComplete = () => {
    setFadeOut(true)
    setTimeout(() => {
      onComplete()
    }, 500)
  }

  return (
    <div className={`video-intro-streetwear ${fadeOut ? 'fade-out' : ''}`}>
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


    </div>
  )
}
