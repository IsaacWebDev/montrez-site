import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductGrid from '../components/ProductGrid'
import productsData from '../../products.json'
import '../styles/Shop.css'

export default function Shop() {
  const [searchParams] = useSearchParams()
  const products = productsData.products

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  // Handle search from URL params
  const searchQuery = searchParams.get('search')

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'T-Shirts', label: 'T-Shirts' },
    { id: 'Outerwear', label: 'Outerwear' },
    { id: 'Bottoms', label: 'Bottoms' },
    { id: 'Shorts', label: 'Shorts' }
  ]

  const allSizes = ['S', 'M', 'L', 'XL', 'XXL']

  // Toggle size filter
  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    )
  }

  // Filter products
  let filteredProducts = products.filter(product => {
    // Category filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false
    }

    // Price range filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }

    // Size filter
    if (selectedSizes.length > 0) {
      const hasSize = selectedSizes.some(size => product.sizes?.includes(size))
      if (!hasSize) return false
    }

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch = 
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.tags?.some(tag => tag.toLowerCase().includes(query))
      if (!matchesSearch) return false
    }

    return true
  })

  // Debug logging
  console.log('Shop filters:', { 
    selectedCategory,
    priceRange,
    selectedSizes,
    totalProducts: products.length, 
    filteredCount: filteredProducts.length 
  })

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
  } else if (sortBy === 'name') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name))
  }

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory('all')
    setPriceRange([0, 2000])
    setSelectedSizes([])
    setSortBy('featured')
  }

  const hasActiveFilters = selectedCategory !== 'all' || 
                          priceRange[0] !== 0 || 
                          priceRange[1] !== 2000 || 
                          selectedSizes.length > 0

  return (
    <>
      <Navbar />
      
      <motion.div 
        className="shop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          {/* Breadcrumbs */}
          <nav className="shop__breadcrumbs" aria-label="Breadcrumb">
            <a href="/" className="shop__breadcrumb-link">Home</a>
            <span className="shop__breadcrumb-separator">/</span>
            <span className="shop__breadcrumb-current">Shop</span>
          </nav>

          {/* Header */}
          <div className="shop__header">
            <h1 className="shop__title">Shop</h1>
            <p className="shop__subtitle">PAS POUR TOUT LE MONDE</p>
            {searchQuery && (
              <p className="shop__search-info">
                Search results for "{searchQuery}" ({filteredProducts.length} found)
              </p>
            )}
          </div>

          {/* Mobile Filter Toggle */}
          <button 
            className="shop__filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          <div className="shop__main">
            {/* Sidebar Filters */}
            <AnimatePresence>
              {(showFilters || window.innerWidth > 768) && (
                <motion.aside 
                  className="shop__sidebar"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="shop__filter-header">
                    <h2>Filters</h2>
                    {hasActiveFilters && (
                      <button 
                        className="shop__reset-filters"
                        onClick={resetFilters}
                      >
                        Reset
                      </button>
                    )}
                  </div>

                  {/* Category Filter */}
                  <div className="shop__filter-section">
                    <h3>Category</h3>
                    <div className="shop__filter-options">
                      {categories.map(cat => (
                        <button
                          key={cat.id}
                          className={`shop__filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                          onClick={() => setSelectedCategory(cat.id)}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Filter */}
                  <div className="shop__filter-section">
                    <h3>Size</h3>
                    <div className="shop__size-grid">
                      {allSizes.map(size => (
                        <button
                          key={size}
                          className={`shop__size-btn ${selectedSizes.includes(size) ? 'active' : ''}`}
                          onClick={() => toggleSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="shop__filter-section">
                    <h3>Price Range</h3>
                    <div className="shop__price-range">
                      <div className="shop__price-inputs">
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                          min="0"
                          max="2000"
                          placeholder="Min"
                        />
                        <span>—</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          min="0"
                          max="2000"
                          placeholder="Max"
                        />
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="shop__price-slider"
                      />
                    </div>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Products Area */}
            <div className="shop__products">
              {/* Sort & Results Count */}
              <div className="shop__toolbar">
                <p className="shop__results-count">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </p>
                <div className="shop__sort">
                  <label htmlFor="sort">Sort by:</label>
                  <select 
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A-Z</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <ProductGrid 
                  key={`${selectedCategory}-${sortBy}-${selectedSizes.join(',')}-${priceRange[0]}-${priceRange[1]}`}
                  products={filteredProducts} 
                />
              ) : (
                <div className="shop__no-results">
                  <p>No products found matching your filters.</p>
                  <button 
                    className="shop__reset-btn"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </>
  )
}
