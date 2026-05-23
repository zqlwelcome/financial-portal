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

// ===== State =====
let checkedDays = JSON.parse(localStorage.getItem(STORAGE.CHECKIN) || '[]');
let allBriefings = [];
let selectedDate = null;
let selectedInvestor = 'all';

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initInvestorFilter();
    loadBriefings();
    renderDailyCard();
    renderProgress();
    initCheckin();
    initModal();
});

// ===== Tabs =====
function initTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });
}

// ===== Investor Filter =====
function initInvestorFilter() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedInvestor = btn.dataset.investor;
            if (selectedDate) {
                const items = allBriefings.filter(b => b.date === selectedDate);
                renderBriefingDetail(items);
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

// ===== Load Briefings =====
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
    
    renderDateList();
    selectDate(fmtDate(today));
}

function fmtDate(d) {
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

// ===== Date List =====
function renderDateList() {
    const el = document.getElementById('newsList');
    const grouped = {};
    allBriefings.forEach(b => {
        if (!grouped[b.date]) grouped[b.date] = [];
        grouped[b.date].push(b);
    });
    
    const dates = Object.keys(grouped).sort().reverse();
    
    if (!dates.length) {
        el.innerHTML = '<div class="empty-hint">📰 暂无简报<br>每日自动更新</div>';
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

// ===== Select Date =====
function selectDate(dateStr) {
    selectedDate = dateStr;
    renderDateList();
    renderBriefingDetail(allBriefings.filter(b => b.date === dateStr));
}

function renderBriefingDetail(items) {
    const el = document.getElementById('briefingDetail');
    if (!items?.length) { el.innerHTML = ''; el.classList.add('hidden'); return; }
    
    el.classList.remove('hidden');
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

// ===== Daily Card =====
function renderDailyCard() {
    const today = new Date();
    const idx = Math.floor((today - new Date(today.getFullYear(),0,0)) / 86400000) % KNOWLEDGE.length;
    const k = KNOWLEDGE[idx];
    document.getElementById('pmTitle').textContent = k.title;
    document.getElementById('pmContent').innerHTML = k.content;
    
    const ts = fmtDate(today);
    if (checkedDays.includes(ts)) showChecked();
}

// ===== Checkin =====
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

// ===== Progress =====
function renderProgress() {
    const today = new Date();
    let done = 0;
    for (let i = 1; i <= today.getDate(); i++) {
        const d = new Date(today.getFullYear(), today.getMonth(), i);
        if (checkedDays.includes(fmtDate(d))) done++;
    }
    const rate = Math.round(done / today.getDate() * 100);
    document.getElementById('completionRate').textContent = rate + '%';
    document.getElementById('progressFill').style.width = rate + '%';
    
    // Streak
    let streak = 0;
    for (let i = 0; i < 365; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        if (checkedDays.includes(fmtDate(d))) streak++;
        else if (i > 0) break;
    }
    document.getElementById('streakDays').textContent = streak;
}

// ===== Modal =====
function initModal() {
    const modal = document.getElementById('addNewsModal');
    document.getElementById('addNews').onclick = () => modal.classList.remove('hidden');
    document.getElementById('modalClose').onclick = () => modal.classList.add('hidden');
    modal.onclick = e => { if (e.target === modal) modal.classList.add('hidden'); };
    
    document.getElementById('newsForm').onsubmit = e => {
        e.preventDefault();
        // 简化的保存逻辑
        modal.classList.add('hidden');
        e.target.reset();
    };
}
