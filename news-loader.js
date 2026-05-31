/**
 * 新闻和提示 - 稳定版
 * 数据来源：hot-news.json（由cron job每5分钟更新）
 * 交互逻辑：默认显示来源+标题，点击展开详情，再次点击收起
 */

// ===== 缓存 =====
let newsCache = [];
let alertsCache = null;
let lastRefreshTime = 0;
let _lastUpdateTime = '';
const REFRESH_INTERVAL = 5 * 60 * 1000;

// ===== 当前展开状态 =====
let expandedAlert = null;
let expandedNews = null;

// ===== 切换新闻展开状态 =====
function toggleNews(index) {
    expandedNews = expandedNews === index ? null : index;
    renderNewsList(newsCache);
}

// ===== 切换提示展开状态 =====
function toggleAlert(type) {
    expandedAlert = expandedAlert === type ? null : type;
    if (alertsCache) {
        renderAlerts(alertsCache);
    }
}

// ===== 加载新闻 =====
async function loadHotNews(forceRefresh = false) {
    const el = document.getElementById('hotNewsList');
    if (!el) return;
    
    if (!forceRefresh && newsCache.length > 0 && (Date.now() - lastRefreshTime) < REFRESH_INTERVAL) {
        renderNewsList(newsCache);
        return;
    }
    
    el.innerHTML = '<div class="empty-hint" style="text-align:center;padding:20px;font-size:14px;">正在打捞今天的财经热闹...</div>';
    
    try {
        const data = await xhrFetch();
        if (data && data.news && data.news.length > 0) {
            newsCache = prepareNewsList(data.news);
            lastRefreshTime = Date.now();
            renderNewsList(newsCache);
            updateRefreshHint(data.updateTime || '刚刚更新');
            localStorage.setItem('hot_news_cache', JSON.stringify(newsCache));
            return;
        }
    } catch(e) {
        console.log('加载新闻失败:', e);
    }
    
    const cached = localStorage.getItem('hot_news_cache');
    if (cached) {
        try {
            const parsed = JSON.parse(cached);
            if (parsed && parsed.length > 0) {
                newsCache = prepareNewsList(parsed);
                renderNewsList(newsCache);
                return;
            }
        } catch(e) {}
    }
    
    if (newsCache.length === 0) {
        el.innerHTML = '<div class="empty-hint" style="text-align:center;padding:20px;">今天新闻暂时请假了，先喝口水。</div>';
    }
}

// ===== XHR绕过CDN缓存 =====
function xhrFetch() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = 'data/hot-news.json?_=' + Date.now() + Math.random();
        xhr.open('GET', url, true);
        xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        xhr.setRequestHeader('Pragma', 'no-cache');
        xhr.setRequestHeader('Expires', '0');
        xhr.timeout = 10000;
        xhr.onload = () => {
            if (xhr.status === 200) {
                try { resolve(JSON.parse(xhr.responseText)); }
                catch(e) { reject(e); }
            } else {
                reject(new Error('HTTP ' + xhr.status));
            }
        };
        xhr.onerror = () => reject(new Error('Network error'));
        xhr.ontimeout = () => reject(new Error('Timeout'));
        xhr.send();
    });
}

// ===== 加载提示 =====
async function loadAlerts(forceRefresh = false) {
    if (!forceRefresh && alertsCache) {
        renderAlerts(alertsCache);
        return;
    }
    
    try {
        const data = await xhrFetchAlerts();
        if (data) {
            alertsCache = data;
            renderAlerts(alertsCache);
            return;
        }
    } catch(e) {
        console.log('加载提示失败:', e);
    }
    fallbackAlerts();
}

