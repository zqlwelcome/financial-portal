/**
 * AI产品经理7天学习计划
 */

// ===== 7天课程数据 =====
const COURSES = [
    {
        day: 1,
        title: "认识AI产品经理",
        desc: "了解角色定位和核心能力",
        icon: "🎯",
        duration: "45分钟",
        videos: [
            { title: "AI产品经理是什么？", source: "B站", url: "https://www.bilibili.com/video/BV1GJ411x7h7", type: "bilibili" },
            { title: "What is an AI Product Manager?", source: "YouTube", url: "https://www.youtube.com/watch?v=example1", type: "youtube" }
        ],
        content: `
            <div class="lesson-section">
                <h3>📖 今日学习目标</h3>
                <p class="lesson-text">今天我们要搞清楚一个核心问题：<strong>AI产品经理到底是什么？和传统产品经理有什么区别？</strong></p>
            </div>
            
            <div class="diagram-card">
                <div class="diagram-icon">👨‍💻</div>
                <div class="diagram-text">AI产品经理 = 产品经理 + AI技术理解 + 数据思维</div>
            </div>
            
            <div class="lesson-section">
                <h3>💡 通俗理解</h3>
                <p class="lesson-text">想象你要开一家餐厅：</p>
                <ul class="lesson-list">
                    <li><strong>传统产品经理</strong> = 菜单设计者，决定卖什么菜</li>
                    <li><strong>AI产品经理</strong> = 厨师 + 菜单设计者，还要懂怎么用智能设备做菜</li>
                </ul>
                <p class="lesson-text" style="margin-top:12px">AI产品经理不需要会写代码，但要知道AI能做什么、不能做什么。</p>
            </div>
            
            <div class="lesson-section">
                <h3>🎯 四大核心能力</h3>
                <ul class="lesson-list">
                    <li><strong>技术理解力</strong> - 能和工程师聊天，知道AI怎么工作</li>
                    <li><strong>数据思维</strong> - 用数据说话，不拍脑袋决策</li>
                    <li><strong>产品设计力</strong> - 把AI能力变成用户喜欢的产品</li>
                    <li><strong>跨界协作</strong> - 搞定算法、工程、运营等各路人马</li>
                </ul>
            </div>
            
            <div class="quiz-section">
                <h3>🧠 小测验</h3>
                <div class="quiz-question">AI产品经理需要会写代码吗？</div>
                <div class="quiz-options" id="quiz1">
                    <div class="quiz-option" onclick="checkQuiz('quiz1', this, false)">A. 必须精通Python</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz1', this, true)">B. 不需要，但要懂原理</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz1', this, false)">C. 完全不需要了解技术</div>
                </div>
                <div class="quiz-feedback" id="quiz1-feedback"></div>
            </div>
        `,
        quiz: { answer: 1, feedback: "正确！AI产品经理不需要写代码，但要能理解技术原理，这样才能和工程师有效沟通。" }
    },
    {
        day: 2,
        title: "AI基础知识扫盲",
        desc: "机器学习、深度学习、大模型",
        icon: "🧠",
        duration: "60分钟",
        videos: [
            { title: "5分钟搞懂机器学习", source: "B站", url: "https://www.bilibili.com/video/BV1Wv411h7kN", type: "bilibili" }
        ],
        content: `
            <div class="lesson-section">
                <h3>📖 今日学习目标</h3>
                <p class="lesson-text">今天我们用<strong>大白话</strong>搞懂三个词：机器学习、深度学习、大模型。</p>
            </div>
            
            <div class="diagram-card">
                <div class="diagram-icon">📚</div>
                <div class="diagram-text">机器学习 ⊃ 深度学习 ⊃ 大模型</div>
            </div>
            
            <div class="lesson-section">
                <h3>💡 通俗理解</h3>
                <p class="lesson-text"><strong>机器学习</strong>：让电脑从数据中"学习"规律，就像小孩通过看图学会认动物。</p>
                <p class="lesson-text" style="margin-top:8px"><strong>深度学习</strong>：机器学习的一种，用"神经网络"模仿人脑，更厉害。</p>
                <p class="lesson-text" style="margin-top:8px"><strong>大模型</strong>：超级大的深度学习模型，比如ChatGPT，能聊天、写文章、画画。</p>
            </div>
            
            <div class="lesson-section">
                <h3>🎯 产品经理要懂的概念</h3>
                <ul class="lesson-list">
                    <li><strong>训练数据</strong> - AI的"教材"，数据质量决定AI质量</li>
                    <li><strong>模型</strong> - AI的"大脑"，经过训练后才能工作</li>
                    <li><strong>推理</strong> - AI"做题"的过程，输入问题得到答案</li>
                    <li><strong>准确率</strong> - AI答对题的比例</li>
                </ul>
            </div>
            
            <div class="quiz-section">
                <h3>🧠 小测验</h3>
                <div class="quiz-question">ChatGPT属于什么类型的AI？</div>
                <div class="quiz-options" id="quiz2">
                    <div class="quiz-option" onclick="checkQuiz('quiz2', this, false)">A. 传统机器学习</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz2', this, true)">B. 大语言模型（LLM）</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz2', this, false)">C. 专家系统</div>
                </div>
                <div class="quiz-feedback" id="quiz2-feedback"></div>
            </div>
        `,
        quiz: { answer: 1, feedback: "正确！ChatGPT是大语言模型（Large Language Model），属于深度学习的一种应用。" }
    },
    {
        day: 3,
        title: "AI产品需求分析",
        desc: "如何判断问题是否适合用AI解决",
        icon: "🔍",
        duration: "50分钟",
        videos: [],
        content: `
            <div class="lesson-section">
                <h3>📖 今日学习目标</h3>
                <p class="lesson-text">学会判断：<strong>什么问题适合用AI解决，什么问题不适合？</strong></p>
            </div>
            
            <div class="diagram-card">
                <div class="diagram-icon">🤔</div>
                <div class="diagram-text">不是所有问题都需要AI！先问自己三个问题</div>
            </div>
            
            <div class="lesson-section">
                <h3>💡 判断三步法</h3>
                <ul class="lesson-list">
                    <li><strong>第一步</strong>：这个问题有规律可循吗？（有数据可学吗？）</li>
                    <li><strong>第二步</strong>：人工处理效率太低吗？（需要自动化吗？）</li>
                    <li><strong>第三步</strong>：允许一定错误率吗？（AI不可能100%准确）</li>
                </ul>
            </div>
            
            <div class="lesson-section">
                <h3>✅ 适合AI的场景</h3>
                <ul class="lesson-list">
                    <li>图像识别（人脸识别、商品识别）</li>
                    <li>文本分类（垃圾邮件过滤）</li>
                    <li>推荐系统（猜你喜欢）</li>
                    <li>语音识别（语音助手）</li>
                </ul>
            </div>
            
            <div class="lesson-section">
                <h3>❌ 不适合AI的场景</h3>
                <ul class="lesson-list">
                    <li>需要100%准确率（如医疗诊断最终决策）</li>
                    <li>没有历史数据的新问题</li>
                    <li>需要创造性思维（如艺术创作）</li>
                    <li>涉及伦理道德的决策</li>
                </ul>
            </div>
            
            <div class="quiz-section">
                <h3>🧠 小测验</h3>
                <div class="quiz-question">以下哪个场景最适合用AI？</div>
                <div class="quiz-options" id="quiz3">
                    <div class="quiz-option" onclick="checkQuiz('quiz3', this, false)">A. 每天帮老板做决策</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz3', this, true)">B. 自动识别10万张照片中的人脸</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz3', this, false)">C. 设计全新的艺术风格</div>
                </div>
                <div class="quiz-feedback" id="quiz3-feedback"></div>
            </div>
        `,
        quiz: { answer: 1, feedback: "正确！人脸识别是AI的经典应用场景，规则明确、数据充足、允许小概率错误。" }
    },
    {
        day: 4,
        title: "AI产品设计方法",
        desc: "用户体验和人机协作设计",
        icon: "🎨",
        duration: "50分钟",
        videos: [
            { title: "AI产品设计原则", source: "B站", url: "https://www.bilibili.com/video/BV1xx411c7mD", type: "bilibili" }
        ],
        content: `
            <div class="lesson-section">
                <h3>📖 今日学习目标</h3>
                <p class="lesson-text">学习如何设计<strong>用户友好</strong>的AI产品，让人和AI更好地协作。</p>
            </div>
            
            <div class="diagram-card">
                <div class="diagram-icon">🤝</div>
                <div class="diagram-text">好的AI产品 = AI做擅长的 + 人做擅长的</div>
            </div>
            
            <div class="lesson-section">
                <h3>💡 设计原则</h3>
                <ul class="lesson-list">
                    <li><strong>透明性</strong> - 让用户知道AI在做什么</li>
                    <li><strong>可控性</strong> - 用户可以随时介入和修改</li>
                    <li><strong>容错性</strong> - AI出错时有好的降级方案</li>
                    <li><strong>渐进式</strong> - 让用户逐步信任AI</li>
                </ul>
            </div>
            
            <div class="lesson-section">
                <h3>🎯 人机协作模式</h3>
                <p class="lesson-text"><strong>模式一：AI建议，人决策</strong>（如邮件智能回复）</p>
                <p class="lesson-text" style="margin-top:8px"><strong>模式二：AI执行，人监督</strong>（如自动驾驶）</p>
                <p class="lesson-text" style="margin-top:8px"><strong>模式三：人机互补</strong>（如AI辅助诊断）</p>
            </div>
            
            <div class="quiz-section">
                <h3>🧠 小测验</h3>
                <div class="quiz-question">AI产品出错时，最好的处理方式是？</div>
                <div class="quiz-options" id="quiz4">
                    <div class="quiz-option" onclick="checkQuiz('quiz4', this, false)">A. 隐藏错误，假装没发生</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz4', this, true)">B. 告知用户，提供人工介入选项</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz4', this, false)">C. 直接关闭AI功能</div>
                </div>
                <div class="quiz-feedback" id="quiz4-feedback"></div>
            </div>
        `,
        quiz: { answer: 1, feedback: "正确！好的AI产品应该让用户知道AI的局限性，并提供人工介入的选项。" }
    },
    {
        day: 5,
        title: "AI产品数据思维",
        desc: "数据驱动决策和效果评估",
        icon: "📊",
        duration: "55分钟",
        videos: [],
        content: `
            <div class="lesson-section">
                <h3>📖 今日学习目标</h3>
                <p class="lesson-text">学会用<strong>数据思维</strong>评估AI产品的效果，做出更好的决策。</p>
            </div>
            
            <div class="diagram-card">
                <div class="diagram-icon">📈</div>
                <div class="diagram-text">没有数据 = 没有方向</div>
            </div>
            
            <div class="lesson-section">
                <h3>💡 核心指标</h3>
                <ul class="lesson-list">
                    <li><strong>准确率</strong> - AI答对的比例</li>
                    <li><strong>召回率</strong> - 找出所有正确答案的能力</li>
                    <li><strong>F1分数</strong> - 准确率和召回率的综合</li>
                    <li><strong>响应时间</strong> - AI给出答案的速度</li>
                </ul>
            </div>
            
            <div class="lesson-section">
                <h3>🎯 A/B测试</h3>
                <p class="lesson-text">想知道AI功能好不好？用A/B测试！</p>
                <p class="lesson-text" style="margin-top:8px">一组用户用AI版，一组用原版，对比效果。就像尝新菜，一半人吃新菜，一半人吃老菜，看哪边更满意。</p>
            </div>
            
            <div class="quiz-section">
                <h3>🧠 小测验</h3>
                <div class="quiz-question">如果AI准确率很高但召回率很低，说明什么？</div>
                <div class="quiz-options" id="quiz5">
                    <div class="quiz-option" onclick="checkQuiz('quiz5', this, false)">A. AI很完美</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz5', this, true)">B. AI答对的很准，但漏掉很多</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz5', this, false)">C. AI速度太慢</div>
                </div>
                <div class="quiz-feedback" id="quiz5-feedback"></div>
            </div>
        `,
        quiz: { answer: 1, feedback: "正确！高准确率+低召回率意味着AI很保守，只在有把握时才回答，但错过很多机会。" }
    },
    {
        day: 6,
        title: "AI产品落地实战",
        desc: "从需求到上线的完整流程",
        icon: "🚀",
        duration: "60分钟",
        videos: [
            { title: "AI产品从0到1", source: "B站", url: "https://www.bilibili.com/video/BV1xW411n7FY", type: "bilibili" }
        ],
        content: `
            <div class="lesson-section">
                <h3>📖 今日学习目标</h3>
                <p class="lesson-text">了解AI产品<strong>从需求到上线</strong>的完整流程，掌握关键节点。</p>
            </div>
            
            <div class="diagram-card">
                <div class="diagram-icon">🔄</div>
                <div class="diagram-text">需求 → 数据 → 原型 → 测试 → 上线 → 迭代</div>
            </div>
            
            <div class="lesson-section">
                <h3>💡 流程详解</h3>
                <ul class="lesson-list">
                    <li><strong>需求定义</strong> - 明确要解决什么问题</li>
                    <li><strong>数据准备</strong> - 收集、清洗、标注数据</li>
                    <li><strong>原型设计</strong> - 画出产品原型，设计交互</li>
                    <li><strong>模型训练</strong> - 工程师训练AI模型</li>
                    <li><strong>效果测试</strong> - 验证AI效果是否达标</li>
                    <li><strong>上线发布</strong> - 小范围灰度，逐步放量</li>
                    <li><strong>持续迭代</strong> - 根据反馈不断优化</li>
                </ul>
            </div>
            
            <div class="quiz-section">
                <h3>🧠 小测验</h3>
                <div class="quiz-question">AI产品上线前最重要的一步是？</div>
                <div class="quiz-options" id="quiz6">
                    <div class="quiz-option" onclick="checkQuiz('quiz6', this, false)">A. 大规模宣传</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz6', this, true)">B. 小范围灰度测试</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz6', this, false)">C. 直接全量上线</div>
                </div>
                <div class="quiz-feedback" id="quiz6-feedback"></div>
            </div>
        `,
        quiz: { answer: 1, feedback: "正确！AI产品应该先小范围测试，发现问题及时修复，避免大规模翻车。" }
    },
    {
        day: 7,
        title: "AI产品思维进阶",
        desc: "商业价值和未来趋势",
        icon: "🌟",
        duration: "50分钟",
        videos: [
            { title: "AI产品商业化", source: "YouTube", url: "https://www.youtube.com/watch?v=example7", type: "youtube" }
        ],
        content: `
            <div class="lesson-section">
                <h3>📖 今日学习目标</h3>
                <p class="lesson-text">站在<strong>商业视角</strong>看AI产品，理解如何创造价值和盈利。</p>
            </div>
            
            <div class="diagram-card">
                <div class="diagram-icon">💰</div>
                <div class="diagram-text">AI产品的价值 = 解决问题 × 商业模式</div>
            </div>
            
            <div class="lesson-section">
                <h3>💡 商业模式</h3>
                <ul class="lesson-list">
                    <li><strong>SaaS订阅</strong> - 按月/年收费（如ChatGPT Plus）</li>
                    <li><strong>按量计费</strong> - 用多少付多少（如API调用）</li>
                    <li><strong>免费+增值</strong> - 基础免费，高级付费</li>
                    <li><strong>广告变现</strong> - 免费使用，广告收入</li>
                </ul>
            </div>
            
            <div class="lesson-section">
                <h3>🎯 未来趋势</h3>
                <ul class="lesson-list">
                    <li><strong>多模态AI</strong> - 能看、能听、能说</li>
                    <li><strong>AI Agent</strong> - 能自主完成复杂任务</li>
                    <li><strong>端侧AI</strong> - 在手机上运行的AI</li>
                    <li><strong>AI+行业</strong> - 深入医疗、教育、金融</li>
                </ul>
            </div>
            
            <div class="quiz-section">
                <h3>🧠 毕业测验</h3>
                <div class="quiz-question">作为AI产品经理，最重要的是？</div>
                <div class="quiz-options" id="quiz7">
                    <div class="quiz-option" onclick="checkQuiz('quiz7', this, false)">A. 会写代码</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz7', this, false)">B. 懂AI技术细节</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz7', this, true)">C. 用AI解决用户问题，创造商业价值</div>
                </div>
                <div class="quiz-feedback" id="quiz7-feedback"></div>
            </div>
        `,
        quiz: { answer: 2, feedback: "恭喜完成所有课程！记住，AI产品经理的核心是用AI解决真实问题，创造商业价值。" }
    }
];

