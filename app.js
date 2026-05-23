/**
 * 学习门户 - 完整版
 */

// ===== Config =====
const CONFIG = {
    DATA_URL: 'data/briefings/',
    TYPES: ['morning', 'noon', 'evening', 'night'],
    TYPE_LABELS: { morning: '🌅 早间财经', noon: '☀️ 午间财经', evening: '🌆 晚间财经', night: '🌙 深夜财经' },
    REFRESH_INTERVAL: 30000 // 30秒刷新市场数据
};

// ===== AI PM知识库 =====
const KNOWLEDGE = [
    { title: "AI产品经理核心能力", content: "<ul><li>🎯 技术理解力</li><li>📊 数据思维</li><li>💡 产品设计力</li><li>🤝 跨团队协作</li></ul>" },
    { title: "AI产品PRD要点", content: "<ul><li>📝 数据需求</li><li>📈 效果指标</li><li>⚡ 性能要求</li><li>🔄 迭代策略</li></ul>" },
    { title: "机器学习全流程", content: "<ul><li>📋 问题定义</li><li>📊 数据准备</li><li>🧠 模型开发</li><li>✅ 模型评估</li></ul>" },
    { title: "大模型产品设计", content: "<ul><li>🎯 Prompt工程</li><li>🛡️ 安全边界</li><li>💰 成本控制</li></ul>" },
    { title: "AI产品指标体系", content: "<ul><li>📊 业务指标</li><li>🤖 模型指标</li><li>💡 体验指标</li></ul>" }
];

// ===== 热门新闻数据 =====
const HOT_NEWS = [
    { rank: 1, time: "12:30", source: "财联社", title: "A股三大指数午间收涨 沪指重返3400点", summary: "成交额超8000亿，市场情绪回暖", detail: "今日A股市场全面上涨，沪指涨1.23%重返3400点，深成指涨1.45%，创业板指涨1.89%。成交额达8234亿元，较昨日放量15%。北向资金净流入82.3亿元，连续3日净流入。板块方面，券商、新能源、半导体领涨，房地产、银行小幅调整。市场分析人士认为，政策面持续利好叠加资金面宽松，短期市场有望继续反弹。" },
    { rank: 2, time: "12:15", source: "华尔街见闻", title: "美联储会议纪要：官员对通胀走势存在分歧", summary: "6月维持利率不变概率超90%", detail: "美联储公布4月会议纪要，多数官员认为通胀回落速度慢于预期，但对年内降息仍持开放态度。市场预计6月维持利率不变的概率达92%，首次降息可能在9月。纪要显示，部分官员对服务业通胀粘性表示担忧，建议维持高利率更长时间。受此影响，美元指数小幅走强至104.5，美债收益率持平。" },
    { rank: 3, time: "11:58", source: "证券时报", title: "宁德时代发布固态电池量产时间表", summary: "2027年小批量装车，股价涨超5%", detail: "宁德时代在投资者日活动上宣布，全固态电池研发取得突破性进展，计划2027年实现小批量装车。该电池能量密度达500Wh/kg，是现有产品的两倍。公司同时宣布将投入50亿元用于固态电池产线建设。消息刺激宁德时代股价涨5.2%，带动整个新能源板块上涨3.8%。" },
    { rank: 4, time: "11:30", source: "第一财经", title: "个人养老金制度全面推开 投资范围扩大", summary: "新增REITs和指数基金", detail: "人社部宣布个人养老金制度在全国范围内全面实施，投资范围新增公募REITs、指数基金和FOF基金。每年缴存上限维持12000元，可享受税收优惠。目前已有超过5000万人开户，累计缴存金额超过280亿元。专家建议，年轻人可选择权益类基金获取更高收益，临近退休者可配置固收类产品。" },
    { rank: 5, time: "11:05", source: "Bloomberg", title: "日元汇率跌至160关口 干预预期升温", summary: "美元强势运行，日本财务省发出警告", detail: "日元兑美元汇率跌破160心理关口，创34年新低。日本财务省官员再次发出警告，表示将采取适当措施应对汇率过度波动。市场分析认为，美日利差持续扩大是日元贬值主因。日本央行加息预期推迟至7月，短期日元仍承压。投资者需关注日本央行干预风险。" },
    { rank: 6, time: "10:42", source: "新华社", title: "4月社融增量超预期 信贷结构改善", summary: "企业中长期贷款回暖", detail: "央行公布4月金融数据，社会融资规模增量为3.2万亿元，同比多增1.2万亿元，超出市场预期。企业中长期贷款增加1.2万亿元，显示实体经济融资需求回暖。居民贷款增加4500亿元，其中房贷占比下降，消费贷增长较快。M2增速维持在8.5%的合理水平。" },
    { rank: 7, time: "10:15", source: "路透社", title: "比特币突破11万美元创历史新高", summary: "机构资金持续流入ETF", detail: "比特币价格突破11万美元关口，创历史新高，总市值突破2.1万亿美元。现货比特币ETF单日净流入达15亿美元，创近期新高。分析师认为，机构资金持续入场、减半效应叠加宏观流动性宽松是主要推动力。但需警惕短期获利回吐风险。" },
    { rank: 8, time: "09:45", source: "21世纪经济", title: "国际油价突破85美元 OPEC+减产持续", summary: "能源板块受益", detail: "布伦特原油期货价格突破85美元/桶，创近一个月新高。OPEC+成员国减产协议执行良好，沙特自愿减产100万桶/日的措施延长至二季度末。国内能源板块受益上涨，中国石油涨2.1%，中国石化涨1.8%。分析师预计，夏季用油高峰期油价仍有上行空间。" },
    { rank: 9, time: "09:20", source: "央行官网", title: "央行开展1000亿元MLF操作 利率不变", summary: "流动性合理充裕", detail: "央行今日开展1000亿元中期借贷便利（MLF）操作，中标利率维持2.50%不变。本月MLF到期量为1200亿元，净回笼200亿元。市场人士认为，央行维持流动性合理充裕的基调不变，短端利率有望保持稳定。债市小幅上涨，10年期国债收益率下行2个基点至2.28%。" },
    { rank: 10, time: "09:00", source: "上交所", title: "北向资金早盘净流入超50亿", summary: "外资加仓消费和新能源", detail: "截至午间收盘，北向资金净流入52.3亿元，其中沪股通净流入28.7亿元，深股通净流入23.6亿元。外资重点加仓白酒、新能源、半导体板块。贵州茅台获净买入8.2亿元居首，宁德时代获净买入6.5亿元。分析人士指出，A股估值处于历史低位，对长线资金吸引力增强。" }
];

