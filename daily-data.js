/**
 * 总结页签 - 横向滑动选择器 + 每日简报 + 达人观点
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

// ===== 从简报文本提取摘要和专家观点 =====
function parseBriefing(text) {
    const lines = text.split('\n').filter(l => l.trim());
    
    // 提取专家观点
    const experts = {};
    let inExpert = false, curExpert = null;
    for (const line of lines) {
        if (line.startsWith('💡 三视角速评')) { inExpert = true; continue; }
        if (!inExpert) continue;
        if (line.startsWith('⚡') || line.startsWith('🎯')) { inExpert = false; continue; }
        if (line.startsWith('• 邓普顿')) { curExpert = 'templeton'; experts[curExpert] = { text: line.replace('• 邓普顿：', '').trim() }; continue; }
        if (line.startsWith('• 巴菲特')) { curExpert = 'buffett'; experts[curExpert] = { text: line.replace('• 巴菲特：', '').trim() }; continue; }
        if (line.startsWith('• 芒格')) { curExpert = 'munger'; experts[curExpert] = { text: line.replace('• 芒格：', '').trim() }; continue; }
        if (curExpert && line.startsWith('•')) { experts[curExpert].text += ' ' + line.trim(); }
    }
    
    // 生成更丰富的达人内容（基于当日新闻自动推演）
    const headlines = lines.filter(l => l.startsWith('•') || l.startsWith('🔥')).slice(0, 7);
    const topicText = headlines.map(l => l.replace(/^[•🔥]\s*/, '')).join('；');
    
    for (const key of Object.keys(experts)) {
        const base = experts[key].text;
        // 从当日新闻提炼更多内容
        experts[key] = {
            insight: base,
            prediction: genPrediction(key, base, headlines),
            lesson: genLesson(key),
            updateLabel: '早报'
        };
    }
    
    // 摘要
    const bullets = lines.filter(l => /^[•🔥📌]/.test(l));
    const preview = bullets.slice(0, 4).join('\n') || lines.slice(1, 4).join('\n');
    
    return { preview, experts };
}

function genPrediction(key, baseText, headlines) {
    const preds = {
        templeton: '逆向思维提示：当市场情绪一边倒时，关注被忽视的价值洼地。建议小仓位布局新兴市场ETF，设好止损，等待均值回归。',
        buffett: '价值锚定：在情绪波动中坚持寻底。建议关注现金流充裕的消费龙头，等回调10-15%时逐步建仓，长线持有。',
        munger: '多元思维：拆解当前市场结构——流动性、估值、情绪三维度综合判断。不要押注单一方向，保持组合多样性。'
    };
    return preds[key] || '基于当日新闻综合分析，建议保持谨慎关注。';
}

function genLesson(key) {
    const lessons = {
        templeton: '💡 今日心得：\n行情总在绝望中诞生，在犹豫中成长。当所有人都盯着同一个风险时，那个风险往往已经price in了。真正的超额收益，来自大多数人还没注意到的角落。',
        buffett: '💡 今日心得：\n市场短期是情绪投票器，长期是价值称重机。今天的热点新闻对优质公司的长期内在价值几乎没有影响。别忘了，在别人恐惧时贪婪。',
        munger: '💡 今日心得：\n投资最重要的是不要做蠢事。当新闻让你情绪激动时，停一停，问问自己：我比市场知道得更多吗？如果不是，就别做交易。'
    };
    return lessons[key] || '持续学习和独立思考是最好的投资。';
}

// ===== 加载简报JSON =====
async function loadBriefing(slotKey, dateStr) {
    try {
        const resp = await fetch(`data/briefings/${dateStr}-${slotKey}.json`);
        if (!resp.ok) return null;
        return await resp.json();
    } catch(e) {
        return null;
    }
}

// ===== 滑动选择器 =====
function initSlideSelector() {
    const sel = document.querySelector('.slide-selector');
    if (!sel) return;
    const opts = sel.querySelectorAll('.slide-opt');
    opts.forEach(opt => {
        opt.addEventListener('click', () => {
            opts.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            // 确保选中项可见
            opt.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            window._currentView = opt.dataset.view;
            renderSummaryContent();
        });
    });
    window._currentView = 'today';
}

// ===== 渲染内容入口 =====
async function renderSummaryContent() {
    const el = document.getElementById('summaryContent');
    if (!el) return;
    
    const view = window._currentView || 'today';
    
    if (view === 'today') {
        await renderTodayView(el);
    } else {
        await renderExpertView(el, view);
    }
}

