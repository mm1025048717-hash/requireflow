import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Search, 
  Grid3X3, 
  List, 
  Building2,
  Tag,
  MessageSquare,
  ChevronDown,
  X,
  Plus,
  Upload,
  Settings,
  Star,
  RefreshCw,
  Eye
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
import { format } from 'date-fns'

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

// 星级评分组件
function StarRating({ score }: { score: number }) {
  const fullStars = Math.floor(score / 20)
  const hasHalfStar = (score % 20) >= 10
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && (
        <Star className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} className="w-4 h-4 fill-gray-200 text-gray-200" />
      ))}
    </div>
  )
}

// 状态图标
function StatusIcon({ status }: { status: RequirementStatus }) {
  const icons = {
    pending_review: '⏳',
    planned: '🔄',
    developing: '🔄',
    testing: '🔄',
    released: '✅',
    rejected: '❌',
    merged: '✅'
  }
  return <span className="text-base">{icons[status]}</span>
}

// 需求表格行
function RequirementRow({ requirement, index }: { requirement: Requirement; index: number }) {
  const navigate = useNavigate()
  const date = requirement.aiAssessment?.assessedAt 
    ? new Date(requirement.aiAssessment.assessedAt)
    : new Date(requirement.createdAt)
  const formattedDate = format(date, 'yyyy-MM-dd')
  const overallScore = requirement.aiAssessment?.overallScore || 0

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
          <StatusIcon status={requirement.status} />
          <div className="min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
              {requirement.id.toUpperCase()}
            </div>
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="text-sm font-semibold text-gray-900 truncate max-w-xs">
          {requirement.title}
        </div>
      </td>
      <td className="py-4 px-4">
        <span className="text-sm text-gray-700 font-medium">{requirement.customerName}</span>
      </td>
      <td className="py-4 px-4">
        <div className="flex flex-col gap-1">
          {overallScore > 0 ? (
            <>
              <StarRating score={overallScore} />
              <span className="text-xs text-gray-500">{overallScore}分</span>
            </>
          ) : (
            <span className="text-xs text-gray-400">未评估</span>
          )}
        </div>
      </td>
      <td className="py-4 px-4">
        <span className="text-xs text-gray-500">{formattedDate}</span>
      </td>
      <td className="py-4 px-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            navigate(`/requirements/${requirement.id}`)
          }}
        >
          <Eye className="w-4 h-4 mr-1" />
          查看
        </Button>
      </td>
    </motion.tr>
  )
}

type ViewType = 'list' | 'matrix' | 'report'

export default function RequirementList() {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<ViewMode>('card')
  const [viewType, setViewType] = useState<ViewType>('list')
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

  // 处理视图切换
  const handleViewTypeChange = (type: ViewType) => {
    setViewType(type)
    if (type === 'matrix') {
      navigate('/requirements/matrix')
    } else if (type === 'report') {
      // TODO: 实现报告视图
      console.log('报告视图待实现')
    }
  }

  return (
    <Layout title="需求池" subtitle="AI需求优先级决策助手">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">需求池</h1>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" icon={<Plus className="w-4 h-4" />}>
              新增评估
            </Button>
            <Button variant="secondary" size="sm" icon={<Upload className="w-4 h-4" />}>
              导入反馈
            </Button>
            <Button variant="ghost" size="sm" icon={<Settings className="w-4 h-4" />}>
              调整模型
            </Button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-card p-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-lg text-sm placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
              />
            </div>

            {/* Right: View Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => handleViewTypeChange('list')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewType === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                列表视图
              </button>
              <button
                onClick={() => handleViewTypeChange('matrix')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewType === 'matrix' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                矩阵视图
              </button>
              <button
                onClick={() => handleViewTypeChange('report')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewType === 'report' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                报告视图
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-card">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">需求列表</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" icon={<RefreshCw className="w-4 h-4" />}>
                刷新评估
              </Button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="py-3 px-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">状态</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">需求ID</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">需求标题</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">提出人</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">综合分</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">评估时间</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequirements.map((req, index) => (
                <RequirementRow key={req.id} requirement={req} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
        <span>显示 {filteredRequirements.length} / {mockRequirements.length} 条需求</span>
      </div>
    </Layout>
  )
}
