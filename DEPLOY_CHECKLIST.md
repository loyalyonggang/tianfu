# ✅ Vercel 部署检查清单

## 📝 部署前准备

### 1. 文件检查
- [x] `api/payment/alipay/create.js` - 创建订单 API
- [x] `api/payment/alipay/query.js` - 查询订单 API
- [x] `vercel.json` - Vercel 配置文件
- [x] `scripts/report-generated.js` - 前端代码已更新（使用 PAYMENT_API_BASE）
- [x] `package.json` - 包含 alipay-sdk 依赖

### 2. 代码修改确认
- [x] 添加了 `PAYMENT_API_BASE` 配置（第 3-6 行）
- [x] 创建订单 API 调用已更新（第 515 行）
- [x] 查询订单 API 调用已更新（第 586 行）

---

## 🚀 部署步骤

### 步骤 1: 提交代码到 Git

```bash
# 查看修改的文件
git status

# 添加所有文件
git add .

# 提交
git commit -m "Add Vercel serverless payment API"

# 推送到远程仓库
git push
```

### 步骤 2: Vercel 自动部署

Vercel 会自动检测到代码更新并重新部署。

访问 Vercel Dashboard 查看部署状态：
- https://vercel.com/dashboard

### 步骤 3: 等待部署完成

部署通常需要 1-2 分钟。完成后会显示：
- ✅ Deployment Ready
- 🔗 访问链接：https://tianfu.095016.xyz

---

## 🧪 部署后测试

### 1. 测试 API 端点

在浏览器控制台（F12）测试：

```javascript
// 测试创建订单 API
fetch('https://tianfu.095016.xyz/api/payment/alipay/create', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        reportId: 'TEST123',
        amount: 0.01,
        subject: '测试订单'
    })
})
.then(res => res.json())
.then(data => console.log('创建订单结果:', data))
.catch(err => console.error('错误:', err));
```

**预期结果：**
```json
{
  "success": true,
  "outTradeNo": "RPT...",
  "qrCode": "https://qr.alipay.com/...",
  "amount": 0.01
}
```

### 2. 测试完整支付流程

1. 访问：https://tianfu.095016.xyz
2. 点击"开始测评"
3. 完成测评问卷
4. 提交后查看报告
5. 点击"解锁完整报告"
6. 选择"支付宝支付"
7. 查看是否显示二维码
8. 扫码支付测试（建议用 ¥0.01 测试）

---

## 🔍 问题排查

### 如果 API 返回 404

**检查：**
1. `api/` 文件夹是否在项目根目录
2. `vercel.json` 是否正确配置
3. 文件是否已提交到 Git

**解决：**
```bash
# 确认文件结构
ls -la api/payment/alipay/

# 重新部署
git add .
git commit -m "Fix API structure"
git push
```

### 如果出现 CORS 错误

**检查：**
- API 文件中是否设置了 CORS 头
- 是否处理了 OPTIONS 请求

**解决：**
在每个 API 文件开头添加：
```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

if (req.method === 'OPTIONS') {
    return res.status(200).end();
}
```

### 如果支付宝返回签名错误

**检查：**
1. 私钥是否正确（没有多余空格）
2. 公钥是否是最新的
3. App ID 是否正确

**解决：**
- 重新从支付宝开放平台获取密钥
- 使用环境变量存储密钥（更安全）

---

## 🔐 安全建议（可选）

### 使用 Vercel 环境变量

1. 访问 Vercel Dashboard
2. 进入项目 Settings → Environment Variables
3. 添加以下变量：

```
ALIPAY_APP_ID=2021003143628959
ALIPAY_PRIVATE_KEY=你的私钥
ALIPAY_PUBLIC_KEY=支付宝公钥
```

4. 修改 API 代码使用环境变量：

```javascript
const alipaySdk = new AlipaySdk({
    appId: process.env.ALIPAY_APP_ID,
    privateKey: process.env.ALIPAY_PRIVATE_KEY,
    alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY,
    // ...
});
```

5. 重新部署

---

## 📱 支付宝开放平台配置

### 配置回调地址

1. 登录：https://open.alipay.com/
2. 进入应用详情
3. 找到"接口加签方式"
4. 配置授权回调地址：
   ```
   https://tianfu.095016.xyz/api/payment/alipay/notify
   ```

---

## ✅ 最终检查清单

部署完成后，确认以下所有项：

- [ ] Vercel 部署成功（绿色勾号）
- [ ] 访问 https://tianfu.095016.xyz 正常
- [ ] API 端点可访问（测试创建订单）
- [ ] 完成测评流程正常
- [ ] 点击"解锁完整报告"显示支付弹窗
- [ ] 选择支付宝后显示二维码
- [ ] 扫码支付成功
- [ ] 支付后自动解锁报告
- [ ] 支付宝开放平台回调地址已配置

---

## 🎉 部署成功！

如果所有检查项都通过，恭喜你！支付功能已成功部署到线上！

**访问地址：** https://tianfu.095016.xyz

---

## 📞 需要帮助？

如果遇到问题：
1. 查看 Vercel 部署日志
2. 检查浏览器控制台错误
3. 查看本文档的问题排查部分
4. 参考 `VERCEL_DEPLOY_GUIDE.md` 详细指南

---

**最后更新：** 2025-10-31
**状态：** 准备部署
