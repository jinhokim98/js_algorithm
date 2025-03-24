import sys

n = int(sys.stdin.read().strip())

sum = 0
for i in range(1, n+1):
    sum += (n // i) * i

print(sum)