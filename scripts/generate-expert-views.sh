#!/bin/bash
# =============================================
# 达人观点 + 新闻评分 自动生成脚本
# 在新闻更新后执行，基于hot-news.json + alerts.json
# 1. 对新闻进行综合评分排序（热度/影响/时效/多样性）
# 2. 生成带市场情绪多维数据的达人观点
# 输出: data/hot-news.json (重排序) + data/expert-views.json
# =============================================

NOW=$(date '+%Y-%m-%d %H:%M')
DATA_DIR="/Users/summezhang/financial-portal/data"
VIEWS_OUTPUT="$DATA_DIR/expert-views.json"

echo "🧠 达人观点+新闻评分生成 - $NOW"

if [ ! -f "$DATA_DIR/hot-news.json" ]; then
  echo "❌ hot-news.json 不存在"
  exit 1
fi

python3 -c "
import json, re, math
from datetime import datetime

now = datetime.now()

# 读取数据
with open('$DATA_DIR/hot-news.json') as f:
    news_data = json.load(f)

with open('$DATA_DIR/alerts.json') as f:
    alerts_data = json.load(f)

hot_news = news_data.get('news', [])
alerts = alerts_data
update_time = news_data.get('updateTime', now.strftime('%Y-%m-%d %H:%M'))

if not hot_news:
    print('❌ 无新闻数据')
    exit(1)

# ===== 1. 新闻评分排序 =====
def score_news(item):
    title = item.get('title', '')
    summary = item.get('summary', '') or ''
    text = title + ' ' + summary
    
    score = 0
    reasons = []
    
    # 热度词（重磅/突发/首次/历史性）
    hot_words = len(re.findall(r'重磅|突发|首次|历史性|紧急|崩盘|暴涨|暴跌|涨停|跌停|创.*新[高 low]', text))
    score += hot_words * 15
    if hot_words > 0: reasons.append(f'热度+{hot_words*15}')
    
    # 市场影响：涉及具体指数/政策/央行/龙头公司
    market_impact = 0
    if re.search(r'美联储|央行|降息|加息|利率|关税|制裁|政策', text): market_impact += 20
    if re.search(r'A股|港股|美股|沪指|恒指|纳斯达克|上证', text): market_impact += 15
    if re.search(r'苹果|英伟达|特斯拉|腾讯|阿里|茅台|比亚迪', text): market_impact += 15
    if re.search(r'亿元|万亿|\d+%|百分点', text): market_impact += 10
    if re.search(r'北向资金|外资|主力|增量资金', text): market_impact += 15
    if re.search(r'协议|签约|批准|通过|落地|启动', text): market_impact += 10
    score += market_impact
    if market_impact > 0: reasons.append(f'市场+{market_impact}')
    
    # 事件严重性
    severity = 0
    if re.search(r'地震|暴雨|洪水|台风|火灾|爆炸|空难|冲突|战争|袭击|死亡|失联|紧急', text): severity += 20
    if re.search(r'制裁|封锁|禁令|断供|退市|破产|违约|下调|降级', text): severity += 15
    if re.search(r'新高|突破|超越|里程碑|纪录', text): severity += 10
    score += severity
    if severity > 0: reasons.append(f'事件+{severity}')
    
    # 时效性加权（标题含今日/刚刚/最新）
    if re.search(r'今[日天]|刚刚|最新|快讯|突发', title): score += 10
    
    # 多样性惩罚（同一主题聚类——简化版：标题相似度）
    # 在后续处理
    
    return score, reasons

# 给每条新闻打分
scored = []
for item in hot_news:
    s, reasons = score_news(item)
    scored.append((s, item, reasons))

# 按评分排序（高分在前）
scored.sort(key=lambda x: -x[0])

# 多样性去重：同一主题的只保留最高分那条
seen_topics = set()
deduped = []
for s, item, reasons in scored:
    title = item.get('title', '')
    # 提取核心主题词（前10个字内的公司/事件名）
    topic_match = re.match(r'([\u4e00-\u9fa5A-Z]{2,10})', title)
    topic = topic_match.group(1) if topic_match else title[:8]
    
    if topic not in seen_topics:
        seen_topics.add(topic)
        deduped.append((s, item, reasons))
    else:
        # 同一主题的次条，如果评分显著更高也保留
        if s > 50:
            deduped.append((s, item, reasons))

