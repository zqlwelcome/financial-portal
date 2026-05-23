/**
 * AI产品经理7天学习计划 - 深度版
 */

const COURSES = [
    {
        day: 1,
        title: "AI产品经理角色深度解析",
        desc: "角色定位、能力模型、职业发展路径",
        icon: "🎯",
        duration: "60分钟",
        videos: [],
        content: `
            <div class="lesson-section">
                <h3>📖 今日学习目标</h3>
                <p class="lesson-text">深入理解AI产品经理的<strong>独特价值</strong>、<strong>核心能力</strong>和<strong>职业发展路径</strong>。</p>
            </div>
            
            <div class="diagram-card">
                <div class="diagram-icon">🎯</div>
                <div class="diagram-text">AI产品经理 = 技术翻译官 + 用户代言人 + 商业推动者</div>
            </div>
            
            <div class="lesson-section">
                <h3>💡 角色本质</h3>
                <p class="lesson-text">AI产品经理不是"会写代码的产品经理"，而是<strong>能在AI能力和用户需求之间架起桥梁的人</strong>。</p>
                <p class="lesson-text" style="margin-top:8px"><strong>核心矛盾：</strong>AI工程师追求技术完美，用户追求简单易用。AI产品经理要在这两者之间找到平衡点。</p>
            </div>
            
            <div class="lesson-section">
                <h3>🎯 能力冰山模型</h3>
                <p class="lesson-text"><strong>水面上（显性能力）：</strong></p>
                <ul class="lesson-list">
                    <li>产品设计：PRD撰写、原型设计、需求分析</li>
                    <li>项目管理：敏捷开发、跨部门协调</li>
                    <li>数据分析：指标设计、AB测试、数据驱动</li>
                </ul>
                <p class="lesson-text" style="margin-top:12px"><strong>水面下（隐性能力）：</strong></p>
                <ul class="lesson-list">
                    <li>技术判断力：知道AI能做什么、不能做什么、成本多高</li>
                    <li>商业嗅觉：识别AI商业化机会，判断ROI</li>
                    <li>用户洞察：理解用户真正的需求，而不是表面诉求</li>
                    <li>风险意识：预见AI产品的潜在风险和伦理问题</li>
                </ul>
            </div>
            
            <div class="lesson-section">
                <h3>🏢 不同公司的角色差异</h3>
                <p class="lesson-text"><strong>大厂（BAT/字节）：</strong>分工细，你可能只负责一个AI功能模块，需要深度技术理解</p>
                <p class="lesson-text" style="margin-top:8px"><strong>AI创业公司：</strong>身兼多职，从0到1搭建产品，需要全栈能力</p>
                <p class="lesson-text" style="margin-top:8px"><strong>传统企业AI转型：</strong>推动AI落地，需要变革管理能力和ROI思维</p>
            </div>
            
            <div class="lesson-section">
                <h3>📈 职业发展路径</h3>
                <p class="lesson-text"><strong>初级（0-2年）：</strong>执行层，负责具体AI功能落地</p>
                <p class="lesson-text" style="margin-top:8px"><strong>中级（3-5年）：</strong>策略层，负责AI产品线规划</p>
                <p class="lesson-text" style="margin-top:8px"><strong>高级（5年+）：</strong>决策层，负责AI战略方向</p>
                <p class="lesson-text" style="margin-top:8px"><strong>转型方向：</strong>AI产品总监、AI创业者、AI投资人、技术顾问</p>
            </div>
            
            <div class="quiz-section">
                <h3>🧠 思考题</h3>
                <div class="quiz-question">如果你是AI产品经理，老板说"我们要用AI提升用户留存"，你的第一反应是？</div>
                <div class="quiz-options" id="quiz1">
                    <div class="quiz-option" onclick="checkQuiz('quiz1', this, false)">A. 立刻找工程师讨论用什么AI模型</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz1', this, false)">B. 参考竞品的AI功能</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz1', this, true)">C. 先分析留存数据，找出流失原因，再判断AI能否解决</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz1', this, false)">D. 直接设计一个AI推荐功能</div>
                </div>
                <div class="quiz-feedback" id="quiz1-feedback"></div>
            </div>
        `,
        quiz: { answer: 2, feedback: "正确！好的AI产品经理不会直接跳到解决方案，而是先诊断问题。AI是手段，不是目的。留存低可能是因为体验差、内容不好、或者根本没有AI能解决的问题。" }
    },
    {
        day: 2,
        title: "AI技术深度理解",
        desc: "技术原理、能力边界、成本结构",
        icon: "🧠",
        duration: "70分钟",
        videos: [],
        content: `
            <div class="lesson-section">
                <h3>📖 今日学习目标</h3>
                <p class="lesson-text">深入理解AI技术的<strong>底层逻辑</strong>、<strong>能力边界</strong>和<strong>成本结构</strong>，建立技术判断力。</p>
            </div>
            
            <div class="diagram-card">
                <div class="diagram-icon">🧠</div>
                <div class="diagram-text">技术理解力 = 知道AI能做什么 + 不能做什么 + 成本多高</div>
            </div>
            
            <div class="lesson-section">
                <h3>💡 机器学习的本质</h3>
                <p class="lesson-text"><strong>核心公式：</strong>数据 + 算法 + 算力 = 模型</p>
                <p class="lesson-text" style="margin-top:8px"><strong>通俗理解：</strong>就像教小孩认字——给他看很多例子（数据），他慢慢总结规律（算法），最终学会认字（模型）。</p>
                <p class="lesson-text" style="margin-top:8px"><strong>关键洞察：</strong>AI不是"编程"，而是"训练"。你不能告诉AI"如果用户点A就显示B"，而是让它从数据中自己学会这个规律。</p>
            </div>
            
            <div class="lesson-section">
                <h3>📊 大模型的能力边界</h3>
                <p class="lesson-text"><strong>能做的：</strong></p>
                <ul class="lesson-list">
                    <li>文本生成：写文章、总结、翻译</li>
                    <li>对话交互：问答、客服、陪伴</li>
                    <li>代码生成：写代码、调试、解释</li>
                    <li>内容理解：分类、提取、分析</li>
                </ul>
                <p class="lesson-text" style="margin-top:12px"><strong>不能做的：</strong></p>
                <ul class="lesson-list">
                    <li>精确计算：大模型是"语言概率模型"，不是计算器</li>
                    <li>实时信息：训练数据有截止日期，不知道最新新闻</li>
                    <li>100%准确：存在"幻觉"，会一本正经胡说八道</li>
                    <li>复杂推理：逻辑链条越长，出错概率越高</li>
                </ul>
            </div>
            
            <div class="lesson-section">
                <h3>💰 AI成本结构</h3>
                <p class="lesson-text"><strong>一次性成本：</strong></p>
                <ul class="lesson-list">
                    <li>数据采集清洗：占总成本30-50%</li>
                    <li>模型训练：GPU算力费用</li>
                    <li>人力成本：算法工程师薪资</li>
                </ul>
                <p class="lesson-text" style="margin-top:12px"><strong>持续成本：</strong></p>
                <ul class="lesson-list">
                    <li>推理成本：每次API调用都花钱</li>
                    <li>存储成本：模型和数据存储</li>
                    <li>运维成本：监控、更新、迭代</li>
                </ul>
                <p class="lesson-text" style="margin-top:8px"><strong>成本公式：</strong>单次推理成本 = (GPU成本 × 推理时间) / 调用次数</p>
            </div>
            
            <div class="lesson-section">
                <h3>⚡ 技术选型决策框架</h3>
                <p class="lesson-text"><strong>问题1：用规则还是AI？</strong></p>
                <p class="lesson-text" style="margin-left:16px">规则：逻辑明确、数据少、要求100%准确</p>
                <p class="lesson-text" style="margin-left:16px">AI：逻辑复杂、数据多、允许一定错误</p>
                <p class="lesson-text" style="margin-top:8px"><strong>问题2：用大模型还是小模型？</strong></p>
                <p class="lesson-text" style="margin-left:16px">大模型：通用能力强、成本高、需要联网</p>
                <p class="lesson-text" style="margin-left:16px">小模型：特定任务强、成本低、可离线</p>
            </div>
            
            <div class="quiz-section">
                <h3>🧠 思考题</h3>
                <div class="quiz-question">如果一个AI功能的准确率是95%，你会上线吗？</div>
                <div class="quiz-options" id="quiz2">
                    <div class="quiz-option" onclick="checkQuiz('quiz2', this, false)">A. 95%很高了，直接上线</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz2', this, true)">B. 看场景：医疗诊断不行，推荐系统可以</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz2', this, false)">C. 必须100%才能上线</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz2', this, false)">D. 先上线再说，有问题再改</div>
                </div>
                <div class="quiz-feedback" id="quiz2-feedback"></div>
            </div>
        `,
        quiz: { answer: 1, feedback: "正确！95%准确率是否可接受取决于场景。推荐错了用户可能不喜欢，但医疗诊断错了可能致命。这就是为什么AI产品经理需要理解业务场景和风险等级。" }
    },
    {
        day: 3,
        title: "AI产品需求分析方法论",
        desc: "需求挖掘、优先级排序、ROI计算",
        icon: "🔍",
        duration: "65分钟",
        videos: [],
        content: `
            <div class="lesson-section">
                <h3>📖 今日学习目标</h3>
                <p class="lesson-text">掌握AI产品需求分析的<strong>系统方法论</strong>，包括需求挖掘、优先级排序和ROI计算。</p>
            </div>
            
            <div class="lesson-section">
                <h3>💡 需求挖掘三层次</h3>
                <p class="lesson-text"><strong>表层需求：</strong>用户说的（"我想要AI帮我写邮件"）</p>
                <p class="lesson-text" style="margin-top:8px"><strong>深层需求：</strong>用户想要的（"我想节省时间，提高效率"）</p>
                <p class="lesson-text" style="margin-top:8px"><strong>本质需求：</strong>用户真正需要的（"我工作太忙，需要更好地管理工作"）</p>
                <p class="lesson-text" style="margin-top:12px"><strong>案例：</strong>用户说"想要AI识别发票"，深层需求是"报销流程太慢"，本质需求是"财务流程需要自动化"。</p>
            </div>
            
            <div class="lesson-section">
                <h3>📊 AI需求评估矩阵</h3>
                <p class="lesson-text"><strong>四个维度打分（1-5分）：</strong></p>
                <ul class="lesson-list">
                    <li><strong>价值度：</strong>解决了多大的问题？影响多少用户？</li>
                    <li><strong>可行性：</strong>技术能实现吗？数据够吗？成本可接受吗？</li>
                    <li><strong>紧迫性：</strong>必须现在做吗？晚做会怎样？</li>
                    <li><strong>战略契合：</strong>符合公司AI战略吗？有协同效应吗？</li>
                </ul>
                <p class="lesson-text" style="margin-top:8px"><strong>决策规则：</strong>总分≥15分：立即做；10-14分：评估后做；＜10分：不做或延后</p>
            </div>
            
            <div class="lesson-section">
                <h3>💰 ROI计算框架</h3>
                <p class="lesson-text"><strong>AI项目ROI = (收益 - 成本) / 成本 × 100%</strong></p>
                <p class="lesson-text" style="margin-top:8px"><strong>收益计算：</strong></p>
                <ul class="lesson-list">
                    <li>直接收益：节省人力、提高转化、减少流失</li>
                    <li>间接收益：提升体验、增强竞争力、数据积累</li>
                </ul>
                <p class="lesson-text" style="margin-top:8px"><strong>成本计算：</strong></p>
                <ul class="lesson-list">
                    <li>开发成本：人力 + 算力 + 数据</li>
                    <li>运营成本：推理 + 存储 + 运维</li>
                    <li>机会成本：团队做这个就不能做别的</li>
                </ul>
            </div>
            
            <div class="lesson-section">
                <h3>⚡ 优先级排序方法</h3>
                <p class="lesson-text"><strong>ICE模型：</strong>Impact（影响）× Confidence（信心）× Ease（容易度）</p>
                <p class="lesson-text" style="margin-top:8px"><strong>RICE模型：</strong>Reach（覆盖）× Impact × Confidence / Effort（工作量）</p>
                <p class="lesson-text" style="margin-top:8px"><strong>AI特殊考量：</strong>数据可获得性、技术成熟度、合规风险</p>
            </div>
            
            <div class="quiz-section">
                <h3>🧠 思考题</h3>
                <div class="quiz-question">你有两个AI项目：A）智能客服（高价值、中难度）B）图像识别（中价值、低难度）。如何排序？</div>
                <div class="quiz-options" id="quiz3">
                    <div class="quiz-option" onclick="checkQuiz('quiz3', this, false)">A. 先做A，价值高</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz3', this, false)">B. 先做B，难度低</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz3', this, true)">C. 计算ROI后决定，还要考虑数据可用性和团队能力</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz3', this, false)">D. 两个都做</div>
                </div>
                <div class="quiz-feedback" id="quiz3-feedback"></div>
            </div>
        `,
        quiz: { answer: 2, feedback: "正确！不能只看价值或难度，要综合计算ROI，还要考虑数据是否可用、团队是否有能力、是否符合战略方向。这就是为什么AI产品经理需要系统思维。" }
    },
    {
        day: 4,
        title: "AI产品设计进阶",
        desc: "交互设计、降级策略、用户体验优化",
        icon: "🎨",
        duration: "65分钟",
        videos: [],
        content: `
            <div class="lesson-section">
                <h3>📖 今日学习目标</h3>
                <p class="lesson-text">掌握AI产品设计的<strong>高级技巧</strong>，包括不确定性交互、降级策略和用户体验优化。</p>
            </div>
            
            <div class="lesson-section">
                <h3>💡 不确定性设计</h3>
                <p class="lesson-text"><strong>核心挑战：</strong>AI输出是概率性的，不是确定性的。用户习惯了"输入A一定得到B"的确定性体验。</p>
                <p class="lesson-text" style="margin-top:8px"><strong>设计策略：</strong></p>
                <ul class="lesson-list">
                    <li><strong>预期管理：</strong>告诉用户"AI可能不完美"，但不要强调</li>
                    <li><strong>置信度展示：</strong>显示"AI认为这个答案有80%把握"</li>
                    <li><strong>多选项呈现：</strong>给用户3-5个候选，让他选择</li>
                    <li><strong>反馈闭环：</strong>让用户纠正AI错误，持续改进</li>
                </ul>
            </div>
            
            <div class="lesson-section">
                <h3>🛡️ 降级策略设计</h3>
                <p class="lesson-text"><strong>为什么要降级？</strong>AI可能失败（网络超时、模型错误、内容违规），必须有备选方案。</p>
                <p class="lesson-text" style="margin-top:8px"><strong>降级层级：</strong></p>
                <ul class="lesson-list">
                    <li><strong>L1：</strong>AI完全可用 → 正常展示AI结果</li>
                    <li><strong>L2：</strong>AI部分可用 → 展示AI结果+提示"仅供参考"</li>
                    <li><strong>L3：</strong>AI不可用 → 展示规则结果或历史数据</li>
                    <li><strong>L4：</strong>完全不可用 → 展示默认内容+联系客服</li>
                </ul>
            </div>
            
            <div class="lesson-section">
                <h3>✨ 体验优化技巧</h3>
                <p class="lesson-text"><strong>加载体验：</strong></p>
                <ul class="lesson-list">
                    <li>流式输出：打字机效果，边生成边显示</li>
                    <li>进度提示："正在分析您的问题..."</li>
                    <li>预估时间："大约需要10秒"</li>
                </ul>
                <p class="lesson-text" style="margin-top:8px"><strong>错误体验：</strong></p>
                <ul class="lesson-list">
                    <li>友好提示："AI暂时无法回答，换个方式试试？"</li>
                    <li>替代方案："您可以尝试以下关键词..."</li>
                    <li>人工入口："需要人工帮助？点击这里"</li>
                </ul>
            </div>
            
            <div class="lesson-section">
                <h3>📊 人机协作模式</h3>
                <p class="lesson-text"><strong>模式一：AI辅助人</strong>（人做决策，AI提供信息）</p>
                <p class="lesson-text" style="margin-left:16px">案例：AI辅助诊断，医生做最终判断</p>
                <p class="lesson-text" style="margin-top:8px"><strong>模式二：人监督AI</strong>（AI执行，人监控）</p>
                <p class="lesson-text" style="margin-left:16px">案例：自动驾驶，人随时准备接管</p>
                <p class="lesson-text" style="margin-top:8px"><strong>模式三：AI完全自主</strong>（人设定目标，AI自主完成）</p>
                <p class="lesson-text" style="margin-left:16px">案例：智能客服处理标准问题</p>
            </div>
            
            <div class="quiz-section">
                <h3>🧠 思考题</h3>
                <div class="quiz-question">AI推荐系统给用户推荐了不喜欢的内容，最好的处理方式是？</div>
                <div class="quiz-options" id="quiz4">
                    <div class="quiz-option" onclick="checkQuiz('quiz4', this, false)">A. 隐藏推荐结果</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz4', this, true)">B. 显示推荐+提供"不感兴趣"按钮+记录反馈改进</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz4', this, false)">C. 关闭推荐功能</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz4', this, false)">D. 让用户重新描述需求</div>
                </div>
                <div class="quiz-feedback" id="quiz4-feedback"></div>
            </div>
        `,
        quiz: { answer: 1, feedback: "正确！好的设计是让用户参与改进：显示推荐结果（保持透明）、提供反馈按钮（收集数据）、记录反馈（持续优化）。这样AI会越来越懂用户。" }
    },
    {
        day: 5,
        title: "AI产品数据体系搭建",
        desc: "指标设计、实验设计、数据分析",
        icon: "📊",
        duration: "70分钟",
        videos: [],
        content: `
            <div class="lesson-section">
                <h3>📖 今日学习目标</h3>
                <p class="lesson-text">掌握AI产品<strong>数据体系搭建</strong>的完整方法论，包括指标设计、实验设计和数据分析。</p>
            </div>
            
            <div class="lesson-section">
                <h3>💡 三层指标体系</h3>
                <p class="lesson-text"><strong>第一层：业务指标</strong>（老板关心的）</p>
                <ul class="lesson-list">
                    <li>GMV、DAU、留存率、转化率</li>
                    <li>这些是最终目标，AI只是手段</li>
                </ul>
                <p class="lesson-text" style="margin-top:8px"><strong>第二层：AI指标</strong>（工程师关心的）</p>
                <ul class="lesson-list">
                    <li>准确率、召回率、F1、响应时间</li>
                    <li>这些是技术指标，要和业务指标挂钩</li>
                </ul>
                <p class="lesson-text" style="margin-top:8px"><strong>第三层：体验指标</strong>（用户关心的）</p>
                <ul class="lesson-list">
                    <li>满意度、NPS、投诉率、使用率</li>
                    <li>这些是用户感知，决定产品成败</li>
                </ul>
            </div>
            
            <div class="lesson-section">
                <h3>🔬 AB测试方法论</h3>
                <p class="lesson-text"><strong>为什么要做AB测试？</strong></p>
                <p class="lesson-text" style="margin-left:16px">"我觉得AI功能好用" ≠ "用户觉得好用"</p>
                <p class="lesson-text" style="margin-left:16px">数据不会骗人，但样本量太小会</p>
                <p class="lesson-text" style="margin-top:8px"><strong>AB测试四步法：</strong></p>
                <ul class="lesson-list">
                    <li><strong>1. 假设：</strong>AI推荐能提升点击率10%</li>
                    <li><strong>2. 设计：</strong>50%用户用AI推荐，50%用规则推荐</li>
                    <li><strong>3. 执行：</strong>运行1-2周，收集数据</li>
                    <li><strong>4. 分析：</strong>统计显著性检验，判断效果</li>
                </ul>
            </div>
            
            <div class="lesson-section">
                <h3>📈 数据分析框架</h3>
                <p class="lesson-text"><strong>漏斗分析：</strong>找到用户流失的关键环节</p>
                <p class="lesson-text" style="margin-left:16px">曝光 → 点击 → 使用 → 留存</p>
                <p class="lesson-text" style="margin-top:8px"><strong>归因分析：</strong>判断AI贡献了多少价值</p>
                <p class="lesson-text" style="margin-left:16px">没有AI时转化率3%，有AI后5%，AI贡献了2%</p>
                <p class="lesson-text" style="margin-top:8px"><strong> cohort分析：</strong>观察不同用户群体的行为差异</p>
                <p class="lesson-text" style="margin-left:16px">新用户 vs 老用户对AI功能的接受度</p>
            </div>
            
            <div class="quiz-section">
                <h3>🧠 思考题</h3>
                <div class="quiz-question">AI功能准确率从90%提升到95%，但业务指标没有变化，说明什么？</div>
                <div class="quiz-options" id="quiz5">
                    <div class="quiz-option" onclick="checkQuiz('quiz5', this, false)">A. AI没有价值</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz5', this, true)">B. 可能是指标选错了，或者90%已经够用</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz5', this, false)">C. 需要继续提升准确率</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz5', this, false)">D. 数据有问题</div>
                </div>
                <div class="quiz-feedback" id="quiz5-feedback"></div>
            </div>
        `,
        quiz: { answer: 1, feedback: "正确！技术指标提升不代表业务价值提升。可能是：90%准确率已经满足用户需求；或者问题不在准确率，而在其他环节（如响应速度、交互体验）。AI产品经理要找到真正的瓶颈。" }
    },
    {
        day: 6,
        title: "AI产品落地实战",
        desc: "从方案到上线的完整流程",
        icon: "🚀",
        duration: "70分钟",
        videos: [],
        content: `
            <div class="lesson-section">
                <h3>📖 今日学习目标</h3>
                <p class="lesson-text">掌握AI产品<strong>从方案到上线</strong>的完整流程，包括技术评审、灰度发布和风险控制。</p>
            </div>
            
            <div class="lesson-section">
                <h3>💡 技术评审要点</h3>
                <p class="lesson-text"><strong>评审前准备：</strong></p>
                <ul class="lesson-list">
                    <li>需求文档：要解决什么问题？影响多少用户？</li>
                    <li>技术方案：用什么模型？需要什么数据？</li>
                    <li>成本预算：开发成本多少？运营成本多少？</li>
                    <li>风险评估：可能出什么问题？如何降级？</li>
                </ul>
                <p class="lesson-text" style="margin-top:8px"><strong>评审中要问的问题：</strong></p>
                <ul class="lesson-list">
                    <li>"如果AI失败了，用户体验会怎样？"</li>
                    <li>"数据从哪里来？质量如何保证？"</li>
                    <li>"上线后谁负责监控？出了问题怎么处理？"</li>
                    <li>"这个功能的维护成本是多少？"</li>
                </ul>
            </div>
            
            <div class="lesson-section">
                <h3>🚀 灰度发布策略</h3>
                <p class="lesson-text"><strong>灰度阶段：</strong></p>
                <ul class="lesson-list">
                    <li><strong>内部测试：</strong>1%用户，收集反馈</li>
                    <li><strong>小规模测试：</strong>5%用户，验证效果</li>
                    <li><strong>中等规模：</strong>20%用户，优化体验</li>
                    <li><strong>全量发布：</strong>100%用户，持续监控</li>
                </ul>
                <p class="lesson-text" style="margin-top:8px"><strong>灰度监控指标：</strong></p>
                <ul class="lesson-list">
                    <li>核心指标：转化率、留存率是否提升？</li>
                    <li>风险指标：错误率、投诉率是否上升？</li>
                    <li>性能指标：响应时间、并发能力是否达标？</li>
                </ul>
            </div>
            
            <div class="lesson-section">
                <h3>⚠️ 风险控制清单</h3>
                <p class="lesson-text"><strong>技术风险：</strong></p>
                <ul class="lesson-list">
                    <li>模型效果不达预期 → 降级方案</li>
                    <li>系统崩溃 → 熔断机制</li>
                    <li>数据泄露 → 加密措施</li>
                </ul>
                <p class="lesson-text" style="margin-top:8px"><strong>业务风险：</strong></p>
                <ul class="lesson-list">
                    <li>用户不接受 → 教育引导</li>
                    <li>竞品抄袭 → 快速迭代</li>
                    <li>政策变化 → 合规审查</li>
                </ul>
            </div>
            
            <div class="quiz-section">
                <h3>🧠 思考题</h3>
                <div class="quiz-question">AI功能灰度期间发现准确率只有85%，低于预期的95%，你怎么办？</div>
                <div class="quiz-options" id="quiz6">
                    <div class="quiz-option" onclick="checkQuiz('quiz6', this, false)">A. 立即全量上线，边用边优化</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz6', this, false)">B. 关闭功能，重新开发</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz6', this, true)">C. 分析错误case，判断是数据问题还是模型问题，针对性优化</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz6', this, false)">D. 等工程师修好再上线</div>
                </div>
                <div class="quiz-feedback" id="quiz6-feedback"></div>
            </div>
        `,
        quiz: { answer: 2, feedback: "正确！发现问题先诊断原因：是训练数据不足？标注质量差？还是模型选型不对？针对性优化比盲目重做更高效。同时可以降低灰度比例，控制风险。" }
    },
    {
        day: 7,
        title: "AI产品商业思维进阶",
        desc: "商业模式、竞争壁垒、职业规划",
        icon: "🌟",
        duration: "65分钟",
        videos: [],
        content: `
            <div class="lesson-section">
                <h3>📖 今日学习目标</h3>
                <p class="lesson-text">建立<strong>商业思维</strong>，理解AI产品的商业模式、竞争壁垒和职业发展路径。</p>
            </div>
            
            <div class="lesson-section">
                <h3>💡 AI商业模式解析</h3>
                <p class="lesson-text"><strong>模式一：AI即服务（AIaaS）</strong></p>
                <p class="lesson-text" style="margin-left:16px">按调用次数收费，如OpenAI API</p>
                <p class="lesson-text" style="margin-left:16px">优势：门槛低、规模效应强</p>
                <p class="lesson-text" style="margin-left:16px">挑战：价格战激烈、客户粘性低</p>
                <p class="lesson-text" style="margin-top:8px"><strong>模式二：AI+产品</strong></p>
                <p class="lesson-text" style="margin-left:16px">AI作为产品核心功能，如ChatGPT</p>
                <p class="lesson-text" style="margin-left:16px">优势：用户体验好、壁垒高</p>
                <p class="lesson-text" style="margin-left:16px">挑战：开发成本高、需要持续投入</p>
                <p class="lesson-text" style="margin-top:8px"><strong>模式三：AI赋能传统业务</strong></p>
                <p class="lesson-text" style="margin-left:16px">用AI提升传统业务效率，如智能客服</p>
                <p class="lesson-text" style="margin-left:16px">优势：需求明确、ROI可计算</p>
                <p class="lesson-text" style="margin-left:16px">挑战：变革阻力大、效果难以量化</p>
            </div>
            
            <div class="lesson-section">
                <h3>🏰 竞争壁垒构建</h3>
                <p class="lesson-text"><strong>数据壁垒：</strong>独有的高质量数据</p>
                <p class="lesson-text" style="margin-left:16px">案例：特斯拉的自动驾驶数据</p>
                <p class="lesson-text" style="margin-top:8px"><strong>算法壁垒：</strong>领先的模型效果</p>
                <p class="lesson-text" style="margin-left:16px">案例：OpenAI的GPT系列</p>
                <p class="lesson-text" style="margin-top:8px"><strong>场景壁垒：</strong>深度理解行业需求</p>
                <p class="lesson-text" style="margin-left:16px">案例：医疗AI对病历的理解</p>
                <p class="lesson-text" style="margin-top:8px"><strong>生态壁垒：</strong>建立开发者和用户生态</p>
                <p class="lesson-text" style="margin-left:16px">案例：苹果的App Store生态</p>
            </div>
            
            <div class="lesson-section">
                <h3>📈 职业发展建议</h3>
                <p class="lesson-text"><strong>短期（1-2年）：</strong></p>
                <ul class="lesson-list">
                    <li>深耕一个AI领域（NLP/CV/推荐）</li>
                    <li>积累2-3个完整项目经验</li>
                    <li>建立技术判断力和商业嗅觉</li>
                </ul>
                <p class="lesson-text" style="margin-top:8px"><strong>中期（3-5年）：</strong></p>
                <ul class="lesson-list">
                    <li>扩展到多个AI领域</li>
                    <li>培养团队管理能力</li>
                    <li>建立行业影响力</li>
                </ul>
                <p class="lesson-text" style="margin-top:8px"><strong>长期（5年+）：</strong></p>
                <ul class="lesson-list">
                    <li>成为AI产品专家或创业者</li>
                    <li>投资AI领域</li>
                    <li>推动AI产业发展</li>
                </ul>
            </div>
            
            <div class="quiz-section">
                <h3>🧠 毕业思考题</h3>
                <div class="quiz-question">作为AI产品经理，你认为最重要的能力是什么？</div>
                <div class="quiz-options" id="quiz7">
                    <div class="quiz-option" onclick="checkQuiz('quiz7', this, false)">A. 懂技术</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz7', this, false)">B. 懂用户</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz7', this, true)">C. 懂商业，用AI创造价值</div>
                    <div class="quiz-option" onclick="checkQuiz('quiz7', this, false)">D. 懂管理</div>
                </div>
                <div class="quiz-feedback" id="quiz7-feedback"></div>
            </div>
        `,
        quiz: { answer: 2, feedback: "恭喜完成所有课程！记住：技术是手段，用户是目的，商业是检验标准。AI产品经理的核心价值是用AI创造商业价值，这才是不可替代的能力。" }
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

function renderCourseList() {
    const el = document.getElementById('courseList');
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

function updateProgressOverview() {
    const completed = progress.completed.length;
    const percent = Math.round((completed / 7) * 100);
    document.getElementById('progressPercent').textContent = percent;
    document.getElementById('completedDays').textContent = completed;
    document.getElementById('streakCount').textContent = progress.streak;
    document.getElementById('totalStars').textContent = progress.stars;
    const ring = document.getElementById('progressRing');
    const circumference = 283;
    const offset = circumference - (percent / 100) * circumference;
    ring.style.strokeDashoffset = offset;
}

function openDay(day) {
    const course = COURSES.find(c => c.day === day);
    if (!course) return;
    const modal = document.getElementById('dayModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    title.textContent = `Day ${course.day}: ${course.title}`;
    let html = course.content;
    const validVideos = course.videos.filter(v => v.url && !v.url.includes('example'));
    if (validVideos.length > 0) {
        html += `<div class="lesson-section"><h3>🎬 推荐视频</h3>${validVideos.map(v => `<a href="${v.url}" target="_blank" class="video-card"><div class="video-thumb">${v.type === 'bilibili' ? '📺' : '▶️'}</div><div class="video-info"><div class="video-title">${v.title}</div><div class="video-source">${v.source}</div></div></a>`).join('')}</div>`;
    }
    const isCompleted = progress.completed.includes(day);
    html += `<div class="checkin-section"><button class="checkin-btn ${isCompleted ? 'completed' : ''}" onclick="completeDay(${day})">${isCompleted ? '✅ 已完成' : '✓ 完成今日学习'}</button></div>`;
    body.innerHTML = html;
    modal.classList.remove('hidden');
}

function completeDay(day) {
    if (!progress.completed.includes(day)) {
        progress.completed.push(day);
        progress.stars += 3;
        progress.streak = progress.completed.length;
        localStorage.setItem('ai_pm_progress', JSON.stringify(progress));
        renderCourseList();
        updateProgressOverview();
        showReward(day);
    }
}

function showReward(day) {
    const popup = document.createElement('div');
    popup.className = 'reward-popup';
    popup.innerHTML = `<div class="reward-icon">🎉</div><div class="reward-title">恭喜完成 Day ${day}!</div><div class="reward-text">获得 ⭐⭐⭐ 3颗星</div>`;
    document.body.appendChild(popup);
    setTimeout(() => { popup.remove(); document.getElementById('dayModal').classList.add('hidden'); }, 2000);
}

function checkQuiz(quizId, option, isCorrect) {
    const container = document.getElementById(quizId);
    const feedback = document.getElementById(`${quizId}-feedback`);
    container.querySelectorAll('.quiz-option').forEach(opt => { opt.style.pointerEvents = 'none'; });
    if (isCorrect) {
        option.classList.add('correct');
        feedback.textContent = '✅ 正确！' + getQuizFeedback(quizId);
        feedback.className = 'quiz-feedback show correct';
        progress.stars += 1;
        localStorage.setItem('ai_pm_progress', JSON.stringify(progress));
    } else {
        option.classList.add('wrong');
        container.querySelectorAll('.quiz-option').forEach((opt, index) => {
            if (getCorrectIndex(quizId) === index) { opt.classList.add('correct'); }
        });
        feedback.textContent = '❌ 再想想！正确答案已标绿。';
        feedback.className = 'quiz-feedback show wrong';
    }
}

function getQuizFeedback(quizId) {
    const feedbacks = {
        quiz1: ' AI产品经理要先诊断问题，再找解决方案。',
        quiz2: ' 95%准确率是否可接受取决于场景和风险等级。',
        quiz3: ' 要综合计算ROI，还要考虑数据和团队能力。',
        quiz4: ' 好的设计是让用户参与改进AI。',
        quiz5: ' 技术指标提升不代表业务价值提升。',
        quiz6: ' 发现问题先诊断原因，针对性优化。',
        quiz7: ' 商业思维是AI产品经理的核心竞争力。'
    };
    return feedbacks[quizId] || '';
}

function getCorrectIndex(quizId) {
    const correct = { quiz1: 2, quiz2: 1, quiz3: 2, quiz4: 1, quiz5: 1, quiz6: 2, quiz7: 2 };
    return correct[quizId] || 0;
}

function initModal() {
    document.getElementById('modalClose').addEventListener('click', () => { document.getElementById('dayModal').classList.add('hidden'); });
    document.getElementById('dayModal').addEventListener('click', (e) => { if (e.target.id === 'dayModal') { document.getElementById('dayModal').classList.add('hidden'); } });
}

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
            setTimeout(() => { document.getElementById('copyBtn').textContent = '复制链接'; }, 2000);
        });
    });
    document.getElementById('shareModal').addEventListener('click', (e) => { if (e.target.id === 'shareModal') { document.getElementById('shareModal').classList.add('hidden'); } });
}
// ===== 技能模块初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    if (typeof renderSkillModules === 'function') {
        renderSkillModules();
    }
});
