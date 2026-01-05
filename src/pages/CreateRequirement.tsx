import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Mic, 
  MicOff, 
  Upload, 
  FileText, 
  Sparkles, 
  CheckCircle2,
  Loader2,
  ArrowRight,
  X,
  FileAudio,
  Wand2,
  Clock,
  Building2,
  Tag,
  ChevronDown
} from 'lucide-react'
import { Layout } from '../components/Layout'
import { Card, Badge, Button } from '../components/UI'
import { moduleLabels, requirementTypeLabels, priorityLabels, mockCustomers } from '../data/mockData'

// AI 处理阶段
type ProcessingStage = 'idle' | 'uploading' | 'transcribing' | 'analyzing' | 'generating' | 'complete'

const stageInfo: Record<ProcessingStage, { label: string; icon: React.ElementType }> = {
  idle: { label: '等待输入', icon: Clock },
  uploading: { label: '上传中...', icon: Loader2 },
  transcribing: { label: 'AI 语音转文字...', icon: FileAudio },
  analyzing: { label: '语义分析中...', icon: Sparkles },
  generating: { label: '生成结构化需求...', icon: Wand2 },
  complete: { label: '处理完成', icon: CheckCircle2 },
}

// 模拟 AI 提取结果
const mockAIResult = {
  title: '支持环比增长率计算',
  description: '客户希望在问答时能够直接计算环比增长率，例如「本月营业额环比上月增长多少」，目前系统无法理解「环比」的语义。',
  customer: 'mixuebingcheng',
  module: 'qa_engine',
  type: 'new_feature',
  priority: 'P1',
  tags: ['时间计算', '指标增强', '高频需求'],
  originalContent: '王总在需求对接会上提出，他们的运营人员每天都需要看环比数据，目前需要手动计算，希望能直接问出来。',
}

