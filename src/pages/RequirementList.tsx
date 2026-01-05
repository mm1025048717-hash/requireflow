import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Search, 
  SlidersHorizontal,
  Grid3X3, 
  List, 
  Building2,
  Tag,
  MessageSquare,
  Calendar,
  ChevronDown,
  X,
  Filter
} from 'lucide-react'
import { Layout } from '../components/Layout'
import { Card, Badge, Button } from '../components/UI'
import { 
  mockRequirements, 
  statusLabels, 
  priorityLabels, 
  moduleLabels,
  sourceCategoryLabels
} from '../data/mockData'
import type { Requirement, Priority, RequirementStatus } from '../types'

type ViewMode = 'card' | 'table'

// 状态颜色映射
const statusColors: Record<RequirementStatus, 'blue' | 'green' | 'orange' | 'red' | 'gray' | 'purple'> = {
  pending_review: 'orange',
  planned: 'blue',
  developing: 'purple',
  testing: 'blue',
  released: 'green',
  rejected: 'red',
  merged: 'gray',
}

const priorityColors: Record<Priority, 'red' | 'orange' | 'blue' | 'gray'> = {
  P0: 'red',
  P1: 'orange',
  P2: 'blue',
  P3: 'gray',
}

// 筛选标签组件
function FilterTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
      {label}
      <button onClick={onRemove} className="hover:text-blue-900">
        <X className="w-3 h-3" />
      </button>
    </span>
  )
}

