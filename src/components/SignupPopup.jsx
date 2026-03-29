import { useState, useEffect } from 'react'
import '../styles/SignupPopup.css'

export default function SignupPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
  useEffect(() => {
    // Check if already shown this session
    if (sessionStorage.getItem('signup-popup-shown')) return
    
    // Show after 15 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
      sessionStorage.setItem('signup-popup-shown', 'true')
    }, 15000)
    
    return () => clearTimeout(timer)
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !fullName) return
    
    setIsSubmitting(true)
    
    try {
      // Send to backend API
      const response = await fetch('/api/newsletter-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          fullName,
          source: 'homepage-popup'
        })
      })
      
      if (response.ok) {
        setSubmitSuccess(true)
        // Close popup after 2 seconds
        setTimeout(() => {
          setIsVisible(false)
        }, 2000)
      }
    } catch (error) {
      console.error('Newsletter signup failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleClose = () => {
    setIsVisible(false)
  }
  
  if (!isVisible) return null
  
  return (
    <div className="signup-popup-overlay" onClick={handleClose}>
      <div className="signup-popup-modal" onClick={(e) => e.stopPropagation()}>
        <button 
          className="signup-popup-close" 
          onClick={handleClose}
          aria-label="Close popup"
        >
          ×
        </button>
        
        {!submitSuccess ? (
          <>
            <h2 className="signup-popup-title">GET 15% OFF YOUR FIRST ORDER</h2>
            <p className="signup-popup-subtitle">Sign up for exclusive access and early product drops</p>
            
            <form onSubmit={handleSubmit} className="signup-popup-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="signup-popup-input"
                disabled={isSubmitting}
              />
              
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full name"
                required
                className="signup-popup-input"
                disabled={isSubmitting}
              />
              
              <button 
                type="submit" 
                className="signup-popup-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'SIGNING UP...' : 'SIGN UP'}
              </button>
            </form>
          </>
        ) : (
          <div className="signup-popup-success">
            <svg className="success-icon" width="64" height="64" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2"/>
              <path d="M8 12L11 15L16 9" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3>Welcome to MONTRÉZ!</h3>
            <p>Check your email for your 15% discount code</p>
          </div>
        )}
      </div>
    </div>
  )
}
