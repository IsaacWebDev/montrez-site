import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import LandingPage from './components/LandingPage'
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
  // Three-stage flow: landing → video → site
  const [stage, setStage] = useState(() => {
    // Check if user has completed the full entrance sequence
    const hasCompletedEntrance = sessionStorage.getItem('montrez-entrance-complete')
    return hasCompletedEntrance ? 'site' : 'landing'
  })

  const handleEnterClick = () => {
    setStage('video')
  }

  const handleVideoComplete = () => {
    // Mark entrance as complete
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
      {stage === 'landing' && (
        <LandingPage onEnter={handleEnterClick} />
      )}
      
      {stage === 'video' && (
        <VideoIntro onComplete={handleVideoComplete} />
      )}
      
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
