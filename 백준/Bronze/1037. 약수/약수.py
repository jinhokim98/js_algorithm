import sys

input = sys.stdin.read().strip().split('\n')

divisorCount = int(input[0])
divisores = list(map(int, input[1].split(' ')))

print(max(divisores) * min(divisores))
