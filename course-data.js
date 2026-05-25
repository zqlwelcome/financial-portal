/**
 * AI产品经理课程数据 v2 - 深度版
 * 10节深度课，每节含：核心知识+真实案例+实操步骤+面试攻略+课后思考
 */
const COURSES = [
  // ===== 模块一：认知篇 =====
  {
    id: 'cognition',
    title: 'Day 1-2: AI产品经理认知',
    icon: '🧠',
    bg: 'bg-purple',
    sub: '理解岗位本质，建立认知框架',
    lessons: [
      {
        id: 'cog-1',
      title: 'AI产品经理的角色定位',
      time: '8分钟',
      content: `
        <div class="block">
          <div class="lesson-goal">🎯 本节目标：理解AI产品经理和传统PM的核心区别</div>
        </div>
        <div class="block">
          <h4>📖 核心知识</h4>
          <p><strong>AI产品经理 vs 传统PM</strong></p>
          <p>传统PM：需求明确、逻辑确定、交付可预期。AI PM：需求模糊、结果不确定、需要持续迭代。</p>
          <p><strong>四种核心能力：</strong></p>
          <p>1. 技术理解力 — 知道AI能做什么、不能做什么、成本多少</p>
          <p>2. 数据思维 — 用数据定义问题、评估效果、驱动决策</p>
          <p>3. 实验思维 — 假设驱动、小步验证、快速迭代</p>
          <p>4. 跨域协作 — 和算法、工程、业务方高效沟通</p>
          <p><strong>AI项目生命周期：</strong></p>
          <p>需求定义 → 数据准备 → 模型开发 → 评估验证 → 灰度上线 → 持续迭代</p>
          <p>每个环节PM都要深度参与，不像传统PM丢给RD就行。</p>
        </div>
        <div class="block">
          <h4>💼 真实案例</h4>
          <p><strong>字节Coze的产品经理工作流</strong></p>
          <p>背景：大模型能力溢出，但普通用户不会用。Coze的目标是降低AI应用门槛。</p>
          <p>PM的核心决策链条：</p>
          <p>1. 用户是谁→开发者和轻度创作者</p>
          <p>2. 核心场景→快速搭建Bot、发布到社交平台</p>
          <p>3. 交互范式→拖拽式工作流+自然语言配置</p>
          <p>4. 关键指标→Bot创建量、发布量、用户留存</p>
          <p>结果：MAU破千万，成为国内最大AI Bot平台。</p>
          <div class="tip">复盘：技术壁垒不高，但产品体验和生态是护城河。</div>
        </div>
        <div class="block">
          <h4>🛠️ 实操步骤</h4>
          <p><strong>第一步：</strong>列出你最近用的3个AI产品</p>
          <p><strong>第二步：</strong>用AI PM视角回答——为什么这样设计？技术成本高吗？数据哪里来？</p>
          <p><strong>第三步：</strong>写下一个简短的AI功能PRD框架</p>
        </div>
        <div class="block">
          <h4>💡 面试攻略</h4>
          <p><strong>问题：</strong>你为什么想做AI产品经理？</p>
          <p><strong>最佳回答结构：</strong></p>
          <p>行业趋势（1句）+ 个人优势（2句）+ 具体案例（2句）</p>
          <p><strong>案例示范：</strong>"AI正在重塑所有行业，我过去3年一直在做数据产品，对模型评估和数据驱动有实操经验。去年我用GPT API做了一个自动周报工具，深刻理解了AI产品的不确定性和迭代节奏。"</p>
          <div class="tip">避坑：不要只说"我对AI感兴趣"。要说出具体做了什么、学到了什么。</div>
        </div>
        <div class="block">
          <h4>📝 课后思考</h4>
          <p>分析Coze或字节豆包的一个AI功能，它的PM做了哪些关键决策？如果是你，会怎么做？</p>
        </div>
      `
      },
      {
        id: 'cog-2',
        title: 'AI行业全景与产品机会',
        time: '8分钟',
        content: `
        <div class="block">
          <div class="lesson-goal">🎯 本节目标：了解AI产业链结构和各层级的PM机会</div>
        </div>
        <div class="block">
          <h4>📖 核心知识</h4>
          <p><strong>AI产业链三层结构：</strong></p>
          <p><strong>基础层</strong>（芯片/云/模型）— 大厂赛道，技术门槛极高</p>
          <p>PM机会：模型服务平台、推理成本优化工具</p>
          <p><strong>中间层</strong>（开发工具/数据平台）— 创业密集区</p>
          <p>PM机会：数据标注工具、模型评估平台、Agent框架</p>
          <p><strong>应用层</strong>（AI原生/AI+传统）— 最大量的PM岗位</p>
          <p>PM机会：AI助手、AIGC工具、行业AI解决方案</p>
          <p><strong>当前最大机会在哪里？</strong></p>
          <p>2026年趋势：Agent产品经理 > AI Native PM > AI+行业PM</p>
          <p>Agent是2025-2026最热方向，需要懂任务拆解、工具调用、记忆管理等新范式。</p>
        </div>
        <div class="block">
          <h4>💼 真实案例</h4>
          <p><strong>Monica AI的产品路径</strong></p>
          <p>起点：浏览器插件（ChatGPT套壳）→ 增长快但壁垒低。</p>
          <p>转折：从套壳转向自研Agent能力，推出阅读助手、写作助手、搜索增强。</p>
          <p>PM的关键决策：不做通用对话，专注浏览器场景的深度集成。</p>
          <p>结果：从月活10万增长到300万，付费转化率5%。</p>
          <div class="tip">启示：套壳能验证需求，但真正的壁垒在场景深度和数据闭环。</div>
        </div>
        <div class="block">
          <h4>🛠️ 实操步骤</h4>
          <p><strong>第一步：</strong>画一份AI产业链地图</p>
          <p><strong>第二步：</strong>标出你感兴趣的3个赛道</p>
          <p><strong>第三步：</strong>每个赛道找出1个代表性产品，做功能拆解</p>
        </div>
        <div class="block">
          <h4>💡 面试攻略</h4>
          <p><strong>问题：</strong>你怎么看当前AI行业的机会？</p>
          <p><strong>最佳回答结构：</strong>三层框架（基础/中间/应用）+ 个人定位（我想做哪一层）+ 具体原因</p>
          <p><strong>案例示范：</strong>"AI产业链分三层，我认为中间层的Agent框架是未来2-3年最大的PM机会。因为基础层太技术，应用层太卷，中间层的工具属性刚好需要懂场景又懂技术的PM。"</p>
        </div>
        <div class="block">
          <h4>📝 课后思考</h4>
          <p>如果你要做一个AI产品，你会选哪个赛道？为什么？目标用户是谁？</p>
        </div>
      `
      }
    ]
  },
  // ===== 模块二：技术篇 =====
  {
    id: 'tech',
    title: 'Day 3-4: AI技术理解',
    icon: '⚙️',
    bg: 'bg-blue',
    sub: '不懂代码，但要懂边界和成本',
    lessons: [
      {
        id: 'tech-1',
        title: '大模型能力边界与选型',
        time: '10分钟',
        content: `
        <div class="block">
          <div class="lesson-goal">🎯 本节目标：知道AI能做什么、不能做什么</div>
        </div>
        <div class="block">
          <h4>📖 核心知识</h4>
          <p><strong>大模型就像一个新来的实习生</strong></p>
          <p>他非常聪明，但会瞎编（幻觉），不知道公司内部数据。</p>
          <p><strong>三个核心概念：</strong></p>
          <p>1. Prompt Engineering（写好任务说明书）</p>
          <p>2. RAG（给实习生配资料库）——先查再回答。</p>
          <p>3. Fine-tuning（岗前培训）——用数据训练做特定任务。</p>
        </div>
        <div class="block">
          <h4>💼 真实案例</h4>
          <p>智能客服→RAG。写周报→Prompt。银行审批→Fine-tuning。</p>
        </div>
        <div class="block">
          <h4>⚡ Agent</h4>
          <p>普通AI=你问它答。Agent=给它目标它自己完成。PM要决定开放哪些工具。</p>
        </div>
        <div class="block">
          <h4>💡 面试攻略</h4>
          <p>大模型vs传统ML：通才vs专才。RAG vs微调：资料库vs岗前培训。</p>
        </div>
        <div class="block">
          <h4>📝 课后思考</h4>
          <p>人力资源AI助手用RAG还是微调？为什么？</p>
        </div>
      `
      },
      {
        id: 'tech-2',
        title: 'AI项目成本估算',
        time: '10分钟',
        content: `
        <div class="block">
          <div class="lesson-goal">🎯 本节目标：非技术背景估算AI项目成本</div>
        </div>
        <div class="block">
          <h4>📖 核心知识</h4>
          <p><strong>三种花钱方式</strong></p>
          <p>A.加盟大牌（调用API）——按字数收费。</p>
          <p>B.自己开店（自建模型）——前期投入大，长期便宜。</p>
          <p>C.买菜谱自己调（微调开源）——介于两者之间。</p>
        </div>
        <div class="block">
          <h4>💼 案例：AI客服成本</h4>
          <p>10万用户每天3次，每次2000字。GPT-4=360万/月。GPT-4-mini=18万/月。自建=33万/6月。</p>
        </div>
        <div class="block">
          <h4>💡 面试攻略</h4>
          <p>三个维度：API还是自建、真实使用量、成本太高就换方案。</p>
        </div>
        <div class="block">
          <h4>📝 课后思考</h4>
          <p>AI客服100万次对话，GPT-4-mini多少钱？自建几个月回本？</p>
        </div>
      `
      }
    ]
  },
  // ===== 模块三：数据篇 =====
  {
    id: 'data',
    title: 'Day 5-6: 数据驱动决策',
    icon: '📊',
    bg: 'bg-green',
    sub: '用指标体系衡量AI效果',
    lessons: [
      {
        id: 'data-1',
        title: 'AI功能指标体系设计',
        time: '8分钟',
        content: `
        <div class="block">
          <div class="lesson-goal">🎯 本节目标：为AI功能设计完整的指标体系</div>
        </div>
        <div class="block">
          <h4>📖 核心知识</h4>
          <p><strong>AI指标三层架构：</strong></p>
          <p><strong>业务层：</strong>这个AI功能提升了多少GMV/留存/转化？</p>
          <p>— 老板关心的指标，体现AI的业务价值</p>
          <p><strong>体验层：</strong>用户用得好不好？满意吗？</p>
          <p>— 使用率、完成率、满意度、用户停留时间</p>
          <p><strong>技术层：</strong>模型表现如何？</p>
          <p>— 准确率、召回率、延迟、覆盖率、幻觉率</p>
          <p><strong>关键原则：</strong></p>
          <p>每个AI功能必须有一个北极星指标，且必须和业务目标对齐。</p>
          <p>"模型准确率提升5%"不是好指标，"推荐点击率提升10%"才是。</p>
        </div>
        <div class="block">
          <h4>💼 真实案例</h4>
          <p><strong>抖音AI推荐系统的指标体系</strong></p>
          <p>北极星：用户总使用时长</p>
          <p>体验层指标：推荐点击率、完播率、点赞率、分享率</p>
          <p>技术层指标：召回准确率、排序NDCG、实时性</p>
          <p>PM的核心工作：当体验层指标下降时，判断是技术问题还是产品问题。</p>
          <p>案例：推荐点击率下降5%，排查发现是召回模型更新导致的长尾内容减少。解决方案：回退模型+加强长尾召回策略。</p>
        </div>
        <div class="block">
          <h4>💡 面试攻略</h4>
          <p><strong>问题：</strong>如何证明AI功能的价值？</p>
          <p><strong>最佳回答：</strong>AB测试。实验组（有AI）vs 对照组（无AI），对比北极星指标差异。同时要控制混杂变量（时间、用户群、其他功能上线）。</p>
        </div>
        <div class="block">
          <h4>📝 课后思考</h4>
          <p>你设计一个AI摘要功能，它的业务层/体验层/技术层指标分别是什么？</p>
        </div>
      `
      },
      {
        id: 'data-2',
        title: 'AB测试与效果评估',
        time: '7分钟',
        content: `
        <div class="block">
          <div class="lesson-goal">🎯 本节目标：能设计AI功能的AB测试方案并解读结果</div>
        </div>
        <div class="block">
          <h4>📖 核心知识</h4>
          <p><strong>AI功能AB测试的特殊性：</strong></p>
          <p>1. 模型效果可能随时间衰减，需要长期追踪</p>
          <p>2. 用户行为会适应AI，新鲜感效应需要排除</p>
          <p>3. 多个AI功能可能相互影响，需要隔离实验</p>
          <p><strong>AB测试流程：</strong></p>
          <p>1. 提出假设（AI推荐能提升点击率10%）</p>
          <p>2. 设计实验（50%用户用AI，50%用规则，运行2周）</p>
          <p>3. 计算样本量（使用在线计算器，确保统计功效>80%）</p>
          <p>4. 执行实验（注意昼夜效应和周末效应）</p>
          <p>5. 分析结果（看p值、效应量、业务意义）</p>
          <p><strong>常见陷阱：</strong></p>
          <p>样本量不足→假阳性；运行时间太短→结果不稳定</p>
          <p>分流不均→AA测试没通过；多重比较→没有做Bonferroni校正</p>
        </div>
        <div class="block">
          <h4>💼 真实案例</h4>
          <p><strong>知乎AI推荐改版AB测试</strong></p>
          <p>假设：新推荐算法能提升内容消费时长15%</p>
          <p>实验设计：10%用户实验组，10%对照组，运行14天</p>
          <p>结果：实验组消费时长提升12%（p<0.01），但点踩率也提升了8%</p>
          <p>PM决策：不直接全量，先优化推荐质量，再跑第二轮AB测试</p>
          <div class="tip">指标提升不代表成功，要关注副作用指标。</div>
        </div>
        <div class="block">
          <h4>💡 面试攻略</h4>
          <p><strong>问题：</strong>AB测试结果显示显著，但你能全量上线吗？</p>
          <p><strong>最佳回答：</strong>不能只看主要指标。要检查：1）是否有长尾指标下跌 2）是否对不同用户群影响不同 3）是否有新鲜感效应 4）工程成本和收益是否匹配。</p>
        </div>
        <div class="block">
          <h4>📝 课后思考</h4>
          <p>你的AI搜索功能结果页测试发现点击率升了但跳出率也升了，怎么决策？</p>
        </div>
      `
      }
    ]
  },
  // ===== 模块四：设计篇 =====
  {
    id: 'design',
    title: 'Day 7-8: AI交互设计',
    icon: '🎨',
    bg: 'bg-orange',
    sub: '把AI能力变成好用的产品',
    lessons: [
      {
        id: 'des-1',
        title: 'AI产品交互设计原则',
        time: '8分钟',
        content: `
        <div class="block">
          <div class="lesson-goal">🎯 本节目标：掌握AI产品交互设计的核心原则</div>
        </div>
        <div class="block">
          <h4>📖 核心知识</h4>
          <p><strong>AI交互设计的四条黄金原则：</strong></p>
          <p><strong>1. 预期管理</strong>— 告诉用户AI能做什么、不能做什么</p>
          <p>在输入框上方写"AI可能不完美，仅供参考"</p>
          <p><strong>2. 渐进式披露</strong>— 先展示核心结果，需要时再看细节</p>
          <p>AI摘要默认展示3句话，点击"展开"看完整分析</p>
          <p><strong>3. 反馈闭环</strong>— 让用户纠正AI的错误</p>
          <p>每个AI输出都提供"有用/没用"或"纠正"按钮</p>
          <p><strong>4. 不确定性可视化</strong>— 让用户知道AI的自信程度</p>
          <p>展示置信度分数或显示"AI判断，建议人工复核"</p>
          <p><strong>为什么这些原则重要？</strong></p>
          <p>用户对AI的信任一旦被打破很难重建。一次明显的错误推荐可能导致用户永久离开。</p>
        </div>
        <div class="block">
          <h4>💼 真实案例</h4>
          <p><strong>Notion AI的交互设计</strong></p>
          <p>Notion AI不是直接展示结果，而是三步交互：</p>
          <p>1. 用户选中文字 → 弹出AI菜单（低干扰）</p>
          <p>2. 选择操作类型（续写、改写、总结）→ 明确意图</p>
          <p>3. AI输出后内联显示 → 用户一键接受或撤销</p>
          <p>关键设计决策：不打断用户已有的写作习惯，AI是辅助不是替代。</p>
        </div>
        <div class="block">
          <h4>💡 面试攻略</h4>
          <p><strong>问题：</strong>如何让用户信任AI的推荐？</p>
          <p><strong>最佳回答：</strong>三层信任体系：1）展示推荐理由（为什么推荐这个）2）提供反馈入口（让用户纠正）3）持续优化（用户反馈→模型改进→更好的推荐）。信任不是设计出来的，是逐步建立的。</p>
        </div>
        <div class="block">
          <h4>📝 课后思考</h4>
          <p>你设计一个AI医生助手，用户输入症状，AI给出建议。如何设计交互让用户既信任又不滥用？</p>
        </div>
      `
      },
      {
        id: 'des-2',
        title: '降级策略与容错设计',
        time: '8分钟',
        content: `
        <div class="block">
          <div class="lesson-goal">🎯 本节目标：给AI设计Plan B，理解流式交互</div>
        </div>
        <div class="block">
          <h4>📖 核心知识</h4>
          <p><strong>四级降级：</strong>L1正常→L2仅供参考→L3固定答案→L4错误页+客服</p>
          <p><strong>流式交互三种状态：</strong>思考中（...）→说话中→完成/出错</p>
        </div>
        <div class="block">
          <h4>💼 案例：银行AI客服</h4>
          <p>查额度→思考中→正在查询...→额度3.5万→快捷键。API超时→发票据。乱回答→转人工。</p>
        </div>
        <div class="block">
          <h4>💡 面试攻略</h4>
          <p>分级降级+触发条件。15秒超时保留内容。</p>
        </div>
        <div class="block">
          <h4>📝 课后思考</h4>
          <p>AI客服四个场景：正常、API超时、模型报错、网络断开。</p>
        </div>
      `
      },
      {
        id: 'des-3',
        title: '金融AI合规设计：审计、脱敏、红线',
        time: '8分钟',
        content: `
        <div class="block">
          <div class="lesson-goal">🎯 本节目标：知道金融AI的合规红线</div>
        </div>
        <div class="block">
          <h4>📖 核心知识</h4>
          <p><strong>三条红线：</strong>AI不做最终决策、用户隐私不泄露、对话要追溯存6个月。</p>
        </div>
        <div class="block">
          <h4>💼 案例：银行信贷Agent</h4>
          <p>经理查资格→AI查征信→建议额度→经理确认。不能自动发结果或调转账API。</p>
        </div>
        <div class="block">
          <h4>💡 面试攻略</h4>
          <p>AI做参谋不做将军。脱敏+审计+防范Prompt注入。</p>
        </div>
        <div class="block">
          <h4>📝 课后思考</h4>
          <p>给银行AI理财助手列5条绝对不能做的事。</p>
        </div>
      `
      }
    ]
  },
  // ===== 模块五：实战篇 =====
  {
    id: 'practice',
    title: 'Day 9-10: 项目实战与面试',
    icon: '🚀',
    bg: 'bg-red',
    sub: '从0到1完成AI项目+面试通关',
    lessons: [
      {
        id: 'prac-1',
        title: 'AI产品从0到1全流程',
        time: '10分钟',
        content: `
        <div class="block">
          <div class="lesson-goal">🎯 本节目标：掌握AI产品从想法到上线的完整流程</div>
        </div>
        <div class="block">
          <h4>📖 核心知识</h4>
          <p><strong>AI产品0到1的六个阶段：</strong></p>
          <p><strong>Phase 1：需求验证（Week 1-2）</strong></p>
          <p>用户访谈→痛点验证→AI可行性评估</p>
          <p>判断标准：这个需求不用AI能解决吗？AI带来的提升值不值得成本？</p>
          <p><strong>Phase 2：MVP定义（Week 2-3）</strong></p>
          <p>最小可行范围的AI功能→用最简单的模型实现</p>
          <p>关键决策：是用现成API还是自研？先跑通链路再说。</p>
          <p><strong>Phase 3：数据准备（Week 3-4）</strong></p>
          <p>数据采集→质量评估→标注规范→数据Pipeline</p>
          <p>PM负责定义标注规范和质量标准，这是AI项目最关键的环节。</p>
          <p><strong>Phase 4：模型开发（Week 4-6）</strong></p>
          <p>模型选型→训练/微调→离线评估</p>
          <p>PM定义评估指标和通过标准，不达标的模型不允许上线。</p>
          <p><strong>Phase 5：灰度验证（Week 6-8）</strong></p>
          <p>小流量AB测试→用户反馈收集→迭代优化</p>
          <p>PM负责判断：什么时候可以全量？什么时候需要回退？</p>
          <p><strong>Phase 6：全量上线（Week 8+）</strong></p>
          <p>全量发布→效果监控→持续迭代</p>
          <p>PM建立监控大盘，持续跟踪指标变化。</p>
        </div>
        <div class="block">
          <h4>💼 真实案例</h4>
          <p><strong>小红书AI搜索的0到1</strong></p>
          <p>需求：用户在小红书搜攻略，传统搜索效果差。</p>
          <p>Phase 1：验证用户确实需要更精准的搜索体验（访谈50人，80%表示不满）</p>
          <p>Phase 2：MVP—调用GPT API做搜索摘要，只覆盖美妆品类</p>
          <p>Phase 3：标注1000条搜索Query-答案对，定义质量标准</p>
          <p>Phase 4：微调开源模型，离线评估准确率从60%提升到85%</p>
          <p>Phase 5：5%灰度，搜索点击率提升22%，用户满意度提升35%</p>
          <p>Phase 6：全量上线，成为小红书DAU增长的核心功能之一</p>
        </div>
        <div class="block">
          <h4>💡 面试攻略</h4>
          <p><strong>问题：</strong>请描述一个你主导的AI产品从0到1的过程</p>
          <p><strong>最佳回答：</strong>用6阶段框架讲述。重点不是技术细节，而是你的决策逻辑：为什么选这个需求？为什么用这个方案？遇到了什么困难？怎么判断可以上线？</p>
        </div>
        <div class="block">
          <h4>📝 课后思考</h4>
          <p>选一个你感兴趣的场景，写出从0到1的6阶段计划。</p>
        </div>
      `
      },
      {
        id: 'prac-2',
        title: 'AI产品经理面试突击（非技术版）',
        time: '10分钟',
        content: `
        <div class="block">
          <div class="lesson-goal">🎯 本节目标：没技术背景也能面AI PM</div>
        </div>
        <div class="block">
          <h4>📖 核心知识</h4>
          <p><strong>四类题：</strong>行为题（STAR）→产品设计题（五步）→技术理解题→行业观点题</p>
        </div>
        <div class="block">
          <h4>⚡ 没经验？</h4>
          <p>关注GitHub社区，用Coze搭Demo。做Side Project当作品集。把过去经验翻译成AI语言。</p>
        </div>
        <div class="block">
          <h4>💡 面试攻略</h4>
          <p>选一个AI产品用PM视角分析，不要只列名字。</p>
        </div>
        <div class="block">
          <h4>📝 课后思考</h4>
          <p>找3个AI PM职位描述，分析差距。</p>
        </div>
      `
      }
    ]
  }
];
