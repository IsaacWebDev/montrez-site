import { useState, useEffect } from 'react'
import '../styles/LandingPage.css'

export default function LandingPage({ onEnter }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Fade in on mount
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleEnter = () => {
    setIsVisible(false)
    setTimeout(() => {
      onEnter()
    }, 600) // Match fade-out transition duration
  }

  return (
    <div className="landing-page-wrapper">
      {/* Gate Background Image */}
      <div className="landing-background-image"></div>
      
      {/* Dark Overlay */}
      <div className="landing-dark-overlay"></div>
      
      {/* Content (Logo + Button) */}
      <div className="landing-center-content">
        <h1 className="landing-brand-logo">MONTREZ</h1>
        <button className="landing-enter-button" onClick={handleEnter}>
          [ ENTER ]
        </button>
      </div>
    </div>
  )
}
