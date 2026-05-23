/**
 * 学习门户 - Apple Style
 */

// ===== Storage =====
const STORAGE = {
    NEWS: 'portal_news',
    CHECKIN: 'portal_checkin',
    THEME: 'portal_theme'
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
let currentDate = new Date();
let checkedDays = JSON.parse(localStorage.getItem(STORAGE.CHECKIN) || '[]');
let newsData = JSON.parse(localStorage.getItem(STORAGE.NEWS) || '[]');

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    initScrollEffects();
    initDatePicker();
    renderNews();
    renderDailyCard();
    renderProgress();
    initCheckin();
    initModal();
    updateStats();
});

// ===== Scroll Effects =====
function initScrollEffects() {
    // Nav background on scroll
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(251, 251, 253, 0.9)';
        } else {
            nav.style.background = 'rgba(251, 251, 253, 0.72)';
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ===== Date Picker =====
function initDatePicker() {
    document.getElementById('prevDay').addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() - 1);
        updateDateDisplay();
        renderNews();
    });

    document.getElementById('nextDay').addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() + 1);
        updateDateDisplay();
        renderNews();
    });

    updateDateDisplay();
}

function updateDateDisplay() {
    const today = new Date();
    const diff = Math.floor((today - currentDate) / (1000 * 60 * 60 * 24));
    
    let display = `${currentDate.getMonth() + 1}月${currentDate.getDate()}日`;
    if (diff === 0) display = '今天';
    else if (diff === 1) display = '昨天';
    else if (diff === -1) display = '明天';
    
    document.getElementById('currentDate').textContent = display;
}

// ===== News =====
function renderNews() {
    const container = document.getElementById('newsList');
    const dateStr = currentDate.toISOString().split('T')[0];
    const dayNews = newsData.filter(n => n.date === dateStr);
    
    if (dayNews.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📰</div>
                <p>暂无新闻</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = dayNews.map(news => `
        <div class="news-card">
            <div class="news-card-header">
                <span class="news-tag">${getCategoryName(news.category)}</span>
                <span class="news-time">${news.time || ''}</span>
            </div>
            <h3>${news.title}</h3>
            <p class="news-summary">${news.summary}</p>
            ${news.analysis ? `<p class="news-analysis">💡 ${news.analysis}</p>` : ''}
        </div>
    `).join('');
}

function getCategoryName(cat) {
    const names = { market: '市场动态', policy: '政策解读', company: '公司财报', global: '国际财经' };
    return names[cat] || cat;
}

// ===== Daily Card =====
function renderDailyCard() {
    const today = new Date();
    const dayIndex = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)) % KNOWLEDGE.length;
    const knowledge = KNOWLEDGE[dayIndex];
    
    document.getElementById('pmTitle').textContent = knowledge.title;
    document.getElementById('pmContent').innerHTML = knowledge.content;
    
    // Check if already checked in
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
            
            // Animation
            this.style.transform = 'scale(1.1)';
            setTimeout(() => this.style.transform = '', 200);
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
    // Calculate streak
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
    
    // Total days (from first checkin)
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
    const form = document.getElementById('newsForm');
    
    document.getElementById('addNews').addEventListener('click', () => {
        modal.classList.remove('hidden');
    });
    
    document.getElementById('modalClose').addEventListener('click', () => {
        modal.classList.add('hidden');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const news = {
            id: Date.now(),
            title: document.getElementById('newsTitle').value,
            source: document.getElementById('newsSource').value,
            summary: document.getElementById('newsSummary').value,
            category: document.getElementById('newsCategory').value,
            analysis: document.getElementById('newsAnalysis').value,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
        };
        
        newsData.unshift(news);
        localStorage.setItem(STORAGE.NEWS, JSON.stringify(newsData));
        
        form.reset();
        modal.classList.add('hidden');
        renderNews();
    });
}
