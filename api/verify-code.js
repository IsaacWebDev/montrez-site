/**
 * MONTREZ EMAIL VERIFICATION - VERIFY CODE
 * POST /api/verify-code
 * Verifies 6-digit code, returns access token on success
 */

import crypto from 'crypto';

// Shared in-memory storage (same instance as send-code.js in serverless context)
// Note: In production, use Redis or database for persistence across cold starts
const codeStore = new Map(); // { email: { code, expires, attempts } }
const accessTokenStore = new Map(); // { token: { email, expires } }

// Config
const MAX_ATTEMPTS = 3;
const ACCESS_TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generate secure access token
 */
function generateAccessToken() {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Clean up expired entries
 */
function cleanupExpired() {
  const now = Date.now();
  
  // Clean expired codes
  for (const [email, data] of codeStore.entries()) {
    if (data.expires < now) {
      codeStore.delete(email);
    }
  }
  
  // Clean expired access tokens
  for (const [token, data] of accessTokenStore.entries()) {
    if (data.expires < now) {
      accessTokenStore.delete(token);
    }
  }
}

/**
 * Main handler
 */
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
  
  try {
    // Cleanup expired entries
    cleanupExpired();
    
    const { email, code } = req.body;
    
    // Validate inputs
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address' });
    }
    
    if (!code || !/^\d{6}$/.test(code)) {
      return res.status(400).json({ success: false, message: 'Invalid code format' });
    }
    
    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check if code exists
    const storedData = codeStore.get(normalizedEmail);
    
    if (!storedData) {
      return res.status(400).json({
        success: false,
        message: 'No verification code found. Please request a new code.'
      });
    }
    
    // Check if code expired
    if (storedData.expires < Date.now()) {
      codeStore.delete(normalizedEmail);
      return res.status(400).json({
        success: false,
        message: 'Code expired. Please request a new code.'
      });
    }
    
    // Check max attempts
    if (storedData.attempts >= MAX_ATTEMPTS) {
      codeStore.delete(normalizedEmail);
      return res.status(400).json({
        success: false,
        message: 'Too many failed attempts. Please request a new code.'
      });
    }
    
    // Verify code
    if (storedData.code !== code) {
      // Increment attempts
      storedData.attempts += 1;
      codeStore.set(normalizedEmail, storedData);
      
      const attemptsRemaining = MAX_ATTEMPTS - storedData.attempts;
      
      return res.status(400).json({
        success: false,
        message: `Invalid code. ${attemptsRemaining} attempt${attemptsRemaining !== 1 ? 's' : ''} remaining.`,
        attemptsRemaining
      });
    }
    
    // Code verified successfully
    // Generate access token
    const accessToken = generateAccessToken();
    const tokenExpires = Date.now() + ACCESS_TOKEN_EXPIRY_MS;
    
    accessTokenStore.set(accessToken, {
      email: normalizedEmail,
      expires: tokenExpires
    });
    
    // Delete used code
    codeStore.delete(normalizedEmail);
    
    return res.status(200).json({
      success: true,
      message: 'Code verified',
      token: accessToken,
      expiresIn: ACCESS_TOKEN_EXPIRY_MS / 1000 // seconds
    });
    
  } catch (error) {
    console.error('Verify code error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to verify code. Please try again.'
    });
  }
}
