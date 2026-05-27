/**
 * 课程中心 - 应用逻辑
 * 支持多系列课程的卡片式布局
 * 集成 course-data.js 中的完整课程内容
 * 所有课程都可以自由浏览，只记录打卡进度
 */

// 当前状态
let currentView = 'center';
let currentSeries = null;

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    renderCourseCenter();
});

// 渲染课程中心主页
function renderCourseCenter() {
    const container = document.getElementById('courseCenter');
    if (!container) return;
    
    currentView = 'center';
    currentSeries = null;
    
    // 计算AI产品经理系列的进度
    let pmProgress = 0;
    let pmCompleted = 0;
    let pmTotal = 0;
    
    // 获取课程进度
    let progress = {};
    try {
        progress = JSON.parse(localStorage.getItem('ai_pm_course_progress') || '{}');
    } catch(e) {}
    
    if (typeof COURSES !== 'undefined') {
        COURSES.forEach(section => {
            section.lessons.forEach(lesson => {
                pmTotal++;
                if (progress[lesson.id]) {
                    pmCompleted++;
                }
            });
        });
        pmProgress = pmTotal > 0 ? Math.round((pmCompleted / pmTotal) * 100) : 0;
    }
    
    // 更新系列数据
    const pmSeries = COURSE_SERIES.find(s => s.id === 'ai-pm');
    if (pmSeries) {
        pmSeries.progress = pmProgress;
        pmSeries.completedLessons = pmCompleted;
        pmSeries.totalLessons = pmTotal;
    }
    
    container.innerHTML = `
        <div class="course-center">
            <div class="course-center-header">
                <div class="course-center-title">📚 学习中心</div>
                <div class="course-center-subtitle">选择你的职业方向，开启AI学习之旅</div>
            </div>
            
            <div class="course-series-grid">
                ${COURSE_SERIES.map(series => renderSeriesCard(series)).join('')}
            </div>
        </div>
    `;
}

// 渲染系列卡片
function renderSeriesCard(series) {
    const statusText = {
        'active': '学习中',
        'coming-soon': '即将上线',
        'locked': '未开放'
    };
    
    const tagClass = {
        '热门': 'hot',
        '实战': 'hot',
        '技术': 'tech',
        '高薪': 'tech',
        '数据': 'data',
        '效率': 'data',
        '设计': 'design',
        '创意': 'design',
        '创业': 'business',
        '商业': 'business'
    };
    
    return `
        <div class="course-series-card ${series.status}" onclick="openSeriesDetail('${series.id}')">
            <div class="series-status ${series.status}">${statusText[series.status]}</div>
            <div class="series-icon" style="background: ${series.color}20; color: ${series.color};">
                ${series.icon}
            </div>
            <div class="series-title">${series.title}</div>
            <div class="series-desc">${series.description}</div>
            ${series.status === 'active' ? `
                <div class="series-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${series.progress}%; background: ${series.color};"></div>
                    </div>
                    <div class="progress-text">${series.completedLessons}/${series.totalLessons} 完成</div>
                </div>
            ` : ''}
            <div class="series-tags">
                ${series.tags.map(tag => `<span class="series-tag ${tagClass[tag] || ''}">${tag}</span>`).join('')}
            </div>
        </div>
    `;
}

// 打开系列详情
function openSeriesDetail(seriesId) {
    const series = COURSE_SERIES.find(s => s.id === seriesId);
    if (!series) return;
    
    // 所有系列都可以浏览
    currentView = 'detail';
    currentSeries = series;
    
    // 获取课程进度
    let progress = {};
    try {
        progress = JSON.parse(localStorage.getItem('ai_pm_course_progress') || '{}');
    } catch(e) {}
    
    const container = document.getElementById('courseCenter');
    container.innerHTML = `
        <div class="course-center">
            <div class="back-to-center" onclick="renderCourseCenter()">
                ← 返回学习中心
            </div>
            
            <div class="course-detail">
                <div class="course-detail-header">
                    <div class="course-detail-icon" style="background: ${series.color}20; color: ${series.color};">
                        ${series.icon}
                    </div>
                    <div class="course-detail-info">
                        <div class="course-detail-title">${series.title}系列</div>
                        <div class="course-detail-desc">${series.description}</div>
                    </div>
                    <div class="course-detail-progress">
                        <div class="course-detail-percent">${series.progress}%</div>
                        <div class="course-detail-count">${series.completedLessons}/${series.totalLessons}</div>
                    </div>
                </div>
                
                <div class="course-modules">
                    ${series.modules.map(module => renderModule(module, series.color, series.id, progress)).join('')}
                </div>
            </div>
        </div>
    `;
}

