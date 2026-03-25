import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/admin.css'

// Remove loading screen once React mounts
const removeLoadingScreen = () => {
  const loading = document.getElementById('loading')
  if (loading) {
    loading.style.opacity = '0'
    setTimeout(() => loading.remove(), 300)
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Remove loading screen after a brief delay to ensure content is ready
setTimeout(removeLoadingScreen, 100)
