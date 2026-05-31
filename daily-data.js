/**
 * 智囊团页签 - 方案A
 * 仪表盘风格：渐变情绪卡片 + 进度条 + 圆形达人选择器 + 紧凑解读
 */

let _currentExpert = 'templeton';

// ===== 内嵌数据（替代 remote fetch，避免GitHub Pages缓存问题）=====
const _EMBEDDED_DATA = {
    "updateTime": "2026-06-01 01:16",
    "mood": {
        "mood": "乐观但分化，AI驱动下的结构性牛市情绪浓厚，地缘与宏观风险隐现",
        "icon": "🚀",
        "color": "#FFD700",
        "confidence": 7,
        "dimensions": [
            {
                "label": "📈 趋势",
                "value": "美股科技股延续强势，AI概念（英伟达、苹果、美光）及老牌科技股（诺基亚、戴尔、思科）创新高，趋势向上但超买迹象明显（如美光）。"
            },
            {
                "label": "💰 资金",
                "value": "资金持续涌入AI与科技龙头，SpaceX IPO前获40亿美元订单显示一级市场热度，但石油下跌推动资金从能源转向股市，需警惕过度集中。"
            },
            {
                "label": "🌍 地缘",
                "value": "伊朗战争风险下的‘三个A’（可能指农业、能源、国防）支撑经济，但地缘不确定性对全球供应链和通胀构成潜在威胁，美联储关注稳定币扩大美元影响力。"
            },
            {
                "label": "🏭 热点",
                "value": "AI算力（英伟达）、半导体（美光、苹果）、老牌科技AI转型（诺基亚、戴尔、思科）为核心热点，SpaceX的太空经济成为新增长极。"
            },
            {
                "label": "😊 情绪",
                "value": "市场情绪高涨，散户与机构对AI未来极度乐观，但部分个股（如美光）超买引发回调担忧，董秘监管新规落地显示中国A股治理改善带来长期信心。"
            },
            {
                "label": "🏦 宏观",
                "value": "美联储官员沃勒对稳定币的表态暗示货币政策与数字资产融合趋势，伊朗局势未导致衰退，但宏观环境复杂，需关注油价波动与全球利率走向。"
            }
        ],
        "summary": "市场整体处于AI驱动的乐观情绪中，科技股创新高但存在超买风险，地缘政治和宏观不确定性并未完全消退，投资者需在追逐热点与防范回调间平衡。"
    },
    "experts": {
        "templeton": {
            "insight": "当前市场情绪极度乐观，AI和科技股估值高企，正如我在20世纪末互联网泡沫中所见。投资者应保持逆向思维，寻找被忽视的价值洼地，如老牌科技股（诺基亚、戴尔、思科）的AI转型机会，而非盲目追高英伟达和苹果。地缘风险（伊朗战争）和超买信号（美光）是警示，应分散投资于估值合理的全球资产。",
            "action": "建议减持短期涨幅过大的AI龙头，逢低布局估值较低的科技转型股及新兴市场，关注石油下跌带来的能源股机会，保持10%现金应对波动。"
        },
        "buffett": {
            "insight": "我坚持‘护城河’原则：英伟达和苹果具有强大品牌和生态，但当前价格已透支未来增长。SpaceX IPO虽令人兴奋，但缺乏长期盈利确定性，不适合普通投资者。我更关注美光等半导体公司的周期性，以及老牌科技股（如思科）在AI中的实际价值。宏观上，伊朗局势和稳定币扩张需警惕，但美国经济在‘三个A’支撑下仍具韧性。",
            "action": "持有苹果、英伟达等优质股但避免加仓，可适度买入戴尔或思科等有稳定现金流和AI转型的股票，远离SpaceX等高风险IPO，长期持有消费必需品。"
        },
        "munger": {
            "insight": "当前市场像一场‘AI狂欢’，多数人追逐热点却忽视常识。美光超买和SpaceX IPO的高估值是典型‘愚蠢钱’行为。我欣赏老牌科技股（诺基亚、戴尔、思科）的AI重生，因为它们有真实业务支撑。美联储对稳定币的表态值得深思，但地缘风险（伊朗）可能随时冲击市场。投资者应保持理性，避免被恐惧和贪婪左右。",
            "action": "建议卖出美光等超买股，持有苹果、伯克希尔等稳健标的，对SpaceX IPO保持观望，关注董秘监管新规带来的A股治理改善机会，但需耐心等待安全边际。"
        },
        "duan": {
            "insight": "我认为投资应聚焦于‘好生意、好管理、好价格’。英伟达和苹果是顶级公司，但价格已不便宜；SpaceX虽好，但IPO估值过高，对散户不友好。老牌科技股（如诺基亚、戴尔）的AI转型值得跟踪，但需确认管理层执行力。美光超买提醒我们不要追涨。宏观上，伊朗局势和稳定币是变量，但长期看好AI和科技趋势，关键在于买入时机。",
            "action": "持有苹果和英伟达底仓，不追高；等待美光回调后介入；对SpaceX IPO保持耐心，观察其长期盈利模式；可小仓位试水戴尔或思科，分批建仓。"
        }
    }
};





