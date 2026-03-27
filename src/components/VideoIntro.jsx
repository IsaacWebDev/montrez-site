import { useEffect, useRef, useState } from 'react'
import '../styles/VideoIntro.css'

export default function VideoIntro({ onComplete }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [canSkip, setCanSkip] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // NO SKIP BUTTON - video is now 0.78MB (loads fast)
    // Shorter timeout since video is tiny now (10 seconds max)
    const loadTimeout = setTimeout(() => {
      if (isLoading) {
        console.warn('Video load timeout after 10s')
        onComplete()
      }
    }, 10000)

    const playVideo = async () => {
      try {
        // Ensure video is truly muted for autoplay
        video.muted = true
        video.volume = 0
        
        const playPromise = video.play()
        if (playPromise !== undefined) {
          await playPromise
          console.log('Video playing successfully')
          setIsPlaying(true)
          setIsLoading(false)
        }
      } catch (err) {
        console.error('Video autoplay failed:', err.name, err.message)
        // If autoplay fails, just continue to completion
        setIsLoading(false)
        setTimeout(onComplete, 2000)
      }
    }

    const handleLoadedData = () => {
      console.log('Video loaded successfully')
      setIsLoading(false)
      clearTimeout(loadTimeout)
      // Try to play once loaded
      playVideo()
    }

    const handleCanPlay = () => {
      console.log('Video can play')
      setIsLoading(false)
      clearTimeout(loadTimeout)
    }

    const handleError = (e) => {
      console.error('Video failed to load:', e)
      console.error('Video src:', video.src)
      console.error('Video error code:', video.error?.code)
      onComplete()
    }

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('error', handleError)

    // Try to load video
    video.load()

    const handleEnded = () => {
      setTimeout(onComplete, 500)
    }

    video.addEventListener('ended', handleEnded)

    return () => {
      clearTimeout(loadTimeout)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('error', handleError)
    }
  }, [onComplete, isLoading])

  return (
    <div className="video-intro">
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
        autoPlay
        preload="auto"
        poster="/images/video_20-poster.jpg"
        style={{ opacity: isLoading ? 0 : 1 }}
      >
        <source src="/videos/video_20.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="video-intro__overlay grain" />
      
      <div className="video-intro__branding">
        <h1 className="video-intro__logo">MONTREZ</h1>
      </div>


    </div>
  )
}
