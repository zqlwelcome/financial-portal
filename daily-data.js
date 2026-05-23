/**
 * 总结页签内容
 */

// ===== 更新时间表 =====
const UPDATE_SCHEDULE = [
    { time: '08:00', label: '🌅 早间财经', desc: '全球市场开盘前，隔夜重要事件总结' },
    { time: '12:00', label: '☀️ 午间财经', desc: 'A股午盘，上午市场动态' },
    { time: '19:00', label: '🌆 晚间财经', desc: '美股开盘，全天市场回顾' },
    { time: '00:00', label: '🌙 深夜财经', desc: '美股收盘，明日展望' }
];

// ===== 渲染总结内容 =====
function renderDailySummary() {
    const el = document.getElementById('dailyList');
    
    el.innerHTML = `
        <div class="schedule-card">
            <div class="schedule-title">📢 定时推送时间</div>
            <div class="schedule-list">
                ${UPDATE_SCHEDULE.map(s => `
                    <div class="schedule-item">
                        <div class="schedule-time">${s.time}</div>
                        <div class="schedule-info">
                            <div class="schedule-label">${s.label}</div>
                            <div class="schedule-desc">${s.desc}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="master-section">
            <div class="section-title">💡 投资大师观点</div>
            <div class="master-cards">
                <div class="master-card" onclick="showMaster('templeton')">
                    <span class="mc-icon">🌍</span>
                    <span class="mc-name">邓普顿</span>
                    <span class="mc-hint">逆向投资</span>
                </div>
                <div class="master-card" onclick="showMaster('buffett')">
                    <span class="mc-icon">💰</span>
                    <span class="mc-name">巴菲特</span>
                    <span class="mc-hint">价值投资</span>
                </div>
                <div class="master-card" onclick="showMaster('munger')">
                    <span class="mc-icon">🧠</span>
                    <span class="mc-name">芒格</span>
                    <span class="mc-hint">多元思维</span>
                </div>
            </div>
        </div>
        
        <div id="masterDetail"></div>
    `;
}

// ===== 显示大师详情 =====
function showMaster(masterId) {
    const master = MASTER_VIEWS[masterId];
    const el = document.getElementById('masterDetail');
    
    // 切换选中状态
    document.querySelectorAll('.master-card').forEach(c => c.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
    
    el.innerHTML = `
        <div class="master-profile">
            <div class="mp-header">
                <span class="mp-icon">${master.icon}</span>
                <div class="mp-info">
                    <div class="mp-name">${master.name}</div>
                    <div class="mp-title">${master.title}</div>
                </div>
            </div>
            <div class="mp-quote">"${master.philosophy}"</div>
        </div>
        
        ${master.recentViews.map(view => `
            <div class="view-card">
                <div class="view-event">📌 ${view.event}</div>
                <div class="view-row">
                    <div class="view-col">
                        <div class="view-label">🌍 宏观</div>
                        <div class="view-text">${view.macro}</div>
                    </div>
                    <div class="view-col">
                        <div class="view-label">🔍 微观</div>
                        <div class="view-text">${view.micro}</div>
                    </div>
                </div>
                <div class="view-tip">
                    <span>💡</span> ${view.tip}
                </div>
                <div class="view-action">
                    <span>⚡</span> ${view.action}
                </div>
            </div>
        `).join('')}
    `;
}
