import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'blue' | 'green' | 'orange' | 'red' | 'gray' | 'purple'
  size?: 'sm' | 'md'
  dot?: boolean
  className?: string
}

const variantStyles = {
  blue: 'bg-blue-50 text-blue-700 border-blue-100',
  green: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  orange: 'bg-orange-50 text-orange-700 border-orange-100',
  red: 'bg-red-50 text-red-700 border-red-100',
  gray: 'bg-gray-100 text-gray-600 border-gray-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-100',
}

const dotColors = {
  blue: 'bg-blue-500',
  green: 'bg-emerald-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
  gray: 'bg-gray-500',
  purple: 'bg-purple-500',
}

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
}

export default function Badge({ 
  children, 
  variant = 'gray', 
  size = 'md',
  dot = false,
  className = '' 
}: BadgeProps) {
  return (
    <span className={`
      inline-flex items-center gap-1.5 rounded-md font-medium border
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${className}
    `}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />
      )}
      {children}
    </span>
  )
}
