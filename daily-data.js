/**
 * 总结页签 - 研报版
 * 今日研报（市场概览）+ 三位达人独立观点（每条带行动建议）
 * 数据源：hot-news.json + alerts.json（每10分钟同步更新）
 */

// ===== 选择器（点击切换视图）=====
function initSlideSelector() {
    const sel = document.querySelector('.slide-selector');
    if (!sel) return;
    const opts = sel.querySelectorAll('.slide-opt');
    opts.forEach((opt) => {
        opt.addEventListener('click', () => {
            const view = opt.dataset.view;
            opts.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            window._currentView = view;
            renderView().then(() => {});
        });
    });
    window._currentView = 'today';
    renderView().then(() => {});
}

function switchToView(idx) {
    const opts = document.querySelectorAll('.slide-opt');
    if (!opts[idx]) return;
    opts.forEach(o => o.classList.remove('active'));
    opts[idx].classList.add('active');
    window._currentView = opts[idx].dataset.view;
    renderView().then(() => {});
}

// ===== 渲染视图 =====
async function renderView() {
    const el = document.getElementById('summaryContent');
    if (!el) return;
    const view = window._currentView || 'today';
    if (view === 'today') {
        await renderTodayBrief(el);
    } else {
        await renderExpertView(el, view);
    }
}
async function renderSummaryContent() { await renderView(); }

// ===== 加载数据 =====
async function loadSummaryData() {
    try {
        const [newsRes, alertsRes] = await Promise.all([
            xhrFetch('data/hot-news.json'),
            xhrFetch('data/alerts.json')
        ]);
        const hotNews = newsRes?.news || [];
        const alerts = alertsRes || null;
        const updateTime = newsRes?.updateTime || alertsRes?.updateTime || '';
        return { hotNews, alerts, updateTime };
    } catch(e) {
        return { hotNews: [], alerts: null, updateTime: '' };
    }
}

function xhrFetch(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url + '?_=' + Date.now() + Math.random(), true);
        xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        xhr.setRequestHeader('Pragma', 'no-cache');
        xhr.setRequestHeader('Expires', '0');
        xhr.timeout = 8000;
        xhr.onload = () => {
            if (xhr.status === 200) { try { resolve(JSON.parse(xhr.responseText)); } catch(e) { reject(e); } }
            else { reject(new Error('HTTP ' + xhr.status)); }
        };
        xhr.onerror = () => reject(new Error('Network error'));
        xhr.ontimeout = () => reject(new Error('Timeout'));
        xhr.send();
    });
}

// ===== 判定市场情绪 =====
function assessMarketMood(hotNews) {
    if (!hotNews || hotNews.length === 0) return { mood: '中性', icon: '➖', color: '#8e8e93' };
    const text = hotNews.map(n => n.title + (n.summary || '')).join('');
    const bullish = (text.match(/涨|升|新高|反弹|突破|利好/g) || []).length;
    const bearish = (text.match(/跌|降|新低|回落|利空|风险/g) || []).length;
    if (bullish > bearish + 2) return { mood: '偏乐观', icon: '📈', color: '#34c759' };
    if (bearish > bullish + 2) return { mood: '偏谨慎', icon: '📉', color: '#ff3b30' };
    return { mood: '震荡中性', icon: '➖', color: '#ff9500' };
}

// ===== 今日研报 =====
async function renderTodayBrief(el) {
    el.innerHTML = '<div style="text-align:center;padding:30px 0;color:#8e8e93;">⏳ 加载中...</div>';
    
    const { hotNews, alerts, updateTime } = await loadSummaryData();
    window._summaryData = { hotNews, alerts };
    
    const mood = assessMarketMood(hotNews);
    const headlines = (hotNews || []).slice(0, 5).map(h => h.title).filter(Boolean);
    const alertText = alerts ? [alerts.forex?.text, alerts.stock?.text].filter(Boolean).join(' · ') : '';
    
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    
    el.innerHTML = `
        <div class="today-header">
            <div class="th-icon">📢</div>
            <div class="th-info">
                <div class="th-title">今日研报</div>
                <div class="th-sub">${dateStr} ${updateTime ? '· ⏱ ' + updateTime : ''}</div>
            </div>
        </div>

        <div class="mood-card" style="background:${mood.color}10; border-left:3px solid ${mood.color}; border-radius:12px; padding:14px; margin-bottom:16px;">
            <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:28px;">${mood.icon}</span>
                <div>
                    <div style="font-size:15px;font-weight:600;color:${mood.color};">市场情绪：${mood.mood}</div>
                    <div style="font-size:12px;color:#8e8e93;margin-top:2px;">${alertText || '综合多维度数据分析'}</div>
                </div>
            </div>
        </div>

        <div style="font-size:13px;color:#3a3a3c;line-height:1.7;margin-bottom:16px;background:white;border-radius:12px;padding:14px;box-shadow:0 1px 2px rgba(0,0,0,0.04);">
            <div style="font-size:12px;font-weight:600;color:#8e8e93;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px;">📰 今日关注</div>
            ${headlines.length > 0 ? headlines.map(h => `<div style="padding:6px 0;border-bottom:0.5px solid rgba(60,60,67,0.08);font-size:13px;">• ${h}</div>`).join('') : '<div style="color:#aeaeb2;font-size:13px;">暂无数据</div>'}
        </div>

        <div style="font-size:12px;color:#8e8e93;margin-bottom:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">🧠 达人观点</div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px;">
            ${renderMiniExpert('templeton', '🌍', '邓普顿', '逆向投资之父', '#5856d6')}
            ${renderMiniExpert('buffett', '💰', '巴菲特', '价值投资之王', '#ff9500')}
            ${renderMiniExpert('munger', '🧠', '芒格', '多元思维大师', '#34c759')}
        </div>
        <div style="text-align:center;font-size:11px;color:#aeaeb2;">点击上方头像查看完整观点</div>
    `;
}