// ===== State =====
let checkedDays = JSON.parse(localStorage.getItem('checkin') || '[]');
let allBriefings = [];
let selectedDate = null;
let selectedInvestor = 'all';
let expandedNews = null;

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    updateNavTime();
    setInterval(updateNavTime, 60000);
    initMainTabs();
    initSubTabs();
    initInvestorFilter();
    loadMarketData();
    renderAlerts();
    renderHotNews();
    loadBriefings();
    renderDailyCard();
    renderProgress();
    initCheckin();
    initPullRefresh();
    
    // 定时刷新市场数据
    setInterval(loadMarketData, CONFIG.REFRESH_INTERVAL);
});

function updateNavTime() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('navTime').textContent = `${h}:${m}`;
}

// ===== 主标签 =====
function initMainTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
            
            // 切换到财经时刷新数据
            if (tab.dataset.tab === 'finance') {
                refreshAll();
            }
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
            
            // 切换子标签时刷新
            if (tab.dataset.sub === 'realtime') {
                refreshRealtime();
            }
        });
    });
}

// ===== 刷新所有 =====
function refreshAll() {
    loadMarketData();
    renderAlerts();
    renderHotNews();
}

function refreshRealtime() {
    loadMarketData();
    renderHotNews();
}

// ===== 市场数据（模拟实时）=====
function loadMarketData() {
    // 模拟实时数据波动
    const baseData = {
        sh: { base: 3412.56, change: 1.23 },
        hk: { base: 18234.12, change: -0.45 },
        us: { base: 16892.34, change: 0.89 }
    };
    
    // 添加随机波动
    const fluctuate = (val) => (Math.random() - 0.5) * 2;
    
    updateMarketItem('shIndex', baseData.sh.base + fluctuate(10), baseData.sh.change + fluctuate(0.1));
    updateMarketItem('hkIndex', baseData.hk.base + fluctuate(50), baseData.hk.change + fluctuate(0.15));
    updateMarketItem('usIndex', baseData.us.base + fluctuate(30), baseData.us.change + fluctuate(0.12));
}

