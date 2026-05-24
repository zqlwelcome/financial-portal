/**
 * 分享功能 v3 - 一键生成，调起系统分享
 * 点击→生成完整内容→调起系统分享面板→用户选微信直接发
 */

function initShare() {
    const btn = document.getElementById('shareBtn');
    if (!btn) return;
    btn.addEventListener('click', oneTapShare);
}

async function oneTapShare() {
    const pv = document.getElementById('busuanzi_value_site_pv')?.textContent || '--';
    const uv = document.getElementById('busuanzi_value_site_uv')?.textContent || '--';
    const url = 'https://zqlwelcome.github.io/learning-platform/';
    const today = new Date().toLocaleDateString('zh-CN', {month:'long',day:'numeric'});
    
    // 生成完整分享文案（用户直接粘贴发朋友圈/好友）
    const shareText = '📚 学习门户\n' + today + ' · ' + pv + '人次访问\n\n' +
        '📰 实时财经  📈 行情数据  🧠 投资智库  🤖 AI课程\n\n' +
        '每天更新财经新闻、外汇股市提示，' +
        '还有邓普顿/巴菲特/芒格三重投资视角解读和AI产品经理学习体系。\n\n' +
        '🔗 ' + url;
    
    // 生成图片
    const imageBlob = await generateShareImage(pv, uv);
    
    // 第一步：复制完整文案到剪贴板
    copyToClipboard(shareText);
    
    // 第二步：下载图片（手机上会弹出保存提示）
    const link = document.createElement('a');
    link.download = '学习门户_' + new Date().toISOString().slice(0,10) + '.png';
    link.href = URL.createObjectURL(imageBlob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    
    // 提示
    showToast('✅ 文案已复制，图片已保存\n去微信粘贴发送即可');
}

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(() => {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand('copy'); } catch(e) {}
            document.body.removeChild(ta);
        });
    } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch(e) {}
        document.body.removeChild(ta);
    }
}

function showToast(msg) {
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.85);color:white;padding:20px 28px;border-radius:14px;font-size:15px;z-index:400;text-align:center;line-height:1.6;max-width:280px;';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2500);
}

// 用canvas生成分享图片（返回Blob）
function generateShareImage(pv, uv) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const scale = 3;
        const w = 340 * scale;
        const h = 200 * scale;
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.scale(scale, scale);
        
        const rw = 340, rh = 200;
        
        // 背景
        const grad = ctx.createLinearGradient(0, 0, rw, rh);
        grad.addColorStop(0, '#667eea');
        grad.addColorStop(1, '#764ba2');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(0, 0, rw, rh, 16);
        ctx.fill();
        
        // 标题
        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px -apple-system, sans-serif';
        ctx.fillText('📚 学习门户', 20, 42);
        
        // 日期
        const d = new Date().toLocaleDateString('zh-CN', {month:'long',day:'numeric'});
        ctx.font = '12px -apple-system, sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fillText(d, 20, 64);
        
        // 四宫格
        const items = [['📰','财经'], ['📈','行情'], ['🧠','智库'], ['🤖','AI']];
        const bw = (rw - 40 - 24) / 4;
        items.forEach(([icon, label], i) => {
            const bx = 20 + i * (bw + 8);
            ctx.fillStyle = 'rgba(255,255,255,0.12)';
            ctx.beginPath();
            ctx.roundRect(bx, 78, bw, 48, 10);
            ctx.fill();
            ctx.textAlign = 'center';
            ctx.font = '18px sans-serif';
            ctx.fillStyle = 'white';
            ctx.fillText(icon, bx + bw/2, 102);
            ctx.font = '10px -apple-system, sans-serif';
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.fillText(label, bx + bw/2, 120);
        });
        
        // 统计
        ctx.textAlign = 'left';
        ctx.font = '12px -apple-system, sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fillText('👁 ' + pv, 20, 148);
        ctx.fillText('🧑 ' + uv, 100, 148);
        
        // 网址
        ctx.font = '10px -apple-system, sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.45)';
        ctx.fillText('zqlwelcome.github.io/learning-platform', 20, 168);
        
        // 底部提示
        ctx.font = '9px -apple-system, sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        ctx.textAlign = 'center';
        ctx.fillText('长按识别 · 立即体验', rw/2, 186);
        
        canvas.toBlob(resolve, 'image/png');
    });
}
