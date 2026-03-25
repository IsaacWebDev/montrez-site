import { useState } from 'react'
import ProductsTable from './ProductsTable'
import ProductModal from './ProductModal'
import { mockProducts } from '../../lib/admin/mockData'

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAdd = () => {
    setSelectedProduct(null)
    setIsModalOpen(true)
  }

  const handleEdit = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleDelete = (product) => {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      setProducts(prev => prev.filter(p => p.id !== product.id))
      alert('Product deleted successfully! (Mock operation)')
    }
  }

  const handleSave = (productData) => {
    if (selectedProduct) {
      // Edit existing product
      setProducts(prev =>
        prev.map(p => p.id === productData.id ? productData : p)
      )
      alert('Product updated successfully! (Mock operation)')
    } else {
      // Add new product
      setProducts(prev => [...prev, productData])
      alert('Product added successfully! (Mock operation)')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Products</h1>
        <p className="text-muted-foreground">Manage your product catalog and inventory.</p>
      </div>

      <ProductsTable
        products={products}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  )
}
