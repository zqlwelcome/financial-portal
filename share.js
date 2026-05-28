/**
 * 分享功能 v4 - 一键复制文案（含链接）
 * 点击→完整分享文案复制到剪贴板→提示去微信粘贴
 */

function initShare() {
    const btn = document.getElementById('shareBtn');
    if (!btn) return;
    btn.addEventListener('click', oneTapShare);
}

function oneTapShare() {
    // 从 localStorage 读取今日统计
    let pv = '--', uv = '--';
    try {
        const stats = JSON.parse(localStorage.getItem('site_stats') || '{}');
        const today = new Date().toDateString();
        if (stats.date === today) {
            pv = stats.pv || 0;
            uv = stats.uv || 0;
        }
    } catch(e) {}
    const url = 'https://zqlwelcomelearninghub.pages.dev/';
    const today = new Date().toLocaleDateString('zh-CN', {month:'long',day:'numeric'});
    const hour = new Date().getHours();
    
    // 根据时间生成不同的问候语
    let greeting = '';
    if (hour < 9) greeting = '早安，先看看市场昨晚有没有偷偷加班 ☀️';
    else if (hour < 12) greeting = '上午好，市场已经开会一阵子了 📊';
    else if (hour < 14) greeting = '午间快讯，饭可以慢慢吃，消息先看两眼 🍱';
    else if (hour < 18) greeting = '下午好，看看钱今天都跑哪儿去了 📈';
    else greeting = '晚间复盘，下班后的脑子也值得温柔对待 🌙';
    
    // 从持仓数据生成摘要
    let holdingsSummary = '';
    if (typeof INVESTOR_HOLDINGS !== 'undefined') {
        const picks = ['buffett','duan','cathie','trump'];
        holdingsSummary = picks.map(id => {
            const h = INVESTOR_HOLDINGS[id];
            if (!h) return '';
            const topChanges = (h.changes || []).filter(c => c.action === 'add' || c.action === 'new').slice(0, 2);
            const changes = topChanges.map(c => `${c.ticker}${c.action === 'new' ? '🆕' : '↑'}`).join(' ');
            return `${h.icon} ${h.name} ${changes}`
        }).filter(Boolean).join(' · ');
        holdingsSummary = '\n\n📋 最新持仓动态\n' + holdingsSummary;
    }
    
    const shareText = '🌙 下班学点啥 - 你的下班市场小报\n' +
        '━━━━━━━━━━━━━━━━━━━━\n' +
        greeting + '\n\n' +
        '今天这里有：\n' +
        '• 市场速览：上证 / 恒生 / 纳指 / 沪深300\n' +
        '• 钱圈热闹：财经新闻先看重点\n' +
        '• 高手视角：邓普顿 / 巴菲特 / 芒格 / 段永平\n' +
        '• 大佬持仓：看看聪明钱有没有挪窝\n' +
        '• 下班充电：想学再学，不想学也没事' +
        holdingsSummary + '\n\n' +
        '━━━━━━━━━━━━━━━━━━━━\n' +
        '👆 点击链接，先看两眼市场，充电随缘\n' +
        '🔗 ' + url;
    
    copyToClipboard(shareText);
    showToast('已复制，去微信丢给同事一起摸鱼式进步');
}

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch(e) {}
    document.body.removeChild(ta);
}

function showToast(msg) {
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.85);color:white;padding:18px 24px;border-radius:12px;font-size:15px;z-index:400;text-align:center;line-height:1.5;max-width:260px;';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2500);
}
