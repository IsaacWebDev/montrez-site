import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import '../styles/Cart.css'

export default function Cart() {
  const navigate = useNavigate()
  const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart()

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const cartVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { type: 'spring', damping: 25, stiffness: 200 }
    },
    exit: { 
      x: '100%',
      transition: { type: 'spring', damping: 25, stiffness: 200 }
    }
  }

  const handleCheckout = () => {
    setIsCartOpen(false)
    navigate('/checkout')
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="cart-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Cart Panel */}
          <motion.div
            className="cart"
            variants={cartVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="cart__header">
              <h2 className="cart__title">Cart ({cart.length})</h2>
              <button
                className="cart__close"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="cart__items">
              {cart.length === 0 ? (
                <div className="cart__empty">
                  <p>Your cart is empty</p>
                  <button 
                    className="cart__continue-shopping"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  {cart.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.size}`}
                      className="cart__item"
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                    >
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="cart__item-image"
                      />
                      
                      <div className="cart__item-details">
                        <h3 className="cart__item-name">{item.name}</h3>
                        <p className="cart__item-size">Size: {item.size}</p>
                        <p className="cart__item-price">${item.price} USD</p>

                        <div className="cart__item-controls">
                          <div className="cart__item-quantity">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <button
                            className="cart__item-remove"
                            onClick={() => removeFromCart(item.id, item.size)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="cart__footer">
                <div className="cart__total">
                  <span>Subtotal</span>
                  <span className="cart__total-amount">${cartTotal.toFixed(2)} USD</span>
                </div>
                <p className="cart__shipping-note">Shipping calculated at checkout</p>
                <button 
                  className="cart__checkout-btn"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
