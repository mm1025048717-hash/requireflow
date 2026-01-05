import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Plus, 
  Building2, 
  Users, 
  TrendingUp,
  MoreHorizontal,
  Star,
  Filter
} from 'lucide-react'
import { Layout } from '../components/Layout'
import { Card, Badge, Button } from '../components/UI'
import { mockCustomers, mockRequirements } from '../data/mockData'
import type { Customer } from '../types'

const stageColors: Record<string, 'blue' | 'green' | 'orange' | 'gray'> = {
  potential: 'gray',
  trial: 'orange',
  paid: 'green',
  renewal: 'blue',
}

const stageLabels: Record<string, string> = {
  potential: '潜在客户',
  trial: '试用中',
  paid: '付费客户',
  renewal: '续约客户',
}

const sizeLabels: Record<string, string> = {
  large: '大型企业',
  medium: '中型企业',
  small: '小型企业',
}

// 统计卡片
function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  color 
}: { 
  icon: React.ElementType
  label: string
  value: string | number
  color: string
}) {
  return (
    <Card padding="lg" hover>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </Card>
  )
}

// 客户卡片
function CustomerCard({ customer }: { customer: Customer }) {
  const requirementCount = mockRequirements.filter(r => r.customerId === customer.id).length
  const pendingCount = mockRequirements.filter(
    r => r.customerId === customer.id && r.status === 'pending_review'
  ).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl p-6 border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            {customer.name[0]}
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {customer.name}
            </h3>
            <p className="text-sm text-gray-500">{customer.industry}</p>
          </div>
        </div>
        <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 opacity-0 group-hover:opacity-100 transition-all">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 mb-4">
        <Badge variant={stageColors[customer.stage]} size="sm">
          {stageLabels[customer.stage]}
        </Badge>
        <Badge variant="gray" size="sm">
          {sizeLabels[customer.size]}
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4 py-4 border-y border-gray-50">
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">{requirementCount}</div>
          <div className="text-xs text-gray-500 font-medium">需求数</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-orange-500">{pendingCount}</div>
          <div className="text-xs text-gray-500 font-medium">待处理</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">{customer.contacts.length}</div>
          <div className="text-xs text-gray-500 font-medium">联系人</div>
        </div>
      </div>

      {/* Contacts */}
      <div className="space-y-2 mb-4">
        {customer.contacts.slice(0, 2).map(contact => (
          <div key={contact.id} className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-semibold">
              {contact.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm text-gray-700 font-medium">{contact.name}</span>
              <span className="text-xs text-gray-400 ml-2">{contact.title}</span>
            </div>
          </div>
        ))}
        {customer.contacts.length > 2 && (
          <p className="text-xs text-gray-400 text-center pt-1">
            +{customer.contacts.length - 2} 位联系人
          </p>
        )}
      </div>

      {/* Contract Value */}
      {customer.contractValue && (
        <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
          <span className="text-sm text-gray-500">合同金额</span>
          <span className="text-base font-bold text-gray-900">
            ¥{(customer.contractValue / 10000).toFixed(0)}万
          </span>
        </div>
      )}
    </motion.div>
  )
}

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCustomers = mockCustomers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Stats
  const totalCustomers = mockCustomers.length
  const paidCustomers = mockCustomers.filter(c => c.stage === 'paid' || c.stage === 'renewal').length
  const totalValue = mockCustomers.reduce((sum, c) => sum + (c.contractValue || 0), 0)
  const totalContacts = mockCustomers.reduce((sum, c) => sum + c.contacts.length, 0)

  return (
    <Layout title="客户管理" subtitle={`共 ${totalCustomers} 个客户`}>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-5 mb-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <StatCard icon={Building2} label="总客户数" value={totalCustomers} color="bg-blue-500" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <StatCard icon={Star} label="付费客户" value={paidCustomers} color="bg-emerald-500" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <StatCard icon={TrendingUp} label="总合同金额" value={`¥${(totalValue / 10000).toFixed(0)}万`} color="bg-purple-500" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <StatCard icon={Users} label="总联系人" value={totalContacts} color="bg-orange-500" />
        </motion.div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-card p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索客户名称、行业..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-lg text-sm placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" icon={<Filter className="w-4 h-4" />}>
              筛选
            </Button>
            <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
              添加客户
            </Button>
          </div>
        </div>
      </div>

      {/* Customer List */}
      {filteredCustomers.length === 0 ? (
        <Card className="p-16 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">没有找到相关客户</h3>
          <p className="text-sm text-gray-500">尝试调整搜索关键词</p>
        </Card>
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {filteredCustomers.map((customer, index) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <CustomerCard customer={customer} />
            </motion.div>
          ))}
        </div>
      )}
    </Layout>
  )
}
