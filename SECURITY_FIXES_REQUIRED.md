# 🔴 SECURITY FIXES REQUIRED - URGENT

**Status:** NEEDS_FIXES  
**Blocking Production:** YES  
**Estimated Fix Time:** 2-3 hours

---

## CRITICAL VULNERABILITIES (Must fix immediately)

### 1. 🔴 Password Exposed in Frontend Code

**Problem:**
```javascript
// src/components/PasswordEmailModal.jsx (line 15)
const CORRECT_PASSWORD = 'NOTFOREVERYONE'
```

**Why it's critical:**
- Anyone can view source code and see password
- Password included in built JavaScript bundle
- No server-side validation
- Complete bypass of access control

**How to check:**
1. Open site in browser
2. Press F12 → Sources tab
3. Search for "NOTFOREVERYONE"
4. Password is visible to anyone

**Fix (30 minutes):**

1. Create `/api/verify-password.js`:
```javascript
import crypto from 'crypto';

export default async function handler(req, res) {
  const { password } = req.body;
  
  if (password === process.env.PASSWORD) {
    const token = crypto.randomBytes(32).toString('hex');
    return res.status(200).json({ success: true, token });
  }
  
  return res.status(401).json({ success: false, message: 'Invalid' });
}
```

2. Update `PasswordEmailModal.jsx`:
```javascript
// REMOVE: const CORRECT_PASSWORD = 'NOTFOREVERYONE'

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

3. Add to Vercel env vars:
```
PASSWORD=NOTFOREVERYONE
```

---

### 2. 🟠 Authentication Bypass via sessionStorage

**Problem:**
```javascript
sessionStorage.setItem('montrez-entrance-complete', 'true')
```

**Why it's critical:**
- Anyone can open console and run this
- Bypasses all authentication
- No token validation

**How to check:**
1. Open site
2. Press F12 → Console
3. Run: `sessionStorage.setItem('montrez-entrance-complete', 'true')`
4. Refresh → Full access granted

**Fix (15 minutes):**

Replace boolean flag with real token:
```javascript
// After successful auth
sessionStorage.setItem('montrez-access-token', token);

// On app load
const token = sessionStorage.getItem('montrez-access-token');
if (token) {
  setStage('site');
} else {
  setStage('landing');
}
```

---

### 3. 🟠 CORS Too Permissive (Email Flooding Risk)

**Problem:**
```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
```

**Why it's critical:**
- Allows requests from ANY website
- Attackers can flood emails from malicious sites
- No CSRF protection

**Fix (10 minutes):**

Update all API files (`send-code.js`, `verify-code.js`, `verify-password.js`):

```javascript
const ALLOWED_ORIGINS = [
  'https://montrez-site.vercel.app',
  'https://montrezofficial.com',
  'http://localhost:5173' // Dev only
];

const origin = req.headers.origin;
if (!ALLOWED_ORIGINS.includes(origin)) {
  return res.status(403).json({ success: false, message: 'Forbidden' });
}

res.setHeader('Access-Control-Allow-Origin', origin);
res.setHeader('Vary', 'Origin');
```

---

## IMPLEMENTATION CHECKLIST

### Step 1: Password Fix (30 min)
- [ ] Create `api/verify-password.js`
- [ ] Remove hardcoded password from `PasswordEmailModal.jsx`
- [ ] Remove hardcoded password from `PasswordModal.jsx`
- [ ] Add `PASSWORD` env var to Vercel
- [ ] Test password validation works
- [ ] Verify password NOT in built bundle

### Step 2: Token Fix (15 min)
- [ ] Replace `montrez-entrance-complete` flag with token
- [ ] Update `App.jsx` to check for token
- [ ] Test authentication flow
- [ ] Verify console bypass no longer works

### Step 3: CORS Fix (10 min)
- [ ] Add origin validation to `send-code.js`
- [ ] Add origin validation to `verify-code.js`
- [ ] Add origin validation to `verify-password.js`
- [ ] Test from allowed origins
- [ ] Test from unauthorized origin (should fail)

### Step 4: Verify (15 min)
- [ ] npm run build
- [ ] Check built bundle for secrets (should find none)
- [ ] Test full authentication flow
- [ ] Test console bypass (should fail)
- [ ] Test email verification
- [ ] Deploy to staging
- [ ] Final security check

---

## TESTING SCRIPT

```bash
# 1. Test password NOT in bundle
npm run build
grep -r "NOTFOREVERYONE" dist/
# Should return: NO MATCHES

# 2. Test authentication API
curl -X POST https://montrez-site.vercel.app/api/verify-password \
  -H "Content-Type: application/json" \
  -d '{"password":"wrong"}' 
# Should return: {"success":false}

curl -X POST https://montrez-site.vercel.app/api/verify-password \
  -H "Content-Type: application/json" \
  -d '{"password":"NOTFOREVERYONE"}' 
# Should return: {"success":true,"token":"..."}

# 3. Test CORS restriction
curl -X POST https://montrez-site.vercel.app/api/send-code \
  -H "Content-Type: application/json" \
  -H "Origin: https://evil-site.com" \
  -d '{"email":"test@example.com"}'
# Should return: 403 Forbidden
```

---

## FILES TO MODIFY

```
api/
  ├── verify-password.js     [CREATE NEW]
  ├── send-code.js           [MODIFY - Add CORS validation]
  └── verify-code.js         [MODIFY - Add CORS validation]

src/components/
  ├── PasswordEmailModal.jsx [MODIFY - Remove password, add API call]
  └── PasswordModal.jsx      [MODIFY - Remove password]

src/
  └── App.jsx                [MODIFY - Use token instead of flag]

Vercel Environment Variables:
  └── PASSWORD=NOTFOREVERYONE [ADD]
```

---

## RISK IF NOT FIXED

### Immediate Risks:
- ❌ Anyone can access the site by viewing source code
- ❌ Branding/exclusivity completely compromised
- ❌ Password leaked publicly once site is live
- ❌ Email system vulnerable to abuse
- ❌ No actual security - just security theater

### Business Impact:
- Loss of "exclusive" brand positioning
- Potential legal issues if password leads to unauthorized access
- Email system costs from flooding attacks
- Reputation damage if vulnerability is discovered

---

## AFTER FIXES

Once these fixes are implemented:

✅ Password secured server-side  
✅ Real token-based authentication  
✅ CORS restricted to authorized domains  
✅ No secrets in frontend code  
✅ Console bypass prevented  
✅ Email API protected from abuse  

**Status: SECURE** ✅

---

## QUESTIONS?

Contact main agent or security agent for:
- Implementation help
- Code review
- Additional security recommendations
- Deployment checklist

---

**URGENT: Do not deploy to production until these fixes are complete.**

**Estimated Total Time:** 70 minutes (1 hour 10 min)  
**Priority:** CRITICAL  
**Blocking:** YES
