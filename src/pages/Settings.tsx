import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database, 
  Plug,
  ChevronRight,
  Moon,
  Sun,
  Check,
  Upload,
  Save,
  RefreshCw
} from 'lucide-react'
import { Layout } from '../components/Layout'
import { Card, Button } from '../components/UI'

// 设置区块组件
function SettingSection({ 
  icon: Icon, 
  title, 
  description, 
  children 
}: { 
  icon: React.ElementType
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <Card padding="lg" className="mb-5">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{description}</p>
        </div>
      </div>
      <div className="pl-14">
        {children}
      </div>
    </Card>
  )
}

// 开关组件
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full transition-colors duration-200 ${
        checked ? 'bg-blue-500' : 'bg-gray-200'
      }`}
    >
      <motion.div
        className="w-5 h-5 bg-white rounded-full shadow-sm"
        animate={{ x: checked ? 22 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  )
}

// 设置项行
function SettingRow({ 
  label, 
  description, 
  children 
}: { 
  label: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
      </div>
      {children}
    </div>
  )
}

// 主题选择卡片
function ThemeCard({ 
  name, 
  icon: Icon, 
  selected, 
  onClick 
}: { 
  name: string
  icon: React.ElementType
  selected: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-colors ${
        selected 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
      <Icon className={`w-6 h-6 ${selected ? 'text-blue-600' : 'text-gray-600'}`} />
      <span className={`text-sm font-medium ${selected ? 'text-blue-700' : 'text-gray-700'}`}>
        {name}
      </span>
    </motion.button>
  )
}

export default function Settings() {
  const [notifications, setNotifications] = useState({
    newRequirement: true,
    statusChange: true,
    comments: false,
    digest: true,
  })
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light')

  return (
    <Layout title="系统设置" subtitle="管理您的账户和偏好">
      <div className="grid grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="col-span-2 space-y-5">
          {/* Profile */}
          <SettingSection 
            icon={User} 
            title="个人资料" 
            description="管理您的个人信息和头像"
          >
            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                  张
                </div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors">
                  <Upload className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">张三</h4>
                <p className="text-sm text-gray-500">产品经理</p>
                <p className="text-xs text-gray-400 mt-1">zhangsan@company.com</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">姓名</label>
                <input
                  type="text"
                  defaultValue="张三"
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">职位</label>
                <input
                  type="text"
                  defaultValue="产品经理"
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>
          </SettingSection>

          {/* Notifications */}
          <SettingSection 
            icon={Bell} 
            title="通知设置" 
            description="配置您希望接收的通知类型"
          >
            <SettingRow label="新需求提醒" description="有新需求录入时通知您">
              <Toggle 
                checked={notifications.newRequirement} 
                onChange={(v) => setNotifications(prev => ({ ...prev, newRequirement: v }))} 
              />
            </SettingRow>
            <SettingRow label="状态变更" description="需求状态发生变化时通知您">
              <Toggle 
                checked={notifications.statusChange} 
                onChange={(v) => setNotifications(prev => ({ ...prev, statusChange: v }))} 
              />
            </SettingRow>
            <SettingRow label="评论回复" description="有人回复您的评论时通知您">
              <Toggle 
                checked={notifications.comments} 
                onChange={(v) => setNotifications(prev => ({ ...prev, comments: v }))} 
              />
            </SettingRow>
            <SettingRow label="每日摘要" description="每天发送需求池变动摘要">
              <Toggle 
                checked={notifications.digest} 
                onChange={(v) => setNotifications(prev => ({ ...prev, digest: v }))} 
              />
            </SettingRow>
          </SettingSection>

          {/* Appearance */}
          <SettingSection 
            icon={Palette} 
            title="外观设置" 
            description="自定义界面主题和显示偏好"
          >
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-3">主题模式</p>
              <div className="grid grid-cols-3 gap-3">
                <ThemeCard 
                  name="浅色" 
                  icon={Sun} 
                  selected={theme === 'light'} 
                  onClick={() => setTheme('light')} 
                />
                <ThemeCard 
                  name="深色" 
                  icon={Moon} 
                  selected={theme === 'dark'} 
                  onClick={() => setTheme('dark')} 
                />
                <ThemeCard 
                  name="跟随系统" 
                  icon={RefreshCw} 
                  selected={theme === 'auto'} 
                  onClick={() => setTheme('auto')} 
                />
              </div>
            </div>
          </SettingSection>

          {/* Integrations */}
          <SettingSection 
            icon={Plug} 
            title="集成设置" 
            description="连接第三方服务和工具"
          >
            {[
              { name: '飞书', status: 'connected', desc: '已连接' },
              { name: '企业微信', status: 'disconnected', desc: '未连接' },
              { name: '钉钉', status: 'disconnected', desc: '未连接' },
            ].map(integration => (
              <SettingRow key={integration.name} label={integration.name}>
                {integration.status === 'connected' ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-emerald-600 font-medium">{integration.desc}</span>
                    <Button variant="ghost" size="sm">断开</Button>
                  </div>
                ) : (
                  <Button variant="secondary" size="sm">连接</Button>
                )}
              </SettingRow>
            ))}
          </SettingSection>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Quick Actions */}
          <Card padding="lg">
            <h3 className="text-base font-bold text-gray-900 mb-4">快捷操作</h3>
            <div className="space-y-2">
              {[
                { icon: Database, label: '导出数据' },
                { icon: Shield, label: '安全设置' },
                { icon: RefreshCw, label: '同步数据' },
              ].map(action => (
                <button
                  key={action.label}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <action.icon className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                      {action.label}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                </button>
              ))}
            </div>
          </Card>

          {/* Team Info */}
          <Card padding="lg">
            <h3 className="text-base font-bold text-gray-900 mb-4">团队信息</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">团队名称</span>
                <span className="text-sm font-medium text-gray-900">产品研发部</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">成员数量</span>
                <span className="text-sm font-medium text-gray-900">12 人</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">存储空间</span>
                <span className="text-sm font-medium text-gray-900">2.3 GB / 10 GB</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '23%' }} />
              </div>
            </div>
          </Card>

          {/* Save Button */}
          <Button variant="primary" fullWidth icon={<Save className="w-4 h-4" />}>
            保存更改
          </Button>
        </div>
      </div>
    </Layout>
  )
}
