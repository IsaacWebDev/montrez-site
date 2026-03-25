import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { ProductCategory } from '../../lib/admin/types'

export default function ProductModal({ product, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    category: ProductCategory.WATCHES,
    imageUrl: '',
    stock: '',
    description: '',
    sku: ''
  })

  useEffect(() => {
    if (product) {
      setFormData(product)
    } else {
      // Reset form for new product
      setFormData({
        id: `PROD-${Date.now()}`,
        name: '',
        price: '',
        category: ProductCategory.WATCHES,
        imageUrl: '',
        stock: '',
        description: '',
        sku: ''
      })
    }
  }, [product, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto z-50">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <Dialog.Title className="text-2xl font-bold text-foreground">
              {product ? 'Edit Product' : 'Add New Product'}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-2 hover:bg-muted rounded-md transition-colors">
                <X size={20} className="text-foreground" />
              </button>
            </Dialog.Close>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="admin-input w-full"
                  placeholder="Montrez Classic Gold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  SKU
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  required
                  className="admin-input w-full"
                  placeholder="MTZ-CLG-001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Price (€)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="admin-input w-full"
                  placeholder="2450.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  className="admin-input w-full"
                  placeholder="12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="admin-input w-full"
                >
                  {Object.values(ProductCategory).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="admin-input w-full"
                  placeholder="/images/watch-gold.jpg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="admin-input w-full resize-none"
                placeholder="Product description..."
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-border rounded-md text-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="admin-button"
              >
                {product ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