// 渲染模块
function renderModule(module, color, seriesId, progress) {
    // 计算模块进度
    let completedCount = 0;
    module.lessons.forEach(lesson => {
        if (progress[lesson.id]) {
            completedCount++;
        }
    });
    const totalCount = module.lessons.length;
    
    return `
        <div class="course-module" onclick="toggleModule('${module.id}')">
            <div class="course-module-header">
                <div class="course-module-icon">${module.icon}</div>
                <div class="course-module-info">
                    <div class="course-module-title">${module.title}</div>
                    <div class="course-module-subtitle">${module.subtitle}</div>
                </div>
                <div class="course-module-progress">${completedCount}/${totalCount}</div>
            </div>
            
            <div class="course-lessons" id="module-${module.id}" style="display: block;">
                ${module.lessons.map(lesson => renderLesson(lesson, color, seriesId, progress)).join('')}
            </div>
        </div>
    `;
}

// 渲染课程
function renderLesson(lesson, color, seriesId, progress) {
    const isCompleted = progress[lesson.id];
    const statusIcon = isCompleted ? '✓' : '';
    const statusText = isCompleted ? '已完成' : '点击学习';
    
    return `
        <div class="course-lesson" onclick="openLesson('${lesson.id}', '${seriesId}')">
            <div class="course-lesson-check ${isCompleted ? 'completed' : ''}">
                ${statusIcon}
            </div>
            <div class="course-lesson-info">
                <div class="course-lesson-title">${lesson.title}</div>
                <div class="course-lesson-time">${lesson.time}</div>
            </div>
            <div class="course-lesson-status ${isCompleted ? 'completed' : ''}">
                ${statusText}
            </div>
        </div>
    `;
}

// 切换模块展开/收起
function toggleModule(moduleId) {
    const moduleEl = document.getElementById(`module-${moduleId}`);
    if (!moduleEl) return;
    
    const isHidden = moduleEl.style.display === 'none';
    moduleEl.style.display = isHidden ? 'block' : 'none';
}

// 打开课程
function openLesson(lessonId, seriesId) {
    // 如果是AI产品经理系列，使用原有的课程内容
    if (seriesId === 'ai-pm') {
        openPMLesson(lessonId);
        return;
    }
    
    // 其他系列显示即将上线
    showToast('🚀 课程内容即将上线，敬请期待！');
}

// 打开AI产品经理课程（使用原有的课程内容）
function openPMLesson(lessonId) {
    if (typeof COURSES === 'undefined') {
        showToast('❌ 课程数据加载失败');
        return;
    }
    
    // 查找课程
    let lesson = null;
    let sectionTitle = '';
    
    for (const section of COURSES) {
        const found = section.lessons.find(l => l.id === lessonId);
        if (found) {
            lesson = found;
            sectionTitle = section.title;
            break;
        }
    }
    
    if (!lesson) {
        showToast('❌ 课程未找到');
        return;
    }
    
    // 打开课程详情弹窗
    const modal = document.getElementById('courseModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    
    if (!modal || !title || !body) {
        showToast('❌ 课程弹窗加载失败');
        return;
    }
    
    title.textContent = lesson.title;
    
    // 获取课程进度
    let progress = {};
    try {
        progress = JSON.parse(localStorage.getItem('ai_pm_course_progress') || '{}');
    } catch(e) {}
    
    const isCompleted = progress[lessonId];
    
    body.innerHTML = `
        <div class="lesson-section-title">${sectionTitle}</div>
        ${lesson.content}
        <button class="done-btn ${isCompleted ? 'completed' : ''}" onclick="completeLesson('${lessonId}')">
            ${isCompleted ? '✓ 已完成' : '✓ 完成打卡'}
        </button>
    `;
    
    modal.classList.remove('hidden');
}

// 完成课程打卡
function completeLesson(lessonId) {
    // 获取课程进度
    let progress = {};
    try {
        progress = JSON.parse(localStorage.getItem('ai_pm_course_progress') || '{}');
    } catch(e) {}
    
    if (!progress[lessonId]) {
        progress[lessonId] = true;
        progress['_last_completed'] = lessonId;
        progress['_last_completed_time'] = new Date().toLocaleDateString('zh-CN');
        localStorage.setItem('ai_pm_course_progress', JSON.stringify(progress));
        
        // 更新按钮状态
        const btn = document.querySelector('.done-btn');
        if (btn) {
            btn.classList.add('completed');
            btn.textContent = '✓ 已完成';
        }
        
        // 显示成功提示
        showToast('🎉 打卡成功！');
        
        // 延迟关闭弹窗并刷新课程中心
        setTimeout(() => {
            const modal = document.getElementById('courseModal');
            if (modal) {
                modal.classList.add('hidden');
            }
            renderCourseCenter();
        }, 1500);
    }
}

// 显示提示
function showToast(msg) {
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.85);color:white;padding:18px 24px;border-radius:12px;font-size:15px;z-index:400;text-align:center;line-height:1.5;max-width:260px;';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2500);
}
