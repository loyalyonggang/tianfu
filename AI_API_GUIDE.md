# 🤖 AI API 调用指南

## 📋 问题说明

当直接在浏览器中调用OpenRouter API时，会遇到以下错误：

```
Failed to execute 'fetch' on 'Window': Failed to read the 'headers' property from 'RequestInit': String contains non ISO-8859-1 code point.
```

**原因**：浏览器的CORS（跨域资源共享）安全限制阻止了直接调用第三方API。

---

## ✅ 解决方案

### 方案1：使用演示数据（当前默认）⭐

**优点**：
- ✅ 无需配置，开箱即用
- ✅ 无需后端服务器
- ✅ 无需API费用

**缺点**：
- ❌ 报告内容是模拟的，不是真正的AI生成

**使用方法**：
```javascript
// 在 report-generated.js 中
const OPENAI_CONFIG = {
    useBackend: false,  // 关闭后端代理
    // ...
};
```

当API调用失败时，系统会自动降级到演示数据。

---

### 方案2：使用后端代理（推荐）⭐⭐⭐

**优点**：
- ✅ 真正的AI生成报告
- ✅ 解决CORS问题
- ✅ API Key安全（不暴露在前端）
- ✅ 可以添加缓存、日志等功能

**缺点**：
- ❌ 需要运行Node.js服务器

#### 步骤1：安装依赖

```bash
cd talent-wealth-assessment
npm install
```

这会安装：
- `express` - Web服务器框架
- `cors` - 处理跨域请求
- `node-fetch` - Node.js中的fetch API

#### 步骤2：启动后端服务器

```bash
npm start
```

或者使用开发模式（自动重启）：
```bash
npm run dev
```

你会看到：
```
🚀 服务器已启动！
📍 访问地址: http://localhost:3000
📊 API端点: http://localhost:3000/api/generate-report
💚 健康检查: http://localhost:3000/api/health
```

#### 步骤3：配置前端使用后端

```javascript
// 在 report-generated.js 中
const OPENAI_CONFIG = {
    useBackend: true,  // 启用后端代理
    backendUrl: 'http://localhost:3000/api/generate-report',
    // ...
};
```

#### 步骤4：测试

1. 访问 http://localhost:3000/assessment.html
2. 完成测评
3. 查看AI生成的报告

---

### 方案3：部署到云服务器（生产环境）

#### 使用Vercel（推荐）

1. **安装Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **创建 `vercel.json`**
   ```json
   {
     "version": 2,
     "builds": [
       { "src": "server.js", "use": "@vercel/node" }
     ],
     "routes": [
       { "src": "/api/(.*)", "dest": "/server.js" },
       { "src": "/(.*)", "dest": "/$1" }
     ]
   }
   ```

3. **部署**
   ```bash
   vercel
   ```

4. **更新前端配置**
   ```javascript
   const OPENAI_CONFIG = {
       useBackend: true,
       backendUrl: 'https://your-app.vercel.app/api/generate-report',
       // ...
   };
   ```

#### 使用Railway

1. 访问 https://railway.app/
2. 连接GitHub仓库
3. 自动部署
4. 获取部署URL并更新前端配置

---

## 🔧 配置说明

### 环境变量（推荐）

为了安全，不要在代码中硬编码API Key。使用环境变量：

1. **创建 `.env` 文件**
   ```
   OPENROUTER_API_KEY=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
   PORT=3000
   ```

2. **安装 dotenv**
   ```bash
   npm install dotenv
   ```

3. **更新 `server.js`**
   ```javascript
   require('dotenv').config();
   
   const OPENROUTER_CONFIG = {
       apiKey: process.env.OPENROUTER_API_KEY,
       // ...
   };
   ```

4. **添加到 `.gitignore`**
   ```
   .env
   node_modules/
   ```

---

## 🎯 当前配置

### 前端配置
```javascript
// scripts/report-generated.js
const OPENAI_CONFIG = {
    useBackend: true,  // ✅ 使用后端代理
    backendUrl: 'http://localhost:3000/api/generate-report',
    // ...
};
```

### 后端配置
```javascript
// server.js
const OPENROUTER_CONFIG = {
    apiKey: 'sk-or-v1-...',  // 你的API Key
    apiUrl: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'google/gemma-2-9b-it:free'  // 免费模型
};
```

---

## 📊 测试方法

### 1. 测试后端健康状态
```bash
curl http://localhost:3000/api/health
```

应该返回：
```json
{
  "status": "ok",
  "timestamp": "2025-10-31T12:00:00.000Z"
}
```

### 2. 测试API调用
打开浏览器控制台（F12），查看日志：

**成功时**：
```
通过后端代理调用AI API...
✅ AI API调用成功
```

**失败时**：
```
❌ AI API调用失败: Error: ...
📊 使用演示数据生成报告
```

---

## 🐛 常见问题

### Q1: 后端启动失败
**错误**：`Error: Cannot find module 'express'`

**解决**：
```bash
npm install
```

### Q2: 端口被占用
**错误**：`Error: listen EADDRINUSE: address already in use :::3000`

**解决**：
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# 或者修改端口
# 在 server.js 中修改 PORT = 3001
```

### Q3: API调用失败
**错误**：`API调用失败: 401`

**解决**：
- 检查API Key是否正确
- 检查OpenRouter账户是否有余额
- 检查网络连接

### Q4: CORS错误仍然存在
**错误**：`Access-Control-Allow-Origin`

**解决**：
- 确保后端服务器正在运行
- 检查前端配置的 `backendUrl` 是否正确
- 确保 `useBackend: true`

---

## 💡 最佳实践

### 开发环境
```javascript
const OPENAI_CONFIG = {
    useBackend: true,
    backendUrl: 'http://localhost:3000/api/generate-report',
};
```

### 生产环境
```javascript
const OPENAI_CONFIG = {
    useBackend: true,
    backendUrl: 'https://your-domain.com/api/generate-report',
};
```

### 混合模式（推荐）
```javascript
const OPENAI_CONFIG = {
    useBackend: true,
    backendUrl: window.location.hostname === 'localhost' 
        ? 'http://localhost:3000/api/generate-report'
        : 'https://your-domain.com/api/generate-report',
};
```

---

## 📈 性能优化

### 1. 添加缓存
```javascript
// server.js
const cache = new Map();

app.post('/api/generate-report', async (req, res) => {
    const cacheKey = JSON.stringify(req.body);
    
    if (cache.has(cacheKey)) {
        console.log('从缓存返回');
        return res.json(cache.get(cacheKey));
    }
    
    // ... API调用 ...
    
    cache.set(cacheKey, data);
    res.json(data);
});
```

### 2. 添加请求限流
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15分钟
    max: 10 // 最多10次请求
});

app.use('/api/', limiter);
```

---

## 🎉 总结

**当前状态**：
- ✅ 前端已配置使用后端代理
- ✅ 后端服务器代码已创建
- ✅ 自动降级到演示数据
- ✅ 不再显示烦人的错误提示

**下一步**：
1. 运行 `npm install` 安装依赖
2. 运行 `npm start` 启动后端
3. 访问 http://localhost:3000 测试

**生产部署**：
- 推荐使用Vercel或Railway
- 配置环境变量保护API Key
- 添加缓存和限流提升性能