// ===== State =====
let progress = JSON.parse(localStorage.getItem('ai_pm_progress') || '{"completed":[],"stars":0,"streak":0}');

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    renderCourseList();
    updateProgressOverview();
    initModal();
    initShare();
});

// ===== 渲染课程列表 =====
function renderCourseList() {
    const el = document.getElementById('courseList');
    const today = new Date();
    
    el.innerHTML = COURSES.map((course, index) => {
        const isCompleted = progress.completed.includes(course.day);
        const isLocked = index > 0 && !progress.completed.includes(COURSES[index-1].day);
        const statusClass = isCompleted ? 'completed' : (isLocked ? 'locked' : '');
        const statusIcon = isCompleted ? '✅' : (isLocked ? '🔒' : '▶️');
        
        return `
            <div class="course-card ${statusClass}" onclick="openDay(${course.day})">
                <div class="course-day">
                    <span style="font-size:10px">Day</span>
                    <span class="day-num">${course.day}</span>
                </div>
                <div class="course-content">
                    <div class="course-title">${course.icon} ${course.title}</div>
                    <div class="course-desc">${course.desc}</div>
                    <div class="course-meta">
                        <span>⏱️ ${course.duration}</span>
                        <span>📝 ${course.videos.length}个视频</span>
                    </div>
                </div>
                <div class="course-status">${statusIcon}</div>
            </div>`;
    }).join('');
}

