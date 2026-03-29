import { useState, useEffect, useRef } from 'react'
import '../styles/AccessGate.css'

export default function AccessGate({ onSuccess }) {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Auto-focus password input when shown
    if (showPassword && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100)
    }
  }, [showPassword])

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    
    if (password.trim() === '') {
      setError('Please enter a password')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      
      if (!response.ok) {
        throw new Error('Incorrect password')
      }

      const data = await response.json()
      
      // Store access token
      if (data.token) {
        sessionStorage.setItem('montrez_access_token', data.token)
      }
      
      setError('')
      setIsVisible(false)
      setTimeout(onSuccess, 600)
    } catch (err) {
      setError('Incorrect password')
      setPassword('')
      
      // Shake animation
      if (inputRef.current) {
        inputRef.current.classList.add('shake')
        setTimeout(() => inputRef.current.classList.remove('shake'), 500)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`access-gate ${isVisible ? 'visible' : ''}`}>
      <div className="access-gate-background" />
      
      <div className="access-card">
        <h1 className="access-logo">MONTREZ</h1>
        <p className="access-subtitle">ACCESS REQUIRED</p>
        
        {/* Option 1: Password */}
        <div 
          className={`access-option ${showPassword ? 'active' : ''}`}
          onClick={() => !showPassword && setShowPassword(true)}
        >
          <h3 className="access-option-title">Returning User</h3>
          <p className="access-option-desc">Enter with password</p>
          
          {showPassword && (
            <form onSubmit={handlePasswordSubmit} className="password-form">
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                className={`password-input ${error ? 'error' : ''}`}
                placeholder="Enter password"
                autoComplete="off"
                disabled={isLoading}
              />
              {error && <span className="password-error">{error}</span>}
              
              <div className="password-actions">
                <button 
                  type="submit" 
                  className="password-submit"
                  disabled={isLoading || !password}
                >
                  {isLoading ? 'Verifying...' : 'Enter'}
                </button>
                <button 
                  type="button" 
                  className="password-cancel"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowPassword(false)
                    setPassword('')
                    setError('')
                  }}
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
        
        <div className="access-divider">
          <span>OR</span>
        </div>
        
        {/* Option 2: Instagram */}
        <a 
          href="https://instagram.com/montrez" 
          target="_blank" 
          rel="noopener noreferrer"
          className="access-option instagram-option"
        >
          <h3 className="access-option-title">New User</h3>
          <p className="access-option-desc">Get access code via Instagram</p>
          
          <svg className="instagram-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
            <circle cx="18" cy="6" r="1" fill="currentColor"/>
          </svg>
        </a>
      </div>
    </div>
  )
}
