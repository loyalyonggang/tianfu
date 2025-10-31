# 💰 支付宝当面付集成指南

## ✅ 已配置信息

**支付方式**：支付宝当面付  
**应用ID**：2021003143628959  
**支付金额**：¥99

---

## 🚀 快速开始

### 1. 安装依赖

```bash
cd talent-wealth-assessment
npm install
```

这会安装：
- `alipay-sdk` - 支付宝官方SDK

### 2. 启动后端服务器

```bash
npm start
```

你会看到：
```
🚀 服务器已启动！
📍 访问地址: http://localhost:3000
📊 API端点: http://localhost:3000/api/generate-report
💰 支付接口: http://localhost:3000/api/payment/alipay/create
💚 健康检查: http://localhost:3000/api/health
```

### 3. 测试支付流程

1. 访问 http://localhost:3000/assessment.html
2. 完成45道测评题
3. 查看报告（30%免费预览）
4. 点击"立即解锁 ¥99"
5. 点击"支付宝支付"
6. 扫描二维码支付
7. 支付成功后自动解锁完整报告

---

## 📊 支付流程

```
用户点击"立即解锁"
    ↓
显示付费弹窗
    ↓
点击"支付宝支付"
    ↓
前端调用 /api/payment/alipay/create
    ↓
后端生成支付二维码
    ↓
显示二维码给用户
    ↓
用户扫码支付
    ↓
支付宝回调 /api/payment/alipay/notify
    ↓
前端轮询查询支付状态
    ↓
支付成功 → 解锁报告
```

---

## 🔧 API接口说明

### 1. 创建支付订单

**接口**: `POST /api/payment/alipay/create`

**请求参数**:
```json
{
  "reportId": "R12345678",
  "amount": 99,
  "subject": "商业诊断报告"
}
```

**返回数据**:
```json
{
  "success": true,
  "outTradeNo": "RPT1698765432123abc",
  "qrCode": "https://qr.alipay.com/bax12345",
  "amount": 99
}
```

### 2. 查询支付状态

**接口**: `POST /api/payment/alipay/query`

**请求参数**:
```json
{
  "outTradeNo": "RPT1698765432123abc"
}
```

**返回数据**:
```json
{
  "success": true,
  "tradeStatus": "TRADE_SUCCESS",
  "totalAmount": "99.00"
}
```

### 3. 支付回调

**接口**: `POST /api/payment/alipay/notify`

**说明**: 支付宝服务器会自动调用此接口，无需手动调用。

---

## 🔐 安全配置

### 密钥说明

**应用私钥**：用于签名请求  
**支付宝公钥**：用于验证支付宝返回的签名

**重要**：
- ⚠️ 不要将私钥提交到公开的代码仓库
- ⚠️ 生产环境使用环境变量存储密钥
- ⚠️ 定期更换密钥

### 环境变量配置（推荐）

创建 `.env` 文件：
```
ALIPAY_APP_ID=2021003143628959
ALIPAY_PRIVATE_KEY=MIIEvQIBADANBg...
ALIPAY_PUBLIC_KEY=MIIBIjANBgkqh...
```

更新 `alipay-config.js`：
```javascript
require('dotenv').config();

const ALIPAY_CONFIG = {
    appId: process.env.ALIPAY_APP_ID,
    privateKey: process.env.ALIPAY_PRIVATE_KEY,
    alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY,
    // ...
};
```

---

## 🧪 测试模式

### 沙箱环境

支付宝提供沙箱环境用于测试：

1. 访问 https://openhome.alipay.com/develop/sandbox/app
2. 获取沙箱应用信息
3. 修改配置：
```javascript
gatewayUrl: 'https://openapi.alipaydev.com/gateway.do'  // 沙箱网关
```

### 测试账号

- 下载支付宝沙箱版APP
- 使用沙箱买家账号登录
- 扫描测试二维码支付

---

## 💡 前端集成

### 生成二维码

