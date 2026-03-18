import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ProductQuickView from './ProductQuickView'
import '../styles/ProductCard.css'

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const [showQuickView, setShowQuickView] = useState(false)

  const handleClick = () => {
    navigate(`/product/${product.id}`)
  }

  const handleQuickView = (e) => {
    e.stopPropagation()
    setShowQuickView(true)
  }

  return (
    <>
      <motion.div 
        className="product-card"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        onClick={handleClick}
      >
        <div className="product-card__image-wrapper">
          <img 
            src={product.images?.[0] || product.image} 
            alt={product.name}
            className="product-card__image"
            loading="lazy"
          />
          {!product.inStock && (
            <div className="product-card__badge">Sold Out</div>
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
