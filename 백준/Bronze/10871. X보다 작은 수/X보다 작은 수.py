import sys

input = sys.stdin.read().strip().split('\n')
n, x = list(map(int, input[0].split(' ')))
sequence = list(map(int, input[1].split(' ')))

answer = [num for num in sequence if num < x]
print(*answer)