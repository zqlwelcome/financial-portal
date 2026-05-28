/**
 * 智囊团页签 - 方案A
 * 仪表盘风格：渐变情绪卡片 + 进度条 + 圆形达人选择器 + 紧凑解读
 */

let _currentExpert = 'templeton';

// ===== 内嵌数据（替代 remote fetch，避免GitHub Pages缓存问题）=====
const _EMBEDDED_DATA = {
    "updateTime": "2026-05-28 12:45",
    "mood": {
        "mood": "谨慎偏空，但结构性机会显现",
        "icon": "😐",
        "color": "#FFA500",
        "confidence": 6,
        "dimensions": [
            {
                "label": "📈 趋势",
                "value": "恒指大跌2.29%跌破25000点，科网股领跌，短期下行压力明显，但AI和黄金板块逆势走强，市场呈现分化格局。"
            },
            {
                "label": "💰 资金",
                "value": "资金从科网股流出，转向AI、黄金及防御性板块，深演智能、智谱等AI概念股获资金追捧，显示风险偏好转移。"
            },
            {
                "label": "🌍 地缘",
                "value": "韩国央行关注通胀和加息时机，英国房价受首次购房者提振，全球地缘经济分化，亚洲市场受外部政策收紧预期压制。"
            },
            {
                "label": "🏭 热点",
                "value": "AI应用（腾讯游戏、深演智能）和黄金（天机控股、机构看多至8000美元）成为两大热点，原糖和鸡蛋期货震荡，商品分化。"
            },
            {
                "label": "😊 情绪",
                "value": "市场情绪谨慎，科网股抛售引发恐慌，但AI新股暴涨和黄金看多报告提振局部乐观情绪，整体恐慌与贪婪并存。"
            },
            {
                "label": "🏦 宏观",
                "value": "全球通胀压力持续，韩国央行暗示加息，中国国内政策宽松预期与外部紧缩博弈，港股受中美关系及流动性担忧拖累。"
            }
        ],
        "summary": "今日市场情绪偏空，恒指大跌反映科技股疲软和宏观不确定性，但AI和黄金板块逆势上涨显示结构性机会。投资者需警惕短期波动，关注政策动向和资金流向，平衡防御与成长。"
    },
    "experts": {
        "templeton": {
            "insight": "邓普顿视角：市场恐慌中孕育机会。恒指大跌是过度反应，科网股抛售提供了买入良机，尤其是腾讯游戏发布AI应用，显示长期价值。黄金长牛格局未改，但短期追高需谨慎。全球通胀和加息预期是短期噪音，应逆向布局被低估的科技和资源股。",
            "action": "建议逢低吸纳优质科网股，如腾讯，同时配置黄金ETF对冲风险，避免追涨AI新股，保持现金灵活。"
        },
        "buffett": {
            "insight": "巴菲特视角：市场情绪波动不改企业内在价值。腾讯游戏发布会展示AI创新能力，护城河深厚，短期下跌是买入机会。黄金虽被看好，但非生产性资产，不优先考虑。英国房价上涨反映经济韧性，但港股需关注基本面，智谱和深演智能估值过高，谨慎对待。",
            "action": "建议增持腾讯等现金流强劲的科技龙头，减持黄金仓位，等待科网股企稳后加仓，长期持有。"
        },
        "munger": {
            "insight": "芒格视角：市场分化凸显认知差异。科网股普跌是因估值泡沫和竞争加剧，而AI应用股暴涨反映投机情绪。黄金上涨是通胀恐慌，但长期回报有限。韩国加息信号警示流动性风险，投资者应聚焦少数可理解的高确定性机会，如腾讯的AI布局。",
            "action": "建议避免追高AI新股和黄金，关注腾讯游戏AI的实质进展，持有现金等待更佳买点，远离复杂衍生品。"
        },
        "duan": {
            "insight": "段永平视角：好生意、好管理、好价格。恒指大跌是市场短期情绪，腾讯游戏AI应用是长期赛道，值得持续关注。深演智能暴涨但估值过高，应理性评估。黄金非最优选择，鸡蛋和白糖期货波动缺乏长期逻辑。坚持投资自己熟悉的优质企业，如腾讯。",
            "action": "建议逢低买入腾讯，不参与AI新股炒作，持有现金应对波动，关注港股科技股回调后的价值机会。"
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
    
    // 情绪卡片（可折叠）
    const moodHtml = `
        <div class="a-mood" id="aMood">
            <div class="a-top" onclick="toggleMoodDetail()" style="cursor:pointer;">
                <div>
                    <div class="a-label">市场情绪</div>
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
    
    el.innerHTML = moodHtml + `
        <!-- 统一卡片：智囊团 + 市场日历 + 资金流向 + 板块轮动 -->
        <div class="a-insights">
            <div class="a-insights-tabs-wrapper">
                <div class="a-insights-tabs">
                    <button class="a-insights-tab active" onclick="switchInsightTab('braintrust')">🧠 智囊团</button>
                    <button class="a-insights-tab" onclick="switchInsightTab('calendar')">📅 日历</button>
                    <button class="a-insights-tab" onclick="switchInsightTab('flow')">💰 资金</button>
                    <button class="a-insights-tab" onclick="switchInsightTab('sector')">📈 板块</button>
                </div>
                <div class="a-insights-hint" id="tabHint">
                    <span class="a-hint-arrow">←</span>
                    <span class="a-hint-text">左右滑动查看更多</span>
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
                            <span class="a-calendar-date">05/28</span>
                            <span class="a-calendar-event">美联储5月会议纪要公布</span>
                            <span class="a-calendar-impact high">high</span>
                        </div>
                        <div class="a-calendar-detail">
                            <div class="a-calendar-explain">📌 美联储上次会议的详细记录</div>
                            <div class="a-calendar-watch">👀 关注：关注美联储对通胀和利率的态度</div>
                            <div class="a-calendar-impact-text">💡 影响：如果偏鹰派（加息），美股可能下跌；如果偏鸽派（降息），美股可能上涨</div>
                        </div>
                    </div>
                    <div class="a-calendar-item">
                        <div class="a-calendar-main" onclick="toggleCalendarDetail(this)">
                            <span class="a-calendar-date">05/29</span>
                            <span class="a-calendar-event">美国Q1 GDP修正值</span>
                            <span class="a-calendar-impact high">high</span>
                        </div>
                        <div class="a-calendar-detail">
                            <div class="a-calendar-explain">📌 美国第一季度经济增长数据的修正版</div>
                            <div class="a-calendar-watch">👀 关注：GDP增速是否符合预期</div>
                            <div class="a-calendar-impact-text">💡 影响：GDP好于预期→美股利好；低于预期→美股利空</div>
                        </div>
                    </div>
                    <div class="a-calendar-item">
                        <div class="a-calendar-main" onclick="toggleCalendarDetail(this)">
                            <span class="a-calendar-date">05/30</span>
                            <span class="a-calendar-event">中国5月官方PMI</span>
                            <span class="a-calendar-impact high">high</span>
                        </div>
                        <div class="a-calendar-detail">
                            <div class="a-calendar-explain">📌 制造业采购经理人指数，反映经济景气度</div>
                            <div class="a-calendar-watch">👀 关注：PMI是否在50以上（扩张）或以下（收缩）</div>
                            <div class="a-calendar-impact-text">💡 影响：PMI>50→A股利好；PMI<50→A股利空</div>
                        </div>
                    </div>
                    <div class="a-calendar-item">
                        <div class="a-calendar-main" onclick="toggleCalendarDetail(this)">
                            <span class="a-calendar-date">05/31</span>
                            <span class="a-calendar-event">美国4月PCE物价指数</span>
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
                            <span class="a-calendar-event">中国5月财新PMI</span>
                            <span class="a-calendar-impact high">high</span>
                        </div>
                        <div class="a-calendar-detail">
                            <div class="a-calendar-explain">📌 民间版PMI，更关注中小企业</div>
                            <div class="a-calendar-watch">👀 关注：与官方PMI是否一致</div>
                            <div class="a-calendar-impact-text">💡 影响：财新PMI好于官方→中小企业复苏→A股利好</div>
                        </div>
                    </div>
                    <div class="a-calendar-item">
                        <div class="a-calendar-main" onclick="toggleCalendarDetail(this)">
                            <span class="a-calendar-date">06/02</span>
                            <span class="a-calendar-event">美国5月非农就业数据</span>
                            <span class="a-calendar-impact high">high</span>
                        </div>
                        <div class="a-calendar-detail">
                            <div class="a-calendar-explain">📌 美国就业市场状况</div>
                            <div class="a-calendar-watch">👀 关注：新增就业人数和失业率</div>
                            <div class="a-calendar-impact-text">💡 影响：就业强劲→经济好→美联储可能推迟降息</div>
                        </div>
                    </div>
                    <div class="a-calendar-item">
                        <div class="a-calendar-main" onclick="toggleCalendarDetail(this)">
                            <span class="a-calendar-date">06/03</span>
                            <span class="a-calendar-event">欧洲央行利率决议</span>
                            <span class="a-calendar-impact high">high</span>
                        </div>
                        <div class="a-calendar-detail">
                            <div class="a-calendar-explain">📌 欧洲央行是否降息</div>
                            <div class="a-calendar-watch">👀 关注：降息幅度和未来指引</div>
                            <div class="a-calendar-impact-text">💡 影响：欧洲降息→欧元贬值→美元升值→新兴市场承压</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 资金流向内容 -->
            <div class="a-insights-content" id="insight-flow">
                <div class="a-flow-list">
                    <div class="a-flow-item">
                        <div class="a-flow-main" onclick="toggleFlowDetail(this)">
                            <span class="a-flow-name">北向资金</span>
                            <span class="a-flow-value out">-52.3亿</span>
                            <span class="a-flow-bar"><span style="width:30%"></span></span>
                        </div>
                        <div class="a-flow-detail">
                            <div class="a-flow-explain">📌 外资通过港股通买入A股的净额</div>
                            <div class="a-flow-meaning">📊 含义：负数=外资在卖，正数=外资在买</div>
                            <div class="a-flow-impact">💡 参考：北向资金被称为'聪明钱'，持续流出可能预示市场调整</div>
                        </div>
                    </div>
                    <div class="a-flow-item">
                        <div class="a-flow-main" onclick="toggleFlowDetail(this)">
                            <span class="a-flow-name">主力资金</span>
                            <span class="a-flow-value out">-128.6亿</span>
                            <span class="a-flow-bar"><span style="width:20%"></span></span>
                        </div>
                        <div class="a-flow-detail">
                            <div class="a-flow-explain">📌 大单资金（通常>50万元）的净流向</div>
                            <div class="a-flow-meaning">📊 含义：负数=机构在卖，正数=机构在买</div>
                            <div class="a-flow-impact">💡 参考：主力资金流向往往领先于股价变化</div>
                        </div>
                    </div>
                    <div class="a-flow-item">
                        <div class="a-flow-main" onclick="toggleFlowDetail(this)">
                            <span class="a-flow-name">融资余额</span>
                            <span class="a-flow-value in">+15.2亿</span>
                            <span class="a-flow-bar"><span style="width:65%"></span></span>
                        </div>
                        <div class="a-flow-detail">
                            <div class="a-flow-explain">📌 投资者借钱炒股的总规模</div>
                            <div class="a-flow-meaning">📊 含义：增加=市场杠杆上升，减少=市场杠杆下降</div>
                            <div class="a-flow-impact">💡 参考：融资余额过高可能预示市场过热</div>
                        </div>
                    </div>
                    <div class="a-flow-item">
                        <div class="a-flow-main" onclick="toggleFlowDetail(this)">
                            <span class="a-flow-name">ETF净申购</span>
                            <span class="a-flow-value in">+42.8亿</span>
                            <span class="a-flow-bar"><span style="width:75%"></span></span>
                        </div>
                        <div class="a-flow-detail">
                            <div class="a-flow-explain">📌 机构通过ETF入场的净金额</div>
                            <div class="a-flow-meaning">📊 含义：正数=机构在买入ETF，负数=机构在赎回</div>
                            <div class="a-flow-impact">💡 参考：ETF净申购通常代表机构看好市场</div>
                        </div>
                    </div>
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
                            <div class="a-sector-reason">🔍 原因：夏季用电高峰临近+新能源政策支持</div>
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
                            <div class="a-sector-reason">🔍 原因：消费复苏预期+茅台品牌效应</div>
                            <div class="a-sector-impact">💡 参考：高端消费品，受经济周期影响较大</div>
                        </div>
                    </div>
                    <div class="a-sector-item up">
                        <div class="a-sector-main" onclick="toggleSectorDetail(this)">
                            <span class="a-sector-rank">3</span>
                            <span class="a-sector-name">超级电容</span>
                            <span class="a-sector-change">+2.1%</span>
                        </div>
                        <div class="a-sector-detail">
                            <div class="a-sector-explain">📌 超级电容器相关技术公司</div>
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
                            <div class="a-sector-impact">💡 参考：AI长期趋势不变，但短期需要消化估值</div>
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
function switchInsightTab(tabName) {
    // 更新标签按钮状态
    document.querySelectorAll('.a-insights-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
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
