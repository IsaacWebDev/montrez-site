# MONTREZ SITE - SECURITY AUDIT REPORT

**Date:** March 18, 2026  
**Auditor:** Security Agent (OpenClaw)  
**Scope:** Email Verification System + Frontend Security  
**Status:** 🔴 **NEEDS_FIXES** (Critical vulnerabilities found)

---

## EXECUTIVE SUMMARY

The MONTREZ site rebuild has **CRITICAL SECURITY VULNERABILITIES** that must be addressed before production deployment. While the email verification API backend implements proper security controls, the frontend exposes the password in plaintext and has other security gaps.

### Verdict: **NEEDS_FIXES** ⚠️

**Critical Issues:** 1  
**High Severity:** 2  
**Medium Severity:** 3  
**Low Severity:** 2

---

## CRITICAL VULNERABILITIES

### 1. 🔴 CRITICAL: Password Exposed in Client-Side Code

**Location:** `src/components/PasswordEmailModal.jsx` (line 15), `src/components/PasswordModal.jsx` (line 10)

**Issue:**
```javascript
const CORRECT_PASSWORD = 'NOTFOREVERYONE'
```

The password "NOTFOREVERYONE" is **hardcoded in the frontend React components**. This means:
- ❌ Anyone can view the source code and see the password
- ❌ The password is included in the built JavaScript bundle (`dist/assets/index-*.js`)
- ❌ No server-side validation
- ❌ Password stored in plain text on the client

**Attack Scenario:**
1. Attacker opens browser DevTools → Sources tab
2. Finds the bundle (`index-*.js`)
3. Searches for "NOTFOREVERYONE" or password validation logic
4. Gains immediate access to the site

**Current Code (Vulnerable):**
```jsx
const CORRECT_PASSWORD = 'NOTFOREVERYONE'

const handlePasswordSubmit = (e) => {
  e.preventDefault()
  if (password === CORRECT_PASSWORD) {
    // Grant access
  }
}
```

**Impact:** Complete bypass of password protection system

**Severity:** 🔴 **CRITICAL**

**Recommended Fix:**

**Option A: Backend Validation (RECOMMENDED)**
```javascript
// api/verify-password.js
export default async function handler(req, res) {
  const { password } = req.body;
  const CORRECT_PASSWORD = process.env.PASSWORD; // Stored in Vercel env var
  
  if (password === CORRECT_PASSWORD) {
    // Generate access token
    const token = crypto.randomBytes(32).toString('hex');
    return res.status(200).json({ success: true, token });
  }
  
  return res.status(401).json({ success: false, message: 'Invalid password' });
}
```

**Frontend:**
```jsx
const handlePasswordSubmit = async (e) => {
  e.preventDefault();
  
  const response = await fetch('/api/verify-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  });
  
  if (response.ok) {
    const { token } = await response.json();
    sessionStorage.setItem('montrez-token', token);
    onSuccess();
  } else {
    setError('Incorrect password');
  }
};
```

**Option B: Remove Password Entirely**
If the password is meant as a soft barrier (not security-critical), remove it entirely and rely only on email verification.

---

## HIGH SEVERITY VULNERABILITIES

### 2. 🟠 HIGH: No CSRF Protection on Email Verification API

**Location:** `api/send-code.js`, `api/verify-code.js`

**Issue:**
The API endpoints accept requests from any origin (`Access-Control-Allow-Origin: *`) without CSRF tokens or origin validation.

**Attack Scenario:**
1. Attacker creates malicious website
2. User visits attacker's site
3. Attacker's JavaScript sends POST request to `/api/send-code` with victim's email
4. Floods victim with verification emails

**Current Code:**
```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
```

**Impact:**
- Email flooding attacks
- Denial of service against legitimate users
- API rate limit exhaustion

**Severity:** 🟠 **HIGH**

**Recommended Fix:**

**Option A: Restrict CORS Origins**
```javascript
// api/send-code.js
const ALLOWED_ORIGINS = [
  'https://montrez-site.vercel.app',
  'https://montrezofficial.com',
  'http://localhost:5173' // Dev only
];

const origin = req.headers.origin;
if (ALLOWED_ORIGINS.includes(origin)) {
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
} else {
  return res.status(403).json({ success: false, message: 'Forbidden' });
}
```

**Option B: Add CSRF Token (More Robust)**
```javascript
// Generate CSRF token on landing page load
// Include token in API requests
// Validate token server-side
```

---

### 3. 🟠 HIGH: Session Storage for Access Tokens (Not Secure)

**Location:** `src/App.jsx`

