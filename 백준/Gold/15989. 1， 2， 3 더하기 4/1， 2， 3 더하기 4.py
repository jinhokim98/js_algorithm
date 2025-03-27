import sys

input = sys.stdin.read().strip().split('\n')

t = int(input[0])
testcase = list(map(int, input[1:]))
maxValue = max(testcase)

d = [[0] * 4 for i in range(maxValue + 1)]

d[1][1] = 1
d[2][1] = 1
d[2][2] = 1
d[3][1] = 1
d[3][2] = 1
d[3][3] = 1

for i in range(4, maxValue + 1):
    d[i][1] = d[i - 1][1]
    d[i][2] = d[i - 2][1] + d[i - 2][2]
    d[i][3] = d[i - 3][1] + d[i - 3][2] + d[i - 3][3]

for test in testcase:
    print(d[test][1] + d[test][2] + d[test][3])

