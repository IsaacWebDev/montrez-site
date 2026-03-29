import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import ProductGrid from './ProductGrid'
import '../styles/ProductDetail.css'

// Mock products data - will be replaced with actual API/CMS
const PRODUCTS = [
  {
    id: 'speak-no-evil',
    name: 'MONTREZ "SPEAK NO EVIL" GRAPHIC T-SHIRT',
    price: 600,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Premium cotton graphic tee featuring bold "Speak No Evil" artwork. European luxury streetwear aesthetic with attention to detail.',
    soldOut: false
  },
  {
    id: 'army-74-shorts',
    name: 'MONTREZ "ARMY 74" SHORTS',
    price: 1000,
    images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Military-inspired shorts with premium construction. Studded details and vintage wash.',
    soldOut: true
  },
  {
    id: 'money-tee',
    name: 'MONTREZ "MONEY" GRAPHIC T-SHIRT',
    price: 600,
    images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Statement piece with bold money-inspired graphics. Heavyweight cotton construction.',
    soldOut: false
  },
  {
    id: 'architect-hoodie-black',
    name: 'MONTREZ ARCHITECT ZIP HOODIE - BLACK',
    price: 1500,
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Architectural-inspired zip hoodie in premium black cotton blend. Structured silhouette.',
    soldOut: false
  }
]

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')

  useEffect(() => {
    // Find product by ID
    const found = PRODUCTS.find(p => p.id === id)
    if (found) {
      setProduct(found)
    } else {
      // Product not found, redirect to shop
      navigate('/shop')
    }
  }, [id, navigate])

  if (!product) {
    return null // Loading or redirecting
  }

  // Get related products (exclude current)
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3)

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }
    // TODO: Implement cart functionality
    alert(`Added ${product.name} (${selectedSize}) to cart`)
  }

  return (
    <>
      <Navbar />
      
      <motion.div 
        className="product-detail"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <button 
            className="product-detail__back"
            onClick={() => navigate('/shop')}
          >
            ← Back to Shop
          </button>

          <div className="product-detail__content">
            {/* Image Gallery */}
            <div className="product-detail__gallery">
              <motion.img 
                key={selectedImage}
                src={product.images[selectedImage]}
                alt={product.name}
                className="product-detail__main-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              {product.images.length > 1 && (
                <div className="product-detail__thumbnails">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      className={`product-detail__thumbnail ${i === selectedImage ? 'active' : ''}`}
                      onClick={() => setSelectedImage(i)}
                    >
                      <img src={img} alt={`${product.name} view ${i + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="product-detail__info">
              <h1 className="product-detail__name">{product.name}</h1>
              <p className="product-detail__price">${product.price} USD</p>
              
              <div className="product-detail__description">
                <p>{product.description}</p>
              </div>

              {/* Size Selector */}
              <div className="product-detail__sizes">
                <label className="product-detail__label">Select Size</label>
                <div className="product-detail__size-grid">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`product-detail__size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <button 
                className="product-detail__add-to-cart"
                onClick={handleAddToCart}
                disabled={product.soldOut}
              >
                {product.soldOut ? 'Sold Out' : 'Add to Cart'}
              </button>

              {/* Additional Info */}
              <div className="product-detail__additional">
                <details>
                  <summary>Shipping & Returns</summary>
                  <p>Free shipping on orders over $500. Returns accepted within 14 days.</p>
                </details>
                <details>
                  <summary>Product Details</summary>
                  <ul>
                    <li>100% Premium Cotton</li>
                    <li>Made in Europe</li>
                    <li>Limited Edition</li>
                  </ul>
                </details>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="product-detail__related">
              <ProductGrid 
                products={relatedProducts} 
                title="You May Also Like"
              />
            </div>
          )}
        </div>
      </motion.div>

      <Footer />
    </>
  )
}
