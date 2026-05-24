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
    const pv = document.getElementById('busuanzi_value_site_pv')?.textContent || '--';
    const uv = document.getElementById('busuanzi_value_site_uv')?.textContent || '--';
    const url = 'https://zqlwelcome.github.io/learning-platform/';
    const today = new Date().toLocaleDateString('zh-CN', {month:'long',day:'numeric'});
    
    // 从持仓数据生成摘要
    let holdingsSummary = '';
    if (typeof INVESTOR_HOLDINGS !== 'undefined') {
        const picks = ['buffett','duan','cathie','trump'];
        holdingsSummary = picks.map(id => {
            const h = INVESTOR_HOLDINGS[id];
            if (!h) return '';
            // 找出最大的增持和新买入
            const topChanges = (h.changes || []).filter(c => c.action === 'add' || c.action === 'new').slice(0, 2);
            const changes = topChanges.map(c => `${c.ticker}${c.action === 'new' ? '🆕' : '↑'}`).join(' ');
            return `${h.icon} ${h.name} ${changes}`
        }).filter(Boolean).join(' · ');
        holdingsSummary = '\n📋 持仓情报 ' + holdingsSummary + '\n';
    }
    
    const shareText = '🌙 下班学点啥\n' + today + ' · ' + pv + '人次访问\n\n' +
        '📰 实时财经  📈 行情数据  🧠 投资智库  🤖 AI课程\n\n' +
        '每天更新财经新闻、外汇股市提示，' +
        '还有邓普顿/巴菲特/芒格三重投资视角解读和AI产品经理学习体系。' +
        holdingsSummary +
        '\n🔗 ' + url;
    
    copyToClipboard(shareText);
    showToast('✅ 已复制，去微信粘贴发送');
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
