/**
 * 学习门户 - Apple Style
 */

// ===== Config =====
const CONFIG = {
    DATA_URL: 'data/briefings/',  // GitHub Pages 路径
    TYPES: ['morning', 'noon', 'evening', 'night'],
    TYPE_LABELS: {
        morning: '🌅 早间',
        noon: '☀️ 午间',
        evening: '🌆 晚间',
        night: '🌙 深夜'
    }
};

// ===== Storage =====
const STORAGE = {
    CHECKIN: 'portal_checkin',
    CACHE: 'portal_briefings_cache'
};

// ===== AI PM Knowledge Base =====
const KNOWLEDGE = [
    {
        title: "AI产品经理核心能力模型",
        content: `
            <p><strong>四大核心能力：</strong></p>
            <ul>
                <li>🎯 <strong>技术理解力</strong> — 理解ML/DL基础原理，能与工程师有效沟通</li>
                <li>📊 <strong>数据思维</strong> — 数据驱动决策，理解数据质量对模型的影响</li>
                <li>💡 <strong>产品设计力</strong> — 将AI能力转化为用户价值，设计人机协作流程</li>
                <li>🤝 <strong>跨团队协作</strong> — 协调算法、工程、业务团队高效运转</li>
            </ul>
        `
    },
    {
        title: "AI产品需求文档(PRD)要点",
        content: `
            <p><strong>AI产品PRD特殊之处：</strong></p>
            <ul>
                <li>📝 <strong>数据需求</strong> — 明确训练数据来源、标注规范、数据量要求</li>
                <li>📈 <strong>效果指标</strong> — 定义模型评估指标（准确率、召回率、F1等）</li>
                <li>⚡ <strong>性能要求</strong> — 响应时间、并发量、资源限制</li>
                <li>🔄 <strong>迭代策略</strong> — 模型冷启动方案、AB测试计划</li>
            </ul>
        `
    },
    {
        title: "机器学习项目全流程",
        content: `
            <p><strong>AI产品经理需了解的流程：</strong></p>
            <ol>
                <li>📋 <strong>问题定义</strong> — 这个问题适合用ML解决吗？</li>
                <li>📊 <strong>数据准备</strong> — 数据采集、清洗、标注、划分</li>
                <li>🧠 <strong>模型开发</strong> — 特征工程、模型选择、训练调参</li>
                <li>✅ <strong>模型评估</strong> — 离线评估、在线AB测试</li>
                <li>🚀 <strong>部署上线</strong> — 模型服务化、监控告警</li>
            </ol>
        `
    },
    {
        title: "大模型产品设计原则",
        content: `
            <p><strong>LLM时代的产品思维：</strong></p>
            <ul>
                <li>🎯 <strong>Prompt Engineering</strong> — 设计优质的提示词模板</li>
                <li>🛡️ <strong>安全边界</strong> — 内容过滤、幻觉检测、用户引导</li>
                <li>💰 <strong>成本控制</strong> — Token优化、模型分级、缓存策略</li>
                <li>📊 <strong>效果评估</strong> — 人工评估 + 自动评估结合</li>
            </ul>
        `
    },
    {
        title: "AI产品指标体系搭建",
        content: `
            <p><strong>三层指标体系：</strong></p>
            <ul>
                <li>📊 <strong>业务指标</strong> — DAU、留存率、转化率、GMV</li>
                <li>🤖 <strong>模型指标</strong> — 准确率、响应时间、调用量</li>
                <li>💡 <strong>体验指标</strong> — 用户满意度、NPS、投诉率</li>
            </ul>
        `
    }
];

// ===== State =====
let checkedDays = JSON.parse(localStorage.getItem(STORAGE.CHECKIN) || '[]');
let briefingsCache = JSON.parse(localStorage.getItem(STORAGE.CACHE) || '{}');
let allBriefings = [];
let selectedDate = null;
let selectedInvestor = 'all';

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    initScrollEffects();
    initDatePicker();
    initInvestorFilter();
    loadBriefings();
    renderDailyCard();
    renderProgress();
    initCheckin();
    initModal();
    updateStats();
});

// ===== Scroll Effects =====
function initScrollEffects() {
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        nav.style.background = window.scrollY > 50 
            ? 'rgba(251, 251, 253, 0.9)' 
            : 'rgba(251, 251, 253, 0.72)';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// ===== Investor Filter =====
function initInvestorFilter() {
    document.querySelectorAll('.investor-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.investor-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedInvestor = btn.dataset.investor;
            
            // 重新渲染当前选中日期的简报
            if (selectedDate) {
                const items = allBriefings.filter(b => b.date === selectedDate);
                renderBriefingDetail(items);
            }
        });
    });
}

