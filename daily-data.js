/**
 * 智囊团页签 - 方案A
 * 仪表盘风格：渐变情绪卡片 + 进度条 + 圆形达人选择器 + 紧凑解读
 */

let _currentExpert = 'templeton';

// ===== 内嵌数据（替代 remote fetch，避免GitHub Pages缓存问题）=====
const _EMBEDDED_DATA = {
    "updateTime": "2026-05-26 14:30",
    "mood": {
        "mood": "震荡分化",
        "icon": "\u26a0",
        "color": "#ff9500",
        "confidence": 6,
        "dimensions": [
            {"label": "📈 趋势", "value": "大盘跌·科创50重挫3%"},
            {"label": "💰 资金", "value": "央行净投放2485亿"},
            {"label": "🌍 地缘", "value": "美伊冲突升级·击沉布雷船"},
            {"label": "🏭 热点", "value": "半导体调整·智谱创新高"},
            {"label": "😊 情绪", "value": "极端分化·成交2.5万亿"},
            {"label": "🏦 宏观", "value": "欧央行鹰派·Schnabel称6月需加息"}
        ],
        "summary": "今日市场显著分化（6/10）。沪指跌0.91%收4114，科创50重挫近3%，半导体产业链全面回调；但恒生科技涨2.29%，联想大涨近18%，智谱涨超10%创新高，京东方A涨停。地缘层面：美军在霍尔木兹海峡击沉两艘伊朗布雷船，鲁比奥称美伊协议还需几天。宏观层面：欧央行执委Schnabel明确表态6月必须加息，警告通胀冲击正在蔓延。资金面：央行逆回购净投放2485亿呵护流动性，两市成交超2.5万亿量能充裕。热点极度集中——AI应用、光模块、铝业逆市走强，而存储芯片、商业航天大幅杀跌。"
    },
    "experts": {
        "templeton": {"insight": "今天的行情完美诠释了什么叫'预期差驱动'。科创50跌近3%而恒生科技涨2.29%——同一批AI概念股，A股跌港股涨，说明这不是基本面的问题，是资金面和情绪面的结构性错位。最大预期差在这里：欧央行Schnabel明确说6月要加息，市场却没怎么定价这件事。伊朗局势——美军击沉布雷船、鲁比奥说谈判还要几天——市场已经审美疲劳了，但欧洲通胀冲击向消费蔓延、成本端压力上升，这比中东冲突更值得关注。智谱涨10%创新高站上1400港元，MiniMax涨7%、联想涨18%——这些公司的共性是'中国AI已经进入可验证的业绩释放阶段'。逆向思维：当半导体被集体抛售时，看看哪些是被误杀的——存储芯片大厂减产带来的供给缺口不会因为一天的调整就消失。", "action": "关注被半导体调整拖累但基本面独立的AI应用和算力基建标的。智谱创新高只是开始——中国AI应用商业化正在从故事变成数字。逢低建仓恒生科技ETF（而非个股），利用A股港股的价差套利机会。"},
        "buffett": {"insight": "京东方A涨停了，成交额200亿。我不碰这种股票——不是因为不好，是因为我看不懂面板周期的拐点。我看得懂的是联想大涨18%的逻辑：PC换机周期+AI PC渗透率提升+分红回购。这就是护城河，虽然薄了一点，但胜在看得见摸得着。今天最值得注意的数字是两市成交2.5万亿——市场情绪极度活跃但方向极度分裂。当市场上大部分人都在追AI和半导体的时候，你反而要冷静。今天新易盛逆市涨5%再创新高——光模块龙头的逻辑没问题，但股价已经涨了这么多，安全边际变小了。现金在这个位置比追涨更重要。", "action": "继续持有腾讯和苹果。腾讯今天虽然没有直接受益于恒生科技大涨的题材，但公司的回购和现金流改善是确定的。如果有闲钱，在当前点位小仓位加仓腾讯——不要超过总仓位的5%。现金保留50%以上，等市场回调再动手。"},
        "munger": {"insight": "三层思维。第一层→今天A股跌了，科创50跌了近3%，半导体、存储芯片、商业航天都在跌。有人说AI行情结束了。第二层→看看港股：恒生科技涨2.29%，联想涨18%，智谱涨10%创新高，京东方涨停。同样的AI、同样的科技，为什么A股跌港股涨？因为科创板前期涨太多了，获利了结而已，不是逻辑变了。第三层→欧央行Schnabel说'6月需要加息'，还说'即便伊朗战争今天结束，鉴于能源基础设施受损，仍需采取政策行动'。这句话的深意是：地缘冲突对通胀的影响是持久的，央行不会等局势明朗再行动。市场现在最大的认知偏误是——以为A股的调整只是科技股涨多了回调，没有意识到全球流动性收紧已经在路上。央行净投放2485亿让你觉得很安全？但这只是短期逆回购，解决不了长期利率上行的根本问题。", "action": "今天不要做任何追涨操作。科技股调整还没结束——科创50短期可能还有5-8%的下行空间。如果你持有半导体或科创ETF，减仓20-30%锁定部分利润。卖出资金买入短债或货币基金。最错误的操作：看到智谱涨10%创新高就追买港股AI——历史反复证明，在极端分化的行情中追涨的人是最受伤的。"},
        "duan": {"insight": "小米业绩出来了。我仔细看了，营收和汽车交付都超预期。好，那就没什么好犹豫的了。小米汽车交付一直在爬坡，雷军这个人做事踏实，不吹牛。我加仓了。苹果和腾讯我纹丝不动。今天还有一条有意思的消息：速卖通美国站5月GMV涨超50%——阿里在海外干得不错。我虽然不买阿里巴巴（太复杂，看不懂），但这说明中国互联网公司的海外扩张是有成果的。今天A股跌了0.91%，但京东方涨停了——200亿成交额，这说明什么？说明市场不缺钱，缺的是方向。有人问我半导体跌了要不要抄底——我说你买之前先问问自己：你能说清楚这家公司三年后赚多少钱吗？说不清楚就不要买。我只买我看得懂的：苹果、腾讯、拼多多、小米。今天又加了一个小米。", "action": "小米业绩超预期，加仓。具体操作：如果已有小米仓位，加20%；如果没有，建仓10%仓位。苹果和腾讯不动——坐稳了别瞎操作。理想汽车回购是好信号但还没到买入时机。关注今晚美国谘商会消费者信心指数——如果低于预期，美股回调就是加仓苹果的好机会。"}
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
