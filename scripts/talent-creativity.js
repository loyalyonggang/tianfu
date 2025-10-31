// 天赋创富测评报告图表

// 检测是否为移动设备
const isMobile = window.innerWidth <= 768;

// 天赋力柱状图
const talentCtx = document.getElementById('talentChart');
if (talentCtx) {
    new Chart(talentCtx, {
        type: 'bar',
        data: {
            labels: ['自我认知', '自我接纳', '自我笃定', '天赋运用', '天赋转化'],
            datasets: [{
                data: [10, 7, 8, 8, 8],
                backgroundColor: '#FFA500',
                borderRadius: 5,
                barThickness: isMobile ? 30 : 40
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    ticks: {
                        stepSize: 2,
                        font: {
                            size: isMobile ? 10 : 12
                        }
                    },
                    grid: {
                        color: '#f0f0f0',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: isMobile ? 10 : 12
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// 创富力柱状图
const wealthCtx = document.getElementById('wealthChart');
if (wealthCtx) {
    new Chart(wealthCtx, {
        type: 'bar',
        data: {
            labels: ['产品设计', '营销推广', '焦虑运营', '成交转化', '行动力', '抗压力'],
            datasets: [{
                data: [10, 8, 6, 9, 7, 9],
                backgroundColor: (context) => {
                    const value = context.parsed.y;
                    return value < 7 ? '#5B9BFF' : '#FFA500';
                },
                borderRadius: 5,
                barThickness: isMobile ? 25 : 35
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    ticks: {
                        stepSize: 2,
                        font: {
                            size: isMobile ? 10 : 12
                        }
                    },
                    grid: {
                        color: '#f0f0f0',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: isMobile ? 10 : 12
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// 兴趣领域雷达图
const interestCtx = document.getElementById('interestChart');
if (interestCtx) {
    new Chart(interestCtx, {
        type: 'radar',
        data: {
            labels: ['心灵成长', '秩序概念', '现实体验', '秩序构建'],
            datasets: [{
                data: [9.2, 6.4, 8, 7.6],
                backgroundColor: 'rgba(91, 155, 255, 0.3)',
                borderColor: '#5B9BFF',
                borderWidth: 2,
                pointBackgroundColor: '#5B9BFF',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#5B9BFF',
                pointRadius: isMobile ? 3 : 4,
                pointHoverRadius: isMobile ? 5 : 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 10,
                    ticks: {
                        stepSize: 2,
                        display: false
                    },
                    grid: {
                        color: '#e0e0e0'
                    },
                    pointLabels: {
                        font: {
                            size: isMobile ? 10 : 12
                        }
                    }
                }
            }
        }
    });
}

// 交互方式三角图（使用雷达图模拟）
const interactionCtx = document.getElementById('interactionChart');
if (interactionCtx) {
    new Chart(interactionCtx, {
        type: 'radar',
        data: {
            labels: ['一对一', '社群', '内容'],
            datasets: [{
                data: [7.2, 8.4, 8.4],
                backgroundColor: 'rgba(91, 155, 255, 0.3)',
                borderColor: '#5B9BFF',
                borderWidth: 2,
                pointBackgroundColor: '#5B9BFF',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#5B9BFF',
                pointRadius: isMobile ? 3 : 4,
                pointHoverRadius: isMobile ? 5 : 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 10,
                    ticks: {
                        stepSize: 2,
                        display: false
                    },
                    grid: {
                        color: '#e0e0e0'
                    },
                    pointLabels: {
                        font: {
                            size: isMobile ? 10 : 12
                        }
                    }
                }
            }
        }
    });
}
