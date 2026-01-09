import { Requirement, Customer, User, DashboardStats } from '../types'

// 模拟用户数据
export const mockUsers: User[] = [
  {
    id: '1',
    name: '张三',
    email: 'zhangsan@company.com',
    avatar: '',
    role: 'product_manager',
    department: '产品部',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: '李四',
    email: 'lisi@company.com',
    role: 'sales',
    department: '销售部',
    createdAt: '2024-01-01'
  },
  {
    id: '3',
    name: '王五',
    email: 'wangwu@company.com',
    role: 'implementation',
    department: '实施部',
    createdAt: '2024-01-01'
  }
]

// 模拟客户数据
export const mockCustomers: Customer[] = [
  {
    id: 'c1',
    name: '蜜雪冰城',
    industry: '餐饮零售',
    size: 'large',
    stage: 'paid',
    contractValue: 500000,
    contacts: [
      { id: 'ct1', name: '王总', title: '数据总监', department: '数据部', influence: 'decision_maker' },
      { id: 'ct2', name: '张经理', title: '数据分析师', department: '数据部', influence: 'user' }
    ],
    createdAt: '2024-06-01'
  },
  {
    id: 'c2',
    name: '雅戈尔',
    industry: '服装零售',
    size: 'large',
    stage: 'paid',
    contractValue: 300000,
    contacts: [
      { id: 'ct3', name: '刘总', title: 'CIO', department: 'IT部', influence: 'decision_maker' }
    ],
    createdAt: '2024-03-15'
  },
  {
    id: 'c3',
    name: '味全',
    industry: '食品饮料',
    size: 'medium',
    stage: 'trial',
    contractValue: 150000,
    contacts: [
      { id: 'ct4', name: '陈经理', title: 'IT经理', department: 'IT部', influence: 'evaluator' }
    ],
    createdAt: '2024-09-01'
  },
  {
    id: 'c4',
    name: '良品铺子',
    industry: '零食零售',
    size: 'large',
    stage: 'renewal',
    contractValue: 450000,
    contacts: [
      { id: 'ct5', name: '周总', title: '数字化总监', department: '数字化部', influence: 'decision_maker' }
    ],
    createdAt: '2024-01-01'
  },
  {
    id: 'c5',
    name: '名创优品',
    industry: '日用零售',
    size: 'large',
    stage: 'potential',
    contacts: [
      { id: 'ct6', name: '吴经理', title: '数据负责人', department: '数据中心', influence: 'influencer' }
    ],
    createdAt: '2024-11-01'
  }
]

