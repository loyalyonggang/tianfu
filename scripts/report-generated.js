// 个性化报告页面JavaScript

// API配置 - 使用DeepSeek V3.1免费模型
const OPENAI_CONFIG = {
    // 直接调用（DeepSeek支持CORS，无需后端代理）
    useBackend: false,
    apiKey: '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',
    apiUrl: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'deepseek/deepseek-chat:free', // DeepSeek V3.1 免费模型
    temperature: 0.7,
    maxTokens: 3000
};

// 报告数据
let reportData = {
    isPaid: false,
    totalScore: 0,
    dimensions: [],
    analysis: {},
    userInfo: {}
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 从localStorage获取测评答案
    const answers = loadAnswersFromStorage();
    
    if (!answers || Object.keys(answers).length === 0) {
        alert('未找到测评数据，请先完成测评！');
        window.location.href = 'assessment.html';
        return;
    }
    
    // 显示用户信息
    displayUserInfo(answers);
    
    // 生成报告
    generateReport(answers);
    
    // 初始化倒计时
    startCountdown();
    
    // 监听滚动，显示固定解锁按钮
    window.addEventListener('scroll', handleScroll);
});

// 从localStorage加载答案
function loadAnswersFromStorage() {
    // 优先从最终提交的数据读取
    let saved = localStorage.getItem('assessment_final');
    if (saved) {
        const data = JSON.parse(saved);
        console.log('从assessment_final加载数据:', data);
        return data.answers || {};
    }
    
    // 如果没有，尝试从进度数据读取（用户可能直接访问报告页）
    saved = localStorage.getItem('assessment_progress');
    if (saved) {
        const data = JSON.parse(saved);
        console.log('从assessment_progress加载数据:', data);
        return data.answers || {};
    }
    
    console.error('未找到任何测评数据');
    return {};
}

// 显示用户信息
function displayUserInfo(answers) {
    const userName = answers[36] || '用户';
    document.getElementById('userName').textContent = userName;
    
    // 显示报告日期和编号
    const now = new Date();
    document.getElementById('reportDate').textContent = now.toLocaleDateString('zh-CN');
    document.getElementById('reportId').textContent = 'R' + Date.now().toString().slice(-8);
    
    // 保存用户信息
    reportData.userInfo = {
        name: answers[36] || '',
        gender: answers[37] || '',
        age: answers[38] || '',
        industry: answers[39] || '',
        income: answers[40] || '',
        wechat: answers[41] || '',
        phone: answers[45] || ''
    };
}

// 生成报告
async function generateReport(answers) {
    try {
        // 显示加载状态
        showLoadingState();
        
        // 计算8大维度得分
        const dimensions = calculateDimensions(answers);
        reportData.dimensions = dimensions;
        
        // 计算总分
        const totalScore = Math.round(dimensions.reduce((sum, d) => sum + d.score, 0) / dimensions.length);
        reportData.totalScore = totalScore;
        
        // 调用OpenAI API生成分析（如果配置了API Key）
        if (OPENAI_CONFIG.apiKey !== 'YOUR_OPENAI_API_KEY') {
            const analysis = await callOpenAI(answers, dimensions);
            reportData.analysis = analysis;
        } else {
            // 使用模拟数据（演示模式）
            reportData.analysis = generateMockAnalysis(dimensions);
        }
        
        // 渲染报告
        renderReport();
        
    } catch (error) {
        console.error('生成报告失败:', error);
        alert('报告生成失败，请稍后重试');
    }
}

// 显示加载状态
function showLoadingState() {
    // 可以添加加载动画
    console.log('正在生成报告...');
}

