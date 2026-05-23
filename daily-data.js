/**
 * 总结页签 - 今日推送 + 大师周评
 */

// ===== 今日推送内容 =====
const TODAY_SCHEDULE = [
    { time: '08:00', label: '🌅 早间财经', content: '美联储鸽派信号提振市场，A股高开。北向资金早盘净流入超80亿，白酒新能源领涨。重点关注下午美国CPI数据。' },
    { time: '12:00', label: '☀️ 午间财经', content: 'A股放量上涨，沪指涨1.5%重返3400点。成交额突破万亿，券商板块涨4.2%领涨。北向资金净流入超120亿。' },
    { time: '19:00', label: '🌆 晚间财经', content: '美股期货走强，市场等待晚间CPI数据。比特币站稳10.5万，欧央行暗示6月降息。明日关注3450点压力位。' },
    { time: '00:00', label: '🌙 深夜财经', content: '美股收盘上涨，标普500涨0.8%。CPI数据符合预期，降息预期不变。黄金小幅上涨至2380美元。' }
];

// ===== 大师周度观点 =====
const WEEKLY_MASTERS = {
    templeton: {
        name: "约翰·邓普顿",
        title: "全球逆向投资之父",
        icon: "🌍",
        philosophy: "行情在绝望中诞生，在犹豫中成长，在乐观中成熟，在兴奋中死亡。",
        weekly: [
            { event: "美联储降息信号", view: "全球流动性拐点已现，新兴市场将迎来估值修复窗口。A股港股被严重低估，是布局好时机。", tip: "当所有人恐慌时，正是逆向投资者入场信号。", action: "关注被低估的港股科技股和A股消费龙头。" },
            { event: "中国央行降准1万亿", view: "货币政策宽松，但要警惕'流动性陷阱'。政策底已现，但市场底需确认。", tip: "政策底不等于市场底，耐心等待估值回归。", action: "短期可参与反弹，设好止损，不要all in。" },
            { event: "日元跌破160", view: "日元贬值反映资金流向美国，但过度贬值会引发干预。日本资产可能被低估。", tip: "当一种资产被所有人抛弃时，往往最有价值。", action: "小仓位配置日本相关ETF，控制风险。" }
        ]
    },
    buffett: {
        name: "沃伦·巴菲特",
        title: "价值投资之王",
        icon: "💰",
        philosophy: "价格是你付出的，价值是你得到的。",
        weekly: [
            { event: "宁德时代固态电池", view: "新能源赛道长期看好，但短期估值偏高。技术突破需时间商业化。", tip: "好公司不等于好股票，要看价格是否合理。", action: "等股价回调30%后再考虑布局。" },
            { event: "北向资金连续净流入", view: "外资开始抄底中国资产，说明估值很有吸引力。", tip: "跟着聪明钱走，但不要盲目跟风。", action: "关注贵州茅台、宁德时代等外资重仓股。" },
            { event: "个人养老金全面推开", view: "长期资金入市是利好，但短期影响有限。", tip: "投资是长跑，不要指望一夜暴富。", action: "每月定投沪深300ETF，坚持3-5年。" }
        ]
    },
    munger: {
        name: "查理·芒格",
        title: "多元思维模型大师",
        icon: "🧠",
        philosophy: "我必须知道我将在哪里死去，这样我就永远不会去那里。",
        weekly: [
            { event: "A股放量大涨", view: "成交量放大是好现象，但要看持续性。券商暴涨可能是牛市信号，也可能是'诱多'。", tip: "涨的时候要想到跌，跌的时候要想到涨。", action: "保持冷静，连涨3天反而要警惕。" },
            { event: "比特币突破11万", view: "比特币已从'另类资产'变成'主流资产'，机构资金持续流入。", tip: "投资你理解的东西，不懂就不要碰。", action: "想配置控制在总资产5%以内。" },
            { event: "油价突破85美元", view: "能源通胀可能卷土重来，影响央行政策。传统能源股被低估。", tip: "逆向思维：当所有人追新能源时，传统能源可能是更好机会。", action: "关注中国石油、中国石化等高股息股票。" }
        ]
    }
};

// ===== 渲染总结内容 =====
function renderDailySummary() {
    const el = document.getElementById('dailyList');
    
    el.innerHTML = `
        <!-- 今日推送 -->
        <div class="schedule-section">
            <div class="section-title">📢 今日推送内容</div>
            <div class="schedule-timeline">
                ${TODAY_SCHEDULE.map(s => `
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <div class="timeline-header">
                                <span class="timeline-time">${s.time}</span>
                                <span class="timeline-label">${s.label}</span>
                            </div>
                            <div class="timeline-text">${s.content}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <!-- 本周大师观点 -->
        <div class="master-section">
            <div class="section-title">💡 本周投资大师观点</div>
            
            ${Object.entries(WEEKLY_MASTERS).map(([id, master]) => `
                <div class="master-block">
                    <div class="master-header">
                        <span class="mh-icon">${master.icon}</span>
                        <div class="mh-info">
                            <div class="mh-name">${master.name}</div>
                            <div class="mh-title">${master.title}</div>
                        </div>
                    </div>
                    <div class="master-quote">"${master.philosophy}"</div>
                    
                    <div class="weekly-views">
                        ${master.weekly.map(w => `
                            <div class="weekly-card">
                                <div class="wc-event">📌 ${w.event}</div>
                                <div class="wc-view">${w.view}</div>
                                <div class="wc-tip">💡 ${w.tip}</div>
                                <div class="wc-action">⚡ ${w.action}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}
