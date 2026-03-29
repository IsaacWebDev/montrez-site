import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import '../styles/HamburgerMenu.css'

export default function HamburgerMenu({ isOpen, onClose }) {
  const navigate = useNavigate()

  const handleNavClick = (path, hash = '') => {
    onClose()
    
    if (hash) {
      navigate('/')
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      navigate(path)
    }
  }

  const menuVariants = {
    closed: {
      x: '100%',
      transition: { type: 'tween', duration: 0.3 }
    },
    open: {
      x: 0,
      transition: { type: 'tween', duration: 0.3 }
    }
  }

  const itemVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1 }
    })
  }

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'About', hash: '#about' },
    { label: 'Contact', hash: '#contact' }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            className="hamburger-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Menu */}
          <motion.div 
            className="hamburger-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <button 
              className="hamburger-close"
              onClick={onClose}
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            <nav className="hamburger-nav">
              {links.map((link, i) => (
                <motion.button
                  key={link.label}
                  custom={i}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  className="hamburger-link"
                  onClick={() => handleNavClick(link.path || '/', link.hash)}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            <motion.div 
              className="hamburger-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="hamburger-tagline">PAS POUR TOUT LE MONDE</p>
              <div className="hamburger-social">
                <a href="https://instagram.com/montrezofficial" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
