import { NavLink } from 'react-router-dom'

export default function Sidebar({ onLogout }) {
  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/pages', label: 'Pages', icon: '📄' },
    { path: '/admin/services', label: 'Services', icon: '⚙️' },
    { path: '/admin/testimonials', label: 'Testimonials', icon: '💬' },
    { path: '/admin/media', label: 'Media', icon: '🖼️' },
    { path: '/admin/leads', label: 'Leads', icon: '📈' },
    { path: '/admin/seo', label: 'SEO', icon: '🔍' },
    { path: '/admin/settings', label: 'Settings', icon: '⚙️' }
  ]

  return (
    <aside className="admin__sidebar">
      <div className="admin__logo">MONTREZ Admin</div>
      
      <nav className="admin__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) => 
              `admin__nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="admin__nav-icon">{item.icon}</span>
            <span className="admin__nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <button className="admin__logout" onClick={onLogout}>
        Logout
      </button>
    </aside>
  )
}
