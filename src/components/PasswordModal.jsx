import { useState, useEffect, useRef } from 'react'
import '../styles/PasswordModal.css'

export default function PasswordModal({ onSuccess }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const inputRef = useRef(null)

  const CORRECT_PASSWORD = 'NOTFOREVERYONE'

  useEffect(() => {
    // Fade in modal
    const timer = setTimeout(() => setIsVisible(true), 100)
    
    // Focus input after animation
    const focusTimer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 400)

    return () => {
      clearTimeout(timer)
      clearTimeout(focusTimer)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (password.trim() === '') {
      setError('Please enter a password')
      return
    }

    if (password === CORRECT_PASSWORD) {
      setError('')
      setIsVisible(false)
      setTimeout(onSuccess, 600) // Match fade-out transition
    } else {
      setError('Incorrect password')
      setPassword('')
      
      // Shake animation
      const input = inputRef.current
      if (input) {
        input.classList.add('shake')
        setTimeout(() => input.classList.remove('shake'), 500)
      }
    }
  }

  return (
    <div className={`password-modal-overlay ${isVisible ? 'visible' : ''}`}>
      <div className="password-modal-overlay-bg grain" />
      
      <div className="password-modal">
        <div className="password-modal__content">
          <h2 className="password-modal__title">MONTREZ</h2>
          <p className="password-modal__subtitle">Enter Password</p>
          
          <form onSubmit={handleSubmit} className="password-modal__form">
            <div className="password-input-wrapper">
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('') // Clear error on typing
                }}
                className={`password-input ${error ? 'error' : ''}`}
                placeholder="Password"
                autoComplete="off"
              />
              {error && (
                <span className="password-error">{error}</span>
              )}
            </div>
            
            <button 
              type="submit" 
              className="password-submit-btn"
              aria-label="Submit password"
            >
              <span>Enter</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
