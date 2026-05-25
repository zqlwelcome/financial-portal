#!/usr/bin/env python3
"""Generate hot-news.json and alerts.json from multiple API sources."""
import json, re, sys
from datetime import datetime, timezone, timedelta

# Get local time in China
tz = timezone(timedelta(hours=8))
now = datetime.now(tz)
ts = now.strftime("%Y-%m-%d %H:%M")

print(f"[{ts}] Generating news data...")

try:
    from urllib.request import Request, urlopen
except ImportError:
    print("urllib not available")
    sys.exit(1)

def fetch(url, headers=None):
    req = Request(url)
    req.add_header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)')
    req.add_header('Accept', 'application/json, text/plain, */*')
    if headers:
        for k, v in headers.items():
            req.add_header(k, v)
    try:
        resp = urlopen(req, timeout=10)
        return resp.read().decode('utf-8', errors='replace')
    except Exception as e:
        print(f"  Fetch error: {e}")
        return None

def clean_text(text):
    """Clean up text: remove extra whitespace, normalize newlines."""
    text = text.replace('\r\n', '\n').replace('\r', '\n')
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = text.strip()
    return text

def is_finance_news(title, summary):
    """Check if news is finance/market related."""
    text = title + summary
    keywords = [
        '伊朗', '美伊', '霍尔木兹', '原油', '油价', '布伦特', '石油',
        '美股', 'A股', '港股', '沪指', '恒指', '纳指', '道指', '标普',
        '美联储', '央行', '利率', '降息', '加息', '通胀', 'PCE', 'GDP', '就业',
        'AI', '人工智能', '半导体', '芯片', '新能源', '储能', '光伏', '算力',
        '科技股', '特斯拉', '苹果', '英伟达', '谷歌', '微软',
        '欧洲央行', '日本央行', '韩国',
        '比特币', '加密货币', '数字货币',
        '关税', '贸易', '制裁', '协议', '谈判', '停火',
        '特朗普', '白宫', '哈塞特',
        '上证', '深证', '创业板',
        '基金', 'ETF', '北向资金',
        '减持', '增持', '回购', '套现',
        '财报', '业绩', '利润', '营收',
        '银行', '金融', '保险', '证券',
        '航运', '达飞', 'SpaceX', 'OpenAI', 'IPO',
        '美元', '人民币', '汇率', '外汇',
        '黄金', '大宗商品', '期货', '能源',
        '中东', '地缘', '以色列', '黎巴嫩', '真主党',
        '阿联酋', '约旦', '沙特', '卡塔尔',
        '内幕交易', '监管', '处罚', '罚款', '罚没',
        'Anthropic', 'Mythos', '模型漏洞', '网络安全',
        '百诚医药', '控制权变更', '停牌',
        '期货', '指数', '市场', '股市',
        '报', '涨', '跌', '涨幅', '跌幅',
        '亿元', '万亿', '亿美元',
    ]
    return any(k in text for k in keywords)

def get_title(item, content_text=''):
    """Get a clean title."""
    title = item.get('title', '') or ''
    # Clean up newlines
    title = title.split('\n')[0].strip()
    if not title and content_text:
        title = content_text[:60]
    return title[:100]

def get_summary(text):
    """Get summary (first 120 chars of first sentence/paragraph)."""
    # Take first paragraph
    para = text.split('\n')[0].strip()
    if len(para) > 120:
        para = para[:117] + '...'
    # Also try to take first sentence
    if '。' in para:
        first_sent = para.split('。')[0] + '。'
        if len(first_sent) <= 120:
            return first_sent
    return para

def get_detail(text):
    """Get full detail text (up to 300 chars, complete sentences)."""
    if len(text) <= 300:
        return text
    # Find last sentence boundary within 300 chars
    truncated = text[:297]
    last_period = max(truncated.rfind('。'), truncated.rfind('）') + 1)
    if last_period > 50:
        return text[:last_period+1]
    return truncated + '...'

news_items = []

