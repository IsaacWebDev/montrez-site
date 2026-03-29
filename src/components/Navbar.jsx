import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import SearchBar from './SearchBar'
import productsData from '../../products.json'
import '../styles/Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { cartCount, setIsCartOpen } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  const menuItems = [
    { label: 'Shop', path: '/shop' },
    { label: 'Collections', path: '/collections' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ]

  const handleMenuClick = (path) => {
    navigate(path)
    setMenuOpen(false)
  }

  return (
    <>
      <motion.nav 
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="navbar__container">
          {/* LEFT: Hamburger Menu */}
          <div className="navbar__left">
            <button 
              className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="navbar__hamburger-line"></span>
              <span className="navbar__hamburger-line"></span>
              <span className="navbar__hamburger-line"></span>
            </button>
          </div>

          {/* CENTER: Castle Logo */}
          <button 
            className="navbar__logo"
            onClick={handleLogoClick}
            aria-label="MONTRÉZ Home"
          >
            <img 
              src="/images/montrez-logo-castle.png" 
              alt="MONTRÉZ" 
              className="navbar__logo-image"
            />
          </button>

          {/* RIGHT: Search + Cart Icons */}
          <div className="navbar__right">
            <button 
              className="navbar__icon"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            <button 
              className="navbar__icon navbar__cart-icon"
              onClick={() => setIsCartOpen(true)}
              aria-label="Cart"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M1 1h2l.4 2M4 3h13l-1.5 7.5H5.5L4 3zM5.5 10.5L4 3M5.5 10.5h8.5M5.5 10.5L5 13m9-2.5L14.5 13M7 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM15 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {cartCount > 0 && (
                <motion.span 
                  className="navbar__cart-count"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Slide-out Hamburger Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div 
              className="navbar__menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
            />
            
            {/* Slide-out Menu */}
            <motion.div 
              className="navbar__menu"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="navbar__menu-header">
                <button 
                  className="navbar__menu-close"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              <nav className="navbar__menu-nav">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.path}
                    className="navbar__menu-link"
                    onClick={() => handleMenuClick(item.path)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              <div className="navbar__menu-footer">
                <p className="navbar__menu-tagline">PAS POUR TOUT LE MONDE</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Bar */}
      <SearchBar 
        products={productsData.products}
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
      />
    </>
  )
}
