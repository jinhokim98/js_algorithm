import math

n, m = map(int, input().split())
g = math.gcd(n, m)
print(m - g)