function updateMarketItem(id, value, change) {
    const el = document.getElementById(id);
    if (!el) return;
    
    const isUp = change >= 0;
    el.className = `market-item ${isUp ? 'up' : 'down'}`;
    el.querySelector('.market-val').textContent = value.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    el.querySelector('.market-change').textContent = `${isUp ? '+' : ''}${change.toFixed(2)}%`;
}

// ===== 提示卡片 =====
function renderAlerts() {
    const alerts = [
        { type: 'forex', icon: '💱', title: '外汇提示', text: '日元跌破160关口，关注日本央行干预' },
        { type: 'stock', icon: '📈', title: '股市动向', text: 'A股放量上涨，北向资金连续3日净流入' }
    ];
    
    document.getElementById('alertArea').innerHTML = alerts.map(a => `
        <div class="alert-card ${a.type}">
            <div class="alert-icon">${a.icon}</div>
            <div class="alert-content">
                <div class="alert-title">${a.title}</div>
                <div class="alert-text">${a.text}</div>
            </div>
        </div>
    `).join('');
}

// ===== 热门新闻（可展开）=====
function renderHotNews() {
    const el = document.getElementById('hotNewsList');
    el.innerHTML = HOT_NEWS.map(news => `
        <div class="news-item ${expandedNews === news.rank ? 'expanded' : ''}" onclick="toggleNews(${news.rank})">
            <div class="news-rank ${news.rank <= 3 ? 'hot' : ''}">${news.rank}</div>
            <div class="news-body">
                <div class="news-head">
                    <span class="news-source">${news.source}</span>
                    <span class="news-time">${news.time}</span>
                </div>
                <div class="news-title">${news.title}</div>
                <div class="news-summary">${news.summary}</div>
                <div class="news-detail">${news.detail}</div>
            </div>
        </div>
    `).join('');
}

function toggleNews(rank) {
    expandedNews = expandedNews === rank ? null : rank;
    renderHotNews();
}

// ===== 下拉刷新 =====
function initPullRefresh() {
    let startY = 0;
    let pulling = false;
    const realtime = document.getElementById('realtime');
    const hint = document.getElementById('refreshHint');
    
    realtime.addEventListener('touchstart', e => {
        if (realtime.scrollTop === 0) {
            startY = e.touches[0].pageY;
            pulling = true;
        }
    });
    
    realtime.addEventListener('touchmove', e => {
        if (!pulling) return;
        const diff = e.touches[0].pageY - startY;
        if (diff > 50) {
            hint.textContent = '松开刷新';
            hint.classList.add('active');
        }
    });
    
    realtime.addEventListener('touchend', e => {
        if (pulling) {
            const diff = e.changedTouches[0].pageY - startY;
            if (diff > 50) {
                refreshRealtime();
                hint.textContent = '已更新';
                setTimeout(() => { hint.textContent = '下拉刷新'; hint.classList.remove('active'); }, 1500);
            } else {
                hint.textContent = '下拉刷新';
                hint.classList.remove('active');
            }
        }
        pulling = false;
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
            if (kw.some(k => line.includes(k))) { result.push(line); found = true; }
            if (line.startsWith('⚡') || line.startsWith('🎯')) inSection = false;
        } else if (line.startsWith('📊') || line.startsWith('🔥') || line.startsWith('📌') || line.startsWith('⚡') || line.startsWith('🎯')) {
            result.push(line);
        }
    }
    const labels = { templeton: '🌍 邓普顿视角', buffett: '💰 巴菲特视角', munger: '🧠 芒格视角' };
    return found ? `${labels[investor]}\n\n${result.join('\n')}` : content;
}

// ===== 简报 =====
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
    if (!selectedDate) selectDate(fmtDate(today));
}

function fmtDate(d) {
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function renderDailyList() {
    const el = document.getElementById('dailyList');
    const grouped = {};
    allBriefings.forEach(b => {
        if (!grouped[b.date]) grouped[b.date] = [];
        grouped[b.date].push(b);
    });
    
    const dates = Object.keys(grouped).sort().reverse();
    if (!dates.length) { el.innerHTML = '<div class="empty-hint">暂无简报</div>'; return; }
    
    el.innerHTML = dates.map(date => {
        const items = grouped[date];
        const display = fmtDisplay(date);
        const sel = date === selectedDate ? 'selected' : '';
        return `
            <div class="date-item ${sel}" onclick="selectDate('${date}')">
                <div class="date-head">
                    <span class="date-label">${display}</span>
                    <span class="date-count">${items.length}条简报</span>
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
            localStorage.setItem('checkin', JSON.stringify(checkedDays));
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
