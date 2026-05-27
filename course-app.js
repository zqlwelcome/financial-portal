/**
 * AI产品经理学习 - 应用逻辑 v2
 * 改进：进度条更突出 + 最近完成展示
 */

// ===== 状态 =====
let courseProgress = JSON.parse(localStorage.getItem('ai_pm_course_progress') || '{}');
let expandedSection = null;

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    renderCourseList();
    updateProgress();
    initModal();
});
// 保险：如果DOMContentLoaded已触发，直接执行
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    renderCourseList();
    updateProgress();
    initModal();
}

// ===== 渲染课程列表 =====
function renderCourseList() {
    const el = document.getElementById('courseList');
    if (!el) return;
    // 如果 COURSES 还没加载好，显示骨架屏
    if (!window.COURSES && typeof COURSES === 'undefined') {
        el.innerHTML = '<div class="skeleton skeleton-card"></div><div class="skeleton skeleton-card"></div><div class="skeleton skeleton-card"></div>';
        return;
    }
    el.innerHTML = COURSES.map(section => {
        const completedCount = section.lessons.filter(l => courseProgress[l.id]).length;
        const totalCount = section.lessons.length;
        const isExpanded = expandedSection === section.id;
        
        return `
            <div class="course-section">
                <div class="section-header" onclick="toggleSection('${section.id}')">
                    <div class="section-icon ${section.bg}">${section.icon}</div>
                    <div class="section-info">
                        <div class="section-title">${section.title}</div>
                        <div class="section-subtitle">${section.sub}</div>
                    </div>
                    <div class="section-meta">
                        <span class="section-progress">${completedCount}/${totalCount}</span>
                        <span class="section-arrow">${isExpanded ? '⌃' : '›'}</span>
                    </div>
                </div>
                <div class="course-content ${isExpanded ? 'expanded' : ''}">
                    ${section.lessons.map(lesson => {
                        const isCompleted = courseProgress[lesson.id];
                        return `
                            <div class="course-item ${isCompleted ? 'completed' : ''}" onclick="openLesson('${section.id}', '${lesson.id}')">
                                <div class="item-check ${isCompleted ? 'done' : ''}">${isCompleted ? '✓' : ''}</div>
                                <div class="item-info">
                                    <div class="item-title">${lesson.title}</div>
                                    <div class="item-duration">${lesson.time}</div>
                                </div>
                                <span class="item-arrow">›</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }).join('');
}

// ===== 切换展开 =====
function toggleSection(sectionId) {
    expandedSection = expandedSection === sectionId ? null : sectionId;
    renderCourseList();
}

