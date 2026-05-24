/**
 * 新闻和提示 - 实时版（前端直连双财经API）
 * 优先级：新浪JSONP → 华尔街见闻fetch → hot-news.json降级
 */

// ===== 缓存 =====
let newsCache = [];
let alertsCache = null;
let lastRefreshTime = 0;
let _cachedUpdateTime = '';
const REFRESH_INTERVAL = 10 * 60 * 1000;

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

// ===== 加载新闻（优先实时API，降级到本地文件）=====
async function loadHotNews(forceRefresh = false) {
    const el = document.getElementById('hotNewsList');
    if (!el) return;
    
    if (!forceRefresh && newsCache.length > 0 && (Date.now() - lastRefreshTime) < REFRESH_INTERVAL) {
        renderNewsList(newsCache);
        return;
    }
    
    el.innerHTML = '<div class="empty-hint" style="text-align:center;padding:20px;color:#8e8e93;font-size:14px;">🔄 获取最新新闻...</div>';
    
    // 先尝试从实时API获取（新浪JSONP）
    let liveNews = null;
    try {
        liveNews = await fetchLiveNews();
    } catch(e) {
        console.log('新浪API失败，尝试备用源:', e);
    }
    
    // 新浪失败时，尝试华尔街见闻（支持CORS，直接fetch）
    if (!liveNews || liveNews.length === 0) {
        try {
            liveNews = await fetchWallstreetcn();
        } catch(e) {
            console.log('华尔街见闻API失败，降级到文件:', e);
        }
    }
    
    if (liveNews && liveNews.length > 0) {
        const isNew = newsCache.length === 0 || !newsCache[0] || newsCache[0].title !== liveNews[0].title;
        if (isNew) {
            newsCache = liveNews;
            lastRefreshTime = Date.now();
            renderNewsList(newsCache);
            const now = new Date();
            const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
            updateRefreshHint(`实时 ${timeStr}`);
            localStorage.setItem('hot_news_cache', JSON.stringify(liveNews));
            return;
        } else {
            lastRefreshTime = Date.now();
            updateRefreshHint('已是最新');
            return;
        }
    }
    
    // 降级：从hot-news.json加载
    try {
        const data = await xhrFetch();
        if (data && data.news && data.news.length > 0) {
            const titleChanged = newsCache.length === 0 || !newsCache[0] || newsCache[0].title !== data.news[0].title;
            const timeChanged = !_cachedUpdateTime || _cachedUpdateTime !== data.updateTime;
            
            if (titleChanged || timeChanged || newsCache.length === 0) {
                _cachedUpdateTime = data.updateTime;
                newsCache = data.news;
                lastRefreshTime = Date.now();
                renderNewsList(newsCache);
                updateRefreshHint(data.updateTime || '刚刚更新');
                localStorage.setItem('hot_news_time', data.updateTime || '');
                return;
            }
            
            lastRefreshTime = Date.now();
            updateRefreshHint(data.updateTime || '已是最新');
            return;
        }
    } catch(e) {
        console.log('文件加载失败:', e);
    }
    
    // 网络请求失败时显示缓存
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
        el.innerHTML = '<div class="empty-hint" style="text-align:center;padding:20px;color:#8e8e93;">暂无新闻</div>';
    }
}

// ===== 实时财经新闻API（新浪JSONP + script标签绕过跨域）=====
let _newsFetchTimer = null;

function fetchLiveNews() {
    return new Promise((resolve, reject) => {
        const callbackName = '_sinaNewsCB_' + Date.now();
        window[callbackName] = function(data) {
            try {
                const items = data?.result?.data || [];
                const news = items.map(item => ({
                    source: item.media_name || '新浪财经',
                    time: formatNewsTime(item.ctime),
                    title: item.title || '',
                    summary: (item.intro || '').slice(0, 60) + '...',
                    detail: item.intro || item.title || ''
                }));
                resolve(news.slice(0, 10));
            } catch(e) {
                reject(e);
            }
            delete window[callbackName];
        };
        
        const s = document.createElement('script');
        s.src = 'https://feed.mix.sina.com.cn/api/roll/get?pageid=153&lid=2509&num=15&callback=' + callbackName;
        s.onerror = () => { delete window[callbackName]; reject(new Error('Script load failed')); };
        
        // 5秒超时
        const timeout = setTimeout(() => {
            delete window[callbackName];
            reject(new Error('Timeout'));
        }, 5000);
        
        s.onload = () => clearTimeout(timeout);
        document.head.appendChild(s);
    });
}

