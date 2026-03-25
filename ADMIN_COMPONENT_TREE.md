# Admin Dashboard Component Tree

## 🌲 Component Hierarchy

```
App (src/App.jsx)
└── BrowserRouter
    └── CartProvider
        └── AppRoutes
            └── Routes
                └── Route path="/admin/*"
                    └── Admin (src/components/Admin.jsx)
                        └── Routes
                            ├── Route path="login"
                            │   └── LoginPage
                            │       ├── Lock icon
                            │       ├── Email input
                            │       ├── Password input
                            │       └── Submit button
                            │
                            ├── Route path="dashboard"
                            │   └── ProtectedRoute
                            │       └── AdminLayout
                            │           ├── Sidebar
                            │           │   ├── Logo
                            │           │   ├── Navigation (4 items)
                            │           │   └── Logout button
                            │           │
                            │           └── DashboardPage
                            │               ├── 4x DashboardCard
                            │               │   ├── DollarSign icon (Revenue)
                            │               │   ├── ShoppingCart icon (Orders)
                            │               │   ├── Package icon (Products)
                            │               │   └── Users icon (Customers)
                            │               │
                            │               ├── OrdersTable (recent 5)
                            │               │   ├── Search input
                            │               │   ├── Status filter
                            │               │   └── Table rows
                            │               │
                            │               └── OrderModal
                            │                   ├── Dialog.Overlay
                            │                   └── Dialog.Content
                            │                       ├── Order details
                            │                       ├── Customer info
                            │                       ├── Items list
                            │                       └── Total
                            │
                            ├── Route path="orders"
                            │   └── ProtectedRoute
                            │       └── AdminLayout
                            │           ├── Sidebar
                            │           └── OrdersPage
                            │               ├── OrdersTable (all 22)
                            │               │   ├── Search input
                            │               │   ├── Status filter
                            │               │   └── Table rows
                            │               │       └── Eye button (view)
                            │               │
                            │               └── OrderModal
                            │
                            ├── Route path="products"
                            │   └── ProtectedRoute
                            │       └── AdminLayout
                            │           ├── Sidebar
                            │           └── ProductsPage
                            │               ├── ProductsTable
                            │               │   ├── Search input
                            │               │   ├── Add button
                            │               │   └── Table rows
                            │               │       ├── Edit button (pencil)
                            │               │       └── Delete button (trash)
                            │               │
                            │               └── ProductModal
                            │                   ├── Dialog.Overlay
                            │                   └── Dialog.Content
                            │                       ├── Name input
                            │                       ├── SKU input
                            │                       ├── Price input
                            │                       ├── Stock input
                            │                       ├── Category select
                            │                       ├── Image URL input
                            │                       ├── Description textarea
                            │                       ├── Cancel button
                            │                       └── Save button
                            │
                            └── Route path="emails"
                                └── ProtectedRoute
                                    └── AdminLayout
                                        ├── Sidebar
                                        └── EmailsPage
                                            └── EmailEditor
                                                ├── 5x Template Cards
                                                │   ├── Switch.Root (toggle)
                                                │   ├── Subject input
                                                │   └── Body textarea
                                                │
                                                └── Save All button
```

---

## 📊 Component Data Flow

### Login Flow
```
LoginPage
  ↓ (form submit)
localStorage.setItem('montrez-admin-auth', 'true')
  ↓
navigate('/admin/dashboard')
  ↓
ProtectedRoute checks localStorage
  ↓
Renders AdminLayout + DashboardPage
```

### Protected Routes Flow
```
User navigates to /admin/dashboard
  ↓
ProtectedRoute component
  ↓
Checks: localStorage.getItem('montrez-admin-auth') === 'true'
  ↓
  ├── TRUE → Render children (AdminLayout + Page)
  └── FALSE → Navigate to /admin/login
```

### Sidebar Navigation Flow
```
User clicks nav item (e.g., "Orders")
  ↓
Sidebar.jsx → navigate('/admin/orders')
  ↓
React Router updates route
  ↓
OrdersPage renders
  ↓
Mobile: setIsOpen(false) closes sidebar
```

### Orders Table → Modal Flow
```
OrdersPage
  └── OrdersTable (orders prop)
      └── Table row → Eye button click
          ↓
      onViewOrder(order) callback
          ↓
      OrdersPage → setSelectedOrder(order)
      OrdersPage → setIsModalOpen(true)
          ↓
      OrderModal (order, isOpen props)
          └── Radix Dialog.Root (open={isOpen})
              └── Dialog.Content (order details)
```

### Products CRUD Flow
```
ProductsPage (manages state: products, selectedProduct, isModalOpen)
  │
  ├── Add Product:
  │   ProductsTable → Add button click
  │     ↓
  │   setSelectedProduct(null)
  │   setIsModalOpen(true)
  │     ↓
  │   ProductModal (product=null)
  │     ↓
  │   User fills form → Submit
  │     ↓
  │   onSave(newProduct) → setProducts([...prev, newProduct])
  │
  ├── Edit Product:
  │   ProductsTable → Edit button click
  │     ↓
  │   setSelectedProduct(product)
  │   setIsModalOpen(true)
  │     ↓
  │   ProductModal (product=existingProduct)
  │     ↓
  │   User edits form → Submit
  │     ↓
  │   onSave(updatedProduct) → setProducts(prev.map(...))
  │
  └── Delete Product:
      ProductsTable → Delete button click
        ↓
      confirm() dialog
        ↓
      setProducts(prev.filter(p => p.id !== product.id))
```

