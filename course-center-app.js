/**
 * 课程中心 - 应用逻辑
 * 支持多系列课程的卡片式布局
 */

// 当前状态
let currentView = 'center'; // 'center' 或 'detail'
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
    
    // 如果是即将上线或锁定状态，显示提示
    if (series.status === 'coming-soon') {
        showToast('🚀 课程即将上线，敬请期待！');
        return;
    }
    if (series.status === 'locked') {
        showToast('🔒 课程暂未开放');
        return;
    }
    
    currentView = 'detail';
    currentSeries = series;
    
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
                    ${series.modules.map(module => renderModule(module, series.color)).join('')}
                </div>
            </div>
        </div>
    `;
}

// 渲染模块
function renderModule(module, color) {
    const completedCount = module.lessons.filter(l => l.status === 'completed').length;
    const totalCount = module.lessons.length;
    const isExpanded = completedCount > 0 && completedCount < totalCount;
    
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
            
            <div class="course-lessons" id="module-${module.id}" style="display: ${isExpanded ? 'block' : 'none'}">
                ${module.lessons.map(lesson => renderLesson(lesson, color)).join('')}
            </div>
        </div>
    `;
}

// 渲染课程
function renderLesson(lesson, color) {
    const statusIcon = {
        'completed': '✓',
        'current': '●',
        'locked': ''
    };
    
    const statusText = {
        'completed': '已完成',
        'current': '学习中',
        'locked': '未解锁'
    };
    
    return `
        <div class="course-lesson" onclick="openLesson('${lesson.id}')">
            <div class="course-lesson-check ${lesson.status}">
                ${statusIcon[lesson.status]}
            </div>
            <div class="course-lesson-info">
                <div class="course-lesson-title">${lesson.title}</div>
                <div class="course-lesson-time">${lesson.time}</div>
            </div>
            <div class="course-lesson-status ${lesson.status}">
                ${statusText[lesson.status]}
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
function openLesson(lessonId) {
    // 查找课程所属的系列和模块
    let lesson = null;
    let series = null;
    let module = null;
    
    for (const s of COURSE_SERIES) {
        for (const m of s.modules) {
            const found = m.lessons.find(l => l.id === lessonId);
            if (found) {
                lesson = found;
                series = s;
                module = m;
                break;
            }
        }
        if (lesson) break;
    }
    
    if (!lesson) return;
    
    if (lesson.status === 'locked') {
        showToast('🔒 请先完成前面的课程');
        return;
    }
    
    // 这里可以跳转到课程详情页
    showToast(`📖 打开课程: ${lesson.title}`);
    // TODO: 实现课程详情页
}

// 显示提示
function showToast(msg) {
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.85);color:white;padding:18px 24px;border-radius:12px;font-size:15px;z-index:400;text-align:center;line-height:1.5;max-width:260px;';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2500);
}
