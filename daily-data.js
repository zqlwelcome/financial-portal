/**
 * 智囊团页签 - 方案A
 * 仪表盘风格：渐变情绪卡片 + 进度条 + 圆形达人选择器 + 紧凑解读
 */

let _currentExpert = 'templeton';

// ===== 内嵌数据（替代 remote fetch，避免GitHub Pages缓存问题）=====
const _EMBEDDED_DATA = {
    "updateTime": "2026-05-30 22:25",
    "mood": {
        "mood": "极度乐观且分化",
        "icon": "🚀",
        "color": "#FFD700",
        "confidence": 8,
        "dimensions": [
            {
                "label": "📈 趋势",
                "value": "AI与科技股引领强劲上升趋势，但部分个股（如美光）已超买，显示趋势可能短期过热。"
            },
            {
                "label": "💰 资金",
                "value": "资金明显流向AI、半导体及大型科技股，银行股（花旗、摩根大通）因IPO传闻受关注；能源股因油价下跌承压。"
            },
            {
                "label": "🌍 地缘",
                "value": "油价受特朗普施压及地缘谈判预期影响下跌，短期缓解通胀担忧，但中东不确定性仍存；中美科技博弈持续，但市场暂未过度反应。"
            },
            {
                "label": "🏭 热点",
                "value": "AI+概念（深演智能、微软超级应用）、半导体（英伟达、美光）、IPO（SpaceX、OpenAI）为绝对热点；能源股逆势走弱。"
            },
            {
                "label": "😊 情绪",
                "value": "市场情绪亢奋，散户和机构均积极追涨AI股，但超买信号（美光）和马斯克辟谣提示风险，情绪处于贪婪区间。"
            },
            {
                "label": "🏦 宏观",
                "value": "油价下跌利好股市，但特朗普的贸易政策威胁及通胀粘性仍是隐忧；美联储政策预期偏稳，宏观环境整体支持风险资产。"
            }
        ],
        "summary": "当前市场情绪极度乐观，AI主题成为唯一主线，资金疯狂涌入相关标的。但需警惕短期过热（如美光超买）和地缘政治波动（油价、贸易摩擦），市场分化明显：科技股狂欢，传统行业相对冷清。整体呈现‘非理性繁荣’特征，但基本面支撑较强。"
    },
    "experts": {
        "templeton": {
            "insight": "全球投资之父邓普顿会指出，当前AI热潮与上世纪90年代互联网泡沫有相似之处。深演智能三天暴涨8倍、美光超买，都是典型的‘过度乐观’信号。但他也会强调，真正的机会往往在悲观中诞生——当所有人追逐AI时，被忽视的能源股（如埃克森）因油价下跌而低估，可能孕育反弹机会。他建议在狂热中保持冷静，寻找‘最大悲观点’。",
            "action": "减持高估AI股，逐步建仓被油价恐慌打压的优质能源股，如埃克森美孚，设定15%止损。"
        },
        "buffett": {
            "insight": "巴菲特会聚焦企业内在价值。微软打造超级应用、英伟达持续增长，这些公司护城河深厚，但当前价格已透支未来数年利润。他更关注SpaceX IPO传闻——若估值合理，其太空垄断地位堪比早期可口可乐。同时，油价下跌虽冲击能源股，但埃克森等具备成本优势，长期仍具安全边际。他坚持‘别人贪婪时恐惧’，不会追高美光。",
            "action": "保持现金观望，等待AI股回调；若SpaceX IPO估值合理（低于2500亿美元），可配置5%仓位。"
        },
        "munger": {
            "insight": "芒格会直言不讳：深演智能暴涨8倍是投机者的赌场，不是投资。他警告‘AI+’概念中99%的公司将失败，只有微软、英伟达等拥有真实护城河。他欣赏巴菲特对内在价值的坚持，并指出当前市场情绪与1929年相似——过度乐观导致灾难。他建议投资者远离‘热门IPO’（如OpenAI），因为承销商花旗、摩根大通只关心费用。",
            "action": "清仓所有投机性AI小盘股，持有微软、苹果等确定性资产；拒绝参与SpaceX IPO，除非估值低于1500亿美元。"
        },
        "duan": {
            "insight": "段永平会从企业文化和商业模式出发。他看好微软的超级应用战略，因为其整合了用户刚需（编程、聊天），类似腾讯微信的生态闭环。对于英伟达，他承认其技术领先，但认为当前价格已包含未来5年增长，风险收益比不佳。他更关注苹果——作为银行首选股，其生态系统和现金流稳健，适合长期持有。他反对追逐深演智能这类‘短期暴利’。",
            "action": "继续持有苹果、微软；若SpaceX上市且估值低于2000亿美元，可小仓位买入，核心逻辑是马斯克的执行力。"
        }
    }
};




