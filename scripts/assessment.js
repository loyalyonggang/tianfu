// 测评问卷JavaScript

// 问题数据（从test.txt提取的35道题）
const questions = [
    { id: 1, text: "你很清晰地知道，如何突破你当下业务的10倍的营收规模", type: "scale" },
    { id: 2, text: "你清楚目标客户常出现的地方，并且有策略出现在那里吸引到他们", type: "scale" },
    { id: 3, text: "潜在客户能复述出你能帮他们解决什么问题", type: "scale" },
    { id: 4, text: "你的产品/服务有明确的可视化结果或关键变化点", type: "scale" },
    { id: 5, text: "你的产品/服务能够有效、高效地帮助客户获得他们想要的结果", type: "scale" },
    { id: 6, text: "你能长期稳定输出，而不是频繁中断", type: "scale" },
    { id: 7, text: "你用工具/模板等把个人时间转化为更大产出", type: "scale" },
    { id: 8, text: "你在做着让你享受并且愉快的事业，即便是收入降低也愿意做下去", type: "scale" },
    { id: 9, text: "你的内容能让客户停下来、关注或主动私信你", type: "scale" },
    { id: 10, text: "客户常觉得现在不买你的产品/服务会亏，而不是以后再说", type: "scale" },
    { id: 11, text: "客户第一次体验你的产品/服务就能感到明显的价值", type: "scale" },
    { id: 12, text: "你有可复制的交付流程（SOP），保证一致体验", type: "scale" },
    { id: 13, text: "遇到挫折或低潮时，你能快速调整状态", type: "scale" },
    { id: 14, text: "你有自动化或半自动化流程来减少重复劳动", type: "scale" },
    { id: 15, text: "你能在30秒内清楚介绍自己和定位", type: "scale" },
    { id: 16, text: "经常有陌生人主动来问你问题或咨询", type: "scale" },
    { id: 17, text: "你能清晰说出自己和竞争对手的不同点", type: "scale" },
    { id: 18, text: "你的产品体系能覆盖处于不同意识层级的客户", type: "scale" },
    { id: 19, text: "客户完成服务后，会很愿意主动给好评和推荐", type: "scale" },
    { id: 20, text: "你的生活节奏能让你保持精力充沛，不会总觉得疲倦", type: "scale" },
    { id: 21, text: "你会用AI工具明显提升工作效率", type: "scale" },
    { id: 22, text: "你非常清晰你服务的人群是谁以及不是谁", type: "scale" },
    { id: 23, text: "客户在用完你的产品后，会主动向别人介绍你的产品", type: "scale" },
    { id: 24, text: "你能够非常轻松地说服客户为什么选择你的产品/服务，而不是其他人", type: "scale" },
    { id: 25, text: "你的定价高于市场平均水平，并让客户觉得值", type: "scale" },
    { id: 26, text: "你有清晰的产品体系，可以让客户留存或复购", type: "scale" },
    { id: 27, text: "你会定期补充能量/灵感（读书、运动、旅游等）", type: "scale" },
    { id: 28, text: "你能把一条内容在多平台复用并产生价值", type: "scale" },
    { id: 29, text: "你的内容或风格容易让人记住，而不是看完就忘", type: "scale" },
    { id: 30, text: "你能在一次活动中吸引到一批人的新关注", type: "scale" },
    { id: 31, text: "潜在客户大多愿意按你的流程试用或付费", type: "scale" },
    { id: 32, text: "你非常清晰地知道你的工作能够为别人带来的价值", type: "scale" },
    { id: 33, text: "你能用数据或案例来证明交付效果", type: "scale" },
    { id: 34, text: "你多数情况下能保质保量地完成你制定的计划", type: "scale" },
    { id: 35, text: "你用数据（获客成本、转化率等）来调整策略，而不是靠感觉", type: "scale" },
    { id: 36, text: "怎么称呼你", type: "text", placeholder: "请输入您的称呼" },
    { id: 37, text: "性别", type: "choice", options: ["男", "女"] },
    { id: 38, text: "年龄", type: "choice", options: ["28岁以下", "28-35岁", "35-40岁", "40-50岁", "50岁以上"] },
    { id: 39, text: "请简单描述你目前的行业/职业是什么", type: "text", placeholder: "请输入" },
    { id: 40, text: "你目前的月收入", type: "choice", options: ["3000以下", "3000-1w", "1w-5w", "5w-10w", "10w以上"] },
    { id: 41, text: "你的微信号（请务必确保100%正确，如通过初审，我们会在12小时内添加你）", type: "text", placeholder: "请输入微信号" },
    { id: 42, text: "如果后期有机会通过审核正式学习落地高客单IP，你觉得相比其他学员，自己最大的优势是什么？", type: "textarea", placeholder: "请输入" },
    { id: 43, text: "如果通过审核，并有机会录取为学员，计划什么时候开始学习和改变？", type: "choice", options: ["立刻开始", "1-3天", ">3天"] },
    { id: 44, text: "请填写意向通话的日期和时间", type: "text", placeholder: "例如：2025年11月1日 下午3点" },
    { id: 45, text: "手机号码（请务必保证填写准确）", type: "text", placeholder: "请输入手机号" }
];

