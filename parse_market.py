import re, sys

data = sys.stdin.read()
for line in data.strip().split('\n'):
    if not line.strip():
        continue
    parts = re.findall(r'~([^~]*)', line)
    if len(parts) > 33:
        name = parts[1]
        price = parts[3]
        change = parts[32]
        change_pct = parts[33]
        print(f'{name}: {price} ({change}/{change_pct}%)')
