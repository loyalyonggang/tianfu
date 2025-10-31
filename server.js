// 简单的Node.js后端服务器，用于代理OpenRouter API调用和支付宝支付
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const AlipaySdk = require('alipay-sdk').default;
const AlipayFormData = require('alipay-sdk/lib/form').default;

const app = express();
const PORT = 3000;

// 支付宝配置
const ALIPAY_CONFIG = require('./alipay-config');

// 初始化支付宝SDK
const alipaySdk = new AlipaySdk({
    appId: ALIPAY_CONFIG.appId,
    privateKey: ALIPAY_CONFIG.privateKey,
    alipayPublicKey: ALIPAY_CONFIG.alipayPublicKey,
    gateway: ALIPAY_CONFIG.gatewayUrl,
    charset: ALIPAY_CONFIG.charset,
    signType: ALIPAY_CONFIG.signType
});

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // 提供静态文件

// OpenRouter API配置
const OPENROUTER_CONFIG = {
    apiKey: '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',
    apiUrl: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'google/gemma-2-9b-it:free'
};

// API代理端点
app.post('/api/generate-report', async (req, res) => {
    try {
        const { messages, temperature = 0.7, maxTokens = 3000 } = req.body;

        console.log('收到报告生成请求');

        const response = await fetch(OPENROUTER_CONFIG.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENROUTER_CONFIG.apiKey}`,
                'HTTP-Referer': 'http://localhost:3000',
                'X-Title': '真我文化商业诊断系统'
            },
            body: JSON.stringify({
                model: OPENROUTER_CONFIG.model,
                messages: messages,
                temperature: temperature,
                max_tokens: maxTokens
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('OpenRouter API错误:', errorData);
            return res.status(response.status).json({ 
                error: 'API调用失败', 
                details: errorData 
            });
        }

        const data = await response.json();
        console.log('API调用成功');
        
        res.json(data);

    } catch (error) {
        console.error('服务器错误:', error);
        res.status(500).json({ 
            error: '服务器内部错误', 
            message: error.message 
        });
    }
});

// 健康检查端点
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 支付宝当面付 - 创建订单
app.post('/api/payment/alipay/create', async (req, res) => {
    try {
        const { reportId, amount, subject = '商业诊断报告' } = req.body;

        // 生成订单号
        const outTradeNo = 'RPT' + Date.now() + Math.random().toString(36).substr(2, 9);

        console.log('创建支付宝订单:', { outTradeNo, amount, subject });

        // 使用 SDK 的 exec 方法调用支付宝接口
        const result = await alipaySdk.exec(
            'alipay.trade.precreate',
            {
                notifyUrl: 'http://localhost:3000/api/payment/alipay/notify',
                bizContent: {
                    out_trade_no: outTradeNo,  // 注意：支付宝要求使用下划线命名
                    product_code: 'FACE_TO_FACE_PAYMENT',
                    total_amount: amount,
                    subject: subject,
                    body: `报告编号: ${reportId}`,
                    timeout_express: '30m'
                }
            }
        );

        console.log('支付宝返回数据类型:', typeof result);
        console.log('支付宝返回数据:', result);

        // 支付宝SDK可能返回对象或URL字符串
        let qrCode = null;
        
        if (typeof result === 'object' && result !== null) {
            // 情况1: SDK直接返回了解析后的对象
            console.log('✅ 返回的是对象，直接获取二维码');
            
            // 检查返回码
            if (result.code === '10000') {
                qrCode = result.qrCode;
                console.log('✅ 成功获取二维码URL:', qrCode);
            } else {
                const errorMsg = `支付宝返回错误: ${result.msg} (${result.sub_msg || ''})`;
                console.error(errorMsg);
                throw new Error(errorMsg);
            }
            
        } else if (typeof result === 'string') {
            // 情况2: SDK返回URL字符串，需要请求
            console.log('返回的是URL字符串，正在请求...');
            
            try {
                const response = await fetch(result);
                const responseText = await response.text();
                console.log('支付宝响应文本:', responseText);
                
                // 解析JSON响应
                const data = JSON.parse(responseText);
                console.log('解析后的JSON:', JSON.stringify(data, null, 2));
                
                // 从响应中获取二维码
                if (data.alipay_trade_precreate_response) {
                    const precreateResponse = data.alipay_trade_precreate_response;
                    qrCode = precreateResponse.qr_code;
                    
                    console.log('支付宝返回码:', precreateResponse.code);
                    console.log('支付宝返回消息:', precreateResponse.msg);
                    console.log('二维码URL:', qrCode);
                    
                    // 检查是否成功
                    if (precreateResponse.code !== '10000') {
                        throw new Error(`支付宝返回错误: ${precreateResponse.msg} (${precreateResponse.sub_msg || ''})`);
                    }
                }
            } catch (e) {
                console.error('处理支付宝响应失败:', e);
                throw e;
            }
        }

        if (!qrCode) {
            console.error('❌ 未找到二维码URL');
            return res.status(500).json({
                success: false,
                error: '未能获取二维码',
                message: '支付宝返回数据中没有二维码URL',
                debug: result
            });
        }

        console.log('✅ 成功获取二维码URL:', qrCode);

        res.json({
            success: true,
            outTradeNo: outTradeNo,
            qrCode: qrCode,
            amount: amount
        });

    } catch (error) {
        console.error('创建支付宝订单失败:', error);
        res.status(500).json({
            success: false,
            error: '创建订单失败',
            message: error.message
        });
    }
});

// 支付宝支付回调
app.post('/api/payment/alipay/notify', async (req, res) => {
    try {
        console.log('收到支付宝回调:', req.body);

        // 验证签名
        const signVerified = alipaySdk.checkNotifySign(req.body);
        
        if (!signVerified) {
            console.error('签名验证失败');
            return res.send('fail');
        }

        const {
            out_trade_no,
            trade_no,
            trade_status,
            total_amount
        } = req.body;

        // 支付成功
        if (trade_status === 'TRADE_SUCCESS' || trade_status === 'TRADE_FINISHED') {
            console.log('支付成功:', {
                outTradeNo: out_trade_no,
                tradeNo: trade_no,
                amount: total_amount
            });

            // TODO: 更新数据库，解锁报告
            // await unlockReport(out_trade_no);

            res.send('success');
        } else {
            res.send('success');
        }

    } catch (error) {
        console.error('处理支付回调失败:', error);
        res.send('fail');
    }
});

// 查询支付状态
app.post('/api/payment/alipay/query', async (req, res) => {
    try {
        const { outTradeNo } = req.body;

        console.log('查询订单:', outTradeNo);

        // 使用正确的方式调用查询接口
        const result = await alipaySdk.exec(
            'alipay.trade.query',
            {
                bizContent: {
                    out_trade_no: outTradeNo  // 使用下划线命名
                }
            }
        );

        console.log('查询返回数据类型:', typeof result);
        console.log('查询返回数据:', result);

        let tradeStatus = null;
        let totalAmount = null;
        let tradeNo = null;

        // 处理返回的数据
        if (typeof result === 'object' && result !== null) {
            // SDK直接返回对象
            console.log('✅ 返回的是对象');
            
            if (result.code === '10000') {
                tradeStatus = result.tradeStatus;
                totalAmount = result.totalAmount;
                tradeNo = result.tradeNo;
                console.log('✅ 查询成功:', { tradeStatus, totalAmount, tradeNo });
            } else {
                const errorMsg = `查询失败: ${result.msg} (${result.sub_msg || ''})`;
                console.error(errorMsg);
                throw new Error(errorMsg);
            }
        } else if (typeof result === 'string') {
            // SDK返回URL字符串
            console.log('返回的是URL字符串，正在请求...');
            
            try {
                const response = await fetch(result);
                const data = await response.json();
                console.log('解析后的数据:', data);
                
                if (data.alipay_trade_query_response) {
                    const queryResponse = data.alipay_trade_query_response;
                    
                    if (queryResponse.code === '10000') {
                        tradeStatus = queryResponse.trade_status;
                        totalAmount = queryResponse.total_amount;
                        tradeNo = queryResponse.trade_no;
                    } else {
                        throw new Error(`查询失败: ${queryResponse.msg}`);
                    }
                }
            } catch (e) {
                console.error('处理查询响应失败:', e);
                throw e;
            }
        }

        res.json({
            success: true,
            tradeStatus: tradeStatus,
            totalAmount: totalAmount,
            tradeNo: tradeNo
        });

    } catch (error) {
        console.error('查询支付状态失败:', error);
        res.status(500).json({
            success: false,
            error: '查询失败',
            message: error.message
        });
    }
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`\n🚀 服务器已启动！`);
    console.log(`📍 访问地址: http://localhost:${PORT}`);
    console.log(`📊 API端点: http://localhost:${PORT}/api/generate-report`);
    console.log(`💚 健康检查: http://localhost:${PORT}/api/health\n`);
});
