import math

n = int(input())
scv = list(map(int, input().split(' ')))
scv.extend([0, 0])

dp = [[[math.inf] * 61 for _ in range(61)] for _ in range(61)]
dp[scv[0]][scv[1]][scv[2]] = 1

orders = [(9, 3, 1), (9, 1, 3), (3, 9, 1), (3, 1, 9), (1, 9, 3), (1, 3, 9)]

for i in range(60, -1, -1):
    for j in range(60, -1, -1):
        for k in range(60, -1, -1):
            if dp[i][j][k] > 0:
                for order in orders:
                    nextI = i - order[0] if i - order[0] >= 0 else 0
                    nextJ = j - order[1] if j - order[1] >= 0 else 0
                    nextK = k - order[2] if k - order[2] >= 0 else 0
                    if dp[nextI][nextJ][nextK] > dp[i][j][k] + 1:
                        dp[nextI][nextJ][nextK] = dp[i][j][k] + 1

print(dp[0][0][0] - 1)