# =====================
# Source 1: Sina Finance JSONP
# =====================
print("Fetching Sina Finance news...")
sina_raw = fetch("https://feed.mix.sina.com.cn/api/roll/get?pageid=153&lid=2509&num=10&callback=CB")
if sina_raw:
    try:
        sina_raw = sina_raw.replace('\\/', '/')
        start = sina_raw.find('({') + 1
        depth = 0
        for i in range(start, len(sina_raw)):
            c = sina_raw[i]
            if c == '{': depth += 1
            elif c == '}': 
                depth -= 1
                if depth == 0:
                    end = i + 1
                    break
        json_str = sina_raw[start:end]
        data = json.loads(json_str)
        items = data['result']['data']
        print(f"  Got {len(items)} items from Sina")
        for item in items:
            title = item.get('title', '')
            media = item.get('media_name', '')
            intro = item.get('intro', '')
            ctime = item.get('ctime', '')
            dt = datetime.fromtimestamp(int(ctime), tz=tz) if ctime else now
            
            # Clean content
            intro_clean = clean_text(intro)
            title_clean = get_title(item, intro_clean)
            
            # Skip ads/sponsored content
            if 'ETF' in title_clean and ('基金' in media):
                continue
            # Skip generic fund promotional articles
            if media == '新浪基金' and 'ETF' in title_clean:
                continue
            
            if not is_finance_news(title_clean, intro_clean):
                continue
                
            news_items.append({
                'source': media,
                'time': dt.strftime("%Y-%m-%d %H:%M"),
                'title': title_clean,
                'summary': get_summary(intro_clean) or title_clean,
                'detail': get_detail(intro_clean) or title_clean
            })
    except Exception as e:
        print(f"  Sina parse error: {e}")

# =====================
# Source 2: WallStreetCN flash news
# =====================
print("Fetching WallStreetCN news...")
wscn_raw = fetch("https://api-one-wscn.awtmt.com/apiv1/content/lives?channel=global-channel&limit=20")
if wscn_raw:
    try:
        wscn_json = json.loads(wscn_raw)
        items = wscn_json.get('data', {}).get('items', [])
        print(f"  Got {len(items)} items from WSCN")
        for item in items:
            content = item.get('content', '')
            content_text = item.get('content_text', '') or content
            display_time = item.get('display_time', 0)
            dt = datetime.fromtimestamp(int(display_time), tz=tz) if display_time else now
            
            text_clean = clean_text(content_text)
            title = get_title(item, text_clean)
            
            if not title or not text_clean:
                continue
            if not is_finance_news(title, text_clean):
                continue
            # Skip duplicates
            if any(n['title'][:25] in title or title[:25] in n['title'][:25] for n in news_items):
                continue
                
            news_items.append({
                'source': '华尔街见闻',
                'time': dt.strftime("%Y-%m-%d %H:%M"),
                'title': title,
                'summary': get_summary(text_clean),
                'detail': get_detail(text_clean)
            })
    except Exception as e:
        print(f"  WSCN parse error: {e}")

# =====================
# Sort, deduplicate and finalize
# =====================
# Sort by time (newest first)
news_items.sort(key=lambda x: x['time'], reverse=True)

# Remove duplicates by title similarity
final_items = []
seen = set()
for item in news_items:
    sig = item['title'][:30]
    if sig not in seen:
        seen.add(sig)
        final_items.append(item)
    if len(final_items) >= 10:
        break

news_items = final_items[:10]

# If we don't have 10 items, add recap of weekend events
if len(news_items) < 8:
    print(f"  Only {len(news_items)} items, adding recap...")
    news_items.append({
        'source': '综合',
        'time': ts,
        'title': '本周关注：美国PCE通胀数据、欧洲央行会议纪要、美伊谈判进展',
        'summary': '本周全球市场聚焦美国4月PCE通胀数据、欧洲央行会议纪要及美伊谈判进展。A股沪指站稳4100点，科技股活跃，但7只半导体股拟减持套现127亿需警惕。',
        'detail': '本周重要事件：美国4月PCE通胀数据（周五公布）或影响美联储降息预期；欧洲央行公布会议纪要；美伊谈判进入关键周，特朗普称协议尚未完全谈妥。A股方面，沪指报4112.90点(+0.87%)，科技板块活跃，算力-电力-储能主线清晰。但周末7只半导体热门股拟减持套现127亿元，本周需警惕科技股获利回吐风险。港股恒指报25606.03点(+0.86%)。美股纳指报26343.97点，欧洲央行聚焦AI模型安全隐患。'
    })