// 下拉选择组件
function SelectField({ 
  label, 
  options, 
  value, 
  onChange,
  icon: Icon
}: { 
  label: string
  options: { value: string; label: string }[]
  value: string
  onChange: (v: string) => void
  icon?: React.ElementType
}) {
  const [open, setOpen] = useState(false)
  const selected = options.find(o => o.value === value)

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                   text-sm text-left hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-gray-400" />}
          <span className={selected ? 'text-gray-900' : 'text-gray-400'}>
            {selected?.label || `选择${label}`}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20 max-h-60 overflow-auto"
            >
              {options.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 ${
                    value === opt.value ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function CreateRequirement() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // 状态
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [processingStage, setProcessingStage] = useState<ProcessingStage>('idle')
  const [aiResult, setAiResult] = useState<typeof mockAIResult | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  
  // 表单数据
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    customer: '',
    module: '',
    type: '',
    priority: '',
    tags: [] as string[],
    originalContent: '',
  })
  const [tagInput, setTagInput] = useState('')

  // 模拟录音
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false)
      simulateAIProcessing()
    } else {
      setIsRecording(true)
      setRecordingTime(0)
      const timer = setInterval(() => {
        setRecordingTime(t => t + 1)
      }, 1000)
      setTimeout(() => {
        clearInterval(timer)
        setIsRecording(false)
        simulateAIProcessing()
      }, 5000)
    }
  }

  // 文件上传处理
  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
    simulateAIProcessing()
  }

  // 拖拽处理
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileUpload(file)
  }

  // 模拟 AI 处理流程
  const simulateAIProcessing = async () => {
    const stages: ProcessingStage[] = ['uploading', 'transcribing', 'analyzing', 'generating', 'complete']
    for (const stage of stages) {
      setProcessingStage(stage)
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400))
    }
    setAiResult(mockAIResult)
  }

  // 一键填充表单
  const fillFormWithAI = () => {
    if (aiResult) {
      setFormData({
        title: aiResult.title,
        description: aiResult.description,
        customer: aiResult.customer,
        module: aiResult.module,
        type: aiResult.type,
        priority: aiResult.priority,
        tags: aiResult.tags,
        originalContent: aiResult.originalContent,
      })
    }
  }

  // 添加标签
  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }))
      setTagInput('')
    }
  }

  // 移除标签
  const removeTag = (tag: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))
  }

  // 提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 模拟提交
    alert('需求已提交！')
    navigate('/requirements')
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Layout title="录入需求" subtitle="支持语音录入、文件上传，AI 自动提取需求">
      <div className="grid grid-cols-2 gap-6">
        {/* Left: AI Input */}
        <div className="space-y-6">
          {/* Voice Recording Card */}
          <Card padding="lg">
            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Mic className="w-5 h-5 text-blue-600" />
              语音录入
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              点击开始录音，AI 将自动转写并提取需求信息
            </p>
            
            <div className="flex flex-col items-center py-8">
              <motion.button
                onClick={toggleRecording}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                  isRecording 
                    ? 'bg-red-500 shadow-lg shadow-red-500/30' 
                    : 'bg-blue-500 shadow-lg shadow-blue-500/30 hover:bg-blue-600'
                }`}
              >
                {isRecording ? (
                  <MicOff className="w-10 h-10 text-white" />
                ) : (
                  <Mic className="w-10 h-10 text-white" />
                )}
              </motion.button>
              
              {isRecording && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 text-center"
                >
                  <div className="flex items-center gap-2 justify-center mb-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-red-600">录音中</span>
                  </div>
                  <span className="text-2xl font-mono font-bold text-gray-900">
                    {formatTime(recordingTime)}
                  </span>
                </motion.div>
              )}
              
              {!isRecording && (
                <p className="mt-4 text-sm text-gray-400">点击开始录音</p>
              )}
            </div>
          </Card>

          {/* File Upload Card */}
          <Card padding="lg">
            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-600" />
              文件上传
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              支持上传音频文件或会议纪要文档
            </p>
            
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                isDragging 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".mp3,.wav,.m4a,.txt,.doc,.docx,.pdf"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              />
              <Upload className={`w-10 h-10 mx-auto mb-3 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
              <p className="text-sm text-gray-600 font-medium mb-1">
                拖拽文件到这里或点击上传
              </p>
              <p className="text-xs text-gray-400">
                支持 MP3、WAV、M4A、TXT、DOC、PDF
              </p>
            </div>

            {uploadedFile && (
              <div className="mt-4 flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-700 flex-1 truncate">{uploadedFile.name}</span>
                <button 
                  onClick={() => setUploadedFile(null)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            )}
          </Card>

          {/* AI Processing Status */}
          {processingStage !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card padding="lg">
                <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  AI 处理进度
                </h3>
                
                <div className="space-y-3">
                  {(['uploading', 'transcribing', 'analyzing', 'generating', 'complete'] as ProcessingStage[]).map((stage, index) => {
                    const info = stageInfo[stage]
                    const Icon = info.icon
                    const isActive = processingStage === stage
                    const isComplete = ['uploading', 'transcribing', 'analyzing', 'generating', 'complete']
                      .indexOf(processingStage) > index

                    return (
                      <div
                        key={stage}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          isActive ? 'bg-blue-50' : isComplete ? 'bg-gray-50' : ''
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isComplete ? 'bg-emerald-500' : isActive ? 'bg-blue-500' : 'bg-gray-200'
                        }`}>
                          {isComplete ? (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          ) : isActive ? (
                            <Loader2 className="w-4 h-4 text-white animate-spin" />
                          ) : (
                            <Icon className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        <span className={`text-sm font-medium ${
                          isActive ? 'text-blue-700' : isComplete ? 'text-gray-700' : 'text-gray-400'
                        }`}>
                          {info.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </motion.div>
          )}

          {/* AI Result */}
          {aiResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card padding="lg" className="border-2 border-blue-200 bg-blue-50/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <Wand2 className="w-5 h-5 text-blue-600" />
                    AI 提取结果
                  </h3>
                  <Button variant="primary" size="sm" onClick={fillFormWithAI}>
                    一键填充
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-gray-500 font-medium">标题</span>
                    <p className="text-sm text-gray-900 font-semibold mt-0.5">{aiResult.title}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-medium">描述</span>
                    <p className="text-sm text-gray-700 mt-0.5 leading-relaxed">{aiResult.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {aiResult.tags.map(tag => (
                      <Badge key={tag} variant="blue" size="sm">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Right: Form */}
        <Card padding="lg">
          <h3 className="text-base font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            需求信息
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                需求标题 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="简洁描述需求..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 
                         focus:border-blue-500 focus:bg-white transition-all"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                需求描述 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="详细描述需求场景和期望..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 
                         focus:border-blue-500 focus:bg-white transition-all resize-none"
                required
              />
            </div>

            {/* Customer & Module */}
            <div className="grid grid-cols-2 gap-4">
              <SelectField
                label="客户"
                icon={Building2}
                options={mockCustomers.map(c => ({ value: c.id, label: c.name }))}
                value={formData.customer}
                onChange={(v) => setFormData(prev => ({ ...prev, customer: v }))}
              />
              <SelectField
                label="模块"
                icon={Tag}
                options={Object.entries(moduleLabels).map(([value, label]) => ({ value, label }))}
                value={formData.module}
                onChange={(v) => setFormData(prev => ({ ...prev, module: v }))}
              />
            </div>

            {/* Type & Priority */}
            <div className="grid grid-cols-2 gap-4">
              <SelectField
                label="类型"
                options={Object.entries(requirementTypeLabels).map(([value, label]) => ({ value, label }))}
                value={formData.type}
                onChange={(v) => setFormData(prev => ({ ...prev, type: v }))}
              />
              <SelectField
                label="优先级"
                options={Object.entries(priorityLabels).map(([value, label]) => ({ value, label }))}
                value={formData.priority}
                onChange={(v) => setFormData(prev => ({ ...prev, priority: v }))}
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">标签</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map(tag => (
                  <span 
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm"
                  >
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-blue-900">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="输入标签后按回车添加"
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm
                           placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 
                           focus:border-blue-500 focus:bg-white transition-all"
                />
                <Button type="button" variant="secondary" onClick={addTag}>添加</Button>
              </div>
            </div>

            {/* Original Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">原始记录</label>
              <textarea
                value={formData.originalContent}
                onChange={(e) => setFormData(prev => ({ ...prev, originalContent: e.target.value }))}
                placeholder="记录原始对话或会议内容..."
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 
                         focus:border-blue-500 focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" variant="primary" fullWidth>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                提交需求
              </Button>
              <Button type="button" variant="secondary" onClick={() => navigate('/requirements')}>
                取消
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  )
}
