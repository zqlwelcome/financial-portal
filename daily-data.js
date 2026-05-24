/**
 * 总结页签 - 实时版
 * 数据源：hot-news.json + alerts.json（每10分钟 cron 更新）
 * 不再依赖独立简报文件，自动生成今日简报和达人观点
 */

// ===== 推送时间配置 =====
const PUSH_SLOTS = [
    { key: 'morning',  label: '早报', icon: '🌅', pushTime: '08:00' },
    { key: 'noon',     label: '午报', icon: '☀️', pushTime: '12:00' },
    { key: 'evening',  label: '晚报', icon: '🌆', pushTime: '19:00' }
];

// ===== 已读状态 =====
const READ_KEY = 'push_read';

function getReadSet() {
    const val = localStorage.getItem(READ_KEY);
    return val ? new Set(JSON.parse(val)) : new Set();
}

function markRead(key) {
    const set = getReadSet();
    set.add(key);
    localStorage.setItem(READ_KEY, JSON.stringify([...set]));
}

function isRead(key) {
    return getReadSet().has(key);
}

// ===== 从hot-news.json和alerts.json生成简报内容 =====
function generateBriefing(hotNews, alerts) {
    if (!hotNews || hotNews.length === 0) return null;
    
    const lines = [];
    // 头部
    lines.push('📊 今日财经摘要');
    lines.push('');
    
    // 头条 - 取前3条
    lines.push('🔥 头条');
    hotNews.slice(0, 3).forEach((item, i) => {
        lines.push(`• ${item.title}（${item.source}）`);
    });
    
    lines.push('');
    
    // 要闻 - 取4-10条精简
    const more = hotNews.slice(3, 8);
    if (more.length > 0) {
        lines.push('📌 要闻');
        more.forEach(item => {
            lines.push(`• ${item.summary || item.title.slice(0, 40)}`);
        });
    }
    
    lines.push('');
    
    // 从alerts.json提取外汇/股市
    if (alerts) {
        lines.push('💡 行情速览');
        if (alerts.forex) lines.push(`• 外汇：${alerts.forex.text}`);
        if (alerts.stock) lines.push(`• 股市：${alerts.stock.text}`);
    }
    
    return lines.join('\n');
}

// ===== 从新闻内容生成三视角速评 =====
function generateExpertViews(hotNews, alerts) {
    if (!hotNews || hotNews.length === 0) return {};
    
    const headlines = hotNews.slice(0, 5);
    const hasTradeWar = headlines.some(h => (h.title + h.summary).includes('关税') || (h.title + h.summary).includes('贸易'));
    const hasAIFrenzy = headlines.some(h => (h.title + h.summary).includes('AI') || (h.title + h.summary).includes('人工智能'));
    const hasCrypto = headlines.some(h => (h.title + h.summary).includes('比特币') || (h.title + h.summary).includes('加密货币'));
    const hasOil = headlines.some(h => (h.title + h.summary).includes('原油') || (h.title + h.summary).includes('油价'));
    const hasStocks = headlines.some(h => (h.title + h.summary).includes('股市') || (h.title + h.summary).includes('指数'));
    
    // 基于真实新闻动态生成观点
    const experts = {};
    
    experts.templeton = {
        insight: headlines.length > 0 ? `今日市场关注：${headlines[0].summary.slice(0, 50)}。全球资金正在${hasTradeWar ? '因贸易摩擦升温而流向避险资产' : hasOil ? '因能源格局变化而重新配置' : '寻求新的价值洼地'}，逆向思维者应关注被市场情绪错杀的资产。` : '市场整体处于震荡中，逆向投资者需保持耐心。',
        prediction: hasCrypto ? '数字货币短期波动加剧，但长期趋势未改。当恐惧指数上升时，往往是聪明钱布局的时机。' : hasAIFrenzy ? 'AI赛道估值偏贵，但行业变革才刚刚开始。关注应用层而非基础设施层的结构性机会。' : '建议关注被地缘风险压制的市场，如港股和部分新兴市场，等待均值回归。',
        lesson: '行情总在绝望中诞生，在犹豫中成长。当所有人都盯着同一个风险时，那个风险往往已经price in了。'
    };
    
    experts.buffett = {
        insight: hasStocks ? `主要股指表现活跃，但短期波动不应干扰长期判断。优质公司的护城河不会因为一天的涨跌而改变。` : `市场每日消息很多，但真正影响企业内在价值的事件很少。保持定力，聚焦企业基本面。`,
        prediction: hasAIFrenzy ? 'AI领域的投资需要区分"淘金者"和"卖铲子的人"。真正有护城河的是掌握核心数据和算力的基础设施公司。' : hasTradeWar ? '贸易摩擦短期影响市场情绪，但会促使企业优化供应链。长期看，具备全球竞争力的公司会从中受益。' : '在不确定的市场中，现金流充裕、负债率低的消费龙头具有最高的安全边际。',
        lesson: '市场短期是情绪投票器，长期是价值称重机。今天的波动，放在十年后看可能只是一个小浪花。'
    };
    
    experts.munger = {
        insight: headlines.length > 0 ? `今天的新闻中，${headlines[0].title.slice(0, 30)}是最值得关注的信号。但要注意——不要被单一叙事主导你的判断。` : '市场信息过载时，最好的策略是减少决策频率。',
        prediction: hasCrypto ? '当所有人都在谈论比特币时，问问自己：我比市场知道得更多吗？如果答案是否定的，就别跟风交易。' : hasTradeWar ? '贸易战中没有赢家。但每次危机都伴随着结构性的机会——那些被迫升级技术、优化管理的企业最终会更强。' : '保持组合的多样性是应对不确定性的唯一免费午餐。不要押注单一方向。',
        lesson: '投资最重要的是不要做蠢事。当新闻让你情绪激动时，停一停，问问自己：这个信息对我的持仓有实质影响吗？'
    };
    
    return experts;
}