**Issue:**
```javascript
sessionStorage.setItem('montrez-entrance-complete', 'true')
```

The app stores authentication state in `sessionStorage` with a simple boolean flag. There's **no actual access token validation** on protected routes.

**Attack Scenario:**
1. Attacker opens browser console
2. Runs: `sessionStorage.setItem('montrez-entrance-complete', 'true')`
3. Refreshes page
4. Full access granted without password or email verification

**Impact:** Complete authentication bypass

**Severity:** 🟠 **HIGH**

**Recommended Fix:**

Store **actual access tokens** (not just a flag) and validate them:

```javascript
// After successful password verification
const { token } = await response.json();
sessionStorage.setItem('montrez-access-token', token);

// On app load, validate token exists and is valid
const token = sessionStorage.getItem('montrez-access-token');
if (token) {
  const isValid = await validateToken(token);
  if (isValid) {
    setStage('site');
  }
}
```

**Also consider:**
- Using HTTP-only cookies instead of sessionStorage (more secure)
- Implementing token refresh mechanism
- Adding token expiry validation

---

## MEDIUM SEVERITY VULNERABILITIES

### 4. 🟡 MEDIUM: No Rate Limiting on Frontend Password Attempts

**Location:** `src/components/PasswordEmailModal.jsx`

**Issue:**
The frontend has no rate limiting on password attempts. The backend API has proper rate limiting for email codes, but the password check happens client-side with no throttling.

