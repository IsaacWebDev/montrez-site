import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductGrid from '../components/ProductGrid'
import '../styles/Shop.css'

// Mock products data - will be replaced with actual API/CMS
const ALL_PRODUCTS = [
  {
    id: 'speak-no-evil',
    name: 'MONTREZ "SPEAK NO EVIL" GRAPHIC T-SHIRT',
    price: 600,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    category: 'tees',
    soldOut: false
  },
  {
    id: 'army-74-shorts',
    name: 'MONTREZ "ARMY 74" SHORTS',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800',
    category: 'bottoms',
    soldOut: true
  },
  {
    id: 'money-tee',
    name: 'MONTREZ "MONEY" GRAPHIC T-SHIRT',
    price: 600,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800',
    category: 'tees',
    soldOut: false
  },
  {
    id: 'architect-hoodie-black',
    name: 'MONTREZ ARCHITECT ZIP HOODIE - BLACK',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
    category: 'outerwear',
    soldOut: false
  },
  {
    id: 'architect-hoodie-white',
    name: 'MONTREZ ARCHITECT ZIP HOODIE - OFF-WHITE',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800',
    category: 'outerwear',
    soldOut: false
  },
  {
    id: 'archive-jacket',
    name: 'MONTREZ ARCHIVE JACKET',
    price: 1400,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
    category: 'outerwear',
    soldOut: false
  },
  {
    id: 'army-sweatpants',
    name: 'MONTREZ ARMY SWEATPANTS',
    price: 800,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800',
    category: 'bottoms',
    soldOut: false
  },
  {
    id: 'dazzled-shorts',
    name: 'MONTREZ DAZZLED LOGO SHORTS',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800',
    category: 'bottoms',
    soldOut: false
  }
]

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'tees', label: 'T-Shirts' },
    { id: 'outerwear', label: 'Outerwear' },
    { id: 'bottoms', label: 'Bottoms' }
  ]

  // Filter products
  let filteredProducts = selectedCategory === 'all' 
    ? ALL_PRODUCTS 
    : ALL_PRODUCTS.filter(p => p.category === selectedCategory)

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
  }

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
          {/* Header */}
          <div className="shop__header">
            <h1 className="shop__title">Shop</h1>
            <p className="shop__subtitle">Pas pour Tout</p>
          </div>

          {/* Filters */}
          <div className="shop__filters">
            <div className="shop__categories">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`shop__category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

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
              </select>
            </div>
          </div>

          {/* Products */}
          <ProductGrid products={filteredProducts} />
        </div>
      </motion.div>

      <Footer />
    </>
  )
}