function renderMiniExpert(id, icon, name, subtitle, color) {
    return `
        <div class="slide-opt" style="display:flex;align-items:center;gap:12px;background:white;border-radius:12px;padding:12px 14px;box-shadow:0 1px 2px rgba(0,0,0,0.04);cursor:pointer;" onclick="switchToView(${['today','templeton','buffett','munger'].indexOf(id)})">
            <div style="width:40px;height:40px;border-radius:10px;background:${color}15;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">${icon}</div>
            <div style="flex:1;">
                <div style="font-size:14px;font-weight:600;color:${color};">${name}</div>
                <div style="font-size:11px;color:#8e8e93;">${subtitle}</div>
            </div>
            <span style="font-size:18px;color:#c7c7cc;">›</span>
        </div>
    `;
}

// ===== 达人观点生成 =====
function generateExpertViews(hotNews, alerts) {
    if (!hotNews || hotNews.length === 0) return {};
    
    const titles = hotNews.map(h => h.title + ' ' + (h.summary || ''));
    const allText = titles.join('');
    
    const hasTradeWar = /关税|贸易|制裁/.test(allText);
    const hasAI = /AI|人工智能|大模型|DeepSeek/.test(allText);
    const hasCrypto = /比特币|加密货币|BTC/.test(allText);
    const hasOil = /原油|油价|石油/.test(allText);
    const hasRate = /利率|降息|加息|美联储|央行/.test(allText);
    const hasStocks = /A股|港股|美股|沪指|恒指/.test(allText);
    const hasGeo = /地缘|中东|冲突|战争|协议/.test(allText);
    
    const topNews = hotNews[0];
    const topTitle = topNews ? topNews.title : '';
    
    const experts = {};

    experts.templeton = {
        insight: hasGeo ? `「${topTitle}」——地缘风险的缓解正在改变全球资金流向。中东溢价消退意味着能源股和避险资产短期承压，但资金释放后将寻找新的价值洼地。逆向视角：当所有人都在庆祝和平协议时，市场可能低估了协议执行的复杂性；而当恐慌退潮时，被错杀的新兴市场资产值得关注。` : hasTradeWar ? `贸易格局的每一次重构都伴随着巨大的错杀机会。当前市场对关税影响的定价可能过于线性——实际冲击往往小于预期。关注那些被贸易摩擦错杀的出口型企业，它们的估值已经反映了最坏情景，但实际业绩可能好于预期。` : hasRate ? `全球利率周期的拐点是最重要的逆向信号。当市场一致预期加息/降息路径时，真正的超额收益来自于预期差。目前市场定价可能过于拥挤，逆向投资者应该关注政策意外方向的保护。` : `今日市场情绪偏向${assessMarketMood(hotNews).mood}。逆向投资的要义是：当市场共识过于一致时，站在对立面思考。关注那些被短期情绪压低估值的优质资产，耐心等待均值回归。`,
        action: hasOil ? '原油短期承压，但中东供给风险并未完全消除。建议逢低布局能源ETF，设好止损，等待地缘溢价修复。' : hasCrypto ? '加密货币波动加剧，建议保持小仓位配置（不超过总资产5%），大跌时分批建仓，切忌追涨。' : hasStocks ? 'A股短期震荡，建议关注外资持续流入的消费和科技龙头，利用回调逐步加仓。' : '建议关注港股和新兴市场ETF的配置机会，当前估值处于历史低位区间，具备较好的安全边际。'
    };

    experts.buffett = {
        insight: hasAI ? 'AI赛道如火如荼，但真正有持久竞争优势的不是做模型的，而是拥有数据和生态的公司。当市场热捧概念时，巴菲特的做法是：买那些你已经理解并且确定十年后还会存在的生意。腾讯和茅台这样的公司不会因为DeepSeek降价而失去护城河。' : hasRate ? '利率变化会影响估值倍数，但不改变优质公司的内在价值。真正值得关注的是：这些公司是否有定价权？现金流是否稳健？管理层是否理性？满足这三条的公司在任何利率环境下都能生存并壮大。' : hasTradeWar ? '贸易摩擦短期看是风险，长期看是试金石。真正有全球竞争力的公司会通过供应链调整和技术升级来化解关税影响。每次这样的调整期，都是以合理价格买入优质资产的机会。' : hasGeo ? '地缘事件对短期市场情绪影响很大，但对优质企业内在价值的冲击往往有限。问问自己：这家公司五年后的盈利会因为今天的新闻而改变吗？如果答案是否定的，那就应该利用波动而非恐惧。' : '在不确定的市场中，现金流充裕、负债率低的消费龙头具有最高的安全边际。耐心等待合理的买入价格。',
        action: hasStocks ? 'A股当前估值处于合理区间，建议分批定投沪深300或中证500指数基金，每月固定金额，无需择时。' : hasAI ? 'AI产业链上游（算力芯片、数据中心）确定性更高，建议关注相关ETF，避免押注单一公司。' : '当前市场不确定性较高，建议增加现金比例（20-30%），等待更好的买入机会。现金不是仓位，是期权。'
    };

    experts.munger = {
        insight: '用多元思维模型拆解今日市场：「' + topTitle + '」' + (hasGeo ? '。第一层：地缘缓和利好风险资产——共识。第二层：协议执行中的波折可能被市场低估——逆向思考。第三层：如果协议落地，哪些结构性变化会被忽略？（中东重建需求、全球航运路线重置）。用三层思维避免肤浅的判断。' : hasAI ? '。第一层：AI降价利好应用端——共识。第二层：降价加速行业洗牌，小公司可能出局——逆向思考。第三层：真正受益的是那些能用AI重构成本结构的传统行业，而非AI公司本身。' : hasTradeWar ? '。第一层：关税影响出口——共识。第二层：企业会通过供应链转移对冲——思考。第三层：最大赢家可能是越南、印度等替代制造中心。关注提前布局海外产能的中国公司。' : '。第一层：今天的新闻是否真的改变了什么？第二层：市场是否过度反应？第三层：如果判断错了，最坏的情况是什么？') + '\n\n检查清单：① 我是否因为今天的新闻而情绪化交易？② 我的组合是否过度集中？③ 如果持有现金，我有没有明确的买入计划？',
        action: hasCrypto ? '比特币是情绪的放大器，不适合大多数个人投资者。如果你一定要参与，用定投策略，每次下跌5%加仓一次，总仓位不超过可投资产的3%。' : hasStocks ? '不要试图预测市场底部。更好的策略是：设定一个估值触发点（如沪指4000点以下），到了就机械执行买入计划。用规则代替情绪。' : '控制仓位比选对股票更重要。当前建议保持均衡配置：40%权益、30%债券、30%现金，等待更好的风险回报比。'
    };

    return experts;
}

