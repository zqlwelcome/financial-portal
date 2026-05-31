/**
 * 学习门户 - 主应用
 */

// ===== 热门新闻（从news-loader.js加载）=====

// ===== AI PM知识库 =====
const KNOWLEDGE = [
    { title: "AI产品经理核心能力", content: "<ul><li>🎯 技术理解力</li><li>📊 数据思维</li><li>💡 产品设计力</li><li>🤝 跨团队协作</li></ul>" },
    { title: "AI产品PRD要点", content: "<ul><li>📝 数据需求</li><li>📈 效果指标</li><li>⚡ 性能要求</li><li>🔄 迭代策略</li></ul>" },
    { title: "机器学习全流程", content: "<ul><li>📋 问题定义</li><li>📊 数据准备</li><li>🧠 模型开发</li><li>✅ 模型评估</li></ul>" },
    { title: "大模型产品设计", content: "<ul><li>🎯 Prompt工程</li><li>🛡️ 安全边界</li><li>💰 成本控制</li></ul>" },
    { title: "AI产品指标体系", content: "<ul><li>📊 业务指标</li><li>🤖 模型指标</li><li>💡 体验指标</li></ul>" }
];

// ===== State =====
let checkedDays = JSON.parse(localStorage.getItem('checkin') || '[]');

// ===== Init =====
document.addEventListener('DOMContentLoaded', async () => {
    renderAfterworkGreeting();
    updateNavTime();
    setInterval(updateNavTime, 60000);
    initMainTabs();
    initSubTabs();
    loadMarketData();

    initPullRefresh();
    setInterval(loadMarketData, 30000);
    initShare();
    loadTodayStats();
});

function renderAfterworkGreeting() {
    const pick = {
        kicker: '今日头条雷达',
        title: '先看今天最值得关注的两件事',
        copy: '正在整理全球和中国市场重点。下班不用立刻学习，先知道世界今天把钱花在哪。',
        tags: ['全球大事', '中国大事', '影响资产']
    };
    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    };

    setText('afterworkKicker', pick.kicker);
    setText('afterworkTitle', pick.title);
    setText('afterworkCopy', pick.copy);
    setText('afterworkTagOne', pick.tags[0]);
    setText('afterworkTagTwo', pick.tags[1]);
    setText('afterworkTagThree', pick.tags[2]);
}

