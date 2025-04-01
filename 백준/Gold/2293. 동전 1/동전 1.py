import sys

input = sys.stdin.read().strip().split('\n')
n, k = map(int, input[0].split())
coins = list(map(int, input[1:]))
coins.sort()

dp = [0] * (k + 1)
dp[0] = 1  # 0원을 만드는 방법은 아무것도 선택하지 않는 경우 1개

for coin in coins:
    for i in range(coin, k + 1):  
        dp[i] += dp[i - coin]  

print(dp[k])
