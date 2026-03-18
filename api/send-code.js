/**
 * MONTREZ EMAIL VERIFICATION - SEND CODE
 * POST /api/send-code
 * Generates 6-digit code, sends via Resend, stores in memory
 */

// In-memory storage for codes and rate limiting
const codeStore = new Map(); // { email: { code, expires, attempts } }
const rateLimitStore = new Map(); // { email: [timestamps] }
const ipRateLimitStore = new Map(); // { ip: [timestamps] }

// Config
const CODE_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
const MAX_CODES_PER_HOUR = 3;
const MAX_REQUESTS_PER_IP_PER_HOUR = 10;
const CODE_MIN = 100000;
const CODE_MAX = 999999;

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generate random 6-digit code
 */
function generateCode() {
  return Math.floor(CODE_MIN + Math.random() * (CODE_MAX - CODE_MIN + 1)).toString();
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
  
  // Clean old rate limit entries (older than 1 hour)
  const hourAgo = now - 60 * 60 * 1000;
  
  for (const [email, timestamps] of rateLimitStore.entries()) {
    const recent = timestamps.filter(t => t > hourAgo);
    if (recent.length === 0) {
      rateLimitStore.delete(email);
    } else {
      rateLimitStore.set(email, recent);
    }
  }
  
  for (const [ip, timestamps] of ipRateLimitStore.entries()) {
    const recent = timestamps.filter(t => t > hourAgo);
    if (recent.length === 0) {
      ipRateLimitStore.delete(ip);
    } else {
      ipRateLimitStore.set(ip, recent);
    }
  }
}

/**
 * Check rate limiting
 */
function checkRateLimit(email, ip) {
  const now = Date.now();
  const hourAgo = now - 60 * 60 * 1000;
  
  // Check email rate limit
  const emailTimestamps = rateLimitStore.get(email) || [];
  const recentEmailRequests = emailTimestamps.filter(t => t > hourAgo);
  
  if (recentEmailRequests.length >= MAX_CODES_PER_HOUR) {
    return { allowed: false, reason: 'email', retryAfter: Math.ceil((recentEmailRequests[0] + 60 * 60 * 1000 - now) / 1000) };
  }
  
  // Check IP rate limit
  const ipTimestamps = ipRateLimitStore.get(ip) || [];
  const recentIpRequests = ipTimestamps.filter(t => t > hourAgo);
  
  if (recentIpRequests.length >= MAX_REQUESTS_PER_IP_PER_HOUR) {
    return { allowed: false, reason: 'ip', retryAfter: Math.ceil((recentIpRequests[0] + 60 * 60 * 1000 - now) / 1000) };
  }
  
  return { allowed: true };
}

/**
 * Record rate limit attempt
 */
function recordRateLimitAttempt(email, ip) {
  const now = Date.now();
  
  const emailTimestamps = rateLimitStore.get(email) || [];
  emailTimestamps.push(now);
  rateLimitStore.set(email, emailTimestamps);
  
  const ipTimestamps = ipRateLimitStore.get(ip) || [];
  ipTimestamps.push(now);
  ipRateLimitStore.set(ip, ipTimestamps);
}

/**
 * Send email via Resend
 */
async function sendEmail(email, code) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  
  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY not configured');
  }
  
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || 'MONTREZ <onboarding@resend.dev>',
      to: email,
      subject: 'Your MONTREZ Verification Code',
      text: `Your verification code is: ${code}\n\nThis code will expire in 10 minutes.\n\nMONTREZ - Pas pour Tout`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #000; color: #fff;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="font-size: 32px; font-weight: bold; letter-spacing: 2px; margin: 0;">MONTREZ</h1>
            <p style="font-size: 12px; font-style: italic; margin: 5px 0; opacity: 0.8;">Pas pour Tout</p>
          </div>
          
          <div style="background-color: #111; border: 1px solid #333; padding: 30px; text-align: center; border-radius: 4px;">
            <p style="font-size: 14px; margin: 0 0 20px 0; opacity: 0.9;">Your verification code is:</p>
            <div style="font-size: 48px; font-weight: bold; letter-spacing: 8px; margin: 20px 0; color: #fff;">${code}</div>
            <p style="font-size: 12px; margin: 20px 0 0 0; opacity: 0.7;">This code will expire in 10 minutes.</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; font-size: 11px; opacity: 0.6;">
            <p>MONTREZ - Not for everyone</p>
          </div>
        </div>
      `
    })
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error: ${error}`);
  }
  
  return await response.json();
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
    
    const { email } = req.body;
    
    // Validate email
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address' });
    }
    
    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();
    
    // Get IP address
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.headers['x-real-ip'] || req.socket.remoteAddress;
    
    // Check rate limiting
    const rateLimitCheck = checkRateLimit(normalizedEmail, ip);
    if (!rateLimitCheck.allowed) {
      return res.status(429).json({
        success: false,
        message: rateLimitCheck.reason === 'email' 
          ? `Too many requests for this email. Please try again in ${Math.ceil(rateLimitCheck.retryAfter / 60)} minutes.`
          : `Too many requests from this IP. Please try again later.`,
        retryAfter: rateLimitCheck.retryAfter
      });
    }
    
    // Generate code
    const code = generateCode();
    const expires = Date.now() + CODE_EXPIRY_MS;
    
    // Store code
    codeStore.set(normalizedEmail, {
      code,
      expires,
      attempts: 0
    });
    
    // Record rate limit attempt
    recordRateLimitAttempt(normalizedEmail, ip);
    
    // Send email
    await sendEmail(normalizedEmail, code);
    
    return res.status(200).json({
      success: true,
      message: 'Code sent to email',
      expiresIn: CODE_EXPIRY_MS / 1000 // seconds
    });
    
  } catch (error) {
    console.error('Send code error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send verification code. Please try again.'
    });
  }
}
