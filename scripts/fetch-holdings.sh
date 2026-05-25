#!/bin/bash
# =============================================
# 持仓数据自动更新脚本
# 从 dataroma.com 抓取巴菲特/段永平最新13F持仓
# 输出: holdings-data.json （可被检测后更新到 holdings-data.js）
# =============================================
# 可被 cron job 每季度调用（2/5/8/11月20号左右）
# =============================================

set -e

# 时间段
NOW=$(date '+%Y-%m-%d %H:%M')
MONTH=$(date '+%m')
QUARTER=$(( (10#${MONTH} - 1) / 3 + 1 ))
YEAR=$(date '+%Y')
# 实际13F是上一季度的
if [ "$QUARTER" -eq 1 ]; then
  REPORT_Q=4
  REPORT_Y=$((YEAR - 1))
else
  REPORT_Q=$((QUARTER - 1))
  REPORT_Y=$YEAR
fi

OUTPUT_FILE="/Users/summezhang/financial-portal/data/holdings-latest.json"

echo "📊 持仓数据更新 - ${YEAR}Q${QUARTER} (报告: ${REPORT_Y}Q${REPORT_Q})"
echo "时间: $NOW"
echo ""

# --- 巴菲特 ---
echo "=== 抓取巴菲特 (BRK) ==="
BRK_DATA=$(curl -sL "https://dataroma.com/m/holdings.php?m=BRK" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" \
  --max-time 15 2>/dev/null)

if [ -z "$BRK_DATA" ]; then
  echo "❌ 巴菲特数据抓取失败"
else
  echo "✅ 巴菲特数据获取成功 ($(echo "$BRK_DATA" | wc -c) bytes)"
fi

# --- 段永平 ---
echo "=== 抓取段永平 (HH) ==="
DUAN_DATA=$(curl -sL "https://dataroma.com/m/holdings.php?m=HH" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" \
  --max-time 15 2>/dev/null)

if [ -z "$DUAN_DATA" ]; then
  echo "❌ 段永平数据抓取失败"
else
  echo "✅ 段永平数据获取成功 ($(echo "$DUAN_DATA" | wc -c) bytes)"
fi

# --- 保存原始HTML供Python解析 ---
echo "$BRK_DATA" > /tmp/holdings_brk.html
echo "$DUAN_DATA" > /tmp/holdings_duan.html

# --- 用Python解析 ---
python3 -c "
import re, json, sys
from datetime import datetime

def parse_table(html, label):
    '''从dataroma的HTML中解析持仓表'''
    tables = re.findall(r'<table[^>]*>.*?</table>', html, re.DOTALL)
    if not tables:
        return None
    
    rows = re.findall(r'<tr>.*?</tr>', tables[0], re.DOTALL)
    result = []
    for row in rows[1:]:  # skip header
        cells = re.findall(r'<td[^>]*>.*?</td>', row, re.DOTALL)
        clean = [re.sub(r'<[^>]*>', '', c).strip() for c in cells]
        if len(clean) >= 5 and clean[0] and '&#8801' in clean[0]:
            sym = clean[1].split(' - ')[0].strip() if ' - ' in clean[1] else clean[1].strip()
            company_full = clean[1].split(' - ')[1].strip() if ' - ' in clean[1] else clean[1].strip()
            pct_str = clean[2].replace('%', '').strip()
            try:
                pct = float(pct_str)
            except:
                pct = 0
            
            # Extract activity
            activity = clean[3].strip() if len(clean) > 3 else ''
            pctChange = 0
            if 'Add' in activity:
                try:
                    pctChange = float(activity.replace('Add ', '').replace('%', ''))
                except: pctChange = 10
            elif 'Reduce' in activity:
                try:
                    pctChange = -float(activity.replace('Reduce ', '').replace('%', ''))
                except: pctChange = -10
            elif 'Buy' in activity:
                pctChange = None  # new position
            
            shares = clean[4].strip() if len(clean) > 4 else ''
            value = clean[6].strip() if len(clean) > 6 else ''
            
            result.append({
                'ticker': sym,
                'company': company_full,
                'pct': pct,
                'pctChange': pctChange,
                'shares': shares,
                'value': value,
                'activity': activity
            })
    
    return result

# 获取更新日期（从页面中找 Portfolio date）
def get_update_date(html):
    m = re.search(r'Portfolio date:\s*<span>(\d+\s+\w+\s+\d{4})</span>', html)
    if m:
        return m.group(1)
    # 也找文章日期作为fallback
    m2 = re.search(r'(\d+\s+\w+\s+\d{4})', html)
    return m2.group(1) if m2 else None

# 解析
with open('/tmp/holdings_brk.html') as f:
    brk_html = f.read()
brk_data = parse_table(brk_html, '巴菲特')
brk_date = get_update_date(brk_html)

with open('/tmp/holdings_duan.html') as f:
    duan_html = f.read()
duan_data = parse_table(duan_html, '段永平')
duan_date = get_update_date(duan_html)

output = {
    'updateTime': datetime.now().strftime('%Y-%m-%d %H:%M'),
    'quarter': '${REPORT_Y}Q${REPORT_Q}',
    'investors': {}
}

if brk_data:
    output['investors']['buffett'] = {
        'name': '巴菲特',
        'date': brk_date or '未知',
        'holdingsCount': len(brk_data),
        'holdings': brk_data
    }
    print(f'✅ 巴菲特: {len(brk_data)} 只持仓')

if duan_data:
    output['investors']['duan'] = {
        'name': '段永平',
        'date': duan_date or '未知',
        'holdingsCount': len(duan_data),
        'holdings': duan_data
    }
    print(f'✅ 段永平: {len(duan_data)} 只持仓')

with open('/tmp/holdings_parsed.json', 'w') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print(f'📄 已保存到 /tmp/holdings_parsed.json')
"

echo ""
echo "=== 解析结果 ==="
cat /tmp/holdings_parsed.json | python3 -c "
import json, sys
data = json.load(sys.stdin)
for inv_id, inv in data.get('investors', {}).items():
    print(f\"{inv['name']}: {inv['holdingsCount']} 只, 更新日期: {inv['date']}\")
    for h in inv['holdings'][:5]:
        chg = ''
        if h['pctChange'] is not None:
            arrow = '↑' if h['pctChange'] > 0 else '↓'
            chg = f' {arrow}{abs(h[\"pctChange\"])}%'
        print(f\"  {h['ticker']}: {h['pct']}%{chg}\")
    if len(inv['holdings']) > 5:
        print(f\"  ... 还有 {len(inv['holdings'])-5} 只\")
    print()
"

# 检查是否有更新
if [ -f /tmp/holdings_parsed.json ]; then
  # 和上次的数据对比
  if [ -f "$OUTPUT_FILE" ]; then
    python3 -c "
import json
old = json.load(open('$OUTPUT_FILE'))
new = json.load(open('/tmp/holdings_parsed.json'))
# 检查巴菲特的更新日期是否变化
old_brk_date = old.get('investors', {}).get('buffett', {}).get('date', '')
new_brk_date = new.get('investors', {}).get('buffett', {}).get('date', '')
old_duan_date = old.get('investors', {}).get('duan', {}).get('date', '')
new_duan_date = new.get('investors', {}).get('duan', {}).get('date', '')

changed = []
if old_brk_date and new_brk_date and old_brk_date != new_brk_date:
    changed.append(f'巴菲特: {old_brk_date} → {new_brk_date}')
if old_duan_date and new_duan_date and old_duan_date != new_duan_date:
    changed.append(f'段永平: {old_duan_date} → {new_duan_date}')

if changed:
    print('🔄 数据已更新：')
    for c in changed:
        print(f'  {c}')
    print('NEEDS_UPDATE')
else:
    print('➖ 数据无变化')
    print('NO_CHANGE')
" 2>/dev/null || echo "NEEDS_UPDATE" > /dev/null
  else:
    echo "🆕 首次采集"
    cp /tmp/holdings_parsed.json "$OUTPUT_FILE"
    echo "NEEDS_UPDATE" > /tmp/holdings_update_flag
  fi
fi

echo ""
echo "✅ 完成"
