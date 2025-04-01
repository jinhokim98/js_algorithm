import math
n = int(input())

d = [math.inf] * 5001

d[3] = 1
d[5] = 1

for i in range(6, n + 1):
    d[i] = min(d[i - 5], d[i - 3]) + 1

print(d[n] if d[n] != math.inf else -1)
