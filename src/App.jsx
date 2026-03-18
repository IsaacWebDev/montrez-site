import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import VideoIntro from './components/VideoIntro'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Collections from './components/Collections'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Admin from './components/Admin'
import './styles/theme.css'

function HomePage() {
  const [showIntro, setShowIntro] = useState(true)
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    // Check if user has seen intro in this session
    const hasSeenIntro = sessionStorage.getItem('montrez-intro-seen')
    if (hasSeenIntro) {
      setShowIntro(false)
      setIntroComplete(true)
    }
  }, [])

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
