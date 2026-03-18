# MONTREZ Email Verification API

Serverless email verification system for new user access control.

## Overview

Two-step email verification flow:
1. User requests code → 6-digit code sent to email
2. User enters code → Access token granted

## Endpoints

### 1. Send Verification Code

**Endpoint:** `POST /api/send-code`

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Code sent to email",
  "expiresIn": 600
}
```

**Error Responses:**

**400 - Invalid Email:**
```json
{
  "success": false,
  "message": "Invalid email address"
}
```

**429 - Rate Limited:**
```json
{
  "success": false,
  "message": "Too many requests for this email. Please try again in 45 minutes.",
  "retryAfter": 2700
}
```

**500 - Server Error:**
```json
{
  "success": false,
  "message": "Failed to send verification code. Please try again."
}
```

---

### 2. Verify Code

**Endpoint:** `POST /api/verify-code`

**Request:**
```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Code verified",
  "accessToken": "a1b2c3d4e5f6...",
  "expiresIn": 86400
}
```

**Error Responses:**

**400 - Invalid Email:**
```json
{
  "success": false,
  "message": "Invalid email address"
}
```

**400 - Invalid Code Format:**
```json
{
  "success": false,
  "message": "Invalid code format"
}
```

**400 - Code Not Found:**
```json
{
  "success": false,
  "message": "No verification code found. Please request a new code."
}
```

**400 - Code Expired:**
```json
{
  "success": false,
  "message": "Code expired. Please request a new code."
}
```

**400 - Too Many Attempts:**
```json
{
  "success": false,
  "message": "Too many failed attempts. Please request a new code."
}
```

**400 - Invalid Code:**
```json
{
  "success": false,
  "message": "Invalid code. 2 attempts remaining.",
  "attemptsRemaining": 2
}
```

**500 - Server Error:**
```json
{
  "success": false,
  "message": "Failed to verify code. Please try again."
}
```

---

## Security Features

### Rate Limiting

**Per Email:**
- Max 3 codes per hour per email address
- Resets 1 hour after first request

**Per IP:**
- Max 10 requests per hour per IP address
- Prevents abuse from single source

### Code Expiry
- Codes expire after **10 minutes**
- Expired codes are automatically cleaned up

### Attempt Limiting
- Max **3 verification attempts** per code
- After 3 failed attempts, code is deleted
- User must request new code

### Email Validation
- RFC-compliant email format validation
- Normalized to lowercase and trimmed

### Access Token
- Cryptographically secure random token (64 hex chars)
- Expires after **24 hours**
- Stored in-memory (can be persisted to Redis/DB)

---

## Implementation Details

### Code Generation
- Random 6-digit number (100000-999999)
- Uniform distribution
- No predictable patterns

### Storage
- **In-memory Map** (default)
- Shared across serverless function instances
- **Note:** For production at scale, use Redis or database

### Email Service
- **Resend API** (https://resend.com)
- Clean HTML + text fallback
- MONTREZ branding

### Cleanup
- Expired codes/tokens cleaned on each request
- No memory leaks
- Efficient operation

---

## Environment Variables

Required variables (see `.env.example`):

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=MONTREZ <onboarding@resend.dev>
```

### Getting Resend API Key

1. Sign up at https://resend.com
2. Navigate to API Keys
3. Create new key
4. Add to Vercel environment variables

### Email Sender Configuration

**Testing:**
- Use `onboarding@resend.dev` (Resend default)
- No domain verification needed

**Production:**
- Verify your domain in Resend dashboard
- Update `EMAIL_FROM` to `verify@yourdomain.com`
- Improves deliverability and branding

---

## Frontend Integration

### Example React Hook

```javascript
// hooks/useEmailVerification.js
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
      
      // Store access token
      localStorage.setItem('montrez_access_token', data.accessToken);
      
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { sendCode, verifyCode, loading, error };
}
```

### Example Component

```javascript
// components/EmailVerification.jsx
import { useState } from 'react';
import { useEmailVerification } from '../hooks/useEmailVerification';

export function EmailVerification({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('email'); // 'email' | 'code'
  const { sendCode, verifyCode, loading, error } = useEmailVerification();

  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      await sendCode(email);
      setStep('code');
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const result = await verifyCode(email, code);
      onSuccess(result.accessToken);
    } catch (err) {
      // Error handled by hook
    }
  };

  if (step === 'email') {
    return (
      <form onSubmit={handleSendCode}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Get Code'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    );
  }

  return (
    <form onSubmit={handleVerifyCode}>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter 6-digit code"
        maxLength={6}
        pattern="\d{6}"
        required
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Verifying...' : 'Verify'}
      </button>
      {error && <p className="error">{error}</p>}
      <button type="button" onClick={() => setStep('email')}>
        Use different email
      </button>
    </form>
  );
}
```

---

## Testing

### Local Testing

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local`:
```env
RESEND_API_KEY=your_key_here
EMAIL_FROM=MONTREZ <onboarding@resend.dev>
```

3. Run Vercel dev server:
```bash
vercel dev
```

4. Test endpoints:
```bash
# Send code
curl -X POST http://localhost:3000/api/send-code \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Verify code
curl -X POST http://localhost:3000/api/verify-code \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","code":"123456"}'
```

### Production Testing

1. Deploy to Vercel
2. Add environment variables in Vercel dashboard
3. Test with real email addresses
4. Verify rate limiting works
5. Check email deliverability

---

## Deployment

### Vercel Configuration

The `vercel.json` should include:

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

### Environment Variables

Add in Vercel dashboard:
- `RESEND_API_KEY` (Production + Preview)
- `EMAIL_FROM` (Production + Preview)

### Deployment Steps

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy
5. Test endpoints
6. Monitor logs

---

## Limitations & Future Improvements

### Current Limitations

**In-Memory Storage:**
- Codes/tokens lost on cold start
- Not suitable for high-traffic production
- No persistence across deployments

**No Database:**
- Can't track user history
- Can't implement advanced features
- Limited analytics

### Recommended Improvements

**For Production Scale:**

1. **Add Redis for storage:**
```javascript
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

// Store code
await redis.setex(`code:${email}`, 600, JSON.stringify(data));

// Get code
const data = await redis.get(`code:${email}`);
```

2. **Add database for user tracking:**
- Track verification attempts
- User analytics
- Access token management

3. **Implement token validation endpoint:**
```javascript
// POST /api/validate-token
// Check if access token is valid
```

4. **Add webhook for email events:**
- Track bounces
- Monitor deliverability
- Handle complaints

5. **Implement session management:**
- Refresh tokens
- Session expiry
- Multi-device support

6. **Add monitoring:**
- Error tracking (Sentry)
- Performance monitoring
- Rate limit alerts

---

## Support

For issues or questions:
- Check Vercel function logs
- Verify Resend API key is valid
- Check email deliverability in Resend dashboard
- Review rate limiting thresholds

---

**Built for MONTREZ - Pas pour Tout**