### Email Editor State Flow
```
EmailsPage
  └── EmailEditor (templates prop)
      │
      ├── Internal state: editedTemplates
      │
      ├── Toggle Switch:
      │   handleToggle(templateId)
      │     ↓
      │   setEditedTemplates(prev.map(t => 
      │     t.id === templateId ? {...t, enabled: !t.enabled} : t
      │   ))
      │
      ├── Edit Field:
      │   handleChange(templateId, field, value)
      │     ↓
      │   setEditedTemplates(prev.map(t =>
      │     t.id === templateId ? {...t, [field]: value} : t
      │   ))
      │
      └── Save All:
          handleSave()
            ↓
          onSave(editedTemplates) callback
            ↓
          EmailsPage → setTemplates(updatedTemplates)
```

---

## 🗂️ Data Sources

### Mock Data Location
```
src/lib/admin/mockData.js
  ├── mockOrders (22 orders)
  ├── mockProducts (13 products)
  ├── mockEmailTemplates (5 templates)
  ├── calculateStats() → revenue, orders, products, customers
  └── getRecentOrders() → last 5 orders sorted by date
```

### Component Data Usage
```
DashboardPage:
  - stats = calculateStats()
  - recentOrders = getRecentOrders()

OrdersPage:
  - orders = mockOrders

ProductsPage:
  - useState(mockProducts) → local state for CRUD

EmailsPage:
  - useState(mockEmailTemplates) → local state for edits
```

---

## 🎨 Styling Architecture

### Tailwind Classes (Global)
```
tailwind.config.js
  └── Custom colors:
      - background: #0a0a0a
      - card: #1a1a1a
      - primary: #d4af37
      - etc.
```

### Admin CSS (Component-specific)
```
src/styles/admin.css
  ├── @tailwind directives
  └── Custom classes:
      ├── .admin-container
      ├── .admin-card
      ├── .admin-button
      ├── .admin-input
      ├── .admin-table
      └── .admin-badge-*
```

### Radix UI Styling
```
Components use inline styles + Tailwind:
  - Dialog: bg-card, border-border, etc.
  - Switch: custom bg-primary when checked
  - All themed to match Montrez brand
```

---

## 📱 Responsive Behavior

### Sidebar Responsiveness
```
<Sidebar />
  │
  ├── Desktop (≥1024px):
  │   - className="lg:translate-x-0" (always visible)
  │   - Fixed position
  │
  └── Mobile (<1024px):
      - className="-translate-x-full" (hidden)
      - Hamburger button visible
      - Overlay when open
      - transform: translateX(0) when isOpen=true
```

### Table Responsiveness
```
All tables wrapped in:
  <div className="admin-card overflow-x-auto">
    <table className="admin-table">
```
Mobile: horizontal scroll
Desktop: full-width
```

### Card Grid Responsiveness
```
DashboardPage stat cards:
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
```
Mobile: 1 column
Tablet: 2 columns
Desktop: 4 columns
```

---

## 🔄 State Management

### Local Component State
```javascript
// ProductsPage.jsx
const [products, setProducts] = useState(mockProducts)
const [selectedProduct, setSelectedProduct] = useState(null)
const [isModalOpen, setIsModalOpen] = useState(false)

// EmailsPage.jsx
const [templates, setTemplates] = useState(mockEmailTemplates)

// OrdersPage.jsx
const [selectedOrder, setSelectedOrder] = useState(null)
const [isModalOpen, setIsModalOpen] = useState(false)

// Sidebar.jsx
const [isOpen, setIsOpen] = useState(false)
```

### Global State (localStorage)
```javascript
// Auth state
localStorage.getItem('montrez-admin-auth') === 'true'
localStorage.setItem('montrez-admin-auth', 'true')
localStorage.removeItem('montrez-admin-auth')
```

**Note:** No Redux/Context API needed - all state is component-local or localStorage

---

## 🧩 Reusable Components

### Utility Components
```
DashboardCard
  - Props: title, value, icon, trend
  - Used in: DashboardPage (4x)

OrdersTable
  - Props: orders, onViewOrder
  - Used in: DashboardPage, OrdersPage

OrderModal
  - Props: order, isOpen, onClose
  - Used in: DashboardPage, OrdersPage

ProductsTable
  - Props: products, onAdd, onEdit, onDelete
  - Used in: ProductsPage

ProductModal
  - Props: product, isOpen, onClose, onSave
  - Used in: ProductsPage

EmailEditor
  - Props: templates, onSave
  - Used in: EmailsPage
```

---

## 🚀 Rendering Performance

### Component Memoization Opportunities
```javascript
// Not implemented but recommended for production:

const MemoizedDashboardCard = React.memo(DashboardCard)
const MemoizedOrdersTable = React.memo(OrdersTable)

// Or use useMemo for expensive calculations:
const stats = useMemo(() => calculateStats(), [])
```

### Current Performance
- No memoization (fine for mock data size)
- Re-renders on state change only
- Radix UI components optimized internally

---

**Component Count:** 17  
**Reusable Components:** 6  
**Page Components:** 5  
**Layout Components:** 2  
**Total LOC:** ~2,500+
