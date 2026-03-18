/**
 * MONTREZ PASSWORD VERIFICATION
 * POST /api/verify-password
 * Verifies password, returns access token on success
 */

import crypto from 'crypto';

// Shared access token storage
const accessTokenStore = new Map(); // { token: { type: 'password', expires } }

// Config
const ACCESS_TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours
const CORRECT_PASSWORD = process.env.VITE_PASSWORD || 'NOTFOREVERYONE';

/**
 * Generate secure access token
 */
function generateAccessToken() {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Clean up expired access tokens
 */
function cleanupExpired() {
  const now = Date.now();
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
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }
  
  try {
    // Cleanup expired tokens
    cleanupExpired();
    
    const { password } = req.body;
    
    // Validate input
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ success: false, error: 'Password required' });
    }
    
    // Verify password
    if (password.trim() !== CORRECT_PASSWORD) {
      return res.status(401).json({ success: false, error: 'Incorrect password' });
    }
    
    // Password correct - generate access token
    const accessToken = generateAccessToken();
    const tokenExpires = Date.now() + ACCESS_TOKEN_EXPIRY_MS;
    
    accessTokenStore.set(accessToken, {
      type: 'password',
      expires: tokenExpires
    });
    
    return res.status(200).json({
      success: true,
      token: accessToken,
      expiresIn: ACCESS_TOKEN_EXPIRY_MS / 1000 // seconds
    });
    
  } catch (error) {
    console.error('Password verification error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to verify password. Please try again.'
    });
  }
}
