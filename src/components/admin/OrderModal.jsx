import { X } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'

export default function OrderModal({ order, isOpen, onClose }) {
  if (!order) return null

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  }

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'text-yellow-500',
      'Processing': 'text-blue-500',
      'Shipped': 'text-purple-500',
      'Delivered': 'text-green-500',
      'Cancelled': 'text-red-500'
    }
    return colors[status] || 'text-foreground'
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto z-50">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <Dialog.Title className="text-2xl font-bold text-foreground">
                Order Details
              </Dialog.Title>
              <p className="text-sm text-muted-foreground mt-1">
                {order.id} • {formatDate(order.date)}
              </p>
            </div>
            <Dialog.Close asChild>
              <button className="p-2 hover:bg-muted rounded-md transition-colors">
                <X size={20} className="text-foreground" />
              </button>
            </Dialog.Close>
          </div>

          {/* Status Badge */}
          <div className="mb-6">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              Status: {order.status}
            </span>
          </div>

          {/* Customer Info */}
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <h3 className="text-sm font-semibold text-foreground mb-3">Customer Information</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-muted-foreground">Name:</span> <span className="text-foreground font-medium">{order.customer}</span></p>
              <p><span className="text-muted-foreground">Email:</span> <span className="text-foreground">{order.email}</span></p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{item.product}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-foreground">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Total */}
          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between text-lg font-bold">
              <span className="text-foreground">Total</span>
              <span className="text-primary">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
