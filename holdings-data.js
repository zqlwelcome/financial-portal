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
  buffett: {
    id: 'buffett',
    name: '巴菲特',
    icon: '🤑',
    color: '#34c759',
    totalValue: '~$263B (Berkshire)',
    updateDate: '2026-05-15',
    source: 'SEC 13F (Berkshire Hathaway)',
    summary: '第一重仓苹果虽小幅减持仍占22%，大幅加仓谷歌GOOGL(+204%)和纽约时报(+199%)，大幅减持CVX(-35%)和STZ(-95%)。伯克希尔现金储备创历史新高。',
    changes: [
      { action: 'add', ticker: 'GOOGL', company: 'Alphabet 谷歌A', pct: '+203.99%', detail: '翻3倍加仓，AI云业务增长强劲，估值仍有吸引力' },
      { action: 'add', ticker: 'NYT', company: 'New York Times', pct: '+199.00%', detail: '翻3倍加仓，数字订阅转型成功+AI合作战略' },
      { action: 'add', ticker: 'LEN', company: 'Lennar 建商', pct: '+43.24%', detail: '加仓房屋建筑商，美国降息周期利好地产' },
      { action: 'new', ticker: 'DAL', company: 'Delta Air Lines 达美航空', pct: null, detail: '新建仓3,980万股，航空业疫后复苏+出行需求旺盛' },
      { action: 'new', ticker: 'M', company: "Macy's 梅西百货", pct: null, detail: '新建仓303万股，零售业价值发现' },
      { action: 'reduce', ticker: 'STZ', company: 'Constellation Brands', pct: '-95.13%', detail: '几乎清仓，啤酒消费疲软+估值偏高' },
      { action: 'reduce', ticker: 'CVX', company: 'Chevron 雪佛龙', pct: '-35.17%', detail: '大幅减持，油价回调+全球能源转型' },
      { action: 'reduce', ticker: 'NUE', company: 'Nucor 纽柯钢铁', pct: '-39.03%', detail: '大幅减持，钢铁价格回落' },
      { action: 'reduce', ticker: 'DVA', company: 'DaVita 肾透析', pct: '-5.22%', detail: '小幅减持，仍持有3,010万股' },
      { action: 'reduce', ticker: 'BAC', company: 'Bank of America', pct: '-0.71%', detail: '微幅减持，仍持5.13亿股为第三大重仓' },
    ],
    holdings: [
      { ticker: 'AAPL', company: 'Apple 苹果', pct: 21.99, pctChange: 0, shares: '227,917,808', value: '$57,843M', comment: '第一重仓，虽小幅减持但绝对值仍最大' },
      { ticker: 'AXP', company: 'American Express 美国运通', pct: 17.43, pctChange: 0, shares: '151,610,700', value: '$45,859M', comment: '消费+企业支付双轮驱动' },
      { ticker: 'KO', company: 'Coca Cola 可口可乐', pct: 11.56, pctChange: 0, shares: '400,000,000', value: '$30,420M', comment: '经典消费防御股，持有超30年' },
      { ticker: 'BAC', company: 'Bank of America 美国银行', pct: 9.52, pctChange: -0.71, shares: '513,624,165', value: '$25,039M', comment: '利率敏感型资产' },
      { ticker: 'CVX', company: 'Chevron 雪佛龙', pct: 6.64, pctChange: -35.17, shares: '84,375,856', value: '$17,457M', comment: '大幅减持' },
      { ticker: 'OXY', company: 'Occidental 西方石油', pct: 6.55, pctChange: 0, shares: '264,941,431', value: '$17,221M', comment: '段永平也在减持' },
      { ticker: 'GOOGL', company: 'Alphabet 谷歌A', pct: 5.93, pctChange: 203.99, shares: '54,249,798', value: '$15,600M', comment: '翻3倍加仓！AI搜索+Cloud' },
      { ticker: 'CB', company: 'Chubb 安达保险', pct: 4.24, pctChange: 0, shares: '34,249,183', value: '$11,163M', comment: '全球最大上市财产险公司' },
      { ticker: 'MCO', company: "Moody's 穆迪", pct: 4.09, pctChange: 0, shares: '24,669,778', value: '$10,762M', comment: '信用评级+数据分析' },
      { ticker: 'KHC', company: 'Kraft Heinz 卡夫亨氏', pct: 2.78, pctChange: 0, shares: '325,634,818', value: '$7,324M', comment: '消费必需品' },
      { ticker: 'DVA', company: 'DaVita 肾透析', pct: 1.76, pctChange: -5.22, shares: '30,100,585', value: '$4,626M', comment: '小幅减持' },
      { ticker: 'KR', company: 'Kroger 克罗格', pct: 1.38, pctChange: 0, shares: '50,000,000', value: '$3,618M', comment: '美国最大连锁超市之一' },
      { ticker: 'SIRI', company: 'SiriusXM 卫星广播', pct: 1.09, pctChange: 0, shares: '124,807,117', value: '$2,881M', comment: '车载音频内容龙头' },
      { ticker: 'DAL', company: 'Delta Air Lines 达美航空', pct: 1.01, pctChange: null, shares: '39,809,456', value: '$2,647M', comment: '新建仓' },
      { ticker: 'VRSN', company: 'Verisign 域名注册', pct: 0.85, pctChange: 0, shares: '8,989,880', value: '$2,233M', comment: '.com域名垄断运营' },
      { ticker: 'COF', company: 'Capital One 第一资本', pct: 0.50, pctChange: 0, shares: '7,150,000', value: '$1,304M', comment: '信用卡金融' },
      { ticker: 'NYT', company: 'New York Times 纽约时报', pct: 0.48, pctChange: 199.00, shares: '15,146,535', value: '$1,268M', comment: '翻3倍加仓！' },
      { ticker: 'ALLY', company: 'Ally Financial', pct: 0.43, pctChange: 0, shares: '29,000,000', value: '$1,138M', comment: '在线银行+汽车金融' },
      { ticker: 'GOOG', company: 'Alphabet 谷歌C', pct: 0.39, pctChange: null, shares: '3,585,215', value: '$1,028M', comment: '新建仓（无投票权C类）' },
      { ticker: 'LLYVK', company: 'Liberty Media 自由媒体C', pct: 0.38, pctChange: -3.03, shares: '10,587,143', value: '$996M', comment: '体育+娱乐资产' },
      { ticker: 'LEN', company: 'Lennar 房屋建筑商', pct: 0.33, pctChange: 43.24, shares: '10,099,642', value: '$877M', comment: '降息周期利好' },
      { ticker: 'NUE', company: 'Nucor 纽柯钢铁', pct: 0.25, pctChange: -39.03, shares: '3,907,075', value: '$661M', comment: '大幅减持' },
      { ticker: 'STZ', company: 'Constellation Brands', pct: 0.04, pctChange: -95.13, shares: '632,890', value: '$95M', comment: '几乎清仓' },
      { ticker: 'M', company: "Macy's 梅西百货", pct: 0.02, pctChange: null, shares: '3,038,355', value: '$55M', comment: '新建仓' },
    ]
  },
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
