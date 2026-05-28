/**
 * 课程中心 - 应用逻辑
 * 支持多系列课程的卡片式布局
 * 集成 course-data.js 中的完整课程内容
 * 所有课程都可以自由浏览，支持打卡/取消打卡
 */

// 当前状态
let currentView = 'center';
let currentSeries = null;
let currentLessonId = null;

// 获取课程进度
function getCourseProgress() {
    try {
        return JSON.parse(localStorage.getItem('ai_pm_course_progress') || '{}');
    } catch(e) {
        return {};
    }
}

// 保存课程进度
function saveCourseProgress(progress) {
    localStorage.setItem('ai_pm_course_progress', JSON.stringify(progress));
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    renderCourseCenter();
    
    // 关闭弹窗事件
    const modalClose = document.getElementById('modalClose');
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    const courseModal = document.getElementById('courseModal');
    if (courseModal) {
        courseModal.addEventListener('click', (e) => {
            if (e.target.id === 'courseModal') {
                closeModal();
            }
        });
    }
});

// 关闭弹窗
function closeModal() {
    const modal = document.getElementById('courseModal');
    if (modal) {
        modal.classList.add('hidden');
    }
    currentLessonId = null;
}

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
    const progress = getCourseProgress();
    
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

    const nextLesson = getNextPMLesson(progress);
    const isAllDone = pmTotal > 0 && pmCompleted === pmTotal;
    
    container.innerHTML = `
        <div class="course-center">
            <div class="course-center-header">
                <div class="course-center-title">下班充电站</div>
                <div class="course-center-subtitle">想系统补一点的时候再来。内容保持硬核，插不插电都随你。</div>
            </div>

            <div class="course-value-strip">
                <div class="course-value-item">
                    <span class="course-value-label">岗位对齐</span>
                    <span class="course-value-text">AI PM / 数据 / 设计 / 工程</span>
                </div>
                <div class="course-value-item">
                    <span class="course-value-label">内容口味</span>
                    <span class="course-value-text">面试能讲，工作能用</span>
                </div>
            </div>

            <div class="today-study-card">
                <div class="today-study-kicker">${isAllDone ? '今日状态' : '可选充电'}</div>
                <div class="today-study-title">${isAllDone ? '今天可以理直气壮地休息了' : nextLesson.title}</div>
                <div class="today-study-copy">
                    ${isAllDone
                        ? 'AI产品经理路线已经通关，脑子申请带薪年假。'
                        : `${nextLesson.sectionTitle} · ${nextLesson.time}。不是任务，只是给想多懂一点的人留个入口。`}
                </div>
                <div class="today-study-actions">
                    <button class="today-study-primary" onclick="${isAllDone ? "openSeriesDetail('ai-pm')" : `openLesson('${nextLesson.id}', 'ai-pm')`}">
                        ${isAllDone ? '回顾充电路线' : '去充一点电'}
                    </button>
                    <span class="today-study-progress">${pmCompleted}/${pmTotal} 已完成</span>
                </div>
            </div>
            
            <div class="course-series-grid">
                ${COURSE_SERIES.map(series => renderSeriesCard(series)).join('')}
            </div>
        </div>
    `;
}

