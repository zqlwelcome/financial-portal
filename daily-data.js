/**
 * 智囊团页签 - 方案A
 * 仪表盘风格：渐变情绪卡片 + 进度条 + 圆形达人选择器 + 紧凑解读
 */

let _currentExpert = 'templeton';

// ===== 内嵌数据（替代 remote fetch，避免GitHub Pages缓存问题）=====
const _EMBEDDED_DATA = {
    "updateTime": "2026-05-27 23:06",
    "mood": {
        "mood": "极度分化与避险主导",
        "icon": "😰",
        "color": "#FF4500",
        "confidence": 8,
        "dimensions": [
            {
                "label": "📈 趋势",
                "value": "全球股市严重分化：美股创新高，A股、港股齐跌，韩国股市异动领涨，显示资金从新兴市场（除韩国外）流向美股避险。"
            },
            {
                "label": "💰 资金",
                "value": "资金明显避险：美元走强、人民币贬值、黄金创新高，资金涌入美元资产和贵金属。A股内部资金从半导体等成长板块大幅流出，转向电力、白酒等防御性板块。"
            },
            {
                "label": "🌍 地缘",
                "value": "地缘风险加剧市场不确定性，推升避险需求。人民币承压可能反映对中美关系及全球贸易的担忧，韩国股市的异常涨幅需警惕是否为资本泡沫或政策驱动。"
            },
            {
                "label": "🏭 热点",
                "value": "结构性行情极端：半导体遭重挫，白酒、电力逆势走强。小米巨额回购提振信心，但未能改变整体颓势。韩国股市领涨是今日最异常的热点。"
            },
            {
                "label": "😊 情绪",
                "value": "市场情绪悲观且脆弱。A股破位下行，港股低迷，投资者信心不足。但黄金暴涨和电力股涨停体现出极端的防御和抱团心态。"
            },
            {
                "label": "🏦 宏观",
                "value": "宏观环境复杂：美元强势周期压制非美资产，人民币贬值压力增大。全球通胀预期与衰退担忧并存，促使资金寻求确定性。韩国股市的暴涨可能与其特定宏观政策或产业优势有关。"
            }
        ],
        "summary": "今日市场呈现典型的“冰火两重天”格局，全球避险情绪浓厚。A股与港股承压下行，而美股与黄金则成为资金避风港。市场内部结构严重分化，成长股遭抛弃，防御性板块受追捧。投资者需警惕宏观不确定性带来的系统性风险，同时关注结构性机会，特别是资金涌入的电力、黄金及逆势表现的白酒板块。韩国股市的异军突起是值得深入研究的重要信号。"
    },
    "experts": {
        "templeton": {
            "insight": "邓普顿爵士会在今日看到最大的机会。A股和港股的下跌正是其“极度悲观点”理论的完美体现。当所有人因恐慌抛售半导体时，他反而会开始研究拓荆科技等暴跌股的基本面，寻找被错杀的优质公司。同时，韩国股市的暴涨令他警惕，他会认为那里已经充满泡沫。黄金创新高则意味着避险情绪已达顶峰，这正是逆向买入风险资产（如超跌的A股）的信号。他会关注人民币贬值带来的出口型企业机会。",
            "action": "建议：逆向布局。在A股恐慌性下跌中，分批买入被错杀的半导体龙头和港股优质科技股。卖出已暴涨的韩国股票和黄金，兑现利润。"
        },
        "buffett": {
            "insight": "巴菲特会保持冷静，专注于企业内在价值。贵州茅台的逆势上涨符合他的逻辑：拥有强大护城河和稳定现金流的消费垄断企业。电力股的涨停也因公用事业具备稳定的回报预期。他不会关注股市的短期波动，而是会审视小米200亿回购的合理性——如果股价低于内在价值，回购是明智之举。对于黄金创新高，他会坚持自己的观点：黄金不产生价值，不如投资好生意。他会对韩国股市的涨幅持怀疑态度。",
            "action": "建议：持有并增持优质企业。继续加仓贵州茅台等消费龙头，关注电力股的分红潜力。无视黄金和韩国股市的短期狂热，保持耐心。"
        },
        "munger": {
            "insight": "芒格会强调“反过来想”。他会指出，半导体板块的重挫和A股的下跌，恰恰是市场在惩罚那些追逐热点、缺乏真正竞争优势的公司。他赞赏小米的回购计划，认为这是管理层在股价低迷时对股东负责的表现。对于韩国股市的惊人涨幅，他会认为这是典型的“愚蠢的钱”推动的投机，不可持续。他主张避免复杂和难以理解的投资，电力股因其商业模式简单、现金流稳定，反而值得关注。",
            "action": "建议：远离泡沫，拥抱简单。不要碰韩国股市。在A股恐慌中，只增持商业模式简单、护城河宽的股票，如茅台和电力股。对半导体保持观望。"
        },
        "duan": {
            "insight": "段永平会从“做对的事情”出发。他会看好小米200亿回购，认为这是公司在股价低估时，用真金白银为股东创造价值，是“本分”的表现。他会认为A股和港股的大跌是市场情绪的错误定价，正是买入好公司的时机。他会关注茅台，认为其品牌价值无可替代，下跌就是买入机会。对于黄金，他会认为这不是他的能力圈，不会参与。他会对韩国股市的暴涨保持警惕，不眼红不属于自己的机会。",
            "action": "建议：敢为天下后。在A股和港股低迷时，买入像小米、茅台这样自己看得懂的好公司。忽略黄金和韩国股市的诱惑。坚持做对的事情，等待市场回归理性。"
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
                        <span class="a-calendar-date">05/28</span>
                        <span class="a-calendar-event">美联储5月会议纪要公布</span>
                        <span class="a-calendar-impact high">high</span>
                    </div>
                    <div class="a-calendar-item">
                        <span class="a-calendar-date">05/29</span>
                        <span class="a-calendar-event">美国Q1 GDP修正值</span>
                        <span class="a-calendar-impact high">high</span>
                    </div>
                    <div class="a-calendar-item">
                        <span class="a-calendar-date">05/30</span>
                        <span class="a-calendar-event">中国5月官方PMI</span>
                        <span class="a-calendar-impact high">high</span>
                    </div>
                    <div class="a-calendar-item">
                        <span class="a-calendar-date">05/31</span>
                        <span class="a-calendar-event">美国4月PCE物价指数</span>
                        <span class="a-calendar-impact high">high</span>
                    </div>
                    <div class="a-calendar-item">
                        <span class="a-calendar-date">06/01</span>
                        <span class="a-calendar-event">中国5月财新PMI</span>
                        <span class="a-calendar-impact high">high</span>
                    </div>
                    <div class="a-calendar-item">
                        <span class="a-calendar-date">06/02</span>
                        <span class="a-calendar-event">美国5月非农就业数据</span>
                        <span class="a-calendar-impact high">high</span>
                    </div>
                    <div class="a-calendar-item">
                        <span class="a-calendar-date">06/03</span>
                        <span class="a-calendar-event">欧洲央行利率决议</span>
                        <span class="a-calendar-impact high">high</span>
                    </div>
                </div>
            </div>
            
            <!-- 资金流向内容 -->
            <div class="a-insights-content" id="insight-flow">
                <div class="a-flow-list">
                    <div class="a-flow-item">
                        <span class="a-flow-name">北向资金</span>
                        <span class="a-flow-value out">-52.3亿</span>
                        <span class="a-flow-bar"><span style="width:30%"></span></span>
                    </div>
                    <div class="a-flow-item">
                        <span class="a-flow-name">主力资金</span>
                        <span class="a-flow-value out">-128.6亿</span>
                        <span class="a-flow-bar"><span style="width:20%"></span></span>
                    </div>
                    <div class="a-flow-item">
                        <span class="a-flow-name">融资余额</span>
                        <span class="a-flow-value in">+15.2亿</span>
                        <span class="a-flow-bar"><span style="width:65%"></span></span>
                    </div>
                    <div class="a-flow-item">
                        <span class="a-flow-name">ETF净申购</span>
                        <span class="a-flow-value in">+42.8亿</span>
                        <span class="a-flow-bar"><span style="width:75%"></span></span>
                    </div>
                </div>
            </div>
            
            <!-- 板块轮动内容 -->
            <div class="a-insights-content" id="insight-sector">
                <div class="a-sector-list">
                    <div class="a-sector-item up">
                        <span class="a-sector-rank">1</span>
                        <span class="a-sector-name">电力板块</span>
                        <span class="a-sector-change">+3.2%</span>
                    </div>
                    <div class="a-sector-item up">
                        <span class="a-sector-rank">2</span>
                        <span class="a-sector-name">白酒板块</span>
                        <span class="a-sector-change">+2.8%</span>
                    </div>
                    <div class="a-sector-item up">
                        <span class="a-sector-rank">3</span>
                        <span class="a-sector-name">超级电容</span>
                        <span class="a-sector-change">+2.1%</span>
                    </div>
                    <div class="a-sector-item down">
                        <span class="a-sector-rank">4</span>
                        <span class="a-sector-name">半导体设备</span>
                        <span class="a-sector-change">-4.5%</span>
                    </div>
                    <div class="a-sector-item down">
                        <span class="a-sector-rank">5</span>
                        <span class="a-sector-name">算力概念</span>
                        <span class="a-sector-change">-3.8%</span>
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