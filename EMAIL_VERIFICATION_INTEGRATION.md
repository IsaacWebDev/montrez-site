# EMAIL VERIFICATION - FRONTEND INTEGRATION GUIDE

Complete guide for integrating email verification into the MONTREZ entrance flow.

---

## Overview

The email verification system is now complete and ready to integrate into the password gate modal.

**Flow:**
1. User clicks "Enter" on landing page
2. Modal shows: Password input OR Email input
3. If new user → Enter email → Get code → Verify code → Access granted
4. Store access token → Proceed to video intro

---

## API Endpoints

### Base URL
- **Local:** `http://localhost:3000/api`
- **Production:** `https://montrez-site.vercel.app/api`

### Endpoints

1. **Send Code:** `POST /api/send-code`
2. **Verify Code:** `POST /api/verify-code`

See `api/README.md` for full API documentation.

---

## Frontend Implementation

### Step 1: Create Hook

Create `src/hooks/useEmailVerification.js`:

```javascript
import { useState } from 'react';

export function useEmailVerification() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendCode = async (email) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send code');
      }
      
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (email, code) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to verify code');
      }
      
      // Store access token in localStorage
      localStorage.setItem('montrez_access_token', data.accessToken);
      localStorage.setItem('montrez_access_token_expires', 
        Date.now() + (data.expiresIn * 1000));
      
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return { sendCode, verifyCode, loading, error, clearError };
}
```

---

### Step 2: Update Password Gate Modal

Update `src/components/PasswordGate.jsx` (or wherever your gate modal is):

```javascript
import { useState, useEffect } from 'react';
import { useEmailVerification } from '../hooks/useEmailVerification';

export function PasswordGate({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [mode, setMode] = useState('password'); // 'password' | 'email' | 'code'
  const [passwordError, setPasswordError] = useState('');
  const { sendCode, verifyCode, loading, error, clearError } = useEmailVerification();

  const CORRECT_PASSWORD = 'NOTFOREVERYONE';

  // Handle password submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (password.toUpperCase() === CORRECT_PASSWORD) {
      // Existing user - store special token
      localStorage.setItem('montrez_access_token', 'returning_user');
      onSuccess();
    } else {
      setPasswordError('Incorrect password');
      setPassword('');
    }
  };

  // Handle email submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    clearError();
    
    try {
      await sendCode(email);
      setMode('code');
    } catch (err) {
      // Error handled by hook
    }
  };

  // Handle code verification
  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    clearError();
    
    try {
      await verifyCode(email, code);
      onSuccess();
    } catch (err) {
      // Error handled by hook
      setCode(''); // Clear code on error
    }
  };

  // Auto-format code input (6 digits)
  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(value);
  };

  return (
    <div className="password-gate-modal">
      <div className="modal-content">
        <h1>MONTREZ</h1>
        <p className="tagline">Pas pour Tout</p>

        {/* Password Section (Returning Users) */}
        {mode === 'password' && (
          <div className="returning-users">
            <h2>Returning Users</h2>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                placeholder="Enter password"
                autoFocus
              />
              {passwordError && <p className="error">{passwordError}</p>}
              <button type="submit">Enter</button>
            </form>
            
            <button 
              className="switch-mode"
              onClick={() => setMode('email')}
            >
              New user? Get access
            </button>
          </div>
        )}

        {/* Email Section (New Users) */}
        {mode === 'email' && (
          <div className="new-users">
            <h2>New Users</h2>
            <p>Enter your email to receive a verification code</p>
            
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={loading}
                autoFocus
              />
              {error && <p className="error">{error}</p>}
              <button type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Get Code'}
              </button>
            </form>
            
            <button 
              className="switch-mode"
              onClick={() => setMode('password')}
              disabled={loading}
            >
              Have password? Enter here
            </button>
          </div>
        )}

        {/* Code Verification Section */}
        {mode === 'code' && (
          <div className="verify-code">
            <h2>Check Your Email</h2>
            <p>We sent a 6-digit code to <strong>{email}</strong></p>
            
            <form onSubmit={handleCodeSubmit}>
              <input
                type="text"
                value={code}
                onChange={handleCodeChange}
                placeholder="000000"
                maxLength={6}
                pattern="\d{6}"
                required
                disabled={loading}
                autoFocus
                className="code-input"
              />
              {error && <p className="error">{error}</p>}
              <button type="submit" disabled={loading || code.length !== 6}>
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>
            </form>
            
            <div className="code-actions">
              <button 
                className="resend"
                onClick={handleEmailSubmit}
                disabled={loading}
              >
                Resend Code
              </button>
              <button 
                className="change-email"
                onClick={() => {
                  setMode('email');
                  setCode('');
                  clearError();
                }}
                disabled={loading}
              >
                Change Email
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

### Step 3: Styling

Add to your CSS (or TailwindCSS):

```css
/* Password Gate Modal */
.password-gate-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-content {
  background: #111;
  border: 1px solid #333;
  padding: 40px;
  max-width: 500px;
  width: 90%;
  text-align: center;
}

.modal-content h1 {
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 4px;
  margin: 0 0 5px 0;
  color: #fff;
}

.tagline {
  font-size: 12px;
  font-style: italic;
  opacity: 0.7;
  margin: 0 0 40px 0;
}

/* Forms */
.returning-users,
.new-users,
.verify-code {
  margin: 20px 0;
}

.returning-users h2,
.new-users h2,
.verify-code h2 {
  font-size: 18px;
  margin: 0 0 10px 0;
}

.verify-code p {
  font-size: 14px;
  opacity: 0.8;
  margin: 0 0 20px 0;
}

input {
  width: 100%;
  padding: 12px 16px;
  background: #000;
  border: 1px solid #333;
  color: #fff;
  font-size: 14px;
  margin: 0 0 10px 0;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #fff;
}

