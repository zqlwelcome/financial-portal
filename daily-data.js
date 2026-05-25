/**
 * 智囊团页签 - 方案A
 * 仪表盘风格：渐变情绪卡片 + 进度条 + 圆形达人选择器 + 紧凑解读
 */

let _currentExpert = 'templeton';

function renderSummaryContent() {
    const el = document.getElementById('summaryContent');
    if (!el) return;
    _currentExpert = 'templeton';
    renderZhinangView(el);
}

async function renderZhinangView(el) {
    el.innerHTML = '<div style="text-align:center;padding:30px 0;">⏳ 加载中...</div>';
    
    let moodData = null, expertsData = null;
    try {
        const res = await xhrFetch('data/expert-views.json');
        if (res && res.mood) moodData = res.mood;
        if (res && res.experts) expertsData = res.experts;
    } catch(e) {}
    
    if (!moodData) {
        const { hotNews, alerts } = await loadBriefingData();
        if (hotNews && hotNews.length > 0) {
            moodData = assessMood(hotNews);
            expertsData = expertsData || genExperts(hotNews, alerts);
        }
    }
    
    if (!moodData) moodData = { mood: '待更新', icon: '⏳', color: '#0071e3', confidence: 5, dimensions: [] };
    if (!expertsData) expertsData = {};
    
    const meta = {
        templeton: { name: '邓普顿', icon: '🌍', color: '#5856d6' },
        buffett:   { name: '巴菲特', icon: '💰', color: '#ff9500' },
        munger:    { name: '芒格',   icon: '🧠', color: '#34c759' }
    };
    
    // 进度条
    const conf = Math.min(10, Math.max(0, moodData.confidence || 5));
    const bars = Array.from({length: 10}, (_, i) => `<span class="a-bar${i < conf ? ' fill' : ''}"></span>`).join('');
    
    const dims = (moodData.dimensions || []).slice(0, 6);
    const chipHtml = dims.map(d => `<span class="a-chip">${d.value}</span>`).join('');
    
    // 达人圆形按钮
    const btns = Object.keys(meta).map(k => {
        const m = meta[k];
        const active = k === _currentExpert ? ' active' : '';
        return `
            <button class="a-btn${active}" onclick="_currentExpert='${k}';renderZhinangView(el)" style="${active ? 'background:'+m.color+';color:#fff' : ''}">
                <span class="a-btn-icon" style="${active ? 'background:rgba(255,255,255,0.2)' : 'background:'+m.color+'20'}">${m.icon}</span>
                <span class="a-btn-name" style="${active ? 'color:#fff' : ''}">${m.name}</span>
            </button>
        `;
    }).join('');
    
    // 当前达人内容
    const m = meta[_currentExpert];
    const ex = expertsData[_currentExpert];
    let contentHtml = '';
    if (ex && ex.insight) {
        const insightColor = _currentExpert === 'templeton' ? '#5856d6' : _currentExpert === 'buffett' ? '#ff9500' : '#34c759';
        contentHtml = `
            <div class="a-banner" style="background:${m.color}">
                <span class="a-bi">${m.icon}</span>
                <div>
                    <div class="a-bn">${m.name} · 解读</div>
                </div>
            </div>
            <div class="a-card" style="border-left-color:${insightColor}">
                <div class="a-card-body">${ex.insight.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="a-card a-action" style="border-left-color:${m.color}">
                <div class="a-card-body" style="font-weight:500;color:#664d03;">⚡ ${ex.action || '等待数据更新...'}</div>
            </div>
        `;
    } else {
        contentHtml = `<div style="text-align:center;padding:24px 0;color:var(--text2);">等待数据更新...</div>`;
    }
    
    el.innerHTML = `
        <div class="a-mood" style="background:linear-gradient(135deg, ${moodData.color}, ${_currentExpert === 'templeton' ? '#5856d6' : _currentExpert === 'buffett' ? '#ff9500' : '#34c759'})">
            <div class="a-top">
                <div>
                    <div class="a-label">市场情绪</div>
                    <div style="font-size:11px;opacity:0.7;margin-top:1px;">${moodData.mood} · 综合多维度</div>
                </div>
                <div class="a-score">${conf}<small>/10</small></div>
            </div>
            <div class="a-bars">${bars}</div>
            <div class="a-chips">${chipHtml || '<span class="a-chip">暂无数据</span>'}</div>
        </div>
        
        <div class="a-section">🧠 智囊团</div>
        <div class="a-btns">${btns}</div>
        
        <div id="expertContent">${contentHtml}</div>
    `;
}

// ===== 工具函数 =====
async function loadBriefingData() {
    try {
        const [n, a] = await Promise.all([xhrFetch('data/hot-news.json'), xhrFetch('data/alerts.json')]);
        return { hotNews: n?.news || [], alerts: a || null };
    } catch(e) { return { hotNews: [], alerts: null }; }
}

function xhrFetch(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url + '?_=' + Date.now() + Math.random(), true);
        xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        xhr.timeout = 8000;
        xhr.onload = () => { if (xhr.status === 200) { try { resolve(JSON.parse(xhr.responseText)); } catch(e) { reject(e); } } else reject(); };
        xhr.onerror = () => reject();
        xhr.ontimeout = () => reject();
        xhr.send();
    });
}

function assessMood(hotNews) {
    if (!hotNews || hotNews.length === 0) return { mood: '待更新', icon: '⏳', color: '#0071e3', confidence: 5, dimensions: [] };
    const text = hotNews.map(n => n.title + (n.summary || '')).join('');
    const b = (text.match(/涨|升|新高|反弹|突破|利好/g) || []).length;
    const r = (text.match(/跌|降|新低|回落|利空|风险/g) || []).length;
    return {
        mood: b > r + 2 ? '偏乐观' : r > b + 2 ? '偏谨慎' : '震荡中性',
        icon: b > r + 2 ? '📈' : r > b + 2 ? '📉' : '➖',
        color: b > r + 2 ? '#34c759' : r > b + 2 ? '#ff3b30' : '#ff9500',
        confidence: Math.min(10, Math.max(1, 5 + Math.abs(b - r))),
        dimensions: [
            { value: b > r + 2 ? '📈 温和上涨' : r > b + 2 ? '📉 偏弱' : '➖ 震荡' },
            { value: '💱 中性' },
            { value: '🌍 平稳' },
            { value: Math.abs(b - r) > 3 ? '😊 偏乐观' : '😶 中性' }
        ]
    };
}

function genExperts(hotNews, alerts) {
    if (!hotNews || hotNews.length === 0) return {};
    const t = hotNews.map(h => h.title + (h.summary || '')).join('');
    const hasGeo = /地缘|中东|冲突|战争|协议/.test(t);
    const topTitle = hotNews[0]?.title || '';
    return {
        templeton: { insight: hasGeo ? '中东缓和的本质是风险溢价的释放。逆向视角：当所有人庆祝和平时，关注被错杀的新兴市场资产。' : '当市场没有明确方向时，关注被短期情绪压低估值的优质资产。', action: '关注港股和A股中被低估的消费和科技龙头。' },
        buffett: { insight: '好公司的标准不变：ROE>15%、负债率<50%、现金流>净利润。用这个标准筛选。', action: '关注沪深300和中证500指数基金，每月定投。' },
        munger: { insight: '三层思维：「' + topTitle + '」第一层：今天的新闻改变了什么？第二层：是否过度反应？第三层：最坏情况是什么？', action: '保持60%权益+40%现金/债券的均衡配置。' }
    };
}
