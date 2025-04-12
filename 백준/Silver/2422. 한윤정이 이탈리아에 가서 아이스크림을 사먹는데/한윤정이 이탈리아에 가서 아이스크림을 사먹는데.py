from itertools import combinations

n, m = list(map(int, input().split()))

ice = list(combinations(range(1, n+1), 3))
arr = [[0] * (n+1) for _ in range(n+1)]

for i in range(m):
    x, y = list(map(int, input().split(' ')))
    arr[x][y] = 1
    arr[y][x] = 1

count = 0

for a, b, c in ice:
    if arr[a][b] or arr[a][c] or arr[b][c]:
        continue
    else:
        count += 1
    
print(count)
    