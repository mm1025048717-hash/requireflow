# 部署指南 - RequireFlow

## 📋 快速部署步骤

### 第一步：推送到 GitHub

```bash
# 1. 进入项目目录
cd requirement-pool

# 2. 初始化 Git（如果还没有）
git init

# 3. 添加所有文件
git add .

# 4. 提交代码
git commit -m "Initial commit: RequireFlow 需求池管理系统"

# 5. 在 GitHub 上创建新仓库，然后执行：
git remote add origin https://github.com/你的用户名/requireflow.git
git branch -M main
git push -u origin main
```

### 第二步：部署到 Vercel

#### 方法 A：通过网页（最简单）

1. 访问 [https://vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 **"Add New Project"**
4. 选择你的 GitHub 仓库 `requireflow`
5. Vercel 会自动检测配置：
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. 点击 **"Deploy"**
7. 等待 1-2 分钟，部署完成！

#### 方法 B：通过命令行

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署（开发环境）
vercel

# 部署到生产环境
vercel --prod
```

## 🔧 配置说明

### Vercel 自动配置

项目已包含 `vercel.json` 配置文件，Vercel 会自动识别：

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### 环境变量（可选）

如果后续需要连接真实 API，可以在 Vercel 项目设置中添加环境变量：

1. 进入 Vercel 项目设置
2. 点击 **Settings** → **Environment Variables**
3. 添加变量，例如：
   - `VITE_API_URL`: `https://your-api.com`

## 📝 后续更新

每次推送代码到 GitHub 的 `main` 分支，Vercel 会自动重新部署：

```bash
git add .
git commit -m "更新功能"
git push origin main
```

## 🚨 常见问题

### Q: 部署后页面空白？
A: 检查浏览器控制台错误，可能是路由配置问题。确保 `vercel.json` 中的 `rewrites` 配置正确。

### Q: 如何查看部署日志？
A: 在 Vercel Dashboard 中点击项目 → **Deployments** → 选择部署 → 查看 **Build Logs**。

### Q: 如何回滚到之前的版本？
A: 在 Vercel Dashboard 的 **Deployments** 页面，找到之前的部署，点击 **"..."** → **"Promote to Production"**。

### Q: 后端 API 如何部署？
A: 当前版本使用 mock 数据，前端可以独立运行。如需部署后端：
- 使用 Railway、Render 或 Heroku
- 或使用 Vercel Serverless Functions（需要重构代码）

## 🔗 相关链接

- [Vercel 文档](https://vercel.com/docs)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Actions](https://github.com/features/actions)

---

**部署完成后，你的应用将在 `https://你的项目名.vercel.app` 上运行！** 🎉