function xhrFetchAlerts() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = 'data/alerts.json?_=' + Date.now() + Math.random();
        xhr.open('GET', url, true);
        xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        xhr.setRequestHeader('Pragma', 'no-cache');
        xhr.setRequestHeader('Expires', '0');
        xhr.timeout = 8000;
        xhr.onload = () => {
            if (xhr.status === 200) {
                try { resolve(JSON.parse(xhr.responseText)); }
                catch(e) { reject(e); }
            } else {
                reject(new Error('HTTP ' + xhr.status));
            }
        };
        xhr.onerror = () => reject(new Error('Network error'));
        xhr.ontimeout = () => reject(new Error('Timeout'));
        xhr.send();
    });
}

function fallbackAlerts() {
    renderAlerts({
        forex: { icon: '💱', title: '外汇提示', text: '日元跌破160关口', detail: '日元兑美元汇率跌破160心理关口，创34年新低。' },
        stock: { icon: '📈', title: '股市动向', text: 'A股放量上涨', detail: 'A股三大指数全线收涨，沪指重返3400点。' }
    });
}

// ===== 渲染提示 =====
function renderAlerts(data) {
    const el = document.getElementById('alertArea');
    if (!el) return;
    el.innerHTML = `
        <div class="alert-card forex ${expandedAlert === 'forex' ? 'expanded' : ''}" onclick="toggleAlert('forex')">
            <div class="alert-icon">${data.forex.icon}</div>
            <div class="alert-content">
                <div class="alert-title">${data.forex.title}</div>
                <div class="alert-text">${data.forex.text}</div>
                <div class="alert-detail">${data.forex.detail || '详情还在路上，先别急着下单。'}</div>
            </div>
            <div class="alert-arrow">›</div>
        </div>
        <div class="alert-card stock ${expandedAlert === 'stock' ? 'expanded' : ''}" onclick="toggleAlert('stock')">
            <div class="alert-icon">${data.stock.icon}</div>
            <div class="alert-content">
                <div class="alert-title">${data.stock.title}</div>
                <div class="alert-text">${data.stock.text}</div>
                <div class="alert-detail">${data.stock.detail || '详情还在路上，先别急着下单。'}</div>
            </div>
            <div class="alert-arrow">›</div>
        </div>
    `;
}

// ===== 渲染新闻列表 =====
let _newsAllShown = false;

function prepareNewsList(news) {
    const unique = new Map();
    (news || []).forEach((item, index) => {
        const display = getNewsDisplay(item);
        const key = getNewsEventKey(item, display);
        const score = getNewsPriorityScore(item, display, index);
        const candidate = { ...item, _display: display, _rankScore: score };
        const current = unique.get(key);
        if (!current || score > current._rankScore) unique.set(key, candidate);
    });

    return diversifyNewsList(Array.from(unique.values())
        .sort((a, b) => b._rankScore - a._rankScore))
        .slice(0, 10);
}

function getNewsPriorityScore(item, display, index) {
    const text = getFullNewsText(item, display);
    let score = Number(item.score || 0) + Math.max(0, 10 - index);

    if (isGlobalEventText(text)) score += 16;
    if (isChinaNewsText(text)) score += 14;
    if (isMacroText(text)) score += 14;
    if (isFinanceText(text)) score += 12;
    if (isLegalPolicyText(text)) score += 11;
    if (isCommodityText(text)) score += 10;
    if (isInstitutionText(text)) score += 9;
    if (isTechText(text)) score += 5;

    return score;
}

function diversifyNewsList(items) {
    const categoryOrder = ['macro', 'china', 'commodity', 'geopolitics', 'institution', 'tech', 'other'];
    const result = [];
    const used = new Set();

    const take = (item) => {
        if (used.has(item)) return false;
        used.add(item);
        result.push(item);
        return true;
    };

    categoryOrder.forEach(category => {
        const item = items.find(candidate => getNewsCategory(candidate, getNewsDisplay(candidate)) === category && !used.has(candidate));
        if (item) take(item);
    });

    items.forEach(take);
    return result;
}

