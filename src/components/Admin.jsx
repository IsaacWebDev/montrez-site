import { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Sidebar from './admin/Sidebar'
import LoginPage from './admin/LoginPage'
import DashboardPage from './admin/DashboardPage'
import OrdersPage from './admin/OrdersPage'
import ProductsPage from './admin/ProductsPage'
import EmailsPage from './admin/EmailsPage'
import '../styles/Admin.css'

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('montrez-admin-auth') === 'true'
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }
  
  return children
}

function AdminLayout({ children }) {
  return (
    <div className="admin-container flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}

export default function Admin() {
  const navigate = useNavigate()

  useEffect(() => {
    // Check auth on mount
    const isAuthenticated = localStorage.getItem('montrez-admin-auth') === 'true'
    const currentPath = window.location.pathname

    if (!isAuthenticated && currentPath !== '/admin/login') {
      navigate('/admin/login')
    } else if (isAuthenticated && currentPath === '/admin') {
      navigate('/admin/dashboard')
    }
  }, [navigate])

  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <DashboardPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="orders"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <OrdersPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="products"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ProductsPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="emails"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <EmailsPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  )
}
