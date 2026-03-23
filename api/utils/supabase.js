// Supabase Client for Backend API
import { createClient } from '@supabase/supabase-js';

/**
 * Get Supabase client with service role key (for backend operations)
 * Use this for server-side operations that bypass RLS
 */
export function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables');
  }
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

/**
 * Get Supabase client with anon key (for client-side operations)
 * This respects RLS policies
 */
export function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }
  
  return createClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Generate unique order number in format: MTZ-YYYYMMDD-XXXXX
 */
export function generateOrderNumber() {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `MTZ-${dateStr}-${randomStr}`;
}

/**
 * Create a new order in Supabase
 * @param {Object} orderData - Order data
 * @returns {Promise<Object>} Created order
 */
export async function createOrder(orderData) {
  const supabase = getSupabaseAdmin();
  
  // Generate order number
  const orderNumber = generateOrderNumber();
  
  // Prepare order data
  const order = {
    order_number: orderNumber,
    customer_email: orderData.customerEmail,
    customer_name: orderData.customerName,
    customer_phone: orderData.customerPhone || null,
    shipping_address: orderData.shippingAddress,
    items: orderData.items,
    subtotal: orderData.subtotal,
    shipping_cost: orderData.shippingCost || 10000, // R100 = 10000 cents
    total: orderData.total,
    payment_status: 'pending',
    payment_id: null,
    payfast_data: null
  };
  
  const { data, error } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single();
  
  if (error) {
    console.error('Supabase create order error:', error);
    throw new Error(`Failed to create order: ${error.message}`);
  }
  
  return data;
}

/**
 * Get order by ID
 * @param {string} orderId - Order UUID
 * @returns {Promise<Object>} Order data
 */
export async function getOrderById(orderId) {
  const supabase = getSupabaseAdmin();
  
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();
  
  if (error) {
    console.error('Supabase get order error:', error);
    throw new Error(`Failed to get order: ${error.message}`);
  }
  
  return data;
}

/**
 * Get order by order number
 * @param {string} orderNumber - Order number (MTZ-YYYYMMDD-XXXXX)
 * @returns {Promise<Object>} Order data
 */
export async function getOrderByNumber(orderNumber) {
  const supabase = getSupabaseAdmin();
  
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('order_number', orderNumber)
    .single();
  
  if (error) {
    console.error('Supabase get order by number error:', error);
    throw new Error(`Failed to get order: ${error.message}`);
  }
  
  return data;
}

/**
 * Update order payment status
 * @param {string} orderId - Order UUID
 * @param {Object} paymentData - Payment data from PayFast
 * @returns {Promise<Object>} Updated order
 */
export async function updateOrderPayment(orderId, paymentData) {
  const supabase = getSupabaseAdmin();
  
  const { data, error } = await supabase
    .from('orders')
    .update({
      payment_status: paymentData.status,
      payment_id: paymentData.paymentId,
      payfast_data: paymentData.fullData,
      updated_at: new Date().toISOString()
    })
    .eq('id', orderId)
    .select()
    .single();
  
  if (error) {
    console.error('Supabase update payment error:', error);
    throw new Error(`Failed to update order payment: ${error.message}`);
  }
  
  return data;
}

/**
 * Get orders by customer email
 * @param {string} email - Customer email
 * @returns {Promise<Array>} Orders
 */
export async function getOrdersByEmail(email) {
  const supabase = getSupabaseAdmin();
  
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('customer_email', email)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Supabase get orders by email error:', error);
    throw new Error(`Failed to get orders: ${error.message}`);
  }
  
  return data;
}

/**
 * Format amount from cents to Rands string
 * @param {number} cents - Amount in cents
 * @returns {string} Formatted amount (e.g., "R500.00")
 */
export function formatAmount(cents) {
  return `R${(cents / 100).toFixed(2)}`;
}

/**
 * Parse amount from string to cents
 * @param {string|number} amount - Amount as string or number
 * @returns {number} Amount in cents
 */
export function parseAmount(amount) {
  if (typeof amount === 'number') return Math.round(amount * 100);
  return Math.round(parseFloat(amount.replace(/[^0-9.]/g, '')) * 100);
}

export default {
  getSupabaseAdmin,
  getSupabaseClient,
  generateOrderNumber,
  createOrder,
  getOrderById,
  getOrderByNumber,
  updateOrderPayment,
  getOrdersByEmail,
  formatAmount,
  parseAmount
};
