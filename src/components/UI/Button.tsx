import { ReactNode, ButtonHTMLAttributes, forwardRef } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>, 
  'className' | 
  'onAnimationStart' | 
  'onAnimationEnd' | 
  'onAnimationIteration' |
  'onDragStart' |
  'onDrag' |
  'onDragEnd'
> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  icon?: ReactNode
  className?: string
}

const variantStyles = {
  primary: `
    bg-blue-500 text-white shadow-md shadow-blue-500/20
    hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30
    active:bg-blue-700
    disabled:bg-gray-300 disabled:shadow-none
  `,
  secondary: `
    bg-white text-gray-700 border border-gray-200 shadow-sm
    hover:bg-gray-50 hover:border-gray-300
    active:bg-gray-100
    disabled:bg-gray-50 disabled:text-gray-400
  `,
  ghost: `
    bg-transparent text-gray-600
    hover:bg-gray-100 hover:text-gray-900
    active:bg-gray-200
    disabled:text-gray-300
  `,
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  className = '',
  disabled,
  ...props
}, ref) => {
  return (
    <motion.button
      ref={ref}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={`
        inline-flex items-center justify-center font-medium rounded-lg
        transition-all duration-200 cursor-pointer
        disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {icon}
      {children}
    </motion.button>
  )
})

Button.displayName = 'Button'

export default Button
