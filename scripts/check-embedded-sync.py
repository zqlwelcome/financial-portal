#!/usr/bin/env python3
"""Check if _EMBEDDED_DATA in daily-data.js is in sync with expert-views.json.
Exit code 0 = in sync, 1 = stale (needs sync), 2 = error.

Usage: python3 scripts/check-embedded-sync.py [--fix]
  --fix: auto-sync the embedded data if stale

Handles the known 'const _EMBEDDED_DATA = const _EMBEDDED_DATA = {' duplication
by detecting and fixing it before parsing.
"""
import json, sys, os, re

BASE = os.environ.get("LEARNING_PLATFORM_DIR", "/tmp/learning-platform")

def repair_duplication(dd):
    """Fix 'const _EMBEDDED_DATA = const _EMBEDDED_DATA = {' duplication."""
    bad = 'const _EMBEDDED_DATA = const _EMBEDDED_DATA = {'
    good = 'const _EMBEDDED_DATA = {'
    if bad in dd:
        print("⚠️  Detected _EMBEDDED_DATA duplication — auto-repairing")
        dd = dd.replace(bad, good)
    return dd

def get_embedded_update_time(dd_path):
    with open(dd_path) as f:
        dd = f.read()
    dd = repair_duplication(dd)
    marker = 'const _EMBEDDED_DATA = '
    # Find the LAST occurrence to avoid any leftover prefix fragments
    start = dd.rfind(marker)
    if start == -1:
        raise ValueError("Could not find 'const _EMBEDDED_DATA = ' in daily-data.js")
    start += len(marker)
    depth = 0
    for i in range(start, len(dd)):
        if dd[i] == '{': depth += 1
        elif dd[i] == '}':
            depth -= 1
            if depth == 0:
                return json.loads(dd[start:i+1].rstrip(';')), dd, start, i+1
    raise ValueError("Could not find end of _EMBEDDED_DATA block")

def sync_embedded(ev_path, dd_path, dd, start, end):
    ev = json.load(open(ev_path))
    new_data = {"updateTime": ev["updateTime"], "mood": ev["mood"], "experts": ev["experts"]}
    new_json = json.dumps(new_data, ensure_ascii=False, indent=4)
    new_block = f"const _EMBEDDED_DATA = {new_json};\n"
    with open(dd_path, 'w') as f:
        f.write(dd[:start] + new_block + dd[end:])
    return ev["updateTime"]

ev_path = os.path.join(BASE, "data/expert-views.json")
dd_path = os.path.join(BASE, "daily-data.js")

try:
    embedded, dd, start, end = get_embedded_update_time(dd_path)
    ev = json.load(open(ev_path))
    ev_time = ev["updateTime"]
    emb_time = embedded["updateTime"]

    if ev_time == emb_time:
        print(f"✅ Embedded data in sync: {emb_time}")
        sys.exit(0)
    else:
        print(f"⚠️  STALE embedded data: {emb_time} (expected: {ev_time})")
        if "--fix" in sys.argv:
            new_time = sync_embedded(ev_path, dd_path, dd, start, end)
            print(f"✅ Synced embedded data to: {new_time}")
            sys.exit(0)
        else:
            print("Run with --fix to auto-sync")
            sys.exit(1)
except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(2)