function filterContentByInvestor(content, investor) {
    if (investor === 'all') return content;
    
    const lines = content.split('\n');
    const filtered = [];
    let inTargetSection = false;
    let sectionFound = false;
    
    const investorKeywords = {
        templeton: ['邓普顿', 'templeton'],
        buffett: ['巴菲特', 'buffett'],
        munger: ['芒格', 'munger']
    };
    
    const keywords = investorKeywords[investor] || [];
    
    for (const line of lines) {
        const lowerLine = line.toLowerCase();
        
        // 检查是否是视角部分的标题
        if (lowerLine.includes('三视角') || lowerLine.includes('速评')) {
            filtered.push(line);
            inTargetSection = true;
            continue;
        }
        
        // 在视角部分中
        if (inTargetSection) {
            const isTargetInvestor = keywords.some(kw => lowerLine.includes(kw));
            if (isTargetInvestor) {
                filtered.push(line);
                sectionFound = true;
            }
            // 如果遇到新的部分标题，停止过滤
            if (line.startsWith('⚡') || line.startsWith('🎯') || line.startsWith('📌')) {
                inTargetSection = false;
            }
        } else {
            // 非视角部分，保留标题和其他重要信息
            if (line.startsWith('📊') || line.startsWith('🔥') || line.startsWith('📌') || 
                line.startsWith('💡') || line.startsWith('⚡') || line.startsWith('🎯')) {
                filtered.push(line);
            } else if (!inTargetSection && filtered.length > 0 && keywords.length === 0) {
                filtered.push(line);
            }
        }
    }
    
    // 如果找到了目标投资人内容，返回过滤后的内容
    if (sectionFound) {
        // 添加投资人标签
        const investorLabels = {
            templeton: '🌍 邓普顿视角',
            buffett: '💰 巴菲特视角',
            munger: '🧠 芒格视角'
        };
        return `${investorLabels[investor]}\n\n${filtered.join('\n')}`;
    }
    
    return content;
}

// ===== Load Briefings =====
async function loadBriefings() {
    allBriefings = [];
    const today = new Date();
    
    // 尝试加载最近30天的简报
    for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = formatDateKey(date);
        
        for (const type of CONFIG.TYPES) {
            const filename = `${dateStr}-${type}.json`;
            const url = CONFIG.DATA_URL + filename;
            
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    allBriefings.push({
                        date: dateStr,
                        type: type,
                        time: data.time || getDefaultTime(type),
                        content: data.content,
                        label: CONFIG.TYPE_LABELS[type]
                    });
                }
            } catch (e) {
                // 文件不存在，跳过
            }
        }
    }
    
    // 按日期和时间排序
    allBriefings.sort((a, b) => {
        if (a.date !== b.date) return b.date.localeCompare(a.date);
        return a.time.localeCompare(b.time);
    });
    
    // 缓存到本地
    localStorage.setItem(STORAGE.CACHE, JSON.stringify(allBriefings));
    
    // 渲染日期列表
    renderDateList();
    
    // 默认选中今天
    const todayStr = formatDateKey(today);
    selectDate(todayStr);
}

function getDefaultTime(type) {
    const times = { morning: '08:00', noon: '12:00', evening: '19:00', night: '00:00' };
    return times[type] || '00:00';
}

function formatDateKey(date) {
    return date.toISOString().split('T')[0];
}

