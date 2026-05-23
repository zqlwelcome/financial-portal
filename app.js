/**
 * 个人学习门户 - 主逻辑
 */

// ===== 数据存储 =====
const STORAGE_KEYS = {
    NEWS: 'learning_portal_news',
    CHECKIN: 'learning_portal_checkin',
    STREAK: 'learning_portal_streak',
    THEME: 'learning_portal_theme'
};

// ===== AI产品经理知识点库 =====
const AI_PM_KNOWLEDGE = [
    {
        id: 1,
        title: "AI产品经理核心能力模型",
        content: `<p><strong>四大核心能力：</strong></p>
<ul>
<li>🎯 <strong>技术理解力</strong> - 理解ML/DL基础原理，能与工程师有效沟通</li>
<li>📊 <strong>数据思维</strong> - 数据驱动决策，理解数据质量对模型的影响</li>
<li>💡 <strong>产品设计力</strong> - 将AI能力转化为用户价值，设计人机协作流程</li>
<li>🤝 <strong>跨团队协作</strong> - 协调算法、工程、业务团队高效运转</li>
</ul>
<p style="margin-top:12px;color:rgba(255,255,255,0.7)">💡 今日金句：AI产品经理不是要成为技术专家，而是要成为"技术翻译官"</p>`,
        category: "基础能力"
    },
    {
        id: 2,
        title: "AI产品需求文档(PRD)要点",
        content: `<p><strong>AI产品PRD特殊之处：</strong></p>
<ul>
<li>📝 <strong>数据需求</strong> - 明确训练数据来源、标注规范、数据量要求</li>
<li>📈 <strong>效果指标</strong> - 定义模型评估指标（准确率、召回率、F1等）</li>
<li>⚡ <strong>性能要求</strong> - 响应时间、并发量、资源限制</li>
<li>🔄 <strong>迭代策略</strong> - 模型冷启动方案、AB测试计划</li>
</ul>
<p style="margin-top:12px;color:rgba(255,255,255,0.7)">💡 记住：AI产品的不确定性更高，PRD要预留"实验空间"</p>`,
        category: "文档技能"
    },
    {
        id: 3,
        title: "机器学习项目全流程",
        content: `<p><strong>AI产品经理需了解的流程：</strong></p>
<ol>
<li>📋 <strong>问题定义</strong> - 这个问题适合用ML解决吗？</li>
<li>📊 <strong>数据准备</strong> - 数据采集、清洗、标注、划分</li>
<li>🧠 <strong>模型开发</strong> - 特征工程、模型选择、训练调参</li>
<li>✅ <strong>模型评估</strong> - 离线评估、在线AB测试</li>
<li>🚀 <strong>部署上线</strong> - 模型服务化、监控告警</li>
<li>🔄 <strong>持续迭代</strong> - 数据反馈、模型更新</li>
</ol>
<p style="margin-top:12px;color:rgba(255,255,255,0.7)">💡 PM重点关注：问题定义和效果评估，这两个环节PM主导</p>`,
        category: "技术理解"
    },
    {
        id: 4,
        title: "大模型产品设计原则",
        content: `<p><strong>LLM时代的产品思维：</strong></p>
<ul>
<li>🎯 <strong>Prompt Engineering</strong> - 设计优质的提示词模板</li>
<li>🛡️ <strong>安全边界</strong> - 内容过滤、幻觉检测、用户引导</li>
<li>💰 <strong>成本控制</strong> - Token优化、模型分级、缓存策略</li>
<li>📊 <strong>效果评估</strong> - 人工评估 + 自动评估结合</li>
</ul>
<p style="margin-top:12px;color:rgba(255,255,255,0.7)">💡 大模型产品核心：在"能力边界"和"用户期望"之间找到平衡</p>`,
        category: "前沿趋势"
    },
    {
        id: 5,
        title: "AI产品指标体系搭建",
        content: `<p><strong>三层指标体系：</strong></p>
<ul>
<li>📊 <strong>业务指标</strong> - DAU、留存率、转化率、GMV</li>
<li>🤖 <strong>模型指标</strong> - 准确率、响应时间、调用量</li>
<li>💡 <strong>体验指标</strong> - 用户满意度、NPS、投诉率</li>
</ul>
<p style="margin-top:12px;color:rgba(255,255,255,0.7)">💡 关键：业务指标是北极星，模型指标是手段，体验指标是保障</p>`,
        category: "数据能力"
    }
];

// ===== 应用状态 =====
let currentDate = new Date();
let checkedDays = JSON.parse(localStorage.getItem(STORAGE_KEYS.CHECKIN) || '[]');
let newsData = JSON.parse(localStorage.getItem(STORAGE_KEYS.NEWS) || '[]');

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTabs();
    initNews();
    initAI_PM();
    initModal();
    updateStreak();
});

