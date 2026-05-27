/**
 * 课程中心 - 多系列课程数据结构
 * 支持不同角色的课程系列
 */

const COURSE_SERIES = [
  {
    id: 'ai-pm',
    title: 'AI产品经理',
    icon: '🤖',
    color: '#0071e3',
    status: 'active', // active, coming-soon, locked
    progress: 60, // 进度百分比
    totalLessons: 10,
    completedLessons: 6,
    description: '从0到1掌握AI产品经理核心技能',
    tags: ['热门', '实战'],
    modules: [
      {
        id: 'ai-pm-basic',
        title: '基础篇',
        subtitle: '第1-3天',
        icon: '📚',
        lessons: [
          { id: 'pm-1', title: 'AI产品经理核心能力', time: '8分钟', status: 'completed' },
          { id: 'pm-2', title: 'AI产品PRD要点', time: '10分钟', status: 'completed' },
          { id: 'pm-3', title: '机器学习全流程', time: '12分钟', status: 'completed' }
        ]
      },
      {
        id: 'ai-pm-advanced',
        title: '进阶篇',
        subtitle: '第4-7天',
        icon: '🚀',
        lessons: [
          { id: 'pm-4', title: '大模型产品设计', time: '15分钟', status: 'completed' },
          { id: 'pm-5', title: 'Prompt工程实战', time: '12分钟', status: 'completed' },
          { id: 'pm-6', title: 'AI产品指标体系', time: '10分钟', status: 'completed' },
          { id: 'pm-7', title: '用户体验设计', time: '12分钟', status: 'current' }
        ]
      },
      {
        id: 'ai-pm-practice',
        title: '实战篇',
        subtitle: '第8-10天',
        icon: '💪',
        lessons: [
          { id: 'pm-8', title: 'AI产品落地案例', time: '15分钟', status: 'locked' },
          { id: 'pm-9', title: '面试实战包', time: '20分钟', status: 'locked' },
          { id: 'pm-10', title: '工具使用课', time: '18分钟', status: 'locked' }
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
          { id: 'eng-1', title: 'Python AI开发环境', time: '10分钟', status: 'locked' },
          { id: 'eng-2', title: '大模型API调用', time: '12分钟', status: 'locked' },
          { id: 'eng-3', title: 'Prompt Engineering', time: '15分钟', status: 'locked' },
          { id: 'eng-4', title: '向量数据库实战', time: '12分钟', status: 'locked' }
        ]
      },
      {
        id: 'ai-eng-advanced',
        title: '进阶篇',
        subtitle: '第5-8天',
        icon: '🚀',
        lessons: [
          { id: 'eng-5', title: 'RAG系统搭建', time: '18分钟', status: 'locked' },
          { id: 'eng-6', title: 'Agent开发框架', time: '20分钟', status: 'locked' },
          { id: 'eng-7', title: '模型微调实战', time: '15分钟', status: 'locked' },
          { id: 'eng-8', title: '性能优化技巧', time: '12分钟', status: 'locked' }
        ]
      },
      {
        id: 'ai-eng-practice',
        title: '实战篇',
        subtitle: '第9-12天',
        icon: '💪',
        lessons: [
          { id: 'eng-9', title: '项目架构设计', time: '15分钟', status: 'locked' },
          { id: 'eng-10', title: '部署与运维', time: '18分钟', status: 'locked' },
          { id: 'eng-11', title: '面试算法题', time: '20分钟', status: 'locked' },
          { id: 'eng-12', title: '系统设计面试', time: '25分钟', status: 'locked' }
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
          { id: 'ana-1', title: 'AI数据分析概述', time: '8分钟', status: 'locked' },
          { id: 'ana-2', title: '数据清洗自动化', time: '12分钟', status: 'locked' },
          { id: 'ana-3', title: 'SQL+AI联合查询', time: '10分钟', status: 'locked' }
        ]
      },
      {
        id: 'ai-ana-advanced',
        title: '进阶篇',
        subtitle: '第4-7天',
        icon: '🚀',
        lessons: [
          { id: 'ana-4', title: '自然语言转SQL', time: '15分钟', status: 'locked' },
          { id: 'ana-5', title: '自动化报表生成', time: '12分钟', status: 'locked' },
          { id: 'ana-6', title: '异常检测AI化', time: '10分钟', status: 'locked' },
          { id: 'ana-7', title: '数据可视化AI', time: '12分钟', status: 'locked' }
        ]
      },
      {
        id: 'ai-ana-practice',
        title: '实战篇',
        subtitle: '第8-10天',
        icon: '💪',
        lessons: [
          { id: 'ana-8', title: '业务分析实战', time: '15分钟', status: 'locked' },
          { id: 'ana-9', title: '数据产品设计', time: '18分钟', status: 'locked' },
          { id: 'ana-10', title: '面试案例分析', time: '20分钟', status: 'locked' }
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
          { id: 'des-1', title: 'AI设计工具概览', time: '10分钟', status: 'locked' },
          { id: 'des-2', title: 'Midjourney实战', time: '15分钟', status: 'locked' },
          { id: 'des-3', title: 'Stable Diffusion入门', time: '12分钟', status: 'locked' }
        ]
      },
      {
        id: 'ai-des-advanced',
        title: '进阶篇',
        subtitle: '第4-6天',
        icon: '🚀',
        lessons: [
          { id: 'des-4', title: 'AI辅助UI设计', time: '15分钟', status: 'locked' },
          { id: 'des-5', title: '设计系统自动化', time: '12分钟', status: 'locked' },
          { id: 'des-6', title: '用户研究AI化', time: '10分钟', status: 'locked' }
        ]
      },
      {
        id: 'ai-des-practice',
        title: '实战篇',
        subtitle: '第7-8天',
        icon: '💪',
        lessons: [
          { id: 'des-7', title: '作品集打造', time: '15分钟', status: 'locked' },
          { id: 'des-8', title: '面试作品展示', time: '12分钟', status: 'locked' }
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
          { id: 'found-1', title: 'AI创业机会分析', time: '12分钟', status: 'locked' },
          { id: 'found-2', title: '商业模式设计', time: '15分钟', status: 'locked' },
          { id: 'found-3', title: 'MVP快速验证', time: '10分钟', status: 'locked' }
        ]
      },
      {
        id: 'ai-found-advanced',
        title: '进阶篇',
        subtitle: '第4-7天',
        icon: '🚀',
        lessons: [
          { id: 'found-4', title: '技术选型决策', time: '12分钟', status: 'locked' },
          { id: 'found-5', title: '团队搭建管理', time: '10分钟', status: 'locked' },
          { id: 'found-6', title: '融资路演技巧', time: '15分钟', status: 'locked' },
          { id: 'found-7', title: '增长黑客策略', time: '12分钟', status: 'locked' }
        ]
      },
      {
        id: 'ai-found-practice',
        title: '实战篇',
        subtitle: '第8-10天',
        icon: '💪',
        lessons: [
          { id: 'found-8', title: '案例深度拆解', time: '18分钟', status: 'locked' },
          { id: 'found-9', title: '实战项目孵化', time: '20分钟', status: 'locked' },
          { id: 'found-10', title: '创业计划书', time: '15分钟', status: 'locked' }
        ]
      }
    ]
  }
];
