// Reusable Button Component (Shadcn-style)
export default function Button({ 
  children, 
  variant = 'default', 
  size = 'default',
  className = '',
  onClick,
  type = 'button',
  disabled = false
}) {
  const baseStyles = 'transition-all duration-300 cursor-pointer font-display uppercase tracking-wider'
  
  const variants = {
    default: 'bg-transparent border border-white text-white hover:bg-white hover:text-black',
    gold: 'bg-transparent border border-gold text-gold hover:bg-gold hover:text-black',
    danger: 'bg-transparent border border-red text-red hover:bg-red hover:text-white',
    ghost: 'bg-transparent border-none text-light-grey hover:text-white hover:bg-dark-grey'
  }
  
  const sizes = {
    default: 'px-10 py-4 text-sm',
    sm: 'px-4 py-2 text-xs',
    lg: 'px-12 py-5 text-base'
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  )
}