// ===== 加载简报（从hot-news.json和alerts.json实时生成）=====
async function loadBriefingData() {
    try {
        const [newsData, alertsData] = await Promise.all([
            xhrFetchHotNews(),
            xhrFetchAlerts()
        ]);
        
        let hotNews = null, alerts = null, updateTime = '';
        
        if (newsData && newsData.news) {
            hotNews = newsData.news;
            updateTime = newsData.updateTime || '';
        }
        if (alertsData) {
            alerts = alertsData;
            updateTime = alertsData.updateTime || updateTime;
        }
        
        return { hotNews, alerts, updateTime };
    } catch(e) {
        return { hotNews: null, alerts: null, updateTime: '' };
    }
}

// ===== XHR获取hot-news.json =====
function xhrFetchHotNews() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'data/hot-news.json?_=' + Date.now() + Math.random(), true);
        xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        xhr.setRequestHeader('Pragma', 'no-cache');
        xhr.setRequestHeader('Expires', '0');
        xhr.timeout = 8000;
        xhr.onload = () => {
            if (xhr.status === 200) {
                try { resolve(JSON.parse(xhr.responseText)); } catch(e) { reject(e); }
            } else { reject(new Error('HTTP ' + xhr.status)); }
        };
        xhr.onerror = () => reject(new Error('Network error'));
        xhr.ontimeout = () => reject(new Error('Timeout'));
        xhr.send();
    });
}

function xhrFetchAlerts() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'data/alerts.json?_=' + Date.now() + Math.random(), true);
        xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        xhr.setRequestHeader('Pragma', 'no-cache');
        xhr.setRequestHeader('Expires', '0');
        xhr.timeout = 8000;
        xhr.onload = () => {
            if (xhr.status === 200) {
                try { resolve(JSON.parse(xhr.responseText)); } catch(e) { reject(e); }
            } else { reject(new Error('HTTP ' + xhr.status)); }
        };
        xhr.onerror = () => reject(new Error('Network error'));
        xhr.ontimeout = () => reject(new Error('Timeout'));
        xhr.send();
    });
}

// ===== 选择器（点击切换视图）=====
function initSlideSelector() {
    const sel = document.querySelector('.slide-selector');
    if (!sel) return;
    const opts = sel.querySelectorAll('.slide-opt');

    opts.forEach((opt) => {
        opt.addEventListener('click', () => {
            const view = opt.dataset.view;
            opts.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            window._currentView = view;
            renderView().then(() => {});
        });
    });

    window._currentView = 'today';
    renderView().then(() => {});
}

function switchToView(idx) {
    const opts = document.querySelectorAll('.slide-opt');
    if (!opts[idx]) return;
    opts.forEach(o => o.classList.remove('active'));
    opts[idx].classList.add('active');
    window._currentView = opts[idx].dataset.view;
    renderView().then(() => {});
}

// ===== 渲染视图（今日或达人）=====
async function renderView() {
    const el = document.getElementById('summaryContent');
    if (!el) return;
    const view = window._currentView || 'today';
    if (view === 'today') {
        await renderTodayView(el);
    } else {
        await renderExpertView(el, view);
    }
}

async function renderSummaryContent() {
    await renderView();
}

