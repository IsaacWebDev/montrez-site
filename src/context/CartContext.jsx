import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage
    const saved = localStorage.getItem('montrez-cart')
    return saved ? JSON.parse(saved) : []
  })

  const [isCartOpen, setIsCartOpen] = useState(false)

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('montrez-cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, size, quantity = 1) => {
    setCart(prev => {
      // Check if item already exists
      const existingIndex = prev.findIndex(
        item => item.id === product.id && item.size === size
      )

      if (existingIndex > -1) {
        // Update quantity
        const updated = [...prev]
        updated[existingIndex].quantity += quantity
        return updated
      }

      // Add new item
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || product.image,
        size,
        quantity
      }]
    })
    setIsCartOpen(true)
  }

  const removeFromCart = (id, size) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.size === size)))
  }

  const updateQuantity = (id, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id, size)
      return
    }
    
    setCart(prev => prev.map(item =>
      item.id === id && item.size === size
        ? { ...item, quantity }
        : item
    ))
  }

  const clearCart = () => {
    setCart([])
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  )
}
