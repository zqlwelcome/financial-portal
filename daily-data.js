/**
 * 智囊团页签 - 方案A
 * 仪表盘风格：渐变情绪卡片 + 进度条 + 圆形达人选择器 + 紧凑解读
 */

let _currentExpert = 'templeton';

// ===== 内嵌数据（替代 remote fetch，避免GitHub Pages缓存问题）=====
const _EMBEDDED_DATA = {
    "updateTime": "2026-05-28 00:11",
    "mood": {
        "mood": "谨慎乐观，结构性分化明显",
        "icon": "🧐",
        "color": "#FFD700",
        "confidence": 7,
        "dimensions": [
            {
                "label": "📈 趋势",
                "value": "美股涨跌互现，纳指微跌，道指上涨，显示科技股与周期股分化。油价下跌利好航空及运输板块，但地缘风险仍存。富时罗素规则调整为超大盘新股铺路，长期趋势向好。"
            },
            {
                "label": "💰 资金",
                "value": "资金从高估值科技股流向能源、工业及价值股。摩根大通计划大规模收购，显示金融巨头利用充裕资金进行战略布局。AI和医疗健康领域吸引风投资金，如Signos融资2000万美元。"
            },
            {
                "label": "🌍 地缘",
                "value": "美伊和平协议进展消息导致油价下跌，但双方表态矛盾，不确定性犹存。地缘政治风险仍是影响能源价格和全球市场情绪的关键变量。"
            },
            {
                "label": "🏭 热点",
                "value": "AI应用（亚马逊零售、Tempus医疗）和健康减重（Signos）是当前热点。工业拍卖（里奇兄弟成交1.75亿加元）显示实体经济活跃。航空业需求强劲，对冲燃油成本压力。"
            },
            {
                "label": "😊 情绪",
                "value": "市场情绪整体偏乐观，但存在分歧。投资者对降息预期和地缘缓和抱有希望，但对高估值科技股和通胀黏性保持警惕。被动投资规则修改增强了对新经济龙头的乐观情绪。"
            },
            {
                "label": "🏦 宏观",
                "value": "油价下跌缓解通胀压力，利好美联储政策转向。美国航空业维持盈利预期，显示消费韧性。摩根大通大规模收购计划反映金融巨头对经济软着陆的信心。"
            }
        ],
        "summary": "今日市场情绪呈谨慎乐观状态，结构性分化明显。油价下跌和潜在的地缘缓和是积极信号，但科技股回调显示资金在轮动。被动投资规则修改为未来注入新动力，AI与健康领域持续获得资本青睐。整体而言，市场在寻找新的平衡点，机会与风险并存。"
    },
    "experts": {
        "templeton": {
            "insight": "当前市场情绪在乐观与谨慎间摇摆，这正是逆向布局的良机。油价下跌源于对和平的期望，但若协议破裂，能源股将反弹。富时罗素为SpaceX等新股铺路，大众追逐热门IPO时，应警惕估值泡沫。相反，被忽视的工业拍卖（里奇兄弟1.75亿加元成交）和医疗基础设施（Humana投资8300万美元）显示实体经济韧性，价值洼地往往隐藏于此。",
            "action": "建议减持短期涨幅过大的科技IPO概念股，关注被市场忽视的工业、医疗基础设施板块。在油价下跌时，可小仓布局优质能源股，以对冲地缘风险反转。"
        },
        "buffett": {
            "insight": "今天新闻中，摩根大通准备200亿美元收购、美国航空维持盈利、亚马逊向零售商开放AI技术，这些体现了优秀企业的护城河与持续竞争力。油价下跌对航空是利好，但航空业资本密集、竞争激烈，并非理想的长持标的。我更关注Humana和Tempus在医疗领域的深耕，它们通过AI和基础设施提升效率，拥有长期确定性。富时罗素规则改变让被动资金涌入新股，但好生意需要合理价格。",
            "action": "保持耐心，聚焦于拥有持久竞争优势和稳定现金流的公司。可关注AI赋能传统医疗（如Tempus）和健康管理（如Signos）领域的龙头企业，等待合理估值时介入。"
        },
        "munger": {
            "insight": "人们总是高估短期变化，低估长期趋势。油价因和平消息波动，但能源格局的转变需要数年。富时罗素为新股铺路，但SpaceX尚未盈利，投资它需要信仰而非理性。摩根大通戴蒙说准备花200亿收购，这很聪明，但99%的收购是愚蠢的。我更喜欢里奇兄弟拍卖1.75亿加元这种实实在在的生意，以及Humana投资8300万美元的邮件配送中心——简单、可理解、有复利。",
            "action": "避免追逐热点和复杂的IPO。坚持投资于业务简单、现金流充沛、管理层理性的公司。可关注工业拍卖平台和医疗基础设施领域的龙头企业。"
        },
        "duan": {
            "insight": "今天新闻亮点很多。亚马逊开放AI购物技术给其他零售商，这是典型的“卖水人”逻辑，AWS的AI服务前景广阔。Signos借助GLP-1热潮做AI血糖监测，方向正确，但竞争激烈。美国航空说需求强劲，这验证了消费韧性。油价下跌是短期扰动，长期看能源价格会回归供需。富时罗素规则修改对SpaceX是好事，但好公司也要好价格。投资最重要的是做对的事，并把事做对。",
            "action": "重点关注亚马逊（AWS的AI能力）和Tempus（AI医疗）这类有深厚技术壁垒的公司。对于航空和能源股，可在行业低迷时逐步建仓，但需控制仓位。"
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
