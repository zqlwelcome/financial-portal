/**
 * 投资观点页签
 * 数据源：hot-news.json + alerts.json + expert-views.json（每10分钟 cron 更新）
 * 展示：市场情绪卡片 + 三位达人观点切换
 */

let _currentExpert = 'templeton';

// ===== 初始化 =====
function initExpertView() {
    _currentExpert = 'templeton';
    renderExpertView();
}

// ===== 渲染主视图 =====
async function renderExpertView() {
    const el = document.getElementById('summaryContent');
    if (!el) return;
    
    el.innerHTML = '<div style="text-align:center;padding:30px 0;">⏳ 加载中...</div>';
    
    // 加载情绪和达人数据
    let moodData = null, expertsData = null;
    
    // 先从expert-views.json加载（cron生成的最新数据）
    try {
        const res = await xhrFetch('data/expert-views.json');
        if (res && res.mood) moodData = res.mood;
        if (res && res.experts) expertsData = res.experts;
    } catch(e) {}
    
    // 如果没加载到，从hot-news实时生成
    if (!moodData) {
        const { hotNews, alerts } = await loadSummaryData();
        if (hotNews && hotNews.length > 0) {
            moodData = assessMarketMood(hotNews);
            const gen = generateExpertViews(hotNews, alerts);
            expertsData = expertsData || gen;
            window._lastNewsData = { hotNews, alerts };
        }
    }
    
    // 默认情绪
    if (!moodData) moodData = { mood: '待更新', icon: '⏳', color: '#8e8e93', confidence: '-', dimensions: [] };
    if (!expertsData) expertsData = {};
    
    const expertMeta = {
        templeton: { name: '邓普顿', fullName: '约翰·邓普顿', icon: '🌍', subtitle: '逆向投资之父', color: '#5856d6' },
        buffett:   { name: '巴菲特', fullName: '沃伦·巴菲特', icon: '💰', subtitle: '价值投资之王', color: '#ff9500' },
        munger:    { name: '芒格',   fullName: '查理·芒格',   icon: '🧠', subtitle: '多元思维大师', color: '#34c759' }
    };
    
    // 情绪维度展示
    const dims = moodData.dimensions || [];
    const dimHtml = dims.map(d => `
        <div class="mood-dim">
            <span class="mood-dot"></span>
            <span class="mood-dlabel">${d.label}</span>
            <span class="mood-dvalue">${d.value}</span>
        </div>
    `).join('');
    
    // 达人切换标签
    const expertTabs = Object.keys(expertMeta).map(k => {
        const m = expertMeta[k];
        const active = k === _currentExpert ? ' active' : '';
        return `
            <button class="etab${active}" onclick="_currentExpert='${k}';renderExpertView()" style="background:${m.color}15;color:${m.color};${active ? 'background:'+m.color+';color:white' : ''}">
                <span class="etab-icon">${m.icon}</span>
                <span class="etab-name">${m.name}</span>
            </button>
        `;
    }).join('');
    
    // 当前选中达人的内容
    const m = expertMeta[_currentExpert];
    const ex = expertsData[_currentExpert];
    
    let expertHtml = '';
    if (ex && ex.insight) {
        expertHtml = `
            <div class="expert-banner" style="background:${m.color}">
                <div class="eb-avatar">${m.icon}</div>
                <div class="eb-info">
                    <div class="eb-name">${m.fullName}</div>
                    <div class="eb-sub">${m.subtitle}</div>
                </div>
            </div>
            <div class="expert-block-slim">
                <div class="ebs-header">📖 解读</div>
                <div class="ebs-body">${ex.insight.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="expert-block-slim" style="border-left-color:var(--orange);">
                <div class="ebs-header">⚡ 建议</div>
                <div class="ebs-body" style="font-weight:500;color:#664d03;">${ex.action || '等待数据更新...'}</div>
            </div>
        `;
    } else {
        expertHtml = `<div style="text-align:center;padding:30px 0;color:var(--text2);font-size:14px;">等待新闻更新后自动生成</div>`;
    }
    
    el.innerHTML = `
        <div class="mood-card" style="background:${moodData.color}12;border-left:3px solid ${moodData.color};">
            <div class="mood-top">
                <span style="font-size:24px;">${moodData.icon}</span>
                <div>
                    <div class="mood-label" style="color:${moodData.color};">市场情绪：${moodData.mood}</div>
                    <div class="mood-conf">信心度 ${moodData.confidence}/10</div>
                </div>
            </div>
            ${dimHtml ? `<div class="mood-dims">${dimHtml}</div>` : ''}
            ${moodData.summary ? `<div class="mood-summary">${moodData.summary}</div>` : ''}
        </div>
        
        <div class="etab-bar">${expertTabs}</div>
        
        <div class="expert-content">${expertHtml}</div>
    `;
}

// ===== 加载数据 =====
async function loadSummaryData() {
    try {
        const [newsRes, alertsRes] = await Promise.all([
            xhrFetch('data/hot-news.json'),
            xhrFetch('data/alerts.json')
        ]);
        const hotNews = newsRes?.news || [];
        const alerts = alertsRes || null;
        return { hotNews, alerts };
    } catch(e) {
        return { hotNews: [], alerts: null };
    }
}

