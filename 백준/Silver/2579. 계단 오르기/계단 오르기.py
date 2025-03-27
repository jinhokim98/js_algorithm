import sys
input = sys.stdin.read().strip().split('\n')

n = int(input[0])
stairs = list(map(int, input[1:]))

d = [[0] * 3 for i in range(n + 1)]

if n == 1:
    print(stairs[0])
    sys.exit()

# d[n][k] n개 계단까지 오르는데 이전 한 칸 오른 k 횟수
d[1][1] = stairs[0]
d[2][1] = stairs[1]
d[2][2] = d[1][1] + stairs[1]

for i in range(3, n + 1):
    d[i][1] = max(d[i - 2][1], d[i - 2][2]) + stairs[i - 1] # 1이 된다는 의미는 2칸 점프밖에
    d[i][2] = d[i - 1][1] + stairs[i - 1]
    
print(max(d[n][1], d[n][2]))
