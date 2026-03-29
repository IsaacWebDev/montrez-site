import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CartProvider } from './context/CartContext'
import LandingPage from './components/LandingPage'
import AccessGate from './components/AccessGate'
import SignupPopup from './components/SignupPopup'
import IntroAnimation from './components/IntroAnimation'
import VideoIntro from './components/VideoIntro'
import VideoIntroStreetwear from './components/VideoIntroStreetwear'
import LoadingSpinner from './components/LoadingSpinner'
import AnnouncementBar from './components/AnnouncementBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Collections from './components/Collections'

import Contact from './components/Contact'
import Footer from './components/Footer'
import Admin from './components/Admin'
import Cart from './components/Cart'
import Shop from './pages/Shop'
import CollectionsPage from './pages/CollectionsPage'
import ProductDetail from './components/ProductDetail'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import './styles/theme.css'
import './styles/animations.css'

function HomePage() {
  // Five-stage flow: landing → access gate → luxury intro animation → site
  const [stage, setStage] = useState(() => {
    // Check if user has completed the full entrance sequence
    const hasCompletedEntrance = sessionStorage.getItem('montrez-entrance-complete')
    return hasCompletedEntrance ? 'site' : 'landing'
  })

  const handleEnterClick = () => {
    // Stage 1 → Stage 2: Show access gate
    setStage('access')
  }

  const handleAccessSuccess = () => {
    // Stage 2 → Stage 3: Show luxury intro animation (10s chateau sequence)
    setStage('intro-animation')
  }

  const handleIntroComplete = () => {
    // Stage 3 → Stage 4: Show main site
    // Mark entrance as complete ONLY after intro animation finishes
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
      
      {/* Stage 2: Access Gate (Password or Instagram) */}
      {stage === 'access' && (
        <AccessGate onSuccess={handleAccessSuccess} />
      )}
      
      {/* Stage 3: Video Intro */}
      {stage === 'intro-animation' && (
        <VideoIntro onComplete={handleIntroComplete} />
      )}
      
      {/* Stage 4: Main Site + Signup Popup */}
      {stage === 'site' && (
        <>
          <SignupPopup />
          <AnnouncementBar />
          <Navbar />
          <Hero />
          <Collections />
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

  // Check if entrance is complete - if accessing non-home route directly, mark entrance as complete
  useEffect(() => {
    const hasCompletedEntrance = sessionStorage.getItem('montrez-entrance-complete')
    if (!hasCompletedEntrance && location.pathname !== '/') {
      // User is accessing a direct link (not homepage), skip entrance flow
      sessionStorage.setItem('montrez-entrance-complete', 'true')
    }
  }, [location.pathname])

  return (
    <>
      {isTransitioning && <LoadingSpinner message="Loading..." />}
      {location.pathname !== '/' && <AnnouncementBar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/shop" 
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Shop />
              </motion.div>
            } 
          />
          <Route 
            path="/collections" 
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <CollectionsPage />
              </motion.div>
            } 
          />
          <Route 
            path="/product/:id" 
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <ProductDetail />
              </motion.div>
            } 
          />
          <Route 
            path="/about" 
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <AboutPage />
              </motion.div>
            } 
          />
          <Route 
            path="/contact" 
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <ContactPage />
              </motion.div>
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <CheckoutPage />
              </motion.div>
            } 
          />
          <Route 
            path="/order/:orderId" 
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <OrderConfirmationPage />
              </motion.div>
            } 
          />
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
      </AnimatePresence>
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
