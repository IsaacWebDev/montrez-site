import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import '../styles/ProductQuickView.css'

export default function ProductQuickView({ product, isOpen, onClose }) {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [showAddedConfirm, setShowAddedConfirm] = useState(false)
  const [expandedSection, setExpandedSection] = useState(null)
  const { addToCart } = useCart()
  const navigate = useNavigate() // Keep for cart navigation

  const sizes = product?.sizes || ['S', 'M', 'L', 'XL']
  const images = product?.images || [product?.image]

  // Keyboard navigation for images
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return
      if (e.key === 'ArrowLeft') {
        setSelectedImage(prev => (prev > 0 ? prev - 1 : images.length - 1))
      } else if (e.key === 'ArrowRight') {
        setSelectedImage(prev => (prev < images.length - 1 ? prev + 1 : 0))
      } else if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, images.length, onClose])

  // Mock stock data per size (in real app, this would come from backend)
  const getSizeStock = (size) => {
    const stockMap = {
      'S': 5,
      'M': 12,
      'L': 8,
      'XL': 3,
      'XXL': 2
    }
    return stockMap[size] || 10
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }
    addToCart(product, selectedSize)
    setShowAddedConfirm(true)
    setTimeout(() => {
      setShowAddedConfirm(false)
    }, 3000)
  }

  const handleContinueShopping = () => {
    setShowAddedConfirm(false)
    onClose()
  }

  const handleViewCart = () => {
    navigate('/cart')
    onClose()
  }

  const nextImage = () => {
    setSelectedImage(prev => (prev < images.length - 1 ? prev + 1 : 0))
  }

  const prevImage = () => {
    setSelectedImage(prev => (prev > 0 ? prev - 1 : images.length - 1))
  }

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
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
      // NO x, y, or position properties here to avoid conflicts!
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
              {/* Images with Navigation */}
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
                
                {/* Image Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button 
                      className="quick-view__arrow quick-view__arrow--left"
                      onClick={prevImage}
                      aria-label="Previous image"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button 
                      className="quick-view__arrow quick-view__arrow--right"
                      onClick={nextImage}
                      aria-label="Next image"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <div className="quick-view__image-counter">
                      {selectedImage + 1} / {images.length}
                    </div>
                  </>
                )}
                
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

                {/* Size Selection with Stock */}
                <div className="quick-view__sizes">
                  <div className="quick-view__size-header">
                    <label className="quick-view__label">Select Size</label>
                    <button 
                      className="quick-view__size-guide-btn"
                      onClick={() => setShowSizeGuide(true)}
                    >
                      Size Guide
                    </button>
                  </div>
                  <p className="quick-view__size-hint">Fits true to size. Take your normal size.</p>
                  <div className="quick-view__size-buttons">
                    {sizes.map((size) => {
                      const stock = getSizeStock(size)
                      const lowStock = stock < 5
                      return (
                        <button
                          key={size}
                          className={`quick-view__size-btn ${selectedSize === size ? 'active' : ''} ${lowStock ? 'low-stock' : ''}`}
                          onClick={() => setSelectedSize(size)}
                        >
                          <span className="quick-view__size-label">{size}</span>
                          {lowStock && <span className="quick-view__size-stock">Only {stock} left</span>}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Materials & Shipping Accordion */}
                <div className="quick-view__accordion">
                  <button 
                    className={`quick-view__accordion-item ${expandedSection === 'materials' ? 'expanded' : ''}`}
                    onClick={() => toggleSection('materials')}
                  >
                    <span>Materials & Care</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {expandedSection === 'materials' && (
                    <motion.div 
                      className="quick-view__accordion-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <p>• 100% Premium European Cotton</p>
                      <p>• French-crafted construction</p>
                      <p>• Machine wash cold, tumble dry low</p>
                      <p>• Do not bleach or iron directly on print</p>
                    </motion.div>
                  )}

                  <button 
                    className={`quick-view__accordion-item ${expandedSection === 'shipping' ? 'expanded' : ''}`}
                    onClick={() => toggleSection('shipping')}
                  >
                    <span>Shipping & Returns</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {expandedSection === 'shipping' && (
                    <motion.div 
                      className="quick-view__accordion-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <p>• <strong>Free delivery</strong> over R1,000</p>
                      <p>• Standard shipping: 3-5 business days</p>
                      <p>• Express shipping: 1-2 business days (+R150)</p>
                      <p>• 30-day returns on unworn items</p>
                      <p>• SKU: {product.sku}</p>
                    </motion.div>
                  )}
                </div>

                {/* Actions */}
                <div className="quick-view__actions">
                  <button
                    className="quick-view__add-btn"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'SECURE YOURS' : 'SOLD OUT'}
                  </button>
                </div>

                {/* Stock Status */}
                {product.inStock && (
                  <p className="quick-view__stock">✓ In Stock - Ships within 3-5 business days</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Added to Cart Confirmation */}
          <AnimatePresence>
            {showAddedConfirm && (
              <motion.div
                className="quick-view-confirm"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
              >
                <div className="quick-view-confirm__content">
                  <svg className="quick-view-confirm__icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <h3 className="quick-view-confirm__title">Added to cart!</h3>
                    <p className="quick-view-confirm__text">{product.name} (Size {selectedSize})</p>
                  </div>
                </div>
                <div className="quick-view-confirm__actions">
                  <button onClick={handleContinueShopping} className="quick-view-confirm__btn-secondary">
                    Continue Shopping
                  </button>
                  <button onClick={handleViewCart} className="quick-view-confirm__btn-primary">
                    View Cart
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Size Guide Modal */}
          <AnimatePresence>
            {showSizeGuide && (
              <>
                <motion.div
                  className="quick-view-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowSizeGuide(false)}
                />
                <motion.div
                  className="quick-view-sizeguide"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <button
                    className="quick-view__close"
                    onClick={() => setShowSizeGuide(false)}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <h3 className="quick-view-sizeguide__title">Size Guide</h3>
                  <p className="quick-view-sizeguide__subtitle">All measurements in centimeters</p>
                  <table className="quick-view-sizeguide__table">
                    <thead>
                      <tr>
                        <th>Size</th>
                        <th>Chest</th>
                        <th>Length</th>
                        <th>Shoulders</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>S</strong></td>
                        <td>96-101</td>
                        <td>69</td>
                        <td>44</td>
                      </tr>
                      <tr>
                        <td><strong>M</strong></td>
                        <td>101-106</td>
                        <td>71</td>
                        <td>46</td>
                      </tr>
                      <tr>
                        <td><strong>L</strong></td>
                        <td>106-111</td>
                        <td>73</td>
                        <td>48</td>
                      </tr>
                      <tr>
                        <td><strong>XL</strong></td>
                        <td>111-116</td>
                        <td>75</td>
                        <td>50</td>
                      </tr>
                      <tr>
                        <td><strong>XXL</strong></td>
                        <td>116-121</td>
                        <td>77</td>
                        <td>52</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="quick-view-sizeguide__note">
                    <strong>Fit:</strong> Fits true to size. Take your normal size for a regular fit.
                  </p>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}
