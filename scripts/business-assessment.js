// 商业测评报告图表

// 检测是否为移动设备
const isMobile = window.innerWidth <= 768;

// A: 存在感 - 雷达图
const presenceCtx = document.getElementById('presenceChart');
if (presenceCtx) {
    new Chart(presenceCtx, {
        type: 'radar',
        data: {
            labels: ['形象调商', '高端仪态', '不俗装扮', '人格魅力', '深度整合'],
            datasets: [{
                data: [4.5, 5, 5, 4.8, 4.2],
                backgroundColor: 'rgba(163, 230, 53, 0.3)',
                borderColor: '#A3E635',
                borderWidth: 2,
                pointBackgroundColor: '#A3E635',
                pointBorderColor: '#fff',
                pointRadius: isMobile ? 2 : 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 5,
                    ticks: { display: false },
                    grid: { color: '#e0e0e0' },
                    pointLabels: { font: { size: isMobile ? 9 : 10 } }
                }
            }
        }
    });
}

// B: 引力场 - 柱状图
const attractionCtx = document.getElementById('attractionChart');
if (attractionCtx) {
    new Chart(attractionCtx, {
        type: 'bar',
        data: {
            labels: ['流量合伙', '主题演绎', '起盘教授'],
            datasets: [{
                data: [3, 2, 5],
                backgroundColor: ['#84CC16', '#84CC16', '#84CC16'],
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: { legend: { display: false } },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 5,
                    grid: { color: '#f0f0f0' },
                    ticks: { font: { size: isMobile ? 9 : 11 } }
                },
                y: {
                    grid: { display: false },
                    ticks: { font: { size: isMobile ? 9 : 11 } }
                }
            }
        }
    });
}

// C: 说服力 - 横向柱状图
const persuasionCtx = document.getElementById('persuasionChart');
if (persuasionCtx) {
    new Chart(persuasionCtx, {
        type: 'bar',
        data: {
            labels: ['价值塑造', '需求心理', '差异体验', '产品包装', '决策促进'],
            datasets: [{
                data: [2, 4, 5, 3, 2],
                backgroundColor: '#10B981',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: { legend: { display: false } },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 5,
                    grid: { color: '#f0f0f0' },
                    ticks: { font: { size: isMobile ? 9 : 11 } }
                },
                y: {
                    grid: { display: false },
                    ticks: { font: { size: isMobile ? 9 : 11 } }
                }
            }
        }
    });
}

// D: 价值力 - 横向柱状图
const valueCtx = document.getElementById('valueChart');
if (valueCtx) {
    new Chart(valueCtx, {
        type: 'bar',
        data: {
            labels: ['结果承诺', '快速解决', '分段实践', '资源合并', '价值呈现'],
            datasets: [{
                data: [2, 2, 3, 2, 5],
                backgroundColor: '#14B8A6',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: { legend: { display: false } },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 5,
                    grid: { color: '#f0f0f0' },
                    ticks: { font: { size: isMobile ? 9 : 11 } }
                },
                y: {
                    grid: { display: false },
                    ticks: { font: { size: isMobile ? 9 : 11 } }
                }
            }
        }
    });
}

// E: 兑现力 - 横向柱状图
const deliveryCtx = document.getElementById('deliveryChart');
if (deliveryCtx) {
    new Chart(deliveryCtx, {
        type: 'bar',
        data: {
            labels: ['触发场景', '高质到付', '口碑见证', '客户运营', '数据留存'],
            datasets: [{
                data: [3, 3, 3, 4, 4],
                backgroundColor: '#06B6D4',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: { legend: { display: false } },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 5,
                    grid: { color: '#f0f0f0' },
                    ticks: { font: { size: isMobile ? 9 : 11 } }
                },
                y: {
                    grid: { display: false },
                    ticks: { font: { size: isMobile ? 9 : 11 } }
                }
            }
        }
    });
}

// F: 续航力 - 横向彩色柱状图
const enduranceCtx = document.getElementById('enduranceChart');
if (enduranceCtx) {
    new Chart(enduranceCtx, {
        type: 'bar',
        data: {
            labels: ['社群', '中端', '平台', '技能', '低端'],
            datasets: [{
                data: [4, 3.5, 3, 2.5, 2],
                backgroundColor: [
                    '#06B6D4',
                    '#0EA5E9',
                    '#FCD34D',
                    '#FFA500',
                    '#F59E0B'
                ],
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: { legend: { display: false } },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 5,
                    grid: { color: '#f0f0f0' },
                    ticks: { font: { size: isMobile ? 9 : 11 } }
                },
                y: {
                    grid: { display: false },
                    ticks: { font: { size: isMobile ? 9 : 11 } }
                }
            }
        }
    });
}

// G: 杠杆力 - 金字塔图（使用柱状图模拟）
const leverageCtx = document.getElementById('leverageChart');
if (leverageCtx) {
    new Chart(leverageCtx, {
        type: 'bar',
        data: {
            labels: ['超高客单', '高客单价', '普通客单', '引流低价'],
            datasets: [{
                data: [1, 2, 3, 4],
                backgroundColor: [
                    '#C026D3',
                    '#A855F7',
                    '#8B5CF6',
                    '#7C3AED'
                ],
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#f0f0f0' },
                    ticks: { font: { size: isMobile ? 9 : 11 } }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { size: isMobile ? 9 : 11 } }
                }
            }
        }
    });
}

// H: 合力 - 双金字塔图
const synergyCtx = document.getElementById('synergyChart');
if (synergyCtx) {
    new Chart(synergyCtx, {
        type: 'bar',
        data: {
            labels: ['决策力', '竞争力', '协作力', '执行力'],
            datasets: [
                {
                    label: '左侧',
                    data: [-4, -3, -2, -1],
                    backgroundColor: '#A855F7',
                    borderRadius: 5
                },
                {
                    label: '右侧',
                    data: [4, 3, 2, 1],
                    backgroundColor: '#6B7280',
                    borderRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: { legend: { display: false } },
            scales: {
                x: {
                    beginAtZero: true,
                    min: -5,
                    max: 5,
                    grid: { color: '#f0f0f0' },
                    ticks: { font: { size: isMobile ? 9 : 11 } }
                },
                y: {
                    grid: { display: false },
                    ticks: { font: { size: isMobile ? 9 : 11 } }
                }
            }
        }
    });
}
