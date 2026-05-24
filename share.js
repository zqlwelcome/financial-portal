/**
 * 分享功能 v2 - 卡片截图 + 复制文案
 * 点击分享打开底部面板，展示精美分享卡片 + 一键操作
 */

function initShare() {
    const btn = document.getElementById('shareBtn');
    if (!btn) return;
    btn.addEventListener('click', showSharePanel);
}

function showSharePanel() {
    const existing = document.querySelector('.share-overlay');
    if (existing) { existing.remove(); return; }
    
    const pvEl = document.getElementById('busuanzi_value_site_pv');
    const uvEl = document.getElementById('busuanzi_value_site_uv');
    const pv = pvEl?.textContent || '--';
    const uv = uvEl?.textContent || '--';
    const today = new Date().toLocaleDateString('zh-CN', {year:'numeric',month:'long',day:'numeric'});
    const url = 'zqlwelcome.github.io/learning-platform';
    
    // 生成分享卡片（用Canvas绘制）
    const cardHtml = generateCardHtml(pv, uv, today, url);
    
    const overlay = document.createElement('div');
    overlay.className = 'share-overlay';
    overlay.innerHTML = `
        <div class="share-sheet" onclick="event.stopPropagation()">
            <div class="share-bar">
                <span style="font-size:17px;font-weight:600;">分享</span>
                <button class="share-close" onclick="document.querySelector('.share-overlay')?.remove()">✕</button>
            </div>
            
            <div style="padding:16px 20px 0;">
                <div id="shareCardContainer" style="border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.12);">${cardHtml}</div>
            </div>
            
            <div style="display:flex;gap:12px;padding:20px;justify-content:center;">
                <button class="share-action-btn" onclick="saveShareCard()" style="flex:1;">
                    <span style="font-size:24px;">💾</span>
                    <span style="font-size:13px;font-weight:500;">保存图片</span>
                </button>
                <button class="share-action-btn" onclick="copyShareLink()" style="flex:1;">
                    <span style="font-size:24px;">🔗</span>
                    <span style="font-size:13px;font-weight:500;">复制链接</span>
                </button>
            </div>
            
            <div style="padding:0 20px 20px;">
                <div style="font-size:13px;font-weight:600;color:#8e8e93;margin-bottom:10px;">转发文案</div>
                <div class="share-text-item" onclick="copyText(this, '发现一个很实用的学习门户📚 每天实时更新财经新闻、行情数据，还有AI产品经理深度学习课程。今日已有${pv}人次访问，适合投资爱好者和产品人 👉 ${url}')">
                    <span style="font-size:11px;padding:2px 6px;background:rgba(0,122,255,0.08);color:#007AFF;border-radius:4px;font-weight:500;flex-shrink:0;margin-top:2px;">📢 推荐</span>
                    <span style="flex:1;font-size:13px;line-height:1.5;color:#3a3a3c;">发现一个很实用的学习门户📚 每天实时更新财经新闻行情，还有AI产品课程</span>
                    <span class="copy-badge">复制</span>
                </div>
                <div class="share-text-item" onclick="copyText(this, '每天看财经新闻就用这个——实时行情、外汇股市提示、热门TOP10，还有邓普顿/巴菲特/芒格三重投资视角解读 📈 ${url}')">
                    <span style="font-size:11px;padding:2px 6px;background:rgba(0,122,255,0.08);color:#007AFF;border-radius:4px;font-weight:500;flex-shrink:0;margin-top:2px;">📊 财经</span>
                    <span style="flex:1;font-size:13px;line-height:1.5;color:#3a3a3c;">实时行情+投资大师视角解读，每天更新 📈</span>
                    <span class="copy-badge">复制</span>
                </div>
                <div class="share-text-item" onclick="copyText(this, '分享一个宝藏学习门户：实时财经资讯 + AI产品经理课程，内容每日更新，手机端体验很棒 🚀 ${url}')">
                    <span style="font-size:11px;padding:2px 6px;background:rgba(0,122,255,0.08);color:#007AFF;border-radius:4px;font-weight:500;flex-shrink:0;margin-top:2px;">✍️ 自定义</span>
                    <span style="flex:1;font-size:13px;line-height:1.5;color:#3a3a3c;">分享一个宝藏学习门户，内容每日更新 🚀</span>
                    <span class="copy-badge">复制</span>
                </div>
            </div>
        </div>
    `;
    
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
}