# 最多保留10条
deduped = deduped[:10]

# 重新排序后的新闻列表
sorted_news = []
for i, (s, item, reasons) in enumerate(deduped):
    item_copy = dict(item)
    sorted_news.append(item_copy)

# 更新 hot-news.json 中的新闻顺序
news_data['news'] = sorted_news
news_data['updateTime'] = update_time

with open('$DATA_DIR/hot-news.json', 'w', encoding='utf-8') as f:
    json.dump(news_data, f, ensure_ascii=False, indent=2)

print(f'✅ 新闻已排序: {len(sorted_news)} 条')
for i, (s, item, reasons) in enumerate(deduped):
    print(f'   {i+1}. [{s}分] {item.get(\"title\",\"\")[:50]}')

# ===== 2. 多维市场情绪分析 =====
titles = [h.get('title','') + ' ' + (h.get('summary','') or '') for h in sorted_news]
all_text = ' '.join(titles)

# 价格趋势
bullish = len(re.findall(r'涨|升|新高|反弹|突破|利好|放量|拉升|走强', all_text))
bearish = len(re.findall(r'跌|降|新低|回落|利空|风险|回调|走弱|抛售', all_text))
momentum_score = bullish - bearish
if momentum_score > 3: momentum_dir = '温和上涨'
elif momentum_score > 1: momentum_dir = '偏强'
elif momentum_score > -2: momentum_dir = '震荡'
elif momentum_score > -4: momentum_dir = '偏弱'
else: momentum_dir = '承压'

# 资金流向
has_north = bool(re.search(r'北向资金.*净流入|外资.*加仓|增量资金', all_text))
has_north_out = bool(re.search(r'北向资金.*净流出|外资.*减仓|流出', all_text))
if has_north and not has_north_out: capital = '外资流入 · 积极'
elif has_north_out: capital = '资金流出 · 偏谨慎'
else: capital = '中性'

# 地缘风险
has_geo_risk = bool(re.search(r'中东|冲突|战争|伊朗|以色列|俄乌|制裁|地缘', all_text))
has_geo_deal = bool(re.search(r'协议|停火|和谈|缓和|签署', all_text))
if has_geo_deal: geo = '地缘缓和 · 利好'
elif has_geo_risk: geo = '地缘紧张 · 风险'
else: geo = '平稳'

# 行业轮动
sectors = []
if re.search(r'AI|人工智能|大模型|英伟达|芯片|算力', all_text): sectors.append('AI科技')
if re.search(r'新能源|光伏|电车|电池|锂', all_text): sectors.append('新能源')
if re.search(r'消费|白酒|零售|旅游|餐饮', all_text): sectors.append('消费')
if re.search(r'银行|券商|保险|金融', all_text): sectors.append('金融')
if re.search(r'医药|医疗|生物|创新药', all_text): sectors.append('医药')
if re.search(r'地产|房地产|建材|基建', all_text): sectors.append('地产')
sector_str = ' · '.join(sectors) if sectors else '无明显热点'

# 恐慌贪婪
fear_words = len(re.findall(r'恐慌|崩盘|暴跌|抛售|踩踏|熔断', all_text))
greed_words = len(re.findall(r'暴涨|涨停|创新高|抢筹|疯涨|狂热', all_text))
if fear_words > 2: fear_greed = '极度恐惧'
elif fear_words > 0: fear_greed = '偏恐惧'
elif greed_words > 2: fear_greed = '极度贪婪'
elif greed_words > 0: fear_greed = '偏贪婪'
else: fear_greed = '中性'

# 宏观信号
has_rate_dove = bool(re.search(r'降息|鸽派|宽松|放水', all_text))
has_rate_hawk = bool(re.search(r'加息|鹰派|紧缩|缩表', all_text))
if has_rate_dove: macro = '政策宽松预期'
elif has_rate_hawk: macro = '政策紧缩信号'
else: macro = '政策中性'

