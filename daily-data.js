/**
 * 总结页签 - 推送数据从JSON文件加载
 */

// ===== 推送时间配置 =====
const PUSH_SLOTS = [
    { key: 'morning',  label: '早报', icon: '🌅', pushTime: '08:00' },
    { key: 'noon',     label: '午报', icon: '☀️', pushTime: '12:00' },
    { key: 'evening',  label: '晚报', icon: '🌆', pushTime: '19:00' }
];

// ===== 已读状态 =====
const READ_KEY = 'push_read';

function getReadSet() {
    const val = localStorage.getItem(READ_KEY);
    return val ? new Set(JSON.parse(val)) : new Set();
}

function markRead(key) {
    const set = getReadSet();
    set.add(key);
    localStorage.setItem(READ_KEY, JSON.stringify([...set]));
}

function isRead(key) {
    return getReadSet().has(key);
}

// ===== 提取报内容中的摘要和专家观点 =====
function parseBriefing(content, slotKey) {
    const lines = content.split('\n').filter(l => l.trim());
    
    // 提取专家观点（💡 三视角速评后面的内容）
    const expertViews = {};
    let inExpert = false;
    let currentExpert = null;
    for (const line of lines) {
        if (line.startsWith('💡 三视角速评')) { inExpert = true; continue; }
        if (!inExpert) continue;
        if (line.startsWith('⚡') || line.startsWith('🎯')) { inExpert = false; continue; }
        if (line.startsWith('• 邓普顿')) { currentExpert = 'templeton'; expertViews[currentExpert] = line.replace('• 邓普顿：', '').trim(); continue; }
        if (line.startsWith('• 巴菲特')) { currentExpert = 'buffett'; expertViews[currentExpert] = line.replace('• 巴菲特：', '').trim(); continue; }
        if (line.startsWith('• 芒格')) { currentExpert = 'munger'; expertViews[currentExpert] = line.replace('• 芒格：', '').trim(); continue; }
        if (currentExpert && line.startsWith('•')) { expertViews[currentExpert] += ' ' + line.trim(); }
    }
    
    // 提取摘要（头条和要闻前几条）
    const bullets = lines.filter(l => /^[•🔥📌]/.test(l));
    const preview = bullets.slice(0, 4).join('\n') || lines.slice(1, 4).join('\n');
    
    return { preview, expertViews };
}

// ===== 从JSON加载简报 =====
async function loadBriefing(slotKey, dateStr) {
    const path = `data/briefings/${dateStr}-${slotKey}.json`;
    try {
        const resp = await fetch(path);
        if (!resp.ok) return null;
        return await resp.json();
    } catch(e) {
        return null;
    }
}

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
        const data = window._todayBriefingData;
        renderMasterView(el, currentView, data);
    }
}

// ===== 今日视图 =====
async function renderTodayView(el) {
    el.innerHTML = '<div style="text-align:center;padding:30px 0;color:#8e8e93;">⏳ 加载中...</div>';
    
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10);
    const now = today.getHours() * 60 + today.getMinutes();
    
    // 并行加载所有简报
    const results = await Promise.all(PUSH_SLOTS.map(async slot => {
        const data = await loadBriefing(slot.key, dateStr);
        const parsed = data ? parseBriefing(data.content, slot.key) : null;
        return {
            ...slot,
            data,
            parsed,
            pushed: !!data,
            pushMinute: parseInt(slot.pushTime.split(':')[0]) * 60 + parseInt(slot.pushTime.split(':')[1])
        };
    }));
    
    // 存储简报数据供专家视图使用
    window._todayBriefingData = results;
    
    // 构建今日视图
    el.innerHTML = `
        <div class="today-header">
            <div class="th-icon">📢</div>
            <div class="th-info">
                <div class="th-title">每日简报</div>
                <div class="th-sub" id="todayDate">${dateStr}</div>
            </div>
        </div>
        <div class="today-slots">
            ${results.map(s => {
                const read = isRead(s.key);
                if (s.pushed) {
                    const { preview, expertViews } = s.parsed;
                    return `
                    <div class="ts-card ${read ? 'read' : ''}" data-key="${s.key}" onclick="togglePushCard(this)">
                        <div class="ts-head">
                            <span class="ts-icon">${s.icon}</span>
                            <span class="ts-label">${s.label}</span>
                            <span class="ts-badge">${read ? '已读' : '未读'}</span>
                            <span class="ts-arrow">›</span>
                        </div>
                        <div class="ts-preview">${preview.replace(/\n/g, '<br>')}</div>
                        <div class="ts-full hidden">
                            ${s.data.content.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                    `;
                } else {
                    const isPast = now >= s.pushMinute;
                    const statusText = isPast ? '等会再刷' : `${s.pushTime} 推送`;
                    return `
                    <div class="ts-card pending">
                        <div class="ts-head">
                            <span class="ts-icon">${s.icon}</span>
                            <span class="ts-label">${s.label}</span>
                            <span class="ts-status">${statusText}</span>
                        </div>
                    </div>
                    `;
                }
            }).join('')}
        </div>
        <div class="today-divider"></div>
        <div class="expert-section" id="expertSection">
            <div class="expert-title">📊 今日专家视角</div>
            <div class="expert-refresh">更新于 ${today.getHours().toString().padStart(2,'0')}:${today.getMinutes().toString().padStart(2,'0')}</div>
            ${renderExpertCards(results)}
        </div>
    `;
}

