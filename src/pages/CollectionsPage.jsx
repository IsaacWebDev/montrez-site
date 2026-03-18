import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductGrid from '../components/ProductGrid'
import productsData from '../../products.json'
import '../styles/CollectionsPage.css'

const COLLECTIONS = {
  latest: {
    id: 'latest',
    title: 'Latest Drops',
    description: 'New arrivals from our latest collection',
    filter: (p) => p.featured
  },
  essentials: {
    id: 'essentials',
    title: 'Essentials',
    description: 'Core pieces that define Montrez',
    filter: (p) => p.category === 'T-Shirts'
  },
  limited: {
    id: 'limited',
    title: 'Limited Edition',
    description: 'Exclusive pieces - once they\'re gone, they\'re gone',
    filter: (p) => p.tags?.includes('limited')
  },
  outerwear: {
    id: 'outerwear',
    title: 'Outerwear',
    description: 'Premium jackets and hoodies',
    filter: (p) => p.category === 'Outerwear'
  }
}

export default function CollectionsPage() {
  const [activeCollection, setActiveCollection] = useState('latest')
  const products = productsData.products

  const collection = COLLECTIONS[activeCollection]
  const filteredProducts = products.filter(collection.filter)

  return (
    <>
      <Navbar />
      
      <motion.div 
        className="collections-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          {/* Header */}
          <div className="collections-page__header">
            <h1 className="collections-page__title">Collections</h1>
            <p className="collections-page__subtitle">Curated selections of Montrez pieces</p>
          </div>

          {/* Collection Tabs */}
          <div className="collections-page__tabs">
            {Object.values(COLLECTIONS).map((col) => (
              <motion.button
                key={col.id}
                className={`collections-page__tab ${activeCollection === col.id ? 'active' : ''}`}
                onClick={() => setActiveCollection(col.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {col.title}
              </motion.button>
            ))}
          </div>

          {/* Collection Info */}
          <motion.div 
            className="collections-page__info"
            key={activeCollection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="collections-page__collection-title">{collection.title}</h2>
            <p className="collections-page__collection-desc">{collection.description}</p>
            <p className="collections-page__count">{filteredProducts.length} pieces</p>
          </motion.div>

          {/* Products */}
          <motion.div
            key={`${activeCollection}-products`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <ProductGrid products={filteredProducts} />
          </motion.div>
        </div>
      </motion.div>

      <Footer />
    </>
  )
}
