import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft,
  Download,
  Filter,
  Star,
  X
} from 'lucide-react'
import { Layout } from '../components/Layout'
import { Card, Badge, Button } from '../components/UI'
import { mockRequirements, priorityLabels } from '../data/mockData'
import type { Priority } from '../types'

const priorityColors: Record<Priority, 'red' | 'orange' | 'blue' | 'gray'> = {
  P0: 'red',
  P1: 'orange',
  P2: 'blue',
  P3: 'gray',
}

// 星级评分组件
function StarRating({ score }: { score: number }) {
  const fullStars = Math.floor(score / 20)
  const hasHalfStar = (score % 20) >= 10
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && (
        <Star className="w-3 h-3 fill-yellow-400/50 text-yellow-400" />
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} className="w-3 h-3 fill-gray-200 text-gray-200" />
      ))}
    </div>
  )
}

// 矩阵气泡组件
function MatrixBubble({ 
  requirement, 
  x, 
  y, 
  size 
}: { 
  requirement: typeof mockRequirements[0]
  x: number
  y: number
  size: number
}) {
  const navigate = useNavigate()
  const overallScore = requirement.aiAssessment?.overallScore || 0
  const businessValue = requirement.aiAssessment?.scoreDimensions.businessValue || 0
  const cost = requirement.aiAssessment?.scoreDimensions.implementationCost || 0
  // 成本越高，实现成本越低（分数越高）
  const costValue = 10 - cost

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1, zIndex: 10 }}
      onClick={() => navigate(`/requirements/${requirement.id}`)}
      className="absolute cursor-pointer group"
      style={{
        left: `${x}%`,
        bottom: `${y}%`,
        transform: 'translate(-50%, 50%)'
      }}
    >
      <div 
        className="relative bg-white rounded-full border-2 border-blue-400 shadow-lg 
                   hover:shadow-xl transition-all group-hover:border-blue-600
                   flex items-center justify-center"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <div className="text-center px-2">
          <p className="text-xs font-bold text-gray-900 truncate max-w-[60px] mb-1">
            {requirement.id.toUpperCase()}
          </p>
          <StarRating score={overallScore} />
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 
                        transition-opacity pointer-events-none z-20">
          <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
            <p className="font-bold mb-1">{requirement.title}</p>
            <p className="text-gray-300">收益: {businessValue}/10 | 成本: {costValue}/10</p>
            <p className="text-yellow-400 mt-1">得分: {overallScore}</p>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full w-0 h-0 
                            border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function MatrixView() {
  const navigate = useNavigate()
  const [selectedPriority, setSelectedPriority] = useState<Priority | 'all'>('all')

  // 过滤需求
  const filteredRequirements = mockRequirements.filter(req => {
    if (selectedPriority === 'all') return true
    return req.priority === selectedPriority && req.aiAssessment
  }).filter(req => req.aiAssessment) // 只显示已评估的需求

  // 计算矩阵位置
  const getMatrixPosition = (requirement: typeof mockRequirements[0]) => {
    const businessValue = requirement.aiAssessment?.scoreDimensions.businessValue || 0
    const cost = requirement.aiAssessment?.scoreDimensions.implementationCost || 0
    // 成本越高，实现成本越低（分数越高），所以用10-cost
    const costValue = 10 - cost
    
    // X轴：成本（从左到右：低成本 -> 高成本）
    const x = (costValue / 10) * 100
    // Y轴：收益（从下到上：低收益 -> 高收益）
    const y = (businessValue / 10) * 100

    // 气泡大小基于综合得分和影响范围（这里简化为综合得分）
    const overallScore = requirement.aiAssessment?.overallScore || 0
    const size = Math.max(60, Math.min(120, overallScore * 1.5))

    return { x, y, size }
  }

  return (
    <Layout title="优先级矩阵" subtitle="收益 vs 成本">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <motion.button
          onClick={() => navigate('/requirements')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 group"
          whileHover={{ x: -4 }}
        >
          <ArrowLeft className="w-4 h-4 group-hover:text-blue-600" />
          <span className="text-sm font-medium">返回列表</span>
        </motion.button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" icon={<Download className="w-4 h-4" />}>
            导出图片
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card padding="lg" className="mb-6">
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600 font-medium">当前视图：</span>
          <button
            onClick={() => setSelectedPriority('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              selectedPriority === 'all' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            全部
          </button>
          {(['P0', 'P1', 'P2', 'P3'] as Priority[]).map(priority => (
            <button
              key={priority}
              onClick={() => setSelectedPriority(priority)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selectedPriority === priority
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {priority} ({priorityLabels[priority]})
            </button>
          ))}
        </div>
      </Card>

      {/* Matrix */}
      <Card padding="lg">
        <div className="relative" style={{ height: '600px' }}>
          {/* Axes */}
          {/* Y-axis label */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full -rotate-90 origin-center">
            <span className="text-sm font-bold text-gray-700">高收益</span>
          </div>
          
          {/* X-axis label */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full mt-2">
            <span className="text-sm font-bold text-gray-700">高成本</span>
          </div>

          {/* Quadrant labels */}
          <div className="absolute top-4 left-4 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
            <p className="text-xs font-bold text-blue-700">战略需求</p>
            <p className="text-xs text-blue-600">高收益、高成本</p>
          </div>
          <div className="absolute top-4 right-4 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <p className="text-xs font-bold text-emerald-700">明星需求</p>
            <p className="text-xs text-emerald-600">高收益、低成本</p>
            <p className="text-xs text-emerald-600 mt-1">立即做 ⭐</p>
          </div>
          <div className="absolute bottom-4 right-4 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
            <p className="text-xs font-bold text-gray-700">小优化</p>
            <p className="text-xs text-gray-600">低收益、低成本</p>
          </div>
          <div className="absolute bottom-4 left-4 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200">
            <p className="text-xs font-bold text-red-700">陷阱需求</p>
            <p className="text-xs text-red-600">低收益、高成本</p>
            <p className="text-xs text-red-600 mt-1">尽量避免 ⚠️</p>
          </div>

          {/* Grid lines */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Vertical line (middle) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200"></div>
            {/* Horizontal line (middle) */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200"></div>
            
            {/* Additional grid lines */}
            {[0.25, 0.75].map((pos) => (
              <>
                <div 
                  key={`v-${pos}`}
                  className="absolute top-0 bottom-0 w-px bg-gray-100" 
                  style={{ left: `${pos * 100}%` }}
                ></div>
                <div 
                  key={`h-${pos}`}
                  className="absolute left-0 right-0 h-px bg-gray-100" 
                  style={{ top: `${pos * 100}%` }}
                ></div>
              </>
            ))}
          </div>

          {/* Bubbles */}
          <div className="absolute inset-0">
            {filteredRequirements.map((req) => {
              const { x, y, size } = getMatrixPosition(req)
              return (
                <MatrixBubble
                  key={req.id}
                  requirement={req}
                  x={x}
                  y={y}
                  size={size}
                />
              )
            })}
          </div>

          {/* Axes labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 pb-1">
            <span className="text-xs text-gray-500">低成本</span>
            <span className="text-xs text-gray-500">高成本</span>
          </div>
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-2 pl-1">
            <span className="text-xs text-gray-500 rotate-180" style={{ writingMode: 'vertical-rl' }}>高收益</span>
            <span className="text-xs text-gray-500 rotate-180" style={{ writingMode: 'vertical-rl' }}>低收益</span>
          </div>
        </div>
      </Card>

      {/* Legend */}
      <Card padding="lg" className="mt-6">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">图例：</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-400 border-2 border-blue-600"></div>
            <span className="text-xs text-gray-600">气泡大小 = 综合得分</span>
          </div>
          <div className="flex items-center gap-2">
            <StarRating score={80} />
            <span className="text-xs text-gray-600">星级 = 综合分数</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">点击气泡查看详情</span>
          </div>
        </div>
      </Card>
    </Layout>
  )
}

