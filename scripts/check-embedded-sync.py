#!/usr/bin/env python3
"""Check if _EMBEDDED_DATA in daily-data.js matches expert-views.json.

Usage:
    python3 check-embedded-sync.py          # check only (exit 1 if stale)
    python3 check-embedded-sync.py --fix    # auto-sync if stale
"""
import json
import sys
import os

os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

ev_path = 'data/expert-views.json'
dd_path = 'daily-data.js'

# Handle duplicate prefix bug
dd = open(dd_path).read()
dup_prefix = 'const _EMBEDDED_DATA = const _EMBEDDED_DATA = {'
if dup_prefix in dd:
    print("⚠️  Detected duplicate _EMBEDDED_DATA prefix, fixing...")
    dd = dd.replace(dup_prefix, 'const _EMBEDDED_DATA = {')
    open(dd_path, 'w').write(dd)
    print("✅ Fixed duplicate prefix")

# Load expert-views.json
ev = json.load(open(ev_path))

# Extract _EMBEDDED_DATA using brace matching
marker = 'const _EMBEDDED_DATA = '
if marker not in dd:
    print("❌ _EMBEDDED_DATA not found in daily-data.js")
    sys.exit(1)

start = dd.index(marker) + len(marker)
depth = 0
embedded = None
end_pos = start
for i in range(start, len(dd)):
    if dd[i] == '{':
        depth += 1
    elif dd[i] == '}':
        depth -= 1
        if depth == 0:
            embedded_json = dd[start:i+1].rstrip(';')
            embedded = json.loads(embedded_json)
            end_pos = i + 1
            if end_pos < len(dd) and dd[end_pos] == ';':
                end_pos += 1
            break

if embedded is None:
    print("❌ Failed to parse _EMBEDDED_DATA")
    sys.exit(1)

if embedded['updateTime'] == ev['updateTime']:
    print(f"✅ In sync: {ev['updateTime']}")
    sys.exit(0)

print(f"⚠️  STALE: embedded={embedded['updateTime']}, expert-views={ev['updateTime']}")

if '--fix' in sys.argv:
    new_data = {"updateTime": ev["updateTime"], "mood": ev.get("mood", {}), "experts": ev.get("experts", [])}
    new_json = json.dumps(new_data, ensure_ascii=False, indent=4)
    new_block = f"const _EMBEDDED_DATA = {new_json};\n"
    new_dd = dd[:dd.index(marker)] + new_block + dd[end_pos:]
    open(dd_path, 'w').write(new_dd)
    print("✅ Fixed: embedded data synced")
    sys.exit(0)
else:
    print("Run with --fix to auto-sync")
    sys.exit(1)
