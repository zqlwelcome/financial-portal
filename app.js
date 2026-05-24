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
    updateNavTime();
    setInterval(updateNavTime, 60000);
    initMainTabs();
    initSubTabs();
    initSlideSelector();
    loadMarketData();
    await renderSummaryContent();

    initPullRefresh();
    setInterval(loadMarketData, 30000);
});

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
            }
        });
    });
}

// ===== 市场数据（实时API）=====
async function loadMarketData() {
    try {
        // 使用新浪财经API（中国可访问）
        const [shRes, hkRes, usRes] = await Promise.all([
            fetch('https://hq.sinajs.cn/list=s_sh000001', { headers: { 'Referer': 'https://finance.sina.com.cn' } }).then(r => r.text()),
            fetch('https://hq.sinajs.cn/list=hkHSI', { headers: { 'Referer': 'https://finance.sina.com.cn' } }).then(r => r.text()),
            fetch('https://hq.sinajs.cn/list=gb_ixic', { headers: { 'Referer': 'https://finance.sina.com.cn' } }).then(r => r.text()),
        ]);

        // 解析上证: 名称,当前价,涨跌额,涨跌幅,成交量,成交额
        const shMatch = shRes.match(/"([^"]+)"/);
        if (shMatch) {
            const parts = shMatch[1].split(',');
            const price = parseFloat(parts[1]);
            const changePct = parseFloat(parts[3]);
            if (!isNaN(price) && !isNaN(changePct)) {
                updateMarketItem('shIndex', price, changePct);
            }
        }

        // 解析恒生: HSI,名称,当前价,开盘,最高,最低,昨收,涨跌额,涨跌幅,...
        const hkMatch = hkRes.match(/"([^"]+)"/);
        if (hkMatch) {
            const parts = hkMatch[1].split(',');
            if (parts[0] === 'HSI') {
                const price = parseFloat(parts[2]);
                const changePct = parseFloat(parts[8]);
                if (!isNaN(price) && !isNaN(changePct)) {
                    updateMarketItem('hkIndex', price, changePct);
                }
            }
        }

        // 解析纳斯达克（gb_ixic返回较多字段）
        const usMatch = usRes.match(/"([^"]+)"/);
        if (usMatch) {
            const parts = usMatch[1].split(',');
            const price = parseFloat(parts[1]);
            const changePct = parseFloat(parts[3]);
            if (!isNaN(price) && !isNaN(changePct)) {
                updateMarketItem('usIndex', price, changePct);
            }
        }
    } catch(e) {
        console.warn('市场数据API失败，使用缓存:', e);
        // fallback保留上次值，不做任何更新
    }
}

function updateMarketItem(id, value, change) {
    const el = document.getElementById(id);
    if (!el) return;
    const isUp = change >= 0;
    el.className = `market-item ${isUp ? 'up' : 'down'}`;
    el.querySelector('.market-val').textContent = value.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    el.querySelector('.market-change').textContent = `${isUp ? '+' : ''}${change.toFixed(2)}%`;
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
        if (e.touches[0].pageY - startY > 50) { hint.textContent = '松开刷新'; hint.classList.add('active'); }
    });
    
    realtime.addEventListener('touchend', e => {
        if (pulling && e.changedTouches[0].pageY - startY > 50) {
            refreshRealtime();
            hint.textContent = '已更新';
            setTimeout(() => { hint.textContent = '下拉刷新'; hint.classList.remove('active'); }, 1500);
        } else {
            hint.textContent = '下拉刷新';
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