// 模拟需求数据
export const mockRequirements: Requirement[] = [
  {
    id: 'r1',
    title: '支持环比增长率计算',
    description: '客户希望在问答时能够直接计算环比增长率，例如「本月营业额环比上月增长多少」，目前系统无法理解「环比」的语义。',
    source: {
      type: 'meeting_requirement',
      category: 'online',
      originalContent: '王总在需求对接会上提出，他们的运营人员每天都需要看环比数据，目前需要手动计算，希望能直接问出来。',
      collectorId: '2',
      collectorName: '李四',
      collectTime: '2024-12-28T14:30:00'
    },
    customerId: 'c1',
    customerName: '蜜雪冰城',
    customerIndustry: '餐饮零售',
    type: 'new_feature',
    module: 'qa_engine',
    tags: ['时间计算', '指标增强', '高频需求'],
    priority: 'P1',
    customerUrgency: 'important',
    businessValue: 9,
    frequency: 15,
    status: 'planned',
    linkedRequirements: ['r5'],
    comments: [
      {
        id: 'cm1',
        userId: '1',
        userName: '张三',
        content: '这个需求很有价值，可以和同比计算一起做，预计2周可完成。',
        createdAt: '2024-12-29T10:00:00'
      }
    ],
    createdAt: '2024-12-28T14:30:00',
    updatedAt: '2024-12-29T10:00:00',
    plannedVersion: 'v2.5.0',
    aiAssessment: {
      overallScore: 75,
      scoreDimensions: {
        userValue: 8,
        businessValue: 9,
        implementationCost: 7,
        strategicAlignment: 8,
        urgency: 7
      },
      priority: 'P1',
      suggestedSchedule: '下一迭代',
      expectedImpact: '提升用户查询效率，减少手动计算工作量',
      confidenceLevel: 80,
      analysisBasis: {
        relatedGoals: ['提升用户体验', '增强核心功能'],
        historicalReferences: ['类似时间计算功能平均提升效率30%'],
        dataPoints: ['出现频次15次', '涉及3个不同客户']
      },
      assessedAt: '2024-12-29T09:00:00'
    }
  },
  {
    id: 'r2',
    title: '移动端数据看板',
    description: '管理层希望在手机上也能查看数据看板，随时随地了解业务情况。支持微信小程序或H5形式。',
    source: {
      type: 'visit_dinner',
      category: 'offline',
      originalContent: '昨晚和蜜雪王总吃饭，他提到老板们经常出差，想在手机上看数据，目前只能用电脑很不方便。他还说这是他们明年数字化的重点方向。',
      collectorId: '2',
      collectorName: '李四',
      collectTime: '2024-12-25T21:30:00'
    },
    customerId: 'c1',
    customerName: '蜜雪冰城',
    customerIndustry: '餐饮零售',
    type: 'new_feature',
    module: 'mobile',
    tags: ['移动端', '看板', '管理层'],
    priority: 'P1',
    customerUrgency: 'important',
    businessValue: 8,
    frequency: 8,
    status: 'pending_review',
    linkedRequirements: [],
    comments: [],
    createdAt: '2024-12-25T21:30:00',
    updatedAt: '2024-12-25T21:30:00',
    aiAssessment: {
      overallScore: 70,
      scoreDimensions: {
        userValue: 8,
        businessValue: 8,
        implementationCost: 5,
        strategicAlignment: 9,
        urgency: 6
      },
      priority: 'P1',
      suggestedSchedule: 'Q1规划',
      expectedImpact: '提升管理层使用频率，增强产品竞争力',
      confidenceLevel: 75,
      analysisBasis: {
        relatedGoals: ['移动化战略', '提升用户体验'],
        historicalReferences: ['移动端功能平均提升用户活跃度25%'],
        externalData: ['竞品均提供移动端支持']
      },
      assessedAt: '2024-12-26T10:00:00'
    }
  },
  {
    id: 'r3',
    title: '查询结果导出Excel时保留格式',
    description: '用户导出Excel时，数字被当作文本处理，金额没有千分位，日期格式不统一。希望导出时能保留正确的格式。',
    source: {
      type: 'implementation',
      category: 'offline',
      originalContent: '实施过程中，雅戈尔的财务人员反馈导出的Excel需要二次处理才能用，增加了很多工作量。',
      collectorId: '3',
      collectorName: '王五',
      collectTime: '2024-12-27T16:00:00'
    },
    customerId: 'c2',
    customerName: '雅戈尔',
    customerIndustry: '服装零售',
    type: 'experience',
    module: 'report',
    tags: ['导出', '体验优化', '财务场景'],
    priority: 'P2',
    customerUrgency: 'normal',
    businessValue: 6,
    frequency: 12,
    status: 'developing',
    linkedRequirements: [],
    comments: [
      {
        id: 'cm2',
        userId: '1',
        userName: '张三',
        content: '已排入本周迭代，预计周五发布。',
        createdAt: '2024-12-28T09:00:00'
      }
    ],
    createdAt: '2024-12-27T16:00:00',
    updatedAt: '2024-12-28T09:00:00',
    plannedVersion: 'v2.4.2',
    aiAssessment: {
      overallScore: 65,
      scoreDimensions: {
        userValue: 7,
        businessValue: 6,
        implementationCost: 8,
        strategicAlignment: 6,
        urgency: 5
      },
      priority: 'P2',
      suggestedSchedule: '本周迭代',
      expectedImpact: '减少用户二次处理时间，提升满意度',
      confidenceLevel: 82,
      analysisBasis: {
        relatedGoals: ['体验优化'],
        historicalReferences: ['类似导出优化平均减少用户操作时间50%']
      },
      assessedAt: '2024-12-28T08:00:00'
    }
  },
  {
    id: 'r4',
    title: '问答理解「上周」「本周」等相对时间',
    description: '用户询问「上周销售额」时，系统无法正确理解，需要用户手动输入具体日期范围。',
    source: {
      type: 'backend_qa',
      category: 'backend',
      originalContent: '后台日志显示，过去一周有47次「上周」「本周」「昨天」相关的查询失败，涉及8个不同客户。',
      collectorId: '1',
      collectorName: '张三',
      collectTime: '2024-12-29T08:00:00'
    },
    customerId: 'c1',
    customerName: '蜜雪冰城',
    customerIndustry: '餐饮零售',
    type: 'enhancement',
    module: 'semantic',
    tags: ['时间理解', '语义增强', '高频失败'],
    priority: 'P0',
    customerUrgency: 'urgent',
    businessValue: 9,
    frequency: 47,
    status: 'developing',
    linkedRequirements: ['r1'],
    comments: [
      {
        id: 'cm3',
        userId: '1',
        userName: '张三',
        content: '这是核心能力缺失，需要紧急修复。已经和研发同步，预计明天完成。',
        createdAt: '2024-12-29T08:30:00'
      }
    ],
    createdAt: '2024-12-29T08:00:00',
    updatedAt: '2024-12-29T08:30:00',
    plannedVersion: 'v2.4.1',
    aiAssessment: {
      overallScore: 85,
      scoreDimensions: {
        userValue: 9,
        businessValue: 9,
        implementationCost: 7,
        strategicAlignment: 10,
        urgency: 9
      },
      priority: 'P0',
      suggestedSchedule: '紧急修复',
      expectedImpact: '核心功能缺失，修复后可提升查询成功率15%',
      confidenceLevel: 90,
      analysisBasis: {
        relatedGoals: ['提升留存', '修复核心缺陷'],
        historicalReferences: ['类似时间理解修复平均提升留存2%'],
        externalData: ['竞品A启动速度领先我们15%'],
        dataPoints: ['过去一周47次查询失败', '涉及8个不同客户']
      },
      assessedAt: '2024-12-29T08:15:00'
    }
  },
  {
    id: 'r5',
    title: '同比计算功能',
    description: '支持同比计算，例如「今年Q3销售额同比去年Q3增长多少」。',
    source: {
      type: 'meeting_presale',
      category: 'online',
      originalContent: '味全售前演示时，客户特别关注同比分析能力，这是他们评估BI工具的核心指标之一。',
      collectorId: '2',
      collectorName: '李四',
      collectTime: '2024-12-20T10:00:00'
    },
    customerId: 'c3',
    customerName: '味全',
    customerIndustry: '食品饮料',
    type: 'new_feature',
    module: 'qa_engine',
    tags: ['时间计算', '指标增强', '售前关键'],
    priority: 'P1',
    customerUrgency: 'important',
    businessValue: 8,
    frequency: 6,
    status: 'planned',
    linkedRequirements: ['r1'],
    comments: [],
    createdAt: '2024-12-20T10:00:00',
    updatedAt: '2024-12-20T10:00:00',
    plannedVersion: 'v2.5.0'
  },
  {
    id: 'r6',
    title: '数据权限按门店维度控制',
    description: '良品铺子有3000+门店，不同区域经理只能看自己负责区域的数据，需要按门店维度做权限控制。',
    source: {
      type: 'meeting_requirement',
      category: 'online',
      originalContent: '良品铺子续约沟通会上，周总明确表示权限控制是续约的必要条件，否则无法在全公司推广。',
      collectorId: '2',
      collectorName: '李四',
      collectTime: '2024-12-22T15:00:00'
    },
    customerId: 'c4',
    customerName: '良品铺子',
    customerIndustry: '零食零售',
    type: 'new_feature',
    module: 'permission',
    tags: ['权限控制', '多门店', '续约关键'],
    priority: 'P0',
    customerUrgency: 'urgent',
    businessValue: 10,
    frequency: 3,
    status: 'developing',
    linkedRequirements: [],
    comments: [
      {
        id: 'cm4',
        userId: '1',
        userName: '张三',
        content: '这个需求涉及架构改动，预计需要3周，已和技术负责人对齐。',
        createdAt: '2024-12-23T09:00:00'
      }
    ],
    createdAt: '2024-12-22T15:00:00',
    updatedAt: '2024-12-23T09:00:00',
    plannedVersion: 'v2.5.0',
    aiAssessment: {
      overallScore: 88,
      scoreDimensions: {
        userValue: 10,
        businessValue: 10,
        implementationCost: 4,
        strategicAlignment: 10,
        urgency: 10
      },
      priority: 'P0',
      suggestedSchedule: '紧急处理',
      expectedImpact: '续约关键条件，直接影响续约率',
      confidenceLevel: 95,
      analysisBasis: {
        relatedGoals: ['客户续约', '产品推广'],
        historicalReferences: ['类似权限需求是续约必要条件的案例'],
        dataPoints: ['续约客户明确表达', '涉及3000+门店']
      },
      assessedAt: '2024-12-23T08:00:00'
    }
  },
  {
    id: 'r7',
    title: '支持语音输入提问',
    description: '部分用户不习惯打字，希望能通过语音方式提问。',
    source: {
      type: 'backend_feedback',
      category: 'backend',
      originalContent: '用户反馈中心收到3条关于语音输入的建议。',
      collectorId: '1',
      collectorName: '张三',
      collectTime: '2024-12-26T14:00:00'
    },
    customerId: 'c2',
    customerName: '雅戈尔',
    customerIndustry: '服装零售',
    type: 'new_feature',
    module: 'qa_engine',
    tags: ['语音输入', '交互方式'],
    priority: 'P3',
    customerUrgency: 'low',
    businessValue: 4,
    frequency: 3,
    status: 'pending_review',
    linkedRequirements: [],
    comments: [],
    createdAt: '2024-12-26T14:00:00',
    updatedAt: '2024-12-26T14:00:00'
  },
  {
    id: 'r8',
    title: '查询历史记录保存与搜索',
    description: '用户希望能看到自己的历史查询记录，并能搜索之前问过的问题。',
    source: {
      type: 'chat_wechat',
      category: 'online',
      originalContent: '蜜雪张经理微信说：我经常要问同样的问题，每次都要重新打一遍，能不能保存历史记录？',
      collectorId: '2',
      collectorName: '李四',
      collectTime: '2024-12-24T11:30:00'
    },
    customerId: 'c1',
    customerName: '蜜雪冰城',
    customerIndustry: '餐饮零售',
    type: 'enhancement',
    module: 'qa_engine',
    tags: ['历史记录', '用户体验'],
    priority: 'P2',
    customerUrgency: 'normal',
    businessValue: 7,
    frequency: 9,
    status: 'released',
    linkedRequirements: [],
    comments: [
      {
        id: 'cm5',
        userId: '1',
        userName: '张三',
        content: '已在v2.4.0版本上线，请销售同步客户。',
        createdAt: '2024-12-28T16:00:00'
      }
    ],
    createdAt: '2024-12-24T11:30:00',
    updatedAt: '2024-12-28T16:00:00',
    plannedVersion: 'v2.4.0',
    releasedAt: '2024-12-28T16:00:00'
  },
  {
    id: 'r9',
    title: '接入企业微信单点登录',
    description: '名创优品使用企业微信作为内部协作工具，希望能直接通过企微登录，无需单独记忆账号密码。',
    source: {
      type: 'meeting_presale',
      category: 'online',
      originalContent: '名创优品售前会议上，吴经理表示企微SSO是他们IT部门的标准要求。',
      collectorId: '2',
      collectorName: '李四',
      collectTime: '2024-12-18T14:00:00'
    },
    customerId: 'c5',
    customerName: '名创优品',
    customerIndustry: '日用零售',
    type: 'integration',
    module: 'system',
    tags: ['企业微信', 'SSO', '集成'],
    priority: 'P2',
    customerUrgency: 'important',
    businessValue: 7,
    frequency: 4,
    status: 'pending_review',
    linkedRequirements: [],
    comments: [],
    createdAt: '2024-12-18T14:00:00',
    updatedAt: '2024-12-18T14:00:00'
  },
  {
    id: 'r10',
    title: '看板订阅与定时推送',
    description: '用户希望能订阅特定看板，每天早上自动推送到邮箱或企微。',
    source: {
      type: 'visit_business',
      category: 'offline',
      originalContent: '拜访良品铺子时，周总提到他们老板每天早上想收到前一天的经营数据邮件。',
      collectorId: '2',
      collectorName: '李四',
      collectTime: '2024-12-15T16:30:00'
    },
    customerId: 'c4',
    customerName: '良品铺子',
    customerIndustry: '零食零售',
    type: 'new_feature',
    module: 'dashboard',
    tags: ['订阅', '推送', '定时任务'],
    priority: 'P2',
    customerUrgency: 'normal',
    businessValue: 6,
    frequency: 5,
    status: 'planned',
    linkedRequirements: [],
    comments: [],
    createdAt: '2024-12-15T16:30:00',
    updatedAt: '2024-12-15T16:30:00',
    plannedVersion: 'v2.6.0'
  }
]

