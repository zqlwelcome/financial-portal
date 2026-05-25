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
        time: '8分钟',
        content: `
        <div class="block">
          <div class="lesson-goal">🎯 本节目标：掌握大模型的能力边界和选型决策框架</div>
        </div>
        <div class="block">
          <h4>📖 核心知识</h4>
          <p><strong>大模型能做什么？</strong></p>
          <p>文本生成：文案、代码、邮件、报告—质量已接近人类</p>
          <p>对话交互：客服、助手、角色扮演—体验取决于Prompt设计</p>
          <p>推理分析：总结、翻译、分类、情感分析—准确率80-95%</p>
          <p>多模态：图生文、文生图、语音交互—2026年已成熟</p>
          <p><strong>大模型不能做什么？</strong></p>
          <p>精确计算：3.14159*7.2=? — 模型可能算错，用计算器</p>
          <p>100%准确：模型永远有幻觉率，关键场景需要人工兜底</p>
          <p>实时信息：训练数据截止日期前的知识，需要配合搜索增强</p>
          <p><strong>选型决策框架：</strong></p>
          <p>准确性要求高 → 用小模型+规则兜底</p>
          <p>创意要求高 → 用大模型+好的Prompt</p>
          <p>成本敏感 → 蒸馏小模型或混合架构</p>
        </div>
        <div class="block">
          <h4>💼 真实案例</h4>
          <p><strong>飞书智能伙伴的模型选型决策</strong></p>
          <p>背景：飞书要做AI助手，需要处理文档问答、会议总结、消息回复等场景。</p>
          <p>PM的选型逻辑：</p>
          <p>文档问答→调用GPT-4级别大模型（准确率要求高）</p>
          <p>消息回复→自研小模型（延迟要求<200ms）</p>
          <p>会议总结→异步调用大模型（不要求实时）</p>
          <p>结果：混合架构下，大模型调用成本降低60%，用户体验提升。</p>
          <div class="tip">PM不一定懂训练细节，但必须懂成本模型和延迟约束。</div>
        </div>
        <div class="block">
          <h4>🛠️ 实操步骤</h4>
          <p><strong>第一步：</strong>列出你的功能需要哪些AI能力</p>
          <p><strong>第二步：</strong>用选型框架判断每个能力用什么模型</p>
          <p><strong>第三步：</strong>估算每天的推理成本和延迟</p>
        </div>
        <div class="block">
          <h4>💡 面试攻略</h4>
          <p><strong>问题：</strong>如何判断一个功能该用大模型还是小模型？</p>
          <p><strong>最佳回答：</strong>从三个维度评估—准确性要求、延迟要求、成本预算。高准确+低延迟=小模型+规则；高创意+可接受延迟=大模型；混合架构是2026年的主流方案。</p>
        </div>
        <div class="block">
          <h4>📝 课后思考</h4>
          <p>你常用的AI产品如果让你选模型，会选哪种架构？为什么？</p>
        </div>
      `
      },
      {
        id: 'tech-2',
        title: 'AI项目成本估算',
        time: '6分钟',
        content: `
        <div class="block">
          <div class="lesson-goal">🎯 本节目标：能独立估算AI项目的技术成本</div>
        </div>
        <div class="block">
          <h4>📖 核心知识</h4>
          <p><strong>AI项目成本四部分：</strong></p>
          <p><strong>数据成本（30-50%）：</strong>采集、清洗、标注、存储</p>
          <p>— 标注成本最高，一个分类任务可能花10-50万</p>
          <p><strong>训练成本（20-30%）：</strong>GPU算力、训练时间</p>
          <p>— 微调一个7B模型约几千元，训练一个70B模型约几十万</p>
          <p><strong>推理成本（15-25%）：</strong>线上服务、API调用</p>
          <p>— GPT-4调用约0.03元/次，日活100万=每天3万</p>
          <p><strong>运维成本（10-15%）：</strong>监控、迭代、人员</p>
          <p>— 一个小AI团队月成本约30-50万</p>
          <p><strong>省钱策略：</strong></p>
          <p>能用开源不用API，能用小模型不用大模型，能用缓存不重复计算。</p>
        </div>
        <div class="block">
          <h4>💼 真实案例</h4>
          <p><strong>某电商AI客服的成本优化</strong></p>
          <p>最初：全部调GPT-4 API，月成本80万，老板觉得太贵。</p>
          <p>PM的优化方案：</p>
          <p>1. 高频问题（退换货、物流）→ 小模型+规则，成本降低90%</p>
          <p>2. 复杂问题（投诉、纠纷）→ 大模型，仅占10%流量</p>
          <p>3. 加语义缓存，相同问题不再重复调API</p>
          <p>结果：月成本从80万降到8万，用户体验基本不变。</p>
        </div>
        <div class="block">
          <h4>💡 面试攻略</h4>
          <p><strong>问题：</strong>这个AI项目要花多少钱？</p>
          <p><strong>最佳回答：</strong>给出估算框架，不是数字。先拆解数据/训练/推理/运维四部分，再结合DAU和调用次数粗算，最后给出一个范围（低/中/高三档）。</p>
        </div>
        <div class="block">
          <h4>📝 课后思考</h4>
          <p>假设你要做一个AI写作助手，日活10万，估算月成本多少？</p>
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
        time: '6分钟',
        content: `
        <div class="block">
          <div class="lesson-goal">🎯 本节目标：为AI功能设计完善的降级方案</div>
        </div>
        <div class="block">
          <h4>📖 核心知识</h4>
          <p><strong>四级降级体系：</strong></p>
          <p><strong>L1：AI完美运行</strong>— 正常展示，无额外提示</p>
          <p><strong>L2：AI部分可用</strong>— 展示结果+提示"结果仅供参考"</p>
          <p><strong>L3：AI不可用</strong>— 回退到规则引擎或默认结果</p>
          <p><strong>L4：服务不可用</strong>— 展示友好错误页+客服入口</p>
          <p><strong>设计要点：</strong></p>
          <p>降级应该是平滑的，用户不该感知到"AI挂了"，而是该感觉"今天推荐不太一样"。</p>
          <p>每个功能都要有降级方案，AI不是100%可用。</p>
        </div>
        <div class="block">
          <h4>💼 真实案例</h4>
          <p><strong>高德地图AI导航的降级方案</strong></p>
          <p>正常：AI实时路况+语音播报</p>
          <p>L2：路况数据延迟 → 展示"5分钟前路况"</p>
          <p>L3：AI路线规划不可用 → 回退到静态导航</p>
          <p>L4：全挂了 → 展示离线地图+引导到安全地方</p>
          <p>PM的核心工作：定义每个降级等级的触发条件和恢复条件。</p>
        </div>
        <div class="block">
          <h4>💡 面试攻略</h4>
          <p><strong>问题：</strong>AI功能挂了怎么办？</p>
          <p><strong>最佳回答：</strong>首先不要直接报错让用户看到。其次要有分级降级方案。最关键的是——定义降级指标：延迟>3秒自动L3，模型API错误率>5%自动L2。降级要自动，不需要人工介入。</p>
        </div>
        <div class="block">
          <h4>📝 课后思考</h4>
          <p>你设计一个AI客服，如果大模型API超时或返回异常，你的降级方案是什么？</p>
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
        title: 'AI产品经理面试突击',
        time: '8分钟',
        content: `
        <div class="block">
          <div class="lesson-goal">🎯 本节目标：掌握AI产品经理面试的核心套路</div>
        </div>
        <div class="block">
          <h4>📖 核心知识</h4>
          <p><strong>AI PM面试四类必考题：</strong></p>
          <p><strong>1. 行为题（50%）</strong></p>
          <p>"请分享一个你做过的AI相关项目"</p>
          <p>回答框架：STAR法则—背景→目标→行动→结果</p>
          <p>加分项：提到数据指标（提升X%）、提到踩坑和复盘</p>
          <p><strong>2. 产品设计题（30%）</strong></p>
          <p>"设计一个AI面试助手"</p>
          <p>回答框架：用户是谁→痛点是什么→AI能做什么→交互流程→评估指标</p>
          <p>加分项：提到技术边界、说到成本估算</p>
          <p><strong>3. 技术理解题（15%）</strong></p>
          <p>"大模型和传统ML模型有什么区别？"</p>
          <p>回答框架：能力维度+成本维度+场景适用性</p>
          <p><strong>4. 业务分析题（5%）</strong></p>
          <p>"AI搜索如何商业化？"</p>
          <p>回答框架：用户价值→商业模式→成本结构→竞争壁垒</p>
        </div>
        <div class="block">
          <h4>🛠️ 实操步骤</h4>
          <p><strong>准备清单：</strong></p>
          <p>1. 准备3个AI项目经历（用STAR写下来）</p>
          <p>2. 准备2个产品设计题答案（写下来，练3遍）</p>
          <p>3. 准备AI技术基础问答（大模型、RAG、Agent）</p>
          <p>4. 准备1个行业观点（你对AI未来的看法）</p>
        </div>
        <div class="block">
          <h4>💡 面试攻略</h4>
          <p><strong>问题：</strong>你有没有用过哪些AI产品？最喜欢哪个？</p>
          <p><strong>最佳回答：</strong>不要只列名字。选一个产品，用AI PM的视角分析它的设计，展示你的专业性。</p>
          <p><strong>案例示范：</strong>"最喜欢Perplexity AI。它的关键PM决策是：把搜索引擎和对话AI结合，用引用来源解决了AI的幻觉问题。交互上，搜索结果左侧是传统链接，右侧是AI总结，用户可以根据需求选择。这个设计体现了PM对用户搜索行为的深刻理解。"</p>
        </div>
        <div class="block">
          <h4>📝 课后思考</h4>
          <p>写出你最想去的3家公司，为每家准备一个AI产品设计题的答案。</p>
        </div>
      `
      }
    ]
  }
];
