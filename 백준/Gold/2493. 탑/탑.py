import sys

n = int(sys.stdin.readline().strip())
towers = list(map(int, sys.stdin.readline().split()))

receive = [0] * n
stack = []

for i in range(n):
    while stack and towers[stack[-1]] < towers[i]:
        stack.pop()
        
    if stack:  
        receive[i] = stack[-1] + 1
    
    stack.append(i)

print(*receive)