function getNewsCategory(item, display) {
    const text = getFullNewsText(item, display);
    if (isGlobalEventText(text)) return 'global';
    if (isChinaNewsText(text)) return 'china';
    if (isMacroText(text)) return 'macro';
    if (isFinanceText(text)) return 'finance';
    if (isLegalPolicyText(text)) return 'policy';
    if (isCommodityText(text)) return 'commodity';
    if (isInstitutionText(text)) return 'institution';
    if (isTechText(text)) return 'tech';
    return 'other';
}

function getFullNewsText(item, display) {
    return `${item.title || ''} ${item.detail || ''} ${display.title} ${display.summary} ${display.detail} ${display.source}`.toLowerCase();
}

function isGlobalEventText(text) {
    return /defense|国防|地缘|乌克兰|香格里拉|china in asia|伊朗|iran|war|战争|制裁|election|选举/.test(text);
}

function isMacroText(text) {
    return /美联储|通胀|降息|利率|fed|pce|recession|经济衰退|economy|美国经济|经济增长|gdp|就业|美元|人民币/.test(text);
}

function isFinanceText(text) {
    return /股市|美股|a股|港股|债券|收益率|银行|稳定币|上市|ipo|资金|估值|利润|财报/.test(text);
}

function isLegalPolicyText(text) {
    return /监管|规则|法律|新规|证监会|政策|治理|反垄断|合规|关税/.test(text);
}

function isCommodityText(text) {
    return /油价|原油|oil|opec|黄金|能源|commodity|大宗|天然气|铜/.test(text);
}

function isInstitutionText(text) {
    return /bank of america|wall street analysts|分析师|机构|巴菲特|伯克希尔|芒格|段永平|对冲基金|基金经理/.test(text);
}

function isTechText(text) {
    return /人工智能|英伟达|芯片|数据中心|openai|nvidia|ai|micron|nokia|dell|cisco|spacex|太空|模型|算力/.test(text);
}

function getNewsEventKey(item, display) {
    const text = cleanKeyText(`${item.title || ''} ${item.detail || ''} ${display.title} ${display.detail}`);
    if (/bankofamerica|美银|nvidiaandapple|英伟达苹果/.test(text)) return 'bofa-nvidia-apple';
    if (/softbank|软银|france|法国|75bn|75billion|人工智能facility/.test(text)) return 'softbank-ai-france';
    if (/spacex|太空公司|太空概念|马斯克/.test(text)) return 'spacex-listing';
    if (/openai|chatgpt|人工智能公司|聊天机器人|广告商业化/.test(text)) return 'openai-commercial';
    if (/micron|美光|overbought|超买/.test(text)) return 'micron-overbought';
    if (/topwallstreetanalysts|wallstreetanalysts|分析师/.test(text)) return 'analyst-stock-picks';
    if (/threeas|economyafloat|recession|经济衰退/.test(text)) return 'us-economy-resilience';
    if (/nokiadellcisco|nokia|cisco|老牌科技/.test(text)) return 'legacy-tech-ai';
    if (/油价|原油|oil|opec|伊朗|iran/.test(text)) return 'oil-geopolitics';
    if (/美联储|通胀|降息|利率|fed|pce|稳定币/.test(text)) return 'fed-rates';
    if (/a股|董秘|上市公司治理|证监会/.test(text)) return 'a-share-governance';
    if (/defensespending|shangrila|香格里拉|ukraine|乌克兰/.test(text)) return 'shangri-la-defense';
    return text.slice(0, 28);
}

function cleanKeyText(text) {
    return (text || '').toLowerCase().replace(/[^\u4e00-\u9fa5a-z0-9]/g, '');
}

function isChinaNewsText(text) {
    return /中国|a股|港股|沪深|上证|人民币|证监会|腾讯|阿里|小米|茅台|深演智能|上市公司|国内/.test(text);
}