function updateNavTime() {
    const now = new Date();
    document.getElementById('navTime').textContent = 
        `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
}

// ===== Tabs =====
function initMainTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
            if (tab.dataset.tab === 'finance') refreshAll();
        });
    });
}

function refreshAll() { loadMarketData(); loadAlerts(true); loadHotNews(true); }
function refreshRealtime() { loadMarketData(); forceRefreshAll(); }

// ===== 切换子标签时渲染内容 =====
function initSubTabs() {
    document.querySelectorAll('.sub-tab').forEach(tab => {
        tab.addEventListener('click', async () => {
            document.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.sub-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.sub).classList.add('active');
            
            if (tab.dataset.sub === 'realtime') {
                refreshRealtime();
            } else if (tab.dataset.sub === 'daily') {
                await renderSummaryContent();
            } else if (tab.dataset.sub === 'holdings') {
                renderHoldings();
            }
        });
    });
}

// ===== 市场数据（实时API）- 腾讯证券接口（CORS支持HTTPS）=====
// web.sqt.gtimg.cn 返回 Access-Control-Allow-Origin: *，可直接 fetch
let _marketTimer = null;
let marketSnapshot = {};

async function loadMarketData() {
    if (_marketTimer) clearTimeout(_marketTimer);
    
    try {
        const resp = await fetch('https://web.sqt.gtimg.cn/q=sh000001,hkHSI,usIXIC,sh000300', {
            headers: { 'Referer': 'https://gu.qq.com' }
        });
        const text = await resp.text();
        
        // 提取 v_sh000001 和 v_hkHSI 和 v_usIXIC 和 v_sh000300
        const sh = extractVar(text, 'v_sh000001');
        const hk = extractVar(text, 'v_hkHSI');
        const us = extractVar(text, 'v_usIXIC');
        const csi300 = extractVar(text, 'v_sh000300');
        
        // 上证: [3]=当前价, [32]=涨跌幅
        // 恒指: [3]=当前价, [32]=涨跌幅
        // 纳斯达克: [3]=当前价, [31]=涨跌幅
        // 沪深300: [3]=当前价, [32]=涨跌幅
        marketSnapshot = {};
        if (sh) { const p = sh.split('~'); if (p.length > 32) parsePrice('shIndex', p[3], p[32]); }
        if (hk) { const p = hk.split('~'); if (p.length > 32) parsePrice('hkIndex', p[3], p[32]); }
        if (us) { const p = us.split('~'); if (p.length > 32) parsePrice('usIndex', p[3], p[32]); }
        if (csi300) { const p = csi300.split('~'); if (p.length > 32) parsePrice('csi300Index', p[3], p[32]); }
        updateMarketNote();
    } catch(e) {
        console.warn('行情API失败:', e);
        updateMarketNote(true);
    }
    
    _marketTimer = setTimeout(() => { _marketTimer = null; }, 8000);
}

function extractVar(text, name) {
    const re = new RegExp(name + '="([^"]+)"');
    const m = text.match(re);
    return m ? m[1] : null;
}

function parsePrice(id, priceStr, pctStr) {
    const price = parseFloat(priceStr);
    const pct = parseFloat(pctStr);
    if (!isNaN(price) && !isNaN(pct)) {
        updateMarketItem(id, price, pct);
    }
}

function updateMarketItem(id, value, change) {
    const el = document.getElementById(id);
    if (!el) return;
    const isUp = change >= 0;
    marketSnapshot[id] = change;
    el.className = `market-item ${isUp ? 'up' : 'down'}`;
    el.querySelector('.market-val').textContent = value.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    el.querySelector('.market-change').textContent = `${isUp ? '+' : ''}${change.toFixed(2)}%`;
}

function updateMarketNote(hasError = false) {
    const note = document.getElementById('marketNote');
    if (!note) return;

    if (hasError) {
        note.textContent = '行情接口今天有点慢，先看新闻和高手怎么吵。';
        note.className = 'market-note neutral';
        return;
    }

    const changes = Object.values(marketSnapshot).filter(v => typeof v === 'number' && !Number.isNaN(v));
    if (changes.length === 0) {
        note.textContent = '市场还在加载，先别急着给今天下结论。';
        note.className = 'market-note neutral';
        return;
    }

    const upCount = changes.filter(v => v >= 0).length;
    const avg = changes.reduce((sum, v) => sum + v, 0) / changes.length;
    const strongestMove = changes.reduce((max, v) => Math.abs(v) > Math.abs(max) ? v : max, 0);

    if (upCount === changes.length) {
        note.textContent = `四个主要指数都在红区，市场今天心情不错，但别把开心当买入理由。平均 ${avg.toFixed(2)}%。`;
        note.className = 'market-note up';
    } else if (upCount === 0) {
        note.textContent = `主要指数集体偏绿，今天适合少点冲动，多点观察。平均 ${avg.toFixed(2)}%。`;
        note.className = 'market-note down';
    } else if (Math.abs(strongestMove) >= 1.5) {
        note.textContent = '市场分化明显，有指数动静不小。先看是哪类资产在带节奏，再决定要不要围观。';
        note.className = 'market-note neutral';
    } else {
        note.textContent = `市场有涨有跌，属于“大家都在发表意见但没统一结论”。平均 ${avg.toFixed(2)}%。`;
        note.className = 'market-note neutral';
    }
}

// ===== 热门新闻（从news-loader.js加载）=====

// ===== 下拉刷新 =====
function initPullRefresh() {
    let startY = 0, pulling = false;
    const realtime = document.getElementById('realtime');
    const hint = document.getElementById('refreshHint');
    
    realtime.addEventListener('touchstart', e => {
        if (realtime.scrollTop === 0) { startY = e.touches[0].pageY; pulling = true; }
    });
    
    realtime.addEventListener('touchmove', e => {
        if (!pulling) return;
        if (e.touches[0].pageY - startY > 50) { hint.textContent = '松手，市场重新开锅'; hint.classList.add('active'); }
    });
    
    realtime.addEventListener('touchend', e => {
        if (pulling && e.changedTouches[0].pageY - startY > 50) {
            refreshRealtime();
            hint.textContent = '已更新，热闹续上';
            setTimeout(() => { hint.textContent = '下拉刷新，不必用力'; hint.classList.remove('active'); }, 1500);
        } else {
            hint.textContent = '下拉刷新，不必用力';
            hint.classList.remove('active');
        }
        pulling = false;
    });
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
            localStorage.setItem('checkin', JSON.stringify(checkedDays));
            showChecked();
        
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
        const d = new Date(today); d.setDate(d.getDate() - i);
        if (checkedDays.includes(fmtDate(d))) streak++;
        else if (i > 0) break;
    }
    document.getElementById('streakDays').textContent = streak;
}

function fmtDate(d) {
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

// ===== 实时访问统计（本地计数） =====
async function loadTodayStats() {
    try {
        const today = new Date().toDateString();
        let data = JSON.parse(localStorage.getItem('site_stats') || '{}');
        if (data.date !== today) {
            data = { date: today, pv: 0, uv: 0 };
        }
        data.pv++;
        // UV：用 localStorage 标记当天是否来过
        const visited = localStorage.getItem('visited_' + today);
        if (!visited) {
            data.uv++;
            localStorage.setItem('visited_' + today, '1');
        }
        localStorage.setItem('site_stats', JSON.stringify(data));
        const pvEl = document.getElementById('todayPv');
        const uvEl = document.getElementById('todayUv');
        if (pvEl) pvEl.textContent = data.pv;
        if (uvEl) uvEl.textContent = data.uv;
    } catch(e) {
        // 静默失败
    }
}