;
;
;
;
;
;
;
;
;
;
;
;
;









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
    const traderLensHtml = getTraderMoodLens(moodData).map(item => `
        <div class="a-trader-line">
            <span class="a-trader-label">${item.label}</span>
            <span>${item.value}</span>
        </div>
    `).join('');
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
    const radarHtml = getForwardRadarHtml();

    const quickHtml = `
        <div class="a-quick" id="expertMoodBanner">
            <div class="a-quick-head" onclick="toggleExpertMoodBanner()">
                <div>
                    <div class="a-quick-kicker">高手怎么看 · 市场情绪</div>
                    <div class="a-quick-title">现在不是牛熊二选一，是资金在挑“谁值得继续相信”</div>
                </div>
                <span class="a-quick-arrow" id="expertMoodArrow">›</span>
            </div>
            <div class="a-quick-preview">点开看交易员视角。先别急着冲，市场不缺机会，缺的是不乱动的手。</div>
            <div class="a-quick-detail" id="expertMoodDetail">
                <div class="a-quick-copy">${quickTake}</div>
                <div class="a-trader-lens">${traderLensHtml}</div>
                <div class="a-quick-note">免责声明：这里只是帮你建立市场阅读框架，不构成投资建议。真正下单前，请结合自己的现金流、风险承受力和持仓结构。</div>
            </div>
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
                    <button class="a-insights-tab" onclick="switchInsightTab('flow', this)">交易池情报</button>
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
                <div class="a-radar-intro">
                    <div class="a-radar-kicker">未来两周热钱雷达</div>
                    <div class="a-radar-copy">不罗列日历，直接告诉你：哪几件事最可能改变股市、债券、美元、A股和热钱方向。</div>
                </div>
                ${radarHtml}
            </div>
            
            <!-- 交易池情报内容 -->
            <div class="a-insights-content" id="insight-flow">
                <div class="a-radar-intro">
                    <div class="a-radar-kicker">10日事件交易模型</div>
                    <div class="a-radar-copy">先筛事件，再看标的，最后看仓位。这里不追热闹，只看事件有没有进入交易池的资格。</div>
                </div>
                <div class="a-flow-list">
                    <div class="a-flow-hint" onclick="this.style.display='none'"><span class="a-flow-hint-icon">👇</span><span class="a-flow-hint-text">点击情报卡，查看模型判断</span></div>
                    <div class="a-flow-item expanded">
                        <div class="a-flow-main" onclick="toggleFlowDetail(this)">
                            <span class="a-flow-category-title">政策类</span>
                            <span class="a-flow-name">A股公司治理新规</span>
                            <span class="a-flow-change positive">7/10</span>
                        </div>
                        <div class="a-flow-detail">
                            <div class="a-flow-explain">事件判断：监管规则落地，属于政策类有效事件，但短期更偏估值修复，不是立刻增厚利润。</div>
                            <div class="a-flow-meaning">交易池状态：进入观察池。优先看治理改善、现金流稳定、估值不高的龙头，不看纯题材小票。</div>
                            <div class="a-flow-impact">操作提示：T0-T3 只允许小仓位观察；若板块已连续大涨，不追。单一行业仓位不超过 20%。</div>
                        </div>
                    </div>
                    <div class="a-flow-item">
                        <div class="a-flow-main" onclick="toggleFlowDetail(this)">
                            <span class="a-flow-category-title">资金行为</span>
                            <span class="a-flow-name">机构抱团AI龙头</span>
                            <span class="a-flow-change positive">6/10</span>
                        </div>
                        <div class="a-flow-detail">
                            <div class="a-flow-explain">事件判断：资金仍在买确定性，但AI交易已拥挤，属于有效事件里的高波动情形。</div>
                            <div class="a-flow-meaning">交易池状态：只进监控池，不直接满仓。必须检查估值分位、5日涨幅和成交额。</div>
                            <div class="a-flow-impact">操作提示：若收益率下行且龙头放量，可分批；若连续大涨或估值分位过高，模型拒绝追高。</div>
                        </div>
                    </div>
                    <div class="a-flow-item">
                        <div class="a-flow-main" onclick="toggleFlowDetail(this)">
                            <span class="a-flow-category-title">行业供需</span>
                            <span class="a-flow-name">油价与地缘风险</span>
                            <span class="a-flow-change">5/10</span>
                        </div>
                        <div class="a-flow-detail">
                            <div class="a-flow-explain">事件判断：油价影响通胀和周期板块，但地缘消息容易反复，事件分数中等。</div>
                            <div class="a-flow-meaning">交易池状态：等待确认。只有供需数据或OPEC政策明确，才升级为有效交易事件。</div>
                            <div class="a-flow-impact">操作提示：先看原油、黄金、航空消费和能源股反应。没有成交量确认，不做重仓判断。</div>
                        </div>
                    </div>
                    <div class="a-flow-item">
                        <div class="a-flow-main" onclick="toggleFlowDetail(this)">
                            <span class="a-flow-category-title">风控底线</span>
                            <span class="a-flow-name">仓位和退出规则</span>
                            <span class="a-flow-change negative">硬规则</span>
                        </div>
                        <div class="a-flow-detail">
                            <div class="a-flow-explain">模型规则：单标的不超过 15%，权益总仓不超过 70%，永久保留 30% 现金/固收底仓。</div>
                            <div class="a-flow-meaning">退出纪律：入场后跌 8% 止损；持有满 10 个交易日，无论盈亏都重新评估并退出旧事件逻辑。</div>
                            <div class="a-flow-impact">小白翻译：这个模型不是为了猜中每次，而是为了亏的时候小亏，赚的时候吃事件窗口。</div>
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

function getTraderMoodLens(moodData) {
    return [
        {
            label: '资金情绪',
            value: '热钱仍愿意抱团强势主题，但耐心变短，涨多了就会有人先落袋。'
        },
        {
            label: '机构脑回路',
            value: '机构不是不买风险，而是更偏好“有业绩、有政策、有现金流”的风险。'
        },
        {
            label: '小白看法',
            value: '别问今天能不能冲，先问这条新闻会影响利率、盈利、政策还是情绪。只影响情绪的，仓位要轻。'
        }
    ];
}

function getForwardRadarHtml() {
    const events = [
        {
            date: '2026-06-01',
            label: '06/01',
            event: '美国ISM制造业PMI',
            region: '美国宏观',
            impact: 'high',
            result: '结论：这是本周开盘的第一张体检表，交易员会用它判断美国经济是软着陆，还是需求开始变冷。',
            watch: '强于预期：周期股、工业股可能占优，降息预期降温；弱于预期：债券可能先开心，高估值科技要看利率怎么走。',
            action: '小白看法：别只看数字高低，看市场反应。如果坏数据反而涨，说明资金在交易“降息”；如果好数据也涨，说明风险偏好还很强。'
        },
        {
            date: '2026-06-03',
            label: '06/03',
            event: '美国ISM服务业 + 美联储褐皮书',
            region: '利率预期',
            impact: 'high',
            result: '结论：服务业更接近美国经济真实温度，褐皮书会告诉市场各地区工资、消费和企业信心有没有变弱。',
            watch: '服务业强、工资粘：降息预期会被压；服务业弱、消费冷：市场会重新押注宽松。',
            action: '小白看法：这天重点看美债收益率。收益率上行，成长股估值受压；收益率下行，科技和黄金更容易被资金盯上。'
        },
        {
            date: '2026-06-05',
            label: '06/05',
            event: '美国非农就业报告',
            region: '全球核心',
            impact: 'high',
            result: '结论：这是本周最能改变热钱方向的数据。就业太强，市场担心降息推迟；就业太弱，市场又会担心经济衰退。',
            watch: '最理想剧本是“温和降温”：就业不崩、工资不热，风险资产最舒服。',
            action: '小白看法：非农当天别急着追第一根K线。交易员通常先看就业、工资、失业率三件套，再看市场是不是反应过度。'
        },
        {
            date: '2026-06-10',
            label: '06/10',
            event: '中国通胀和社融窗口期',
            region: '中国资产',
            impact: 'medium',
            result: '结论：中国资产接下来要看政策和信用有没有接力。只靠情绪反弹不够，热钱更想看到真实需求或流动性改善。',
            watch: '社融和信贷改善：A股、港股风险偏好更容易修复；通胀太弱：说明需求还要等政策加码。',
            action: '小白看法：看中国新闻时别只看“利好”两个字，要问钱有没有真的进实体、进股市、进消费。'
        },
        {
            date: '2026-06-16',
            label: '06/16-17',
            event: '美联储FOMC议息会议',
            region: '全球定价锚',
            impact: 'high',
            result: '结论：这是未来两周最大事件。真正重要的不是降不降息，而是点阵图和鲍威尔讲话会不会改变下半年利率路径。',
            watch: '偏鹰：美元和美债收益率上行，成长股承压；偏鸽：黄金、科技、港股和风险资产更容易喘口气。',
            action: '小白看法：FOMC前不要把仓位打满。交易员会等“方向确认”，普通人更要留余地。'
        }
    ];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const upcoming = events.filter(item => new Date(`${item.date}T00:00:00`) >= today).slice(0, 4);
    const visible = upcoming.length ? upcoming : events.slice(-3);

    return `<div class="a-calendar-list">${visible.map(item => `
        <div class="a-calendar-item expanded">
            <div class="a-calendar-main">
                <span class="a-calendar-date">${item.label}</span>
                <span class="a-calendar-event">${item.event}</span>
                <span class="a-calendar-region">${item.region}</span>
                <span class="a-calendar-impact ${item.impact}">${item.impact}</span>
            </div>
            <div class="a-calendar-detail">
                <div class="a-calendar-explain">${item.result}</div>
                <div class="a-calendar-watch">交易员盯什么：${item.watch}</div>
                <div class="a-calendar-impact-text">${item.action}</div>
            </div>
        </div>
    `).join('')}</div>`;
}

function toggleExpertMoodBanner() {
    const banner = document.getElementById('expertMoodBanner');
    const detail = document.getElementById('expertMoodDetail');
    const arrow = document.getElementById('expertMoodArrow');
    if (!banner || !detail || !arrow) return;

    const isOpen = banner.classList.toggle('expanded');
    detail.style.display = isOpen ? 'block' : 'none';
    arrow.style.transform = isOpen ? 'rotate(90deg)' : 'rotate(0deg)';
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
