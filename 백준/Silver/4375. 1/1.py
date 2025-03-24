import sys

input = list(map(int, sys.stdin.read().strip().split('\n')))

for i in range(len(input)):
    number = 1
    count = 1

    while (True):
        if (number % input[i] != 0):
            number = number * 10 + 1
            count += 1
        else:
            break

    print(count)
