import sys

input = sys.stdin.read().strip().split('\n')

for i in input:
    a, b = list(map(int, i.split(' ')))
    print(a + b)