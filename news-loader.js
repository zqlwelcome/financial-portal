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
            newsCache = data.news;
            lastRefreshTime = Date.now();
            renderNewsList(newsCache);
            updateRefreshHint(data.updateTime || '刚刚更新');
            localStorage.setItem('hot_news_cache', JSON.stringify(data.news));
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
                newsCache = parsed;
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

function renderNewsList(news) {
    const el = document.getElementById('hotNewsList');
    if (!el) return;
    
    const displayNews = _newsAllShown ? news : news.slice(0, 3);
    
    let html = displayNews.map((item, index) => {
        const display = getNewsDisplay(item);
        return `
        <div class="news-item ${expandedNews === index ? 'expanded' : ''}" onclick="toggleNews(${index})">
            <div class="news-rank ${index < 3 ? 'hot' : ''}">${index + 1}</div>
            <div class="news-body">
                <div class="news-head">
                    <span class="news-source">${display.source}</span>
                </div>
                <div class="news-title">${display.title}</div>
                <div class="news-summary">${display.summary}</div>
                <div class="news-detail">${display.detail}</div>
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

function getNewsDisplay(item) {
    return {
        title: cleanChineseDisplay(item.titleZh || item.title_zh || toChineseNewsTitle(item.title || '')),
        summary: cleanChineseDisplay(item.summaryZh || item.summary_zh || toChineseNewsSummary(item)),
        detail: cleanChineseDisplay(item.detailZh || item.detail_zh || toChineseNewsDetail(item.detail || item.title || '')),
        source: cleanChineseDisplay(toChineseSource(item.source || '财经媒体'))
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
        'Business Insider': '商业内幕'
    };
    return sourceMap[source] || (hasEnglish(source) ? '海外财经媒体' : source);
}

function toChineseNewsTitle(title) {
    if (!hasEnglish(title)) return title || '财经新闻更新';

    const t = title.toLowerCase();
    if (t.includes('stock market') || t.includes('dow') || t.includes('nasdaq') || t.includes('s&p')) {
        return '美股走势分化，纳指和标普仍在高位附近';
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

function toChineseNewsDetail(detail) {
    if (!hasEnglish(detail)) return detail || '详情暂时缺席，标题已经很努力了。';

    const t = detail.toLowerCase();
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
