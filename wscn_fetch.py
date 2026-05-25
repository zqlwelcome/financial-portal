import urllib.request, json, re

req = urllib.request.Request("https://api-one-wscn.awtmt.com/apiv1/content/articles?channel=global-channel&limit=10")
req.add_header("User-Agent", "Mozilla/5.0")
resp = urllib.request.urlopen(req, timeout=10)
data = json.loads(resp.read())
items = data.get('data', {}).get('items', [])
for i in items[:8]:
    title = i.get('title', '') or i.get('content_title', '')
    content = re.sub(r'<[^>]+>', '', i.get('content_text', '') or i.get('summary', '') or '')[:120].strip()
    print(f"TITLE: {title}")
    print(f"CONTENT: {content}")
    print("---")
