import { useState, useEffect } from 'react'
import '../styles/AnnouncementBar.css'

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)
  
  useEffect(() => {
    // Check if user has dismissed the bar
    const isDismissed = localStorage.getItem('montrez-announcement-dismissed')
    if (isDismissed === 'true') {
      setIsVisible(false)
    }
  }, [])
  
  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('montrez-announcement-dismissed', 'true')
  }
  
  if (!isVisible) return null
  
  return (
    <div className="announcement-bar">
      <div className="announcement-bar__content">
        <p className="announcement-bar__text">
          Free Delivery Over R1,000 <span className="announcement-bar__divider">•</span> Use Code: <strong className="announcement-bar__code">MONTREZ25</strong>
        </p>
        <button 
          className="announcement-bar__close"
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
