import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import HamburgerMenu from './HamburgerMenu'
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

  return (
    <>
      <motion.nav 
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="navbar__container container">
          {/* Logo */}
          <button 
            className="navbar__logo"
            onClick={handleLogoClick}
          >
            MONTREZ
          </button>

          {/* Desktop Links */}
          <div className="navbar__links">
            <button onClick={() => navigate('/shop')} className="navbar__link">
              Shop
            </button>
            <button onClick={() => navigate('/collections')} className="navbar__link">
              Collections
            </button>
            <button onClick={() => navigate('/about')} className="navbar__link">
              About
            </button>
            <button onClick={() => navigate('/contact')} className="navbar__link">
              Contact
            </button>
          </div>

          {/* Icons */}
          <div className="navbar__icons">
            <button 
              className="navbar__icon"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            <button 
              className="navbar__icon navbar__cart-icon"
              onClick={() => setIsCartOpen(true)}
              aria-label="Cart"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M1 1h2l.4 2M4 3h13l-1.5 7.5H5.5L4 3zM5.5 10.5L4 3M5.5 10.5h8.5M5.5 10.5L5 13m9-2.5L14.5 13M7 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM15 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

          {/* Hamburger Toggle */}
          <button 
            className={`navbar__toggle ${menuOpen ? 'navbar__toggle--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </motion.nav>

      {/* Hamburger Menu */}
      <HamburgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Search Bar */}
      <SearchBar 
        products={productsData.products}
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
      />
    </>
  )
}
