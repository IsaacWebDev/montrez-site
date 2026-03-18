import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import VideoIntro from './components/VideoIntro'
import LoadingSpinner from './components/LoadingSpinner'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Collections from './components/Collections'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Admin from './components/Admin'
import './styles/theme.css'

function HomePage() {
  const [showIntro, setShowIntro] = useState(() => {
    // Only show intro if on homepage and not seen before
    const hasSeenIntro = sessionStorage.getItem('montrez-intro-seen')
    return !hasSeenIntro
  })
  const [introComplete, setIntroComplete] = useState(() => {
    // If already seen, mark as complete immediately
    return !!sessionStorage.getItem('montrez-intro-seen')
  })

  const handleIntroComplete = () => {
    sessionStorage.setItem('montrez-intro-seen', 'true')
    setShowIntro(false)
    setTimeout(() => {
      setIntroComplete(true)
      // Remove loading screen
      const loading = document.getElementById('loading')
      if (loading) {
        loading.style.opacity = '0'
        setTimeout(() => loading.remove(), 300)
      }
    }, 300)
  }

  return (
    <>
      {showIntro && <VideoIntro onComplete={handleIntroComplete} />}
      
      {introComplete && (
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

  return (
    <>
      {isTransitioning && <LoadingSpinner message="Loading..." />}
      <Routes>
        <Route path="/" element={<HomePage />} />
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
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
