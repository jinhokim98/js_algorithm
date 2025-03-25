import sys

n = int(sys.stdin.read().strip())

# 2* n의 타일을 1 * 2 + 2 * 1의 블럭으로 채우는 방법 수
# d[i] 2 * i의 블럭 방법 수
# d[n] = d[n - 1] + d[n - 2]

d = [0] * 1001

d[1] = 1
d[2] = 2

for i in range(3, n + 1, 1):
    d[i] = d[i - 1] + d[i - 2]

print(d[n] % 10007)