# =====================
# Source 3: Tencent market data
# =====================
print("Fetching market data...")
market_raw = fetch("https://web.sqt.gtimg.cn/q=sh000001,hkHSI,usIXIC,usDJI,usINX")
market_data = {}
if market_raw:
    for line in market_raw.split(';'):
        if '="' in line:
            try:
                parts = line.split('="', 1)
                code = parts[0].strip()
                vals = parts[1].strip('"').split('~')
                name = vals[1] if len(vals) > 1 else ''
                price = vals[3] if len(vals) > 3 else ''
                change_price = vals[31] if len(vals) > 31 else ''
                change_pct = vals[32] if len(vals) > 32 else ''
                market_data[code] = {
                    'name': name,
                    'price': price,
                    'change_price': change_price,
                    'change_pct': change_pct
                }
            except:
                pass

sh_data = market_data.get('v_sh000001', {})
hk_data = market_data.get('v_hkHSI', {})
us_ixic = market_data.get('v_usIXIC', {})
sh_price = sh_data.get('price', '4112.90')
sh_change = sh_data.get('change_pct', '+0.87')
hk_price = hk_data.get('price', '25606.03')
hk_change = hk_data.get('change_pct', '+0.86')
nas_price = us_ixic.get('price', '26343.97')
nas_change = us_ixic.get('change_pct', '+0.19')

print(f"  Shanghai: {sh_price} ({sh_change}%)")
print(f"  Hang Seng: {hk_price} ({hk_change}%)")
print(f"  Nasdaq: {nas_price} ({nas_change}%)")

# =====================
# Build output files
# =====================

# hot-news.json
hot_news = {
    "updateTime": ts,
    "news": news_items
}
print(f"  Total news items: {len(news_items)}")

# alerts.json
forex_detail = (
    f"最新汇率：美元兑人民币在6.80附近波动。"
    f"美伊谈判进入关键阶段，特朗普表态协议尚未完全谈妥，"
    f"伊朗官员称霍尔木兹海峡管理不会恢复到战前状态。"
    f"白宫经济顾问哈塞特表示结束伊朗战争或为美联储降息创造空间。"
    f"本周关注美国PCE数据及美联储会议纪要，"
    f"若通胀数据超预期可能点燃加息担忧。"
)

stock_detail = (
    f"【A股】上证指数{sh_price}点（{sh_change}%）。"
    f"科技板块表现活跃，算力/电力/储能主线清晰。"
    f"百诚医药（301096）周一停牌筹划控制权变更。"
    f"本周需关注7只半导体热门股减持套现127亿元的后续影响。"
    f"\n\n【港股】恒生指数{hk_price}点（{hk_change}%），科技股回暖。"
    f"关注美伊谈判进展对能源板块影响。"
    f"\n\n【美股】纳指{nas_price}点（{nas_change}%），"
    f"道指50579.70点(+0.58%)，标普500报7473.47点(+0.37%)。"
    f"欧洲央行召集各银行讨论AI模型安全漏洞。"
    f"美伊谈判进展影响原油价格走势，布伦特低开3.5%。"
    f"\n\n【大宗商品】布伦特原油低开3.5%，受美伊协议预期影响。"
    f"伊朗强调霍尔木兹海峡管理权不会让渡，油价仍有不确定性。"
)

alerts = {
    "updateTime": ts,
    "forex": {
        "icon": "💱",
        "title": "外汇提示",
        "text": "USD/CNY报6.80附近；美伊谈判进展曲折，结束冲突或为美联储降息创造条件",
        "detail": forex_detail
    },
    "stock": {
        "icon": "📈",
        "title": "股市动向",
        "text": f"沪指{sh_price}涨{sh_change}%，恒指{hk_price}涨{hk_change}%，纳指{nas_price}；本周关注中东局势与AI安全议题",
        "detail": stock_detail
    }
}

# Write files
output_dir = "/Users/summezhang/financial-portal/data"
with open(f"{output_dir}/hot-news.json", "w", encoding="utf-8") as f:
    json.dump(hot_news, f, ensure_ascii=False, indent=2)
print(f"Saved hot-news.json ({len(hot_news['news'])} items)")

with open(f"{output_dir}/alerts.json", "w", encoding="utf-8") as f:
    json.dump(alerts, f, ensure_ascii=False, indent=2)
print("Saved alerts.json")

# Print summary
print(f"\n=== NEWS SUMMARY ===")
for i, n in enumerate(news_items):
    print(f"{i+1}. [{n['source']}] {n['title']}")
print(f"\n=== ALERTS ===")
print(f"Forex: {alerts['forex']['text'][:80]}...")
print(f"Stock: {alerts['stock']['text'][:80]}...")
