import { useState, useEffect } from 'react'
import '../styles/Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container container">
        <a href="/" className="navbar__logo">
          MONTREZ
        </a>

        <button 
          className={`navbar__toggle ${menuOpen ? 'navbar__toggle--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar__menu ${menuOpen ? 'navbar__menu--open' : ''}`}>
          <a href="#collections" className="navbar__link" onClick={() => setMenuOpen(false)}>
            Collections
          </a>
          <a href="#about" className="navbar__link" onClick={() => setMenuOpen(false)}>
            About
          </a>
          <a href="#contact" className="navbar__link" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
          <a href="/admin" className="navbar__link navbar__link--admin" onClick={() => setMenuOpen(false)}>
            Admin
          </a>
        </div>
      </div>
    </nav>
  )
}
