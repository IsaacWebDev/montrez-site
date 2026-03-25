/**
 * @typedef {Object} OrderItem
 * @property {string} product - Product name
 * @property {number} quantity - Quantity ordered
 * @property {number} price - Price per unit
 */

/**
 * @typedef {Object} Order
 * @property {string} id - Order ID
 * @property {string} customer - Customer name
 * @property {string} email - Customer email
 * @property {number} total - Total order amount
 * @property {'Pending'|'Processing'|'Shipped'|'Delivered'|'Cancelled'} status - Order status
 * @property {string} date - Order date (ISO string)
 * @property {OrderItem[]} items - Order items
 */

/**
 * @typedef {Object} Product
 * @property {string} id - Product ID
 * @property {string} name - Product name
 * @property {number} price - Product price
 * @property {string} category - Product category
 * @property {string} imageUrl - Product image URL
 * @property {number} stock - Stock quantity
 * @property {string} description - Product description
 * @property {string} sku - Stock keeping unit
 */

/**
 * @typedef {Object} EmailTemplate
 * @property {string} id - Template ID
 * @property {string} name - Template name
 * @property {boolean} enabled - Whether template is enabled
 * @property {string} subject - Email subject
 * @property {string} body - Email body
 */

export const OrderStatus = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled'
}

export const ProductCategory = {
  WATCHES: 'Watches',
  ACCESSORIES: 'Accessories',
  JEWELRY: 'Jewelry',
  LIMITED: 'Limited Edition'
}