// 计算8大维度得分
function calculateDimensions(answers) {
    // 8大维度的题目映射
    const dimensionMapping = {
        'A-存在感': [15, 16, 22, 29, 30], // 题目1, 16, 22, 29, 30
        'B-引力场': [2, 9, 10, 23, 30],   // 题目2, 9, 10, 23, 30
        'C-说服力': [3, 10, 17, 24, 31],  // 题目3, 10, 17, 24, 31
        'D-价值力': [4, 11, 18, 25, 32],  // 题目4, 11, 18, 25, 32
        'E-兑现力': [5, 12, 19, 26, 33],  // 题目5, 12, 19, 26, 33
        'F-复利力': [6, 7, 14, 21, 28],   // 题目6, 7, 14, 21, 28
        'G-精力值': [8, 13, 20, 27, 34],  // 题目8, 13, 20, 27, 34
        'H-效率值': [7, 14, 21, 28, 35]   // 题目7, 14, 21, 28, 35
    };
    
    const dimensions = [];
    
    for (const [name, questionIds] of Object.entries(dimensionMapping)) {
        let totalScore = 0;
        let count = 0;
        
        questionIds.forEach(id => {
            const answer = answers[id];
            if (answer !== undefined && answer !== null) {
                totalScore += answer;
                count++;
            }
        });
        
        const avgScore = count > 0 ? totalScore / count : 0;
        const score = Math.round((avgScore / 5) * 100); // 转换为百分制
        
        dimensions.push({
            label: name.split('-')[0],
            name: name.split('-')[1],
            score: score,
            level: getScoreLevel(score)
        });
    }
    
    return dimensions;
}

// 获取分数等级
function getScoreLevel(score) {
    if (score >= 80) return '优秀';
    if (score >= 60) return '良好';
    if (score >= 40) return '一般';
    return '需改进';
}

// 调用DeepSeek AI生成报告
async function callOpenAI(answers, dimensions) {
    const prompt = buildPrompt(answers, dimensions);
    
    const messages = [
        {
            role: 'system',
            content: '你是一位天赋人生教练 AI 分析师，专注于帮助知识IP创业者发现自己的天赋优势，并提供具体可落地的商业发展建议。你的分析要专业、深入、温暖且充满洞察力。'
        },
        {
            role: 'user',
            content: prompt
        }
    ];
    
    try {
        console.log('🤖 调用DeepSeek V3.1 AI生成报告...');
        
        const response = await fetch(OPENAI_CONFIG.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_CONFIG.apiKey}`,
                'HTTP-Referer': window.location.origin,
                'X-Title': '真我文化商业诊断系统'
            },
            body: JSON.stringify({
                model: OPENAI_CONFIG.model,
                messages: messages,
                temperature: OPENAI_CONFIG.temperature,
                max_tokens: OPENAI_CONFIG.maxTokens
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('❌ API错误:', errorData);
            throw new Error(`API调用失败: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ DeepSeek AI调用成功！');
        
        const content = data.choices[0].message.content;
        
        return parseAIResponse(content);
        
    } catch (error) {
        console.error('❌ AI API调用失败:', error);
        console.log('📊 使用演示数据生成报告');
        // 静默降级到演示数据
        return generateMockAnalysis(dimensions);
    }
}