// 仪表盘统计数据
export const mockDashboardStats: DashboardStats = {
  totalRequirements: mockRequirements.length,
  pendingReview: mockRequirements.filter(r => r.status === 'pending_review').length,
  inProgress: mockRequirements.filter(r => ['planned', 'developing', 'testing'].includes(r.status)).length,
  completedThisMonth: mockRequirements.filter(r => r.status === 'released').length,
  topCustomers: [
    { name: '蜜雪冰城', count: 4 },
    { name: '良品铺子', count: 2 },
    { name: '雅戈尔', count: 2 },
    { name: '味全', count: 1 },
    { name: '名创优品', count: 1 }
  ],
  byModule: [
    { module: '问答引擎', count: 4 },
    { module: '权限管理', count: 1 },
    { module: '数据看板', count: 2 },
    { module: '报表导出', count: 1 },
    { module: '系统配置', count: 1 },
    { module: '移动端', count: 1 }
  ],
  byPriority: [
    { priority: 'P0', count: 2 },
    { priority: 'P1', count: 3 },
    { priority: 'P2', count: 4 },
    { priority: 'P3', count: 1 }
  ],
  trend: [
    { date: '12/23', count: 2 },
    { date: '12/24', count: 3 },
    { date: '12/25', count: 1 },
    { date: '12/26', count: 2 },
    { date: '12/27', count: 1 },
    { date: '12/28', count: 2 },
    { date: '12/29', count: 1 }
  ]
}

