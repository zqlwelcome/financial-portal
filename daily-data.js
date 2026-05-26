/**
 * 智囊团页签 - 方案A
 * 仪表盘风格：渐变情绪卡片 + 进度条 + 圆形达人选择器 + 紧凑解读
 */

let _currentExpert = 'templeton';

// ===== 内嵌数据（替代 remote fetch，避免GitHub Pages缓存问题）=====
const _EMBEDDED_DATA = {
    "updateTime": "2026-05-26 08:00",
    "mood": {
        "mood": "警惕回调",
        "icon": "\u26a0",
        "color": "#ff9500",
        "confidence": 5,
        "dimensions": [
            {"label": "📈 趋势", "value": "震荡偏弱"},
            {"label": "💰 资金", "value": "央行净投放3570亿"},
            {"label": "🌍 地缘", "value": "美军突袭伊朗·谈判反复"},
            {"label": "🏭 热点", "value": "半导体涨62%·券商破净33%"},
            {"label": "😊 情绪", "value": "分歧加大"},
            {"label": "🏦 宏观", "value": "美债收益率曲线警示·沃什高利率持久化"}
        ],
        "summary": "整体需警惕回调（5/10）。地缘风险骤升：美伊谈判刚现曙光即遭美军突袭，WTI反弹。利率端：美债关键利差收窄至一年最低，沃什时代高利率或更持久。A股两极分化——半导体年内暴涨62%遭密集减持，券商板块跌13.6%破净率达33%。央行呵护流动性但跨月压力仍在。"
    },
    "experts": {
        "templeton": {"insight": "美伊谈判一度让油价暴跌超7%、全球股市创新高，但昨晚美军突然对伊朗南部实施自卫打击，打爆了所有对和平协议一蹴而就的预期。最大预期差在这里：市场刚把油价暴跌当通胀缓解利好定价，地缘溢价就回来了。智利6.1级地震冲击铜矿供给，但Codelco矿区地震影响被高估——短期情绪冲击≠持续短缺。日经创历史新高后的震荡说明全球资金在美伊之间找不到方向。逆向布局机会：被恐慌抛售的中东基建和航运股，以及被地缘误伤但基本面扎实的日本商社。", "action": "逢低买入被地缘恐慌错杀的日本丸红三菱商社，以及中东航运龙头。市场对美伊停火过于乐观，对美伊冲突升级又过于恐慌——第三波预期修正才是真正的利润来源。"},
        "buffett": {"insight": "今天没有需要我改变主意的事情。美债收益率曲线收窄到一年最低——市场在说沃什会让利率更高更久。这对所有估值依赖远期现金流的公司是系统性压力。但我只看护城河：苹果的回购还在继续（理想、新秀丽、渣打都在大手笔回购），腾讯今年现金流改善明显，回购力度只会更大。券商板块33%破净，中信证券这种净资产打七折的，短期市场情绪不好，但长期现金流不值这个价。前提：你得等得起。", "action": "券商破净是市场悲观情绪的极端体现，选一家ROE稳定、分红率高的龙头券商，分3批建仓。每批间隔一个月。不要梭哈，现金是沃什时代最好的朋友。"},
        "munger": {"insight": "三层思维：第一层→今晚美军袭击伊朗，油价反弹、股市期货回落，人们说中东又危险了。第二层→美伊谈判框架仍在，特朗普表态进展顺利且伊朗浓缩铀可运到其他地点销毁。袭击更像谈判桌前的施压，不是战争前奏。第三层→美债收益率曲线收窄到一年最低，意味着聪明钱押注沃什高利率长期化。这是比中东更大的变量。半导体涨62%后大股东集体跑路——当内部人开始卖的时候，你要问自己：我比他们更了解公司吗？券商破净33%——市场情绪极度悲观，但这是买入机会还是价值陷阱？要看破净背后是真亏损还是周期低谷。", "action": "不要因为美伊冲突就追石油军工，不要因为券商破净就抄底金融。最确定的交易：卖出一部分年内涨幅超过50%的半导体仓位，买入短久期高等级信用债。现金+短债是当前最优解。"},
        "duan": {"insight": "今晚美军打伊朗了？早上起来看了一眼，WTI还涨了。但我压根不关心明天油价涨跌——苹果的用户会因为伊朗挨打就不买iPhone吗？腾讯的游戏玩家会因此少充648吗？不会。那还有什么好担心的？我今天只关注一件事：小米昨晚发的业绩报告。港股收盘后出的，我得看看有没有超预期。雷军这个人靠谱，小米汽车交付量一直在爬坡，要是业绩不错，估值还合理我就加仓。理想汽车5月22日花1026万美元回购130万股——管理层在用实际行动告诉你他们认为公司值多少钱。", "action": "等小米业绩报告出来仔细看。如果营收和汽车交付超预期，果断加仓。苹果和腾讯继续持有，不要动。理想汽车回购是个好信号，关注但不急着买——等中美地缘缓和后再看。"}
    }
};

