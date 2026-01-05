import { Link } from 'react-router-dom'
import { Bell, Search, Plus, HelpCircle } from 'lucide-react'

interface HeaderProps {
  title: string
  subtitle?: string
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Title */}
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="搜索..."
              className="w-56 pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-full
                       text-sm text-gray-900 placeholder-gray-400
                       hover:bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100
                       transition-all duration-200"
            />
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-gray-200" />

          {/* Notifications */}
          <button className="relative p-2.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          {/* Help */}
          <button className="p-2.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* Create Button */}
          <Link
            to="/create"
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white 
                     rounded-full text-sm font-semibold shadow-md shadow-blue-500/20
                     hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30
                     active:bg-blue-700 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>录入需求</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
