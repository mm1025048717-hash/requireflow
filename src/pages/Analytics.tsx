import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Download,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Minus,
  Users,
  FileText,
  Clock,
  Target
} from 'lucide-react'
import { Layout } from '../components/Layout'
import { Card, Button } from '../components/UI'
import { mockRequirements, statusLabels, priorityLabels, moduleLabels } from '../data/mockData'

// 数据指标卡片
function MetricCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  color,
  delay = 0
}: { 
  title: string
  value: string | number
  change: string
  changeType: 'up' | 'down' | 'neutral'
  icon: React.ElementType
  color: string
  delay?: number
}) {
  const changeColors = {
    up: 'text-emerald-600 bg-emerald-50',
    down: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-100',
  }

  const ChangeIcon = changeType === 'up' ? ArrowUp : changeType === 'down' ? ArrowDown : Minus

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card hover className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 -translate-y-1/2 translate-x-1/2" style={{ backgroundColor: color }} />
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-3">{value}</p>
            <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${changeColors[changeType]}`}>
              <ChangeIcon className="w-3 h-3" />
              {change}
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
            <Icon className="w-6 h-6" style={{ color }} />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

// 进度条
function ProgressBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const percentage = (value / max) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-700 font-medium">{label}</span>
        <span className="text-gray-900 font-bold">{value}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <motion.div 
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

// 模拟图表柱状图
function MockBarChart({ data }: { data: { label: string; value: number }[] }) {
  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <div className="flex items-end gap-4 h-48 px-4">
      {data.map((item, index) => (
        <div key={item.label} className="flex-1 flex flex-col items-center gap-2">
          <motion.div
            className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg relative group cursor-pointer"
            initial={{ height: 0 }}
            animate={{ height: `${(item.value / maxValue) * 100}%` }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {item.value} 条
            </div>
          </motion.div>
          <span className="text-xs text-gray-500 font-medium whitespace-nowrap">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

// 模拟饼图
function MockPieChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0)
  let currentAngle = 0

  return (
    <div className="flex items-center gap-6">
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100
            const angle = (percentage / 100) * 360
            const startAngle = currentAngle
            currentAngle += angle
            
            const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
            const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
            const x2 = 50 + 40 * Math.cos(((startAngle + angle) * Math.PI) / 180)
            const y2 = 50 + 40 * Math.sin(((startAngle + angle) * Math.PI) / 180)
            const largeArc = angle > 180 ? 1 : 0

            return (
              <motion.path
                key={item.label}
                d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                fill={item.color}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="cursor-pointer hover:opacity-90 transition-opacity"
              />
            )
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-white rounded-full shadow-sm flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">{total}</span>
            <span className="text-xs text-gray-500">总计</span>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {data.map(item => (
          <div key={item.label} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
            <span className="text-sm text-gray-600">{item.label}</span>
            <span className="text-sm font-semibold text-gray-900 ml-auto">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('month')

  // 计算统计数据
  const totalRequirements = mockRequirements.length
  const pendingCount = mockRequirements.filter(r => r.status === 'pending_review').length
  const developingCount = mockRequirements.filter(r => r.status === 'developing').length
  const releasedCount = mockRequirements.filter(r => r.status === 'released').length
  
  // 按状态分组
  const statusData = Object.entries(statusLabels).map(([status, label]) => ({
    label,
    value: mockRequirements.filter(r => r.status === status).length,
    color: {
      pending_review: '#F59E0B',
      planned: '#3B82F6',
      developing: '#8B5CF6',
      testing: '#6366F1',
      released: '#10B981',
      rejected: '#EF4444',
      merged: '#6B7280',
    }[status] || '#9CA3AF'
  })).filter(d => d.value > 0)

  // 按模块分组
  const moduleData = Object.entries(moduleLabels).map(([module, label]) => ({
    label,
    value: mockRequirements.filter(r => r.module === module).length
  })).filter(d => d.value > 0)

  // 按优先级分组
  const priorityData = Object.entries(priorityLabels).map(([priority, label]) => ({
    label,
    value: mockRequirements.filter(r => r.priority === priority).length,
    color: {
      P0: '#EF4444',
      P1: '#F59E0B',
      P2: '#3B82F6',
      P3: '#9CA3AF',
    }[priority] || '#9CA3AF'
  }))

  // 按客户分组 Top 5
  const customerCounts = mockRequirements.reduce((acc, req) => {
    acc[req.customerName] = (acc[req.customerName] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const topCustomers = Object.entries(customerCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, count]) => ({ label: name, value: count }))

  return (
    <Layout title="数据分析" subtitle="需求趋势与统计">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {[
            { key: 'week', label: '本周' },
            { key: 'month', label: '本月' },
            { key: 'quarter', label: '本季度' },
            { key: 'year', label: '全年' },
          ].map(item => (
            <button
              key={item.key}
              onClick={() => setTimeRange(item.key)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                timeRange === item.key 
                  ? 'bg-blue-500 text-white shadow-sm' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" icon={<RefreshCw className="w-4 h-4" />}>刷新</Button>
          <Button variant="secondary" icon={<Download className="w-4 h-4" />}>导出报告</Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-5 mb-6">
        <MetricCard 
          title="总需求数" 
          value={totalRequirements} 
          change="较上月 +23%" 
          changeType="up"
          icon={FileText}
          color="#3B82F6"
          delay={0.05}
        />
        <MetricCard 
          title="待评审" 
          value={pendingCount} 
          change="较上月 -12%" 
          changeType="down"
          icon={Clock}
          color="#F59E0B"
          delay={0.1}
        />
        <MetricCard 
          title="开发中" 
          value={developingCount} 
          change="较上月 +8%" 
          changeType="up"
          icon={Target}
          color="#8B5CF6"
          delay={0.15}
        />
        <MetricCard 
          title="已上线" 
          value={releasedCount} 
          change="较上月 +35%" 
          changeType="up"
          icon={TrendingUp}
          color="#10B981"
          delay={0.2}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card padding="lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold text-gray-900">模块分布</h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <MockBarChart data={moduleData} />
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card padding="lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold text-gray-900">状态分布</h3>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            <MockPieChart data={statusData} />
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Card padding="lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold text-gray-900">优先级分布</h3>
            </div>
            <div className="space-y-4">
              {priorityData.map(item => (
                <ProgressBar 
                  key={item.label} 
                  label={item.label} 
                  value={item.value} 
                  max={totalRequirements}
                  color={item.color}
                />
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-2"
        >
          <Card padding="lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold text-gray-900">客户需求排行</h3>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <motion.div 
                  key={customer.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + index * 0.05 }}
                  className="flex items-center gap-4"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                    index === 0 ? 'bg-yellow-100 text-yellow-700' :
                    index === 1 ? 'bg-gray-100 text-gray-600' :
                    index === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-50 text-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{customer.label}</span>
                      <span className="text-sm font-bold text-gray-900">{customer.value} 条</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <motion.div 
                        className="bg-blue-500 h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(customer.value / topCustomers[0].value) * 100}%` }}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.05 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </Layout>
  )
}
