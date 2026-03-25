import { OrderStatus, ProductCategory } from './types'

// Mock Orders (20+ orders)
export const mockOrders = [
  {
    id: 'ORD-001',
    customer: 'Sophie Laurent',
    email: 'sophie.laurent@email.fr',
    total: 2450.00,
    status: OrderStatus.DELIVERED,
    date: '2026-03-20T10:30:00Z',
    items: [
      { product: 'Montrez Classic Gold', quantity: 1, price: 2450.00 }
    ]
  },
  {
    id: 'ORD-002',
    customer: 'Marc Dubois',
    email: 'marc.dubois@email.fr',
    total: 3800.00,
    status: OrderStatus.SHIPPED,
    date: '2026-03-22T14:15:00Z',
    items: [
      { product: 'Montrez Royal Platinum', quantity: 1, price: 3800.00 }
    ]
  },
  {
    id: 'ORD-003',
    customer: 'Amélie Martin',
    email: 'amelie.m@email.fr',
    total: 1200.00,
    status: OrderStatus.PROCESSING,
    date: '2026-03-23T09:20:00Z',
    items: [
      { product: 'Leather Strap Black', quantity: 2, price: 350.00 },
      { product: 'Watch Case Premium', quantity: 1, price: 500.00 }
    ]
  },
  {
    id: 'ORD-004',
    customer: 'Pierre Bernard',
    email: 'pierre.b@email.fr',
    total: 5200.00,
    status: OrderStatus.PENDING,
    date: '2026-03-24T16:45:00Z',
    items: [
      { product: 'Montrez Limited Edition 2026', quantity: 1, price: 5200.00 }
    ]
  },
  {
    id: 'ORD-005',
    customer: 'Claire Petit',
    email: 'claire.petit@email.fr',
    total: 2800.00,
    status: OrderStatus.DELIVERED,
    date: '2026-03-18T11:00:00Z',
    items: [
      { product: 'Montrez Silver Automatic', quantity: 1, price: 2800.00 }
    ]
  },
  {
    id: 'ORD-006',
    customer: 'Lucas Moreau',
    email: 'lucas.moreau@email.fr',
    total: 950.00,
    status: OrderStatus.CANCELLED,
    date: '2026-03-19T13:30:00Z',
    items: [
      { product: 'Leather Strap Brown', quantity: 1, price: 350.00 },
      { product: 'Watch Polish Kit', quantity: 1, price: 600.00 }
    ]
  },
  {
    id: 'ORD-007',
    customer: 'Emma Rousseau',
    email: 'emma.rousseau@email.fr',
    total: 4100.00,
    status: OrderStatus.SHIPPED,
    date: '2026-03-21T15:20:00Z',
    items: [
      { product: 'Montrez Black Diamond', quantity: 1, price: 4100.00 }
    ]
  },
  {
    id: 'ORD-008',
    customer: 'Thomas Girard',
    email: 'thomas.g@email.fr',
    total: 1750.00,
    status: OrderStatus.PROCESSING,
    date: '2026-03-23T10:10:00Z',
    items: [
      { product: 'Montrez Sport Chronograph', quantity: 1, price: 1750.00 }
    ]
  },
  {
    id: 'ORD-009',
    customer: 'Léa Bonnet',
    email: 'lea.bonnet@email.fr',
    total: 3200.00,
    status: OrderStatus.DELIVERED,
    date: '2026-03-17T14:00:00Z',
    items: [
      { product: 'Montrez Rose Gold', quantity: 1, price: 3200.00 }
    ]
  },
  {
    id: 'ORD-010',
    customer: 'Hugo Lambert',
    email: 'hugo.lambert@email.fr',
    total: 700.00,
    status: OrderStatus.PENDING,
    date: '2026-03-24T17:30:00Z',
    items: [
      { product: 'Watch Case Travel', quantity: 1, price: 350.00 },
      { product: 'Leather Strap Black', quantity: 1, price: 350.00 }
    ]
  },
  {
    id: 'ORD-011',
    customer: 'Chloé Durand',
    email: 'chloe.durand@email.fr',
    total: 2600.00,
    status: OrderStatus.SHIPPED,
    date: '2026-03-22T12:45:00Z',
    items: [
      { product: 'Montrez Minimalist White', quantity: 1, price: 2600.00 }
    ]
  },
  {
    id: 'ORD-012',
    customer: 'Antoine Simon',
    email: 'antoine.simon@email.fr',
    total: 4500.00,
    status: OrderStatus.PROCESSING,
    date: '2026-03-23T11:20:00Z',
    items: [
      { product: 'Montrez Royal Platinum', quantity: 1, price: 3800.00 },
      { product: 'Leather Strap Brown', quantity: 2, price: 350.00 }
    ]
  },
  {
    id: 'ORD-013',
    customer: 'Manon Fournier',
    email: 'manon.f@email.fr',
    total: 1850.00,
    status: OrderStatus.DELIVERED,
    date: '2026-03-16T09:00:00Z',
    items: [
      { product: 'Montrez Sport Chronograph', quantity: 1, price: 1750.00 },
      { product: 'Watch Polish Kit', quantity: 1, price: 100.00 }
    ]
  },
  {
    id: 'ORD-014',
    customer: 'Maxime Leroy',
    email: 'maxime.leroy@email.fr',
    total: 3800.00,
    status: OrderStatus.PENDING,
    date: '2026-03-24T18:00:00Z',
    items: [
      { product: 'Montrez Royal Platinum', quantity: 1, price: 3800.00 }
    ]
  },
  {
    id: 'ORD-015',
    customer: 'Sarah Mercier',
    email: 'sarah.mercier@email.fr',
    total: 2450.00,
    status: OrderStatus.SHIPPED,
    date: '2026-03-21T16:30:00Z',
    items: [
      { product: 'Montrez Classic Gold', quantity: 1, price: 2450.00 }
    ]
  },
  {
    id: 'ORD-016',
    customer: 'Victor Blanc',
    email: 'victor.blanc@email.fr',
    total: 5900.00,
    status: OrderStatus.PROCESSING,
    date: '2026-03-23T13:15:00Z',
    items: [
      { product: 'Montrez Limited Edition 2026', quantity: 1, price: 5200.00 },
      { product: 'Watch Case Premium', quantity: 1, price: 500.00 },
      { product: 'Watch Polish Kit', quantity: 2, price: 100.00 }
    ]
  },
  {
    id: 'ORD-017',
    customer: 'Juliette Garnier',
    email: 'juliette.garnier@email.fr',
    total: 3200.00,
    status: OrderStatus.DELIVERED,
    date: '2026-03-15T10:30:00Z',
    items: [
      { product: 'Montrez Rose Gold', quantity: 1, price: 3200.00 }
    ]
  },
  {
    id: 'ORD-018',
    customer: 'Louis Fabre',
    email: 'louis.fabre@email.fr',
    total: 1400.00,
    status: OrderStatus.CANCELLED,
    date: '2026-03-20T14:00:00Z',
    items: [
      { product: 'Leather Strap Black', quantity: 4, price: 350.00 }
    ]
  },
  {
    id: 'ORD-019',
    customer: 'Camille Roux',
    email: 'camille.roux@email.fr',
    total: 4100.00,
    status: OrderStatus.SHIPPED,
    date: '2026-03-22T11:00:00Z',
    items: [
      { product: 'Montrez Black Diamond', quantity: 1, price: 4100.00 }
    ]
  },
  {
    id: 'ORD-020',
    customer: 'Gabriel Morel',
    email: 'gabriel.morel@email.fr',
    total: 2800.00,
    status: OrderStatus.PROCESSING,
    date: '2026-03-23T15:45:00Z',
    items: [
      { product: 'Montrez Silver Automatic', quantity: 1, price: 2800.00 }
    ]
  },
  {
    id: 'ORD-021',
    customer: 'Alice Fontaine',
    email: 'alice.fontaine@email.fr',
    total: 6500.00,
    status: OrderStatus.PENDING,
    date: '2026-03-24T19:15:00Z',
    items: [
      { product: 'Montrez Limited Edition 2026', quantity: 1, price: 5200.00 },
      { product: 'Montrez Sport Chronograph', quantity: 1, price: 1300.00 }
    ]
  },
  {
    id: 'ORD-022',
    customer: 'Arthur Chevalier',
    email: 'arthur.chevalier@email.fr',
    total: 2600.00,
    status: OrderStatus.DELIVERED,
    date: '2026-03-14T12:00:00Z',
    items: [
      { product: 'Montrez Minimalist White', quantity: 1, price: 2600.00 }
    ]
  }
]

