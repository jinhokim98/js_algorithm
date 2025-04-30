from collections import Counter

n, m = list(map(int, input().split(' ')))
sequence = list(map(int, input().split(' ')))

prefixSum = [0] * (n + 1)

for i in range(1, n + 1):
    prefixSum[i] = prefixSum[i - 1] + sequence[i - 1]
    

modCounts = Counter(num % m for num in prefixSum)
count = 0

for mod in range(0, m):
    n = modCounts[mod]
    count += n * (n - 1) // 2

print(count)