// ===== 更新进度 =====
function updateProgressOverview() {
    const completed = progress.completed.length;
    const percent = Math.round((completed / 7) * 100);
    
    document.getElementById('progressPercent').textContent = percent;
    document.getElementById('completedDays').textContent = completed;
    document.getElementById('streakCount').textContent = progress.streak;
    document.getElementById('totalStars').textContent = progress.stars;
    
    // 更新环形进度
    const ring = document.getElementById('progressRing');
    const circumference = 283;
    const offset = circumference - (percent / 100) * circumference;
    ring.style.strokeDashoffset = offset;
}

// ===== 打开每日详情 =====
function openDay(day) {
    const course = COURSES.find(c => c.day === day);
    if (!course) return;
    
    const modal = document.getElementById('dayModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    
    title.textContent = `Day ${course.day}: ${course.title}`;
    
    // 构建内容
    let html = course.content;
    
    // 添加视频
    if (course.videos.length > 0) {
        html += `
            <div class="lesson-section">
                <h3>🎬 推荐视频</h3>
                ${course.videos.map(v => `
                    <a href="${v.url}" target="_blank" class="video-card">
                        <div class="video-thumb">${v.type === 'bilibili' ? '📺' : '▶️'}</div>
                        <div class="video-info">
                            <div class="video-title">${v.title}</div>
                            <div class="video-source">${v.source}</div>
                        </div>
                    </a>
                `).join('')}
            </div>`;
    }
    
    // 添加打卡按钮
    const isCompleted = progress.completed.includes(day);
    html += `
        <div class="checkin-section">
            <button class="checkin-btn ${isCompleted ? 'completed' : ''}" onclick="completeDay(${day})">
                ${isCompleted ? '✅ 已完成' : '✓ 完成今日学习'}
            </button>
        </div>`;
    
    body.innerHTML = html;
    modal.classList.remove('hidden');
}

// ===== 完成打卡 =====
function completeDay(day) {
    if (!progress.completed.includes(day)) {
        progress.completed.push(day);
        progress.stars += 3;
        progress.streak = progress.completed.length;
        localStorage.setItem('ai_pm_progress', JSON.stringify(progress));
        
        renderCourseList();
        updateProgressOverview();
        
        // 显示奖励
        showReward(day);
    }
}

function showReward(day) {
    const popup = document.createElement('div');
    popup.className = 'reward-popup';
    popup.innerHTML = `
        <div class="reward-icon">🎉</div>
        <div class="reward-title">恭喜完成 Day ${day}!</div>
        <div class="reward-text">获得 ⭐⭐⭐ 3颗星</div>
    `;
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.remove();
        document.getElementById('dayModal').classList.add('hidden');
    }, 2000);
}

