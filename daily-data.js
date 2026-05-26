/**
 * 智囊团页签 - 方案A
 * 仪表盘风格：渐变情绪卡片 + 进度条 + 圆形达人选择器 + 紧凑解读
 */

let _currentExpert = 'templeton';

// ===== 内嵌数据（替代 remote fetch，避免GitHub Pages缓存问题）=====
const _EMBEDDED_DATA = {
    "updateTime": "2026-05-27 07:30",
    "mood": {
        "mood": "震荡偏乐观",
        "icon": "📈",
        "color": "#34c759",
        "confidence": 6,
        "dimensions": [
            {"label": "📈 趋势", "value": "纳指+1.19%·标普500创新高"},
            {"label": "💰 资金", "value": "外资密集上调中国资产预期·高盛等看好A股"},
            {"label": "🌍 地缘", "value": "以军空袭黎巴嫩71人伤亡·伊朗称美处于请求地位"},
            {"label": "🏭 热点", "value": "存储芯片高位回落·A股高低切换·格芯遭套现大跌"},
            {"label": "😊 情绪", "value": "科技股领涨·美光市值破万亿·油价反弹近4%"},
            {"label": "🏦 宏观", "value": "新西兰联储利率决议·中国规上工业利润今日公布"}
        ],
        "summary": "5月26日收盘全球分化：纳指涨1.19%创历史新高，标普500同步刷新纪录，美光市值突破1万亿美元成为芯片新贵。但A股沪指微跌0.17%收4145点，存量博弈明显——存储芯片高位回落，大普微、朗科科技跌逾10%，高切低信号清晰。恒生科技指数自去年10月高点已跌超24%，拟纳入MiniMax-W、智谱等AI龙头改善结构，被市场解读为『港版纳指』的AI化重估。国际油价上演过山车，美伊谈判无明确进展但军事摩擦让布油反弹近4%。地缘端持续紧张：以军空袭黎巴嫩致71人伤亡，伊朗革命卫队副司令称『美国处于请求地位』；朝鲜进行新型武器系统试射，金正恩现场观摩。资金面：外资罕见一致上调中国资产预期——高盛、瑞银、大摩、小摩齐唱多，重点看好人T、先进制造、能源安全。产业面：小米MiMo大模型V2.5系列API永久降价最高99%，大模型价格战进一步升级。穆巴达拉拟套现格芯19.1亿美元致其盘后大跌。今日关注：中国1-4月规上工业企业利润、新西兰联储利率决议。"
    },
    "experts": {
        "templeton": {
            "insight": "今天的最大预期差不在A股，在两个方面。第一，恒生科技指数从去年10月高点跌了24%多，原因被归结为『AI含量偏低』——但指数马上要纳入MiniMax-W和智谱了。所有人都说这是『结构优化』，都在等左侧布局机会。但逆向思考：当一个指数因为『缺AI』跌了24%之后，把AI塞进去，就解决问题了？如果全球AI泡沫破了呢？这些刚被纳入的高估值AI公司反而会成为新的拖累。第二，穆巴达拉在格芯股价高位套现19.1亿美元——阿布扎比主权基金在卖芯片股。一级市场最聪明的钱正在从半导体高位撤退。同时，A股的存储芯片板块也在暴跌——大普微跌超10%、朗科科技跌超10%。散户还在追半导体，聪明钱已经在跑了。第三，伊朗说『美国处于请求地位』——这不是普通的外交辞令。当一个小国敢于公开说自己『有杠杆』、『不缺谈判筹码』时，中东博弈的底层逻辑可能正在发生变化。市场当前定价的是『停火预期』（油价反弹、标普涨），但忽略了伊朗的强硬姿态可能指向另一个方向。",
            "action": "恒生科技指数虽然被唱多『AI化重估』，但别急——等纳入正式生效、被动资金买完之后再考虑。短期做多纳指（QQQ）做空恒生科技（做多恒生科技ETF的对手方），利用这个结构差。格芯遭主权基金套现是重要信号——半导体短期面临供给端抛压。A股方面，存储芯片已经暴跌了，不要抢反弹，等企稳信号（至少等缩量横盘3个交易日）。黄金4536美元继续持有，关注今晚中国工业利润数据——如果低于预期，可能触发A股新一轮震荡，对冲策略买PUT。"
        },
        "buffett": {
            "insight": "标普500又创新高了，7519点。但我没有买美股，我继续持有腾讯和苹果。说三件真正重要的事。第一，外资投行——高盛、瑞银、摩根大通、摩根士丹利——集体上调了中国资产的预期。这不是某一家在喊多，是四家一起。历史上这种『全票通过』的共识，往往意味着真正的资金在流入，不是口号。第二，恒生科技指数大幅回调24%之后，要把MiniMax和智谱纳入了。这两个公司我了解得不多——MiniMax做的是大模型，智谱也是。但我看到了一个有意思的信号：一个指数跌了四分之一之后，不是等待反弹，而是换血、改结构。这比任何政策刺激都靠谱——因为这是市场自我修正，不是外力干预。第三，小米把大模型API降价99%。大模型价格战打到这个程度，意味着行业在快速洗牌。对消费者是好事，但对投资者来说——在没有看到清晰的盈利模式之前，保持谨慎。",
            "action": "今天没有什么新动作。腾讯继续持有——外资集体唱多中国资产，腾讯是绕不开的核心标的。如果今天公布的中国工业利润数据低于预期导致腾讯回调到400港元以下，加仓3%。苹果也在持有名单上——纳指创新高对苹果是正向带动。但我要提醒自己：现金储备不低于50%。标普500在7500点以上的时候，安全边际已经很小了。别看市场涨得欢，保持纪律。"
        },
        "munger": {
            "insight": "三层思维。第一层→昨天晚上美股涨了，纳指+1.19%，标普创新高。A股今天会跟吗？第二层→不一定跟。昨天A股存储芯片板块暴跌（大普微跌超10%、朗科科技跌超10%），沪指微跌0.17%。这说明中美股市的定价逻辑完全不同——美股在定价利率见顶+AI繁荣，A股在定价存量博弈+高低切换。表面上看『美股涨了利好A股』，实际上两边的交易对手盘根本不一样。第三层→最大的认知偏误在这里。都在说『恒生科技跌了24%很便宜』，都在说『纳入AI公司是利好』。但请思考：如果恒生科技跌了24%是因为全球资金从港股撤出，那么纳入几个AI公司能逆转这个趋势吗？不能。这是把一个『流动性问题』误诊为『结构问题』。真正的机会不在指数本身，而在指数成分股更换时的被动资金买卖窗口——新纳入的公司会有被动买入，被剔除的公司会有被动卖出。这不是价值发现，是机械交易。另一个被忽略的信号：朝鲜昨天进行了新型武器系统试射——多管战术巡航导弹。金正恩亲自观摩。当市场全神贯注于美伊谈判时，朝鲜半岛的导弹试验被完全忽视了。地缘风险不是只有中东。",
            "action": "今天没有任何操作。如果你真想交易恒生科技指数被纳入AI公司的机会，正确的做法是：在正式纳入公告后、生效日前买入智谱和MiniMax的相关标的（如果有），而不是买指数ETF——因为被动买入只在生效日当天发生，在此之前不存在『捡便宜』的逻辑。A股存储芯片板块的暴跌是正常调整——之前涨太多了，机构在获利了结。不要接飞刀。关注朝鲜导弹试验的后续——如果接下来一周内韩国或日本有反应，军工板块可能短线活跃。"
        },
        "duan": {
            "insight": "今天看了几件事。第一，小米把大模型MiMo的API降价了99%。好事情。雷军这个人我关注很多年了，他不是那种烧钱补贴型选手。敢降99%说明成本已经降下来了，或者找到了规模化的路径。小米造车能成，大模型也能成？不一定。但我注意到小米的降价是『永久性』的——不是限时促销，是永久降价。好，这个信号很明确：大模型正在变成基础设施，价格战是必经阶段。拼多多当年也是这么打出来的。看懂了吗？第二，恒生科技指数跌了24%多了，要纳入AI公司。腾讯在恒生科技里权重很高，跌了也没办法。但我能看懂腾讯的现金流——游戏版号常态化、回购持续、微信生态稳定。跌了24%的指数里，腾讯是被错杀最少的那个，但其他成分股就不一定了。看不懂的我不碰。第三，美光市值突破1万亿美元了，存储芯片周期反转的故事兑现了。但A股这边的存储芯片股昨天暴跌了——大普微、朗科科技跌超10%。美光涨了A股存储跌了，说明什么呢？说明A股炒的是『美光映射』的情绪，不是基本面。情绪退潮了，该跌就跌。第四，苹果还是没动，等着看数据。新西兰央行今天要议息——和我没关系。",
            "action": "腾讯继续持有，不用动。今天关注中国1-4月规模以上工业企业利润数据——如果同比增速超过5%，说明企业盈利在改善，对腾讯和拼多多都是利好。如果低于3%，港股可能短期承压。拼多多还没到Q2财报，耐心等。苹果等回调到合适的价位再动手——现在纳指创新高，苹果不是便宜的时候。小米降了大模型的价格，对小米本身是短期利好——说明AI布局在加速。但如果想买小米，建议等回调到50港元以下再考虑。现金仓位保持40%以上，别冲动。"
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
