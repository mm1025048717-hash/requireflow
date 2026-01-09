import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  User, 
  Building2, 
  Tag, 
  Link2, 
  MessageSquare,
  Send,
  AlertCircle,
  FileText,
  Star,
  TrendingUp,
  Target,
  BarChart3,
  FileDown,
  Bot
} from 'lucide-react'
import { useState } from 'react'
import { Layout } from '../components/Layout'
import { Card, Badge, Button } from '../components/UI'
import { 
  mockRequirements, 
  statusLabels, 
  priorityLabels, 
  moduleLabels,
  sourceTypeLabels
} from '../data/mockData'
import type { Priority, RequirementStatus } from '../types'
import { format } from 'date-fns'

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

// 星级评分组件
function StarRating({ score }: { score: number }) {
  const fullStars = Math.floor(score / 20)
  const hasHalfStar = (score % 20) >= 10
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && (
        <Star className="w-5 h-5 fill-yellow-400/50 text-yellow-400" />
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} className="w-5 h-5 fill-gray-200 text-gray-200" />
      ))}
    </div>
  )
}

// AI消息组件
function AIMessage({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 mb-4"
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
        <Bot className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 bg-blue-50 rounded-xl p-4 border border-blue-100">
        <p className="text-sm text-gray-700 leading-relaxed">{message}</p>
      </div>
    </motion.div>
  )
}

// 用户消息组件
function UserMessage({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 mb-4 justify-end"
    >
      <div className="flex-1 bg-gray-100 rounded-xl p-4 max-w-[80%]">
        <p className="text-sm text-gray-700 leading-relaxed text-right">{message}</p>
      </div>
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center shrink-0">
        <User className="w-5 h-5 text-white" />
      </div>
    </motion.div>
  )
}