**Attack Scenario:**
1. Attacker scripts automated password guessing
2. Brute forces the password client-side (although it's already exposed)
3. If password were server-validated, this would enable brute force

**Impact:** Brute force potential if password validation moved to backend

**Severity:** 🟡 **MEDIUM**

**Recommended Fix:**

Implement exponential backoff:

```javascript
const [failedAttempts, setFailedAttempts] = useState(0);
const [lockoutUntil, setLockoutUntil] = useState(null);

const handlePasswordSubmit = async (e) => {
  e.preventDefault();
  
  // Check lockout
  if (lockoutUntil && Date.now() < lockoutUntil) {
    const remainingSeconds = Math.ceil((lockoutUntil - Date.now()) / 1000);
    setError(`Too many attempts. Try again in ${remainingSeconds}s`);
    return;
  }
  
  const response = await fetch('/api/verify-password', { ... });
  
  if (!response.ok) {
    const newAttempts = failedAttempts + 1;
    setFailedAttempts(newAttempts);
    
    // Exponential backoff: 5s, 30s, 5min, 1hr
    const backoffMs = Math.pow(6, newAttempts) * 1000;
    setLockoutUntil(Date.now() + backoffMs);
    
    setError('Incorrect password');
  }
};
```

---

### 5. 🟡 MEDIUM: In-Memory Storage for Email Codes (Production Issue)

**Location:** `api/send-code.js`, `api/verify-code.js`

**Issue:**
```javascript
const codeStore = new Map(); // In-memory storage
```

Using in-memory storage means:
- ❌ Codes lost on serverless cold start
- ❌ Codes not shared across multiple serverless instances
- ❌ User gets "code not found" error if different instance handles verify request

**Attack Scenario:**
Not an active attack, but creates user experience issues and potential for legitimate users to be locked out.

**Impact:**
- Poor user experience (intermittent failures)
- Higher support burden
- Users may get frustrated and leave

**Severity:** 🟡 **MEDIUM**

**Recommended Fix:**

**Use Redis for persistence:**

```javascript
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

// Store code
await redis.setex(`code:${email}`, 600, JSON.stringify({
  code,
  expires,
  attempts: 0
}));

// Get code
const data = await redis.get(`code:${email}`);
const storedData = JSON.parse(data);
```

**Alternatives:**
- Use Vercel KV (built-in Redis)
- Use Upstash Redis (serverless-friendly)
- Use a database (PostgreSQL, MongoDB)

---

### 6. 🟡 MEDIUM: No Input Sanitization on Email/Code

**Location:** `api/send-code.js`, `api/verify-code.js`

**Issue:**
While basic validation exists (email regex, 6-digit code), there's no explicit sanitization to prevent injection attacks or malformed input.

**Current Code:**
```javascript
const normalizedEmail = email.toLowerCase().trim();
```

This is good, but doesn't protect against:
- XSS payloads in email field (if displayed without escaping)
- SQL injection (if database added later)
- NoSQL injection
- Email header injection

**Impact:** Potential for injection attacks if database is added

**Severity:** 🟡 **MEDIUM**

**Recommended Fix:**

```javascript
import validator from 'validator';

// Enhanced email validation
function isValidEmail(email) {
  // Basic format check
  if (!validator.isEmail(email)) {
    return false;
  }
  
  // Length limits
  if (email.length > 254) {
    return false;
  }
  
  // No special characters beyond standard email
  const safeEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return safeEmailRegex.test(email);
}

// Sanitize code input
function sanitizeCode(code) {
  // Remove all non-digits
  const clean = code.replace(/\D/g, '');
  
  // Validate length
  if (clean.length !== 6) {
    throw new Error('Invalid code format');
  }
  
  return clean;
}
```

---

## LOW SEVERITY VULNERABILITIES

### 7. 🟢 LOW: Error Messages Leak Information

**Location:** `api/send-code.js`, `api/verify-code.js`

**Issue:**
Error messages reveal system internals:

```javascript
throw new Error(`Resend API error: ${error}`);
// Exposes: API provider, error details, stack traces
```

**Attack Scenario:**
Attacker can probe the API to learn:
- Email service provider (Resend)
- Rate limiting thresholds
- Code expiry time
- Max attempts

**Impact:** Information disclosure aids attackers

**Severity:** 🟢 **LOW**

**Recommended Fix:**

```javascript
// Don't expose internal errors
catch (error) {
  console.error('Send code error:', error); // Log internally
  return res.status(500).json({
    success: false,
    message: 'An error occurred. Please try again.' // Generic
  });
}
```

---

### 8. 🟢 LOW: Outdated Dependencies (npm audit)

**Issue:**
```
moderate severity vulnerabilities (2)
- esbuild <=0.24.2
- vite 0.11.0 - 6.1.6
```

**CVE:** GHSA-67mh-4wv8-2f99 (esbuild development server vulnerability)

**Impact:**
- Development server could be exploited (only affects local dev)
- Not a production risk (built files are safe)
- Affects developer machines

**Severity:** 🟢 **LOW** (dev-only)

**Recommended Fix:**

```bash
npm audit fix
# or
npm install vite@latest @vitejs/plugin-react@latest
```

---

## ATTACK PREVENTION STATUS

### ✅ SECURE

- [x] **Rate Limiting (Email):** 3 codes/hour per email - **SECURE**
- [x] **Rate Limiting (IP):** 10 requests/hour per IP - **SECURE**
- [x] **Code Expiry:** 10 minutes - **SECURE**
- [x] **Code Generation:** Cryptographically random - **SECURE**
- [x] **Max Attempts:** 3 per code - **SECURE**
- [x] **Email Validation:** Proper regex - **SECURE**
- [x] **Access Tokens:** crypto.randomBytes(32) - **SECURE**

### ❌ NEEDS FIXES

- [ ] **Brute Force (Password):** ❌ NO rate limiting on frontend
- [ ] **Email Flooding:** ❌ NO CSRF protection (CORS too permissive)
- [ ] **Code Enumeration:** ✅ Limited by max attempts (SECURE)
- [ ] **XSS Prevention:** ⚠️ React handles most, but no Content Security Policy
- [ ] **CSRF Protection:** ❌ MISSING (Accept requests from any origin)
- [ ] **Session Hijacking:** ❌ Tokens stored in sessionStorage (vulnerable to XSS)

---

## FRONTEND SECURITY CHECKLIST

### Secrets Exposure

- [ ] ❌ **Password exposed** in `PasswordEmailModal.jsx` and `PasswordModal.jsx`
- [x] ✅ No API keys in frontend code
- [x] ✅ No database credentials
- [ ] ⚠️ No environment variables leaked (none used)

### Input Validation

- [x] ✅ Email validation (basic regex)
- [ ] ⚠️ Code validation (digits only, 6 chars)
- [ ] ⚠️ Password input - needs sanitization if backend added
- [x] ✅ No user-generated HTML injection

### XSS Prevention

- [x] ✅ React handles JSX escaping automatically
- [ ] ❌ No Content Security Policy headers
- [ ] ❌ No X-Frame-Options header
- [ ] ❌ No X-Content-Type-Options header
- [x] ✅ No `dangerouslySetInnerHTML` used
- [x] ✅ No `eval()` or `Function()` calls

### Storage Security

- [ ] ❌ `sessionStorage` used for auth state (vulnerable)
- [x] ✅ No `localStorage` used for sensitive data
- [ ] ⚠️ No password stored locally (because it's in source code!)

### Network Security

- [ ] ❌ CORS too permissive (`Access-Control-Allow-Origin: *`)
- [x] ✅ HTTPS enforced (Vercel handles)
- [ ] ❌ No CSRF tokens

---

## DEPLOYMENT SECURITY

### Vercel Configuration

**Current `vercel.json`:**
```json
{
  "functions": {
    "api/**/*.js": {
      "memory": 256,
      "maxDuration": 10
    }
  }
}
```

**Missing Security Headers:**

Add to `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
        }
      ]
    }
  ]
}
```

### Environment Variables

**Required (NOT SET):**
```env
RESEND_API_KEY=<must be set in Vercel>
EMAIL_FROM=MONTREZ <verify@montrezofficial.com>
PASSWORD=NOTFOREVERYONE  # If backend validation added
```

**Status:** ⚠️ Check Vercel dashboard to ensure these are set

---

## DEPENDENCY AUDIT

```json
{
  "vulnerabilities": {
    "moderate": 2,
    "high": 0,
    "critical": 0
  }
}
```

### Vulnerable Packages

1. **esbuild** (<=0.24.2)
   - Severity: Moderate
   - Issue: Dev server vulnerability
   - Fix: `npm install vite@latest`

2. **vite** (0.11.0 - 6.1.6)
   - Severity: Moderate
   - Dependency: esbuild
   - Fix: Upgrade to vite@8.0.0

**Recommendation:** Run `npm audit fix` or `npm update`

---

## PRIORITY FIX LIST

### 🔴 URGENT (Must fix before production)

1. **Move password validation to backend** (Critical)
   - Create `/api/verify-password.js`
   - Store password in environment variable
   - Remove hardcoded password from frontend
   - Implement rate limiting

2. **Restrict CORS origins** (High)
   - Change `Access-Control-Allow-Origin: *` to specific domains
   - Validate request origin server-side

3. **Implement actual token-based authentication** (High)
   - Replace boolean flag with real access tokens
   - Validate tokens on protected routes
   - Consider HTTP-only cookies

### 🟡 IMPORTANT (Should fix soon)

4. **Add rate limiting to password attempts** (Medium)
5. **Migrate to Redis for code storage** (Medium)
6. **Add input sanitization** (Medium)

### 🟢 RECOMMENDED (Fix when time allows)

7. **Reduce error message verbosity** (Low)
8. **Update dependencies** (Low)
9. **Add security headers** (Low)

---

## RECOMMENDED FIXES IMPLEMENTATION

### Fix #1: Backend Password Validation

**Step 1:** Create `/api/verify-password.js`

```javascript
import crypto from 'crypto';

const accessTokenStore = new Map();
const attemptStore = new Map(); // { ip: { attempts, lockoutUntil } }

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // TODO: Restrict
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
  
  try {
    const { password } = req.body;
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
    
    // Check lockout
    const attemptData = attemptStore.get(ip) || { attempts: 0, lockoutUntil: null };
    
    if (attemptData.lockoutUntil && Date.now() < attemptData.lockoutUntil) {
      const remainingSeconds = Math.ceil((attemptData.lockoutUntil - Date.now()) / 1000);
      return res.status(429).json({
        success: false,
        message: `Too many failed attempts. Try again in ${Math.ceil(remainingSeconds / 60)} minutes.`
      });
    }
    
    // Validate password
    const CORRECT_PASSWORD = process.env.PASSWORD;
    
    if (!CORRECT_PASSWORD) {
      throw new Error('Server configuration error');
    }
    
    if (password !== CORRECT_PASSWORD) {
      // Increment attempts
      attemptData.attempts += 1;
      
      if (attemptData.attempts >= MAX_ATTEMPTS) {
        attemptData.lockoutUntil = Date.now() + LOCKOUT_DURATION_MS;
      }
      
      attemptStore.set(ip, attemptData);
      
      return res.status(401).json({
        success: false,
        message: 'Incorrect password',
        attemptsRemaining: MAX_ATTEMPTS - attemptData.attempts
      });
    }
    
    // Success - generate token
    const token = crypto.randomBytes(32).toString('hex');
    const expires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    
    accessTokenStore.set(token, {
      ip,
      expires,
      createdAt: Date.now()
    });
    
    // Reset attempts
    attemptStore.delete(ip);
    
    return res.status(200).json({
      success: true,
      token,
      expiresIn: 86400
    });
    
  } catch (error) {
    console.error('Password verification error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again.'
    });
  }
}
```

**Step 2:** Update `PasswordEmailModal.jsx`

```javascript
// Remove this line:
// const CORRECT_PASSWORD = 'NOTFOREVERYONE'

const handlePasswordSubmit = async (e) => {
  e.preventDefault();
  
  if (password.trim() === '') {
    setError('Please enter a password');
    return;
  }

  setIsLoading(true);
  setError('');

  try {
    const response = await fetch('/api/verify-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      setError(data.message || 'Incorrect password');
      setPassword('');
      
      if (inputRef.current) {
        inputRef.current.classList.add('shake');
        setTimeout(() => inputRef.current.classList.remove('shake'), 500);
      }
      
      return;
    }
    
    // Store token
    sessionStorage.setItem('montrez-access-token', data.token);
    
    setError('');
    setIsVisible(false);
    setTimeout(onSuccess, 600);
    
  } catch (err) {
    setError('Connection error. Please try again.');
  } finally {
    setIsLoading(false);
  }
};
```

**Step 3:** Add to Vercel Environment Variables

```
PASSWORD=NOTFOREVERYONE
```

---

### Fix #2: Restrict CORS

Update all API files:

```javascript
const ALLOWED_ORIGINS = [
  'https://montrez-site.vercel.app',
  'https://montrezofficial.com',
  process.env.NODE_ENV === 'development' && 'http://localhost:5173'
].filter(Boolean);

export default async function handler(req, res) {
  const origin = req.headers.origin;
  
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  } else {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }
  
  // ... rest of handler
}
```

---

### Fix #3: Implement Real Token Validation

Update `App.jsx`:

```javascript
function HomePage() {
  const [stage, setStage] = useState('loading');
  
  useEffect(() => {
    // Check if user has valid token
    const token = sessionStorage.getItem('montrez-access-token');
    
    if (token) {
      // Token exists, assume valid (or add validation endpoint)
      setStage('site');
    } else {
      setStage('landing');
    }
    
    // Remove loading screen
    const loading = document.getElementById('loading');
    if (loading) {
      loading.style.opacity = '0';
      setTimeout(() => loading.remove(), 300);
    }
  }, []);
  
  // ... rest of component
}
```

Optional: Add token validation endpoint:

```javascript
// api/validate-token.js
export default async function handler(req, res) {
  const { token } = req.body;
  
  const tokenData = accessTokenStore.get(token);
  
  if (!tokenData) {
    return res.status(401).json({ valid: false });
  }
  
  if (tokenData.expires < Date.now()) {
    accessTokenStore.delete(token);
    return res.status(401).json({ valid: false });
  }
  
  return res.status(200).json({ valid: true });
}
```

---

## TESTING RECOMMENDATIONS

### Security Testing Checklist

- [ ] Test password validation with wrong passwords
- [ ] Verify rate limiting kicks in after max attempts
- [ ] Test email code expiry (wait 10 minutes)
- [ ] Test max code verification attempts (3)
- [ ] Verify CORS restrictions (request from unauthorized origin)
- [ ] Test token expiry (wait 24 hours)
- [ ] Inspect built bundle for exposed secrets
- [ ] Test XSS payloads in email field
- [ ] Verify error messages don't leak info
- [ ] Test with npm audit and address findings

### Penetration Testing

Recommended tools:
- **OWASP ZAP** - Automated security scanner
- **Burp Suite** - Manual penetration testing
- **npm audit** - Dependency vulnerabilities
- **Lighthouse** - Security best practices

---

## CONCLUSION

The MONTREZ site has a **solid foundation** for email verification security, but **critical vulnerabilities** in password handling and session management must be fixed before production deployment.

### Summary of Critical Fixes:

1. ✅ **Email verification API:** Well-secured (rate limiting, expiry, attempts)
2. ❌ **Password validation:** Exposed in frontend (MUST FIX)
3. ❌ **Session management:** Weak authentication (MUST FIX)
4. ⚠️ **CORS policy:** Too permissive (SHOULD FIX)

### Timeline Recommendation:

- **Before launch:** Fix Critical + High severity issues (1-3)
- **Week 1 post-launch:** Fix Medium severity issues (4-6)
- **Month 1:** Fix Low severity issues (7-8)

### Final Verdict:

🔴 **NEEDS_FIXES** - Do not deploy to production until Critical issues are resolved.

---

**Next Steps:**

1. Implement Fix #1 (Backend password validation) ← **URGENT**
2. Implement Fix #2 (CORS restrictions)
3. Implement Fix #3 (Real token validation)
4. Re-run security audit
5. Deploy to production

---

**Auditor:** Security Agent (OpenClaw)  
**Contact:** Available via main agent for implementation support  
**Report Version:** 1.0  
**Date:** March 18, 2026
