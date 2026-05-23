/**
 * 新闻和提示 - 自动刷新版
 */

// ===== 缓存 =====
let newsCache = [];
let alertsCache = null;
let lastRefreshTime = 0;
const REFRESH_INTERVAL = 10 * 60 * 1000; // 10分钟

// ===== 加载新闻 =====
async function loadHotNews(forceRefresh = false) {
    const el = document.getElementById('hotNewsList');
    if (!el) return;
    
    // 如果不是强制刷新且缓存有效，直接使用缓存
    if (!forceRefresh && newsCache.length > 0 && (Date.now() - lastRefreshTime) < REFRESH_INTERVAL) {
        renderNewsList(newsCache);
        return;
    }
    
    // 显示加载状态
    el.innerHTML = '<div class="empty-hint">🔄 获取最新新闻...</div>';
    
    try {
        // 添加时间戳避免浏览器缓存
        const timestamp = Date.now();
        const response = await fetch(`data/hot-news.json?t=${timestamp}`, {
            cache: 'no-store',
            headers: { 'Cache-Control': 'no-cache' }
        });
        
        if (response.ok) {
            const data = await response.json();
            if (data.news && data.news.length > 0) {
                newsCache = data.news;
                lastRefreshTime = Date.now();
                renderNewsList(newsCache);
                updateRefreshHint(data.updateTime);
                console.log('新闻已更新:', data.updateTime);
                return;
            }
        }
    } catch (e) {
        console.log('加载新闻失败:', e);
    }
    
    // 如果加载失败，使用localStorage缓存
    const cached = localStorage.getItem('hot_news_cache');
    if (cached) {
        newsCache = JSON.parse(cached);
        renderNewsList(newsCache);
    } else {
        el.innerHTML = '<div class="empty-hint">暂无新闻</div>';
    }
}

// ===== 加载提示（外汇/股市）=====
async function loadAlerts(forceRefresh = false) {
    if (!forceRefresh && alertsCache) {
        renderAlerts(alertsCache);
        return;
    }
    
    try {
        const response = await fetch(`data/alerts.json?t=${Date.now()}`, {
            cache: 'no-store'
        });
        if (response.ok) {
            alertsCache = await response.json();
            renderAlerts(alertsCache);
        }
    } catch (e) {
        console.log('加载提示失败:', e);
        renderAlerts({
            forex: { icon: '💱', title: '外汇提示', text: '日元跌破160关口，关注日本央行干预' },
            stock: { icon: '📈', title: '股市动向', text: 'A股放量上涨，北向资金连续3日净流入' }
        });
    }
}

// ===== 渲染提示 =====
function renderAlerts(data) {
    const el = document.getElementById('alertArea');
    if (!el) return;
    
    el.innerHTML = `
        <div class="alert-card forex">
            <div class="alert-icon">${data.forex.icon}</div>
            <div class="alert-content">
                <div class="alert-title">${data.forex.title}</div>
                <div class="alert-text">${data.forex.text}</div>
            </div>
        </div>
        <div class="alert-card stock">
            <div class="alert-icon">${data.stock.icon}</div>
            <div class="alert-content">
                <div class="alert-title">${data.stock.title}</div>
                <div class="alert-text">${data.stock.text}</div>
            </div>
        </div>
    `;
}

// ===== 渲染新闻列表 =====
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
                <div class="news-detail">${item.detail}</div>
            </div>
        </div>
    `).join('');
    
    // 保存到localStorage
    localStorage.setItem('hot_news_cache', JSON.stringify(news));
}

// ===== 更新刷新提示 =====
function updateRefreshHint(time) {
    const hint = document.getElementById('refreshHint');
    if (hint) {
        if (time) {
            hint.textContent = `更新于 ${time}`;
        } else {
            const now = new Date();
            hint.textContent = `更新于 ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
        }
    }
}

// ===== 强制刷新 =====
async function forceRefreshAll() {
    newsCache = [];
    alertsCache = null;
    lastRefreshTime = 0;
    await Promise.all([loadHotNews(true), loadAlerts(true)]);
}

// ===== 定时自动刷新 =====
let refreshTimer = null;

function startAutoRefresh() {
    if (refreshTimer) clearInterval(refreshTimer);
    
    refreshTimer = setInterval(() => {
        console.log('自动刷新新闻...');
        loadHotNews(true);
    }, REFRESH_INTERVAL);
}

// ===== 页面可见时检查 =====
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && (Date.now() - lastRefreshTime) > REFRESH_INTERVAL) {
        loadHotNews(true);
    }
});

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    loadHotNews();
    loadAlerts();
    startAutoRefresh();
});