// 源类型中文映射
export const sourceTypeLabels: Record<string, string> = {
  meeting_presale: '售前演示会',
  meeting_requirement: '需求对接会',
  meeting_review: '问题排查会',
  chat_wechat: '微信沟通',
  chat_dingtalk: '钉钉沟通',
  chat_feishu: '飞书沟通',
  email: '邮件',
  ticket: '工单',
  visit_business: '商务拜访',
  visit_dinner: '饭局酒局',
  implementation: '现场实施',
  backend_qa: '后台问答日志',
  backend_behavior: '后台行为数据',
  backend_feedback: '用户反馈'
}

// 需求类型中文映射
export const requirementTypeLabels: Record<string, string> = {
  new_feature: '新功能',
  enhancement: '功能增强',
  experience: '体验优化',
  performance: '性能优化',
  bug: 'Bug修复',
  integration: '集成需求',
  security: '安全合规',
  documentation: '文档培训'
}

// 模块中文映射
export const moduleLabels: Record<string, string> = {
  qa_engine: '问答引擎',
  semantic: '语义理解',
  dashboard: '数据看板',
  metric: '指标管理',
  permission: '权限管理',
  system: '系统配置',
  report: '报表导出',
  mobile: '移动端',
  integration: '数据集成',
  other: '其他'
}

// 状态中文映射
export const statusLabels: Record<string, string> = {
  pending_review: '待评审',
  planned: '已规划',
  developing: '开发中',
  testing: '测试中',
  released: '已上线',
  rejected: '已拒绝',
  merged: '已合并'
}

// 优先级中文映射
export const priorityLabels: Record<string, string> = {
  P0: '紧急',
  P1: '重要',
  P2: '一般',
  P3: '低优先级'
}

// 来源分类中文映射
export const sourceCategoryLabels: Record<string, string> = {
  online: '线上',
  offline: '线下',
  backend: '后台数据'
}





