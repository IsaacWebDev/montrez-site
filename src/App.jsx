import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import LandingPage from './components/LandingPage'
import PasswordEmailModal from './components/PasswordEmailModal'
import VideoIntro from './components/VideoIntro'
import VideoIntroStreetwear from './components/VideoIntroStreetwear'
import LoadingSpinner from './components/LoadingSpinner'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Collections from './components/Collections'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Admin from './components/Admin'
import Cart from './components/Cart'
import Shop from './pages/Shop'
import CollectionsPage from './pages/CollectionsPage'
import ProductDetail from './components/ProductDetail'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import './styles/theme.css'

function HomePage() {
  // Four-stage flow: landing → password/email → video → site
  const [stage, setStage] = useState(() => {
    // Check if user has completed the full entrance sequence
    const hasCompletedEntrance = sessionStorage.getItem('montrez-entrance-complete')
    return hasCompletedEntrance ? 'site' : 'landing'
  })

  const handleEnterClick = () => {
    // Stage 1 → Stage 2: Show password/email modal
    setStage('password')
  }

  const handlePasswordSuccess = () => {
    // Stage 2 → Stage 3: Show video intro (now compressed!)
    setStage('video')
  }

  const handleVideoComplete = () => {
    // Stage 3 → Stage 4: Show main site
    // Mark entrance as complete ONLY after video finishes
    sessionStorage.setItem('montrez-entrance-complete', 'true')
    setStage('site')
    
    // Remove loading screen if present
    const loading = document.getElementById('loading')
    if (loading) {
      loading.style.opacity = '0'
      setTimeout(() => loading.remove(), 300)
    }
  }

  return (
    <>
      {/* Stage 1: Landing Page (Gate Image) */}
      {stage === 'landing' && (
        <LandingPage onEnter={handleEnterClick} />
      )}
      
      {/* Stage 2: Password/Email Modal */}
      {stage === 'password' && (
        <PasswordEmailModal onSuccess={handlePasswordSuccess} />
      )}
      
      {/* Stage 3: Video Intro (Ultra-compressed château video - 0.78MB) */}
      {stage === 'video' && (
        <VideoIntro onComplete={handleVideoComplete} />
      )}
      
      {/* Stage 4: Main Site */}
      {stage === 'site' && (
        <>
          <Navbar />
          <Hero />
          <Collections />
          <About />
          <Contact />
          <Footer />
        </>
      )}
    </>
  )
}

function AppRoutes() {
  const location = useLocation()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    // Show loading indicator during route transitions
    setIsTransitioning(true)
    const timer = setTimeout(() => setIsTransitioning(false), 300)
    return () => clearTimeout(timer)
  }, [location.pathname])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      {isTransitioning && <LoadingSpinner message="Loading..." />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route 
          path="/admin/*" 
          element={
            <div style={{ 
              position: 'relative', 
              zIndex: 1001,
              minHeight: '100vh',
              background: 'white'
            }}>
              <Admin />
            </div>
          } 
        />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppRoutes />
        <Cart />
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