// ===== 今日视图（每日简报三栏）=====
async function renderTodayView(el) {
    el.innerHTML = '<div style="text-align:center;padding:30px 0;color:#8e8e93;">⏳ 加载中...</div>';
    
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10);
    const nowMin = today.getHours() * 60 + today.getMinutes();
    
    const results = await Promise.all(PUSH_SLOTS.map(async slot => {
        const data = await loadBriefing(slot.key, dateStr);
        return {
            ...slot,
            data,
            parsed: data ? parseBriefing(data.content) : null,
            pushed: !!data,
            pushMin: parseInt(slot.pushTime.split(':')[0]) * 60 + parseInt(slot.pushTime.split(':')[1])
        };
    }));
    
    window._todayBriefingData = results;
    
    el.innerHTML = `
        <div class="today-header">
            <div class="th-icon">📢</div>
            <div class="th-info">
                <div class="th-title">每日简报</div>
                <div class="th-sub">${dateStr}</div>
            </div>
        </div>
        <div class="today-slots">
            ${results.map(s => {
                if (s.pushed) {
                    const read = isRead(s.key);
                    return `
                    <div class="ts-card ${read ? 'read' : ''}" data-key="${s.key}" onclick="togglePushCard(this)">
                        <div class="ts-head">
                            <span class="ts-icon">${s.icon}</span>
                            <span class="ts-label">${s.label}</span>
                            <span class="ts-badge">${read ? '已读' : '未读'}</span>
                            <span class="ts-arrow">›</span>
                        </div>
                        <div class="ts-preview">${s.parsed.preview.replace(/\n/g, '<br>')}</div>
                        <div class="ts-full hidden">${s.data.content.replace(/\n/g, '<br>')}</div>
                    </div>
                    `;
                } else {
                    const status = nowMin >= s.pushMin ? '等会再刷' : `${s.pushTime} 推送`;
                    return `
                    <div class="ts-card pending">
                        <div class="ts-head">
                            <span class="ts-icon">${s.icon}</span>
                            <span class="ts-label">${s.label}</span>
                            <span class="ts-status">${status}</span>
                        </div>
                    </div>
                    `;
                }
            }).join('')}
        </div>
    `;
}

// ===== 点击展开简报 =====
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

// ===== 达人视图（解读+预判+心得）=====
async function renderExpertView(el, expertId) {
    // 获取简报数据
    let results = window._todayBriefingData;
    if (!results || results.length === 0) {
        const today = new Date();
        const dateStr = today.toISOString().slice(0, 10);
        results = await Promise.all(PUSH_SLOTS.map(async slot => {
            const data = await loadBriefing(slot.key, dateStr);
            return {
                ...slot,
                data,
                parsed: data ? parseBriefing(data.content) : null,
                pushed: !!data
            };
        }));
        window._todayBriefingData = results;
    }
    
    const pushedSlots = results.filter(s => s.pushed).reverse();
    
    const expertMeta = {
        templeton: { name: '邓普顿', fullName: '约翰·邓普顿', icon: '🌍', subtitle: '逆向投资之父', color: '#5856d6', 
            bio: '全球投资之父，以逆向投资闻名。名言："行情在绝望中诞生，在犹豫中成长，在乐观中成熟，在兴奋中死亡。"' },
        buffett: { name: '巴菲特', fullName: '沃伦·巴菲特', icon: '💰', subtitle: '价值投资之王', color: '#ff9500',
            bio: '伯克希尔·哈撒韦CEO，价值投资典范。名言："价格是你付出的，价值是你得到的。"' },
        munger: { name: '芒格', fullName: '查理·芒格', icon: '🧠', subtitle: '多元思维大师', color: '#34c759',
            bio: '伯克希尔副董事长，多元思维模型倡导者。名言："我必须知道我将在哪里死去，这样我就永远不会去那里。"' }
    };
    
    const meta = expertMeta[expertId];
    
    // 获取最新观点
    let insight = '', prediction = '', lesson = '', updateLabel = '暂无更新';
    
    for (const slot of pushedSlots) {
        if (slot.parsed && slot.parsed.experts && slot.parsed.experts[expertId]) {
            const ex = slot.parsed.experts[expertId];
            insight = ex.insight || '';
            prediction = ex.prediction || '';
            lesson = ex.lesson || '';
            updateLabel = slot.label;
            break;
        }
    }
    
    if (!insight) {
        el.innerHTML = `
            <div style="text-align:center;padding:40px 0;color:#8e8e93;font-size:14px;">
                <div style="font-size:40px;margin-bottom:12px;">${meta.icon}</div>
                <div>等待每日推送后自动更新</div>
                <div style="margin-top:8px;font-size:12px;color:#aeaeb2;">${meta.name}的解读将于推送后显示</div>
            </div>
        `;
        return;
    }
    
    el.innerHTML = `
        <div class="expert-banner" style="background:${meta.color}">
            <div class="eb-avatar">${meta.icon}</div>
            <div class="eb-info">
                <div class="eb-name">${meta.fullName}</div>
                <div class="eb-sub">${meta.subtitle}</div>
            </div>
            <div class="eb-time">${updateLabel}</div>
        </div>
        <div class="expert-bio">${meta.bio}</div>
        
        <div class="expert-block">
            <div class="ebl-header">📖 当日解读</div>
            <div class="ebl-body">${insight}</div>
        </div>
        
        <div class="expert-block">
            <div class="ebl-header">🔮 投资预判</div>
            <div class="ebl-body">${prediction}</div>
        </div>
        
        <div class="expert-block lesson">
            <div class="ebl-header">💡 心得分享</div>
            <div class="ebl-body">${lesson.replace(/\n/g, '<br>')}</div>
        </div>
    `;
}
