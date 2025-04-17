import math
a, b = list(map(int, input().split(' ')))

divider = math.gcd(a, b)

minA = a // divider
minB = b // divider

print((minA + minB - 1) * divider)