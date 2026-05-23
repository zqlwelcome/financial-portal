/**
 * 学习门户 - 紧凑版
 */

// ===== Config =====
const CONFIG = {
    DATA_URL: 'data/briefings/',
    TYPES: ['morning', 'noon', 'evening', 'night'],
    TYPE_LABELS: { morning: '🌅早', noon: '☀️午', evening: '🌆晚', night: '🌙夜' }
};

const STORAGE = { CHECKIN: 'portal_checkin' };

// ===== AI PM Knowledge =====
const KNOWLEDGE = [
    { title: "AI产品经理核心能力", content: "<ul><li>🎯 技术理解力</li><li>📊 数据思维</li><li>💡 产品设计力</li><li>🤝 跨团队协作</li></ul>" },
    { title: "AI产品PRD要点", content: "<ul><li>📝 数据需求</li><li>📈 效果指标</li><li>⚡ 性能要求</li><li>🔄 迭代策略</li></ul>" },
    { title: "机器学习全流程", content: "<ul><li>📋 问题定义</li><li>📊 数据准备</li><li>🧠 模型开发</li><li>✅ 模型评估</li><li>🚀 部署上线</li></ul>" },
    { title: "大模型产品设计", content: "<ul><li>🎯 Prompt工程</li><li>🛡️ 安全边界</li><li>💰 成本控制</li><li>📊 效果评估</li></ul>" },
    { title: "AI产品指标体系", content: "<ul><li>📊 业务指标</li><li>🤖 模型指标</li><li>💡 体验指标</li></ul>" }
];

// ===== 实时新闻数据（示例）=====
const REALTIME_NEWS = [
    { id: 1, time: "12:30", source: "财联社", title: "A股三大指数午间收涨 沪指重返3400点", summary: "成交额超8000亿，北向资金净流入超50亿" },
    { id: 2, time: "12:15", source: "华尔街见闻", title: "美联储会议纪要显示官员对通胀走势存在分歧", summary: "市场预计6月维持利率不变概率超90%" },
    { id: 3, time: "11:58", source: "证券时报", title: "宁德时代发布固态电池量产时间表", summary: "股价涨超5%，新能源板块集体走强" },
    { id: 4, time: "11:30", source: "第一财经", title: "人社部宣布个人养老金制度全面推开", summary: "投资范围扩大，新增REITs和指数基金" },
    { id: 5, time: "11:05", source: " Bloomberg", title: "日元汇率跌至160关口 日本央行干预预期升温", summary: "美元指数强势运行，非美货币承压" },
    { id: 6, time: "10:42", source: "新华社", title: "中国4月社会融资规模增量超预期", summary: "信贷结构改善，企业中长期贷款回暖" },
    { id: 7, time: "10:15", source: "路透社", title: "比特币突破11万美元创历史新高", summary: "机构资金持续流入ETF，市值突破2万亿" },
    { id: 8, time: "09:45", source: "21世纪经济", title: "国际油价突破85美元 OPEC+减产持续", summary: "能源板块受益，中石油中石化走强" },
    { id: 9, time: "09:20", source: "央行官网", title: "央行开展1000亿元MLF操作 利率不变", summary: "市场流动性合理充裕" },
    { id: 10, time: "09:00", source: "上交所", title: "科创板新股申购提示", summary: "今日两只新股申购，建议关注" }
];

// ===== State =====
let checkedDays = JSON.parse(localStorage.getItem(STORAGE.CHECKIN) || '[]');
let allBriefings = [];
let selectedDate = null;
let selectedInvestor = 'all';

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    initMainTabs();
    initSubTabs();
    initInvestorFilter();
    renderRealtimeNews();
    loadBriefings();
    renderDailyCard();
    renderProgress();
    initCheckin();
});

// ===== 主标签 =====
function initMainTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });
}

// ===== 子标签 =====
function initSubTabs() {
    document.querySelectorAll('.sub-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.sub-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.sub).classList.add('active');
        });
    });
}

// ===== 视角筛选 =====
function initInvestorFilter() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedInvestor = btn.dataset.investor;
            if (selectedDate) {
                renderBriefingDetail(allBriefings.filter(b => b.date === selectedDate));
            }
        });
    });
}

function filterContent(content, investor) {
    if (investor === 'all') return content;
    
    const lines = content.split('\n');
    const result = [];
    let inSection = false;
    let found = false;
    
    const kw = { templeton: ['邓普顿'], buffett: ['巴菲特'], munger: ['芒格'] }[investor] || [];
    
    for (const line of lines) {
        if (line.includes('三视角') || line.includes('速评')) {
            result.push(line);
            inSection = true;
            continue;
        }
        if (inSection) {
            if (kw.some(k => line.includes(k))) {
                result.push(line);
                found = true;
            }
            if (line.startsWith('⚡') || line.startsWith('🎯')) inSection = false;
        } else if (line.startsWith('📊') || line.startsWith('🔥') || line.startsWith('📌') || line.startsWith('⚡') || line.startsWith('🎯')) {
            result.push(line);
        }
    }
    
    const labels = { templeton: '🌍 邓普顿', buffett: '💰 巴菲特', munger: '🧠 芒格' };
    return found ? `${labels[investor]}视角\n\n${result.join('\n')}` : content;
}