function renderSummaryContent() {
    const el = document.getElementById('summaryContent');
    if (!el) return;
    _currentExpert = 'templeton';
    // 直接使用内嵌数据
    const moodData = _EMBEDDED_DATA.mood;
    const expertsData = _EMBEDDED_DATA.experts;
    window._expertsData = expertsData;
    
    const conf = Math.min(10, Math.max(0, moodData.confidence || 5));
    const bars = Array.from({length: 10}, (_, i) => `<span class="a-bar${i < conf ? ' fill' : ''}"></span>`).join('');
    const dims = (moodData.dimensions || []).slice(0, 6);
    const chipHtml = dims.map(d => {
        // 兼容新旧格式
        if (d.label) return `<span class="a-chip"><span class="a-chip-label">${d.label}</span> ${d.value}</span>`;
        return `<span class="a-chip">${d.value}</span>`;
    }).join('');
    
    const meta = {
        templeton: { name: '邓普顿', icon: '🌍', color: '#5856d6' },
        buffett:   { name: '巴菲特', icon: '💰', color: '#ff9500' },
        munger:    { name: '芒格',   icon: '🧠', color: '#34c759' },
        duan:      { name: '段永平', icon: '🧑‍💼', color: '#0071e3' }
    };
    
    // 情绪卡片（静态，不随达人切换变化）
    const moodHtml = `
        <div class="a-mood" id="aMood">
            <div class="a-top">
                <div>
                    <div class="a-label">市场情绪</div>
                    <div class="a-mood-status">
                        <span>${moodData.icon}</span>
                        <span>${moodData.mood}</span>
                    </div>
                </div>
                <div class="a-score">${conf}<small>/10</small></div>
            </div>
            <div class="a-bars">${bars}</div>
            <div class="a-chips">${chipHtml || '<span class="a-chip">暂无数据</span>'}</div>
        </div>
    `;
    
    // 达人按钮（静态）
    const btnsHtml = Object.keys(meta).map(k => {
        const m = meta[k];
        const active = k === _currentExpert ? ' active' : '';
        return `
            <button class="a-btn${active}" onclick="switchExpert('${k}')" style="${active ? 'background:'+m.color+';color:#fff' : ''}">
                <span class="a-btn-icon" style="${active ? 'background:rgba(255,255,255,0.2)' : 'background:'+m.color+'20'}">${m.icon}</span>
                <span class="a-btn-name" style="${active ? 'color:#fff' : ''}">${m.name}</span>
            </button>
        `;
    }).join('');
    
    el.innerHTML = moodHtml + `<div class="a-section">🧠 智囊团</div><div class="a-btns">${btnsHtml}</div><div id="expertContent"></div>`;
    
    // 渲染当前达人内容
    renderExpertContent();
}