使用在线API（无需额外库）：
```javascript
const qrCodeUrl = data.qrCode;
const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrCodeUrl)}`;
```

或使用 QRCode.js 库：
```html
<script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>
```

```javascript
new QRCode(document.getElementById('qrcode'), {
    text: qrCodeUrl,
    width: 250,
    height: 250
});
```

### 轮询支付状态

```javascript
// 每2秒查询一次
setInterval(async () => {
    const response = await fetch('/api/payment/alipay/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ outTradeNo: outTradeNo })
    });
    
    const data = await response.json();
    
    if (data.tradeStatus === 'TRADE_SUCCESS') {
        // 支付成功
        unlockReport();
    }
}, 2000);
```

---

## 📝 订单管理

### 订单号生成规则

```javascript
const outTradeNo = 'RPT' + Date.now() + Math.random().toString(36).substr(2, 9);
// 示例: RPT1698765432123abc456
```

**规则**：
- 前缀: RPT (Report)
- 时间戳: 确保唯一性
- 随机字符: 增加安全性

### 订单状态

| 状态 | 说明 |
|------|------|
| WAIT_BUYER_PAY | 等待买家付款 |
| TRADE_SUCCESS | 交易成功 |
| TRADE_FINISHED | 交易完成 |
| TRADE_CLOSED | 交易关闭 |

---

## 🐛 常见问题

### Q1: 二维码生成失败

**错误**: `创建订单失败`

**解决**:
1. 检查应用ID和密钥是否正确
2. 检查网络连接
3. 查看后端日志

### Q2: 支付成功但未解锁

**原因**: 
- 支付回调未收到
- 前端轮询失败

**解决**:
1. 检查回调URL是否可访问
2. 查看后端日志
3. 手动查询订单状态

### Q3: 签名验证失败

**错误**: `签名验证失败`

**解决**:
1. 检查支付宝公钥是否正确
2. 检查字符编码（必须是UTF-8）
3. 检查签名类型（RSA2）

---

## 🔄 回调处理

### 内网穿透（开发环境）

本地开发时，支付宝无法直接访问 localhost，需要使用内网穿透工具：

#### 使用 ngrok

```bash
# 安装 ngrok
npm install -g ngrok

# 启动内网穿透
ngrok http 3000
```

会得到一个公网URL：
```
https://abc123.ngrok.io -> http://localhost:3000
```

更新回调URL：
```javascript
formData.addField('notifyUrl', 'https://abc123.ngrok.io/api/payment/alipay/notify');
```

#### 使用 localtunnel

```bash
# 安装
npm install -g localtunnel

# 启动
lt --port 3000
```

---

## 📈 生产环境部署

### 1. 使用HTTPS

支付宝要求回调URL必须使用HTTPS：

```javascript
// 生产环境配置
const notifyUrl = process.env.NODE_ENV === 'production'
    ? 'https://yourdomain.com/api/payment/alipay/notify'
    : 'http://localhost:3000/api/payment/alipay/notify';
```

### 2. 数据库存储

保存订单信息到数据库：

```javascript
// 创建订单时
await db.orders.create({
    outTradeNo: outTradeNo,
    reportId: reportId,
    amount: amount,
    status: 'WAIT_BUYER_PAY',
    createdAt: new Date()
});

// 支付成功时
await db.orders.update({
    status: 'TRADE_SUCCESS',
    paidAt: new Date(),
    tradeNo: trade_no
}, {
    where: { outTradeNo: out_trade_no }
});
```

### 3. 日志记录

记录所有支付相关操作：

```javascript
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'payment.log' })
    ]
});

logger.info('创建支付订单', { outTradeNo, amount });
logger.info('支付成功', { outTradeNo, tradeNo });
```

---

## ✅ 检查清单

部署前检查：

- [ ] 应用ID和密钥已正确配置
- [ ] 回调URL可以从公网访问
- [ ] 使用HTTPS协议
- [ ] 订单信息保存到数据库
- [ ] 添加了日志记录
- [ ] 测试了完整支付流程
- [ ] 配置了退款接口（可选）
- [ ] 添加了异常处理

---

## 🎉 总结

**当前状态**：
- ✅ 支付宝当面付已集成
- ✅ 前后端代码已完成
- ✅ 支持扫码支付
- ✅ 自动轮询支付状态
- ✅ 支付成功自动解锁

**下一步**：
1. 运行 `npm install` 安装依赖
2. 运行 `npm start` 启动服务器
3. 测试完整支付流程
4. 配置生产环境

**注意事项**：
- 开发环境需要内网穿透
- 生产环境必须使用HTTPS
- 妥善保管应用私钥