// ===== 互动问答 =====
function checkQuiz(quizId, option, isCorrect) {
    const container = document.getElementById(quizId);
    const feedback = document.getElementById(`${quizId}-feedback`);
    
    // 禁用所有选项
    container.querySelectorAll('.quiz-option').forEach(opt => {
        opt.style.pointerEvents = 'none';
    });
    
    // 标记选中项
    if (isCorrect) {
        option.classList.add('correct');
        feedback.textContent = '✅ 正确！' + getQuizFeedback(quizId);
        feedback.className = 'quiz-feedback show correct';
        progress.stars += 1;
        localStorage.setItem('ai_pm_progress', JSON.stringify(progress));
    } else {
        option.classList.add('wrong');
        // 显示正确答案
        container.querySelectorAll('.quiz-option').forEach((opt, index) => {
            if (getCorrectIndex(quizId) === index) {
                opt.classList.add('correct');
            }
        });
        feedback.textContent = '❌ 再想想！正确答案已标绿。';
        feedback.className = 'quiz-feedback show wrong';
    }
}

function getQuizFeedback(quizId) {
    const feedbacks = {
        quiz1: ' AI产品经理不需要写代码，但要能理解技术原理。',
        quiz2: ' ChatGPT是大语言模型（LLM）。',
        quiz3: ' 人脸识别是AI的经典应用场景。',
        quiz4: ' 好的AI产品应该让用户知道AI的局限性。',
        quiz5: ' 高准确率+低召回率意味着AI很保守。',
        quiz6: ' AI产品应该先小范围测试。',
        quiz7: ' AI产品经理的核心是用AI解决真实问题。'
    };
    return feedbacks[quizId] || '';
}

