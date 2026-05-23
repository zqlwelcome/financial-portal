/**
 * AI产品经理课程数据 - 清晰版
 */

const COURSES = [
    {
        id: 'indicator',
        title: 'Day 1-3: AI产品指标体系',
        icon: '📊',
        bg: 'bg-purple',
        sub: '搭建数据驱动的决策框架',
        lessons: [
            {
                id: 'ind-1',
                title: '三层指标体系设计',
                time: '30分钟',
                content: `
                    <div class="block">
                        <h4>📊 指标金字塔</h4>
                        <p><strong>第一层：北极星指标</strong>（公司级）</p>
                        <p>GMV、DAU、营收 - 最终目标</p>
                        <p><strong>第二层：驱动指标</strong>（产品级）</p>
                        <p>转化率、留存率、客单价 - 驱动北极星</p>
                        <p><strong>第三层：过程指标</strong>（功能级）</p>
                        <p>点击率、使用率、完成率 - 驱动驱动指标</p>
                        <div class="tip">
                            <strong>面试考点：</strong>"如何设计AI功能的指标体系？"<br>
                            <strong>答案：</strong>从北极星指标倒推，找到AI功能能影响的驱动指标，再设计过程指标。
                        </div>
                    </div>
                `
            },
            {
                id: 'ind-2',
                title: 'AB测试实战方法',
                time: '35分钟',
                content: `
                    <div class="block">
                        <h4>🔬 AB测试四步法</h4>
                        <p><strong>Step 1：</strong>假设 - "AI推荐能提升点击率10%"</p>
                        <p><strong>Step 2：</strong>设计 - 50%用户用AI，50%用规则</p>
                        <p><strong>Step 3：</strong>执行 - 运行1-2周，收集数据</p>
                        <p><strong>Step 4：</strong>分析 - p-value < 0.05才显著</p>
                        <div class="tip">
                            <strong>常见陷阱：</strong>样本量不够、时间太短、分流不均
                        </div>
                    </div>
                `
            },
            {
                id: 'ind-3',
                title: '数据分析框架',
                time: '30分钟',
                content: `
                    <div class="block">
                        <h4>📈 三种分析方法</h4>
                        <p><strong>漏斗分析：</strong>找到用户流失环节</p>
                        <p>曝光100万→点击10万→使用5万→留存2万</p>
                        <p><strong>归因分析：</strong>判断AI贡献多少价值</p>
                        <p>有AI转化5%，无AI转化3%，AI贡献67%</p>
                        <p><strong>Cohort分析：</strong>观察用户群体差异</p>
                        <p>新用户使用率30%，老用户60%</p>
                    </div>
                `
            }
        ]
    },
    {
        id: 'tech',
        title: 'Day 4-6: 技术理解力',
        icon: '🎯',
        bg: 'bg-blue',
        sub: '不懂代码，但要懂AI的边界和成本',
        lessons: [
            {
                id: 'tech-1',
                title: 'AI技术原理速成',
                time: '35分钟',
                content: `
                    <div class="block">
                        <h4>🧠 机器学习三要素</h4>
                        <p><strong>数据 + 算法 + 算力 = 模型</strong></p>
                        <p>就像教小孩认字——看例子（数据），总结规律（算法），学会认字（模型）。</p>
                        <div class="tip">
                            <strong>面试考点：</strong>"机器学习和传统编程有什么区别？"<br>
                            <strong>答案：</strong>传统编程是人写规则，机器学习是让机器从数据中学规则。
                        </div>
                    </div>
                    <div class="block">
                        <h4>🤖 大模型能力边界</h4>
                        <p><strong>能做：</strong>文本生成、对话、代码、推理</p>
                        <p><strong>不能做：</strong>精确计算、实时信息、100%准确</p>
                    </div>
                `
            },
            {
                id: 'tech-2',
                title: '技术选型决策框架',
                time: '30分钟',
                content: `
                    <div class="block">
                        <h4>⚡ 用规则还是AI？</h4>
                        <p><strong>用规则：</strong>逻辑明确、数据少、要求100%准确</p>
                        <p><strong>用AI：</strong>逻辑复杂、数据多、允许一定错误</p>
                    </div>
                    <div class="block">
                        <h4>💰 成本计算器</h4>
                        <p>数据成本（30-50%）+ 训练成本 + 推理成本 + 运维成本</p>
                        <div class="tip">
                            <strong>面试考点：</strong>"这个AI项目要花多少钱？"<br>
                            <strong>答案：</strong>先估算数据成本，再估算训练成本，最后估算推理成本。
                        </div>
                    </div>
                `
            },
            {
                id: 'tech-3',
                title: '与工程师沟通',
                time: '25分钟',
                content: `
                    <div class="block">
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
        title: 'Day 7-9: 数据思维',
        icon: '📈',
        bg: 'bg-green',
        sub: '用数据说话，不拍脑袋决策',
        lessons: [
            {
                id: 'data-1',
                title: '数据驱动决策',
                time: '30分钟',
                content: `
                    <div class="block">
                        <h4>📊 数据思维三原则</h4>
                        <p><strong>1. 用数据说话：</strong>"我觉得"不如"数据显示"</p>
                        <p><strong>2. 关注因果：</strong>相关性≠因果性</p>
                        <p><strong>3. 样本意识：</strong>样本量不够结论不可靠</p>
                        <div class="tip">
                            <strong>面试考点：</strong>"如何用数据证明AI功能的价值？"<br>
                            <strong>答案：</strong>对比有/无AI的业务指标差异，计算ROI。
                        </div>
                    </div>
                `
            },
            {
                id: 'data-2',
                title: '数据质量评估',
                time: '25分钟',
                content: `
                    <div class="block">
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
                time: '25分钟',
                content: `
                    <div class="block">
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
        title: 'Day 10-12: 产品设计力',
        icon: '💡',
        bg: 'bg-orange',
        sub: '把AI能力变成用户喜欢的产品',
        lessons: [
            {
                id: 'des-1',
                title: '不确定性交互设计',
                time: '30分钟',
                content: `
                    <div class="block">
                        <h4>✨ 设计策略</h4>
                        <p><strong>预期管理：</strong>告诉用户"AI可能不完美"</p>
                        <p><strong>置信度展示：</strong>"AI认为这个答案有80%把握"</p>
                        <p><strong>多选项呈现：</strong>给3-5个候选，让用户选择</p>
                        <p><strong>反馈闭环：</strong>让用户纠正AI错误，持续改进</p>
                        <div class="tip">
                            <strong>面试考点：</strong>"如何让用户信任AI的推荐？"<br>
                            <strong>答案：</strong>展示推荐理由、提供反馈按钮、记录反馈持续优化。
                        </div>
                    </div>
                `
            },
            {
                id: 'des-2',
                title: '降级策略设计',
                time: '25分钟',
                content: `
                    <div class="block">
                        <h4>🛡️ 四级降级</h4>
                        <p><strong>L1：</strong>AI完全可用 → 正常展示</p>
                        <p><strong>L2：</strong>AI部分可用 → 展示+提示"仅供参考"</p>
                        <p><strong>L3：</strong>AI不可用 → 展示规则结果</p>
                        <p><strong>L4：</strong>完全不可用 → 默认内容+客服</p>
                    </div>
                `
            },
            {
                id: 'des-3',
                title: '人机协作模式',
                time: '25分钟',
                content: `
                    <div class="block">
                        <h4>🤝 三种模式</h4>
                        <p><strong>AI辅助人：</strong>人做决策，AI提供信息</p>
                        <p>案例：AI辅助诊断，医生做最终判断</p>
                        <p><strong>人监督AI：</strong>AI执行，人监控</p>
                        <p>案例：自动驾驶，人随时接管</p>
                        <p><strong>AI完全自主：</strong>人设目标，AI完成</p>
                        <p>案例：智能客服处理标准问题</p>
                    </div>
                `
            }
        ]
    },
    {
        id: 'collab',
        title: 'Day 13-15: 跨团队协作',
        icon: '🤝',
        bg: 'bg-red',
        sub: '搞定算法、工程、业务各路人马',
        lessons: [
            {
                id: 'col-1',
                title: '与算法团队沟通',
                time: '30分钟',
                content: `
                    <div class="block">
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
                time: '30分钟',
                content: `
                    <div class="block">
                        <h4>📅 AI项目Timeline</h4>
                        <p><strong>Week 1-2：</strong>需求确认 + 数据准备</p>
                        <p><strong>Week 3-4：</strong>模型开发 + 离线评估</p>
                        <p><strong>Week 5-6：</strong>系统集成 + AB测试</p>
                        <p><strong>Week 7-8：</strong>灰度发布 + 效果验证</p>
                        <p><strong>Week 9+：</strong>全量上线 + 持续优化</p>
                    </div>
                `
            },
            {
                id: 'col-3',
                title: '向老板汇报',
                time: '25分钟',
                content: `
                    <div class="block">
                        <h4>📊 STAR汇报法</h4>
                        <p><strong>Situation：</strong>背景是什么？</p>
                        <p><strong>Task：</strong>我们要解决什么问题？</p>
                        <p><strong>Action：</strong>我们做了什么AI功能？</p>
                        <p><strong>Result：</strong>带来了什么业务价值？</p>
                        <div class="tip">
                            <strong>量化价值：</strong>节省人力、提升转化、减少流失、增加收入
                        </div>
                    </div>
                `
            }
        ]
    }
];
