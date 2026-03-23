import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/checkout.css'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cart, cartTotal, clearCart } = useCart()
  
  const SHIPPING_COST = 100 // R100 flat rate
  const MIN_ORDER = 100 // R100 minimum

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
    province: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if cart is empty or below minimum
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/shop')
    } else if (cartTotal < MIN_ORDER) {
      alert(`Minimum order amount is R${MIN_ORDER}`)
      navigate('/shop')
    }
  }, [cart, cartTotal, navigate])

  // South African provinces
  const provinces = [
    'Eastern Cape',
    'Free State',
    'Gauteng',
    'KwaZulu-Natal',
    'Limpopo',
    'Mpumalanga',
    'Northern Cape',
    'North West',
    'Western Cape'
  ]

  // Validation functions
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validatePhone = (phone) => {
    // South African format: 0XX XXX XXXX (10 digits starting with 0)
    const cleaned = phone.replace(/\s/g, '')
    const re = /^0\d{9}$/
    return re.test(cleaned)
  }

  const formatPhone = (value) => {
    // Format as user types: 0XX XXX XXXX
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 3) return cleaned
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name === 'phone') {
      setFormData(prev => ({ ...prev, [name]: formatPhone(value) }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Required fields
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid South African phone number (0XX XXX XXXX)'
    }
    
    // Address validation
    if (!formData.street.trim()) newErrors.street = 'Street address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required'
    if (!formData.province) newErrors.province = 'Province is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.checkout-input-error')
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    setIsSubmitting(true)

    try {
      // Create order
      const orderData = {
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          image: item.image
        })),
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone.replace(/\s/g, '')
        },
        shipping: {
          address: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
          state: formData.province,
          country: 'South Africa',
          method: 'standard'
        },
        payment: {
          method: 'payfast'
        }
      }

      // Call payment initiate endpoint
      const response = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to initiate payment')
      }

      // Clear cart
      clearCart()

      // Redirect to PayFast
      if (result.payfastUrl) {
        window.location.href = result.payfastUrl
      } else {
        // Fallback: redirect to order confirmation
        navigate(`/order/${result.orderId}`)
      }

    } catch (error) {
      console.error('Checkout error:', error)
      alert(`Payment error: ${error.message}. Please try again.`)
      setIsSubmitting(false)
    }
  }

  const subtotal = cartTotal
  const shipping = SHIPPING_COST
  const total = subtotal + shipping

  return (
    <>
      <Navbar />
      
      <div className="checkout-page">
        <div className="checkout-container">
          <h1 className="checkout-title">CHECKOUT</h1>
          
          <div className="checkout-grid">
            {/* Left Column: Form */}
            <div className="checkout-form-section">
              <form onSubmit={handleSubmit} noValidate>
                {/* Customer Information */}
                <section className="checkout-section">
                  <h2 className="checkout-section-title">Customer Information</h2>
                  
                  <div className="checkout-row">
                    <div className="checkout-field">
                      <label htmlFor="firstName" className="checkout-label">
                        First Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={errors.firstName ? 'checkout-input checkout-input-error' : 'checkout-input'}
                        aria-required="true"
                        aria-invalid={!!errors.firstName}
                        aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                      />
                      {errors.firstName && (
                        <span id="firstName-error" className="checkout-error" role="alert">
                          {errors.firstName}
                        </span>
                      )}
                    </div>
                    
                    <div className="checkout-field">
                      <label htmlFor="lastName" className="checkout-label">
                        Last Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={errors.lastName ? 'checkout-input checkout-input-error' : 'checkout-input'}
                        aria-required="true"
                        aria-invalid={!!errors.lastName}
                        aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                      />
                      {errors.lastName && (
                        <span id="lastName-error" className="checkout-error" role="alert">
                          {errors.lastName}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="checkout-field">
                    <label htmlFor="email" className="checkout-label">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'checkout-input checkout-input-error' : 'checkout-input'}
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <span id="email-error" className="checkout-error" role="alert">
                        {errors.email}
                      </span>
                    )}
                  </div>
                  
                  <div className="checkout-field">
                    <label htmlFor="phone" className="checkout-label">
                      Phone Number <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0XX XXX XXXX"
                      maxLength="12"
                      className={errors.phone ? 'checkout-input checkout-input-error' : 'checkout-input'}
                      aria-required="true"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                    {errors.phone && (
                      <span id="phone-error" className="checkout-error" role="alert">
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </section>

                {/* Shipping Address */}
                <section className="checkout-section">
                  <h2 className="checkout-section-title">Shipping Address</h2>
                  
                  <div className="checkout-field">
                    <label htmlFor="street" className="checkout-label">
                      Street Address <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      className={errors.street ? 'checkout-input checkout-input-error' : 'checkout-input'}
                      aria-required="true"
                      aria-invalid={!!errors.street}
                      aria-describedby={errors.street ? 'street-error' : undefined}
                    />
                    {errors.street && (
                      <span id="street-error" className="checkout-error" role="alert">
                        {errors.street}
                      </span>
                    )}
                  </div>
                  
                  <div className="checkout-row">
                    <div className="checkout-field">
                      <label htmlFor="city" className="checkout-label">
                        City <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={errors.city ? 'checkout-input checkout-input-error' : 'checkout-input'}
                        aria-required="true"
                        aria-invalid={!!errors.city}
                        aria-describedby={errors.city ? 'city-error' : undefined}
                      />
                      {errors.city && (
                        <span id="city-error" className="checkout-error" role="alert">
                          {errors.city}
                        </span>
                      )}
                    </div>
                    
                    <div className="checkout-field">
                      <label htmlFor="postalCode" className="checkout-label">
                        Postal Code <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className={errors.postalCode ? 'checkout-input checkout-input-error' : 'checkout-input'}
                        aria-required="true"
                        aria-invalid={!!errors.postalCode}
                        aria-describedby={errors.postalCode ? 'postalCode-error' : undefined}
                      />
                      {errors.postalCode && (
                        <span id="postalCode-error" className="checkout-error" role="alert">
                          {errors.postalCode}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="checkout-field">
                    <label htmlFor="province" className="checkout-label">
                      Province <span className="required">*</span>
                    </label>
                    <select
                      id="province"
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                      className={errors.province ? 'checkout-input checkout-input-error' : 'checkout-input'}
                      aria-required="true"
                      aria-invalid={!!errors.province}
                      aria-describedby={errors.province ? 'province-error' : undefined}
                    >
                      <option value="">Select Province</option>
                      {provinces.map(province => (
                        <option key={province} value={province}>{province}</option>
                      ))}
                    </select>
                    {errors.province && (
                      <span id="province-error" className="checkout-error" role="alert">
                        {errors.province}
                      </span>
                    )}
                  </div>
                </section>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="checkout-submit-btn"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="checkout-spinner" aria-hidden="true"></span>
                      Processing...
                    </>
                  ) : (
                    'PROCEED TO PAYMENT'
                  )}
                </button>
              </form>
            </div>

            {/* Right Column: Order Summary */}
            <div className="checkout-summary-section">
              <div className="checkout-summary-sticky">
                <h2 className="checkout-section-title">Order Summary</h2>
                
                <div className="checkout-items">
                  {cart.map((item, index) => (
                    <div key={`${item.id}-${item.size}-${index}`} className="checkout-item">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="checkout-item-image"
                      />
                      <div className="checkout-item-details">
                        <h3 className="checkout-item-name">{item.name}</h3>
                        <p className="checkout-item-meta">
                          Size: {item.size} | Qty: {item.quantity}
                        </p>
                        <p className="checkout-item-price">R{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="checkout-summary-totals">
                  <div className="checkout-summary-row">
                    <span>Subtotal:</span>
                    <span>R{subtotal}</span>
                  </div>
                  <div className="checkout-summary-row">
                    <span>Shipping:</span>
                    <span>R{shipping}</span>
                  </div>
                  <div className="checkout-summary-row checkout-summary-total">
                    <span>Total:</span>
                    <span>R{total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
