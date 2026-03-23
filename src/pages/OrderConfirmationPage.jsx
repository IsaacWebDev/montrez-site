import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/order-confirmation.css'

export default function OrderConfirmationPage() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!orderId) {
      navigate('/shop')
      return
    }

    fetchOrder()
  }, [orderId, navigate])

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders?orderId=${orderId}`)
      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to load order')
      }

      if (!result.orders || result.orders.length === 0) {
        throw new Error('Order not found')
      }

      setOrder(result.orders[0])
    } catch (err) {
      console.error('Error fetching order:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getStatusDisplay = (status) => {
    const statusMap = {
      pending: { label: 'Payment Pending', class: 'status-pending' },
      confirmed: { label: 'Order Confirmed', class: 'status-confirmed' },
      processing: { label: 'Processing', class: 'status-processing' },
      shipped: { label: 'Shipped', class: 'status-shipped' },
      delivered: { label: 'Delivered', class: 'status-delivered' },
      cancelled: { label: 'Cancelled', class: 'status-cancelled' }
    }
    return statusMap[status] || { label: status, class: '' }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="order-confirmation-page">
          <div className="order-confirmation-container">
            <div className="order-loading">
              <div className="order-spinner" aria-label="Loading order"></div>
              <p>Loading order details...</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (error || !order) {
    return (
      <>
        <Navbar />
        <div className="order-confirmation-page">
          <div className="order-confirmation-container">
            <div className="order-error">
              <h1>Order Not Found</h1>
              <p>{error || 'We couldn\'t find this order. Please check your order number and try again.'}</p>
              <button onClick={() => navigate('/shop')} className="order-back-btn">
                RETURN TO SHOP
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const statusInfo = getStatusDisplay(order.status)
  const estimatedDelivery = new Date(order.createdAt)
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 10) // 7-10 business days

  return (
    <>
      <Navbar />
      
      <div className="order-confirmation-page">
        <div className="order-confirmation-container">
          {/* Success Header */}
          <div className="order-success-header">
            <div className="order-success-icon" aria-hidden="true">✓</div>
            <h1 className="order-success-title">THANK YOU FOR YOUR ORDER</h1>
            <p className="order-success-subtitle">
              Your order has been received and is being processed
            </p>
          </div>

          {/* Order Details Card */}
          <div className="order-details-card">
            <div className="order-details-header">
              <div>
                <h2 className="order-number-label">Order Number</h2>
                <p className="order-number">{order.orderId}</p>
              </div>
              <div className={`order-status ${statusInfo.class}`}>
                {statusInfo.label}
              </div>
            </div>

            {/* Order Information Grid */}
            <div className="order-info-grid">
              <div className="order-info-section">
                <h3 className="order-info-title">Customer Information</h3>
                <p className="order-info-text">
                  {order.customer.firstName} {order.customer.lastName}
                </p>
                <p className="order-info-text">{order.customer.email}</p>
                {order.customer.phone && (
                  <p className="order-info-text">{order.customer.phone}</p>
                )}
              </div>

              <div className="order-info-section">
                <h3 className="order-info-title">Shipping Address</h3>
                <p className="order-info-text">{order.shipping.address}</p>
                {order.shipping.address2 && (
                  <p className="order-info-text">{order.shipping.address2}</p>
                )}
                <p className="order-info-text">
                  {order.shipping.city}, {order.shipping.state} {order.shipping.postalCode}
                </p>
                <p className="order-info-text">{order.shipping.country}</p>
              </div>

              <div className="order-info-section">
                <h3 className="order-info-title">Estimated Delivery</h3>
                <p className="order-info-text order-delivery-date">
                  {estimatedDelivery.toLocaleDateString('en-ZA', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="order-info-note">7-10 business days</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="order-items-section">
              <h3 className="order-section-title">Items Ordered</h3>
              <div className="order-items-list">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="order-item-image"
                    />
                    <div className="order-item-details">
                      <h4 className="order-item-name">{item.name}</h4>
                      <p className="order-item-meta">
                        {item.size && `Size: ${item.size}`}
                        {item.color && ` | Color: ${item.color}`}
                      </p>
                      <p className="order-item-quantity">Quantity: {item.quantity}</p>
                    </div>
                    <div className="order-item-price">
                      R{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-summary-section">
              <div className="order-summary-row">
                <span>Subtotal:</span>
                <span>R{order.pricing.subtotal.toFixed(2)}</span>
              </div>
              <div className="order-summary-row">
                <span>Shipping:</span>
                <span>R{order.pricing.shipping.toFixed(2)}</span>
              </div>
              {order.pricing.tax > 0 && (
                <div className="order-summary-row">
                  <span>Tax:</span>
                  <span>R{order.pricing.tax.toFixed(2)}</span>
                </div>
              )}
              <div className="order-summary-row order-summary-total">
                <span>Total Paid:</span>
                <span>R{order.pricing.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Confirmation Message */}
            <div className="order-confirmation-message">
              <p>
                A confirmation email has been sent to <strong>{order.customer.email}</strong>.
                You can use your order number <strong>{order.orderId}</strong> to track your shipment.
              </p>
              <p className="order-support-text">
                Need help? Contact us at <a href="mailto:support@montrez.com">support@montrez.com</a>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="order-actions">
              <button
                onClick={() => navigate('/shop')}
                className="order-action-btn order-action-primary"
              >
                CONTINUE SHOPPING
              </button>
              <button
                onClick={() => window.print()}
                className="order-action-btn order-action-secondary"
              >
                PRINT ORDER
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