function renderNewsList(news) {
    const el = document.getElementById('hotNewsList');
    if (!el) return;
    updateHeadlineBrief(news);
    
    const displayNews = _newsAllShown ? news : news.slice(0, 3);
    
    let html = displayNews.map((item, index) => {
        const display = getNewsDisplay(item);
        const insight = getNewsInsight(item, display);
        const articleAction = getArticleAction(item, display);
        return `
        <div class="news-item ${expandedNews === index ? 'expanded' : ''}" onclick="toggleNews(${index})">
            <div class="news-rank ${index < 3 ? 'hot' : ''}">${index + 1}</div>
            <div class="news-body">
                <div class="news-title">${escapeHtml(display.title)}</div>
                <div class="news-detail">
                    <div class="news-detail-meta">${escapeHtml(display.source)}</div>
                    <div class="news-summary">${escapeHtml(display.summary)}</div>
                    <div class="news-insight">
                        ${insight.map(line => `<p>${escapeHtml(line)}</p>`).join('')}
                    </div>
                    <a class="news-original-link" href="${escapeHtml(articleAction.url)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${escapeHtml(articleAction.label)}</a>
                </div>
            </div>
            <div class="news-arrow">›</div>
        </div>`;
    }).join('');
    
    // 展开/收起按钮
    if (news.length > 3) {
        html += `
        <div class="news-expand-wrap">
            <button class="news-expand-btn" onclick="_newsAllShown=!_newsAllShown;renderNewsList(newsCache);">
                ${_newsAllShown ? '收起，脑子先缓存一下 <span class="hl-arrow">‹</span>' : `再看 ${news.length - 3} 条热闹 <span class="hl-arrow">›</span>`}
            </button>
        </div>`;
    }
    
    el.innerHTML = html;
    localStorage.setItem('hot_news_cache', JSON.stringify(news));
}

function updateHeadlineBrief(news) {
    if (!news || news.length === 0) return;
    const globalNews = news.find(item => ['global', 'macro', 'finance', 'policy', 'commodity'].includes(getNewsCategory(item, getNewsDisplay(item)))) || news.find(item => !isChinaNewsText(newsText(item)));
    const chinaNews = news.find(item => isChinaNewsText(newsText(item)));
    const first = globalNews || news[0];
    const second = chinaNews && chinaNews !== first ? chinaNews : news.find(item => item !== first) || news[1] || first;
    const firstDisplay = getNewsDisplay(first);
    const secondDisplay = getNewsDisplay(second);
    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    };

    setText('afterworkKicker', '今日头条雷达');
    setText('afterworkTitle', `先看：${shortText(firstDisplay.title, 28)}`);
    setText('afterworkCopy', `全球重点：${shortText(firstDisplay.summary, 54)} 中国重点：${shortText(secondDisplay.summary, 54)}`);
    setText('afterworkTagOne', firstDisplay.source || '全球大事');
    setText('afterworkTagTwo', secondDisplay.source || '中国大事');
    setText('afterworkTagThree', '先看影响');
}

function newsText(item) {
    const display = getNewsDisplay(item);
    return `${display.title} ${display.summary} ${display.detail} ${display.source}`.toLowerCase();
}

function shortText(text, max) {
    const value = (text || '').replace(/\s+/g, '');
    return value.length > max ? `${value.slice(0, max)}...` : value;
}

