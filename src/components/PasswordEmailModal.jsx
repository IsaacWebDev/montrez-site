import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/PasswordEmailModal.css'

export default function PasswordEmailModal({ onSuccess }) {
  const [mode, setMode] = useState('choice') // 'choice', 'password', 'email', 'verify-code'
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Auto-focus input when mode changes
    if (inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100)
    }
  }, [mode])

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

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setError('Please enter your email')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send code')
      }
      
      setMode('verify-code')
      setError('')
    } catch (err) {
      setError(err.message || 'Failed to send code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCodeSubmit = async (e) => {
    e.preventDefault()
    
    if (!code.trim()) {
      setError('Please enter the verification code')
      return
    }

    if (code.length !== 6) {
      setError('Code must be 6 digits')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Invalid code')
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
      setError(err.message || 'Invalid code. Please check your email.')
      setCode('')
      
      if (inputRef.current) {
        inputRef.current.classList.add('shake')
        setTimeout(() => inputRef.current.classList.remove('shake'), 500)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  }

  return (
    <div className={`password-modal-overlay ${isVisible ? 'visible' : ''}`}>
      <div className="password-modal-overlay-bg grain" />
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={mode}
          className="password-modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <div className="password-modal__content">
            <h2 className="password-modal__title">MONTREZ</h2>
            
            {mode === 'choice' && (
              <>
                <p className="password-modal__subtitle">Access Required</p>
                <div className="password-modal__choice">
                  <button 
                    className="choice-btn"
                    onClick={() => setMode('password')}
                  >
                    <span className="choice-label">Returning User</span>
                    <span className="choice-desc">Enter with password</span>
                  </button>
                  
                  <div className="choice-divider">
                    <span>or</span>
                  </div>
                  
                  <button 
                    className="choice-btn"
                    onClick={() => setMode('email')}
                  >
                    <span className="choice-label">New User</span>
                    <span className="choice-desc">Get access code via email</span>
                  </button>
                </div>
              </>
            )}

            {mode === 'password' && (
              <>
                <p className="password-modal__subtitle">Enter Password</p>
                <form onSubmit={handlePasswordSubmit} className="password-modal__form">
                  <div className="password-input-wrapper">
                    <input
                      ref={inputRef}
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        setError('')
                      }}
                      className={`password-input ${error ? 'error' : ''}`}
                      placeholder="Password"
                      autoComplete="off"
                    />
                    {error && <span className="password-error">{error}</span>}
                  </div>
                  
                  <button type="submit" className="password-submit-btn">
                    <span>Enter</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  <button 
                    type="button" 
                    className="back-btn"
                    onClick={() => setMode('choice')}
                  >
                    ← Back
                  </button>
                </form>
              </>
            )}

            {mode === 'email' && (
              <>
                <p className="password-modal__subtitle">Get Access Code</p>
                <form onSubmit={handleEmailSubmit} className="password-modal__form">
                  <div className="password-input-wrapper">
                    <input
                      ref={inputRef}
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setError('')
                      }}
                      className={`password-input ${error ? 'error' : ''}`}
                      placeholder="Your email"
                      autoComplete="email"
                      disabled={isLoading}
                    />
                    {error && <span className="password-error">{error}</span>}
                  </div>
                  
                  <button 
                    type="submit" 
                    className="password-submit-btn"
                    disabled={isLoading}
                  >
                    <span>{isLoading ? 'Sending...' : 'Send Code'}</span>
                    {!isLoading && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>

                  <button 
                    type="button" 
                    className="back-btn"
                    onClick={() => setMode('choice')}
                    disabled={isLoading}
                  >
                    ← Back
                  </button>
                </form>
              </>
            )}

            {mode === 'verify-code' && (
              <>
                <p className="password-modal__subtitle">Enter Verification Code</p>
                <p className="password-modal__hint">Check your email: {email}</p>
                <form onSubmit={handleCodeSubmit} className="password-modal__form">
                  <div className="password-input-wrapper">
                    <input
                      ref={inputRef}
                      type="text"
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value.replace(/\D/g, '').slice(0, 6))
                        setError('')
                      }}
                      className={`password-input code-input ${error ? 'error' : ''}`}
                      placeholder="6-digit code"
                      maxLength="6"
                      autoComplete="off"
                    />
                    {error && <span className="password-error">{error}</span>}
                  </div>
                  
                  <button type="submit" className="password-submit-btn">
                    <span>Verify</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  <button 
                    type="button" 
                    className="back-btn"
                    onClick={() => setMode('email')}
                  >
                    ← Resend code
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
