from collections import deque

n = int(input())
techs = list(map(int, input().split(' ')))
techs.reverse()

dq = deque()

for i in range(1, n + 1):
    if techs[i - 1] == 1:
        dq.appendleft(i)
    if techs[i - 1] == 2:
        dq.insert(1, i)
    if techs[i - 1] == 3:
        dq.append(i)

print(*dq)