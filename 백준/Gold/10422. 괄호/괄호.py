import sys
inputs = sys.stdin.read().splitlines()

t = int(inputs[0])
numbers = list(map(int, inputs[1:]))
maxValue = max(numbers)

mod = 1000000007
maxN = maxValue // 2

catalan = [0] * (maxN + 1)
catalan[0] = 1

for i in range(1, maxN + 1):
    for j in range(i):
        catalan[i] = (catalan[i] + catalan[j] * catalan[i - 1 - j]) % mod

for n in numbers:
    if n % 2 == 1:
        print(0)
    else:
        print(catalan[n // 2])
