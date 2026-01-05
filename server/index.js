import express from 'express'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3001

// 中间件
app.use(cors())
app.use(express.json())

// 数据存储路径
const DATA_DIR = path.join(__dirname, 'data')
const REQUIREMENTS_FILE = path.join(DATA_DIR, 'requirements.json')
const CUSTOMERS_FILE = path.join(DATA_DIR, 'customers.json')
const USERS_FILE = path.join(DATA_DIR, 'users.json')

// 确保数据目录存在
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// 读取数据
function readData(file) {
  try {
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf-8'))
    }
  } catch (error) {
    console.error(`Error reading ${file}:`, error)
  }
  return []
}

// 写入数据
function writeData(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8')
    return true
  } catch (error) {
    console.error(`Error writing ${file}:`, error)
    return false
  }
}

// 初始化默认数据
function initializeData() {
  // 默认用户
  if (!fs.existsSync(USERS_FILE)) {
    const defaultUsers = [
      {
        id: '1',
        name: '张三',
        email: 'zhangsan@company.com',
        role: 'product_manager',
        department: '产品部',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: '李四',
        email: 'lisi@company.com',
        role: 'sales',
        department: '销售部',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        name: '王五',
        email: 'wangwu@company.com',
        role: 'implementation',
        department: '实施部',
        createdAt: new Date().toISOString()
      }
    ]
    writeData(USERS_FILE, defaultUsers)
  }

  // 默认客户
  if (!fs.existsSync(CUSTOMERS_FILE)) {
    const defaultCustomers = [
      {
        id: 'c1',
        name: '蜜雪冰城',
        industry: '餐饮零售',
        size: 'large',
        stage: 'paid',
        contractValue: 500000,
        contacts: [
          { id: 'ct1', name: '王总', title: '数据总监', department: '数据部', influence: 'decision_maker' }
        ],
        createdAt: new Date().toISOString()
      },
      {
        id: 'c2',
        name: '雅戈尔',
        industry: '服装零售',
        size: 'large',
        stage: 'paid',
        contractValue: 300000,
        contacts: [
          { id: 'ct2', name: '刘总', title: 'CIO', department: 'IT部', influence: 'decision_maker' }
        ],
        createdAt: new Date().toISOString()
      }
    ]
    writeData(CUSTOMERS_FILE, defaultCustomers)
  }

  // 默认需求
  if (!fs.existsSync(REQUIREMENTS_FILE)) {
    writeData(REQUIREMENTS_FILE, [])
  }
}

initializeData()

// ==================== 需求 API ====================

// 获取所有需求
app.get('/api/requirements', (req, res) => {
  const requirements = readData(REQUIREMENTS_FILE)
  
  // 支持筛选
  let filtered = [...requirements]
  
  if (req.query.status) {
    filtered = filtered.filter(r => r.status === req.query.status)
  }
  if (req.query.priority) {
    filtered = filtered.filter(r => r.priority === req.query.priority)
  }
  if (req.query.customerId) {
    filtered = filtered.filter(r => r.customerId === req.query.customerId)
  }
  if (req.query.search) {
    const search = req.query.search.toLowerCase()
    filtered = filtered.filter(r => 
      r.title.toLowerCase().includes(search) ||
      r.description.toLowerCase().includes(search)
    )
  }

  // 排序
  filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  res.json({
    success: true,
    data: filtered,
    total: filtered.length
  })
})

// 获取单个需求
app.get('/api/requirements/:id', (req, res) => {
  const requirements = readData(REQUIREMENTS_FILE)
  const requirement = requirements.find(r => r.id === req.params.id)
  
  if (!requirement) {
    return res.status(404).json({ success: false, message: '需求不存在' })
  }
  
  res.json({ success: true, data: requirement })
})

