// 简单的Node.js后端服务器，用于代理OpenRouter API调用
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

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

// 启动服务器
app.listen(PORT, () => {
    console.log(`\n🚀 服务器已启动！`);
    console.log(`📍 访问地址: http://localhost:${PORT}`);
    console.log(`📊 API端点: http://localhost:${PORT}/api/generate-report`);
    console.log(`💚 健康检查: http://localhost:${PORT}/api/health\n`);
});