function xhrFetch(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url + '?_=' + Date.now() + Math.random(), true);
        xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        xhr.setRequestHeader('Pragma', 'no-cache');
        xhr.setRequestHeader('Expires', '0');
        xhr.timeout = 8000;
        xhr.onload = () => {
            if (xhr.status === 200) { try { resolve(JSON.parse(xhr.responseText)); } catch(e) { reject(e); } }
            else { reject(new Error('HTTP ' + xhr.status)); }
        };
        xhr.onerror = () => reject(new Error('Network error'));
        xhr.ontimeout = () => reject(new Error('Timeout'));
        xhr.send();
    });
}

// ===== 市场情绪判定 =====
function assessMarketMood(hotNews) {
    if (!hotNews || hotNews.length === 0) return { mood: '中性', icon: '➖', color: '#8e8e93', confidence: '-', dimensions: [], summary: '' };
    const text = hotNews.map(n => n.title + (n.summary || '')).join('');
    const bullish = (text.match(/涨|升|新高|反弹|突破|利好/g) || []).length;
    const bearish = (text.match(/跌|降|新低|回落|利空|风险/g) || []).length;
    const mood = bullish > bearish + 2 ? '偏乐观' : bearish > bullish + 2 ? '偏谨慎' : '震荡中性';
    const icon = bullish > bearish + 2 ? '📈' : bearish > bullish + 2 ? '📉' : '➖';
    const color = bullish > bearish + 2 ? '#34c759' : bearish > bullish + 2 ? '#ff3b30' : '#ff9500';
    return { mood, icon, color, confidence: Math.min(10, 5 + Math.abs(bullish - bearish)), dimensions: [], summary: `${mood}，看涨${bullish}vs看空${bearish}` };
}

// ===== 达人观点生成（和之前一样，保留）=====
function generateExpertViews(hotNews, alerts) {
    if (!hotNews || hotNews.length === 0) return {};
    const titles = hotNews.map(h => h.title + ' ' + (h.summary || ''));
    const allText = titles.join('');
    const hasTradeWar = /关税|贸易|制裁/.test(allText);
    const hasAI = /AI|人工智能|大模型|DeepSeek/.test(allText);
    const hasCrypto = /比特币|加密货币|BTC/.test(allText);
    const hasOil = /原油|油价|石油/.test(allText);
    const hasRate = /利率|降息|加息|美联储|央行/.test(allText);
    const hasStocks = /A股|港股|美股|沪指|恒指/.test(allText);
    const hasGeo = /地缘|中东|冲突|战争|协议/.test(allText);
    const topTitle = hotNews[0] ? hotNews[0].title : '';
    const experts = {};
    
    experts.templeton = {
        insight: hasGeo ? `今日市场关注地缘局势变化。中东缓和的本质是风险溢价的释放——短期情绪已price in，但协议执行的波折往往被低估。逆向视角：当所有人庆祝和平时，关注被错杀的新兴市场资产。` : hasTradeWar ? `贸易摩擦的本质是全球化重构。提前布局海外产能的公司将获得双重红利。市场的线性思维低估了这个结构性变化。` : hasRate ? `全球利率周期转向。不要押注方向，而是做多波动率——同时持有股债。` : `当市场没有明确方向时，关注被短期情绪压低估值的优质资产。`,
        action: '关注港股和A股中被低估的消费和科技龙头，利用回调分批建仓。'
    };
    experts.buffett = {
        insight: hasAI ? 'AI的热度让我想起互联网泡沫。真正持久的竞争力来自数据网络效应和品牌心智。选择那些已经证明盈利能力的科技巨头。' : hasRate ? '利率影响估值但不改变内在价值。关注定价权、现金流、管理层——满足这三条的公司穿越周期。' : '好公司的标准不变：ROE>15%、负债率<50%、现金流>净利润。用这个标准筛选。',
        action: '关注沪深300和中证500指数基金，每月定投。个股关注现金流充裕的消费龙头。'
    };
    experts.munger = {
        insight: '用三层思维拆解今日市场：「' + topTitle + '」' + (hasGeo ? '。第一层（共识）：地缘缓和利好。第二层（逆向）：协议签署日往往是高点。第三层（结构性）：中东重建需求可能持续数年。' : hasAI ? '。第一层（共识）：AI降价利好。第二层（逆向）：小公司出局。第三层（结构性）：受益的是用AI重构成本的传统行业。' : hasTradeWar ? '。第一层（共识）：关税影响出口。第二层（逆向）：供应链转移对冲。第三层（结构性）：越南印度是赢家。' : '。第一层：今天的新闻改变了什么？第二层：是否过度反应？第三层：最坏情况是什么？') + '\n\n检查清单：① 噪音还是信号？② 确认偏误？③ 错了最坏怎样？',
        action: '保持60%权益+40%现金/债券的均衡配置，利用波动调整持仓。'
    };
    return experts;
}

// ===== 兼容旧调用 =====
function renderSummaryContent() { initExpertView(); }
