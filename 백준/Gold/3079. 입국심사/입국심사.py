import sys
from functools import reduce

n, m = list(map(int, sys.stdin.readline().strip().split(' ')))
t = [int(line) for line in sys.stdin.read().strip().split('\n')]

left = 0
right = max(t) * m

while (left <= right):
    mid = (left + right) // 2
    total = reduce(lambda acc, cur: mid // cur + acc, t, 0)
    if total >= m:
        right = mid - 1
    else:
        left = mid + 1
    
print(left)