function escapeHtml(text) {
    return String(text || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getNewsDisplay(item) {
    if (item._display) return item._display;
    return {
        title: cleanChineseDisplay(item.titleZh || item.title_zh || toChineseNewsTitle(item.title || '')),
        summary: cleanChineseDisplay(item.summaryZh || item.summary_zh || toChineseNewsSummary(item)),
        detail: cleanChineseDisplay(item.detailZh || item.detail_zh || toChineseNewsDetail(item)),
        source: cleanChineseDisplay(toChineseSource(item.source || '财经媒体'))
    };
}

function getNewsInsight(item, display) {
    const text = getFullNewsText(item, display);
    const happened = `发生了什么：${shortText(display.detail, 78)}`;
    const lens = getTraderLens(item, display);

    if (/bank of america|英伟达|苹果|nvidia|apple/.test(text)) {
        return [
            happened,
            '为什么重要：龙头被机构继续点名，说明市场还愿意为人工智能、现金流和护城河付溢价。',
            lens
        ];
    }
    if (/softbank|软银|france|法国|数据中心|基础设施/.test(text)) {
        return [
            happened,
            '为什么重要：人工智能竞争正在从模型应用延伸到电力、机房和算力基础设施，欧洲也在补课。',
            lens
        ];
    }
    if (/美联储|通胀|降息|利率|fed|pce|稳定币/.test(text)) {
        return [
            happened,
            '为什么重要：利率预期会影响股票估值、债券收益率、美元和人民币压力，是很多资产的共同开关。',
            lens
        ];
    }
    if (/油价|原油|oil|opec|伊朗|iran|能源/.test(text)) {
        return [
            happened,
            '为什么重要：油价既影响通胀，也影响航空、化工、消费和能源股利润，传导链条比表面更长。',
            lens
        ];
    }
    if (/a股|港股|中国|证监会|人民币|上市公司|治理/.test(text)) {
        return [
            happened,
            '为什么重要：国内市场消息更直接影响A股、港股和人民币资产，也会影响普通投资者的持仓情绪。',
            lens
        ];
    }
    if (/spacex|太空|上市|ipo|马斯克/.test(text)) {
        return [
            happened,
            '为什么重要：热门上市故事容易制造想象空间，但普通投资者往往买到的是情绪最热的时候。',
            lens
        ];
    }
    return [
        happened,
        '为什么重要：这类新闻通常会先影响市场情绪，再逐步反映到估值、资金流向或行业预期里。',
        lens
    ];
}

function getTraderLens(item, display) {
    const text = getFullNewsText(item, display);
    if (isGlobalEventText(text)) {
        return '交易员视角：先看避险情绪和风险溢价，盯美元、黄金、油价、军工和亚洲市场开盘反应。';
    }
    if (isMacroText(text)) {
        return '交易员视角：先判断它会不会改变降息路径，再看债券收益率、美元和高估值成长股怎么重新定价。';
    }
    if (isChinaNewsText(text)) {
        return '交易员视角：先看政策预期是否改善风险偏好，再盯A股、港股、人民币和外资流向有没有同步反应。';
    }
    if (isLegalPolicyText(text)) {
        return '交易员视角：政策和监管会改变行业估值上限，重点看受益方、受压方，以及资金是否从旧逻辑切到新逻辑。';
    }
    if (isCommodityText(text)) {
        return '交易员视角：先拆供给冲击还是需求变化，再看通胀预期、能源股、航空消费和周期股谁先动。';
    }
    if (isInstitutionText(text)) {
        return '交易员视角：机构观点本身不是答案，重点看它是否带来资金抱团、调仓方向和市场共识变化。';
    }
    if (isTechText(text)) {
        return '交易员视角：科技新闻要看订单、算力、利润率和估值四件事，只有热度没有业绩时要小心追高。';
    }
    return '交易员视角：先判断这条新闻影响情绪、利率、盈利还是政策，再看相关资产有没有成交量确认。';
}

function getArticleAction(item, display) {
    const url = item.url || item.link || item.href;
    if (/^https?:\/\//.test(url || '')) {
        return { label: '看原文', url };
    }

    const query = encodeURIComponent(`${display.source} ${display.title}`);
    return {
        label: '搜原文',
        url: `https://www.bing.com/search?q=${query}`
    };
}

function toChineseNewsSummary(item) {
    const title = item.titleZh || item.title || '';
    const detail = item.detailZh || item.detail || '';
    const text = `${title} ${detail}`.toLowerCase();

    if (/油价|原油|oil|exxon/.test(text)) {
        return '核心是能源价格变化：油价回落利好通胀预期，但供需和地缘风险还没完全解除。';
    }
    if (/英伟达|苹果|nvidia|apple|dell|data center|数据中心/.test(text)) {
        return '核心是人工智能硬件需求：机构仍看好龙头和数据中心产业链，但估值热度也需要留意。';
    }
    if (/openai|anthropic|人工智能|ai|模型/.test(text)) {
        return '核心是人工智能商业化：估值、模型和产品入口继续升温，市场在重估相关公司的增长空间。';
    }
    if (/太空|spacex|space/.test(text)) {
        return '核心是太空经济热度：热门上市预期带动关注，但普通投资者更要看估值是否已经透支。';
    }
    if (/通胀|pce|fed|美联储/.test(text)) {
        return '核心是利率预期：通胀数据会影响降息节奏，也会牵动美股、美元和成长股表现。';
    }
    if (/深演智能|港股/.test(text)) {
        return '核心是港股人工智能重估：短期涨幅很猛，说明资金在寻找“人工智能+”的新定价标的。';
    }
    return '核心是市场正在重新定价：先看它影响的是情绪、估值，还是企业真实基本面。';
}

function cleanChineseDisplay(text) {
    return (text || '')
        .replace(/\bAI\b/g, '人工智能')
        .replace(/\bPCE\b/g, '通胀')
        .replace(/\bGDP\b/g, '经济增长')
        .replace(/\bCEO\b/g, '管理层')
        .replace(/\bIPO\b/g, '上市')
        .replace(/\bOpenAI\b/g, '人工智能公司')
        .replace(/\bChatGPT\b/g, '聊天机器人')
        .replace(/\bSpaceX\b/g, '太空公司')
        .replace(/\bWix\b/g, '维克斯')
        .replace(/\bCNBC\b/g, '美国财经台')
        .replace(/\bCBS\b/g, '美国哥伦比亚广播公司');
}

function hasEnglish(text) {
    return /[A-Za-z]{3,}/.test(text || '');
}

function toChineseSource(source) {
    const sourceMap = {
        'MarketWatch': '市场观察',
        "Barron's": '巴伦周刊',
        'U.S. Bureau of Economic Analysis (BEA) (.gov)': '美国经济分析局',
        'CBS News': '美国哥伦比亚广播公司财经',
        'CNBC': '美国财经台',
        'Business Insider': '商业内幕',
        'WSJ': '华尔街日报',
        'Bloomberg.com': '彭博',
        'Financial Times': '金融时报',
        'The Verge': '科技媒体'
    };
    return sourceMap[source] || (hasEnglish(source) ? '海外财经媒体' : source);
}

function toChineseNewsTitle(title) {
    if (!hasEnglish(title)) return title || '财经新闻更新';

    const t = title.toLowerCase();
    if (t.includes('stock market') || t.includes('dow') || t.includes('nasdaq') || t.includes('s&p')) {
        return '美股走势分化，纳指和标普仍在高位附近';
    }
    if (t.includes('bank of america') || (t.includes('nvidia') && t.includes('apple'))) {
        return '美银看好英伟达、苹果等美股龙头六月表现';
    }
    if (t.includes('softbank') || t.includes('france')) {
        return '软银计划在法国加码人工智能基础设施投资';
    }
    if (t.includes('micron')) {
        return '美光短期涨幅较快，市场提醒其已进入超买区间';
    }
    if (t.includes('nokia') || t.includes('dell') || t.includes('cisco')) {
        return '老牌科技股因人工智能基础设施需求重新受到关注';
    }
    if (t.includes('top wall street analysts')) {
        return '华尔街分析师看好三只具备增长潜力的股票';
    }
    if (t.includes('three a') || t.includes('recession')) {
        return '美国经济仍靠几项支撑因素避免衰退风险';
    }
    if (t.includes('defense spending') || t.includes('shangri-la') || t.includes('ukraine')) {
        return '香格里拉对话聚焦国防开支、中国议题和乌克兰经验';
    }
    if (t.includes('space') || t.includes('spacex')) {
        return '太空概念股受到关注，部分公司尚未跟随估值热潮';
    }
    if (t.includes('gdp') || t.includes('corporate profits')) {
        return '美国一季度经济增长修正值和企业利润数据公布';
    }
    if (t.includes('inflation') || t.includes('pce') || t.includes('fed')) {
        return '美国通胀数据仍是美联储政策焦点';
    }
    if (t.includes('drone') || t.includes('pentagon')) {
        return '无人机概念股走强，市场关注美国国防投资动向';
    }
    if (t.includes('oil') || t.includes('iran')) {
        return '油价受美伊协议消息影响出现波动';
    }
    if (t.includes('wix') || t.includes('laying off')) {
        return '维克斯计划裁员，人工智能和汇率压力成为管理层关注点';
    }
    if (t.includes('openai') || t.includes('chatgpt')) {
        return '人工智能公司广告商业化动向引发市场关注';
    }
    return '海外财经市场出现新动态，值得继续观察';
}

function toChineseNewsDetail(item) {
    const detail = typeof item === 'string' ? item : (item.detail || item.title || '');
    if (!hasEnglish(detail)) return detail || '详情暂时缺席，标题已经很努力了。';

    const t = detail.toLowerCase();
    if (t.includes('bank of america') || t.includes('nvidia') || t.includes('apple')) {
        return '机构把英伟达、苹果等龙头列为重点关注对象，核心逻辑是人工智能需求、现金流质量和市场抱团偏好仍在。';
    }
    if (t.includes('softbank') || t.includes('france') || t.includes('data center')) {
        return '软银计划在法国建设人工智能数据中心能力，说明算力基础设施正在成为全球科技竞争的新投资主线。';
    }
    if (t.includes('inflation') || t.includes('pce')) {
        return '通胀指标会影响市场对降息节奏的判断。若通胀继续偏高，美联储可能更谨慎，成长股和高估值资产会更敏感。';
    }
    if (t.includes('drone') || t.includes('pentagon')) {
        return '国防产业链消息容易带动主题交易。重点看后续是否有真实订单和预算落地，否则短期涨幅可能更多来自情绪。';
    }
    if (t.includes('oil') || t.includes('iran')) {
        return '油价对地缘消息敏感。短期看协议进展，长期还要看产油国政策和全球需求变化。';
    }
    return '海外财经动态需要拆两层：第一层看它影响市场情绪，第二层看它是否真的改变企业利润或行业供需。';
}

// ===== 更新刷新提示 =====
function updateRefreshHint(time) {
    const hint = document.getElementById('refreshHint');
    if (hint) {
        hint.textContent = time ? `热乎到 ${time}` : `热乎到 ${new Date().toLocaleTimeString('zh-CN', {hour:'2-digit',minute:'2-digit'})}`;
    }
}

// ===== 强制刷新 =====
async function forceRefreshAll() {
    newsCache = [];
    alertsCache = null;
    lastRefreshTime = 0;
    _lastUpdateTime = '';
    expandedAlert = null;
    expandedNews = null;
    _newsAllShown = false;
    try {
        await Promise.all([loadHotNews(true), loadAlerts(true)]);
    } catch(e) {
        await loadHotNews(true);
        await loadAlerts(true);
    }
}

// ===== 定时自动刷新 =====
let refreshTimer = null;
function startAutoRefresh() {
    if (refreshTimer) clearInterval(refreshTimer);
    refreshTimer = setInterval(() => { loadHotNews(true); }, REFRESH_INTERVAL);
}

// ===== 页面可见时检查 =====
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) loadHotNews(true);
});

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    loadHotNews();
    loadAlerts();
    startAutoRefresh();
});
