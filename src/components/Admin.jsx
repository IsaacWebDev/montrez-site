import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './admin/AdminLayout'
import Dashboard from '../pages/admin/Dashboard'
import Pages from '../pages/admin/Pages'
import Services from '../pages/admin/Services'
import Testimonials from '../pages/admin/Testimonials'
import Media from '../pages/admin/Media'
import Leads from '../pages/admin/Leads'
import SEO from '../pages/admin/SEO'
import Settings from '../pages/admin/Settings'
import '../styles/Admin.css'

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [credentials, setCredentials] = useState({ username: '', password: '' })

  const handleLogin = (e) => {
    e.preventDefault()
    // Simple auth (replace with real authentication)
    if (credentials.username === 'admin' && credentials.password === 'montrez2024') {
      setIsAuthenticated(true)
    } else {
      alert('Invalid credentials')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCredentials({ username: '', password: '' })
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="admin-login__card">
          <h1>Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-chrome">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<AdminLayout onLogout={handleLogout} />}>
        <Route index element={<Dashboard />} />
        <Route path="pages" element={<Pages />} />
        <Route path="services" element={<Services />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="media" element={<Media />} />
        <Route path="leads" element={<Leads />} />
        <Route path="seo" element={<SEO />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  )
}
