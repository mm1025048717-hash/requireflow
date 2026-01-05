// 用户角色
export type UserRole = 'admin' | 'product_manager' | 'sales' | 'implementation' | 'developer' | 'viewer'

// 用户信息
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  department: string
  createdAt: string
}

// 需求来源类型
export type RequirementSourceType = 
  | 'meeting_presale'      // 售前演示会
  | 'meeting_requirement'  // 需求对接会
  | 'meeting_review'       // 问题排查会
  | 'chat_wechat'          // 微信沟通
  | 'chat_dingtalk'        // 钉钉沟通
  | 'chat_feishu'          // 飞书沟通
  | 'email'                // 邮件
  | 'ticket'               // 工单
  | 'visit_business'       // 商务拜访
  | 'visit_dinner'         // 饭局酒局
  | 'implementation'       // 现场实施
  | 'backend_qa'           // 后台问答日志
  | 'backend_behavior'     // 后台行为数据
  | 'backend_feedback'     // 用户反馈

// 需求来源分类
export type SourceCategory = 'online' | 'offline' | 'backend'

// 需求类型
export type RequirementType = 
  | 'new_feature'      // 新功能
  | 'enhancement'      // 功能增强
  | 'experience'       // 体验优化
  | 'performance'      // 性能优化
  | 'bug'              // Bug修复
  | 'integration'      // 集成需求
  | 'security'         // 安全合规
  | 'documentation'    // 文档培训

// 产品模块
export type ProductModule = 
  | 'qa_engine'        // 问答引擎
  | 'semantic'         // 语义理解
  | 'dashboard'        // 数据看板
  | 'metric'           // 指标管理
  | 'permission'       // 权限管理
  | 'system'           // 系统配置
  | 'report'           // 报表导出
  | 'mobile'           // 移动端
  | 'integration'      // 数据集成
  | 'other'            // 其他

// 优先级
export type Priority = 'P0' | 'P1' | 'P2' | 'P3'

// 需求状态
export type RequirementStatus = 
  | 'pending_review'   // 待评审
  | 'planned'          // 已规划
  | 'developing'       // 开发中
  | 'testing'          // 测试中
  | 'released'         // 已上线
  | 'rejected'         // 已拒绝
  | 'merged'           // 已合并

// 客户阶段
export type CustomerStage = 'potential' | 'trial' | 'paid' | 'renewal'

// 客户规模
export type CustomerSize = 'large' | 'medium' | 'small'

// 客户信息
export interface Customer {
  id: string
  name: string
  industry: string
  size: CustomerSize
  stage: CustomerStage
  contractValue?: number
  contacts: CustomerContact[]
  createdAt: string
}

// 客户联系人
export interface CustomerContact {
  id: string
  name: string
  title: string
  department: string
  phone?: string
  email?: string
  influence: 'decision_maker' | 'influencer' | 'user' | 'evaluator'
}

// 需求来源详情
export interface RequirementSource {
  type: RequirementSourceType
  category: SourceCategory
  originalContent?: string  // 原始内容
  meetingRecording?: string // 会议录音链接
  attachments?: string[]    // 附件
  collectorId: string       // 录入人
  collectorName: string
  collectTime: string
}

// 需求评论
export interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  createdAt: string
}

// 需求卡片
export interface Requirement {
  id: string
  title: string
  description: string
  
  // 来源
  source: RequirementSource
  
  // 客户信息
  customerId: string
  customerName: string
  customerIndustry: string
  
  // 分类
  type: RequirementType
  module: ProductModule
  tags: string[]
  
  // 优先级
  priority: Priority
  customerUrgency: 'urgent' | 'important' | 'normal' | 'low'
  businessValue: number // 1-10
  frequency: number // 出现频次
  
  // 状态
  status: RequirementStatus
  linkedRequirements: string[] // 关联的需求ID
  
  // 评论
  comments: Comment[]
  
  // 时间
  createdAt: string
  updatedAt: string
  plannedVersion?: string
  releasedAt?: string
}

// 统计数据
export interface DashboardStats {
  totalRequirements: number
  pendingReview: number
  inProgress: number
  completedThisMonth: number
  topCustomers: { name: string; count: number }[]
  byModule: { module: string; count: number }[]
  byPriority: { priority: string; count: number }[]
  trend: { date: string; count: number }[]
}

// 筛选条件
export interface RequirementFilter {
  search?: string
  status?: RequirementStatus[]
  priority?: Priority[]
  type?: RequirementType[]
  module?: ProductModule[]
  sourceCategory?: SourceCategory[]
  customerId?: string
  dateRange?: [string, string]
}

// 排序
export interface RequirementSort {
  field: 'createdAt' | 'updatedAt' | 'priority' | 'businessValue'
  order: 'asc' | 'desc'
}