function getCorrectIndex(quizId) {
    const correct = { quiz1: 1, quiz2: 1, quiz3: 1, quiz4: 1, quiz5: 1, quiz6: 1, quiz7: 2 };
    return correct[quizId] || 0;
}

// ===== 弹窗 =====
function initModal() {
    document.getElementById('modalClose').addEventListener('click', () => {
        document.getElementById('dayModal').classList.add('hidden');
    });
    
    document.getElementById('dayModal').addEventListener('click', (e) => {
        if (e.target.id === 'dayModal') {
            document.getElementById('dayModal').classList.add('hidden');
        }
    });
}

// ===== 分享 =====
function initShare() {
    document.getElementById('shareBtn').addEventListener('click', () => {
        const modal = document.getElementById('shareModal');
        document.getElementById('shareDays').textContent = progress.completed.length;
        document.getElementById('shareStars').textContent = '⭐'.repeat(Math.min(progress.stars, 21));
        document.getElementById('shareLink').textContent = window.location.href;
        modal.classList.remove('hidden');
    });
    
    document.getElementById('copyBtn').addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            document.getElementById('copyBtn').textContent = '已复制！';
            setTimeout(() => {
                document.getElementById('copyBtn').textContent = '复制链接';
            }, 2000);
        });
    });
    
    document.getElementById('shareModal').addEventListener('click', (e) => {
        if (e.target.id === 'shareModal') {
            document.getElementById('shareModal').classList.add('hidden');
        }
    });
}