export default function RequirementDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState<Array<{ type: 'user' | 'ai'; message: string }>>([
    {
      type: 'ai',
      message: '已关联目标。正在分析历史数据...'
    },
    {
      type: 'ai',
      message: '分析完成：类似性能优化平均提升留存2%。'
    }
  ])

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

  const aiAssessment = requirement.aiAssessment
  const overallScore = aiAssessment?.overallScore || 0

  const handleSendMessage = () => {
    if (!message.trim()) return
    setChatHistory([...chatHistory, { type: 'user', message }])
    setMessage('')
    // 模拟AI回复
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        type: 'ai',
        message: '已收到您的提问，正在分析中...'
      }])
    }, 1000)
  }

  return (
    <Layout title="评估需求" subtitle={`${requirement.id.toUpperCase()} ${requirement.title}`}>
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
          <Button variant="ghost" size="sm" icon={<FileDown className="w-4 h-4" />}>
            生成报告
          </Button>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column: Conversation & Context */}
        <div className="col-span-2 space-y-6">
          {/* Requirement Description */}
          <Card padding="lg">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold text-gray-900">需求描述</h3>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-700 leading-relaxed mb-2">
                用户反馈："{requirement.source.originalContent || requirement.description}"
              </p>
              {requirement.source.originalContent && (
                <p className="text-sm text-gray-600 leading-relaxed">
                  业务目标：提升新用户次日留存率
                </p>
              )}
            </div>
          </Card>

          {/* AI Chat Window */}
          <Card padding="lg" className="flex flex-col h-[600px]">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
              <Bot className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold text-gray-900">AI对话窗口</h3>
            </div>
            <div className="flex-1 overflow-y-auto mb-4 pr-2 space-y-2">
              {chatHistory.map((item, index) => (
                item.type === 'ai' ? (
                  <AIMessage key={index} message={item.message} />
                ) : (
                  <UserMessage key={index} message={item.message} />
                )
              ))}
            </div>
            <div className="flex gap-2 pt-4 border-t border-gray-100">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="输入您的问题..."
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg
                         text-sm placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:bg-white
                         transition-all"
              />
              <Button 
                variant="primary" 
                icon={<Send className="w-4 h-4" />}
                onClick={handleSendMessage}
                disabled={!message.trim()}
              >
                发送
              </Button>
            </div>
          </Card>

          {/* AI Analysis Basis */}
          {aiAssessment?.analysisBasis && (
            <Card padding="lg">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-gray-900">AI分析依据摘要</h3>
              </div>
              <div className="space-y-3">
                {aiAssessment.analysisBasis.relatedGoals && aiAssessment.analysisBasis.relatedGoals.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2">关联目标：</p>
                    <div className="flex flex-wrap gap-2">
                      {aiAssessment.analysisBasis.relatedGoals.map((goal, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs rounded-lg font-medium">
                          "{goal}"
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {aiAssessment.analysisBasis.historicalReferences && aiAssessment.analysisBasis.historicalReferences.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2">历史参考：</p>
                    <ul className="space-y-1">
                      {aiAssessment.analysisBasis.historicalReferences.map((ref, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-blue-500">•</span>
                          <span>{ref}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {aiAssessment.analysisBasis.externalData && aiAssessment.analysisBasis.externalData.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2">外部信息：</p>
                    <ul className="space-y-1">
                      {aiAssessment.analysisBasis.externalData.map((data, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-blue-500">•</span>
                          <span>{data}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>

        {/* Right Column: Assessment Panel */}
        <div className="space-y-6">
          {/* Overall Score */}
          <Card padding="lg">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-500 mb-2">综合得分</p>
              <div className="text-4xl font-bold text-gray-900 mb-2">{overallScore}</div>
              {overallScore > 0 && <StarRating score={overallScore} />}
            </div>
          </Card>

          {/* Score Dimensions */}
          {aiAssessment && (
            <Card padding="lg">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-gray-900">评分维度</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: '用户价值', value: aiAssessment.scoreDimensions.userValue },
                  { label: '商业价值', value: aiAssessment.scoreDimensions.businessValue },
                  { label: '实现成本', value: aiAssessment.scoreDimensions.implementationCost },
                  { label: '战略契合', value: aiAssessment.scoreDimensions.strategicAlignment },
                  { label: '紧急程度', value: aiAssessment.scoreDimensions.urgency }
                ].map((dimension) => (
                  <div key={dimension.label}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">{dimension.label}</span>
                      <span className="text-sm font-bold text-gray-900">{dimension.value}/10</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <motion.div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${dimension.value * 10}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Output & Recommendations */}
          {aiAssessment && (
            <Card padding="lg">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-gray-900">产出与建议</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-2">优先级：</p>
                  <Badge variant={priorityColors[aiAssessment.priority]} className="text-sm font-bold">
                    {aiAssessment.priority} ({priorityLabels[aiAssessment.priority]})
                  </Badge>
                </div>
                {aiAssessment.suggestedSchedule && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2">建议排期：</p>
                    <p className="text-sm text-gray-900 font-medium">{aiAssessment.suggestedSchedule}</p>
                  </div>
                )}
                {aiAssessment.expectedImpact && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2">预计影响：</p>
                    <p className="text-sm text-gray-900 font-medium">{aiAssessment.expectedImpact}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-2">信心指数：</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <motion.div 
                        className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${aiAssessment.confidenceLevel}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-900">{aiAssessment.confidenceLevel}%</span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Basic Info */}
          <Card padding="lg">
            <h3 className="text-sm font-bold text-gray-900 mb-4">基本信息</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  客户
                </span>
                <span className="text-sm font-semibold text-gray-900">{requirement.customerName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-400" />
                  模块
                </span>
                <span className="text-sm font-semibold text-gray-900">{moduleLabels[requirement.module]}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  录入人
                </span>
                <span className="text-sm font-semibold text-gray-900">{requirement.source.collectorName}</span>
              </div>
              {aiAssessment?.assessedAt && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-gray-400" />
                    评估时间
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {format(new Date(aiAssessment.assessedAt), 'yyyy-MM-dd HH:mm')}
                  </span>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
