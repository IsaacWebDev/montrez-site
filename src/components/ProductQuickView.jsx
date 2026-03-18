import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import '../styles/ProductQuickView.css'

export default function ProductQuickView({ product, isOpen, onClose }) {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const sizes = product?.sizes || ['S', 'M', 'L', 'XL']
  const images = product?.images || [product?.image]

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }
    addToCart(product, selectedSize)
    onClose()
  }

  const handleViewDetails = () => {
    navigate(`/product/${product?.id}`)
    onClose()
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', damping: 25, stiffness: 300 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  }

  if (!product) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="quick-view-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="quick-view"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="quick-view__close"
              onClick={onClose}
              aria-label="Close quick view"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="quick-view__content">
              {/* Images */}
              <div className="quick-view__images">
                <motion.img
                  key={selectedImage}
                  src={images[selectedImage]}
                  alt={product.name}
                  className="quick-view__main-image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {images.length > 1 && (
                  <div className="quick-view__thumbnails">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        className={`quick-view__thumbnail ${selectedImage === idx ? 'active' : ''}`}
                        onClick={() => setSelectedImage(idx)}
                      >
                        <img src={img} alt={`${product.name} ${idx + 1}`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="quick-view__details">
                <h2 className="quick-view__name">{product.name}</h2>
                <p className="quick-view__price">${product.price} USD</p>

                {product.description && (
                  <p className="quick-view__description">{product.description}</p>
                )}

                {/* Size Selection */}
                <div className="quick-view__sizes">
                  <label className="quick-view__label">Select Size</label>
                  <div className="quick-view__size-buttons">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        className={`quick-view__size-btn ${selectedSize === size ? 'active' : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="quick-view__actions">
                  <button
                    className="quick-view__add-btn"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'Add to Cart' : 'Sold Out'}
                  </button>
                  <button
                    className="quick-view__details-btn"
                    onClick={handleViewDetails}
                  >
                    View Full Details
                  </button>
                </div>

                {/* Stock Status */}
                {product.inStock && (
                  <p className="quick-view__stock">In Stock - Ships in 3-5 Business Days</p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
