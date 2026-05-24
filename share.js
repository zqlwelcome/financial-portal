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
    
    // 使用html2canvas或手动提示
    // 移动端推荐用户截图，因为html2canvas需要额外加载
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // 简单的Toast提示截图
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.8);color:white;padding:20px 24px;border-radius:12px;font-size:14px;text-align:center;z-index:400;line-height:1.6;';
    toast.innerHTML = '📸 请截屏保存卡片<br><span style="font-size:12px;opacity:0.7;">电源键+音量上键</span>';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
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
