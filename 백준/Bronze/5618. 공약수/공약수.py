import math
from functools import reduce

n = int(input())
numbers = list(map(int, input().split(' ')))

gcd = reduce(math.gcd, numbers)

divisors = set()
for i in range(1, int(math.isqrt(gcd)) + 1):
    if gcd % i == 0:
        divisors.add(i)
        divisors.add(gcd // i)

for divisor in sorted(divisors):
    print(divisor)