function formatNewsTime(ts) {
    if (!ts) return '';
    const d = new Date(parseInt(ts) * 1000);
    return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

// ===== 备用源：华尔街见闻快讯（支持CORS，直接fetch）=====
async function fetchWallstreetcn() {
    const resp = await fetch('https://api-one-wscn.awtmt.com/apiv1/content/lives?channel=global-channel&limit=15', {
        headers: { 'Referer': 'https://wallstreetcn.com' }
    });
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    const data = await resp.json();
    const items = data?.data?.items || [];
    return items.map(item => {
        const title = item.title || item.content_text || '';
        const content = item.content_text || item.title || '';
        return {
            source: '华尔街见闻',
            time: formatNewsTime(item.display_time || item.created_at),
            title: title.slice(0, 60),
            summary: content.slice(0, 80) + (content.length > 80 ? '...' : ''),
            detail: content || title || ''
        };
    }).filter(i => i.title).slice(0, 10);
}

// ===== 加载提示 =====
async function loadAlerts(forceRefresh = false) {
    if (!forceRefresh && alertsCache) {
        renderAlerts(alertsCache);
        return;
    }
    
    try {
        const ts = Date.now();
        const response = await fetch(`data/alerts.json?t=${ts}`, {
            cache: 'no-store',
            headers: { 'Cache-Control': 'no-cache' }
        });
        if (response.ok) {
            alertsCache = await response.json();
            renderAlerts(alertsCache);
        }
    } catch (e) {
        renderAlerts({
            forex: { icon: '💱', title: '外汇提示', text: '日元跌破160关口', detail: '日元兑美元汇率跌破160心理关口，创34年新低。日本财务省官员发出警告。' },
            stock: { icon: '📈', title: '股市动向', text: 'A股放量上涨', detail: 'A股三大指数全线收涨，沪指重返3400点。成交额突破万亿。' }
        });
    }
}

// ===== 渲染提示（可点击展开）=====
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

// ===== 渲染新闻列表（可点击展开）=====
function renderNewsList(news) {
    const el = document.getElementById('hotNewsList');
    if (!el) return;
    
    el.innerHTML = news.map((item, index) => `
        <div class="news-item ${expandedNews === index ? 'expanded' : ''}" onclick="toggleNews(${index})">
            <div class="news-rank ${index < 3 ? 'hot' : ''}">${index + 1}</div>
            <div class="news-body">
                <div class="news-head">
                    <span class="news-source">${item.source}</span>
                    <span class="news-time">${item.time}</span>
                </div>
                <div class="news-title">${item.title}</div>
                <div class="news-summary">${item.summary}</div>
                <div class="news-detail">${item.detail || '暂无详细信息'}</div>
            </div>
            <div class="news-arrow">›</div>
        </div>
    `).join('');
    
    localStorage.setItem('hot_news_cache', JSON.stringify(news));
}

// ===== 更新刷新提示 =====
function updateRefreshHint(time) {
    const hint = document.getElementById('refreshHint');
    if (hint) {
        if (time) {
            hint.textContent = `更新于 ${time}`;
            hint.style.color = '#8e8e93';
        } else {
            const now = new Date();
            hint.textContent = `更新于 ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
            hint.style.color = '#8e8e93';
        }
    }
}

// ===== 强制刷新 =====
async function forceRefreshAll() {
    newsCache = [];
    alertsCache = null;
    lastRefreshTime = 0;
    _cachedUpdateTime = '';
    expandedAlert = null;
    expandedNews = null;
    try {
        await Promise.all([loadHotNews(true), loadAlerts(true)]);
    } catch(e) {
        console.log('刷新失败:', e);
        await loadHotNews(true);
        await loadAlerts(true);
    }
}

// ===== XHR方式加载hot-news.json（降级用）=====
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

// ===== 定时自动刷新 =====
let refreshTimer = null;

function startAutoRefresh() {
    if (refreshTimer) clearInterval(refreshTimer);
    // 实时API每5分钟自动刷新
    refreshTimer = setInterval(() => {
        loadHotNews(true);
    }, 5 * 60 * 1000);
}

// ===== 页面可见时检查 =====
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        loadHotNews(true);
    }
});

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    loadHotNews();
    loadAlerts();
    startAutoRefresh();
});
