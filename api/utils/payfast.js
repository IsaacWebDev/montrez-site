// PayFast Integration Utilities
// Documentation: https://developers.payfast.co.za/docs

import crypto from 'crypto';

/**
 * PayFast configuration
 */
export const getPayFastConfig = () => {
  const mode = process.env.PAYFAST_MODE || 'sandbox';
  
  return {
    merchantId: process.env.PAYFAST_MERCHANT_ID,
    merchantKey: process.env.PAYFAST_MERCHANT_KEY,
    passphrase: process.env.PAYFAST_PASSPHRASE,
    mode,
    url: mode === 'live' 
      ? 'https://www.payfast.co.za/eng/process'
      : 'https://sandbox.payfast.co.za/eng/process'
  };
};

/**
 * Generate PayFast signature
 * @param {Object} data - Payment data object
 * @param {string} passphrase - PayFast passphrase
 * @returns {string} MD5 signature
 */
export function generateSignature(data, passphrase = null) {
  // Create parameter string
  let pfParamString = '';
  
  for (let key in data) {
    if (data.hasOwnProperty(key) && key !== 'signature') {
      pfParamString += `${key}=${encodeURIComponent(data[key].toString().trim()).replace(/%20/g, '+')}&`;
    }
  }
  
  // Remove last ampersand
  pfParamString = pfParamString.slice(0, -1);
  
  // Add passphrase if provided
  if (passphrase) {
    pfParamString += `&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, '+')}`;
  }
  
  // Generate MD5 signature
  return crypto.createHash('md5').update(pfParamString).digest('hex');
}

/**
 * Verify PayFast signature from ITN
 * @param {Object} data - ITN data from PayFast
 * @param {string} signature - Signature to verify
 * @param {string} passphrase - PayFast passphrase
 * @returns {boolean} True if signature is valid
 */
export function verifySignature(data, signature, passphrase = null) {
  const calculatedSignature = generateSignature(data, passphrase);
  return calculatedSignature === signature;
}

/**
 * Verify PayFast server IP (security check)
 * @param {string} ip - Request IP address
 * @returns {boolean} True if IP is from PayFast
 */
export function verifyPayFastIP(ip) {
  const validIPs = [
    '197.97.145.144',
    '197.97.145.145',
    '197.97.145.146',
    '197.97.145.147',
    '197.97.145.148',
    '197.97.145.149',
    '197.97.145.150',
    '197.97.145.151',
    '197.97.145.152',
    '197.97.145.153',
    '197.97.145.154',
    '197.97.145.155',
    '197.97.145.156',
    '197.97.145.157',
    '197.97.145.158',
    '197.97.145.159'
  ];
  
  // In sandbox mode, also allow localhost
  if (process.env.PAYFAST_MODE === 'sandbox') {
    validIPs.push('127.0.0.1', '::1');
  }
  
  return validIPs.includes(ip);
}

/**
 * Validate PayFast payment amount
 * @param {number} pfAmount - Amount from PayFast ITN (in cents)
 * @param {number} expectedAmount - Expected amount (in cents)
 * @returns {boolean} True if amounts match
 */
export function validateAmount(pfAmount, expectedAmount) {
  // PayFast sends amount in format "XXX.XX" (e.g., "500.00")
  // We store in cents (e.g., 50000)
  const pfCents = Math.round(parseFloat(pfAmount) * 100);
  return pfCents === expectedAmount;
}

/**
 * Get real client IP from request (handles proxies)
 * @param {Object} req - Request object
 * @returns {string} Client IP address
 */
export function getClientIP(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers['x-real-ip'] || req.connection?.remoteAddress || req.socket?.remoteAddress || '';
}

/**
 * Sanitize and validate payment data
 * @param {Object} data - Payment data to sanitize
 * @returns {Object} Sanitized data
 */
export function sanitizePaymentData(data) {
  const sanitized = {};
  
  // Define allowed fields and their types
  const allowedFields = {
    merchant_id: 'string',
    merchant_key: 'string',
    return_url: 'string',
    cancel_url: 'string',
    notify_url: 'string',
    name_first: 'string',
    name_last: 'string',
    email_address: 'string',
    cell_number: 'string',
    m_payment_id: 'string',
    amount: 'number',
    item_name: 'string',
    item_description: 'string',
    custom_str1: 'string',
    custom_str2: 'string',
    custom_str3: 'string',
    custom_str4: 'string',
    custom_str5: 'string',
    custom_int1: 'number',
    custom_int2: 'number',
    custom_int3: 'number',
    custom_int4: 'number',
    custom_int5: 'number',
    email_confirmation: 'number',
    confirmation_address: 'string'
  };
  
  for (let key in data) {
    if (allowedFields[key]) {
      const expectedType = allowedFields[key];
      let value = data[key];
      
      // Type conversion and validation
      if (expectedType === 'string') {
        value = String(value).trim().substring(0, 255); // Limit length
      } else if (expectedType === 'number') {
        value = parseFloat(value) || 0;
      }
      
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}

/**
 * Format amount for PayFast (convert cents to decimal string)
 * @param {number} cents - Amount in cents
 * @returns {string} Formatted amount (e.g., "500.00")
 */
export function formatAmount(cents) {
  return (cents / 100).toFixed(2);
}

/**
 * Parse amount from PayFast (convert decimal string to cents)
 * @param {string} amount - Amount from PayFast (e.g., "500.00")
 * @returns {number} Amount in cents
 */
export function parseAmount(amount) {
  return Math.round(parseFloat(amount) * 100);
}

/**
 * Create PayFast payment data object
 * @param {Object} params - Payment parameters
 * @returns {Object} PayFast payment data
 */
export function createPaymentData({
  orderId,
  orderNumber,
  amount, // in cents
  customerName,
  customerEmail,
  customerPhone,
  itemName = 'Montrez Order',
  itemDescription = '',
  returnUrl,
  cancelUrl,
  notifyUrl
}) {
  const config = getPayFastConfig();
  
  const data = {
    merchant_id: config.merchantId,
    merchant_key: config.merchantKey,
    return_url: returnUrl,
    cancel_url: cancelUrl,
    notify_url: notifyUrl,
    name_first: customerName.split(' ')[0] || customerName,
    name_last: customerName.split(' ').slice(1).join(' ') || 'Customer',
    email_address: customerEmail,
    cell_number: customerPhone || '',
    m_payment_id: orderId, // Your internal order ID
    amount: formatAmount(amount),
    item_name: itemName,
    item_description: itemDescription || `Order ${orderNumber}`,
    custom_str1: orderNumber, // Store order number for reference
    email_confirmation: 1,
    confirmation_address: customerEmail
  };
  
  // Generate signature
  data.signature = generateSignature(data, config.passphrase);
  
  return data;
}

/**
 * Log PayFast transaction for audit trail
 * @param {string} type - Transaction type (initiate, callback, return)
 * @param {Object} data - Transaction data
 */
export function logTransaction(type, data) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    type,
    data: sanitizePaymentData(data)
  };
  
  // In production, log to database or logging service
  console.log('[PayFast]', JSON.stringify(logEntry, null, 2));
  
  return logEntry;
}

export default {
  getPayFastConfig,
  generateSignature,
  verifySignature,
  verifyPayFastIP,
  validateAmount,
  getClientIP,
  sanitizePaymentData,
  formatAmount,
  parseAmount,
  createPaymentData,
  logTransaction
};