function switchExpert(key) {
    _currentExpert = key;
    // 更新按钮高亮状态
    document.querySelectorAll('.a-btn').forEach((btn, i) => {
        const keys = ['templeton', 'buffett', 'munger', 'duan'];
        const k = keys[i];
        const meta = { templeton: {color:'#5856d6'}, buffett: {color:'#ff9500'}, munger: {color:'#34c759'}, duan: {color:'#0071e3'} };
        const m = meta[k];
        const active = k === key;
        btn.className = 'a-btn' + (active ? ' active' : '');
        btn.style.background = active ? m.color : '';
        btn.style.color = active ? '#fff' : '';
        const icon = btn.querySelector('.a-btn-icon');
        if (icon) icon.style.background = active ? 'rgba(255,255,255,0.2)' : m.color + '20';
        const name = btn.querySelector('.a-btn-name');
        if (name) name.style.color = active ? '#fff' : '';
    });
    // 只更新内容区
    renderExpertContent();
}

function renderExpertContent() {
    const el = document.getElementById('expertContent');
    if (!el) return;
    
    const meta = {
        templeton: { name: '邓普顿', icon: '🌍', color: '#5856d6' },
        buffett:   { name: '巴菲特', icon: '💰', color: '#ff9500' },
        munger:    { name: '芒格',   icon: '🧠', color: '#34c759' },
        duan:      { name: '段永平', icon: '🧑‍💼', color: '#0071e3' }
    };
    const m = meta[_currentExpert];
    const expertsData = window._expertsData || {};
    const ex = expertsData[_currentExpert];
    
    if (ex && ex.insight) {
        el.innerHTML = `
            <div class="a-banner">
                <span class="a-bi">${m.icon}</span>
                <div class="a-bn">${m.name} · 解读</div>
            </div>
            <div class="a-card" style="border-left-color:${m.color}">
                <div class="a-card-body">${ex.insight.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="a-card a-action" style="border-left-color:${m.color}">
                <div class="a-card-body" style="font-weight:500;color:#664d03;">⚡ ${ex.action || '等待数据更新...'}</div>
            </div>
            <div class="a-feedback">
                <span class="a-fb-label">这个判断</span>
                <button class="a-fb-btn" onclick="fbFeedback('${_currentExpert}','like')">👍 有用</button>
                <button class="a-fb-btn" onclick="fbFeedback('${_currentExpert}','unlike')">👎 不准</button>
            </div>
        `;
    } else {
        el.innerHTML = '<div style="text-align:center;padding:24px 0;color:var(--text2);">等待数据更新...</div>';
    }
}

// ===== 用户反馈 =====
function fbFeedback(expert, type) {
    const key = 'fb_' + expert + '_' + type;
    const count = parseInt(localStorage.getItem(key) || '0') + 1;
    localStorage.setItem(key, count.toString());
    const btns = document.querySelectorAll('.a-fb-btn');
    btns.forEach(b => { b.disabled = true; b.style.opacity = '0.5'; });
    const label = document.querySelector('.a-fb-label');
    if (label) label.textContent = type === 'like' ? '✅ 已记录' : '📝 已记录';
    setTimeout(() => {
        btns.forEach(b => { b.disabled = false; b.style.opacity = '1'; });
        if (label) label.textContent = '这个判断';
    }, 2000);
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
            { label: '📈 趋势', value: b > r + 2 ? '温和上涨' : r > b + 2 ? '偏弱' : '震荡' },
            { label: '💰 资金', value: '中性' },
            { label: '🌍 地缘', value: '平稳' },
            { label: '🏭 热点', value: '分散' },
            { label: '😊 情绪', value: Math.abs(b - r) > 3 ? '偏乐观' : '中性' },
            { label: '🏦 宏观', value: '中性' }
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
        munger: { insight: '三层思维：「' + topTitle + '」第一层：今天的新闻改变了什么？第二层：是否过度反应？第三层：最坏情况是什么？', action: '保持60%权益+40%现金/债券的均衡配置。' },
        duan: { insight: '好生意+好管理层+好价格。' + topTitle + '，看得懂的才重仓。', action: '关注苹果、腾讯、拼多多回调后的加仓机会。' }
    };
}
