import { useState } from 'react'
import '../styles/Admin.css'

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [activeTab, setActiveTab] = useState('content')

  const handleLogin = (e) => {
    e.preventDefault()
    // Simple auth (replace with real authentication)
    if (credentials.username === 'admin' && credentials.password === 'montrez2024') {
      setIsAuthenticated(true)
    } else {
      alert('Invalid credentials')
    }
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
            <button type="submit" className="btn btn-gold">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="admin">
      <aside className="admin__sidebar">
        <div className="admin__logo">MONTREZ Admin</div>
        <nav className="admin__nav">
          <button
            className={activeTab === 'content' ? 'active' : ''}
            onClick={() => setActiveTab('content')}
          >
            Content Management
          </button>
          <button
            className={activeTab === 'collections' ? 'active' : ''}
            onClick={() => setActiveTab('collections')}
          >
            Collections
          </button>
          <button
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </nav>
        <button className="admin__logout" onClick={() => setIsAuthenticated(false)}>
          Logout
        </button>
      </aside>

      <main className="admin__main">
        <header className="admin__header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
        </header>

        <div className="admin__content">
          {activeTab === 'content' && (
            <div className="admin-section">
              <h2>Site Content</h2>
              <div className="admin-card">
                <h3>Hero Section</h3>
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" defaultValue="Luxury Redefined" />
                </div>
                <div className="form-group">
                  <label>Subtitle</label>
                  <input type="text" defaultValue="Premium fashion for those who dare to stand out" />
                </div>
                <button className="btn">Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'collections' && (
            <div className="admin-section">
              <div className="admin-section__header">
                <h2>Collections</h2>
                <button className="btn btn-gold">Add New Collection</button>
              </div>
              <div className="admin-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Items</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Shadow Series</td>
                      <td>Dark elegance meets urban edge</td>
                      <td>12</td>
                      <td><span className="badge badge-active">Active</span></td>
                      <td>
                        <button className="btn-small">Edit</button>
                        <button className="btn-small btn-danger">Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <td>Nocturne</td>
                      <td>Evening wear reimagined</td>
                      <td>8</td>
                      <td><span className="badge badge-active">Active</span></td>
                      <td>
                        <button className="btn-small">Edit</button>
                        <button className="btn-small btn-danger">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="admin-section">
              <h2>Site Settings</h2>
              <div className="admin-card">
                <h3>General</h3>
                <div className="form-group">
                  <label>Site Title</label>
                  <input type="text" defaultValue="Montrez" />
                </div>
                <div className="form-group">
                  <label>Contact Email</label>
                  <input type="email" defaultValue="contact@montrez.com" />
                </div>
                <div className="form-group">
                  <label>Video Intro</label>
                  <input type="file" accept="video/*" />
                  <small>Current: intro.mp4</small>
                </div>
                <button className="btn">Save Settings</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
