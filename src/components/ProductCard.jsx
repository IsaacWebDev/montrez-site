import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import '../styles/ProductCard.css'

export default function ProductCard({ product }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/product/${product.id}`)
  }

  return (
    <motion.div 
      className="product-card"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
    >
      <div className="product-card__image-wrapper">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />
        {product.soldOut && (
          <div className="product-card__badge">Sold Out</div>
        )}
      </div>

      <div className="product-card__info">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__price">${product.price} USD</p>
      </div>
    </motion.div>
  )
}
