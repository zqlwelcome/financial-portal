     1|/**
     2| * 学习门户 - 主应用
     3| */
     4|
     5|// ===== 热门新闻（从news-loader.js加载）=====
     6|
     7|// ===== AI PM知识库 =====
     8|const KNOWLEDGE = [
     9|    { title: "AI产品经理核心能力", content: "<ul><li>🎯 技术理解力</li><li>📊 数据思维</li><li>💡 产品设计力</li><li>🤝 跨团队协作</li></ul>" },
    10|    { title: "AI产品PRD要点", content: "<ul><li>📝 数据需求</li><li>📈 效果指标</li><li>⚡ 性能要求</li><li>🔄 迭代策略</li></ul>" },
    11|    { title: "机器学习全流程", content: "<ul><li>📋 问题定义</li><li>📊 数据准备</li><li>🧠 模型开发</li><li>✅ 模型评估</li></ul>" },
    12|    { title: "大模型产品设计", content: "<ul><li>🎯 Prompt工程</li><li>🛡️ 安全边界</li><li>💰 成本控制</li></ul>" },
    13|    { title: "AI产品指标体系", content: "<ul><li>📊 业务指标</li><li>🤖 模型指标</li><li>💡 体验指标</li></ul>" }
    14|];
    15|
    16|// ===== State =====
    17|let checkedDays = JSON.parse(localStorage.getItem('checkin') || '[]');
    18|
    19|// ===== Init =====
    20|document.addEventListener('DOMContentLoaded', () => {
    21|    updateNavTime();
    22|    setInterval(updateNavTime, 60000);
    23|    initMainTabs();
    24|    initSubTabs();
    25|    initMasterTabs();
    26|    loadMarketData();
    27|    renderSummaryContent();
    28|
    29|
    30|
    31|    initPullRefresh();
    32|    setInterval(loadMarketData, 30000);
    33|});
    34|
    35|function updateNavTime() {
    36|    const now = new Date();
    37|    document.getElementById('navTime').textContent = 
    38|        `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    39|}
    40|
    41|// ===== Tabs =====
    42|function initMainTabs() {
    43|    document.querySelectorAll('.tab').forEach(tab => {
    44|        tab.addEventListener('click', () => {
    45|            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    46|            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    47|            tab.classList.add('active');
    48|            document.getElementById(tab.dataset.tab).classList.add('active');
    49|            if (tab.dataset.tab === 'finance') refreshAll();
    50|        });
    51|    });
    52|}
    53|
    54|function refreshAll() { loadMarketData(); loadAlerts(true); loadHotNews(true); }
    55|function refreshRealtime() { loadMarketData(); forceRefreshAll(); }
    56|
    57|// ===== 切换子标签时渲染内容 =====
    58|function initSubTabs() {
    59|    document.querySelectorAll('.sub-tab').forEach(tab => {
    60|        tab.addEventListener('click', () => {
    61|            document.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
    62|            document.querySelectorAll('.sub-content').forEach(c => c.classList.remove('active'));
    63|            tab.classList.add('active');
    64|            document.getElementById(tab.dataset.sub).classList.add('active');
    65|            
    66|            if (tab.dataset.sub === 'realtime') {
    67|                refreshRealtime();
    68|            } else if (tab.dataset.sub === 'daily') {
    69|                renderSummaryContent();
    70|            }
    71|        });
    72|    });
    73|}
    74|
    75|// ===== 市场数据 =====
    76|function loadMarketData() {
    77|    const fluctuate = () => (Math.random() - 0.5) * 2;
    78|    updateMarketItem('shIndex', 3412.56 + fluctuate(10), 1.23 + fluctuate(0.1));
    79|    updateMarketItem('hkIndex', 18234.12 + fluctuate(50), -0.45 + fluctuate(0.15));
    80|    updateMarketItem('usIndex', 16892.34 + fluctuate(30), 0.89 + fluctuate(0.12));
    81|}
    82|
    83|function updateMarketItem(id, value, change) {
    84|    const el = document.getElementById(id);
    85|    if (!el) return;
    86|    const isUp = change >= 0;
    87|    el.className = `market-item ${isUp ? 'up' : 'down'}`;
    88|    el.querySelector('.market-val').textContent = value.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    89|    el.querySelector('.market-change').textContent = `${isUp ? '+' : ''}${change.toFixed(2)}%`;
    90|}
    91|
    92|// ===== 热门新闻（从news-loader.js加载）=====
    93|
    94|// ===== 下拉刷新 =====
    95|function initPullRefresh() {
    96|    let startY = 0, pulling = false;
    97|    const realtime = document.getElementById('realtime');
    98|    const hint = document.getElementById('refreshHint');
    99|    
   100|    realtime.addEventListener('touchstart', e => {
   101|        if (realtime.scrollTop === 0) { startY = e.touches[0].pageY; pulling = true; }
   102|    });
   103|    
   104|    realtime.addEventListener('touchmove', e => {
   105|        if (!pulling) return;
   106|        if (e.touches[0].pageY - startY > 50) { hint.textContent = '松开刷新'; hint.classList.add('active'); }
   107|    });
   108|    
   109|    realtime.addEventListener('touchend', e => {
   110|        if (pulling && e.changedTouches[0].pageY - startY > 50) {
   111|            refreshRealtime();
   112|            hint.textContent = '已更新';
   113|            setTimeout(() => { hint.textContent = '下拉刷新'; hint.classList.remove('active'); }, 1500);
   114|        } else {
   115|            hint.textContent = '下拉刷新';
   116|            hint.classList.remove('active');
   117|        }
   118|        pulling = false;
   119|    });
   120|}
   121|
   122|// ===== 打卡 =====
   123|function renderDailyCard() {
   124|    const today = new Date();
   125|    const idx = Math.floor((today - new Date(today.getFullYear(),0,0)) / 86400000) % KNOWLEDGE.length;
   126|    const k = KNOWLEDGE[idx];
   127|    document.getElementById('pmTitle').textContent = k.title;
   128|    document.getElementById('pmContent').innerHTML = k.content;
   129|    if (checkedDays.includes(fmtDate(today))) showChecked();
   130|}
   131|
   132|function initCheckin() {
   133|    document.getElementById('checkinBtn').addEventListener('click', function() {
   134|        const ts = fmtDate(new Date());
   135|        if (!checkedDays.includes(ts)) {
   136|            checkedDays.push(ts);
   137|            localStorage.setItem('checkin', JSON.stringify(checkedDays));
   138|            showChecked();
   139|        
   140|        }
   141|    });
   142|}
   143|
   144|function showChecked() {
   145|    const btn = document.getElementById('checkinBtn');
   146|    btn.classList.add('checked');
   147|    btn.textContent = '✓ 已打卡';
   148|}
   149|
   150|function renderProgress() {
   151|    const today = new Date();
   152|    let done = 0;
   153|    for (let i = 1; i <= today.getDate(); i++) {
   154|        if (checkedDays.includes(fmtDate(new Date(today.getFullYear(), today.getMonth(), i)))) done++;
   155|    }
   156|    const rate = Math.round(done / today.getDate() * 100);
   157|    document.getElementById('completionRate').textContent = rate + '%';
   158|    document.getElementById('progressFill').style.width = rate + '%';
   159|    
   160|    let streak = 0;
   161|    for (let i = 0; i < 365; i++) {
   162|        const d = new Date(today); d.setDate(d.getDate() - i);
   163|        if (checkedDays.includes(fmtDate(d))) streak++;
   164|        else if (i > 0) break;
   165|    }
   166|    document.getElementById('streakDays').textContent = streak;
   167|}
   168|
   169|function fmtDate(d) {
   170|    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
   171|}
   172|