// Mock Products (10+ products)
export const mockProducts = [
  {
    id: 'PROD-001',
    name: 'Montrez Classic Gold',
    price: 2450.00,
    category: ProductCategory.WATCHES,
    imageUrl: '/images/watch-gold.jpg',
    stock: 12,
    description: 'Timeless elegance with 18K gold plating and Swiss movement',
    sku: 'MTZ-CLG-001'
  },
  {
    id: 'PROD-002',
    name: 'Montrez Royal Platinum',
    price: 3800.00,
    category: ProductCategory.WATCHES,
    imageUrl: '/images/watch-platinum.jpg',
    stock: 5,
    description: 'Premium platinum finish with automatic movement',
    sku: 'MTZ-RPL-002'
  },
  {
    id: 'PROD-003',
    name: 'Montrez Black Diamond',
    price: 4100.00,
    category: ProductCategory.WATCHES,
    imageUrl: '/images/watch-diamond.jpg',
    stock: 8,
    description: 'Black ceramic case with genuine diamond markers',
    sku: 'MTZ-BDM-003'
  },
  {
    id: 'PROD-004',
    name: 'Montrez Rose Gold',
    price: 3200.00,
    category: ProductCategory.WATCHES,
    imageUrl: '/images/watch-rosegold.jpg',
    stock: 15,
    description: 'Sophisticated rose gold with mother-of-pearl dial',
    sku: 'MTZ-RSG-004'
  },
  {
    id: 'PROD-005',
    name: 'Montrez Silver Automatic',
    price: 2800.00,
    category: ProductCategory.WATCHES,
    imageUrl: '/images/watch-silver.jpg',
    stock: 20,
    description: 'Stainless steel automatic with exhibition caseback',
    sku: 'MTZ-SLA-005'
  },
  {
    id: 'PROD-006',
    name: 'Montrez Sport Chronograph',
    price: 1750.00,
    category: ProductCategory.WATCHES,
    imageUrl: '/images/watch-sport.jpg',
    stock: 25,
    description: 'Performance chronograph with sapphire crystal',
    sku: 'MTZ-SPC-006'
  },
  {
    id: 'PROD-007',
    name: 'Montrez Minimalist White',
    price: 2600.00,
    category: ProductCategory.WATCHES,
    imageUrl: '/images/watch-minimal.jpg',
    stock: 18,
    description: 'Clean design with white dial and ultra-thin profile',
    sku: 'MTZ-MNW-007'
  },
  {
    id: 'PROD-008',
    name: 'Montrez Limited Edition 2026',
    price: 5200.00,
    category: ProductCategory.LIMITED,
    imageUrl: '/images/watch-limited.jpg',
    stock: 3,
    description: 'Exclusive 2026 limited edition - only 100 pieces worldwide',
    sku: 'MTZ-LTD-2026'
  },
  {
    id: 'PROD-009',
    name: 'Leather Strap Black',
    price: 350.00,
    category: ProductCategory.ACCESSORIES,
    imageUrl: '/images/strap-black.jpg',
    stock: 50,
    description: 'Premium Italian leather strap in classic black',
    sku: 'MTZ-LSB-009'
  },
  {
    id: 'PROD-010',
    name: 'Leather Strap Brown',
    price: 350.00,
    category: ProductCategory.ACCESSORIES,
    imageUrl: '/images/strap-brown.jpg',
    stock: 45,
    description: 'Vintage brown leather with hand-stitching',
    sku: 'MTZ-LSR-010'
  },
  {
    id: 'PROD-011',
    name: 'Watch Case Premium',
    price: 500.00,
    category: ProductCategory.ACCESSORIES,
    imageUrl: '/images/case-premium.jpg',
    stock: 30,
    description: 'Luxury watch case for 6 timepieces with velvet interior',
    sku: 'MTZ-WCP-011'
  },
  {
    id: 'PROD-012',
    name: 'Watch Case Travel',
    price: 350.00,
    category: ProductCategory.ACCESSORIES,
    imageUrl: '/images/case-travel.jpg',
    stock: 40,
    description: 'Compact travel case with shock protection',
    sku: 'MTZ-WCT-012'
  },
  {
    id: 'PROD-013',
    name: 'Watch Polish Kit',
    price: 100.00,
    category: ProductCategory.ACCESSORIES,
    imageUrl: '/images/polish-kit.jpg',
    stock: 100,
    description: 'Professional watch cleaning and polishing kit',
    sku: 'MTZ-WPK-013'
  }
]