function generateCardHtml(pv, uv, today, url) {
    return `
        <div style="background:linear-gradient(135deg,#667eea,#764ba2);padding:24px;color:white;">
            <div style="font-size:22px;font-weight:700;letter-spacing:-0.5px;margin-bottom:4px;">📚 学习门户</div>
            <div style="font-size:13px;opacity:0.75;margin-bottom:16px;">${today}</div>
            
            <div style="display:flex;gap:12px;margin-bottom:16px;">
                <div style="flex:1;background:rgba(255,255,255,0.12);border-radius:12px;padding:12px;text-align:center;">
                    <div style="font-size:20px;font-weight:700;">📰</div>
                    <div style="font-size:11px;opacity:0.7;margin-top:4px;">实时财经</div>
                </div>
                <div style="flex:1;background:rgba(255,255,255,0.12);border-radius:12px;padding:12px;text-align:center;">
                    <div style="font-size:20px;font-weight:700;">📈</div>
                    <div style="font-size:11px;opacity:0.7;margin-top:4px;">行情数据</div>
                </div>
                <div style="flex:1;background:rgba(255,255,255,0.12);border-radius:12px;padding:12px;text-align:center;">
                    <div style="font-size:20px;font-weight:700;">🧠</div>
                    <div style="font-size:11px;opacity:0.7;margin-top:4px;">投资智库</div>
                </div>
                <div style="flex:1;background:rgba(255,255,255,0.12);border-radius:12px;padding:12px;text-align:center;">
                    <div style="font-size:20px;font-weight:700;">🤖</div>
                    <div style="font-size:11px;opacity:0.7;margin-top:4px;">AI课程</div>
                </div>
            </div>
            
            <div style="display:flex;gap:16px;font-size:13px;opacity:0.75;margin-bottom:16px;">
                <span>👁 ${pv} 浏览</span>
                <span>🧑 ${uv} 访客</span>
            </div>
            
            <div style="font-size:12px;opacity:0.5;letter-spacing:0.5px;">${url}</div>
        </div>
    `;
}

// 保存分享卡片为图片
function saveShareCard() {
    const container = document.getElementById('shareCardContainer');
    if (!container) return;
    
    // 用canvas绘制卡片
    const rect = container.getBoundingClientRect();
    const scale = 3; // 高清输出
    const width = rect.width * scale;
    const height = rect.height * scale;
    
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);
    
    // 绘制背景渐变
    const grad = ctx.createLinearGradient(0, 0, width/scale, height/scale);
    grad.addColorStop(0, '#667eea');
    grad.addColorStop(1, '#764ba2');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(0, 0, rect.width, rect.height, 16);
    ctx.fill();
    
    // 标题
    ctx.fillStyle = 'white';
    ctx.font = 'bold 22px -apple-system, sans-serif';
    ctx.fillText('📚 学习门户', 24, 50);
    
    // 日期
    const today = new Date().toLocaleDateString('zh-CN', {year:'numeric',month:'long',day:'numeric'});
    ctx.font = '13px -apple-system, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.fillText(today, 24, 74);
    
    // 四个功能方块
    const blocks = [
        { icon: '📰', label: '实时财经' },
        { icon: '📈', label: '行情数据' },
        { icon: '🧠', label: '投资智库' },
        { icon: '🤖', label: 'AI课程' }
    ];
    const blockW = (rect.width - 24*2 - 12*3) / 4;
    const blockY = 98;
    
    blocks.forEach((b, i) => {
        const bx = 24 + i * (blockW + 12);
        ctx.fillStyle = 'rgba(255,255,255,0.12)';
        ctx.beginPath();
        ctx.roundRect(bx, blockY, blockW, 56, 12);
        ctx.fill();
        
        ctx.fillStyle = 'white';
        ctx.font = '20px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(b.icon, bx + blockW/2, blockY + 26);
        ctx.font = '11px -apple-system, sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fillText(b.label, bx + blockW/2, blockY + 46);
    });
    
    // 统计数据
    const pvEl = document.getElementById('busuanzi_value_site_pv');
    const uvEl = document.getElementById('busuanzi_value_site_uv');
    const pv = pvEl?.textContent || '--';
    const uv = uvEl?.textContent || '--';
    
    ctx.textAlign = 'left';
    ctx.font = '13px -apple-system, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.fillText('👁 ' + pv + ' 浏览', 24, 172);
    ctx.fillText('🧑 ' + uv + ' 访客', 130, 172);
    
    // 网址
    ctx.font = '12px -apple-system, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText('zqlwelcome.github.io/learning-platform', 24, 196);
    
    // 转换为图片并触发下载/保存
    canvas.toBlob(function(blob) {
        const link = document.createElement('a');
        link.download = '学习门户分享卡_' + new Date().toISOString().slice(0,10) + '.png';
        link.href = URL.createObjectURL(blob);
        
        // 触发下载
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // 释放URL
        setTimeout(() => URL.revokeObjectURL(link.href), 1000);
        
        // 显示提示
        showToast('✅ 图片已保存，可到相册查看');
    }, 'image/png');
}

function showToast(msg) {
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.8);color:white;padding:16px 24px;border-radius:12px;font-size:14px;z-index:400;text-align:center;line-height:1.6;';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2000);
}

function copyText(el, text) {
    const doCopy = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text);
        } else {
            return new Promise((resolve, reject) => {
                const ta = document.createElement('textarea');
                ta.value = text;
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                try { document.execCommand('copy'); resolve(); } catch(e) { reject(e); }
                document.body.removeChild(ta);
            });
        }
    };
    
    doCopy().then(() => {
        const badge = el.querySelector('.copy-badge');
        if (badge) {
            badge.textContent = '✓';
            badge.style.background = '#34c759';
            badge.style.color = 'white';
            setTimeout(() => {
                badge.textContent = '复制';
                badge.style.background = '';
                badge.style.color = '';
            }, 2000);
        }
    }).catch(() => {});
}

function copyShareLink() {
    copyText(null, 'https://zqlwelcome.github.io/learning-platform/');
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.8);color:white;padding:16px 24px;border-radius:12px;font-size:14px;z-index:400;';
    toast.textContent = '✅ 链接已复制';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1500);
}