// 构建提示词
function buildPrompt(answers, dimensions) {
    const userInfo = reportData.userInfo;
    
    let prompt = `作为一位天赋人生教练，请为以下用户生成一份温暖、专业且充满洞察力的商业诊断报告：\n\n`;
    
    prompt += `【用户基本信息】\n`;
    prompt += `- 称呼：${userInfo.name || '学员'}\n`;
    prompt += `- 性别：${userInfo.gender || '未提供'}\n`;
    prompt += `- 年龄段：${userInfo.age || '未提供'}\n`;
    prompt += `- 所在行业：${userInfo.industry || '未提供'}\n`;
    prompt += `- 当前月收入：${userInfo.income || '未提供'}\n\n`;
    
    prompt += `【8大商业维度评估结果】\n`;
    dimensions.forEach(d => {
        prompt += `${d.label}. ${d.name}：${d.score}/100分 (${d.level})\n`;
    });
    
    prompt += `\n【分析要求】\n`;
    prompt += `1. 用温暖、鼓励的语气，像一位经验丰富的人生教练\n`;
    prompt += `2. 深入分析用户的天赋优势和潜力\n`;
    prompt += `3. 指出具体可改进的地方，但要给予信心\n`;
    prompt += `4. 提供可落地的行动建议，不要空泛\n`;
    prompt += `5. 字数控制在合理范围内\n\n`;
    
    prompt += `请按以下JSON格式返回分析结果：\n`;
    prompt += `{\n`;
    prompt += `  "summary": "一句话总结用户的整体状态，要温暖且有洞察力",\n`;
    prompt += `  "dimensionAnalysis": [\n`;
    prompt += `    {\n`;
    prompt += `      "dimension": "维度名称（如：存在感）",\n`;
    prompt += `      "currentState": "当前状态的具体描述，结合得分分析",\n`;
    prompt += `      "problems": "存在的主要问题或挑战，语气要温和",\n`;
    prompt += `      "suggestions": "3-5条具体可行的改进建议"\n`;
    prompt += `    }\n`;
    prompt += `    // 为所有8个维度生成分析\n`;
    prompt += `  ],\n`;
    prompt += `  "coreProblems": [\n`;
    prompt += `    "当前最需要突破的核心问题1",\n`;
    prompt += `    "当前最需要突破的核心问题2",\n`;
    prompt += `    "当前最需要突破的核心问题3"\n`;
    prompt += `  ],\n`;
    prompt += `  "actionPlan": {\n`;
    prompt += `    "immediate": ["本周可以立即开始的行动1", "本周可以立即开始的行动2"],\n`;
    prompt += `    "shortTerm": ["1个月内要达成的目标1", "1个月内要达成的目标2"],\n`;
    prompt += `    "midTerm": ["3个月内要实现的突破1", "3个月内要实现的突破2"]\n`;
    prompt += `  }\n`;
    prompt += `}\n\n`;
    
    prompt += `重要提示：请确保返回的是纯JSON格式，不要包含任何其他文字说明。`;
    
    return prompt;
}

// 解析AI响应
function parseAIResponse(content) {
    try {
        // 尝试解析JSON
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
    } catch (error) {
        console.error('解析AI响应失败:', error);
    }
    
    // 如果解析失败，返回模拟数据
    return generateMockAnalysis(reportData.dimensions);
}

// 生成模拟分析数据（演示模式）
function generateMockAnalysis(dimensions) {
    return {
        summary: '您的商业模式整体表现优秀，在多个维度展现出较强的竞争力，但仍有提升空间。',
        dimensionAnalysis: dimensions.map(d => ({
            dimension: d.name,
            currentState: `您在${d.name}方面的表现${d.level}，得分${d.score}分。`,
            problems: `当前主要问题是缺乏系统化的${d.name}策略。`,
            suggestions: `建议您通过持续学习和实践，提升${d.name}能力。`
        })),
        coreProblems: [
            '个人品牌定位不够清晰',
            '内容营销策略需要优化',
            '客户转化流程有待完善'
        ],
        actionPlan: {
            immediate: ['明确目标客户画像', '优化个人简介'],
            shortTerm: ['制定内容日历', '建立客户反馈机制'],
            midTerm: ['打造爆款产品', '建立自动化营销系统']
        }
    };
}

// 渲染报告
function renderReport() {
    // 渲染综合评分
    renderTotalScore();
    
    // 渲染雷达图
    renderRadarChart();
    
    // 渲染维度卡片
    renderDimensionsGrid();
    
    // 渲染分析预览（前2个维度）
    renderAnalysisPreview();
}

