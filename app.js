     1|/**
     2| * 学习门户 - 紧凑版
     3| */
     4|
     5|// ===== Config =====
     6|const CONFIG = {
     7|    DATA_URL: 'data/briefings/',
     8|    TYPES: ['morning', 'noon', 'evening', 'night'],
     9|    TYPE_LABELS: { morning: '🌅早', noon: '☀️午', evening: '🌆晚', night: '🌙夜' }
    10|};
    11|
    12|const STORAGE = { CHECKIN: 'portal_checkin' };
    13|
    14|// ===== AI PM Knowledge =====
    15|const KNOWLEDGE = [
    16|    { title: "AI产品经理核心能力", content: "<ul><li>🎯 技术理解力</li><li>📊 数据思维</li><li>💡 产品设计力</li><li>🤝 跨团队协作</li></ul>" },
    17|    { title: "AI产品PRD要点", content: "<ul><li>📝 数据需求</li><li>📈 效果指标</li><li>⚡ 性能要求</li><li>🔄 迭代策略</li></ul>" },
    18|    { title: "机器学习全流程", content: "<ul><li>📋 问题定义</li><li>📊 数据准备</li><li>🧠 模型开发</li><li>✅ 模型评估</li><li>🚀 部署上线</li></ul>" },
    19|    { title: "大模型产品设计", content: "<ul><li>🎯 Prompt工程</li><li>🛡️ 安全边界</li><li>💰 成本控制</li><li>📊 效果评估</li></ul>" },
    20|    { title: "AI产品指标体系", content: "<ul><li>📊 业务指标</li><li>🤖 模型指标</li><li>💡 体验指标</li></ul>" }
    21|];
    22|
    23|// ===== State =====
    24|let checkedDays = JSON.parse(localStorage.getItem(STORAGE.CHECKIN) || '[]');
    25|let allBriefings = [];
    26|let selectedDate = null;
    27|let selectedInvestor = 'all';
    28|
    29|// ===== Init =====
    30|document.addEventListener('DOMContentLoaded', () => {
    31|    initTabs();
    32|    initInvestorFilter();
    33|    loadBriefings();
    34|    renderDailyCard();
    35|    renderProgress();
    36|    initCheckin();
    37|});
    38|
    39|// ===== Tabs =====
    40|function initTabs() {
    41|    document.querySelectorAll('.tab').forEach(tab => {
    42|        tab.addEventListener('click', () => {
    43|            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    44|            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    45|            tab.classList.add('active');
    46|            document.getElementById(tab.dataset.tab).classList.add('active');
    47|        });
    48|    });
    49|}
    50|
    51|// ===== Investor Filter =====
    52|function initInvestorFilter() {
    53|    document.querySelectorAll('.filter-btn').forEach(btn => {
    54|        btn.addEventListener('click', () => {
    55|            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    56|            btn.classList.add('active');
    57|            selectedInvestor = btn.dataset.investor;
    58|            if (selectedDate) {
    59|                const items = allBriefings.filter(b => b.date === selectedDate);
    60|                renderBriefingDetail(items);
    61|            }
    62|        });
    63|    });
    64|}
    65|
    66|function filterContent(content, investor) {
    67|    if (investor === 'all') return content;
    68|    
    69|    const lines = content.split('\n');
    70|    const result = [];
    71|    let inSection = false;
    72|    let found = false;
    73|    
    74|    const kw = { templeton: ['邓普顿'], buffett: ['巴菲特'], munger: ['芒格'] }[investor] || [];
    75|    
    76|    for (const line of lines) {
    77|        if (line.includes('三视角') || line.includes('速评')) {
    78|            result.push(line);
    79|            inSection = true;
    80|            continue;
    81|        }
    82|        if (inSection) {
    83|            if (kw.some(k => line.includes(k))) {
    84|                result.push(line);
    85|                found = true;
    86|            }
    87|            if (line.startsWith('⚡') || line.startsWith('🎯')) inSection = false;
    88|        } else if (line.startsWith('📊') || line.startsWith('🔥') || line.startsWith('📌') || line.startsWith('⚡') || line.startsWith('🎯')) {
    89|            result.push(line);
    90|        }
    91|    }
    92|    
    93|    const labels = { templeton: '🌍 邓普顿', buffett: '💰 巴菲特', munger: '🧠 芒格' };
    94|    return found ? `${labels[investor]}视角\n\n${result.join('\n')}` : content;
    95|}
    96|
    97|// ===== Load Briefings =====
    98|async function loadBriefings() {
    99|    allBriefings = [];
   100|    const today = new Date();
   101|    
   102|    for (let i = 0; i < 30; i++) {
   103|        const d = new Date(today);
   104|        d.setDate(d.getDate() - i);
   105|        const ds = fmtDate(d);
   106|        
   107|        for (const type of CONFIG.TYPES) {
   108|            try {
   109|                const r = await fetch(CONFIG.DATA_URL + `${ds}-${type}.json`);
   110|                if (r.ok) {
   111|                    const data = await r.json();
   112|                    allBriefings.push({
   113|                        date: ds, type, time: data.time || '00:00',
   114|                        content: data.content, label: CONFIG.TYPE_LABELS[type]
   115|                    });
   116|                }
   117|            } catch(e) {}
   118|        }
   119|    }
   120|    
   121|    allBriefings.sort((a, b) => b.date.localeCompare(a.date) || a.time.localeCompare(b.time));
   122|    
   123|    renderDateList();
   124|    selectDate(fmtDate(today));
   125|}
   126|
   127|function fmtDate(d) {
   128|    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
   129|}
   130|
   131|// ===== Date List =====
   132|function renderDateList() {
   133|    const el = document.getElementById('newsList');
   134|    const grouped = {};
   135|    allBriefings.forEach(b => {
   136|        if (!grouped[b.date]) grouped[b.date] = [];
   137|        grouped[b.date].push(b);
   138|    });
   139|    
   140|    const dates = Object.keys(grouped).sort().reverse();
   141|    
   142|    if (!dates.length) {
   143|        el.innerHTML = '<div class="empty-hint">📰 暂无简报<br>每日自动更新</div>';
   144|        return;
   145|    }
   146|    
   147|    el.innerHTML = dates.map(date => {
   148|        const items = grouped[date];
   149|        const display = fmtDisplay(date);
   150|        const sel = date === selectedDate ? 'selected' : '';
   151|        return `
   152|            <div class="date-item ${sel}" onclick="selectDate('${date}')">
   153|                <div class="date-head">
   154|                    <span class="date-label">${display}</span>
   155|                    <span class="date-count">${items.length}条</span>
   156|                </div>
   157|                <div class="date-tags">
   158|                    ${items.map(i => `<span class="tag">${i.label}</span>`).join('')}
   159|                </div>
   160|            </div>`;
   161|    }).join('');
   162|}
   163|
   164|function fmtDisplay(dateStr) {
   165|    const d = new Date(dateStr);
   166|    const diff = Math.floor((new Date() - d) / 86400000);
   167|    if (diff === 0) return '今天';
   168|    if (diff === 1) return '昨天';
   169|    if (diff === 2) return '前天';
   170|    return `${d.getMonth()+1}月${d.getDate()}日`;
   171|}
   172|
   173|// ===== Select Date =====
   174|function selectDate(dateStr) {
   175|    selectedDate = dateStr;
   176|    renderDateList();
   177|    renderBriefingDetail(allBriefings.filter(b => b.date === dateStr));
   178|}
   179|
   180|function renderBriefingDetail(items) {
   181|    const el = document.getElementById('briefingDetail');
   182|    if (!items?.length) { el.innerHTML = ''; el.classList.add('hidden'); return; }
   183|    
   184|    el.classList.remove('hidden');
   185|    el.innerHTML = items.map(item => {
   186|        const content = filterContent(item.content, selectedInvestor);
   187|        return `
   188|            <div class="briefing-card">
   189|                <div class="briefing-head">
   190|                    <span class="briefing-type">${item.label}</span>
   191|                    <span class="briefing-time">${item.time}</span>
   192|                </div>
   193|                <div class="briefing-content">${content.replace(/\n/g, '<br>')}</div>
   194|            </div>`;
   195|    }).join('');
   196|}
   197|
   198|// ===== Daily Card =====
   199|function renderDailyCard() {
   200|    const today = new Date();
   201|    const idx = Math.floor((today - new Date(today.getFullYear(),0,0)) / 86400000) % KNOWLEDGE.length;
   202|    const k = KNOWLEDGE[idx];
   203|    document.getElementById('pmTitle').textContent = k.title;
   204|    document.getElementById('pmContent').innerHTML = k.content;
   205|    
   206|    const ts = fmtDate(today);
   207|    if (checkedDays.includes(ts)) showChecked();
   208|}
   209|
   210|// ===== Checkin =====
   211|function initCheckin() {
   212|    document.getElementById('checkinBtn').addEventListener('click', function() {
   213|        const ts = fmtDate(new Date());
   214|        if (!checkedDays.includes(ts)) {
   215|            checkedDays.push(ts);
   216|            localStorage.setItem(STORAGE.CHECKIN, JSON.stringify(checkedDays));
   217|            showChecked();
   218|            renderProgress();
   219|        }
   220|    });
   221|}
   222|
   223|function showChecked() {
   224|    const btn = document.getElementById('checkinBtn');
   225|    btn.classList.add('checked');
   226|    btn.textContent = '✓ 已打卡';
   227|}
   228|
   229|// ===== Progress =====
   230|function renderProgress() {
   231|    const today = new Date();
   232|    let done = 0;
   233|    for (let i = 1; i <= today.getDate(); i++) {
   234|        const d = new Date(today.getFullYear(), today.getMonth(), i);
   235|        if (checkedDays.includes(fmtDate(d))) done++;
   236|    }
   237|    const rate = Math.round(done / today.getDate() * 100);
   238|    document.getElementById('completionRate').textContent = rate + '%';
   239|    document.getElementById('progressFill').style.width = rate + '%';
   240|    
   241|    // Streak
   242|    let streak = 0;
   243|    for (let i = 0; i < 365; i++) {
   244|        const d = new Date(today);
   245|        d.setDate(d.getDate() - i);
   246|        if (checkedDays.includes(fmtDate(d))) streak++;
   247|        else if (i > 0) break;
   248|    }
   249|    document.getElementById('streakDays').textContent = streak;
   250|}
   251|
   252|// ===== Modal =====
   253|function initModal() {
   254|    const modal = document.getElementById('addNewsModal');
   255|    document.getElementById('addNews').onclick = () => modal.classList.remove('hidden');
   256|    document.getElementById('modalClose').onclick = () => modal.classList.add('hidden');
   257|    modal.onclick = e => { if (e.target === modal) modal.classList.add('hidden'); };
   258|    
   259|    document.getElementById('newsForm').onsubmit = e => {
   260|        e.preventDefault();
   261|        // 简化的保存逻辑
   262|        modal.classList.add('hidden');
   263|        e.target.reset();
   264|    };
   265|}
   266|