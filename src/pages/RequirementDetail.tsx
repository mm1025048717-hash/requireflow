import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  User, 
  Building2, 
  Tag, 
  Link2, 
  MessageSquare,
  Edit3,
  Trash2,
  Share2,
  MoreHorizontal,
  Calendar,
  TrendingUp,
  FileText,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from 'lucide-react'
import { useState } from 'react'
import { Layout } from '../components/Layout'
import { Card, Badge, Button } from '../components/UI'
import { 
  mockRequirements, 
  statusLabels, 
  priorityLabels, 
  moduleLabels,
  sourceTypeLabels,
  requirementTypeLabels
} from '../data/mockData'
import type { Priority, RequirementStatus } from '../types'

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

export default function RequirementDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [comment, setComment] = useState('')

  const requirement = mockRequirements.find(r => r.id === id)

  if (!requirement) {
    return (
      <Layout title="需求详情">
        <div className="bg-white rounded-xl border border-gray-100 shadow-card p-16 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">需求不存在</h3>
          <p className="text-sm text-gray-500 mb-4">该需求可能已被删除或移动</p>
          <Button variant="primary" onClick={() => navigate('/requirements')}>
            返回需求列表
          </Button>
        </div>
      </Layout>
    )
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatShortDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  }

  return (
    <Layout title="需求详情" subtitle={requirement.title}>
      {/* Back Button */}
      <motion.button
        onClick={() => navigate('/requirements')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 group"
        whileHover={{ x: -4 }}
      >
        <ArrowLeft className="w-4 h-4 group-hover:text-blue-600" />
        <span className="text-sm font-medium">返回列表</span>
      </motion.button>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          <Card padding="lg">
            {/* Header */}
            <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Badge variant={priorityColors[requirement.priority]} className="text-sm font-bold">
                  {priorityLabels[requirement.priority]}
                </Badge>
                <Badge variant={statusColors[requirement.status]} dot className="text-sm">
                  {statusLabels[requirement.status]}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" icon={<Share2 className="w-4 h-4" />}>分享</Button>
                <Button variant="ghost" size="sm" icon={<Edit3 className="w-4 h-4" />}>编辑</Button>
                <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
              {requirement.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {requirement.tags.map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg font-medium hover:bg-gray-200 transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>

            {/* Description Section */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                需求描述
              </h3>
              <div className="bg-gray-50 rounded-xl p-5">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {requirement.description}
                </p>
              </div>
            </div>

            {/* Original Record */}
            {requirement.source.originalContent && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  原始记录
                </h3>
                <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                  <p className="text-gray-700 italic leading-relaxed">
                    "{requirement.source.originalContent}"
                  </p>
                  <p className="text-sm text-blue-600 mt-3 font-medium">
                    —— {requirement.source.collectorName}，{formatDate(requirement.source.collectTime)}
                  </p>
                </div>
              </div>
            )}

            {/* Comments Section */}
            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                评论讨论 ({requirement.comments.length})
              </h3>

              {/* Comments List */}
              <div className="space-y-4 mb-6">
                {requirement.comments.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">暂无评论，来发表第一条吧</p>
                  </div>
                ) : (
                  requirement.comments.map((c, idx) => (
                    <motion.div 
                      key={c.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-3 p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                        {c.userName[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-semibold text-gray-900">{c.userName}</span>
                          <span className="text-xs text-gray-400">{formatDate(c.createdAt)}</span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{c.content}</p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Comment Input */}
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                  张
                </div>
                <div className="flex-1 flex gap-3">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="添加评论..."
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                             text-sm placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:bg-white
                             transition-all"
                  />
                  <Button 
                    variant="primary" 
                    icon={<Send className="w-4 h-4" />}
                    disabled={!comment.trim()}
                  >
                    发送
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Basic Info */}
          <Card padding="lg">
            <h3 className="text-sm font-bold text-gray-900 mb-4">基本信息</h3>
            <div className="space-y-4">
              {[
                { icon: Building2, label: '客户', value: requirement.customerName },
                { icon: Tag, label: '模块', value: moduleLabels[requirement.module] },
                { icon: TrendingUp, label: '类型', value: requirementTypeLabels[requirement.type] },
                { icon: User, label: '录入人', value: requirement.source.collectorName },
                { icon: Calendar, label: '创建时间', value: formatShortDate(requirement.createdAt) },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <item.icon className="w-4 h-4 text-gray-400" />
                    {item.label}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Source */}
          <Card padding="lg">
            <h3 className="text-sm font-bold text-gray-900 mb-4">来源追溯</h3>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Link2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {sourceTypeLabels[requirement.source.type]}
                </p>
                <p className="text-xs text-gray-500">
                  {formatShortDate(requirement.source.collectTime)}
                </p>
              </div>
            </div>
          </Card>

          {/* Priority Assessment */}
          <Card padding="lg">
            <h3 className="text-sm font-bold text-gray-900 mb-4">优先级评估</h3>
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">商业价值</span>
                  <span className="text-sm font-bold text-gray-900">{requirement.businessValue}/10</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${requirement.businessValue * 10}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">出现频次</span>
                  <span className="text-sm font-bold text-gray-900">{requirement.frequency} 次</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <motion.div 
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(requirement.frequency * 2, 100)}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Related Requirements */}
          {requirement.linkedRequirements.length > 0 && (
            <Card padding="lg">
              <h3 className="text-sm font-bold text-gray-900 mb-4">关联需求</h3>
              <div className="space-y-2">
                {requirement.linkedRequirements.map(linkedId => {
                  const linked = mockRequirements.find(r => r.id === linkedId)
                  if (!linked) return null
                  return (
                    <motion.div
                      key={linkedId}
                      onClick={() => navigate(`/requirements/${linkedId}`)}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors group"
                      whileHover={{ x: 4 }}
                    >
                      <Badge variant={priorityColors[linked.priority]} size="sm" className="shrink-0">
                        {linked.priority}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                          {linked.title}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 shrink-0" />
                    </motion.div>
                  )
                })}
              </div>
            </Card>
          )}

          {/* Actions */}
          <Card padding="lg">
            <div className="space-y-3">
              <Button variant="primary" fullWidth>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                更新状态
              </Button>
              <Button variant="secondary" fullWidth>
                修改优先级
              </Button>
              <Button variant="ghost" fullWidth className="text-red-500 hover:bg-red-50 hover:text-red-600">
                <Trash2 className="w-4 h-4 mr-2" />
                删除需求
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
