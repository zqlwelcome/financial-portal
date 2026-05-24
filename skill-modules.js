/**
 * AI产品经理四大能力模块 - 深度版
 * 基于招聘需求设计，覆盖面试核心考点
 */

const SKILL_MODULES = {
    tech: {
        title: "技术理解力",
        icon: "🎯",
        subtitle: "不懂代码，但要懂AI的边界和成本",
        jobRequirements: [
            "理解机器学习/深度学习基本原理",
            "了解大模型（LLM）的能力与局限",
            "能评估AI方案的技术可行性",
            "理解数据需求和模型训练流程",
            "能与算法工程师有效沟通"
        ],
        lessons: [
            {
                title: "AI技术原理速成",
                content: `
                    <div class="lesson-block">
                        <h4>🧠 机器学习三要素</h4>
                        <p><strong>数据 + 算法 + 算力 = 模型</strong></p>
                        <p style="margin-top:8px">通俗理解：就像教小孩认字——给他看很多例子（数据），他慢慢总结规律（算法），最终学会认字（模型）。</p>
                        <div class="key-point">
                            <strong>面试考点：</strong>面试官会问"机器学习和传统编程有什么区别？"<br>
                            <strong>标准答案：</strong>传统编程是人写规则让机器执行，机器学习是让机器从数据中自己学规则。
                        </div>
                    </div>
                    <div class="lesson-block">
                        <h4>📊 监督学习 vs 无监督学习</h4>
                        <p><strong>监督学习：</strong>有标签的数据训练（如：给图片打标签"猫/狗"）</p>
                        <p><strong>无监督学习：</strong>无标签的数据聚类（如：用户分群）</p>
                        <p><strong>面试考点：</strong>"如果我有100万张图片但没有标签，怎么训练AI识别？"</p>
                        <p><strong>答案思路：</strong>可以用无监督学习做预训练，或者用少量标注数据做迁移学习。</p>
                    </div>
                    <div class="lesson-block">
                        <h4>🤖 大模型（LLM）本质</h4>
                        <p><strong>核心原理：</strong>预测下一个词的概率分布</p>
                        <p><strong>能力：</strong>文本生成、对话、代码、推理</p>
                        <p><strong>局限：</strong></p>
                        <ul>
                            <li>会"幻觉"——一本正经胡说八道</li>
                            <li>知识有截止日期——不知道最新新闻</li>
                            <li>计算能力弱——不是计算器</li>
                            <li>推理链条长——容易出错</li>
                        </ul>
                        <p><strong>面试考点：</strong>"大模型和传统NLP模型有什么区别？"</p>
                        <p><strong>答案：</strong>大模型是预训练的通用模型，可以通过Prompt适应各种任务；传统NLP模型需要针对每个任务单独训练。</p>
                    </div>
                `
            },
            {
                title: "技术选型决策框架",
                content: `
                    <div class="lesson-block">
                        <h4>⚡ 决策树：用规则还是AI？</h4>
                        <p><strong>用规则的场景：</strong></p>
                        <ul>
                            <li>逻辑明确、可穷举</li>
                            <li>数据量少</li>
                            <li>要求100%准确</li>
                            <li>实时性要求高</li>
                        </ul>
                        <p><strong>用AI的场景：</strong></p>
                        <ul>
                            <li>逻辑复杂、难以穷举</li>
                            <li>数据量大</li>
                            <li>允许一定错误率</li>
                            <li>需要从数据中发现规律</li>
                        </ul>
                    </div>
                    <div class="lesson-block">
                        <h4>💰 成本计算器</h4>
                        <p><strong>AI项目成本构成：</strong></p>
                        <p>1. 数据成本：采集、清洗、标注（占30-50%）</p>
                        <p>2. 训练成本：GPU算力、人力</p>
                        <p>3. 推理成本：每次API调用都花钱</p>
                        <p>4. 运维成本：监控、更新、迭代</p>
                        <p><strong>面试考点：</strong>"老板问你这个AI项目要花多少钱，你怎么估算？"</p>
                        <p><strong>答案框架：</strong>先估算数据成本（数据量×单价），再估算训练成本（GPU小时×单价），最后估算推理成本（预估调用量×单次成本）。</p>
                    </div>
                    <div class="lesson-block">
                        <h4>🔧 技术方案评审清单</h4>
                        <p><strong>评审前必问问题：</strong></p>
                        <ul>
                            <li>数据从哪里来？质量如何？</li>
                            <li>模型选型依据是什么？</li>
                            <li>准确率要求是多少？如何验证？</li>
                            <li>推理延迟要求是多少？</li>
                            <li>上线后谁负责监控和迭代？</li>
                        </ul>
                    </div>
                `
            },
            {
                title: "与工程师沟通的语言",
                content: `
                    <div class="lesson-block">
                        <h4>🗣️ 翻译需求的艺术</h4>
                        <p><strong>错误示范：</strong>"我们要做一个AI推荐功能"</p>
                        <p><strong>正确示范：</strong></p>
                        <ul>
                            <li>目标：提升首页点击率10%</li>
                            <li>用户：日活100万的电商APP用户</li>
                            <li>输入：用户浏览/购买历史</li>
                            <li>输出：5个个性化商品推荐</li>
                            <li>约束：响应时间<200ms，成本<0.01元/次</li>
                        </ul>
                    </div>
                    <div class="lesson-block">
                        <h4>📋 PRD技术章节模板</h4>
                        <p><strong>1. 数据需求：</strong></p>
                        <ul>
                            <li>需要哪些数据字段？</li>
                            <li>数据量级是多少？</li>
                            <li>数据更新频率？</li>
                        </ul>
                        <p><strong>2. 模型需求：</strong></p>
                        <ul>
                            <li>准确率/召回率目标？</li>
                            <li>响应时间要求？</li>
                            <li>并发量要求？</li>
                        </ul>
                        <p><strong>3. 评估标准：</strong></p>
                        <ul>
                            <li>离线评估指标？</li>
                            <li>在线AB测试方案？</li>
                            <li>上线后监控指标？</li>
                        </ul>
                    </div>
                `
            }
        ],
        interviewQuestions: [
            {
                q: "机器学习和传统编程有什么区别？",
                a: "传统编程是人写规则让机器执行，机器学习是让机器从数据中自己学规则。传统编程适合逻辑明确的场景，机器学习适合逻辑复杂、需要从数据中发现规律的场景。"
            },
            {
                q: "什么是过拟合？如何避免？",
                a: "过拟合是模型在训练数据上表现很好，但在新数据上表现很差。避免方法：1）增加训练数据量；2）使用正则化；3）交叉验证；4）简化模型复杂度；5）早停策略。"
            },
            {
                q: "如何评估一个AI方案的ROI？",
                a: "ROI = (收益 - 成本) / 成本 × 100%。收益包括：节省人力、提高转化、减少流失等。成本包括：数据成本、训练成本、推理成本、运维成本。还要考虑机会成本。"
            }
        ]
    },
    data: {
        title: "数据思维",
        icon: "📊",
        subtitle: "用数据说话，不拍脑袋决策",
        jobRequirements: [
            "能设计合理的数据指标体系",
            "能搭建AB测试框架",
            "能分析数据找到问题根源",
            "能用数据证明产品价值",
            "理解数据质量和数据治理"
        ],
        lessons: [
            {
                title: "三层指标体系搭建",
                content: `
                    <div class="lesson-block">
                        <h4>📊 指标金字塔</h4>
                        <p><strong>第一层：北极星指标</strong>（公司级）</p>
                        <p>如：GMV、DAU、营收</p>
                        <p><strong>第二层：驱动指标</strong>（产品级）</p>
                        <p>如：转化率、留存率、客单价</p>
                        <p><strong>第三层：过程指标</strong>（功能级）</p>
                        <p>如：点击率、使用率、完成率</p>
                        <p><strong>面试考点：</strong>"如何设计AI功能的指标体系？"</p>
                    </div>
                    <div class="lesson-block">
                        <h4>🎯 AI功能指标设计</h4>
                        <p><strong>技术指标（工程师看）：</strong></p>
                        <ul>
                            <li>准确率、召回率、F1</li>
                            <li>响应时间、吞吐量</li>
                        </ul>
                        <p><strong>业务指标（老板看）：</strong></p>
                        <ul>
                            <li>转化率提升、留存率提升</li>
                            <li>成本节省、效率提升</li>
                        </ul>
                        <p><strong>体验指标（用户看）：</strong></p>
                        <ul>
                            <li>满意度、NPS</li>
                            <li>使用率、完成率</li>
                        </ul>
                    </div>
                    <div class="lesson-block">
                        <h4>🔗 指标挂钩方法</h4>
                        <p><strong>关键：</strong>技术指标要能解释业务指标的变化</p>
                        <p><strong>案例：</strong>推荐系统准确率从80%提升到90%，点击率从5%提升到7%。</p>
                        <p><strong>分析：</strong>准确率提升10%，带来点击率提升40%，说明推荐质量是核心驱动因素。</p>
                    </div>
                `
            },
            {
                title: "AB测试实战方法论",
                content: `
                    <div class="lesson-block">
                        <h4>🔬 AB测试四步法</h4>
                        <p><strong>Step 1：假设</strong></p>
                        <p>例："AI推荐能提升点击率10%"</p>
                        <p><strong>Step 2：设计</strong></p>
                        <ul>
                            <li>对照组：规则推荐</li>
                            <li>实验组：AI推荐</li>
                            <li>样本量：各50%用户</li>
                            <li>运行时间：1-2周</li>
                        </ul>
                        <p><strong>Step 3：执行</strong></p>
                        <p>确保两组用户特征相似（随机分流）</p>
                        <p><strong>Step 4：分析</strong></p>
                        <p>统计显著性检验（p-value < 0.05）</p>
                    </div>
                    <div class="lesson-block">
                        <h4>⚠️ AB测试常见陷阱</h4>
                        <ul>
                            <li><strong>样本量不够：</strong>结论不可靠</li>
                            <li><strong>时间太短：</strong>可能错过长期效应</li>
                            <li><strong>分流不均：</strong>两组用户特征差异大</li>
                            <li><strong>指标选择错：</strong>提升的不是核心指标</li>
                        </ul>
                    </div>
                `
            },
            {
                title: "数据分析框架",
                content: `
                    <div class="lesson-block">
                        <h4>📈 漏斗分析</h4>
                        <p><strong>目的：</strong>找到用户流失的关键环节</p>
                        <p><strong>案例：</strong></p>
                        <p>曝光 100万 → 点击 10万(10%) → 使用 5万(50%) → 留存 2万(40%)</p>
                        <p><strong>问题：</strong>点击率只有10%，可能是推荐不准或标题不吸引人</p>
                    </div>
                    <div class="lesson-block">
                        <h4>🔍 归因分析</h4>
                        <p><strong>目的：</strong>判断AI贡献了多少价值</p>
                        <p><strong>方法：</strong></p>
                        <ul>
                            <li>有AI时转化率5%</li>
                            <li>无AI时转化率3%</li>
                            <li>AI贡献 = (5%-3%)/3% = 67%提升</li>
                        </ul>
                    </div>
                    <div class="lesson-block">
                        <h4>👥 Cohort分析</h4>
                        <p><strong>目的：</strong>观察不同用户群体的行为差异</p>
                        <p><strong>案例：</strong></p>
                        <ul>
                            <li>新用户AI功能使用率30%</li>
                            <li>老用户AI功能使用率60%</li>
                            <li>结论：需要优化新用户引导</li>
                        </ul>
                    </div>
                `
            }
        ],
        interviewQuestions: [
            {
                q: "如何设计一个AI功能的AB测试？",
                a: "1）明确假设：AI功能能提升XX指标X%；2）设计实验：随机分流50/50；3）确定指标：核心指标+护栏指标；4）计算样本量；5）运行1-2周；6）统计分析，p<0.05才显著。"
            },
            {
                q: "AI功能准确率提升了，但业务指标没变，怎么分析？",
                a: "1）检查指标是否选对；2）分析是否90%准确率已经够用；3）检查是否其他环节是瓶颈（如响应速度、交互体验）；4）检查用户是否感知到差异；5）做用户调研了解真实感受。"
            },
            {
                q: "如何用数据证明AI功能的价值？",
                a: "1）对比有/无AI的业务指标差异；2）计算ROI：(收益-成本)/成本；3）展示用户行为变化；4）收集用户反馈；5）长期跟踪留存和复购。"
            }
        ]
    },
    design: {
        title: "产品设计力",
        icon: "💡",
        subtitle: "把AI能力变成用户喜欢的产品",
        jobRequirements: [
            "能设计AI产品的交互流程",
            "能处理AI的不确定性体验",
            "能设计降级策略和容错机制",
            "能优化用户体验",
            "理解人机协作模式"
        ],
        lessons: [
            {
                title: "不确定性交互设计",
                content: `
                    <div class="lesson-block">
                        <h4>🎲 AI产品的核心挑战</h4>
                        <p><strong>问题：</strong>AI输出是概率性的，不是确定性的</p>
                        <p><strong>用户习惯：</strong>"输入A一定得到B"</p>
                        <p><strong>设计目标：</strong>让用户接受并信任不确定性</p>
                    </div>
                    <div class="lesson-block">
                        <h4>✨ 设计策略</h4>
                        <ul>
                            <li><strong>预期管理：</strong>"AI可能不完美，但会越来越好"</li>
                            <li><strong>置信度展示：</strong>"AI认为这个答案有80%把握"</li>
                            <li><strong>多选项呈现：</strong>给3-5个候选，让用户选择</li>
                            <li><strong>反馈闭环：</strong>让用户纠正AI错误，持续改进</li>
                        </ul>
                        <p><strong>面试考点：</strong>"如何让用户信任AI的推荐？"</p>
                        <p><strong>答案：</strong>1）展示推荐理由；2）提供反馈按钮；3）记录反馈持续优化；4）允许用户调整推荐偏好。</p>
                    </div>
                `
            },
            {
                title: "降级策略设计",
                content: `
                    <div class="lesson-block">
                        <h4>🛡️ 为什么要降级？</h4>
                        <p><strong>原因：</strong>AI可能失败（网络超时、模型错误、内容违规）</p>
                        <p><strong>目标：</strong>确保用户体验不中断</p>
                    </div>
                    <div class="lesson-block">
                        <h4>📊 降级层级设计</h4>
                        <p><strong>L1 - AI完全可用：</strong>正常展示AI结果</p>
                        <p><strong>L2 - AI部分可用：</strong>展示AI结果+提示"仅供参考"</p>
                        <p><strong>L3 - AI不可用：</strong>展示规则结果或历史数据</p>
                        <p><strong>L4 - 完全不可用：</strong>展示默认内容+联系客服</p>
                        <p><strong>面试考点：</strong>"AI服务挂了怎么办？"</p>
                        <p><strong>答案：</strong>1）设置超时机制；2）降级到规则引擎；3）展示缓存结果；4）通知用户并提供人工入口。</p>
                    </div>
                `
            },
            {
                title: "人机协作模式",
                content: `
                    <div class="lesson-block">
                        <h4>🤝 三种协作模式</h4>
                        <p><strong>模式一：AI辅助人</strong></p>
                        <p>人做决策，AI提供信息</p>
                        <p>案例：AI辅助诊断，医生做最终判断</p>
                        <p><strong>模式二：人监督AI</strong></p>
                        <p>AI执行，人监控</p>
                        <p>案例：自动驾驶，人随时准备接管</p>
                        <p><strong>模式三：AI完全自主</strong></p>
                        <p>人设定目标，AI自主完成</p>
                        <p>案例：智能客服处理标准问题</p>
                    </div>
                    <div class="lesson-block">
                        <h4>⚡ 选择依据</h4>
                        <p><strong>风险高 + 用户敏感 → 模式一</strong></p>
                        <p><strong>风险中 + 效率优先 → 模式二</strong></p>
                        <p><strong>风险低 + 标准化 → 模式三</strong></p>
                    </div>
                `
            }
        ],
        interviewQuestions: [
            {
                q: "如何设计AI产品的错误处理流程？",
                a: "1）预测可能的错误类型；2）设计降级策略（L1-L4）；3）友好的错误提示；4）提供替代方案；5）人工入口；6）记录错误用于优化。"
            },
            {
                q: "如何让用户信任AI的推荐？",
                a: "1）展示推荐理由和依据；2）提供反馈按钮；3）记录反馈持续优化；4）允许用户调整偏好；5）透明告知AI的局限性。"
            },
            {
                q: "如何设计AI功能的加载体验？",
                a: "1）流式输出（打字机效果）；2）进度提示；3）预估时间；4）骨架屏；5）可中断操作。"
            }
        ]
    },
    collaboration: {
        title: "跨团队协作",
        icon: "🤝",
        subtitle: "搞定算法、工程、业务各路人马",
        jobRequirements: [
            "能与算法团队有效沟通",
            "能推动项目从方案到上线",
            "能管理AI项目风险",
            "能协调跨部门资源",
            "能向老板汇报AI价值"
        ],
        lessons: [
            {
                title: "与算法团队沟通",
                content: `
                    <div class="lesson-block">
                        <h4>🗣️ 翻译需求的艺术</h4>
                        <p><strong>错误示范：</strong>"我们要做一个AI推荐功能"</p>
                        <p><strong>正确示范：</strong></p>
                        <ul>
                            <li>业务目标：提升首页点击率10%</li>
                            <li>用户画像：日活100万电商用户</li>
                            <li>输入数据：用户浏览/购买历史</li>
                            <li>输出形式：5个个性化商品推荐</li>
                            <li>性能要求：响应时间<200ms</li>
                            <li>成本约束：单次调用<0.01元</li>
                        </ul>
                    </div>
                    <div class="lesson-block">
                        <h4>📋 技术评审准备</h4>
                        <p><strong>评审前必问：</strong></p>
                        <ul>
                            <li>数据从哪里来？质量如何？</li>
                            <li>模型选型依据是什么？</li>
                            <li>准确率目标是多少？如何验证？</li>
                            <li>推理成本预估是多少？</li>
                            <li>上线后谁负责监控和迭代？</li>
                        </ul>
                    </div>
                `
            },
            {
                title: "项目管理实战",
                content: `
                    <div class="lesson-block">
                        <h4>📅 AI项目Timeline</h4>
                        <p><strong>Week 1-2：</strong>需求确认 + 数据准备</p>
                        <p><strong>Week 3-4：</strong>模型开发 + 离线评估</p>
                        <p><strong>Week 5-6：</strong>系统集成 + AB测试设计</p>
                        <p><strong>Week 7-8：</strong>灰度发布 + 效果验证</p>
                        <p><strong>Week 9+：</strong>全量上线 + 持续优化</p>
                    </div>
                    <div class="lesson-block">
                        <h4>⚠️ 风险控制清单</h4>
                        <p><strong>技术风险：</strong>模型效果不达标 → 降级方案</p>
                        <p><strong>数据风险：</strong>数据质量差 → 数据清洗流程</p>
                        <p><strong>进度风险：</strong>开发延期 → 并行开发策略</p>
                        <p><strong>成本风险：</strong>超预算 → MVP先验证</p>
                    </div>
                `
            },
            {
                title: "向老板汇报AI价值",
                content: `
                    <div class="lesson-block">
                        <h4>📊 汇报框架：STAR法则</h4>
                        <p><strong>Situation：</strong>背景是什么？</p>
                        <p><strong>Task：</strong>我们要解决什么问题？</p>
                        <p><strong>Action：</strong>我们做了什么AI功能？</p>
                        <p><strong>Result：</strong>带来了什么业务价值？</p>
                    </div>
                    <div class="lesson-block">
                        <h4>💰 ROI展示技巧</h4>
                        <p><strong>量化价值：</strong></p>
                        <ul>
                            <li>节省人力：每月节省XX人天</li>
                            <li>提升转化：转化率从X%提升到Y%</li>
                            <li>减少流失：留存率提升X%</li>
                        </ul>
                        <p><strong>对比展示：</strong></p>
                        <ul>
                            <li>有AI vs 无AI的指标对比</li>
                            <li>投入产出比（ROI）</li>
                        </ul>
                    </div>
                `
            }
        ],
        interviewQuestions: [
            {
                q: "如何推动一个AI项目从方案到上线？",
                a: "1）需求确认和优先级排序；2）数据准备和质量评估；3）技术方案评审；4）开发和离线评估；5）AB测试设计和执行；6）灰度发布和监控；7）全量上线和持续优化。"
            },
            {
                q: "如何向非技术背景的老板解释AI价值？",
                a: "用STAR法则：Situation（背景）- Task（任务）- Action（行动）- Result（结果）。重点量化业务价值：节省多少成本、提升多少效率、增加多少收入。用对比数据说话。"
            },
            {
                q: "AI项目延期了怎么办？",
                a: "1）分析延期原因（数据问题？技术问题？需求变更？）；2）评估影响范围；3）制定补救方案（砍功能？加资源？调整时间线？）；4）及时沟通风险；5）总结经验教训。"
            }
        ]
    }
};

