/**
 * 投资大师观点 - 基于近期事件
 */

// ===== 三位大师观点数据 =====
const MASTER_VIEWS = {
    templeton: {
        name: "约翰·邓普顿",
        title: "全球逆向投资之父",
        icon: "🌍",
        philosophy: "行情在绝望中诞生，在犹豫中成长，在乐观中成熟，在兴奋中死亡。",
        recentViews: [
            {
                event: "美联储释放降息信号",
                macro: "全球流动性拐点已现。历史经验表明，美联储降息周期初期，新兴市场往往有超额收益。",
                micro: "A股和港股估值处于历史低位，是布局优质中国资产的好时机。",
                tip: "当所有人都在恐慌时，正是逆向投资者入场的信号。",
                action: "建议关注被严重低估的港股科技股和A股消费龙头。"
            },
            {
                event: "中国央行降准释放1万亿",
                macro: "货币政策持续宽松，但要警惕'流动性陷阱'——钱多了但企业不愿投资。",
                micro: "降准利好银行和地产，但要看持续性，不要追高。",
                tip: "政策底不等于市场底，耐心等待估值回归。",
                action: "短期可参与反弹，但要设好止损，不要all in。"
            },
            {
                event: "日元汇率跌破160",
                macro: "日元贬值反映全球资金流向美国，但过度贬值会引发干预。",
                micro: "日本资产可能被低估，关注日经指数和日本房地产REITs。",
                tip: "当一种资产被所有人抛弃时，往往是最有价值的时候。",
                action: "可以小仓位配置日本相关ETF，但要控制风险。"
            }
        ]
    },
    buffett: {
        name: "沃伦·巴菲特",
        title: "价值投资之王",
        icon: "💰",
        philosophy: "价格是你付出的，价值是你得到的。在别人恐惧时贪婪，在别人贪婪时恐惧。",
        recentViews: [
            {
                event: "宁德时代发布固态电池",
                macro: "新能源赛道长期看好，但短期估值偏高。技术突破需要时间商业化。",
                micro: "固态电池是颠覆性技术，但2027年才量产，现在追高风险大。",
                tip: "好公司不等于好股票，要看价格是否合理。",
                action: "等股价回调30%后再考虑布局，关注现金流稳定的传统能源股。"
            },
            {
                event: "北向资金连续3日净流入",
                macro: "外资开始抄底中国资产，说明估值已经很有吸引力。",
                micro: "外资重点买白酒和新能源，这些是他们的'能力圈'。",
                tip: "跟着聪明钱走，但不要盲目跟风。",
                action: "关注贵州茅台、宁德时代等外资重仓股，但要等回调。"
            },
            {
                event: "个人养老金制度全面推开",
                macro: "长期资金入市是利好，但短期影响有限。",
                micro: "新增REITs和指数基金，给普通人更多选择。",
                tip: "投资是长跑，不要指望一夜暴富。",
                action: "每月定投沪深300ETF，坚持3-5年。"
            }
        ]
    },
    munger: {
        name: "查理·芒格",
        title: "多元思维模型大师",
        icon: "🧠",
        philosophy: "我必须知道我将在哪里死去，这样我就永远不会去那里。",
        recentViews: [
            {
                event: "A股放量大涨 成交额破万亿",
                macro: "成交量放大是好现象，但要看持续性。单日放量不代表趋势。",
                micro: "券商股暴涨通常是牛市信号，但也可能是'诱多'。",
                tip: "涨的时候要想到跌，跌的时候要想到涨。",
                action: "保持冷静，不要被市场情绪左右。如果连涨3天，反而要警惕。"
            },
            {
                event: "比特币突破11万美元",
                macro: "比特币已经从'另类资产'变成'主流资产'，机构资金持续流入。",
                micro: "ETF资金流入说明华尔街认可了比特币的价值。",
                tip: "投资你理解的东西。如果不懂比特币，就不要碰。",
                action: "如果想配置，控制在总资产的5%以内，做好归零的准备。"
            },
            {
                event: "国际油价突破85美元",
                macro: "能源通胀可能卷土重来，影响央行政策。",
                micro: "传统能源股被低估，但长期看会被新能源替代。",
                tip: "逆向思维：当所有人都在追新能源时，传统能源可能是更好的机会。",
                action: "关注中国石油、中国石化等高股息股票，吃分红。"
            }
        ]
    }
};

// ===== 渲染大师观点 =====
function renderMasterViews() {
    const el = document.getElementById('dailyList');
    
    el.innerHTML = `
        <div class="master-tabs">
            <button class="master-tab active" onclick="switchMaster('templeton')">🌍 邓普顿</button>
            <button class="master-tab" onclick="switchMaster('buffett')">💰 巴菲特</button>
            <button class="master-tab" onclick="switchMaster('munger')">🧠 芒格</button>
        </div>
        <div id="masterContent"></div>
    `;
    
    switchMaster('templeton');
}

function switchMaster(masterId) {
    // 更新标签状态
    document.querySelectorAll('.master-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const master = MASTER_VIEWS[masterId];
    const el = document.getElementById('masterContent');
    
    el.innerHTML = `
        <div class="master-header">
            <div class="master-icon">${master.icon}</div>
            <div class="master-info">
                <div class="master-name">${master.name}</div>
                <div class="master-title">${master.title}</div>
            </div>
        </div>
        <div class="master-quote">"${master.philosophy}"</div>
        <div class="master-views">
            ${master.recentViews.map(view => `
                <div class="view-card">
                    <div class="view-event">📌 ${view.event}</div>
                    <div class="view-section">
                        <div class="view-label">🌍 宏观视角</div>
                        <div class="view-text">${view.macro}</div>
                    </div>
                    <div class="view-section">
                        <div class="view-label">🔍 微观视角</div>
                        <div class="view-text">${view.micro}</div>
                    </div>
                    <div class="view-tip">
                        <span class="tip-icon">💡</span>
                        <span class="tip-text">${view.tip}</span>
                    </div>
                    <div class="view-action">
                        <span class="action-icon">⚡</span>
                        <span class="action-text">${view.action}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}
