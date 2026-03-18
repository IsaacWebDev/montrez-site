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
      <div 
        className="landing-background" 
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="landing-overlay grain" />
      <div className="landing-content">
        <h1 className="landing-logo">MONTREZ</h1>
        <p className="landing-tagline">Luxury Redefined</p>
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
