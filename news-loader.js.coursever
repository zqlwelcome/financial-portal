/**
 * 新闻和提示 - 稳定版
 * 数据来源：hot-news.json（由cron job每30分钟更新）
 * XHR绕过CDN缓存 + 5分钟前端自动刷新
 */

// ===== 缓存 =====
let newsCache = [];
let alertsCache = null;
let lastRefreshTime = 0;
let _lastUpdateTime = '';
const REFRESH_INTERVAL = 5 * 60 * 1000; // 前端5分钟检查一次

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
    
    // 非强制刷新且缓存还在有效期内，直接渲染
    if (!forceRefresh && newsCache.length > 0 && (Date.now() - lastRefreshTime) < REFRESH_INTERVAL) {
        renderNewsList(newsCache);
        return;
    }
    
    el.innerHTML = '<div class="empty-hint" style="text-align:center;padding:20px;font-size:14px;">🔄 获取最新新闻...</div>';
    
    try {
        const data = await xhrFetch();
        if (data && data.news && data.news.length > 0) {
            const isNew = newsCache.length === 0 || !newsCache[0] || newsCache[0].title !== data.news[0].title;
            const timeChanged = _lastUpdateTime !== data.updateTime;
            
            if (isNew || timeChanged) {
                _lastUpdateTime = data.updateTime;
                newsCache = data.news;
                lastRefreshTime = Date.now();
                renderNewsList(newsCache);
                updateRefreshHint(data.updateTime || '刚刚更新');
                localStorage.setItem('hot_news_cache', JSON.stringify(data.news));
                localStorage.setItem('hot_news_time', data.updateTime || '');
                return;
            }
            
            // 数据没变
            lastRefreshTime = Date.now();
            updateRefreshHint(data.updateTime || '已是最新');
            return;
        }
    } catch(e) {
        console.log('加载新闻失败:', e);
    }
    
    // 降级到本地缓存
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
        el.innerHTML = '<div class="empty-hint" style="text-align:center;padding:20px;">暂无新闻</div>';
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

// ===== 加载提示（XHR绕过CDN缓存）=====
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
        forex: { icon: '💱', title: '外汇提示', text: '日元跌破160关口', detail: '日元兑美元汇率跌破160心理关口，创34年新低。日本财务省官员发出警告。' },
        stock: { icon: '📈', title: '股市动向', text: 'A股放量上涨', detail: 'A股三大指数全线收涨，沪指重返3400点。成交额突破万亿。' }
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
                <div class="alert-detail">${data.forex.detail || '暂无详细信息'}</div>
            </div>
            <div class="alert-arrow">›</div>
        </div>
        <div class="alert-card stock ${expandedAlert === 'stock' ? 'expanded' : ''}" onclick="toggleAlert('stock')">
            <div class="alert-icon">${data.stock.icon}</div>
            <div class="alert-content">
                <div class="alert-title">${data.stock.title}</div>
                <div class="alert-text">${data.stock.text}</div>
                <div class="alert-detail">${data.stock.detail || '暂无详细信息'}</div>
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
    
    // 前3条
    const head = news.slice(0, 3);
    const rest = news.slice(3);
    
    let html = head.map((item, index) => `
        <div class="news-item ${expandedNews === index ? 'expanded' : ''}" onclick="toggleNews(${index})">
            <div class="news-rank ${index < 3 ? 'hot' : ''}">${index + 1}</div>
            <div class="news-body">
                <div class="news-head">
                    <span class="news-source">${item.source}</span>
                </div>
                <div class="news-title">${item.title}</div>
                <div class="news-summary">${item.summary}</div>
                <div class="news-detail">${item.detail || '暂无详细信息'}</div>
            </div>
            <div class="news-arrow">›</div>
        </div>`).join('');
    
    // 剩余（折叠或展开）
    if (_newsAllShown) {
        html += rest.map((item, index) => {
            const realIndex = index + 3;
            return `
            <div class="news-item ${expandedNews === realIndex ? 'expanded' : ''}" onclick="toggleNews(${realIndex})">
                <div class="news-rank ${realIndex < 3 ? 'hot' : ''}">${realIndex + 1}</div>
                <div class="news-body">
                    <div class="news-head">
                        <span class="news-source">${item.source}</span>
                    </div>
                    <div class="news-title">${item.title}</div>
                    <div class="news-summary">${item.summary}</div>
                    <div class="news-detail">${item.detail || '暂无详细信息'}</div>
                </div>
                <div class="news-arrow">›</div>
            </div>`;
        }).join('');
    }
    
    // 展开按钮
    if (rest.length > 0) {
        html += `
        <div class="news-expand-wrap">
            <button class="news-expand-btn" onclick="_newsAllShown=!_newsAllShown;renderNewsList(newsCache);if(!_newsAllShown){setTimeout(function(){var el=document.querySelector('.sub-tabs');if(el)el.scrollIntoView({behavior:'smooth',block:'start'})},50)}">
                ${_newsAllShown ? '收起 <span class="hl-arrow">‹</span>' : `查看全部 ${news.length} 条 <span class="hl-arrow">›</span>`}
            </button>
        </div>`;
    }
    
    el.innerHTML = html;
    localStorage.setItem('hot_news_cache', JSON.stringify(news));
}

// ===== 更新刷新提示 =====
function updateRefreshHint(time) {
    const hint = document.getElementById('refreshHint');
    if (hint) {
        hint.textContent = time ? `更新于 ${time}` : `更新于 ${new Date().toLocaleTimeString('zh-CN', {hour:'2-digit',minute:'2-digit'})}`;
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
