/**
 * 热门新闻 - 从JSON文件加载
 */

// ===== 加载热门新闻 =====
async function loadHotNews() {
    try {
        const response = await fetch('data/hot-news.json?t=' + Date.now());
        if (response.ok) {
            const data = await response.json();
            return data.news || [];
        }
    } catch (e) {
        console.log('加载新闻失败，使用缓存');
    }
    
    // 从localStorage读取缓存
    const cached = localStorage.getItem('hot_news_cache');
    return cached ? JSON.parse(cached) : [];
}

// ===== 保存新闻缓存 =====
function saveNewsCache(news) {
    localStorage.setItem('hot_news_cache', JSON.stringify(news));
    localStorage.setItem('hot_news_time', Date.now());
}

// ===== 检查是否需要刷新 =====
function shouldRefresh() {
    const lastTime = localStorage.getItem('hot_news_time');
    if (!lastTime) return true;
    
    const elapsed = Date.now() - parseInt(lastTime);
    const tenMinutes = 10 * 60 * 1000;
    return elapsed > tenMinutes;
}

// ===== 渲染热门新闻 =====
async function renderHotNews() {
    const el = document.getElementById('hotNewsList');
    
    // 显示加载状态
    el.innerHTML = '<div class="empty-hint">加载中...</div>';
    
    let news = await loadHotNews();
    
    // 如果没有新闻或需要刷新
    if (news.length === 0 || shouldRefresh()) {
        // 尝试从网络获取
        try {
            const freshNews = await fetchFreshNews();
            if (freshNews.length > 0) {
                news = freshNews;
                saveNewsCache(news);
            }
        } catch (e) {
            console.log('获取新鲜新闻失败');
        }
    }
    
    if (news.length === 0) {
        el.innerHTML = '<div class="empty-hint">暂无新闻</div>';
        return;
    }
    
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
}

// ===== 获取新鲜新闻（模拟API调用）=====
async function fetchFreshNews() {
    // 这里可以对接真实API，如：
    // - 新浪财经API
    // - 财联社API
    // - 或使用web_search获取
    
    // 目前使用模拟数据
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    
    return [
        { source: "财联社", time: timeStr, title: "A股市场动态更新", summary: "实时市场数据刷新中", detail: "系统正在获取最新市场数据..." },
        { source: "华尔街见闻", time: timeStr, title: "全球市场速递", summary: "海外市场最新动态", detail: "系统正在获取最新海外市场数据..." }
    ];
}

// ===== 定时刷新 =====
let refreshTimer = null;

function startAutoRefresh() {
    // 每10分钟刷新一次
    refreshTimer = setInterval(async () => {
        console.log('自动刷新新闻...');
        const news = await fetchFreshNews();
        if (news.length > 0) {
            saveNewsCache(news);
            renderHotNews();
        }
    }, 10 * 60 * 1000);
}

function stopAutoRefresh() {
    if (refreshTimer) {
        clearInterval(refreshTimer);
        refreshTimer = null;
    }
}

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    renderHotNews();
    startAutoRefresh();
});

// 页面可见性变化时刷新
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && shouldRefresh()) {
        renderHotNews();
    }
});
