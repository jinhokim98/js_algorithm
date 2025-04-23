import sys
n = int(input())

answer = 0
for i in range(n):
    number = int(sys.stdin.readline().strip())
    answer += number
    
print(answer)