/**
 * AI产品经理学习 - 应用逻辑
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

// ===== 渲染课程列表 =====
function renderCourseList() {
    const el = document.getElementById('courseList');
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
        <button class="checkin-btn ${isCompleted ? 'done' : ''}" onclick="completeLesson('${lessonId}')">
            ${isCompleted ? '✓ 已完成' : '✓ 完成打卡'}
        </button>
    `;
    
    modal.classList.remove('hidden');
}

// ===== 完成打卡 =====
function completeLesson(lessonId) {
    if (!courseProgress[lessonId]) {
        courseProgress[lessonId] = true;
        localStorage.setItem('ai_pm_course_progress', JSON.stringify(courseProgress));
        
        // 更新按钮状态
        const btn = document.querySelector('.checkin-btn');
        if (btn) {
            btn.classList.add('done');
            btn.textContent = '✓ 已完成';
        }
        
        // 更新进度和列表
        updateProgress();
        renderCourseList();
        
        // 显示成功提示
        showToast('打卡成功！+1⭐');
    }
}

// ===== 更新进度 =====
function updateProgress() {
    const allLessons = COURSES.flatMap(s => s.lessons);
    const completed = allLessons.filter(l => courseProgress[l.id]).length;
    const total = allLessons.length;
    const percent = Math.round((completed / total) * 100);
    
    document.getElementById('completionRate').textContent = percent + '%';
    
    // 更新环形进度
    const ring = document.getElementById('progressFill');
    if (ring) {
        const circumference = 283;
        const offset = circumference - (percent / 100) * circumference;
        ring.style.strokeDashoffset = offset;
    }
    
    // 更新连续天数（简化逻辑）
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
    
    document.getElementById('streakDays').textContent = streak;
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

// ===== 显示提示 =====
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:60px;left:50%;transform:translateX(-50%);background:#34c759;color:white;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:500;z-index:300;animation:fadeIn 0.3s';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}
