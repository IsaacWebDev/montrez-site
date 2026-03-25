import { useState } from 'react'
import OrdersTable from './OrdersTable'
import OrderModal from './OrderModal'
import { mockOrders } from '../../lib/admin/mockData'

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewOrder = (order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Orders</h1>
        <p className="text-muted-foreground">Manage and track all customer orders.</p>
      </div>

      <OrdersTable orders={mockOrders} onViewOrder={handleViewOrder} />

      <OrderModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
