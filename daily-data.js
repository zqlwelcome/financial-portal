/**
 * 智囊团页签 - 方案A
 * 仪表盘风格：渐变情绪卡片 + 进度条 + 圆形达人选择器 + 紧凑解读
 */

let _currentExpert = 'templeton';

// ===== 内嵌数据（替代 remote fetch，避免GitHub Pages缓存问题）=====
const _EMBEDDED_DATA = {
    "updateTime": "2026-05-27 08:15",
    "mood": {
        "mood": "震荡偏乐观",
        "icon": "📈",
        "color": "#34c759",
        "confidence": 6,
        "dimensions": [
            {"label": "📈 趋势", "value": "纳指+1.19%·标普502创新高·上证微跌"},
            {"label": "💰 资金", "value": "外资集体唱多中国·高盛瑞银大摩小摩齐上调预期"},
            {"label": "🌍 地缘", "value": "新加坡外长访朝·美伊谈判分歧持续·伊朗称准备好有尊严协议"},
            {"label": "🏭 热点", "value": "台积电3nm下半年涨价15%·存储芯片高位回调"},
            {"label": "😊 情绪", "value": "美光市值破万亿·恒生科技跌超24%后将纳入AI公司"},
            {"label": "🏦 宏观", "value": "新西兰联储利率决议·中国规上工业利润今日出炉"}
        ],
        "summary": "5月26日全球市场分化明显：纳指涨1.19%创历史新高，标普500同步刷新至7519点，美光市值突破1万亿美元（收涨19.3%，2011年以来最大单日涨幅）。但A股沪指微跌0.17%收4145点，存量博弈加剧——存储芯片高位回落，大普微、朗科科技跌逾10%，高切低信号明确。恒生科技指数自去年10月高点累计跌幅超24%，分析认为AI含量偏低是关键原因；MiniMax-W、智谱等AI龙头即将被纳入，市场预期指数结构将迎来制度性修正。资金面：高盛、瑞银、摩根士丹利、摩根大通罕见一致上调中国资产预期，重点看好人T、先进制造、能源安全方向。产业面：台积电下半年3nm报价上调15%，先进制程产能持续满载；小米MiMo大模型V2.5永久降价后，大模型价格战格局深化。地缘面：新加坡外长时隔8年首次访朝；伊朗总统称已准备好达成有尊严的框架协议，但美伊谈判核心分歧（解冻海外资金）仍未解决。今日关注：中国1-4月规上工业企业利润、新西兰联储利率决议、日本央行行长植田和男讲话。"
    },
    "experts": {
        "templeton": {
            "insight": "今天最大的预期差在哪里？不在美光，不在纳指创新高。第一，恒生科技指数跌了24%多，所有人都在说『因为AI含量低』，所以纳入几家AI公司就能解决。但逆向思考——如果恒生科技跌24%的真正原因是全球资金从港股系统性撤离（流动性问题），那塞进去几个AI公司不过是『换药不换汤』。被动资金买入只在生效日当天发生一次，之后呢？第二，美光市值破万亿了，台积电3nm下半年还要涨15%——半导体沸腾了。但A股的存储芯片在暴跌，大普微和朗科科技单日跌超10%。同一个行业，美股涨A股跌，说明A股之前炒的是『美光映射』的情绪溢价，现在溢价在消退。情绪退潮的速度往往比大多数人想象得快。第三，新加坡外长时隔8年访朝——这是今天最被忽略的事件。在中美博弈的大背景下，新加坡作为第三方小国主动恢复与朝鲜的外交接触，可能预示着半岛局势的新变量。而市场完全没注意到这一点，因为大家都在看美伊谈判和美光市值。",
            "action": "恒生科技指数短期不碰——等MiniMax-W和智谱正式纳入、被动资金买完、再观察一个月看指数能否企稳。如果企稳了，左侧布局恒生科技ETF（3067.HK）。A股存储芯片——跌停不要接，等缩量横盘至少3个交易日。台积电涨价对A股半导体设备/材料公司是利好（国产替代逻辑加强），关注北方华创、中微公司的回调低吸机会。黄金4536美元附近持有不动。今天关注中国工业利润数据：如果低于预期，上证可能破4100，届时用50ETF PUT对冲。"
        },
        "buffett": {
            "insight": "标普500到7519点了，又创新高。但让我兴奋的不是指数点位，是两件事。第一，高盛、瑞银、摩根大通、摩根士丹利——四家顶级投行在同一时间点上调了中国资产预期。这不是某家机构的独立判断，这是一种罕见的共识。历史上四家同时转向的时候，往往意味着真正的资金在跨境流入，而不是嘴上说说。第二，农业银行昨天被平安资产管理增持了7710万股，每股6.05港元。同样是保险资金，同样在买银行。但别忘了，一个月前平安还在增持工商银行和建设银行。险资用真金白银在表达一个态度：银行股的股息率足够高，高到值得逆势加仓。另外，福莱特玻璃主席阮洪良增持375万股——内部人增持永远是比任何卖方研报都可靠的信号。光伏玻璃行业经历了痛苦的产能过剩周期，当管理层开始用自己的钱回购时，行业底部很可能就在附近。美光涨了19%跟我没关系——我买的是苹果和腾讯，不是周期股。好企业 + 好价格 + 持有，这就是我全部的策略。",
            "action": "腾讯继续持有——外资集体唱多中国资产，腾讯作为中国互联网的『核心资产』是绕不开的选择。如果今天公布的工业利润数据低于预期，腾讯回调到400港元以下，加仓3%。苹果也在持仓中——纳指创新高对苹果是正向带动，但苹果本身估值并不便宜（PE约30倍），暂时不加仓。A股方面，农业银行被平安增持值得关注——银行板块近期回调到阶段性低点，四大行的股息率超过6%，比理财产品香太多。但我不建议追求短期价差，如果持有银行股，就当作长期收息资产。现金仓位保持50%以上，标普7500点以上安全边际已经很小了。"
        },
        "munger": {
            "insight": "三层思维。第一层→昨夜美股涨了，纳指+1.19%，标普创新高，美光+19.3%市值破万亿。A股今天会跟吗？第二层→不一定。昨天A股存储芯片板块暴跌（大普微、朗科科技跌超10%），沪指微跌0.17%。中美股市的定价逻辑完全不同——美股定价的是AI繁荣 + 利率见顶预期，A股定价的是存量博弈 + 高切低。第三层→这里有三个认知偏误值得警惕。偏误一：『恒生科技跌了24%所以便宜』——这是锚定效应。指数跌了24%不等于它值了，如果全球资金从港股撤离的趋势没有改变，纳入几家AI公司不会改变这一趋势。偏误二：『美光市值破万亿 → A股存储芯片该涨』——这是错误的因果推断。美光涨是因为它自己的周期反转兑现了盈利改善，而A股存储芯片之前涨是因为『美光映射』的炒作情绪，两者驱动因素不同。偏误三：『大家都在说外资唱多中国』——高盛、瑞银确实在喊多，但细心看研报原文，外资的看多是有条件的：工业利润数据改善、房地产企稳。如果今天公布的规上工业利润数据不及预期，这些『唱多』的声音会迅速消失。好消息是新加坡外长访朝了——外交接触总是比军事对峙好。但我要提醒自己：当所有人都在关注美伊谈判时，朝鲜半岛的变量被完全忽视了。",
            "action": "今天不操作。恒生科技指数的『AI纳入』故事听起来很美，但请不要在生效日之前买入指数ETF——被动资金只在生效日当天一次性买入，在此之前不存在『提前布局』的逻辑。如果有人一定要交易这个事件，正确做法是：等正式公告后，关注被纳入个股（MiniMax-W、智谱相关标的）在生效日前几天的价格异动，而非指数本身。A股存储芯片暴跌是前期涨幅过大的正常回调，不要接飞刀。今天关注两个数据：一是中国1-4月规上工业利润（决定短期A股方向），二是新西兰联储利率决议（影响亚太资金流向）。如果工业利润同比增速低于3%，上证可能回踩4100以下，届时对整体市场保持谨慎。"
        },
        "duan": {
            "insight": "今天看了几件事。第一，台积电3nm下半年要涨价15%，明年还要涨。这个我看得懂——3nm产能满载，AI芯片、手机芯片都在抢，供需摆在那里。台积电的议价能力就是技术壁垒。美光市值破万亿了，收涨19.3%，存储周期反转的故事兑现了。但A股的存储芯片昨天暴跌了——大普微、朗科科技跌超10%。好，这就有意思了。美光是真的赚钱了，A股存储之前炒的是『跟风』的情绪。情绪退了就该跌，没什么好说的。看不懂的我不碰。第二，农业银行被平安增持7710万股。银行股我一般不碰——因为看不懂坏账率和利率走势。但如果平安这种专业机构在逆势加仓，说明银行股的股息率已经高到了吸引长线资金的程度。第三，小米大模型降价99%之后，现在台积电又涨价——做AI模型的成本在涨，但小米敢永久降价，说明它的成本结构确实优化了。这个节奏我喜欢——先规模化，再降价，再抢份额。拼多多当年也是这么干的。第四，恒生科技指数跌多了要纳入AI公司。腾讯在里面，权重高，短期没办法。但腾讯的基本面没变——游戏版号正常发、微信生态稳、回购不停。跌了我不怕，怕的是公司不行。腾讯行不行？行。那就够了。苹果继续等——纳指创新高对苹果不是坏事，但价格不算便宜，等回调。",
            "action": "腾讯继续持有不动。如果今天工业利润数据好（同比超5%），腾讯可能跟着反弹，但我不会加仓——之前说好的仓位已经够了。数据差的话腾讯可能跌到400以下，这才是加仓的机会，而不是涨了追。拼多多等Q2财报，耐心。小米降了大模型价格是好事，说明AI布局在加速，但50港元以上我不会买，等回调。苹果继续观望。农产品（猪肉、粮食安全相关的ETF）可以关注——英国创高温纪录、全球极端天气频发，农产品供给端可能出问题。现金仓位保持40%以上，别冲动。今天新西兰央行议息——和我没关系。"
        }
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
