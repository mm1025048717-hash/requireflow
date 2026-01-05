import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  LayoutGrid, 
  ListTodo, 
  PlusCircle, 
  BarChart3, 
  Users, 
  Settings,
  Sparkles
} from 'lucide-react'

const navItems = [
  { icon: LayoutGrid, label: '工作台', path: '/' },
  { icon: ListTodo, label: '需求池', path: '/requirements', badge: 10 },
  { icon: PlusCircle, label: '快速录入', path: '/create' },
  { icon: BarChart3, label: '数据分析', path: '/analytics' },
  { icon: Users, label: '客户管理', path: '/customers' },
  { icon: Settings, label: '系统设置', path: '/settings' },
]

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className="w-60 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-5 border-b border-gray-100">
        <div 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 tracking-tight">RequireFlow</h1>
            <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Workspace</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3">
        <p className="px-3 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Menu</p>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `
                  flex items-center justify-between px-3 py-2.5 rounded-lg
                  transition-all duration-200 group
                  ${isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-[18px] h-[18px] transition-colors ${
                        isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                      }`} />
                      <span className={`text-sm font-medium ${isActive ? 'font-semibold' : ''}`}>
                        {item.label}
                      </span>
                    </div>
                    {item.badge && (
                      <span className={`
                        text-xs font-semibold px-2 py-0.5 rounded-full
                        ${isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}
                      `}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
            张
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">张三</p>
            <p className="text-xs text-gray-500 truncate">产品经理</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
