import { useState } from 'react'
import { Edit, Trash2, Plus } from 'lucide-react'

export default function ProductsTable({ products, onEdit, onDelete, onAdd }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  }

  const getStockStatusColor = (stock) => {
    if (stock === 0) return 'text-red-500'
    if (stock < 10) return 'text-yellow-500'
    return 'text-green-500'
  }

  return (
    <div className="space-y-4">
      {/* Search and Add Button */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name, SKU, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin-input flex-1"
        />
        <button onClick={onAdd} className="admin-button flex items-center gap-2 whitespace-nowrap">
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Table */}
      <div className="admin-card overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-muted-foreground">
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="font-mono text-sm">{product.sku}</td>
                  <td className="font-semibold">{product.name}</td>
                  <td>
                    <span className="admin-badge bg-primary/20 text-primary">
                      {product.category}
                    </span>
                  </td>
                  <td className="font-semibold">{formatCurrency(product.price)}</td>
                  <td className={`font-semibold ${getStockStatusColor(product.stock)}`}>
                    {product.stock}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(product)}
                        className="p-2 hover:bg-muted rounded-md transition-colors"
                        title="Edit Product"
                      >
                        <Edit size={18} className="text-blue-500" />
                      </button>
                      <button
                        onClick={() => onDelete(product)}
                        className="p-2 hover:bg-muted rounded-md transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 size={18} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground text-center">
        Showing {filteredProducts.length} of {products.length} products
      </p>
    </div>
  )
}
