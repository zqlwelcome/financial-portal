/**
 * 投资人持仓情报 v1
 * ==================================
 * 数据来源: SEC 13F 文件 / 公开披露
 * 格式说明:
 *   portfolio: { name, icon, color, totalValue, updateDate, summary }
 *   changes: [{ action: 'add'|'reduce'|'new'|'exit', ticker, company, pct, detail, shares }]
 *   holdings: [{ ticker, company, pct, pctChange, shares, value, comment? }]
 *   (pctChange > 0 = 增持, < 0 = 减持, null/NaN = 新买入/清仓)
 *
 * 段永平数据: 2026 Q1 13F (2026-05-19 更新) - 来自 SEC filing / dataroma
 * 木头姐数据: 2026 Q1 13F 概览 (ARKK旗舰基金)
 * 特朗普数据: 2026 公开财务披露 / DJT持股
 */

const INVESTOR_HOLDINGS = {
  duan: {
    id: 'duan',
    name: '段永平',
    icon: '🧑‍💼',
    color: '#5856d6',
    totalValue: '~$20.0B',
    updateDate: '2026-05-19',
    source: 'SEC 13F (H&H International)',
    summary: '大幅加仓科技AI赛道，增持NVDA(+91%)、GOOG(+99%)、PDD(+71%)，新建仓TSLA和UNH，减持AAPL和OXY。',
    // 重大变动（按变动幅度绝对值排序）
    changes: [
      { action: 'add', ticker: 'CRDO', company: 'Credo Technology', pct: '+431.63%', detail: 'AI网络芯片新星，数据中心互联需求激增' },
      { action: 'add', ticker: 'GOOG', company: '谷歌Alphabet', pct: '+99.74%', detail: 'AI搜索+Cloud增长强劲，Gemini生态加速' },
      { action: 'add', ticker: 'NVDA', company: '英伟达', pct: '+91.29%', detail: 'AI算力龙头，Blackwell架构持续供不应求' },
      { action: 'add', ticker: 'PDD', company: '拼多多', pct: '+71.18%', detail: 'TEMU海外高速扩张，估值仍有空间' },
      { action: 'add', ticker: 'DIS', company: '迪士尼', pct: '+112.33%', detail: '主题公园+流媒体双驱动，估值修复' },
      { action: 'new', ticker: 'TSLA', company: '特斯拉', pct: null, detail: '新建仓3,408,900股，看好FSD+机器人' },
      { action: 'new', ticker: 'UNH', company: '联合健康', pct: null, detail: '新建仓601,400股，医疗刚需+AI效率' },
      { action: 'new', ticker: 'CRCL', company: 'Circle Internet', pct: null, detail: 'USDC稳定币发行商，布局数字资产' },
      { action: 'new', ticker: 'PLTR', company: 'Palantir', pct: null, detail: 'AI+大数据分析，政府企业订单增长' },
      { action: 'new', ticker: 'CRWD', company: 'CrowdStrike', pct: null, detail: '网络安全龙头，AI驱动威胁检测' },
      { action: 'reduce', ticker: 'TSM', company: '台积电', pct: '-87.65%', detail: '大幅减持，可能是估值过高或地缘风险' },
      { action: 'reduce', ticker: 'TEM', company: 'Tempus AI', pct: '-81.82%', detail: '减仓获利，AI医疗赛道短期涨幅过大' },
      { action: 'reduce', ticker: 'OXY', company: '西方石油', pct: '-22.10%', detail: '连续减持，能源板块配比下调' },
      { action: 'reduce', ticker: 'AAPL', company: '苹果', pct: '-10.55%', detail: '小幅减仓，占比仍高达36.72%' },
    ],
    // 完整持仓（按仓位占比排序）
    holdings: [
      { ticker: 'AAPL', company: 'Apple 苹果', pct: 36.72, pctChange: -10.55, shares: '28,945,607', value: '$7,346M', comment: '第一重仓' },
      { ticker: 'BRK.B', company: 'Berkshire Hathaway 伯克希尔B', pct: 21.91, pctChange: 27.47, shares: '9,147,796', value: '$4,384M', comment: '受益于巴菲特减持苹果加仓' },
      { ticker: 'NVDA', company: 'NVIDIA 英伟达', pct: 12.07, pctChange: 91.29, shares: '13,843,775', value: '$2,414M', comment: 'AI算力核心资产' },
      { ticker: 'PDD', company: 'Pinduoduo 拼多多', pct: 10.09, pctChange: 71.18, shares: '19,748,294', value: '$2,018M', comment: 'TEMU出海红利' },
      { ticker: 'TSLA', company: 'Tesla 特斯拉', pct: 6.34, pctChange: null, shares: '3,408,900', value: '$1,267M', comment: '新建仓' },
      { ticker: 'GOOG', company: 'Alphabet 谷歌', pct: 5.31, pctChange: 99.74, shares: '3,706,000', value: '$1,063M', comment: 'AI搜索时代赢家' },
      { ticker: 'OXY', company: 'Occidental 西方石油', pct: 3.33, pctChange: -22.10, shares: '10,261,500', value: '$667M', comment: '连续减持' },
      { ticker: 'MSFT', company: 'Microsoft 微软', pct: 1.88, pctChange: 18.28, shares: '1,016,000', value: '$376M', comment: '小幅加仓' },
      { ticker: 'UNH', company: 'UnitedHealth 联合健康', pct: 0.81, pctChange: null, shares: '601,400', value: '$163M', comment: '新建仓' },
      { ticker: 'DIS', company: 'Walt Disney 迪士尼', pct: 0.73, pctChange: 112.33, shares: '1,511,800', value: '$146M', comment: '翻倍加仓' },
      { ticker: 'CRDO', company: 'Credo Technology', pct: 0.35, pctChange: 431.63, shares: '751,200', value: '$71M', comment: 'AI网络芯片' },
      { ticker: 'TSM', company: '台积电', pct: 0.26, pctChange: -87.65, shares: '151,200', value: '$51M', comment: '大幅减持' },
    ]
  },
  cathie: {
    id: 'cathie',
    name: '木头姐',
    icon: '🦊',
    color: '#ff2d55',
    totalValue: '~$13B (ARKK)',
    updateDate: '2026-Q1',
    source: 'SEC 13F / ARK每日披露',
    summary: '专注颠覆性创新赛道，重仓自动驾驶、数字资产、基因编辑。持续加仓TSLA、COIN，看好AI+机器人长期趋势。',
    changes: [
      { action: 'new', ticker: 'RKLB', company: 'Rocket Lab', pct: null, detail: '新建仓，太空经济低轨卫星发射龙头' },
      { action: 'add', ticker: 'TSLA', company: '特斯拉', pct: '+15%', detail: 'Robotaxi年底落地预期，FSD订阅收入增长' },
      { action: 'add', ticker: 'COIN', company: 'Coinbase', pct: '+12%', detail: '加密货币合规化利好，BTC ETF资金持续流入' },
      { action: 'add', ticker: 'ROKU', company: 'Roku', pct: '+8%', detail: '流媒体广告收入回暖，TV OS平台价值重估' },
      { action: 'reduce', ticker: 'TDOC', company: 'Teladoc', pct: '-20%', detail: '远程医疗增长放缓，竞争加剧' },
    ],
    holdings: [
      { ticker: 'TSLA', company: 'Tesla 特斯拉', pct: 10.3, pctChange: 15, shares: '~4.2M', value: '$1.8B', comment: '第一重仓，ARK核心标的' },
      { ticker: 'ROKU', company: 'Roku 流媒体', pct: 8.1, pctChange: 8, shares: '~5.1M', value: '$1.1B', comment: '平台型资产' },
      { ticker: 'COIN', company: 'Coinbase', pct: 7.2, pctChange: 12, shares: '~1.8M', value: '$980M', comment: '加密合规化受益' },
      { ticker: 'CRSP', company: 'CRISPR Therapeutics', pct: 5.4, pctChange: 0, shares: '~2.9M', value: '$720M', comment: '基因编辑先锋' },
      { ticker: 'RKLB', company: 'Rocket Lab', pct: 4.8, pctChange: null, shares: '~3.5M', value: '$650M', comment: '新建仓' },
      { ticker: 'PATH', company: 'UiPath', pct: 4.2, pctChange: -5, shares: '~3.8M', value: '$570M', comment: '自动化软件' },
      { ticker: 'PLTR', company: 'Palantir', pct: 3.8, pctChange: 10, shares: '~2.1M', value: '$520M', comment: 'AI+大数据' },
      { ticker: 'Z', company: 'Zillow', pct: 3.5, pctChange: 6, shares: '~2.5M', value: '$480M', comment: '房地产科技' },
      { ticker: 'SQ', company: 'Block (Square)', pct: 3.2, pctChange: -8, shares: '~3.0M', value: '$440M', comment: '支付+比特币' },
      { ticker: 'RBLX', company: 'Roblox', pct: 2.8, pctChange: 0, shares: '~2.8M', value: '$380M', comment: '元宇宙游戏' },
    ]
  },
  trump: {
    id: 'trump',
    name: '特朗普',
    icon: '🇺🇸',
    color: '#ff9500',
    totalValue: '~$5.6B (估算)',
    updateDate: '2026-04',
    source: '公开财务披露 / SEC',
    summary: '主要资产为Trump Media(DJT)上市公司控股股份，其他通过信托基金持有，含科技和能源类ETF。',
    changes: [
      { action: 'add', ticker: 'DJT', company: 'Trump Media & Tech', pct: null, detail: '无可比数据（2024年上市），控股~53%股份' },
      { action: 'new', ticker: 'BTC', company: '比特币相关ETF', pct: null, detail: '通过信托配置数字资产，Q1新增' },
    ],
    holdings: [
      { ticker: 'DJT', company: 'Trump Media & Tech', pct: 53.0, pctChange: null, shares: '~114M', value: '$3.2B', comment: '控股，Truth Social母公司' },
      { ticker: 'TRUMP', company: '特朗普品牌授权', pct: 15.0, pctChange: null, shares: 'N/A', value: '$900M', comment: '品牌授权+酒店地产' },
      { ticker: 'ETF', company: '多只ETF组合', pct: 12.0, pctChange: 5, shares: 'N/A', value: '$700M', comment: '通过Blumberg信托持有' },
      { ticker: 'TECH', company: '科技股组合', pct: 10.0, pctChange: 3, shares: 'N/A', value: '$560M', comment: '含AAPL,MSFT等' },
      { ticker: 'RE', company: '商业地产', pct: 6.0, pctChange: -2, shares: 'N/A', value: '$340M', comment: '写字楼+高尔夫球场' },
      { ticker: 'CRYPTO', company: '加密资产ETF', pct: 4.0, pctChange: null, shares: 'N/A', value: '$220M', comment: 'Q1新增配置' },
    ]
  }
};
