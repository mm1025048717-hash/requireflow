import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode, forwardRef } from 'react'

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  className?: string
}

const paddingMap = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-6',
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ 
  children, 
  padding = 'md', 
  hover = false,
  className = '', 
  ...props 
}, ref) => {
  return (
    <motion.div
      ref={ref}
      className={`
        bg-white rounded-xl border border-gray-100
        ${paddingMap[padding]}
        ${hover ? 'shadow-card hover:shadow-card-hover transition-shadow duration-300' : 'shadow-card'}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  )
})

Card.displayName = 'Card'

export default Card