// ===== 主题切换 =====
function initTheme() {
    const theme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    
    document.getElementById('themeToggle').addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem(STORAGE_KEYS.THEME, next);
        document.getElementById('themeToggle').textContent = next === 'dark' ? '☀️' : '🌙';
    });
    
    document.getElementById('themeToggle').textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ===== 标签切换 =====
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(tab).classList.add('active');
        });
    });
}

// ===== 新闻模块 =====
function initNews() {
    renderNewsList();
    
    document.getElementById('prevDay').addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() - 1);
        updateDateDisplay();
    });
    
    document.getElementById('nextDay').addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() + 1);
        updateDateDisplay();
    });
    
    updateDateDisplay();
}

function updateDateDisplay() {
    const today = new Date();
    const diff = Math.floor((today - currentDate) / (1000 * 60 * 60 * 24));
    
    let display = formatDate(currentDate);
    if (diff === 0) display = '今天';
    else if (diff === 1) display = '昨天';
    
    document.getElementById('currentDate').textContent = display;
    renderNewsList();
}

function formatDate(date) {
    return `${date.getMonth() + 1}月${date.getDate()}日`;
}

function renderNewsList() {
    const container = document.getElementById('newsList');
    const dateStr = currentDate.toISOString().split('T')[0];
    const dayNews = newsData.filter(n => n.date === dateStr);
    
    if (dayNews.length === 0) {
        container.innerHTML = `
            <div class="card" style="text-align:center; color: var(--text-secondary);">
                <p>📭 今日暂无新闻</p>
                <p style="font-size:12px; margin-top:8px;">点击右下角 + 添加</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = dayNews.map(news => `
        <div class="card" onclick="showNewsDetail(${news.id})">
            <div class="card-header">
                <span class="card-tag">${getCategoryName(news.category)}</span>
                <span class="card-date">${news.time || ''}</span>
            </div>
            <h3>${news.title}</h3>
            <div class="card-content">${news.summary}</div>
            ${news.analysis ? `
                <div class="analysis-tags">
                    <span class="analysis-tag">💡 三视角点评已添加</span>
                </div>
            ` : ''}
        </div>
    `).join('');
}

function getCategoryName(cat) {
    const names = {
        market: '市场动态',
        policy: '政策解读',
        company: '公司财报',
        global: '国际财经'
    };
    return names[cat] || cat;
}

// ===== AI产品经理模块 =====
function initAI_PM() {
    renderDailyKnowledge();
    renderKnowledgeList();
    updateProgress();
    initCheckin();
}

function renderDailyKnowledge() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const knowledge = AI_PM_KNOWLEDGE[dayOfYear % AI_PM_KNOWLEDGE.length];
    
    document.getElementById('pmDate').textContent = formatDate(today);
    document.getElementById('pmTitle').textContent = knowledge.title;
    document.getElementById('pmContent').innerHTML = knowledge.content;
    
    // 检查今日是否已打卡
    const todayStr = today.toISOString().split('T')[0];
    if (checkedDays.includes(todayStr)) {
        document.getElementById('checkinBtn').classList.add('checked');
        document.getElementById('checkinBtn').innerHTML = '<span class="checkin-icon">✓</span><span>已打卡</span>';
        document.getElementById('checkinStatus').classList.remove('hidden');
    }
}

function renderKnowledgeList() {
    const container = document.getElementById('knowledgeItems');
    container.innerHTML = AI_PM_KNOWLEDGE.map(k => `
        <div class="item">
            <span class="item-icon">📖</span>
            <div class="item-content">
                <div class="item-title">${k.title}</div>
                <div class="item-desc">${k.category}</div>
            </div>
        </div>
    `).join('');
}

function initCheckin() {
    document.getElementById('checkinBtn').addEventListener('click', function() {
        const today = new Date().toISOString().split('T')[0];
        
        if (!checkedDays.includes(today)) {
            checkedDays.push(today);
            localStorage.setItem(STORAGE_KEYS.CHECKIN, JSON.stringify(checkedDays));
            
            this.classList.add('checked');
            this.innerHTML = '<span class="checkin-icon">✓</span><span>已打卡</span>';
            document.getElementById('checkinStatus').classList.remove('hidden');
            
            updateStreak();
            updateProgress();
            
            // 动画效果
            this.style.transform = 'scale(1.1)';
            setTimeout(() => this.style.transform = '', 200);
        }
    });
}

function updateStreak() {
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
    
    document.getElementById('streakCount').textContent = streak;
}

function updateProgress() {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    
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

// ===== 弹窗功能 =====
function initModal() {
    const modal = document.getElementById('addNewsModal');
    const fab = document.getElementById('addNews');
    const closeBtn = modal.querySelector('.close-btn');
    const form = document.getElementById('newsForm');
    
    fab.addEventListener('click', () => modal.classList.remove('hidden'));
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    
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
        localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(newsData));
        
        form.reset();
        modal.classList.add('hidden');
        renderNewsList();
    });
}

function showNewsDetail(id) {
    // 可以扩展为详情页
    console.log('查看新闻详情:', id);
}