// ===== 达人视图 =====
async function renderExpertView(el, expertId) {
    let data = window._summaryData;
    if (!data || !data.hotNews || data.hotNews.length === 0) {
        data = await loadSummaryData();
        window._summaryData = data;
    }
    
    const experts = generateExpertViews(data.hotNews, data.alerts);
    
    const meta = {
        templeton: { name: '邓普顿', fullName: '约翰·邓普顿', icon: '🌍', subtitle: '逆向投资之父', color: '#5856d6', 
            bio: '以逆向投资闻名，擅长在全球市场寻找被低估的资产。' },
        buffett: { name: '巴菲特', fullName: '沃伦·巴菲特', icon: '💰', subtitle: '价值投资之王', color: '#ff9500',
            bio: '价值投资典范，注重企业护城河、现金流和管理层质量。' },
        munger: { name: '芒格', fullName: '查理·芒格', icon: '🧠', subtitle: '多元思维大师', color: '#34c759',
            bio: '倡导多元思维模型，强调避免犯错比追求正确更重要。' }
    };
    
    const m = meta[expertId];
    const ex = experts[expertId];
    
    if (!ex) {
        el.innerHTML = `<div style="text-align:center;padding:40px 0;color:#8e8e93;">等待新闻更新后自动生成</div>`;
        return;
    }
    
    el.innerHTML = `
        <div class="expert-banner" style="background:${m.color}">
            <div class="eb-avatar">${m.icon}</div>
            <div class="eb-info">
                <div class="eb-name">${m.fullName}</div>
                <div class="eb-sub">${m.subtitle}</div>
            </div>
        </div>
        <div class="expert-bio" style="font-size:12px;color:#8e8e93;margin-bottom:16px;padding:0 4px;">${m.bio}</div>
        
        <div class="expert-block">
            <div class="ebl-header">📖 当日解读</div>
            <div class="ebl-body">${ex.insight.replace(/\n/g, '<br>')}</div>
        </div>
        
        <div class="expert-block" style="border-left:3px solid #ff9500;">
            <div class="ebl-header">⚡ 行动建议</div>
            <div class="ebl-body" style="color:#664d03;font-weight:500;">${ex.action}</div>
        </div>
        
        <div style="margin-top:16px;text-align:center;">
            <button onclick="switchToView(0)" style="background:none;border:none;color:#007AFF;font-size:14px;cursor:pointer;">← 返回研报</button>
        </div>
    `;
}
