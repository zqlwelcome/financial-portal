/**
 * AI产品经理课程数据
 */

const COURSE_DATA = [
    {
        id: 'indicator',
        title: 'AI产品指标体系',
        icon: '📊',
        iconClass: 'icon-purple',
        subtitle: '搭建数据驱动的决策框架',
        lessons: [
            {
                id: 'ind-1',
                title: '三层指标体系设计',
                duration: '30分钟',
                content: `
                    <div class="lesson-block">
                        <h4>📊 指标金字塔</h4>
                        <p><strong>第一层：北极星指标</strong>（公司级）</p>
                        <p>如：GMV、DAU、营收 - 这是最终目标</p>
                        <p><strong>第二层：驱动指标</strong>（产品级）</p>
                        <p>如：转化率、留存率、客单价 - 这些驱动北极星</p>
                        <p><strong>第三层：过程指标</strong>（功能级）</p>
                        <p>如：点击率、使用率、完成率 - 这些驱动驱动指标</p>
                        <div class="key-point">
                            <strong>面试考点：</strong>"如何设计AI功能的指标体系？"<br>
                            <strong>答案：</strong>从北极星指标倒推，找到AI功能能影响的驱动指标，再设计过程指标。
                        </div>
                    </div>
                    <div class="lesson-block">
                        <h4>🎯 AI功能指标分类</h4>
                        <p><strong>技术指标（工程师看）：</strong>准确率、召回率、F1、响应时间</p>
                        <p><strong>业务指标（老板看）：</strong>转化率提升、留存率提升、成本节省</p>
                        <p><strong>体验指标（用户看）：</strong>满意度、NPS、使用率、完成率</p>
                    </div>
                `
            },
            {
                id: 'ind-2',
                title: 'AB测试实战方法',
                duration: '35分钟',
                content: `
                    <div class="lesson-block">
                        <h4>🔬 AB测试四步法</h4>
                        <p><strong>Step 1：假设</strong> - "AI推荐能提升点击率10%"</p>
                        <p><strong>Step 2：设计</strong> - 50%用户用AI推荐，50%用规则推荐</p>
                        <p><strong>Step 3：执行</strong> - 运行1-2周，收集数据</p>
                        <p><strong>Step 4：分析</strong> - 统计显著性检验（p-value < 0.05）</p>
                        <div class="key-point">
                            <strong>常见陷阱：</strong>样本量不够、时间太短、分流不均、指标选错
                        </div>
                    </div>
                `
            },
            {
                id: 'ind-3',
                title: '数据分析框架',
                duration: '30分钟',
                content: `
                    <div class="lesson-block">
                        <h4>📈 三种分析方法</h4>
                        <p><strong>漏斗分析：</strong>找到用户流失的关键环节</p>
                        <p>曝光100万 → 点击10万(10%) → 使用5万(50%) → 留存2万(40%)</p>
                        <p><strong>归因分析：</strong>判断AI贡献了多少价值</p>
                        <p>有AI转化率5%，无AI转化率3%，AI贡献67%提升</p>
                        <p><strong>Cohort分析：</strong>观察不同用户群体的行为差异</p>
                        <p>新用户使用率30%，老用户60%，需要优化新用户引导</p>
                    </div>
                `
            }
        ]
    },
    {
        id: 'tech',
        title: '技术理解力',
        icon: '🎯',
        iconClass: 'icon-blue',
        subtitle: '不懂代码，但要懂AI的边界和成本',
        lessons: [
            {
                id: 'tech-1',
                title: 'AI技术原理速成',
                duration: '35分钟',
                content: `
                    <div class="lesson-block">
                        <h4>🧠 机器学习三要素</h4>
                        <p><strong>数据 + 算法 + 算力 = 模型</strong></p>
                        <p>就像教小孩认字——给他看很多例子（数据），他慢慢总结规律（算法），最终学会认字（模型）。</p>
                        <div class="key-point">
                            <strong>面试考点：</strong>"机器学习和传统编程有什么区别？"<br>
                            <strong>答案：</strong>传统编程是人写规则让机器执行，机器学习是让机器从数据中自己学规则。
                        </div>
                    </div>
                    <div class="lesson-block">
                        <h4>🤖 大模型能力边界</h4>
                        <p><strong>能做：</strong>文本生成、对话、代码、推理</p>
                        <p><strong>不能做：</strong>精确计算、实时信息、100%准确、复杂推理</p>
                    </div>
                `
            },
            {
                id: 'tech-2',
                title: '技术选型决策框架',
                duration: '30分钟',
                content: `
                    <div class="lesson-block">
                        <h4>⚡ 用规则还是AI？</h4>
                        <p><strong>用规则：</strong>逻辑明确、数据少、要求100%准确</p>
                        <p><strong>用AI：</strong>逻辑复杂、数据多、允许一定错误</p>
                    </div>
                    <div class="lesson-block">
                        <h4>💰 成本计算器</h4>
                        <p>数据成本（30-50%）+ 训练成本 + 推理成本 + 运维成本</p>
                        <div class="key-point">
                            <strong>面试考点：</strong>"这个AI项目要花多少钱？"<br>
                            <strong>答案：</strong>先估算数据成本，再估算训练成本，最后估算推理成本。
                        </div>
                    </div>
                `
            },
            {
                id: 'tech-3',
                title: '与工程师沟通',
                duration: '25分钟',
                content: `
                    <div class="lesson-block">
                        <h4>🗣️ 翻译需求的艺术</h4>
                        <p><strong>错误：</strong>"我们要做一个AI推荐功能"</p>
                        <p><strong>正确：</strong></p>
                        <ul>
                            <li>业务目标：提升首页点击率10%</li>
                            <li>用户画像：日活100万电商用户</li>
                            <li>输入数据：用户浏览/购买历史</li>
                            <li>输出形式：5个个性化商品推荐</li>
                            <li>性能要求：响应时间<200ms</li>
                        </ul>
                    </div>
                `
            }
        ]
    },
    {
        id: 'data',
        title: '数据思维',
        icon: '📈',
        iconClass: 'icon-green',
        subtitle: '用数据说话，不拍脑袋决策',
        lessons: [
            {
                id: 'data-1',
                title: '数据驱动决策',
                duration: '30分钟',
                content: `
                    <div class="lesson-block">
                        <h4>📊 数据思维三原则</h4>
                        <p><strong>1. 用数据说话：</strong>"我觉得"不如"数据显示"</p>
                        <p><strong>2. 关注因果：</strong>相关性≠因果性</p>
                        <p><strong>3. 样本意识：</strong>样本量不够结论不可靠</p>
                        <div class="key-point">
                            <strong>面试考点：</strong>"如何用数据证明AI功能的价值？"<br>
                            <strong>答案：</strong>对比有/无AI的业务指标差异，计算ROI。
                        </div>
                    </div>
                `
            },
            {
                id: 'data-2',
                title: '数据质量评估',
                duration: '25分钟',
                content: `
                    <div class="lesson-block">
                        <h4>🔍 数据质量四维度</h4>
                        <p><strong>完整性：</strong>数据是否完整？有无缺失？</p>
                        <p><strong>准确性：</strong>数据是否准确？有无错误？</p>
                        <p><strong>一致性：</strong>数据是否一致？有无矛盾？</p>
                        <p><strong>时效性：</strong>数据是否最新？有无过期？</p>
                    </div>
                `
            },
            {
                id: 'data-3',
                title: '数据可视化',
                duration: '25分钟',
                content: `
                    <div class="lesson-block">
                        <h4>📈 可视化原则</h4>
                        <p><strong>简洁：</strong>一张图说一件事</p>
                        <p><strong>准确：</strong>不误导观众</p>
                        <p><strong>美观：</strong>符合苹果设计风格</p>
                    </div>
                `
            }
        ]
    },
    {
        id: 'design',
        title: '产品设计力',
        icon: '💡',
        iconClass: 'icon-orange',
        subtitle: '把AI能力变成用户喜欢的产品',
        lessons: [
            {
                id: 'des-1',
                title: '不确定性交互设计',
                duration: '30分钟',
                content: `
                    <div class="lesson-block">
                        <h4>✨ 设计策略</h4>
                        <p><strong>预期管理：</strong>告诉用户"AI可能不完美"</p>
                        <p><strong>置信度展示：</strong>"AI认为这个答案有80%把握"</p>
                        <p><strong>多选项呈现：</strong>给3-5个候选，让用户选择</p>
                        <p><strong>反馈闭环：</strong>让用户纠正AI错误，持续改进</p>
                        <div class="key-point">
                            <strong>面试考点：</strong>"如何让用户信任AI的推荐？"<br>
                            <strong>答案：</strong>展示推荐理由、提供反馈按钮、记录反馈持续优化。
                        </div>
                    </div>
                `
            },
            {
                id: 'des-2',
                title: '降级策略设计',
                duration: '25分钟',
                content: `
                    <div class="lesson-block">
                        <h4>🛡️ 四级降级</h4>
                        <p><strong>L1 - AI完全可用：</strong>正常展示AI结果</p>
                        <p><strong>L2 - AI部分可用：</strong>展示AI结果+提示"仅供参考"</p>
                        <p><strong>L3 - AI不可用：</strong>展示规则结果或历史数据</p>
                        <p><strong>L4 - 完全不可用：</strong>展示默认内容+联系客服</p>
                    </div>
                `
            },
            {
                id: 'des-3',
                title: '人机协作模式',
                duration: '25分钟',
                content: `
                    <div class="lesson-block">
                        <h4>🤝 三种模式</h4>
                        <p><strong>AI辅助人：</strong>人做决策，AI提供信息（如AI辅助诊断）</p>
                        <p><strong>人监督AI：</strong>AI执行，人监控（如自动驾驶）</p>
                        <p><strong>AI完全自主：</strong>人设定目标，AI自主完成（如智能客服）</p>
                    </div>
                `
            }
        ]
    },
    {
        id: 'collab',
        title: '跨团队协作',
        icon: '🤝',
        iconClass: 'icon-red',
        subtitle: '搞定算法、工程、业务各路人马',
        lessons: [
            {
                id: 'col-1',
                title: '与算法团队沟通',
                duration: '30分钟',
                content: `
                    <div class="lesson-block">
                        <h4>🗣️ 沟通技巧</h4>
                        <p><strong>说对方的语言：</strong>工程师关心准确率、延迟、成本</p>
                        <p><strong>明确边界：</strong>什么能做、什么不能做、需要什么数据</p>
                        <p><strong>设定优先级：</strong>先做什么、后做什么、什么必须做</p>
                    </div>
                `
            },
            {
                id: 'col-2',
                title: '项目管理实战',
                duration: '30分钟',
                content: `
                    <div class="lesson-block">
                        <h4>📅 AI项目Timeline</h4>
                        <p><strong>Week 1-2：</strong>需求确认 + 数据准备</p>
                        <p><strong>Week 3-4：</strong>模型开发 + 离线评估</p>
                        <p><strong>Week 5-6：</strong>系统集成 + AB测试设计</p>
                        <p><strong>Week 7-8：</strong>灰度发布 + 效果验证</p>
                        <p><strong>Week 9+：</strong>全量上线 + 持续优化</p>
                    </div>
                `
            },
            {
                id: 'col-3',
                title: '向老板汇报',
                duration: '25分钟',
                content: `
                    <div class="lesson-block">
                        <h4>📊 STAR汇报法</h4>
                        <p><strong>Situation：</strong>背景是什么？</p>
                        <p><strong>Task：</strong>我们要解决什么问题？</p>
                        <p><strong>Action：</strong>我们做了什么AI功能？</p>
                        <p><strong>Result：</strong>带来了什么业务价值？</p>
                        <div class="key-point">
                            <strong>量化价值：</strong>节省人力、提升转化、减少流失、增加收入
                        </div>
                    </div>
                `
            }
        ]
    }
];