// ===== 今日视图（从实时数据生成简报）=====
async function renderTodayView(el) {
    el.innerHTML = '<div style="text-align:center;padding:30px 0;color:#8e8e93;">⏳ 加载中...</div>';
    
    const { hotNews, alerts, updateTime } = await loadBriefingData();
    
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    const nowMin = today.getHours() * 60 + today.getMinutes();
    
    const hasNews = hotNews && hotNews.length > 0;
    
    el.innerHTML = `
        <div class="today-header">
            <div class="th-icon">📢</div>
            <div class="th-info">
                <div class="th-title">每日简报</div>
                <div class="th-sub">${dateStr} ${updateTime ? '· ⏱ ' + updateTime : ''}</div>
            </div>
        </div>
        <div class="today-slots">
            ${PUSH_SLOTS.map(slot => {
                const pushMin = parseInt(slot.pushTime.split(':')[0]) * 60 + parseInt(slot.pushTime.split(':')[1]);
                const isPushed = nowMin >= pushMin && hasNews;
                
                if (isPushed) {
                    const read = isRead(slot.key);
                    const content = generateBriefing(hotNews, alerts) || '';
                    return `
                    <div class="ts-card ${read ? 'read' : ''}" data-key="${slot.key}" onclick="togglePushCard(this)">
                        <div class="ts-head">
                            <span class="ts-icon">${slot.icon}</span>
                            <span class="ts-label">${slot.label}</span>
                            <span class="ts-badge">${read ? '已读' : '未读'}</span>
                            <span class="ts-arrow">›</span>
                        </div>
                        <div class="ts-preview">${content.split('\n').slice(0,4).join('<br>')}</div>
                        <div class="ts-full hidden">${content.replace(/\n/g, '<br>')}</div>
                    </div>
                    `;
                } else {
                    const status = nowMin >= pushMin ? '暂无数据' : `${slot.pushTime} 推送`;
                    return `
                    <div class="ts-card pending">
                        <div class="ts-head">
                            <span class="ts-icon">${slot.icon}</span>
                            <span class="ts-label">${slot.label}</span>
                            <span class="ts-status">${status}</span>
                        </div>
                    </div>
                    `;
                }
            }).join('')}
        </div>
    `;
    
    // 缓存数据供达人视图使用
    window._briefingData = { hotNews, alerts };
}

// ===== 点击展开简报 =====
function togglePushCard(el) {
    const key = el.dataset.key;
    if (!isRead(key)) {
        markRead(key);
        el.classList.add('read');
        const badge = el.querySelector('.ts-badge');
        if (badge) badge.textContent = '已读';
    }
    el.classList.toggle('expanded');
    const arrow = el.querySelector('.ts-arrow');
    if (arrow) arrow.textContent = el.classList.contains('expanded') ? '⌄' : '›';
}

// ===== 达人视图（动态生成）=====
async function renderExpertView(el, expertId) {
    // 从缓存或重新加载
    let data = window._briefingData;
    if (!data || !data.hotNews) {
        data = await loadBriefingData();
        window._briefingData = data;
    }
    
    const { hotNews, alerts } = data;
    const experts = generateExpertViews(hotNews, alerts);
    
    const expertMeta = {
        templeton: { name: '邓普顿', fullName: '约翰·邓普顿', icon: '🌍', subtitle: '逆向投资之父', color: '#5856d6', 
            bio: '全球投资之父，以逆向投资闻名。名言："行情在绝望中诞生，在犹豫中成长，在乐观中成熟，在兴奋中死亡。"' },
        buffett: { name: '巴菲特', fullName: '沃伦·巴菲特', icon: '💰', subtitle: '价值投资之王', color: '#ff9500',
            bio: '伯克希尔·哈撒韦CEO，价值投资典范。名言："价格是你付出的，价值是你得到的。"' },
        munger: { name: '芒格', fullName: '查理·芒格', icon: '🧠', subtitle: '多元思维大师', color: '#34c759',
            bio: '伯克希尔副董事长，多元思维模型倡导者。名言："我必须知道我将在哪里死去，这样我就永远不会去那里。"' }
    };
    
    const meta = expertMeta[expertId];
    const ex = experts[expertId];
    
    if (!ex || !ex.insight) {
        el.innerHTML = `
            <div style="text-align:center;padding:40px 0;color:#8e8e93;font-size:14px;">
                <div style="font-size:40px;margin-bottom:12px;">${meta.icon}</div>
                <div>等待新闻更新后自动生成</div>
                <div style="margin-top:8px;font-size:12px;color:#aeaeb2;">${meta.name}的解读将基于实时新闻自动生成</div>
            </div>
        `;
        return;
    }
    
    el.innerHTML = `
        <div class="expert-banner" style="background:${meta.color}">
            <div class="eb-avatar">${meta.icon}</div>
            <div class="eb-info">
                <div class="eb-name">${meta.fullName}</div>
                <div class="eb-sub">${meta.subtitle}</div>
            </div>
            <div class="eb-time">实时</div>
        </div>
        <div class="expert-bio">${meta.bio}</div>
        
        <div class="expert-block">
            <div class="ebl-header">📖 当日解读</div>
            <div class="ebl-body">${ex.insight}</div>
        </div>
        
        <div class="expert-block">
            <div class="ebl-header">🔮 投资预判</div>
            <div class="ebl-body">${ex.prediction}</div>
        </div>
        
        <div class="expert-block lesson">
            <div class="ebl-header">💡 心得分享</div>
            <div class="ebl-body">${ex.lesson.replace(/\n/g, '<br>')}</div>
        </div>
    `;
}
