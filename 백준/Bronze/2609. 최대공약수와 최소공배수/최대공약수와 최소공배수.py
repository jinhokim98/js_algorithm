import sys
import math

a, b = list(map(int, sys.stdin.read().strip().split(' ')))

def lcm (n, m):
    return n // math.gcd(n, m) * m

gcd_ = math.gcd(a, b)
lcm_ = lcm(a, b)

print(gcd_)
print(lcm_)