// 创建需求
app.post('/api/requirements', (req, res) => {
  const requirements = readData(REQUIREMENTS_FILE)
  
  const newRequirement = {
    id: uuidv4(),
    ...req.body,
    status: req.body.status || 'pending_review',
    comments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  requirements.push(newRequirement)
  writeData(REQUIREMENTS_FILE, requirements)
  
  res.status(201).json({ success: true, data: newRequirement })
})

// 更新需求
app.put('/api/requirements/:id', (req, res) => {
  const requirements = readData(REQUIREMENTS_FILE)
  const index = requirements.findIndex(r => r.id === req.params.id)
  
  if (index === -1) {
    return res.status(404).json({ success: false, message: '需求不存在' })
  }
  
  requirements[index] = {
    ...requirements[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  }
  
  writeData(REQUIREMENTS_FILE, requirements)
  res.json({ success: true, data: requirements[index] })
})

// 删除需求
app.delete('/api/requirements/:id', (req, res) => {
  const requirements = readData(REQUIREMENTS_FILE)
  const filtered = requirements.filter(r => r.id !== req.params.id)
  
  if (filtered.length === requirements.length) {
    return res.status(404).json({ success: false, message: '需求不存在' })
  }
  
  writeData(REQUIREMENTS_FILE, filtered)
  res.json({ success: true, message: '删除成功' })
})

// 添加评论
app.post('/api/requirements/:id/comments', (req, res) => {
  const requirements = readData(REQUIREMENTS_FILE)
  const index = requirements.findIndex(r => r.id === req.params.id)
  
  if (index === -1) {
    return res.status(404).json({ success: false, message: '需求不存在' })
  }
  
  const comment = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date().toISOString()
  }
  
  requirements[index].comments.push(comment)
  requirements[index].updatedAt = new Date().toISOString()
  
  writeData(REQUIREMENTS_FILE, requirements)
  res.status(201).json({ success: true, data: comment })
})

// ==================== 客户 API ====================

// 获取所有客户
app.get('/api/customers', (req, res) => {
  const customers = readData(CUSTOMERS_FILE)
  res.json({ success: true, data: customers })
})

// 获取单个客户
app.get('/api/customers/:id', (req, res) => {
  const customers = readData(CUSTOMERS_FILE)
  const customer = customers.find(c => c.id === req.params.id)
  
  if (!customer) {
    return res.status(404).json({ success: false, message: '客户不存在' })
  }
  
  res.json({ success: true, data: customer })
})

// 创建客户
app.post('/api/customers', (req, res) => {
  const customers = readData(CUSTOMERS_FILE)
  
  const newCustomer = {
    id: uuidv4(),
    ...req.body,
    contacts: req.body.contacts || [],
    createdAt: new Date().toISOString()
  }
  
  customers.push(newCustomer)
  writeData(CUSTOMERS_FILE, customers)
  
  res.status(201).json({ success: true, data: newCustomer })
})

// ==================== 统计 API ====================

app.get('/api/stats/dashboard', (req, res) => {
  const requirements = readData(REQUIREMENTS_FILE)
  const customers = readData(CUSTOMERS_FILE)
  
  const now = new Date()
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  
  const stats = {
    totalRequirements: requirements.length,
    pendingReview: requirements.filter(r => r.status === 'pending_review').length,
    inProgress: requirements.filter(r => ['planned', 'developing', 'testing'].includes(r.status)).length,
    completedThisMonth: requirements.filter(r => 
      r.status === 'released' && new Date(r.releasedAt || r.updatedAt) >= thisMonth
    ).length,
    totalCustomers: customers.length
  }
  
  res.json({ success: true, data: stats })
})

// ==================== 启动服务器 ====================

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 RequireFlow API Server                               ║
║                                                           ║
║   Server running at: http://localhost:${PORT}              ║
║                                                           ║
║   API Endpoints:                                          ║
║   • GET    /api/requirements                              ║
║   • POST   /api/requirements                              ║
║   • GET    /api/requirements/:id                          ║
║   • PUT    /api/requirements/:id                          ║
║   • DELETE /api/requirements/:id                          ║
║   • POST   /api/requirements/:id/comments                 ║
║   • GET    /api/customers                                 ║
║   • POST   /api/customers                                 ║
║   • GET    /api/stats/dashboard                           ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `)
})