;


;










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
    const quickTake = moodData.summary || '今天市场还在整理情绪，先看重点，不急着做决定。';
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

    const quickHtml = `
        <div class="a-quick">
            <div class="a-quick-kicker">下班版一句话</div>
            <div class="a-quick-title">今天市场不是没脾气，是脾气有点复杂</div>
            <div class="a-quick-copy">${quickTake}</div>
            <div class="a-quick-note">先看方向，再看仓位。成年人已经很累了，不必每条新闻都亲自吵赢。</div>
        </div>
    `;
    
    // 情绪卡片（可折叠）
    const moodHtml = `
        <div class="a-mood" id="aMood">
            <div class="a-top" onclick="toggleMoodDetail()" style="cursor:pointer;">
                <div>
                    <div class="a-label">市场温度计</div>
                    <div class="a-mood-status">
                        <span>${moodData.icon}</span>
                        <span>${moodData.mood}</span>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                    <div class="a-score">${conf}<small>/10</small></div>
                    <span class="a-mood-arrow" id="moodArrow">›</span>
                </div>
            </div>
            <div class="a-mood-detail" id="moodDetail" style="display:none;">
                <div class="a-bars">${bars}</div>
                <div class="a-chips">${chipHtml || '<span class="a-chip">暂无数据</span>'}</div>
            </div>
        </div>
    `;
    
    // 达人按钮（可折叠）
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
    
    el.innerHTML = quickHtml + moodHtml + `
        <!-- 统一卡片：智囊团 + 市场日历 + 资金流向 + 板块轮动 -->
        <div class="a-insights">
            <div class="a-insights-tabs-wrapper">
                <div class="a-insights-tabs">
                    <button class="a-insights-tab active" onclick="switchInsightTab('braintrust', this)">高手茶话会</button>
                    <button class="a-insights-tab" onclick="switchInsightTab('calendar', this)">本周雷达</button>
                    <button class="a-insights-tab" onclick="switchInsightTab('flow', this)">钱在搬家</button>
                    <button class="a-insights-tab" onclick="switchInsightTab('sector', this)">板块热闹榜</button>
                </div>
                <div class="a-insights-hint" id="tabHint">
                    <span class="a-hint-arrow">←</span>
                    <span class="a-hint-text">左右滑动，看看别人在吵什么</span>
                    <span class="a-hint-arrow">→</span>
                </div>
            </div>
            
            <!-- 智囊团内容 -->
            <div class="a-insights-content active" id="insight-braintrust">
                <div class="a-btns">${btnsHtml}</div>
                <div id="expertContent"></div>
            </div>
            
            <!-- 市场日历内容 -->
            <div class="a-insights-content" id="insight-calendar">
                <div class="a-calendar-list">
                    <div class="a-calendar-item">
                        <div class="a-calendar-main" onclick="toggleCalendarDetail(this)">
                            <span class="a-calendar-date">05/29</span>
                            <span class="a-calendar-event">美国Q1 GDP修正值</span>
                            <span class="a-calendar-region">🇺🇸 美国</span>
                            <span class="a-calendar-impact high">high</span>
                        </div>
                        <div class="a-calendar-detail">
                            <div class="a-calendar-explain">📌 美国经济增长数据</div>
                            <div class="a-calendar-watch">👀 关注：GDP增速是否符合预期</div>
                            <div class="a-calendar-impact-text">💡 影响：好于预期→美股利好，低于预期→美股利空</div>
                        </div>
                    </div>
                    <div class="a-calendar-item">
                        <div class="a-calendar-main" onclick="toggleCalendarDetail(this)">
                            <span class="a-calendar-date">05/30</span>
                            <span class="a-calendar-event">中国5月官方PMI</span>
                            <span class="a-calendar-region">🇨🇳 中国</span>
                            <span class="a-calendar-impact high">high</span>
                        </div>
                        <div class="a-calendar-detail">
                            <div class="a-calendar-explain">📌 制造业景气度指标</div>
                            <div class="a-calendar-watch">👀 关注：PMI是否在50以上</div>
                            <div class="a-calendar-impact-text">💡 影响：PMI>50→A股利好，PMI<50→A股利空</div>
                        </div>
                    </div>
                    <div class="a-calendar-item">
                        <div class="a-calendar-main" onclick="toggleCalendarDetail(this)">
                            <span class="a-calendar-date">05/31</span>
                            <span class="a-calendar-event">美国PCE物价指数</span>
                            <span class="a-calendar-region">🇺🇸 美国</span>
                            <span class="a-calendar-impact high">high</span>
                        </div>
                        <div class="a-calendar-detail">
                            <div class="a-calendar-explain">📌 美联储最关注的通胀指标</div>
                            <div class="a-calendar-watch">👀 关注：通胀是否继续下降</div>
                            <div class="a-calendar-impact-text">💡 影响：通胀下降→降息预期升温→美股利好</div>
                        </div>
                    </div>
                    <div class="a-calendar-item">
                        <div class="a-calendar-main" onclick="toggleCalendarDetail(this)">
                            <span class="a-calendar-date">06/01</span>
                            <span class="a-calendar-event">欧洲央行利率决议</span>
                            <span class="a-calendar-region">🇪🇺 欧洲</span>
                            <span class="a-calendar-impact high">high</span>
                        </div>
                        <div class="a-calendar-detail">
                            <div class="a-calendar-explain">📌 欧洲央行是否降息</div>
                            <div class="a-calendar-watch">👀 关注：降息幅度和未来指引</div>
                            <div class="a-calendar-impact-text">💡 影响：欧洲降息→欧元贬值→美元升值</div>
                        </div>
                    </div>
                    <div class="a-calendar-item">
                        <div class="a-calendar-main" onclick="toggleCalendarDetail(this)">
                            <span class="a-calendar-date">06/02</span>
                            <span class="a-calendar-event">美国非农就业数据</span>
                            <span class="a-calendar-region">🇺🇸 美国</span>
                            <span class="a-calendar-impact high">high</span>
                        </div>
                        <div class="a-calendar-detail">
                            <div class="a-calendar-explain">📌 就业市场状况</div>
                            <div class="a-calendar-watch">👀 关注：新增就业和失业率</div>
                            <div class="a-calendar-impact-text">💡 影响：就业强劲→美联储可能推迟降息</div>
                        </div>
                    </div>
                    <div class="a-calendar-item">
                        <div class="a-calendar-main" onclick="toggleCalendarDetail(this)">
                            <span class="a-calendar-date">06/03</span>
                            <span class="a-calendar-event">OPEC+产量会议</span>
                            <span class="a-calendar-region">🌍 全球</span>
                            <span class="a-calendar-impact high">high</span>
                        </div>
                        <div class="a-calendar-detail">
                            <div class="a-calendar-explain">📌 原油产量政策</div>
                            <div class="a-calendar-watch">👀 关注：是否减产</div>
                            <div class="a-calendar-impact-text">💡 影响：减产→油价上涨→通胀压力增加</div>
                        </div>
                    </div>
                    <div class="a-calendar-item">
                        <div class="a-calendar-main" onclick="toggleCalendarDetail(this)">
                            <span class="a-calendar-date">06/04</span>
                            <span class="a-calendar-event">中国财新PMI</span>
                            <span class="a-calendar-region">🇨🇳 中国</span>
                            <span class="a-calendar-impact medium">medium</span>
                        </div>
                        <div class="a-calendar-detail">
                            <div class="a-calendar-explain">📌 中小企业景气度</div>
                            <div class="a-calendar-watch">👀 关注：与官方PMI是否一致</div>
                            <div class="a-calendar-impact-text">💡 影响：好于官方→中小企业复苏</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 资金流向内容 -->
            <div class="a-insights-content" id="insight-flow">
                <div class="a-flow-list"><div class="a-flow-hint" onclick="this.style.display='none'"><span class="a-flow-hint-icon">👇</span><span class="a-flow-hint-text">点击任意条目查看详细解读</span></div>
                </div>
            </div>
            
            <!-- 板块轮动内容 -->
            <div class="a-insights-content" id="insight-sector">
                <div class="a-sector-list">
                    <div class="a-sector-item up">
                        <div class="a-sector-main" onclick="toggleSectorDetail(this)">
                            <span class="a-sector-rank">1</span>
                            <span class="a-sector-name">电力板块</span>
                            <span class="a-sector-change">+3.2%</span>
                        </div>
                        <div class="a-sector-detail">
                            <div class="a-sector-explain">📌 电力发电、输电、配电公司</div>
                            <div class="a-sector-reason">🔍 原因：夏季用电高峰+新能源政策</div>
                            <div class="a-sector-impact">💡 参考：防御性板块，适合稳健型投资者</div>
                        </div>
                    </div>
                    <div class="a-sector-item up">
                        <div class="a-sector-main" onclick="toggleSectorDetail(this)">
                            <span class="a-sector-rank">2</span>
                            <span class="a-sector-name">白酒板块</span>
                            <span class="a-sector-change">+2.8%</span>
                        </div>
                        <div class="a-sector-detail">
                            <div class="a-sector-explain">📌 白酒酿造和销售公司</div>
                            <div class="a-sector-reason">🔍 原因：消费复苏+茅台效应</div>
                            <div class="a-sector-impact">💡 参考：高端消费品，受经济周期影响大</div>
                        </div>
                    </div>
                    <div class="a-sector-item up">
                        <div class="a-sector-main" onclick="toggleSectorDetail(this)">
                            <span class="a-sector-rank">3</span>
                            <span class="a-sector-name">超级电容</span>
                            <span class="a-sector-change">+2.1%</span>
                        </div>
                        <div class="a-sector-detail">
                            <div class="a-sector-explain">📌 超级电容器技术公司</div>
                            <div class="a-sector-reason">🔍 原因：新能源储能需求增长</div>
                            <div class="a-sector-impact">💡 参考：成长性板块，波动较大</div>
                        </div>
                    </div>
                    <div class="a-sector-item down">
                        <div class="a-sector-main" onclick="toggleSectorDetail(this)">
                            <span class="a-sector-rank">4</span>
                            <span class="a-sector-name">半导体设备</span>
                            <span class="a-sector-change">-4.5%</span>
                        </div>
                        <div class="a-sector-detail">
                            <div class="a-sector-explain">📌 芯片制造设备公司</div>
                            <div class="a-sector-reason">🔍 原因：行业周期调整+估值回归</div>
                            <div class="a-sector-impact">💡 参考：长期看好但短期可能继续调整</div>
                        </div>
                    </div>
                    <div class="a-sector-item down">
                        <div class="a-sector-main" onclick="toggleSectorDetail(this)">
                            <span class="a-sector-rank">5</span>
                            <span class="a-sector-name">算力概念</span>
                            <span class="a-sector-change">-3.8%</span>
                        </div>
                        <div class="a-sector-detail">
                            <div class="a-sector-explain">📌 AI计算能力相关公司</div>
                            <div class="a-sector-reason">🔍 原因：前期涨幅过大+获利回吐</div>
                            <div class="a-sector-impact">💡 参考：AI长期趋势不变，短期需消化估值</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
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
                <div class="a-bn">${m.name}今天怎么想</div>
            </div>
            <div class="a-card" style="border-left-color:${m.color}">
                <div class="a-card-body">${ex.insight.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="a-card a-action" style="border-left-color:${m.color}">
                <div class="a-card-label">如果非要做点什么</div>
                <div class="a-card-body" style="font-weight:500;color:#664d03;">${ex.action || '等待数据更新，先别硬操作。'}</div>
            </div>
            <div class="a-feedback">
                <span class="a-fb-label">这个判断</span>
                <button class="a-fb-btn" onclick="fbFeedback('${_currentExpert}','like')">有点东西</button>
                <button class="a-fb-btn" onclick="fbFeedback('${_currentExpert}','unlike')">先存疑</button>
            </div>
        `;
    } else {
        el.innerHTML = '<div style="text-align:center;padding:24px 0;color:var(--text2);">高手还没到场，茶先泡着。</div>';
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
    if (label) label.textContent = type === 'like' ? '已记下：有点东西' : '已记下：先存疑';
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
            { label: '💰 全球资金', value: '中性' },
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

// ===== 折叠/展开市场情绪详情 =====
function toggleMoodDetail() {
    const detail = document.getElementById('moodDetail');
    const arrow = document.getElementById('moodArrow');
    if (!detail || !arrow) return;
    
    const isHidden = detail.style.display === 'none';
    detail.style.display = isHidden ? 'block' : 'none';
    arrow.style.transform = isHidden ? 'rotate(90deg)' : 'rotate(0deg)';
    arrow.style.transition = 'transform 0.2s ease';
}

// ===== 切换洞察标签页 =====
function switchInsightTab(tabName, target) {
    // 更新标签按钮状态
    document.querySelectorAll('.a-insights-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    if (target) target.classList.add('active');
    
    // 更新内容显示
    document.querySelectorAll('.a-insights-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`insight-${tabName}`).classList.add('active');
    
    // 隐藏提示
    const hint = document.getElementById('tabHint');
    if (hint) {
        hint.style.opacity = '0';
        setTimeout(() => hint.style.display = 'none', 300);
    }
}
// ===== 市场日历点击展开/收起 =====
function toggleCalendarDetail(el) {
    const item = el.closest('.a-calendar-item');
    if (item) {
        item.classList.toggle('expanded');
    }
}

// ===== 资金流向点击展开/收起 =====
function toggleFlowDetail(el) {
    const item = el.closest('.a-flow-item');
    if (item) {
        item.classList.toggle('expanded');
    }
}

// ===== 板块轮动点击展开/收起 =====
function toggleSectorDetail(el) {
    const item = el.closest('.a-sector-item');
    if (item) {
        item.classList.toggle('expanded');
    }
}