// 渲染综合评分
function renderTotalScore() {
    const score = reportData.totalScore;
    const level = getScoreLevel(score);
    
    // 动画显示分数
    animateScore(score);
    
    // 显示等级
    document.getElementById('scoreLevel').innerHTML = `<span class="level-badge">${level}</span>`;
    
    // 显示总结
    document.getElementById('scoreSummary').textContent = reportData.analysis.summary;
}

// 分数动画
function animateScore(targetScore) {
    const element = document.getElementById('totalScore');
    const circle = document.getElementById('scoreCircle');
    const circumference = 2 * Math.PI * 90;
    
    let currentScore = 0;
    const duration = 2000;
    const startTime = Date.now();
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        currentScore = Math.floor(targetScore * progress);
        element.textContent = currentScore;
        
        // 更新圆环
        const offset = circumference - (circumference * currentScore / 100);
        circle.style.strokeDashoffset = offset;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    update();
}

// 渲染雷达图
function renderRadarChart() {
    const ctx = document.getElementById('radarChart').getContext('2d');
    const dimensions = reportData.dimensions;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: dimensions.map(d => d.name),
            datasets: [{
                label: '当前得分',
                data: dimensions.map(d => d.score),
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(102, 126, 234, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(102, 126, 234, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        font: { size: 12 }
                    },
                    pointLabels: {
                        font: { size: 14, weight: 'bold' }
                    }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// 渲染维度卡片
function renderDimensionsGrid() {
    const container = document.getElementById('dimensionsGrid');
    const dimensions = reportData.dimensions;
    
    container.innerHTML = dimensions.map(d => `
        <div class="dimension-card">
            <div class="dimension-label">${d.label}</div>
            <div class="dimension-name">${d.name}</div>
            <div class="dimension-score">${d.score}</div>
        </div>
    `).join('');
}

// 渲染分析预览（前2个维度）
function renderAnalysisPreview() {
    const container = document.getElementById('analysisPreview');
    const analysis = reportData.analysis.dimensionAnalysis.slice(0, 2);
    
    container.innerHTML = analysis.map((item, index) => `
        <div class="analysis-item">
            <h3>
                <span class="analysis-tag">${reportData.dimensions[index].label}</span>
                ${item.dimension}
            </h3>
            <p><strong>当前状态：</strong>${item.currentState}</p>
            <p><strong>主要问题：</strong>${item.problems}</p>
            <p><strong>改进建议：</strong>${item.suggestions}</p>
        </div>
    `).join('');
}

// 显示付费弹窗
function showPaymentModal() {
    document.getElementById('paymentModal').style.display = 'flex';
}

// 关闭付费弹窗
function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

// 选择支付方式
function selectPaymentMethod(method) {
    closePaymentModal();
    
    const methodNames = {
        'wechat': '微信',
        'alipay': '支付宝'
    };
    
    document.getElementById('paymentMethodTitle').textContent = methodNames[method] + '支付';
    document.getElementById('paymentMethodName').textContent = methodNames[method];
    document.getElementById('qrcodeModal').style.display = 'flex';
    
    // 实际使用时，这里应该调用后端API生成支付二维码
    // generatePaymentQRCode(method);
}

// 关闭二维码弹窗
function closeQrcodeModal() {
    document.getElementById('qrcodeModal').style.display = 'none';
}

// 模拟支付成功（测试用）
function simulatePaymentSuccess() {
    closeQrcodeModal();
    
    // 显示成功动画
    alert('🎉 支付成功！正在解锁完整报告...');
    
    // 解锁报告
    unlockReport();
}

// 解锁报告
function unlockReport() {
    reportData.isPaid = true;
    
    // 移除模糊效果
    const blurContent = document.querySelector('.blur-content');
    const unlockOverlay = document.querySelector('.unlock-overlay');
    
    blurContent.style.filter = 'none';
    blurContent.style.userSelect = 'auto';
    blurContent.style.pointerEvents = 'auto';
    unlockOverlay.style.display = 'none';
    
    // 渲染完整内容
    renderFullContent();
    
    // 隐藏固定解锁按钮
    document.getElementById('fixedUnlockBar').style.display = 'none';
    
    // 显示导出按钮
    document.getElementById('exportBtn').style.display = 'inline-flex';
    
    // 保存付费状态
    localStorage.setItem('report_paid', 'true');
}

// 渲染完整内容
function renderFullContent() {
    const lockedContent = document.getElementById('lockedContent');
    const analysis = reportData.analysis;
    
    let html = '';
    
    // 核心问题诊断
    html += `<h2 class="section-title">🔍 核心问题诊断</h2>`;
    html += `<div class="diagnosis-content">`;
    html += `<ol>`;
    analysis.coreProblems.forEach(problem => {
        html += `<li>${problem}</li>`;
    });
    html += `</ol>`;
    html += `</div>`;
    
    // 详细分析（剩余维度）
    html += `<h2 class="section-title">💡 详细分析</h2>`;
    analysis.dimensionAnalysis.slice(2).forEach((item, index) => {
        html += `<div class="analysis-item">`;
        html += `<h3><span class="analysis-tag">${reportData.dimensions[index + 2].label}</span>${item.dimension}</h3>`;
        html += `<p><strong>当前状态：</strong>${item.currentState}</p>`;
        html += `<p><strong>主要问题：</strong>${item.problems}</p>`;
        html += `<p><strong>改进建议：</strong>${item.suggestions}</p>`;
        html += `</div>`;
    });
    
    // 行动计划
    html += `<h2 class="section-title">📅 3个月行动计划</h2>`;
    html += `<div class="action-plan-content">`;
    html += `<h3>立即行动（本周）</h3><ul>`;
    analysis.actionPlan.immediate.forEach(action => {
        html += `<li>${action}</li>`;
    });
    html += `</ul>`;
    html += `<h3>短期目标（1个月）</h3><ul>`;
    analysis.actionPlan.shortTerm.forEach(action => {
        html += `<li>${action}</li>`;
    });
    html += `</ul>`;
    html += `<h3>中期目标（3个月）</h3><ul>`;
    analysis.actionPlan.midTerm.forEach(action => {
        html += `<li>${action}</li>`;
    });
    html += `</ul>`;
    html += `</div>`;
    
    lockedContent.innerHTML = html;
}

// 倒计时
function startCountdown() {
    let timeLeft = 24 * 60 * 60 - 15; // 23:59:45
    
    setInterval(() => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        
        const display = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('countdown').textContent = display;
        
        timeLeft--;
        if (timeLeft < 0) timeLeft = 24 * 60 * 60 - 15;
    }, 1000);
}

// 监听滚动
function handleScroll() {
    const lockedSection = document.querySelector('.locked-section');
    const fixedBar = document.getElementById('fixedUnlockBar');
    
    if (!reportData.isPaid && lockedSection) {
        const rect = lockedSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            fixedBar.style.display = 'block';
        } else {
            fixedBar.style.display = 'none';
        }
    }
}

// 导出功能
function showExportOptions() {
    document.getElementById('exportModal').style.display = 'flex';
}

function closeExportModal() {
    document.getElementById('exportModal').style.display = 'none';
}

function exportToPDF() {
    alert('PDF导出功能开发中...\n需要集成 jsPDF 和 html2canvas 库');
    // 实际实现需要引入相关库
}

function exportToImage() {
    alert('图片导出功能开发中...\n需要集成 html2canvas 库');
    // 实际实现需要引入相关库
}

function showEmailInput() {
    document.getElementById('emailInputSection').style.display = 'flex';
}

function sendToEmail() {
    const email = document.getElementById('emailInput').value;
    if (!email || !email.includes('@')) {
        alert('请输入有效的邮箱地址');
        return;
    }
    
    alert(`报告将发送到：${email}\n（演示模式，实际需要后端支持）`);
    closeExportModal();
}
