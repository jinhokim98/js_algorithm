import math
from functools import reduce

n = int(input())
a = reduce(lambda acc, cur: acc * cur, list(map(int, input().split(' '))), 1)

m = int(input())
b = reduce(lambda acc, cur: acc * cur, list(map(int, input().split(' '))), 1)

gcd = math.gcd(a, b)
if gcd >= 10 ** 9:
    print(str(gcd)[-9:])
else:
    print(gcd)