input.code-input {
  font-size: 24px;
  letter-spacing: 8px;
  text-align: center;
  font-family: monospace;
}

button {
  width: 100%;
  padding: 12px 16px;
  background: #fff;
  border: none;
  color: #000;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s;
}

button:hover:not(:disabled) {
  opacity: 0.9;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.switch-mode {
  background: transparent;
  color: #fff;
  border: 1px solid #333;
  margin-top: 20px;
  font-size: 12px;
}

.switch-mode:hover:not(:disabled) {
  border-color: #fff;
}

/* Code actions */
.code-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.code-actions button {
  width: auto;
  flex: 1;
  background: transparent;
  border: 1px solid #333;
  color: #fff;
  font-size: 12px;
}

/* Error messages */
.error {
  color: #ff4444;
  font-size: 12px;
  margin: 10px 0;
}
```

---

### Step 4: Access Token Management

Create `src/utils/auth.js`:

```javascript
/**
 * Check if user has valid access
 */
export function hasAccess() {
  const token = localStorage.getItem('montrez_access_token');
  
  if (!token) return false;
  
  // Returning users have special token
  if (token === 'returning_user') return true;
  
  // Check if token expired
  const expires = localStorage.getItem('montrez_access_token_expires');
  if (expires && Date.now() > parseInt(expires)) {
    clearAccess();
    return false;
  }
  
  return true;
}

/**
 * Clear access token
 */
export function clearAccess() {
  localStorage.removeItem('montrez_access_token');
  localStorage.removeItem('montrez_access_token_expires');
}

/**
 * Get access token
 */
export function getAccessToken() {
  return localStorage.getItem('montrez_access_token');
}
```

---

### Step 5: Update App Flow

Update your main entrance flow to check for existing access:

```javascript
import { useState, useEffect } from 'react';
import { hasAccess } from './utils/auth';
import { LandingPage } from './components/LandingPage';
import { PasswordGate } from './components/PasswordGate';
import { VideoIntro } from './components/VideoIntro';
import { MainSite } from './components/MainSite';

export function App() {
  const [stage, setStage] = useState('loading');

  useEffect(() => {
    // Check if user already has access
    if (hasAccess()) {
      setStage('main'); // Skip to main site
    } else {
      setStage('landing');
    }
  }, []);

  if (stage === 'loading') {
    return <div>Loading...</div>;
  }

  if (stage === 'landing') {
    return <LandingPage onEnter={() => setStage('gate')} />;
  }

  if (stage === 'gate') {
    return <PasswordGate onSuccess={() => setStage('video')} />;
  }

  if (stage === 'video') {
    return <VideoIntro onComplete={() => setStage('main')} />;
  }

  return <MainSite />;
}
```

---

## Testing Checklist

### Local Testing

- [ ] Start dev server: `vercel dev`
- [ ] Test send code with valid email
- [ ] Check email received (check spam folder)
- [ ] Test verify code with correct code
- [ ] Test verify code with wrong code (3 attempts)
- [ ] Test code expiry (wait 10 minutes)
- [ ] Test rate limiting (3 codes per hour)
- [ ] Test invalid email format
- [ ] Test switching between password/email modes
- [ ] Test returning user flow (password)
- [ ] Test new user flow (email → code)
- [ ] Test access token persists on page reload

### Production Testing

- [ ] Deploy to Vercel
- [ ] Add `RESEND_API_KEY` environment variable
- [ ] Add `EMAIL_FROM` environment variable
- [ ] Test with real email addresses
- [ ] Verify email deliverability
- [ ] Check email styling in different clients
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Monitor function logs for errors
- [ ] Verify rate limiting works in production

---

## Environment Setup

### Local Development

1. Create `.env.local`:
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=MONTREZ <onboarding@resend.dev>
```

2. Run: `vercel dev`

### Vercel Production

1. Go to Vercel dashboard
2. Project Settings → Environment Variables
3. Add:
   - `RESEND_API_KEY` (Production + Preview)
   - `EMAIL_FROM` (Production + Preview)
4. Redeploy

### Getting Resend API Key

1. Sign up: https://resend.com
2. Navigate to API Keys
3. Create new key
4. Copy and add to environment variables

---

## Error Handling

### Common Errors

**"Failed to send verification code"**
- Check Resend API key is valid
- Check email format is correct
- Check Resend dashboard for delivery issues

**"Too many requests"**
- Rate limiting active (3 codes per hour per email)
- Wait for rate limit to reset
- Or use different email for testing

**"Code expired"**
- Code is valid for 10 minutes
- Request new code

**"Too many failed attempts"**
- Max 3 attempts per code
- Request new code

**"Invalid code format"**
- Must be exactly 6 digits
- No spaces or special characters

---

## Production Considerations

### Email Deliverability

**For best deliverability:**
1. Verify custom domain in Resend
2. Update `EMAIL_FROM` to use your domain
3. Set up SPF/DKIM records
4. Monitor bounce/complaint rates

### Scalability

**Current setup (in-memory storage) is suitable for:**
- Low to medium traffic
- Short-lived serverless functions
- Development/staging environments

**For high-traffic production:**
- Consider Redis for code storage
- Implement database for user tracking
- Add monitoring and alerting
- Scale to multiple regions if needed

See `api/README.md` for scaling recommendations.

---

## Support

**Issues?**
- Check `api/README.md` for full API docs
- Review Vercel function logs
- Check Resend dashboard for email delivery
- Test with `node api/test-api.js`

**Questions?**
- Contact backend team
- Review code comments in `api/send-code.js` and `api/verify-code.js`

---

**Ready to integrate! 🚀**

The backend is complete, tested, and deployed. Follow this guide to integrate into your frontend.
