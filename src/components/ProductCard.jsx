import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ProductQuickView from './ProductQuickView'
import '../styles/ProductCard.css'

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const [showQuickView, setShowQuickView] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    navigate(`/product/${product.id}`)
  }

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
  const hasSecondImage = product.images && product.images.length > 1
  const displayImage = isHovered && hasSecondImage ? product.images[1] : (product.images?.[0] || product.image)

  return (
    <>
      <motion.div 
        className="product-card"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="product-card__image-wrapper">
          <motion.img 
            key={displayImage}
            src={displayImage} 
            alt={product.name}
            className="product-card__image"
            loading="lazy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
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