// Mock Email Templates
export const mockEmailTemplates = [
  {
    id: 'EMAIL-001',
    name: 'Order Confirmation',
    enabled: true,
    subject: 'Your Montrez Order Confirmation - #{orderId}',
    body: 'Dear {customerName},\n\nThank you for your order at Montrez. Your order #{orderId} has been confirmed.\n\nOrder Total: €{orderTotal}\n\nWe will send you a shipping notification once your order has been dispatched.\n\nBest regards,\nThe Montrez Team'
  },
  {
    id: 'EMAIL-002',
    name: 'Shipping Notification',
    enabled: true,
    subject: 'Your Montrez Order Has Shipped - #{orderId}',
    body: 'Dear {customerName},\n\nGreat news! Your order #{orderId} has been shipped.\n\nTracking Number: {trackingNumber}\n\nYou can expect delivery within 3-5 business days.\n\nBest regards,\nThe Montrez Team'
  },
  {
    id: 'EMAIL-003',
    name: 'Welcome Email',
    enabled: true,
    subject: 'Welcome to Montrez - Luxury Redefined',
    body: 'Dear {customerName},\n\nWelcome to the Montrez family!\n\nAs a valued member, you\'ll receive exclusive access to:\n- New collection previews\n- Limited edition releases\n- Special member pricing\n\nThank you for choosing Montrez.\n\nBest regards,\nThe Montrez Team'
  },
  {
    id: 'EMAIL-004',
    name: 'Abandoned Cart',
    enabled: false,
    subject: 'You Left Something Behind at Montrez',
    body: 'Dear {customerName},\n\nWe noticed you left items in your cart:\n\n{cartItems}\n\nComplete your order now and enjoy free shipping on orders over €500.\n\nBest regards,\nThe Montrez Team'
  },
  {
    id: 'EMAIL-005',
    name: 'Product Restock Alert',
    enabled: false,
    subject: '{productName} is Back in Stock!',
    body: 'Dear {customerName},\n\nGood news! The {productName} you were interested in is now back in stock.\n\nOrder now before it sells out again.\n\nBest regards,\nThe Montrez Team'
  }
]

// Stats calculation helpers
export const calculateStats = () => {
  const totalRevenue = mockOrders
    .filter(order => order.status !== OrderStatus.CANCELLED)
    .reduce((sum, order) => sum + order.total, 0)
  
  const totalOrders = mockOrders.length
  const activeProducts = mockProducts.filter(p => p.stock > 0).length
  
  // Unique customers
  const uniqueCustomers = new Set(mockOrders.map(o => o.email)).size
  
  return {
    totalRevenue,
    totalOrders,
    totalProducts: mockProducts.length,
    activeProducts,
    totalCustomers: uniqueCustomers
  }
}

// Get recent orders (last 5)
export const getRecentOrders = () => {
  return [...mockOrders]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
}