const scaleOptions = [
    { value: 1, label: "非常不符合" },
    { value: 2, label: "不太符合" },
    { value: 3, label: "难以判断" },
    { value: 4, label: "比较符合" },
    { value: 5, label: "非常符合" }
];

let currentQuestion = 0;
let answers = {};

// 本地存储键名
const STORAGE_KEY = 'assessment_progress';

// 加载保存的进度
function loadProgress() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        const data = JSON.parse(saved);
        answers = data.answers || {};
        currentQuestion = data.currentQuestion || 0;
        return true;
    }
    return false;
}

// 保存进度
function saveProgress() {
    const data = {
        answers: answers,
        currentQuestion: currentQuestion,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// 清除进度
function clearProgress() {
    localStorage.removeItem(STORAGE_KEY);
}

// 开始测评
function startAssessment() {
    document.getElementById('introPage').style.display = 'none';
    document.getElementById('questionsPage').style.display = 'block';
    showQuestion(0);
}

// 继续测评
function continueAssessment() {
    if (loadProgress()) {
        document.getElementById('introPage').style.display = 'none';
        document.getElementById('questionsPage').style.display = 'block';
        showQuestion(currentQuestion);
    } else {
        startAssessment();
    }
}

// 返回首页
function returnToHome() {
    saveProgress();
    window.location.href = 'index.html';
}

// 显示问题
function showQuestion(index) {
    currentQuestion = index;
    const question = questions[index];
    const container = document.getElementById('questionContainer');
    
    let html = `
        <div class="question-card">
            <div class="question-number">问题 ${index + 1} / ${questions.length}</div>
            <div class="question-text">${question.text}</div>
    `;
    
    if (question.type === 'scale') {
        html += '<div class="options-container">';
        scaleOptions.forEach(option => {
            const selected = answers[question.id] === option.value ? 'selected' : '';
            html += `
                <button class="option-button ${selected}" onclick="selectOption(${question.id}, ${option.value})">
                    <span>${option.label}</span>
                </button>
            `;
        });
        html += '</div>';
    } else if (question.type === 'choice') {
        html += '<div class="options-container">';
        question.options.forEach((option, i) => {
            const selected = answers[question.id] === option ? 'selected' : '';
            html += `
                <button class="option-button ${selected}" onclick="selectChoice(${question.id}, '${option}')">
                    <span>${option}</span>
                </button>
            `;
        });
        html += '</div>';
    } else if (question.type === 'text') {
        html += `<input type="text" class="text-input" id="input-${question.id}" 
                 placeholder="${question.placeholder}" 
                 value="${answers[question.id] || ''}"
                 onchange="saveTextAnswer(${question.id}, this.value)">`;
    } else if (question.type === 'textarea') {
        html += `<textarea class="text-input" id="input-${question.id}" 
                 placeholder="${question.placeholder}" 
                 rows="4"
                 onchange="saveTextAnswer(${question.id}, this.value)">${answers[question.id] || ''}</textarea>`;
    }
    
    html += '</div>';
    container.innerHTML = html;
    
    // 更新进度
    updateProgress();
    
    // 更新按钮显示
    document.getElementById('prevBtn').style.display = index > 0 ? 'inline-flex' : 'none';
    document.getElementById('nextBtn').style.display = index < questions.length - 1 ? 'inline-flex' : 'none';
    document.getElementById('submitBtn').style.display = index === questions.length - 1 ? 'inline-flex' : 'none';
}

// 选择选项
function selectOption(questionId, value) {
    answers[questionId] = value;
    saveProgress(); // 自动保存进度
    
    // 更新选中状态（不重新渲染，避免闪烁）
    const buttons = document.querySelectorAll('.option-button');
    buttons.forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.closest('.option-button').classList.add('selected');
    
    // 自动跳转到下一题
    setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
            nextQuestion();
        }
    }, 300);
}