// ===== 打开课程详情 =====
function openLesson(sectionId, lessonId) {
    const section = COURSES.find(s => s.id === sectionId);
    const lesson = section?.lessons.find(l => l.id === lessonId);
    if (!lesson) return;
    
    const modal = document.getElementById('courseModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    
    title.textContent = lesson.title;
    
    const isCompleted = courseProgress[lessonId];
    
    body.innerHTML = `
        ${lesson.content}
        <button class="done-btn ${isCompleted ? 'completed' : ''}" onclick="completeLesson('${lessonId}')">
            ${isCompleted ? '✓ 已完成' : '✓ 完成打卡'}
        </button>
    `;
    
    modal.classList.remove('hidden');
}

// ===== 完成打卡 =====
function completeLesson(lessonId) {
    if (!courseProgress[lessonId]) {
        courseProgress[lessonId] = true;
        courseProgress['_last_completed'] = lessonId;
        courseProgress['_last_completed_time'] = new Date().toLocaleDateString('zh-CN');
        localStorage.setItem('ai_pm_course_progress', JSON.stringify(courseProgress));
        
        // 更新按钮状态
        const btn = document.querySelector('.done-btn');
        if (btn) {
            btn.classList.add('completed');
            btn.textContent = '✓ 已完成';
        }
        
        // 更新进度和列表
        updateProgress();
        renderCourseList();
        
        // 显示成功提示
        showToast('🎉 打卡成功！');
    }
}

// ===== 更新进度（优化版） =====
function updateProgress() {
    const allLessons = COURSES.flatMap(s => s.lessons);
    const completed = allLessons.filter(l => courseProgress[l.id]).length;
    const total = allLessons.length;
    const percent = Math.round((completed / total) * 100);
    
    // 兼容 index.html（段落文本）和 learn.html（环形百分比）
    const pctEl = document.getElementById('progressPct') || document.getElementById('completionRate');
    if (pctEl) pctEl.textContent = percent + '%';
    
    // 更新环形进度 - 兼容两种布局
    const ring = document.getElementById('progressRing') || document.getElementById('progressFill');
    if (ring) {
        const circumference = 283;
        const offset = circumference - (percent / 100) * circumference;
        ring.style.strokeDashoffset = offset;
    }
    
    // 更新进度统计文本（learn.html）
    const doneEl = document.getElementById('progressDone');
    if (doneEl) doneEl.textContent = completed;
    const totalEl = document.getElementById('progressTotal');
    if (totalEl) totalEl.textContent = total;
    const starsEl = document.getElementById('progressStars');
    if (starsEl) starsEl.textContent = completed;
    
    // 更新连续天数
    const today = new Date().toDateString();
    const lastCheckin = localStorage.getItem('last_checkin_date');
    let streak = parseInt(localStorage.getItem('streak_count') || '0');
    
    if (lastCheckin !== today && completed > 0) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (lastCheckin === yesterday.toDateString()) {
            streak++;
        } else {
            streak = 1;
        }
        localStorage.setItem('last_checkin_date', today);
        localStorage.setItem('streak_count', streak.toString());
    }
    
    const streakEl = document.getElementById('streakDays');
    if (streakEl) streakEl.textContent = streak;
    
    // 更新最近完成
    const lastId = courseProgress['_last_completed'];
    const lastEl = document.getElementById('lastCompleted');
    if (lastEl && lastId) {
        let lessonName = '';
        for (const s of COURSES) {
            const l = s.lessons.find(l => l.id === lastId);
            if (l) { lessonName = l.title; break; }
        }
        const lastTime = courseProgress['_last_completed_time'] || '';
        lastEl.textContent = lessonName ? `最近完成：${lessonName}` : '';
    }
}

// ===== 初始化弹窗 =====
function initModal() {
    document.getElementById('modalClose').addEventListener('click', () => {
        document.getElementById('courseModal').classList.add('hidden');
    });
    
    document.getElementById('courseModal').addEventListener('click', (e) => {
        if (e.target.id === 'courseModal') {
            document.getElementById('courseModal').classList.add('hidden');
        }
    });
}

// ===== 显示打赏弹窗 =====
function showDonateModal() {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:999;display:flex;align-items:center;justify-content:center;';
    overlay.innerHTML = `
        <div style="background:#fff;border-radius:16px;padding:24px;width:280px;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,0.2);">
            <div style="font-size:32px;margin-bottom:8px;">☕</div>
            <div style="font-size:16px;font-weight:600;color:#1d1d1f;margin-bottom:4px;">感谢你的支持！</div>
            <div style="font-size:13px;color:#86868b;margin-bottom:16px;">请用微信扫码赞助</div>
            <img src="assets/donate-qr.jpg" style="width:200px;height:200px;border-radius:12px;margin:0 auto 16px;display:block;object-fit:cover;">
            <button onclick="this.closest('[style]').remove()" style="background:#f5f5f7;color:#1d1d1f;border:none;border-radius:8px;padding:8px 24px;font-size:14px;cursor:pointer;width:100%;">关闭</button>
        </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}

// ===== 显示提示 =====
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:60px;left:50%;transform:translateX(-50%);background:#34c759;color:white;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:500;z-index:300;animation:fadeIn 0.3s';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}
