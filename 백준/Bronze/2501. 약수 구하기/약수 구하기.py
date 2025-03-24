import sys

n, k = list(map(int, sys.stdin.read().strip().split(' ')))

divisors = []
for i in range(1, n + 1):
    if (n % i == 0):
        divisors.append(i)

if (len(divisors) <= k - 1):
    print(0)
else:
    print(divisors[k - 1])
