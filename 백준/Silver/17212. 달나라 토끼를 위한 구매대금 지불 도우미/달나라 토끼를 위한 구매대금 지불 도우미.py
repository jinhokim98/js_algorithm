n = int(input())

# i원을 내는 최소동전개수
d = [0] * 100001

# 1, 2, 5, 7 동전이 있다.
d[1] = 1
d[2] = 1
d[3] = 2
d[4] = 2
d[5] = 1
d[6] = 2
d[7] = 1

for i in range(8, n + 1):
    d[i] = min(d[i - 1], d[i - 2], d[i - 5], d[i - 7]) + 1

print(d[n])