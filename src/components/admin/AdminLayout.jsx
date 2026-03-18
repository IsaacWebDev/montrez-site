import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function AdminLayout({ onLogout }) {
  const location = useLocation()
  const navigate = useNavigate()

  // Map routes to page titles
  const pageTitles = {
    '/admin': 'Dashboard',
    '/admin/pages': 'Pages Management',
    '/admin/services': 'Services Management',
    '/admin/testimonials': 'Testimonials Management',
    '/admin/media': 'Media Library',
    '/admin/leads': 'Leads Management',
    '/admin/seo': 'SEO Settings',
    '/admin/settings': 'General Settings'
  }

  const currentTitle = pageTitles[location.pathname] || 'Admin'

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
    navigate('/admin')
  }

  return (
    <div className="admin">
      <Sidebar onLogout={handleLogout} />
      
      <main className="admin__main">
        <Header title={currentTitle} />
        
        <div className="admin__content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
