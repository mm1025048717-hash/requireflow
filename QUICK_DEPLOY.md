# 🚀 快速部署指南

## 一键部署到 GitHub + Vercel

### 📦 第一步：推送到 GitHub

在项目目录下执行以下命令：

```bash
# 1. 添加所有文件
git add .

# 2. 提交代码
git commit -m "Initial commit: RequireFlow 需求池管理系统"

# 3. 在 GitHub 上创建新仓库（如果还没有）
#    访问 https://github.com/new
#    填写仓库名称：requireflow
#    选择 Public 或 Private
#    点击 "Create repository"

# 4. 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/requireflow.git

# 5. 推送到 GitHub
git branch -M main
git push -u origin main
```

### 🌐 第二步：部署到 Vercel

#### 方法 1：网页部署（最简单，推荐）

1. **访问 Vercel**
   - 打开 [https://vercel.com](https://vercel.com)
   - 点击 **"Sign Up"** 或 **"Log In"**
   - 使用 **GitHub 账号**登录

2. **导入项目**
   - 登录后，点击 **"Add New Project"** 或 **"Import Project"**
   - 在 GitHub 仓库列表中找到 `requireflow`
   - 点击 **"Import"**

3. **配置项目**
   - Framework Preset: **Vite**（自动检测）
   - Root Directory: `./`（默认）
   - Build Command: `npm run build`（自动）
   - Output Directory: `dist`（自动）
   - Install Command: `npm install`（自动）

4. **部署**
   - 点击 **"Deploy"** 按钮
   - 等待 1-2 分钟构建完成
   - 看到 ✅ 成功提示

5. **获取链接**
   - 部署完成后，你会得到一个链接
   - 例如：`https://requireflow.vercel.app`
   - 点击链接即可访问你的应用！

#### 方法 2：命令行部署

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录 Vercel
vercel login

# 3. 在项目目录下部署
cd requirement-pool
vercel

# 4. 按照提示操作：
#    - 选择项目范围（个人或团队）
#    - 是否链接现有项目（选择 No）
#    - 项目名称（直接回车使用默认）
#    - 目录（直接回车，使用当前目录）

# 5. 部署到生产环境
vercel --prod
```

### ✅ 部署完成检查清单

- [ ] GitHub 仓库已创建并推送代码
- [ ] Vercel 项目已创建
- [ ] 构建成功（无错误）
- [ ] 可以访问部署链接
- [ ] 页面正常显示
- [ ] 路由跳转正常

### 🔄 后续更新

每次更新代码后，只需：

```bash
git add .
git commit -m "更新说明"
git push origin main
```

Vercel 会自动检测到 GitHub 的更新并重新部署！✨

### 🐛 常见问题

**Q: 部署后页面空白？**
- 检查浏览器控制台是否有错误
- 确认 `vercel.json` 配置正确
- 检查路由配置

**Q: 构建失败？**
- 查看 Vercel 的构建日志
- 确认所有依赖都已安装
- 检查 TypeScript 编译错误

**Q: 如何查看部署历史？**
- 在 Vercel Dashboard 中点击项目
- 查看 **Deployments** 标签页

**Q: 如何回滚版本？**
- 在 Deployments 页面找到之前的版本
- 点击 **"..."** → **"Promote to Production"**

### 📞 需要帮助？

- [Vercel 文档](https://vercel.com/docs)
- [GitHub 文档](https://docs.github.com)
- [项目 Issues](https://github.com/YOUR_USERNAME/requireflow/issues)

---

**🎉 恭喜！你的应用已经部署成功！**

访问你的应用：`https://你的项目名.vercel.app`