// 选择选项（单选）
function selectChoice(questionId, value) {
    answers[questionId] = value;
    saveProgress(); // 自动保存进度
    
    // 更新选中状态（不重新渲染，避免闪烁）
    const buttons = document.querySelectorAll('.option-button');
    buttons.forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.closest('.option-button').classList.add('selected');
    
    // 自动跳转到下一题
    setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
            nextQuestion();
        }
    }, 300);
}

// 保存文本答案
function saveTextAnswer(questionId, value) {
    answers[questionId] = value;
    saveProgress(); // 自动保存进度
}

// 下一题
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        showQuestion(currentQuestion + 1);
    }
}

// 上一题
function previousQuestion() {
    if (currentQuestion > 0) {
        showQuestion(currentQuestion - 1);
    }
}

// 更新进度
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = Math.round(progress) + '%';
}

// 提交测评
function submitAssessment() {
    // 检查必填项
    const requiredQuestions = questions.filter(q => q.id <= 35 || q.id === 36 || q.id === 41 || q.id === 45);
    const unanswered = requiredQuestions.filter(q => !answers[q.id]);
    
    if (unanswered.length > 0) {
        alert(`请完成所有必填题目！还有 ${unanswered.length} 道题未回答。`);
        return;
    }
    
    // 清除保存的进度
    clearProgress();
    
    // 显示加载页面
    document.getElementById('questionsPage').style.display = 'none';
    document.getElementById('loadingPage').style.display = 'flex';
    
    // 模拟生成报告过程
    simulateReportGeneration();
}

// 模拟报告生成
function simulateReportGeneration() {
    const steps = document.querySelectorAll('.step-item');
    const loadingTexts = [
        '正在分析你的商业模式...',
        '正在评估你的市场定位...',
        '正在计算各维度得分...',
        '正在生成可视化图表...',
        '正在准备个性化建议...'
    ];
    
    let currentStep = 0;
    
    const interval = setInterval(() => {
        if (currentStep < steps.length) {
            steps[currentStep].classList.add('active');
            document.getElementById('loadingText').textContent = loadingTexts[currentStep];
            currentStep++;
        } else {
            clearInterval(interval);
            // 跳转到报告页面
            setTimeout(() => {
                window.location.href = 'business-assessment.html';
            }, 1000);
        }
    }, 1500);
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否有保存的进度
    const hasProgress = loadProgress();
    
    if (hasProgress) {
        // 显示继续测评的提示
        const introPage = document.getElementById('introPage');
        if (introPage) {
            const continueHint = document.createElement('div');
            continueHint.className = 'continue-hint';
            continueHint.innerHTML = `
                <div class="hint-content">
                    <span class="hint-icon">📝</span>
                    <p>检测到您有未完成的测评</p>
                    <div class="hint-buttons">
                        <button class="btn btn-primary" onclick="continueAssessment()">
                            继续测评 (第${currentQuestion + 1}题)
                        </button>
                        <button class="btn btn-secondary" onclick="startNewAssessment()">
                            重新开始
                        </button>
                    </div>
                </div>
            `;
            introPage.insertBefore(continueHint, introPage.firstChild);
        }
    }
});

// 重新开始测评
function startNewAssessment() {
    if (confirm('确定要重新开始吗？之前的答案将被清除。')) {
        clearProgress();
        answers = {};
        currentQuestion = 0;
        // 移除提示
        const hint = document.querySelector('.continue-hint');
        if (hint) hint.remove();
        startAssessment();
    }
}
