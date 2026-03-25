import { DollarSign, ShoppingCart, Package, Users } from 'lucide-react'
import DashboardCard from './DashboardCard'
import OrdersTable from './OrdersTable'
import { calculateStats, getRecentOrders } from '../../lib/admin/mockData'
import { useState } from 'react'
import OrderModal from './OrderModal'

export default function DashboardPage() {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const stats = calculateStats()
  const recentOrders = getRecentOrders()

  const handleViewOrder = (order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your store overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
          trend={12.5}
        />
        <DashboardCard
          title="Orders"
          value={stats.totalOrders}
          icon={ShoppingCart}
          trend={8.2}
        />
        <DashboardCard
          title="Products"
          value={`${stats.activeProducts}/${stats.totalProducts}`}
          icon={Package}
          trend={3.1}
        />
        <DashboardCard
          title="Customers"
          value={stats.totalCustomers}
          icon={Users}
          trend={15.8}
        />
      </div>

      {/* Recent Orders */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Recent Orders</h2>
        <OrdersTable orders={recentOrders} onViewOrder={handleViewOrder} />
      </div>

      {/* Order Modal */}
      <OrderModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
