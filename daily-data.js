/**
 * 智囊团页签 - 方案A
 * 仪表盘风格：渐变情绪卡片 + 进度条 + 圆形达人选择器 + 紧凑解读
 */

let _currentExpert = 'templeton';

// ===== 内嵌数据（替代 remote fetch，避免GitHub Pages缓存问题）=====
const _EMBEDDED_DATA = {
    "updateTime": "2026-05-26 18:30",
    "mood": {
        "mood": "震荡偏弱",
        "icon": "\u26a0",
        "color": "#ff9500",
        "confidence": 5,
        "dimensions": [
            {"label": "📈 趋势", "value": "沪指微跌0.17%·窄幅震荡"},
            {"label": "💰 资金", "value": "港股成交清淡·恒指平收"},
            {"label": "🌍 地缘", "value": "以色列打击真主党·伊朗谴责美国违约"},
            {"label": "🏭 热点", "value": "半导体普涨·美光涨7%·游戏版号158款"},
            {"label": "😊 情绪", "value": "欧洲恐慌蔓延·BP暴跌9.3%"},
            {"label": "🏦 宏观", "value": "美30年国债收益率跌破5%"}
        ],
        "summary": "今日A股窄幅震荡（5/10），沪指收4145微跌0.17%。盘面无明确方向，市场在等待催化剂。宏观面：美国30年期国债收益率跌破5%，债市走强暗示衰退预期上升。地缘面：以色列打击黎巴嫩真主党基础设施，伊朗外交部谴责美国公然违反停火协议——中东火药桶持续升温，但市场对此逐步『脱敏』。最劲爆的消息来自欧洲：BP董事长Manifold因治理问题被董事会一致免职，股价创六年来最大单日跌幅9.3%，暴露了欧洲大公司治理结构中的深层问题。A股半导体板块情绪回暖——兆易创新连续3日涨幅超20%触发异动公告，新亚制程紧急澄清不涉及半导体业务。美股盘前半导体普涨：美光涨近7%、AMD涨近3%，科技股反弹格局延续。产业面：158款游戏版号发放（腾讯网易在列），另国家能源局在深圳召开全国『人工智能+』能源推进会，释放51个AI+能源高价值场景。AI短剧出海订单暴增，产出同比增长5倍——AI应用商业化加速落地。"
    },
    "experts": {
        "templeton": {
            "insight": "最大预期差不在A股，在欧洲。BP今天暴跌9.3%——不是因为业绩，不是因为油价，而是因为董事会把董事长开了。治理丑闻？BP说得很隐晦，『董事会就重要治理标准、监督和行为方面收到严重关切』。这不是一家小公司，FTSE 100成分股，日成交几十亿英镑。当蓝筹股出现这种级别的治理地震，市场会从『个案处理』变成『行业排查』——欧洲石油巨头们的治理溢价需要重估。另一层预期差：新亚制程紧急公告澄清『不涉及半导体』，但股价已经涨了。这说明什么？说明A股市场的华为概念饥渴症已经扩散到了荒谬的程度——只要公司名称里有『亚』、业务里有『电子』两个字，散户就敢冲。逆向操作：当市场上出现辟谣式上涨的时候，往往意味着短期情绪见顶。兆易创新3天涨20%之后老板朱一明减持了632万股——聪明钱已经在跑。",
            "action": "今天最值得关注的是美债收益率下行（30年期跌破5%）和BP暴跌的连锁反应。欧洲银行股和能源股可能被BP拖累。短期策略：做多美债期货（TLT），做空欧洲能源股（XLE的欧洲敞口）。A股方面，兆易创新减仓锁定利润——实控人减持是比任何技术分析都可靠的卖出信号。关注乌兹别克斯坦恢复黄金出口对金价的短期压制——如果金价回调3-5%，是入场时机。"
        },
        "buffett": {
            "insight": "今天没什么让我兴奋的。沪指跌0.17%，恒指跌0.03%——一整天白忙活。但我注意到了三点。第一，美光盘前涨7%。美光是存储芯片龙头，它的上涨不是因为什么花哨的AI概念，是因为供需周期的底部已经过去了——DRAM和NAND的价格在回升，这是实打实的业绩驱动。不是炒概念，是炒周期。第二，158款游戏版号发了，清华大学出版社都拿版号了？看来游戏行业监管在持续放松。腾讯网易都在列。这个信号比AI概念更值得关注——游戏版号常态化意味着腾讯最困难的时期已经过去了。第三，美国30年期国债收益率跌破5%。市场在定价经济放缓，不是定价通胀。这对价值投资有利——当债市走弱、利率下行时，高质量高股息股票会重新获得青睐。",
            "action": "今天没有新操作。腾讯和苹果继续持有。美光的上涨验证了一个道理——周期股要买在亏损时、卖在盈利时。如果你没买美光，现在不要追——存储周期的确定性已经被价格反映了一部分。更稳妥的选择是关注游戏板块：腾讯拿到新一批版号，游戏业务收入有望在下个季度超预期。如果腾讯回调到380港元以下，加仓。现金储备不低于50%，为可能的回调做准备。"
        },
        "munger": {
            "insight": "三层思维。第一层→今天A股窄幅震荡，没什么大事。BP跌了9.3%，跟A股有什么关系？第二层→BP是欧洲石油巨头，它的暴跌不是因为油价跌（布伦特还在70以上），是因为治理问题。英国石油这种级别的公司可以因为董事会不满一纸公告就把董事长开了——说明欧洲的ESG治理框架已经不只是『建议』，而是具有实际执行力的制度。这对所有跨国公司都是一种警告：你以为你在管好你的公司？下一秒董事会可能就觉得你不合格。第三层→最大的认知偏误在这里。市场看到BP暴跌，第一反应是『个案』。但你应该问：这暴露了什么系统性风险？欧洲的治理监管正在从『软约束』变成『硬约束』，管理层要面对的不只是业绩压力，还有ESG合规的达摩克利斯之剑。这对欧洲能源、金融、制造业的长期估值中枢是有影响的。A股今天有一个被忽略的信号：林州重机收到证监会立案告知书——涉嫌信息披露违法违规。一家小公司被立案，没人在意。但想想看，A股这种立案调查的频率在上升，这是监管趋严的体现。",
            "action": "今天不做任何操作——没有持仓需要变动，也没有值得买入的标的。如果你持有欧洲能源或银行股，考虑减仓1/3——BP的治理地震不会只停留在BP一家。A股持仓检查一下有没有收到立案调查的小盘股，有的话清仓。最危险的仓位组合：重仓半导体+持仓兆易创新——实控人减持了还不跑的人，赌的不是基本面，是运气。"
        },
        "duan": {
            "insight": "今天没什么大新闻。我就说说手游版号的事。158款游戏版号，腾讯网易都在里面。我看了一下名单，腾讯拿到的是一款竞技类新品，网易拿了SLG。好，游戏业务现金流稳了。我一直说腾讯不只是一家社交公司——游戏是它的现金牛，每年贡献几百亿自由现金流。版号常态化意味着这个现金牛的预期稳定了。另一个有意思的事是AI短剧出海——央视报道说产出增长5倍，海外单集收益比国内高40-50%。这个我看了半天，没看懂。AI短剧？谁在看？商业模式是什么？护城河在哪里？算了，看不懂就不碰。兆易创新实控人减持了632万股，股价还涨——这是最危险的信号。老板都在卖，散户还在买。这种股票我从来不碰——一个连老板都不信任的公司，你为什么要信任？苹果还是不动，等着看今晚美国数据。如果消费者信心指数低于预期，苹果跌5%左右我会再加仓。拼多多今天没什么消息，但不动的意思就是不动——等Q2财报。",
            "action": "腾讯加仓逻辑明确——版号常态化+回购持续+游戏业务复苏。如果腾讯今天在400港元以下，可以买2-3%仓位。苹果继续等回调，理想买点：如果今晚美国消费者信心指数低于预期导致苹果跌3-5%，加仓。兆易创新和所有华为概念股今天不碰——管理层减持是最大的负面信号。小米和拼多多耐心持有。现金仓位至少留40%，别急着满仓。"
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