// ===== Date List =====
function renderDateList() {
    const container = document.getElementById('newsList');
    
    // 按日期分组
    const grouped = {};
    allBriefings.forEach(b => {
        if (!grouped[b.date]) grouped[b.date] = [];
        grouped[b.date].push(b);
    });
    
    const dates = Object.keys(grouped).sort().reverse();
    
    if (dates.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📰</div>
                <p>暂无简报</p>
                <p class="empty-hint">每日 8:00 / 12:00 / 19:00 / 00:00 自动更新</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = dates.map(date => {
        const items = grouped[date];
        const displayDate = formatDateDisplay(date);
        const isSelected = date === selectedDate;
        
        return `
            <div class="date-group ${isSelected ? 'selected' : ''}" onclick="selectDate('${date}')">
                <div class="date-header">
                    <span class="date-day">${displayDate}</span>
                    <span class="date-count">${items.length}条简报</span>
                </div>
                <div class="date-types">
                    ${items.map(item => `<span class="type-badge">${item.label}</span>`).join('')}
                </div>
            </div>
        `;
    }).join('');
}

function formatDateDisplay(dateStr) {
    const date = new Date(dateStr);
    const today = new Date();
    const diff = Math.floor((today - date) / (1000 * 60 * 60 * 24));
    
    if (diff === 0) return '今天';
    if (diff === 1) return '昨天';
    if (diff === 2) return '前天';
    
    return `${date.getMonth() + 1}月${date.getDate()}日`;
}

// ===== Select Date =====
function selectDate(dateStr) {
    selectedDate = dateStr;
    
    const items = allBriefings.filter(b => b.date === dateStr);
    renderDateList();
    renderBriefingDetail(items);
}

function renderBriefingDetail(items) {
    const detailContainer = document.getElementById('briefingDetail');
    
    if (!items || items.length === 0) {
        detailContainer.innerHTML = '';
        detailContainer.classList.add('hidden');
        return;
    }
    
    detailContainer.classList.remove('hidden');
    detailContainer.innerHTML = items.map(item => {
        // 根据选中的投资人过滤内容
        const displayContent = filterContentByInvestor(item.content, selectedInvestor);
        
        return `
            <div class="briefing-card">
                <div class="briefing-header">
                    <span class="briefing-type">${item.label}</span>
                    <span class="briefing-time">${item.time}</span>
                </div>
                <div class="briefing-content">${formatContent(displayContent)}</div>
            </div>
        `;
    }).join('');
}

function formatContent(content) {
    // 简单格式化：将换行转为 <br>，保留 emoji
    return content
        .replace(/\n/g, '<br>')
        .replace(/•/g, '<span class="bullet">•</span>');
}

// ===== Date Picker =====
function initDatePicker() {
    document.getElementById('prevDay').addEventListener('click', () => {
        const dates = [...new Set(allBriefings.map(b => b.date))].sort();
        const currentIdx = dates.indexOf(selectedDate);
        if (currentIdx < dates.length - 1) {
            selectDate(dates[currentIdx + 1]);
        }
    });

    document.getElementById('nextDay').addEventListener('click', () => {
        const dates = [...new Set(allBriefings.map(b => b.date))].sort();
        const currentIdx = dates.indexOf(selectedDate);
        if (currentIdx > 0) {
            selectDate(dates[currentIdx - 1]);
        }
    });
}

// ===== Daily Card =====
function renderDailyCard() {
    const today = new Date();
    const dayIndex = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)) % KNOWLEDGE.length;
    const knowledge = KNOWLEDGE[dayIndex];
    
    document.getElementById('pmTitle').textContent = knowledge.title;
    document.getElementById('pmContent').innerHTML = knowledge.content;
    
    const todayStr = today.toISOString().split('T')[0];
    if (checkedDays.includes(todayStr)) {
        showCheckedState();
    }
}

// ===== Checkin =====
function initCheckin() {
    document.getElementById('checkinBtn').addEventListener('click', function() {
        const today = new Date().toISOString().split('T')[0];
        
        if (!checkedDays.includes(today)) {
            checkedDays.push(today);
            localStorage.setItem(STORAGE.CHECKIN, JSON.stringify(checkedDays));
            
            showCheckedState();
            renderProgress();
            updateStats();
        }
    });
}

function showCheckedState() {
    document.getElementById('checkinBtn').classList.add('checked');
    document.getElementById('checkinBtn').innerHTML = `
        <span class="btn-content">
            <svg class="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M20 6L9 17l-5-5"/>
            </svg>
            <span>已完成</span>
        </span>
    `;
    document.getElementById('checkinStatus').classList.remove('hidden');
}

// ===== Progress =====
function renderProgress() {
    const today = new Date();
    let completed = 0;
    
    for (let i = 1; i <= today.getDate(); i++) {
        const date = new Date(today.getFullYear(), today.getMonth(), i);
        const dateStr = date.toISOString().split('T')[0];
        if (checkedDays.includes(dateStr)) completed++;
    }
    
    const rate = Math.round((completed / today.getDate()) * 100);
    
    document.getElementById('completedCount').textContent = completed;
    document.getElementById('completionRate').textContent = rate + '%';
    document.getElementById('progressFill').style.width = rate + '%';
}

// ===== Stats =====
function updateStats() {
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 365; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        if (checkedDays.includes(dateStr)) {
            streak++;
        } else if (i > 0) {
            break;
        }
    }
    
    const totalDays = checkedDays.length > 0 ? 
        Math.floor((today - new Date(checkedDays[0])) / (1000 * 60 * 60 * 24)) + 1 : 0;
    
    document.getElementById('totalDays').textContent = totalDays;
    document.getElementById('totalCheckins').textContent = checkedDays.length;
    document.getElementById('streakDays').textContent = streak;
    document.getElementById('streakCount').textContent = streak;
}

// ===== Modal =====
function initModal() {
    const modal = document.getElementById('addNewsModal');
    
    document.getElementById('addNews').addEventListener('click', () => {
        modal.classList.remove('hidden');
    });
    
    document.getElementById('modalClose').addEventListener('click', () => {
        modal.classList.add('hidden');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });
}
