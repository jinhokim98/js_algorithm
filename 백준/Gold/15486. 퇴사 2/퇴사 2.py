import sys

n = int(input())
rest = sys.stdin.read().strip().split('\n')
table = [[0, 0]]
table.extend(list(map(int, line.split(' '))) for line in rest)

d = [0] * (n + 1)

for i in range(1, n + 1):
    d[i] = max(d[i], d[i - 1])
    fin = i + table[i][0] - 1
    if fin <= n:
        d[fin] = max(d[fin], d[i - 1] + table[i][1])

print(max(d))
