import sys
input_ = sys.stdin.read().strip().split('\n')

n, m = list(map(int, input_[0].split(' ')))
s = set([name for name in input_[1:n+1]])

count = 0
for i in range(n + 1, n + m + 1):
    if input_[i] in s:
        count += 1

print(count)