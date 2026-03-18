import { useEffect, useRef, useState } from 'react'
import '../styles/VideoIntro.css'

export default function VideoIntro({ onComplete }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  // Check if user has seen intro before - instant skip for returning users
  const hasSeenBefore = sessionStorage.getItem('montrez-intro-seen')
  const [canSkip, setCanSkip] = useState(!!hasSeenBefore)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Allow skip after 2 seconds for first-time viewers
    const skipTimer = !hasSeenBefore 
      ? setTimeout(() => setCanSkip(true), 2000) 
      : null

    // Video load timeout - auto-skip after 3 seconds if video doesn't load
    const loadTimeout = setTimeout(() => {
      if (isLoading) {
        console.warn('Video load timeout, skipping intro')
        onComplete()
      }
    }, 3000)

    const playVideo = async () => {
      try {
        await video.play()
        setIsPlaying(true)
        setIsLoading(false)
      } catch (err) {
        console.error('Video autoplay failed:', err)
        // If autoplay fails, allow immediate skip
        setCanSkip(true)
        setIsLoading(false)
      }
    }

    const handleLoadedData = () => {
      setIsLoading(false)
      clearTimeout(loadTimeout)
    }

    const handleError = () => {
      console.error('Video failed to load, skipping intro')
      onComplete()
    }

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('error', handleError)

    // Small delay to ensure DOM is ready
    setTimeout(playVideo, 100)

    const handleEnded = () => {
      setTimeout(onComplete, 500)
    }

    video.addEventListener('ended', handleEnded)

    return () => {
      if (skipTimer) clearTimeout(skipTimer)
      clearTimeout(loadTimeout)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('error', handleError)
    }
  }, [onComplete, hasSeenBefore, isLoading])

  const handleSkip = () => {
    if (canSkip) {
      onComplete()
    }
  }

  const handleClick = () => {
    if (canSkip) {
      handleSkip()
    }
  }

  return (
    <div className="video-intro" onClick={handleClick}>
      {isLoading && (
        <div className="video-intro__loading">
          <div className="spinner"></div>
          <p className="loading-text">Loading cinematic experience...</p>
        </div>
      )}
      
      <video
        ref={videoRef}
        className="video-intro__video"
        muted
        playsInline
        preload="auto"
        style={{ opacity: isLoading ? 0 : 1 }}
      >
        <source src="/videos/intro.mp4" type="video/mp4" />
      </video>
      
      <div className="video-intro__overlay grain" />
      
      <div className="video-intro__branding">
        <h1 className="video-intro__logo">MONTREZ</h1>
      </div>

      {canSkip && (
        <button 
          className="video-intro__skip fade-in"
          onClick={handleSkip}
          aria-label="Skip intro"
        >
          <span>Skip</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 10h10M10 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  )
}
