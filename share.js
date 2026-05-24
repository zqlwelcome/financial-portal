/**
 * 分享功能 - 生成转发卡片和文案
 */

function initShare() {
    const btn = document.getElementById('shareBtn');
    if (!btn) return;
    btn.addEventListener('click', showShareSheet);
}

function showShareSheet() {
    // 如果已存在分享面板则关闭
    const existing = document.querySelector('.share-overlay');
    if (existing) { existing.remove(); return; }
    
    // 获取统计数据
    const pvEl = document.getElementById('busuanzi_value_site_pv');
    const uvEl = document.getElementById('busuanzi_value_site_uv');
    const pv = pvEl?.textContent || '--';
    const uv = uvEl?.textContent || '--';
    
    // 生成分享文案
    const texts = generateShareTexts(pv, uv);
    
    // 创建分享遮罩
    const overlay = document.createElement('div');
    overlay.className = 'share-overlay';
    overlay.innerHTML = `
        <div class="share-sheet" onclick="event.stopPropagation()">
            <div class="share-header">
                <span style="font-size:17px;font-weight:600;">分享学习门户</span>
                <button class="share-close" onclick="document.querySelector('.share-overlay')?.remove()">✕</button>
            </div>
            
            <div class="share-card-preview">
                <div class="share-card-inner">
                    <div class="share-card-top">📚 学习门户</div>
                    <div class="share-card-body">
                        <div style="font-size:13px;color:#8e8e93;margin-bottom:8px;">${new Date().toLocaleDateString('zh-CN', {year:'numeric',month:'long',day:'numeric'})}</div>
                        <div style="font-size:15px;font-weight:600;color:#1c1c1e;line-height:1.5;">财经新闻 · 实时行情<br>AI产品经理学习 · 投资智库</div>
                        <div class="share-card-stats">
                            <span>👁 ${pv} 浏览</span>
                            <span>🧑 ${uv} 访客</span>
                        </div>
                    </div>
                    <div class="share-card-footer">长按识别 · 立即体验</div>
                </div>
            </div>
            
            <div style="padding:0 20px;">
                <div style="font-size:13px;font-weight:600;color:#8e8e93;margin-bottom:10px;">转发文案</div>
                ${texts.map((t, i) => `
                    <div class="share-text-item" onclick="copyShareText(this, \`${t.text.replace(/`/g, '\\`')}\`)">
                        <div class="share-text-tag">${t.tag}</div>
                        <div class="share-text-content">${t.text}</div>
                        <div class="share-text-copy">复制</div>
                    </div>
                `).join('')}
            </div>
            
            <div style="padding:16px 20px 24px;text-align:center;">
                <a href="https://zqlwelcome.github.io/learning-platform/" style="color:#007AFF;font-size:13px;text-decoration:none;" target="_blank">https://zqlwelcome.github.io/learning-platform/</a>
            </div>
        </div>
    `;
    
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
}

function generateShareTexts(pv, uv) {
    const today = new Date().toLocaleDateString('zh-CN', {month:'long',day:'numeric'});
    const url = 'zqlwelcome.github.io/learning-platform';
    
    return [
        {
            tag: '📢 推荐',
            text: `发现一个很实用的学习门户！每天实时更新财经新闻、行情数据，还有AI产品经理的深度学习课程。${today}已有${pv}人次访问。适合投资爱好者和产品人 👉 ${url}`
        },
        {
            tag: '📊 财经',
            text: `每天看财经新闻就用这个——实时行情、外汇股市提示、热门TOP10自动更新，还有邓普顿/巴菲特/芒格三重投资视角解读。${today}数据已更新 📈 ${url}`
        },
        {
            tag: '🎓 学习',
            text: `想转行AI产品经理？这个门户里有15课时的完整学习体系，从指标体系到团队协作，每课都有面试考点和实战案例。免费、随时学 👉 ${url}`
        },
        {
            tag: '✍️ 自定义',
            text: `分享一个宝藏学习门户：实时财经资讯 + AI产品经理课程，内容每日更新，手机端体验很棒！🚀 ${url}`
        }
    ];
}

function copyShareText(el, text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showCopyFeedback(el);
        }).catch(() => {
            fallbackCopy(text, el);
        });
    } else {
        fallbackCopy(text, el);
    }
}

function fallbackCopy(text, el) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); showCopyFeedback(el); } catch(e) {}
    document.body.removeChild(ta);
}

function showCopyFeedback(el) {
    const btn = el.querySelector('.share-text-copy');
    if (!btn) return;
    const orig = btn.textContent;
    btn.textContent = '✓ 已复制';
    btn.style.background = '#34c759';
    btn.style.color = 'white';
    setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.style.color = '';
    }, 2000);
}