function getNextPMLesson(progress) {
    if (typeof COURSES === 'undefined') {
        return { id: '', title: 'AI产品经理路线', sectionTitle: '先把目录热热身', time: '10分钟' };
    }

    for (const section of COURSES) {
        const lesson = section.lessons.find(item => !progress[item.id]);
        if (lesson) {
            return {
                ...lesson,
                sectionTitle: section.title
            };
        }
    }

    const firstSection = COURSES[0];
    const firstLesson = firstSection?.lessons?.[0];
    return {
        ...firstLesson,
        sectionTitle: firstSection?.title || 'AI产品经理路线'
    };
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
            <div class="series-fit">${getSeriesFit(series.id)}</div>
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

function getSeriesFit(seriesId) {
    const fits = {
        'ai-pm': '适合：想转AI产品、面试要讲清楚AI落地的人',
        'ai-engineer': '适合：想把Demo做成真系统的人',
        'ai-analyst': '适合：想让报表少点苦工、多点判断的人',
        'ai-designer': '适合：想把AI变成设计工作流的人',
        'ai-founder': '适合：想把想法先跑成MVP的人'
    };
    return fits[seriesId] || '适合：想给职业工具箱加一格的人';
}

// 打开系列详情
function openSeriesDetail(seriesId) {
    const series = COURSE_SERIES.find(s => s.id === seriesId);
    if (!series) return;
    
    currentView = 'detail';
    currentSeries = series;
    
    const progress = getCourseProgress();
    const container = document.getElementById('courseCenter');
    
    container.innerHTML = `
        <div class="course-center">
            <div class="back-to-center" onclick="renderCourseCenter()">
                ← 返回充电站
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
    let completedCount = 0;
    module.lessons.forEach(lesson => {
        if (progress[lesson.id]) {
            completedCount++;
        }
    });
    const totalCount = module.lessons.length;
    
    return `
        <div class="course-module">
            <div class="course-module-header" onclick="toggleModule('${module.id}')">
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
    const statusText = isCompleted ? '已完成' : '随缘看';
    
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
    if (seriesId === 'ai-pm') {
        openPMLesson(lessonId);
        return;
    }
    
    const series = COURSE_SERIES.find(s => s.id === seriesId);
    const title = series ? series.title : '这门课';
    showToast(`这门「${title}」还在备课中，老师正在和咖啡机谈判 ☕`);
}

// 打开AI产品经理课程
function openPMLesson(lessonId) {
    if (typeof COURSES === 'undefined') {
        showToast('课程数据没加载出来，先别急，可能是网速在摸鱼');
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
        showToast('这节课迷路了，我回头把它抓回来');
        return;
    }
    
    currentLessonId = lessonId;
    
    // 打开课程详情弹窗
    const modal = document.getElementById('courseModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    
    if (!modal || !title || !body) {
        showToast('课程弹窗没打开，可能它也刚下班');
        return;
    }
    
    title.textContent = lesson.title;
    
    const progress = getCourseProgress();
    const isCompleted = progress[lessonId];
    
    body.innerHTML = `
        <div class="lesson-section-title">${sectionTitle}</div>
        ${lesson.content}
        <div class="lesson-actions">
            <button class="done-btn ${isCompleted ? 'completed' : ''}" onclick="toggleLessonComplete('${lessonId}')">
                ${isCompleted ? '已充过电（点击取消）' : '这节我看过了'}
            </button>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

// 切换课程完成状态（打卡/取消打卡）
function toggleLessonComplete(lessonId) {
    const progress = getCourseProgress();
    
    if (progress[lessonId]) {
        // 取消打卡
        delete progress[lessonId];
        saveCourseProgress(progress);
        
        // 更新按钮状态
        const btn = document.querySelector('.done-btn');
        if (btn) {
            btn.classList.remove('completed');
            btn.textContent = '这节我看过了';
        }
        
        showToast('已取消，这节课先放回书架');
    } else {
        // 打卡
        progress[lessonId] = true;
        progress['_last_completed'] = lessonId;
        progress['_last_completed_time'] = new Date().toLocaleDateString('zh-CN');
        saveCourseProgress(progress);
        
        // 更新按钮状态
        const btn = document.querySelector('.done-btn');
        if (btn) {
            btn.classList.add('completed');
            btn.textContent = '✓ 已完成（点击取消）';
        }
        
        showToast('🎉 打卡成功！');
    }
    
    // 更新课程列表显示
    updateLessonStatus(lessonId, !!progress[lessonId]);
}

// 更新课程列表中的状态显示
function updateLessonStatus(lessonId, isCompleted) {
    // 找到对应的课程项并更新
    const lessonItems = document.querySelectorAll('.course-lesson');
    lessonItems.forEach(item => {
        const onclick = item.getAttribute('onclick');
        if (onclick && onclick.includes(lessonId)) {
            const check = item.querySelector('.course-lesson-check');
            const status = item.querySelector('.course-lesson-status');
            
            if (check) {
                if (isCompleted) {
                    check.classList.add('completed');
                    check.textContent = '✓';
                } else {
                    check.classList.remove('completed');
                    check.textContent = '';
                }
            }
            
            if (status) {
                if (isCompleted) {
                    status.classList.add('completed');
                    status.textContent = '已完成';
                } else {
                    status.classList.remove('completed');
                    status.textContent = '点击学习';
                }
            }
        }
    });
    
    // 更新进度显示
    updateProgressDisplay();
}

// 更新进度显示
function updateProgressDisplay() {
    const progress = getCourseProgress();
    
    // 计算进度
    let pmCompleted = 0;
    let pmTotal = 0;
    
    if (typeof COURSES !== 'undefined') {
        COURSES.forEach(section => {
            section.lessons.forEach(lesson => {
                pmTotal++;
                if (progress[lesson.id]) {
                    pmCompleted++;
                }
            });
        });
    }
    
    const pmProgress = pmTotal > 0 ? Math.round((pmCompleted / pmTotal) * 100) : 0;
    
    // 更新系列卡片进度
    const pmSeries = COURSE_SERIES.find(s => s.id === 'ai-pm');
    if (pmSeries) {
        pmSeries.progress = pmProgress;
        pmSeries.completedLessons = pmCompleted;
        pmSeries.totalLessons = pmTotal;
    }
    
    // 更新详情页进度显示
    const percentEl = document.querySelector('.course-detail-percent');
    const countEl = document.querySelector('.course-detail-count');
    
    if (percentEl) {
        percentEl.textContent = pmProgress + '%';
    }
    if (countEl) {
        countEl.textContent = `${pmCompleted}/${pmTotal}`;
    }
    
    // 更新模块进度显示
    if (typeof COURSE_SERIES !== 'undefined' && currentSeries) {
        const series = COURSE_SERIES.find(s => s.id === currentSeries.id);
        if (series) {
            series.modules.forEach(module => {
                let moduleCompleted = 0;
                module.lessons.forEach(lesson => {
                    if (progress[lesson.id]) {
                        moduleCompleted++;
                    }
                });
                
                const moduleProgressEl = document.querySelector(`#module-${module.id}`)?.closest('.course-module')?.querySelector('.course-module-progress');
                if (moduleProgressEl) {
                    moduleProgressEl.textContent = `${moduleCompleted}/${module.lessons.length}`;
                }
            });
        }
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