// ===== 实时新闻 =====
function renderRealtimeNews() {
    const el = document.getElementById('realtimeList');
    el.innerHTML = REALTIME_NEWS.map(news => `
        <div class="news-item">
            <div class="news-meta">
                <span class="news-source">${news.source}</span>
                <span>${news.time}</span>
            </div>
            <div class="news-title">${news.title}</div>
            <div class="news-summary">${news.summary}</div>
        </div>
    `).join('');
}

// ===== 加载简报 =====
async function loadBriefings() {
    allBriefings = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const ds = fmtDate(d);
        
        for (const type of CONFIG.TYPES) {
            try {
                const r = await fetch(CONFIG.DATA_URL + `${ds}-${type}.json`);
                if (r.ok) {
                    const data = await r.json();
                    allBriefings.push({
                        date: ds, type, time: data.time || '00:00',
                        content: data.content, label: CONFIG.TYPE_LABELS[type]
                    });
                }
            } catch(e) {}
        }
    }
    
    allBriefings.sort((a, b) => b.date.localeCompare(a.date) || a.time.localeCompare(b.time));
    
    renderDailyList();
    selectDate(fmtDate(today));
}

function fmtDate(d) {
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

// ===== 日期列表 =====
function renderDailyList() {
    const el = document.getElementById('dailyList');
    const grouped = {};
    allBriefings.forEach(b => {
        if (!grouped[b.date]) grouped[b.date] = [];
        grouped[b.date].push(b);
    });
    
    const dates = Object.keys(grouped).sort().reverse();
    
    if (!dates.length) {
        el.innerHTML = '<div class="empty-hint">📊 暂无简报</div>';
        return;
    }
    
    el.innerHTML = dates.map(date => {
        const items = grouped[date];
        const display = fmtDisplay(date);
        const sel = date === selectedDate ? 'selected' : '';
        return `
            <div class="date-item ${sel}" onclick="selectDate('${date}')">
                <div class="date-head">
                    <span class="date-label">${display}</span>
                    <span class="date-count">${items.length}条</span>
                </div>
                <div class="date-tags">
                    ${items.map(i => `<span class="tag">${i.label}</span>`).join('')}
                </div>
            </div>`;
    }).join('');
}

function fmtDisplay(dateStr) {
    const d = new Date(dateStr);
    const diff = Math.floor((new Date() - d) / 86400000);
    if (diff === 0) return '今天';
    if (diff === 1) return '昨天';
    if (diff === 2) return '前天';
    return `${d.getMonth()+1}月${d.getDate()}日`;
}

// ===== 选择日期 =====
function selectDate(dateStr) {
    selectedDate = dateStr;
    renderDailyList();
    renderBriefingDetail(allBriefings.filter(b => b.date === dateStr));
}

function renderBriefingDetail(items) {
    const el = document.getElementById('briefingDetail');
    if (!items?.length) { el.innerHTML = ''; return; }
    
    el.innerHTML = items.map(item => {
        const content = filterContent(item.content, selectedInvestor);
        return `
            <div class="briefing-card">
                <div class="briefing-head">
                    <span class="briefing-type">${item.label}</span>
                    <span class="briefing-time">${item.time}</span>
                </div>
                <div class="briefing-content">${content.replace(/\n/g, '<br>')}</div>
            </div>`;
    }).join('');
}

// ===== 打卡 =====
function renderDailyCard() {
    const today = new Date();
    const idx = Math.floor((today - new Date(today.getFullYear(),0,0)) / 86400000) % KNOWLEDGE.length;
    const k = KNOWLEDGE[idx];
    document.getElementById('pmTitle').textContent = k.title;
    document.getElementById('pmContent').innerHTML = k.content;
    
    if (checkedDays.includes(fmtDate(today))) showChecked();
}

function initCheckin() {
    document.getElementById('checkinBtn').addEventListener('click', function() {
        const ts = fmtDate(new Date());
        if (!checkedDays.includes(ts)) {
            checkedDays.push(ts);
            localStorage.setItem(STORAGE.CHECKIN, JSON.stringify(checkedDays));
            showChecked();
            renderProgress();
        }
    });
}

function showChecked() {
    const btn = document.getElementById('checkinBtn');
    btn.classList.add('checked');
    btn.textContent = '✓ 已打卡';
}

function renderProgress() {
    const today = new Date();
    let done = 0;
    for (let i = 1; i <= today.getDate(); i++) {
        if (checkedDays.includes(fmtDate(new Date(today.getFullYear(), today.getMonth(), i)))) done++;
    }
    const rate = Math.round(done / today.getDate() * 100);
    document.getElementById('completionRate').textContent = rate + '%';
    document.getElementById('progressFill').style.width = rate + '%';
    
    let streak = 0;
    for (let i = 0; i < 365; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        if (checkedDays.includes(fmtDate(d))) streak++;
        else if (i > 0) break;
    }
    document.getElementById('streakDays').textContent = streak;
}