# 信心度
confidence = 5
if momentum_score > 0: confidence += 1
if momentum_score > 3: confidence += 1
if has_north and not has_north_out: confidence += 1
if has_geo_deal: confidence += 1
if has_rate_dove: confidence += 1
if fear_words > 2 or greed_words > 2: confidence -= 1
confidence = max(1, min(10, confidence))

# 综合情绪
total_score = momentum_score + (1 if has_north and not has_north_out else -1 if has_north_out else 0) + (-1 if has_geo_risk else 1 if has_geo_deal else 0)
if total_score > 3: mood = '偏乐观'
elif total_score > 0: mood = '谨慎乐观'
elif total_score > -3: mood = '震荡中性'
else: mood = '偏谨慎'

mood_data = {
    'mood': mood,
    'icon': '📈' if total_score > 0 else '📉' if total_score < -2 else '➖',
    'color': '#34c759' if total_score > 2 else '#ff9500' if total_score > 0 else '#ff3b30' if total_score < -2 else '#86868b',
    'confidence': confidence,
    'dimensions': [
        {'label': '价格趋势', 'value': momentum_dir},
        {'label': '资金流向', 'value': capital},
        {'label': '地缘风险', 'value': geo},
        {'label': '热点板块', 'value': sector_str},
        {'label': '市场情绪', 'value': fear_greed},
        {'label': '宏观信号', 'value': macro},
    ],
    'summary': f'整体{mood}（{confidence}/10）。{momentum_dir}，{capital}。{geo}。{fear_greed}。'
}

# ===== 3. 达人观点 =====
has_ai = bool(re.search(r'AI|人工智能|大模型|DeepSeek|英伟达', all_text))
has_crypto = bool(re.search(r'比特币|加密货币|BTC|以太坊', all_text))
has_oil = bool(re.search(r'原油|油价|石油', all_text))
has_rate = bool(re.search(r'利率|降息|加息|美联储|央行', all_text))
has_stocks = bool(re.search(r'A股|港股|美股|沪指|恒指|牛市', all_text))
has_consumer = bool(re.search(r'消费|白酒|零售|电商|拼多多|阿里', all_text))
has_tech = bool(re.search(r'科技|芯片|半导体|AI|苹果|英伟达|谷歌', all_text))
has_tradewar = bool(re.search(r'关税|贸易|制裁|出口', all_text))
has_earnings = bool(re.search(r'财报|业绩|营收|利润|季报', all_text))

top_title = sorted_news[0].get('title', '') if sorted_news else ''

experts = {}

# 邓普顿
templeton_parts = []
templeton_parts.append(f'今日{mood}，信心度{confidence}/10')

if has_geo_deal:
    templeton_parts.append('地缘缓和的本质是风险溢价的释放。当霍尔木兹恢复通航、制裁松动的新闻占据头条时，短期情绪已经price in——真正的逆向机会在于协议执行的波折和后续谈判的不确定性被市场低估。建议关注因中东风险而被过度压低估值的航运和能源股。')
elif has_geo_risk:
    templeton_parts.append('地缘紧张局面下，资金正在逃离风险资产涌入避险。但逆向投资的黄金法则是：当恐慌最严重时买入。历史上每一次中东冲突对市场的影响都在减弱。我认为这次也不例外。')
elif has_north:
    templeton_parts.append(f'北向资金正在流入，这是全球资金重新配置中国资产的前奏。当所有人盯着热门赛道时，被忽视的二线蓝筹可能更具性价比。')
elif has_tradewar:
    templeton_parts.append('贸易摩擦本质是全球化重构，不是简单的利空。提前布局海外产能的公司将获得双重红利：关税规避+更低的劳动力成本。市场的线性思维低估了这个结构性变化。')
elif has_rate:
    templeton_parts.append('全球利率周期正在转向。当市场一致预期政策方向时，真正的预期差往往来自政策力度。不要押注方向，而是做多波动率——同时持有股债，等待方向明朗。')
else:
    templeton_parts.append('当市场没有明确方向时，逆向投资者应该关注那些被短期情绪压低估值的优质资产。恐慌时买入，乐观时持有，狂热时卖出。')

