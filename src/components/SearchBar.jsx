import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import '../styles/SearchBar.css'

export default function SearchBar({ products, isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const inputRef = useRef(null)
  const navigate = useNavigate()

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Search products
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchTerm = query.toLowerCase()
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category?.toLowerCase().includes(searchTerm) ||
      product.description?.toLowerCase().includes(searchTerm) ||
      product.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    ).slice(0, 5) // Limit to 5 results

    setResults(filtered)
  }, [query, products])

  const handleResultClick = (productId) => {
    navigate(`/product/${productId}`)
    setQuery('')
    onClose()
  }

  const handleViewAll = () => {
    navigate(`/shop?search=${encodeURIComponent(query)}`)
    setQuery('')
    onClose()
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const searchVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 300 }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2 }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="search-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Search Bar */}
          <motion.div
            className="search-bar"
            variants={searchVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="search-bar__container">
              <div className="search-bar__input-wrapper">
                <svg className="search-bar__icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  className="search-bar__input"
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') onClose()
                  }}
                />
                <button
                  className="search-bar__close"
                  onClick={onClose}
                  aria-label="Close search"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Results */}
              <AnimatePresence>
                {results.length > 0 && (
                  <motion.div
                    className="search-bar__results"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {results.map((product, idx) => (
                      <motion.button
                        key={product.id}
                        className="search-bar__result"
                        onClick={() => handleResultClick(product.id)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ backgroundColor: '#f5f5f5' }}
                      >
                        <img 
                          src={product.images?.[0] || product.image} 
                          alt={product.name}
                          className="search-bar__result-image"
                        />
                        <div className="search-bar__result-info">
                          <p className="search-bar__result-name">{product.name}</p>
                          <p className="search-bar__result-price">${product.price} USD</p>
                        </div>
                        {!product.inStock && (
                          <span className="search-bar__result-badge">Sold Out</span>
                        )}
                      </motion.button>
                    ))}
                    
                    <button 
                      className="search-bar__view-all"
                      onClick={handleViewAll}
                    >
                      View All Results →
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* No Results */}
              {query.trim() && results.length === 0 && (
                <motion.div
                  className="search-bar__no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p>No products found for "{query}"</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
