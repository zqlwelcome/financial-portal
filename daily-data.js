/**
 * 总结页签 - 推送数据从JSON文件加载
 */

// ===== 推送时间配置 =====
const PUSH_SLOTS = {
    morning:  { time: '08:00', label: '早间', icon: '🌅' },
    noon:     { time: '12:00', label: '午间', icon: '☀️' },
    evening:  { time: '19:00', label: '晚间', icon: '🌆' },
    night:    { time: '00:00', label: '深夜', icon: '🌙' }
};

// ===== 大师周度观点 =====
const WEEKLY_MASTERS = {
    templeton: {
        name: "邓普顿",
        fullName: "约翰·邓普顿",
        icon: "🌍",
        subtitle: "逆向投资之父",
        philosophy: "行情在绝望中诞生，在犹豫中成长，在乐观中成熟，在兴奋中死亡。",
        color: "#5856d6",
        views: [
            { event: "美联储降息信号", view: "全球流动性拐点已现，新兴市场将迎来估值修复窗口。", tip: "当所有人恐慌时，正是入场信号。", action: "关注港股科技股和A股消费龙头。" },
            { event: "中国央行降准1万亿", view: "政策底已现，但市场底需确认。", tip: "政策底≠市场底，耐心等待。", action: "短期可参与反弹，设好止损。" },
            { event: "日元跌破160", view: "日本资产可能被低估。", tip: "被抛弃的资产往往最有价值。", action: "小仓位配置日本ETF。" }
        ]
    },
    buffett: {
        name: "巴菲特",
        fullName: "沃伦·巴菲特",
        icon: "💰",
        subtitle: "价值投资之王",
        philosophy: "价格是你付出的，价值是你得到的。",
        color: "#ff9500",
        views: [
            { event: "宁德时代固态电池", view: "新能源长期看好，但短期估值偏高。", tip: "好公司≠好股票，要看价格。", action: "等回调30%后再布局。" },
            { event: "北向资金连续净流入", view: "外资抄底说明估值有吸引力。", tip: "跟聪明钱，但不盲目跟风。", action: "关注茅台、宁德等重仓股。" },
            { event: "个人养老金全面推开", view: "长期利好，短期影响有限。", tip: "投资是长跑，不是暴富。", action: "每月定投沪深300ETF。" }
        ]
    },
    munger: {
        name: "芒格",
        fullName: "查理·芒格",
        icon: "🧠",
        subtitle: "多元思维大师",
        philosophy: "我必须知道我将在哪里死去，这样我就永远不会去那里。",
        color: "#34c759",
        views: [
            { event: "A股放量大涨", view: "成交量放大是好现象，但要看持续性。", tip: "涨时想跌，跌时想涨。", action: "连涨3天反而要警惕。" },
            { event: "比特币突破11万", view: "已从另类资产变成主流资产。", tip: "不懂就不要碰。", action: "配置控制在5%以内。" },
            { event: "油价突破85美元", view: "能源通胀可能卷土重来。", tip: "逆向思维找机会。", action: "关注中石油等高股息股。" }
        ]
    }
};

let currentView = 'today';

// ===== 初始化标签 =====
function initMasterTabs() {
    document.querySelectorAll('.segment').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.segment').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentView = tab.dataset.view;
            renderSummaryContent();
        });
    });
}

// ===== 渲染内容 =====
async function renderSummaryContent() {
    const el = document.getElementById('summaryContent');
    if (!el) return;
    
    if (currentView === 'today') {
        await renderTodayView(el);
    } else {
        renderMasterView(el, currentView);
    }
}

// ===== 加载今日推送 =====
async function loadTodayBriefings() {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10);
    const slots = ['morning', 'noon', 'evening', 'night'];
    const results = [];

    for (const slot of slots) {
        const path = `data/briefings/${dateStr}-${slot}.json`;
        try {
            const resp = await fetch(path);
            if (!resp.ok) continue;
            const data = await resp.json();
            const slotInfo = PUSH_SLOTS[slot];
            results.push({
                time: data.time || slotInfo.time,
                label: slotInfo.label,
                icon: slotInfo.icon,
                content: data.content
            });
        } catch(e) {
            // 没有推送文件就跳过
        }
    }
    return results;
}

// ===== 今日视图 =====
async function renderTodayView(el) {
    // 先显示加载状态
    el.innerHTML = `
        <div class="today-header">
            <div class="th-icon">📢</div>
            <div class="th-info">
                <div class="th-title">今日财经推送</div>
                <div class="th-sub">加载中...</div>
            </div>
        </div>
        <div style="text-align:center;padding:40px 0;color:#8e8e93;">
            <div class="loading-spinner" style="font-size:32px;animation:pulse 1s infinite;">⏳</div>
        </div>
    `;

    const briefings = await loadTodayBriefings();

    if (briefings.length === 0) {
        el.innerHTML = `
            <div class="today-header">
                <div class="th-icon">📢</div>
                <div class="th-info">
                    <div class="th-title">今日财经推送</div>
                    <div class="th-sub">暂无推送</div>
                </div>
            </div>
            <div class="empty-state" style="text-align:center;padding:40px 0;color:#8e8e93;font-size:14px;">
                <div style="font-size:48px;margin-bottom:12px;">📭</div>
                <div>今天还没有推送内容</div>
                <div style="margin-top:8px;font-size:12px;color:#aeaeb2;">推送时间：08:00 · 12:00 · 19:00 · 00:00</div>
            </div>
        `;
        return;
    }

    el.innerHTML = `
        <div class="today-header">
            <div class="th-icon">📢</div>
            <div class="th-info">
                <div class="th-title">今日财经推送</div>
                <div class="th-sub">已推送 ${briefings.length} 条</div>
            </div>
        </div>
        <div class="today-list">
            ${briefings.map(s => `
                <div class="today-item" onclick="togglePushContent(this)">
                    <div class="ti-icon">${s.icon}</div>
                    <div class="ti-content">
                        <div class="ti-head">
                            <span class="ti-time">${s.time}</span>
                            <span class="ti-label">${s.label}</span>
                            <span class="ti-arrow">›</span>
                        </div>
                        <div class="ti-text">${s.content.replace(/\n/g, '<br>')}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// ===== 推送内容展开收起 =====
function togglePushContent(item) {
    item.classList.toggle('expanded');
    const arrow = item.querySelector('.ti-arrow');
    if (arrow) arrow.textContent = item.classList.contains('expanded') ? '⌄' : '›';
}

// ===== 大师视图 =====
function renderMasterView(el, masterId) {
    const m = WEEKLY_MASTERS[masterId];
    if (!m) return;
    
    el.innerHTML = `
        <div class="master-header" style="background: ${m.color}">
            <div class="mh-left">
                <div class="mh-avatar">${m.icon}</div>
            </div>
            <div class="mh-right">
                <div class="mh-name">${m.fullName}</div>
                <div class="mh-sub">${m.subtitle}</div>
            </div>
        </div>
        <div class="master-quote">
            <span class="mq-mark">"</span>${m.philosophy}<span class="mq-mark">"</span>
        </div>
        <div class="master-label">本周投资观点</div>
        <div class="view-list">
            ${m.views.map(v => `
                <div class="view-card">
                    <div class="vc-title">${v.event}</div>
                    <div class="vc-view">${v.view}</div>
                    <div class="vc-tags">
                        <span class="vc-tag tip">💡 ${v.tip}</span>
                        <span class="vc-tag action">⚡ ${v.action}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}