experts['templeton'] = {
    'insight': ' '.join(templeton_parts),
    'action': '关注港股和A股中被低估的消费和科技龙头，利用回调分批建仓，设置5%止损。'
}

# 巴菲特
buffett_parts = []
buffett_parts.append(f'今天市场{mood}。但我更关心的是：这些波动改变了优质公司的内在价值吗？')

if has_ai:
    buffett_parts.append('AI的热度让我想起互联网泡沫。不是每个AI公司都有护城河——真正持久的竞争力来自数据网络效应和品牌心智。我会选择那些已经证明了自己盈利能力的科技巨头，它们的AI投入是锦上添花而非故事本身。')
elif has_earnings:
    buffett_parts.append('财报季是最好的试金石。真正优秀的公司即使在困难环境下也能交出不错的成绩单。关注营收增长、利润率稳定、现金流充裕的公司——它们是任何市场环境下的压舱石。')
elif has_consumer:
    buffett_parts.append('消费股是我最喜欢的赛道。拥有强大品牌和定价权的消费龙头，在任何经济周期中都能活得很好。现在的回调提供了更好的买入价格。')
elif has_stocks:
    buffett_parts.append('好公司的标准不会因为市场短期涨跌而改变：ROE>15%、负债率<50%、经营现金流>净利润。用这个标准筛选，你会发现值得长期持有的标的其实不少。')
else:
    buffett_parts.append('在不确定的市场中，我最看重的三个指标：定价权、现金流、护城河。满足这三条的公司不需要频繁交易，耐心持有即可穿越周期。')

experts['buffett'] = {
    'insight': ' '.join(buffett_parts),
    'action': '建议关注沪深300和中证500指数基金，每月定投。个股关注现金流充裕的消费龙头。'
}

# 芒格
munger_parts = []
munger_parts.append('用三层思维拆解今日市场：')

layer1 = f'第一层（共识）：今日{mood}。'
munger_parts.append(layer1)

if has_rate:
    munger_parts.append('第二层（逆向）：降息预期已被部分定价，真正的惊喜可能在方向和时点。第三层（结构性）：如果利率长期维持高位，银行和保险反而受益——大多数人忽略了这一点。')
elif has_ai:
    munger_parts.append('第二层（逆向）：AI降价加速行业洗牌，烧钱的小公司可能出局。第三层（结构性）：真正受益的是那些用AI重构成本结构的传统行业，而非AI公司本身。')
elif has_geo_deal:
    munger_parts.append('第二层（逆向）：协议签署日往往是短期高点。第三层（结构性）：中东重建需求可能带来持续数年的增长。')
elif has_stocks:
    munger_parts.append('第二层（逆向）：上涨时最容易犯错——追高。第三层（结构性）：好公司会在任何市场环境下创新高。如果明天跌5%，你会加仓还是割肉？答案决定了你的仓位是否合理。')
else:
    munger_parts.append('第二层（逆向）：今天的新闻很可能不影响任何一家优质公司的长期价值。第三层（结构性）：人类的认知偏误中，最常见的是过度反应。好的投资者不是预测未来，而是理解现在。')

munger_parts.append('')
munger_parts.append('检查清单：① 这个新闻是噪音还是信号？② 我的判断是否存在确认偏误？③ 如果错了，最坏情况是什么？')

experts['munger'] = {
    'insight': '\\n'.join(munger_parts),
    'action': '控制仓位比选股更重要。建议保持60%权益+40%现金/债券的均衡配置，利用市场波动调整持仓。'
}

# ===== 4. 输出 =====
views_output = {
    'updateTime': update_time,
    'generatedAt': now.strftime('%Y-%m-%d %H:%M'),
    'mood': mood_data,
    'experts': experts
}

with open('$VIEWS_OUTPUT', 'w', encoding='utf-8') as f:
    json.dump(views_output, f, ensure_ascii=False, indent=2)

print(f'\\n✅ 达人观点已生成')
print(f'情绪: {mood} ({confidence}/10)')
print(f'趋势: {momentum_dir} / {capital} / {geo}')
print(f'达人: 3位观点已更新')
"
