// 首页动画和交互效果

// 滚动动画观察器
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 观察所有需要动画的元素
    const animateElements = document.querySelectorAll('.value-card, .dimension-item, .preview-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 数字动画
    animateNumbers();
});

// 数字滚动动画
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = stat.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
        
        if (!isNaN(numericValue)) {
            let current = 0;
            const increment = numericValue / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    current = numericValue;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + (isPlus ? '+' : '') + (isPercentage ? '%' : '');
            }, 30);
        }
    });
}

// 添加CSS动画类
const style = document.createElement('style');
style.textContent = `
    .value-card,
    .dimension-item,
    .preview-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .value-card.animate-in,
    .dimension-item.animate-in,
    .preview-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .value-card:nth-child(1) { transition-delay: 0.1s; }
    .value-card:nth-child(2) { transition-delay: 0.2s; }
    .value-card:nth-child(3) { transition-delay: 0.3s; }
    .value-card:nth-child(4) { transition-delay: 0.4s; }
    
    .dimension-item:nth-child(1) { transition-delay: 0.05s; }
    .dimension-item:nth-child(2) { transition-delay: 0.1s; }
    .dimension-item:nth-child(3) { transition-delay: 0.15s; }
    .dimension-item:nth-child(4) { transition-delay: 0.2s; }
    .dimension-item:nth-child(5) { transition-delay: 0.25s; }
    .dimension-item:nth-child(6) { transition-delay: 0.3s; }
    .dimension-item:nth-child(7) { transition-delay: 0.35s; }
    .dimension-item:nth-child(8) { transition-delay: 0.4s; }
`;
document.head.appendChild(style);
