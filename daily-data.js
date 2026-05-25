/**
 * 智囊团页签 - 方案C
 * 沉浸式深色情绪卡片 + 横向滑动达人选择器 + 紧凑解读卡片
 * 数据源：expert-views.json（每10分钟 cron 更新）
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
    
    // 加载情绪+达人数据
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
    
    if (!moodData) moodData = { mood: '待更新', icon: '⏳', color: '#86868b', confidence: '-', dimensions: [], summary: '' };
    if (!expertsData) expertsData = {};
    
    const meta = {
        templeton: { name: '邓普顿', fullName: '约翰·邓普顿', icon: '🌍', subtitle: '逆向投资之父', color: '#5856d6' },
        buffett:   { name: '巴菲特', fullName: '沃伦·巴菲特', icon: '💰', subtitle: '价值投资之王', color: '#ff9500' },
        munger:    { name: '芒格',   fullName: '查理·芒格',   icon: '🧠', subtitle: '多元思维大师', color: '#34c759' }
    };
    
    const dims = moodData.dimensions || [];
    const dimRows = dims.slice(0, 6).map(d => `
        <div class="z-row">
            <span class="z-row-label">${d.label}</span>
            <span class="z-row-val">${d.value}</span>
        </div>
    `).join('');
    
    // 横向滑动达人卡片
    const expertCards = Object.keys(meta).map(k => {
        const m = meta[k];
        const active = k === _currentExpert ? ' active' : '';
        return `
            <div class="z-card${active}" data-key="${k}" onclick="switchExpert('${k}')" style="${active ? 'border-color:'+m.color : ''}">
                <div class="z-card-avatar" style="background:${m.color}">${m.icon}</div>
                <div class="z-card-name">${m.name}</div>
                <div class="z-card-sub">${m.subtitle}</div>
            </div>
        `;
    }).join('');
    
    // 当前达人内容
    const m = meta[_currentExpert];
    const ex = expertsData[_currentExpert];
    let contentHtml = '';
    if (ex && ex.insight) {
        contentHtml = `
            <div class="z-banner" style="background:${m.color}">
                <span style="font-size:28px;">${m.icon}</span>
                <div>
                    <div class="z-bname">${m.fullName}</div>
                    <div class="z-bsub">${m.subtitle}</div>
                </div>
            </div>
            <div class="z-block">
                <div class="z-block-header">📖 解读</div>
                <div class="z-block-body">${ex.insight.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="z-block z-action">
                <div class="z-block-header">⚡ 建议</div>
                <div class="z-block-body">${ex.action || '等待数据更新...'}</div>
            </div>
        `;
    } else {
        contentHtml = `<div style="text-align:center;padding:24px 0;color:var(--text2);font-size:14px;">等待数据更新...</div>`;
    }
    
    el.innerHTML = `
        <div class="z-mood">
            <div class="z-mood-top">
                <div>
                    <div class="z-mood-label">市场情绪 · ${moodData.mood}</div>
                    <div class="z-mood-conf">信心度 ${moodData.confidence || '-'} · 综合6维度</div>
                </div>
                <span style="font-size:32px;">${moodData.icon}</span>
            </div>
            <div class="z-mood-list">
                ${dimRows || '<div class="z-row"><span class="z-row-label">暂无</span></div>'}
            </div>
        </div>
        
        <div class="z-section-title">🧠 智囊团</div>
        <div class="z-scroll-wrap">
            <div class="z-scroll" id="expertScroll">
                ${expertCards}
            </div>
        </div>
        
        <div id="expertContent">${contentHtml}</div>
    `;
}

function switchExpert(key) {
    _currentExpert = key;
    renderZhinangView(document.getElementById('summaryContent'));
}

// ===== 数据加载 =====
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
    if (!hotNews || hotNews.length === 0) return { mood: '待更新', icon: '⏳', color: '#86868b', confidence: '-', dimensions: [], summary: '' };
    const text = hotNews.map(n => n.title + (n.summary || '')).join('');
    const b = (text.match(/涨|升|新高|反弹|突破|利好/g) || []).length;
    const r = (text.match(/跌|降|新低|回落|利空|风险/g) || []).length;
    const mood = b > r + 2 ? '偏乐观' : r > b + 2 ? '偏谨慎' : '震荡中性';
    const icon = b > r + 2 ? '📈' : r > b + 2 ? '📉' : '➖';
    const color = b > r + 2 ? '#34c759' : r > b + 2 ? '#ff3b30' : '#ff9500';
    return { mood, icon, color, confidence: Math.min(10, 5 + Math.abs(b - r)),
        dimensions: [
            { label: '📈 价格趋势', value: b > r + 2 ? '温和上涨' : r > b + 2 ? '偏弱' : '震荡' },
            { label: '💰 资金流向', value: '中性' },
            { label: '🌍 地缘风险', value: '平稳' },
            { label: '🏭 热点板块', value: '分散' },
            { label: '😊 恐慌贪婪', value: Math.abs(b - r) > 3 ? '偏极端' : '中性' },
            { label: '🏦 宏观信号', value: '中性' }
        ], summary: '' };
}

function genExperts(hotNews, alerts) {
    if (!hotNews || hotNews.length === 0) return {};
    const t = hotNews.map(h => h.title + (h.summary || '')).join('');
    const hasGeo = /地缘|中东|冲突|战争|协议/.test(t);
    const topTitle = hotNews[0]?.title || '';
    return {
        templeton: { insight: hasGeo ? '地缘缓和的本质是风险溢价的释放。逆向视角：被错杀的新兴市场资产值得关注。' : '当市场没有明确方向时，关注被短期情绪压低估值的优质资产。', action: '关注港股和A股中被低估的消费和科技龙头。' },
        buffett: { insight: '好公司的标准不变：ROE>15%、负债率<50%、现金流>净利润。用这个标准筛选值得长期持有的标的。', action: '关注沪深300和中证500指数基金，每月定投。' },
        munger: { insight: '三层思维：「' + topTitle + '」第一层：今天的新闻改变了什么？第二层：是否过度反应？第三层：最坏情况是什么？', action: '保持60%权益+40%现金/债券的均衡配置。' }
    };
}
