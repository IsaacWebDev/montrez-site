import { useState } from 'react'
import { motion } from 'framer-motion'
import ProductQuickView from './ProductQuickView'
import '../styles/ProductCard.css'

export default function ProductCard({ product }) {
  const [showQuickView, setShowQuickView] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Quick View is the ONLY interaction - no navigation to product pages
  const handleQuickView = (e) => {
    e.stopPropagation()
    setShowQuickView(true)
  }

  // Determine badge type
  const getBadge = () => {
    if (!product.inStock) return { text: 'SOLD OUT', type: 'sold-out' }
    if (product.tags?.includes('new')) return { text: 'NEW ARRIVAL', type: 'new' }
    if (product.featured) return { text: 'BEST SELLER', type: 'bestseller' }
    if (product.stock && product.stock < 5) return { text: 'LOW STOCK', type: 'low-stock' }
    return null
  }

  const badge = getBadge()
  const primaryImage = product.images?.[0] || product.image
  const hasSecondImage = product.images && product.images.length > 1 && product.images[1]
  
  // Show 2nd image on hover if it exists, otherwise keep showing primary
  const displayImage = (isHovered && hasSecondImage) ? product.images[1] : primaryImage

  return (
    <>
      <motion.div 
        className="product-card"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        onClick={handleQuickView}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ cursor: 'pointer' }}
      >
        <div className="product-card__image-container">
          <div className="product-card__image-wrapper">
            <motion.img 
              key={displayImage}
              src={displayImage} 
              alt={product.name}
              className="product-card__image"
              loading="lazy"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              onError={(e) => {
                // Fallback to primary image if hover image fails to load
                if (e.target.src !== primaryImage) {
                  e.target.src = primaryImage
                }
              }}
            />
          </div>
          {badge && (
            <div className={`product-card__badge product-card__badge--${badge.type}`}>
              {badge.text}
            </div>
          )}
          
          {/* Quick View Button */}
          <motion.button
            className="product-card__quick-view"
            onClick={handleQuickView}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            Quick View
          </motion.button>
        </div>

        <div className="product-card__info">
          <h3 className="product-card__name">{product.name}</h3>
          <p className="product-card__price">${product.price} USD</p>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <ProductQuickView 
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </>
  )
}
