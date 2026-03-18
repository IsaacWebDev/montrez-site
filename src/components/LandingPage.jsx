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
    <div className={`landing-page ${isVisible ? 'visible' : ''}`}>
      {/* Gate Image - Real Château de Chambord gates */}
      <div 
        className="landing-background gate-image" 
        style={{ 
          backgroundImage: 'url(/images/landing-gate.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%) contrast(1.2) brightness(0.9)'
        }}
      />
      <div className="landing-overlay grain" />
      
      <div className="landing-content">
        <h1 className="landing-logo">MONTREZ</h1>
        
        <button className="landing-enter-btn" onClick={handleEnter} aria-label="Enter Montrez">
          <span>Enter</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