// ===== 渲染专家卡片 =====
function renderExpertCards(results) {
    // 收集所有已推送简报中的专家观点（按时间倒序：最新的优先）
    const pushedSlots = results.filter(s => s.pushed).reverse();
    
    if (pushedSlots.length === 0) {
        return `<div class="expert-empty">等待推送后自动更新当日观点</div>`;
    }
    
    // 取最新一次推送中的专家观点
    const latest = pushedSlots[0];
    const views = latest.parsed.expertViews;
    
    if (!views || Object.keys(views).length === 0) {
        return `<div class="expert-empty">等待推送后自动更新当日观点</div>`;
    }
    
    const experts = [
        { id: 'templeton', name: '邓普顿', fullName: '约翰·邓普顿', icon: '🌍', color: '#5856d6', tag: '逆向思维' },
        { id: 'buffett', name: '巴菲特', fullName: '沃伦·巴菲特', icon: '💰', color: '#ff9500', tag: '价值投资' },
        { id: 'munger', name: '芒格', fullName: '查理·芒格', icon: '🧠', color: '#34c759', tag: '多元思维' }
    ];
    
    return experts.map(ex => {
        const view = views[ex.id];
        if (!view) return '';
        return `
        <div class="expert-card" style="border-left-color:${ex.color}">
            <div class="ec-head">
                <span class="ec-icon" style="background:${ex.color}">${ex.icon}</span>
                <span class="ec-name">${ex.fullName}</span>
                <span class="ec-tag">${ex.tag}</span>
                <span class="ec-time">${pushedSlots[0].label}</span>
            </div>
            <div class="ec-view">${view}</div>
        </div>
        `;
    }).join('');
}

// ===== 点击展开简报卡片 =====
function togglePushCard(el) {
    const key = el.dataset.key;
    if (!isRead(key)) {
        markRead(key);
        el.classList.add('read');
        const badge = el.querySelector('.ts-badge');
        if (badge) badge.textContent = '已读';
    }
    el.classList.toggle('expanded');
    const arrow = el.querySelector('.ts-arrow');
    if (arrow) arrow.textContent = el.classList.contains('expanded') ? '⌄' : '›';
}

// ===== 大师视图（加载当日专家观点）=====
function renderMasterView(el, masterId, allResults) {
    // 从简报数据中获取最新观点
    const pushedSlots = (allResults || []).filter(s => s.pushed).reverse();
    
    if (pushedSlots.length === 0) {
        el.innerHTML = '<div style="text-align:center;padding:40px 0;color:#8e8e93;font-size:14px;">等待每日推送后自动更新观点</div>';
        return;
    }
    
    const latest = pushedSlots[0];
    const views = latest.parsed.expertViews || {};
    const view = views[masterId];
    
    if (!view) {
        el.innerHTML = '<div style="text-align:center;padding:40px 0;color:#8e8e93;font-size:14px;">暂无当日观点</div>';
        return;
    }
    
    const experts = {
        templeton: { name: '邓普顿', fullName: '约翰·邓普顿', icon: '🌍', subtitle: '逆向投资之父', philosophy: '行情在绝望中诞生，在犹豫中成长，在乐观中成熟，在兴奋中死亡。', color: '#5856d6' },
        buffett: { name: '巴菲特', fullName: '沃伦·巴菲特', icon: '💰', subtitle: '价值投资之王', philosophy: '价格是你付出的，价值是你得到的。', color: '#ff9500' },
        munger: { name: '芒格', fullName: '查理·芒格', icon: '🧠', subtitle: '多元思维大师', philosophy: '我必须知道我将在哪里死去，这样我就永远不会去那里。', color: '#34c759' }
    };
    
    const m = experts[masterId];
    
    el.innerHTML = `
        <div class="master-header" style="background: ${m.color}">
            <div class="mh-left">
                <div class="mh-avatar">${m.icon}</div>
            </div>
            <div class="mh-right">
                <div class="mh-name">${m.fullName}</div>
                <div class="mh-sub">${m.subtitle} · 更新于 ${latest.label}</div>
            </div>
        </div>
        <div class="master-quote">
            <span class="mq-mark">"</span>${m.philosophy}<span class="mq-mark">"</span>
        </div>
        <div class="master-label">今日观点</div>
        <div class="expert-card-single">
            <div class="ec-view">${view}</div>
        </div>
    `;
}
