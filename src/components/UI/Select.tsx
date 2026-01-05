import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import clsx from 'clsx'

interface Option {
  value: string
  label: string
}

interface SelectProps {
  options: Option[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  className?: string
}

export default function Select({
  options,
  value,
  onChange,
  placeholder = '请选择',
  label,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selectedOption = options.find(opt => opt.value === value)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={clsx('relative', className)} ref={ref}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'w-full flex items-center justify-between px-4 py-2.5',
          'bg-gray-50 border border-gray-200 rounded-xl',
          'text-left text-sm',
          'hover:border-gray-300 hover:bg-white',
          'focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500',
          'transition-all duration-200',
          isOpen && 'ring-2 ring-blue-100 border-blue-500 bg-white'
        )}
      >
        <span className={selectedOption ? 'text-gray-900' : 'text-gray-400'}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown 
          className={clsx(
            'w-4 h-4 text-gray-400 transition-transform duration-200',
            isOpen && 'rotate-180'
          )} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 py-1 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange?.(option.value)
                  setIsOpen(false)
                }}
                className={clsx(
                  'w-full flex items-center justify-between px-4 py-2.5 text-sm text-left',
                  'hover:bg-gray-50 transition-colors',
                  option.value === value && 'bg-blue-50 text-blue-700 font-medium'
                )}
              >
                {option.label}
                {option.value === value && (
                  <Check className="w-4 h-4 text-blue-600" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


