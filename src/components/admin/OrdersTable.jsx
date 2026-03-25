import { useState } from 'react'
import { Eye } from 'lucide-react'

const getStatusBadgeClass = (status) => {
  const classes = {
    'Pending': 'admin-badge-pending',
    'Processing': 'admin-badge-processing',
    'Shipped': 'admin-badge-shipped',
    'Delivered': 'admin-badge-delivered',
    'Cancelled': 'admin-badge-cancelled'
  }
  return `admin-badge ${classes[status] || ''}`
}

export default function OrdersTable({ orders, onViewOrder }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by customer, order ID, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin-input flex-1"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="admin-input w-full sm:w-48"
        >
          <option value="all">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="admin-card overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-8 text-muted-foreground">
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="font-mono font-semibold">{order.id}</td>
                  <td>{order.customer}</td>
                  <td className="text-sm text-muted-foreground">{order.email}</td>
                  <td className="font-semibold">{formatCurrency(order.total)}</td>
                  <td>
                    <span className={getStatusBadgeClass(order.status)}>
                      {order.status}
                    </span>
                  </td>
                  <td className="text-sm">{formatDate(order.date)}</td>
                  <td>
                    <button
                      onClick={() => onViewOrder(order)}
                      className="p-2 hover:bg-muted rounded-md transition-colors"
                      title="View Order Details"
                    >
                      <Eye size={18} className="text-primary" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground text-center">
        Showing {filteredOrders.length} of {orders.length} orders
      </p>
    </div>
  )
}