// ===== State =====
let currentModule = null;
let currentLesson = 0;

// ===== 渲染技能模块列表 =====
function renderSkillModules() {
    const el = document.getElementById('pmContent');
    if (!el) return;
    
    el.innerHTML = `
        <div class="skill-modules">
            ${Object.entries(SKILL_MODULES).map(([key, mod]) => `
                <div class="skill-module" onclick="openSkillModule('${key}')">
                    <div class="sm-icon">${mod.icon}</div>
                    <div class="sm-info">
                        <div class="sm-title">${mod.title}</div>
                        <div class="sm-subtitle">${mod.subtitle}</div>
                    </div>
                    <div class="sm-arrow">›</div>
                </div>
            `).join('')}
        </div>
    `;
}

// ===== 打开技能模块详情 =====
function openSkillModule(moduleKey) {
    currentModule = SKILL_MODULES[moduleKey];
    currentLesson = 0;
    renderModuleDetail();
}

// ===== 渲染模块详情 =====
function renderModuleDetail() {
    if (!currentModule) return;
    
    const modal = document.getElementById('dayModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    
    title.textContent = `${currentModule.icon} ${currentModule.title}`;
    
    let html = `
        <div class="module-header">
            <div class="mh-subtitle">${currentModule.subtitle}</div>
        </div>
        
        <div class="job-requirements">
            <h4>📋 岗位要求覆盖</h4>
            <ul>
                ${currentModule.jobRequirements.map(req => `<li>${req}</li>`).join('')}
            </ul>
        </div>
        
        <div class="lesson-nav">
            ${currentModule.lessons.map((lesson, index) => `
                <button class="lesson-btn ${index === currentLesson ? 'active' : ''}" onclick="switchLesson(${index})">
                    ${index + 1}. ${lesson.title}
                </button>
            `).join('')}
        </div>
        
        <div class="lesson-content">
            ${currentModule.lessons[currentLesson].content}
        </div>
        
        <div class="interview-section">
            <h4>🎤 面试高频问题</h4>
            ${currentModule.interviewQuestions.map(qa => `
                <div class="qa-item">
                    <div class="qa-question">Q: ${qa.q}</div>
                    <div class="qa-answer">A: ${qa.a}</div>
                </div>
            `).join('')}
        </div>
    `;
    
    body.innerHTML = html;
    modal.classList.remove('hidden');
}

// ===== 切换课程 =====
function switchLesson(index) {
    currentLesson = index;
    renderModuleDetail();
}

// 导出到全局
window.renderSkillModules = renderSkillModules;
window.openSkillModule = openSkillModule;
window.switchLesson = switchLesson;
