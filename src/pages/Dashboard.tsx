import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  FileText, 
  Clock, 
  TrendingUp, 
  Users, 
  AlertCircle, 
  ArrowRight,
  Plus,
  BarChart3,
  Sparkles,
  CheckCircle,
  Calendar
} from 'lucide-react'
import { Layout } from '../components/Layout'
import { Card, Badge, Button } from '../components/UI'
import { 
  mockRequirements, 
  mockCustomers,
  statusLabels,
  priorityLabels 
} from '../data/mockData'
import type { Priority, RequirementStatus } from '../types'

// 动画配置
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

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

// 数据统计卡片
function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  trend,
  delay = 0
}: { 
  title: string
  value: number
  icon: React.ElementType
  color: string
  trend?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -4 }}
    >
      <Card hover className="relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {trend && (
              <p className="text-xs text-emerald-600 mt-2 font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {trend}
              </p>
            )}
          </div>
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
        </div>
        {/* Decorative gradient */}
        <div className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full opacity-10 ${color}`} />
      </Card>
    </motion.div>
  )
}

// 快速操作卡片
function QuickAction({ 
  icon: Icon, 
  title, 
  description, 
  onClick,
  color,
  delay = 0
}: { 
  icon: React.ElementType
  title: string
  description: string
  onClick: () => void
  color: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-xl p-5 border border-gray-100 shadow-card cursor-pointer 
                 hover:shadow-card-hover transition-all duration-300 group"
    >
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-500">{description}</p>
    </motion.div>
  )
}

// 需求条目
function RequirementItem({ 
  requirement,
  onClick,
  index = 0
}: { 
  requirement: typeof mockRequirements[0]
  onClick: () => void
  index?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ x: 4 }}
      onClick={onClick}
      className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group"
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <Badge variant={priorityColors[requirement.priority]} className="shrink-0 font-bold">
          {requirement.priority}
        </Badge>
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
            {requirement.title}
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">{requirement.customerName}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant={statusColors[requirement.status]} size="sm">
          {statusLabels[requirement.status]}
        </Badge>
        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
      </div>
    </motion.div>
  )
}

// 活动时间线
function ActivityItem({ 
  title, 
  time, 
  type,
  delay = 0
}: { 
  title: string
  time: string
  type: 'create' | 'update' | 'complete'
  delay?: number
}) {
  const icons = {
    create: Plus,
    update: Clock,
    complete: CheckCircle,
  }
  const colors = {
    create: 'bg-blue-500',
    update: 'bg-orange-500',
    complete: 'bg-emerald-500',
  }
  const Icon = icons[type]

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex items-start gap-3 pb-4 last:pb-0"
    >
      <div className={`w-8 h-8 rounded-full ${colors[type]} flex items-center justify-center shrink-0`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 min-w-0 pt-1">
        <p className="text-sm text-gray-700 font-medium">{title}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </motion.div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  
  // 统计数据
  const totalRequirements = mockRequirements.length
  const pendingReview = mockRequirements.filter(r => r.status === 'pending_review').length
  const developing = mockRequirements.filter(r => r.status === 'developing').length
  const totalCustomers = mockCustomers.length

  // 最近需求（按时间排序取前5）
  const recentRequirements = [...mockRequirements]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  // 待处理需求（P0/P1 且待评审）
  const urgentRequirements = mockRequirements
    .filter(r => r.status === 'pending_review' && (r.priority === 'P0' || r.priority === 'P1'))
    .slice(0, 3)

  return (
    <Layout title="工作台" subtitle="欢迎回来，张三">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        <StatCard 
          title="总需求数" 
          value={totalRequirements} 
          icon={FileText} 
          color="bg-blue-500"
          trend="较上周 +12%"
          delay={0.05}
        />
        <StatCard 
          title="待评审" 
          value={pendingReview} 
          icon={Clock} 
          color="bg-orange-500"
          delay={0.1}
        />
        <StatCard 
          title="开发中" 
          value={developing} 
          icon={TrendingUp} 
          color="bg-purple-500"
          delay={0.15}
        />
        <StatCard 
          title="客户数" 
          value={totalCustomers} 
          icon={Users} 
          color="bg-emerald-500"
          trend="较上周 +3"
          delay={0.2}
        />
      </div>

      {/* Quick Actions */}
      <motion.div 
        className="mb-8"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        <h2 className="text-lg font-bold text-gray-900 mb-4">快速操作</h2>
        <div className="grid grid-cols-4 gap-4">
          <QuickAction
            icon={Plus}
            title="录入需求"
            description="快速添加新需求"
            onClick={() => navigate('/create')}
            color="bg-blue-500"
            delay={0.25}
          />
          <QuickAction
            icon={Sparkles}
            title="AI 分析"
            description="智能分析需求池"
            onClick={() => navigate('/analytics')}
            color="bg-purple-500"
            delay={0.3}
          />
          <QuickAction
            icon={BarChart3}
            title="数据报告"
            description="查看需求统计"
            onClick={() => navigate('/analytics')}
            color="bg-emerald-500"
            delay={0.35}
          />
          <QuickAction
            icon={Users}
            title="客户管理"
            description="管理客户信息"
            onClick={() => navigate('/customers')}
            color="bg-orange-500"
            delay={0.4}
          />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Recent Requirements */}
        <motion.div 
          className="col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <Card padding="none">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">最新需求</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/requirements')}
              >
                查看全部
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="divide-y divide-gray-50">
              {recentRequirements.map((req, index) => (
                <RequirementItem
                  key={req.id}
                  requirement={req}
                  onClick={() => navigate(`/requirements/${req.id}`)}
                  index={index}
                />
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Urgent Items */}
          {urgentRequirements.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card padding="lg">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <h3 className="text-base font-bold text-gray-900">紧急待处理</h3>
                </div>
                <div className="space-y-3">
                  {urgentRequirements.map(req => (
                    <div
                      key={req.id}
                      onClick={() => navigate(`/requirements/${req.id}`)}
                      className="flex items-center gap-3 p-3 bg-red-50 rounded-xl cursor-pointer hover:bg-red-100 transition-colors"
                    >
                      <Badge variant="red" size="sm" className="font-bold">{req.priority}</Badge>
                      <p className="text-sm text-gray-900 font-medium truncate flex-1">{req.title}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <Card padding="lg">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-blue-500" />
                <h3 className="text-base font-bold text-gray-900">最近动态</h3>
              </div>
              <div className="space-y-1">
                <ActivityItem 
                  title="新增需求：支持环比增长率计算" 
                  time="10 分钟前" 
                  type="create"
                  delay={0.6}
                />
                <ActivityItem 
                  title="需求状态更新：移动端数据看板" 
                  time="1 小时前" 
                  type="update"
                  delay={0.65}
                />
                <ActivityItem 
                  title="需求已上线：查询历史记录功能" 
                  time="3 小时前" 
                  type="complete"
                  delay={0.7}
                />
                <ActivityItem 
                  title="新增需求：同比计算功能" 
                  time="昨天 15:30" 
                  type="create"
                  delay={0.75}
                />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}
