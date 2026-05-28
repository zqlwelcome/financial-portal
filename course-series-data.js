/**
 * 课程中心 - 多系列课程数据结构
 * 支持不同角色的课程系列
 * lessonId 映射到 course-data.js 中的实际课程ID
 */

const COURSE_SERIES = [
  {
    id: 'ai-pm',
    title: 'AI产品经理',
    icon: '🤖',
    color: '#0071e3',
    status: 'active',
    progress: 0,
    totalLessons: 17,
    completedLessons: 0,
    description: '从0到1掌握AI产品经理核心技能',
    tags: ['热门', '实战'],
    modules: [
      {
        id: 'ai-pm-cognition',
        title: '认知篇',
        subtitle: 'Day 1-2',
        icon: '🧠',
        lessons: [
          { id: 'cog-1', title: 'AI产品经理的角色定位', time: '8分钟' },
          { id: 'cog-2', title: 'AI行业全景与产品机会', time: '8分钟' },
          { id: 'cog-3', title: '跟工程师沟通的艺术：非技术PM的生存指南', time: '8分钟' }
        ]
      },
      {
        id: 'ai-pm-tech',
        title: '技术篇',
        subtitle: 'Day 3-5',
        icon: '⚙️',
        lessons: [
          { id: 'tech-1', title: '大模型选型实战：什么时候用什么模型、怎么评估', time: '12分钟' },
          { id: 'tech-2', title: 'AI项目成本估算', time: '10分钟' },
          { id: 'tech-3', title: 'Agent产品设计实战：从方法论到落地（面试重点）', time: '14分钟' }
        ]
      },
      {
        id: 'ai-pm-data',
        title: '数据篇',
        subtitle: 'Day 6-7',
        icon: '📊',
        lessons: [
          { id: 'data-1', title: 'AI功能指标体系设计', time: '10分钟' },
          { id: 'data-2', title: 'AB测试与效果评估', time: '10分钟' }
        ]
      },
      {
        id: 'ai-pm-design',
        title: '设计篇',
        subtitle: 'Day 8-10',
        icon: '🎨',
        lessons: [
          { id: 'des-1', title: 'AI产品交互设计原则', time: '10分钟' },
          { id: 'des-2', title: '降级策略与容错设计', time: '10分钟' },
          { id: 'des-3', title: '金融AI合规+安全实战：红线、审计、Prompt注入', time: '10分钟' }
        ]
      },
      {
        id: 'ai-pm-practice',
        title: '实战篇',
        subtitle: 'Day 11-20',
        icon: '💪',
        lessons: [
          { id: 'prac-1', title: 'AI产品从0到1全流程', time: '10分钟' },
          { id: 'prac-2', title: 'AI产品经理面试突击（非技术版）', time: '10分钟' },
          { id: 'prac-3', title: 'AI上线流程：灰度发布、蓝绿部署、feature flag', time: '8分钟' },
          { id: 'prac-4', title: '产品案例拆解：Perplexity、Coze、Notion AI的PM决策', time: '10分钟' },
          { id: 'prac-5', title: 'AI产品经理面试实战包：GitHub、Demo、Why说明、SDD', time: '10分钟' },
          { id: 'prac-6', title: 'AI产品经理常用工具：Cursor、Claude Code、Codex怎么选', time: '8分钟' }
        ]
      }
    ]
  },
  {
    id: 'ai-engineer',
    title: 'AI工程师',
    icon: '💻',
    color: '#34c759',
    status: 'coming-soon',
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    description: '掌握AI工程化落地的核心技术',
    tags: ['技术', '高薪'],
    modules: [
      {
        id: 'ai-eng-basic',
        title: '基础篇',
        subtitle: '第1-4天',
        icon: '📚',
        lessons: [
          { id: 'eng-1', title: 'Python AI开发环境', time: '10分钟' },
          { id: 'eng-2', title: '大模型API调用', time: '12分钟' },
          { id: 'eng-3', title: 'Prompt Engineering', time: '15分钟' },
          { id: 'eng-4', title: '向量数据库实战', time: '12分钟' }
        ]
      },
      {
        id: 'ai-eng-advanced',
        title: '进阶篇',
        subtitle: '第5-8天',
        icon: '🚀',
        lessons: [
          { id: 'eng-5', title: 'RAG系统搭建', time: '18分钟' },
          { id: 'eng-6', title: 'Agent开发框架', time: '20分钟' },
          { id: 'eng-7', title: '模型微调实战', time: '15分钟' },
          { id: 'eng-8', title: '性能优化技巧', time: '12分钟' }
        ]
      },
      {
        id: 'ai-eng-practice',
        title: '实战篇',
        subtitle: '第9-12天',
        icon: '💪',
        lessons: [
          { id: 'eng-9', title: '项目架构设计', time: '15分钟' },
          { id: 'eng-10', title: '部署与运维', time: '18分钟' },
          { id: 'eng-11', title: '面试算法题', time: '20分钟' },
          { id: 'eng-12', title: '系统设计面试', time: '25分钟' }
        ]
      }
    ]
  },
  {
    id: 'ai-analyst',
    title: 'AI数据分析师',
    icon: '📊',
    color: '#ff9500',
    status: 'coming-soon',
    progress: 0,
    totalLessons: 10,
    completedLessons: 0,
    description: '用AI提升数据分析效率10倍',
    tags: ['数据', '效率'],
    modules: [
      {
        id: 'ai-ana-basic',
        title: '基础篇',
        subtitle: '第1-3天',
        icon: '📚',
        lessons: [
          { id: 'ana-1', title: 'AI数据分析概述', time: '8分钟' },
          { id: 'ana-2', title: '数据清洗自动化', time: '12分钟' },
          { id: 'ana-3', title: 'SQL+AI联合查询', time: '10分钟' }
        ]
      },
      {
        id: 'ai-ana-advanced',
        title: '进阶篇',
        subtitle: '第4-7天',
        icon: '🚀',
        lessons: [
          { id: 'ana-4', title: '自然语言转SQL', time: '15分钟' },
          { id: 'ana-5', title: '自动化报表生成', time: '12分钟' },
          { id: 'ana-6', title: '异常检测AI化', time: '10分钟' },
          { id: 'ana-7', title: '数据可视化AI', time: '12分钟' }
        ]
      },
      {
        id: 'ai-ana-practice',
        title: '实战篇',
        subtitle: '第8-10天',
        icon: '💪',
        lessons: [
          { id: 'ana-8', title: '业务分析实战', time: '15分钟' },
          { id: 'ana-9', title: '数据产品设计', time: '18分钟' },
          { id: 'ana-10', title: '面试案例分析', time: '20分钟' }
        ]
      }
    ]
  },
  {
    id: 'ai-designer',
    title: 'AI设计师',
    icon: '🎨',
    color: '#ff2d55',
    status: 'coming-soon',
    progress: 0,
    totalLessons: 8,
    completedLessons: 0,
    description: 'AI时代的设计师进化之路',
    tags: ['设计', '创意'],
    modules: [
      {
        id: 'ai-des-basic',
        title: '基础篇',
        subtitle: '第1-3天',
        icon: '📚',
        lessons: [
          { id: 'ai-des-1', title: 'AI设计工具概览', time: '10分钟' },
          { id: 'ai-des-2', title: 'Midjourney实战', time: '15分钟' },
          { id: 'ai-des-3', title: 'Stable Diffusion入门', time: '12分钟' }
        ]
      },
      {
        id: 'ai-des-advanced',
        title: '进阶篇',
        subtitle: '第4-6天',
        icon: '🚀',
        lessons: [
          { id: 'ai-des-4', title: 'AI辅助UI设计', time: '15分钟' },
          { id: 'ai-des-5', title: '设计系统自动化', time: '12分钟' },
          { id: 'ai-des-6', title: '用户研究AI化', time: '10分钟' }
        ]
      },
      {
        id: 'ai-des-practice',
        title: '实战篇',
        subtitle: '第7-8天',
        icon: '💪',
        lessons: [
          { id: 'ai-des-7', title: '作品集打造', time: '15分钟' },
          { id: 'ai-des-8', title: '面试作品展示', time: '12分钟' }
        ]
      }
    ]
  },
  {
    id: 'ai-founder',
    title: 'AI创业者',
    icon: '🚀',
    color: '#5856d6',
    status: 'coming-soon',
    progress: 0,
    totalLessons: 10,
    completedLessons: 0,
    description: 'AI时代的创业方法论',
    tags: ['创业', '商业'],
    modules: [
      {
        id: 'ai-found-basic',
        title: '基础篇',
        subtitle: '第1-3天',
        icon: '📚',
        lessons: [
          { id: 'found-1', title: 'AI创业机会分析', time: '12分钟' },
          { id: 'found-2', title: '商业模式设计', time: '15分钟' },
          { id: 'found-3', title: 'MVP快速验证', time: '10分钟' }
        ]
      },
      {
        id: 'ai-found-advanced',
        title: '进阶篇',
        subtitle: '第4-7天',
        icon: '🚀',
        lessons: [
          { id: 'found-4', title: '技术选型决策', time: '12分钟' },
          { id: 'found-5', title: '团队搭建管理', time: '10分钟' },
          { id: 'found-6', title: '融资路演技巧', time: '15分钟' },
          { id: 'found-7', title: '增长黑客策略', time: '12分钟' }
        ]
      },
      {
        id: 'ai-found-practice',
        title: '实战篇',
        subtitle: '第8-10天',
        icon: '💪',
        lessons: [
          { id: 'found-8', title: '案例深度拆解', time: '18分钟' },
          { id: 'found-9', title: '实战项目孵化', time: '20分钟' },
          { id: 'found-10', title: '创业计划书', time: '15分钟' }
        ]
      }
    ]
  }
];