// 筛选下拉组件
function FilterDropdown({ 
  label, 
  options, 
  value, 
  onChange,
  icon: Icon
}: { 
  label: string
  options: { value: string; label: string }[]
  value: string
  onChange: (v: string) => void
  icon?: React.ElementType
}) {
  const [open, setOpen] = useState(false)
  const selected = options.find(o => o.value === value)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-all ${
          value ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        {Icon && <Icon className="w-4 h-4" />}
        <span>{selected?.label || label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20"
            >
              <button
                onClick={() => { onChange(''); setOpen(false); }}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 ${!value ? 'text-blue-600 font-medium' : 'text-gray-600'}`}
              >
                全部
              </button>
              {options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 ${value === opt.value ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-700'}`}
                >
                  {opt.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// 需求卡片
function RequirementCard({ requirement }: { requirement: Requirement }) {
  const navigate = useNavigate()
  const date = new Date(requirement.createdAt)
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onClick={() => navigate(`/requirements/${requirement.id}`)}
      className="bg-white rounded-xl p-5 border border-gray-100 shadow-card cursor-pointer hover:shadow-card-hover transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Badge variant={priorityColors[requirement.priority]} size="sm" className="font-bold">
            {requirement.priority}
          </Badge>
          <Badge variant={statusColors[requirement.status]} size="sm" dot>
            {statusLabels[requirement.status]}
          </Badge>
        </div>
        <span className="text-xs text-gray-400">{formattedDate}</span>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {requirement.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
        {requirement.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {requirement.tags.slice(0, 3).map(tag => (
          <span key={tag} className="px-2 py-0.5 bg-gray-50 text-gray-600 text-xs rounded-md font-medium">
            {tag}
          </span>
        ))}
        {requirement.tags.length > 3 && (
          <span className="px-2 py-0.5 bg-gray-50 text-gray-400 text-xs rounded-md">
            +{requirement.tags.length - 3}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-gray-400" />
            {requirement.customerName}
          </span>
          <span className="flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-gray-400" />
            {moduleLabels[requirement.module]}
          </span>
        </div>
        {requirement.comments.length > 0 && (
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <MessageSquare className="w-3.5 h-3.5" />
            {requirement.comments.length}
          </span>
        )}
      </div>
    </motion.div>
  )
}

// 需求表格行
function RequirementRow({ requirement, index }: { requirement: Requirement; index: number }) {
  const navigate = useNavigate()
  const date = new Date(requirement.createdAt)
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ backgroundColor: '#FAFBFC' }}
      onClick={() => navigate(`/requirements/${requirement.id}`)}
      className="border-b border-gray-50 cursor-pointer group"
    >
      <td className="py-4 px-5">
        <div className="flex items-center gap-3">
          <Badge variant={priorityColors[requirement.priority]} size="sm" className="font-bold shrink-0">
            {requirement.priority}
          </Badge>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
              {requirement.title}
            </div>
            <div className="text-xs text-gray-400 truncate max-w-md mt-0.5">
              {requirement.description}
            </div>
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <span className="text-sm text-gray-700 font-medium">{requirement.customerName}</span>
      </td>
      <td className="py-4 px-4">
        <span className="text-sm text-gray-600">{moduleLabels[requirement.module]}</span>
      </td>
      <td className="py-4 px-4">
        <Badge variant={statusColors[requirement.status]} size="sm" dot>
          {statusLabels[requirement.status]}
        </Badge>
      </td>
      <td className="py-4 px-4">
        <span className="text-sm text-gray-500">{sourceCategoryLabels[requirement.source.category]}</span>
      </td>
      <td className="py-4 px-4">
        <span className="text-sm text-gray-400">{formattedDate}</span>
      </td>
    </motion.tr>
  )
}

export default function RequirementList() {
  const [viewMode, setViewMode] = useState<ViewMode>('card')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [moduleFilter, setModuleFilter] = useState('')

  // 筛选逻辑
  const filteredRequirements = mockRequirements.filter(req => {
    const matchSearch = !searchQuery || 
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchStatus = !statusFilter || req.status === statusFilter
    const matchPriority = !priorityFilter || req.priority === priorityFilter
    const matchModule = !moduleFilter || req.module === moduleFilter
    return matchSearch && matchStatus && matchPriority && matchModule
  })

  const activeFilters = [statusFilter, priorityFilter, moduleFilter].filter(Boolean)

  const clearAllFilters = () => {
    setStatusFilter('')
    setPriorityFilter('')
    setModuleFilter('')
  }

  return (
    <Layout title="需求池" subtitle={`共 ${mockRequirements.length} 条需求`}>
      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-card p-4 mb-6">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Search & Filters */}
          <div className="flex items-center gap-3 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索需求标题、描述、客户..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-lg text-sm placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
              />
            </div>

            {/* Filter Dropdowns */}
            <FilterDropdown
              label="状态"
              options={Object.entries(statusLabels).map(([value, label]) => ({ value, label }))}
              value={statusFilter}
              onChange={setStatusFilter}
            />
            <FilterDropdown
              label="优先级"
              options={Object.entries(priorityLabels).map(([value, label]) => ({ value, label }))}
              value={priorityFilter}
              onChange={setPriorityFilter}
            />
            <FilterDropdown
              label="模块"
              options={Object.entries(moduleLabels).map(([value, label]) => ({ value, label }))}
              value={moduleFilter}
              onChange={setModuleFilter}
            />
          </div>

          {/* Right: View Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('card')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'card' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'table' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-500 font-medium">已筛选：</span>
            {statusFilter && (
              <FilterTag label={statusLabels[statusFilter as RequirementStatus]} onRemove={() => setStatusFilter('')} />
            )}
            {priorityFilter && (
              <FilterTag label={priorityLabels[priorityFilter as Priority]} onRemove={() => setPriorityFilter('')} />
            )}
            {moduleFilter && (
              <FilterTag label={moduleLabels[moduleFilter]} onRemove={() => setModuleFilter('')} />
            )}
            <button onClick={clearAllFilters} className="text-xs text-gray-400 hover:text-gray-600 ml-2">
              清除全部
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      {filteredRequirements.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl border border-gray-100 shadow-card p-16 text-center"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">没有找到相关需求</h3>
          <p className="text-sm text-gray-500 mb-4">尝试调整搜索关键词或筛选条件</p>
          <Button variant="secondary" onClick={clearAllFilters}>清除筛选</Button>
        </motion.div>
      ) : viewMode === 'card' ? (
        <motion.div layout className="grid grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredRequirements.map((req) => (
              <RequirementCard key={req.id} requirement={req} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <Card padding="none">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="py-3 px-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">需求</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">客户</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">模块</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">状态</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">来源</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">时间</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequirements.map((req, index) => (
                <RequirementRow key={req.id} requirement={req} index={index} />
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
        <span>显示 {filteredRequirements.length} / {mockRequirements.length} 条需求</span>
      </div>
    </Layout>
  )
}
