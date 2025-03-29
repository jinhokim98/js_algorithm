import sys
from collections import deque

input = sys.stdin.read().strip().split('\n')
t = int(input[0])
inputIndex = 1

for i in range(t):
    func, n, numberList = input[i + inputIndex : i + inputIndex + 3]
    numbers = numberList[1:-1].split(',')
    num = list(map(int, numbers if numbers[0] != '' else []))
    inputIndex += 2
    queue = deque(num)
    
    direction = True # True이면 left -> right, False면 right -> left
    isError = False
    for method in func:
        if method == 'R':
            direction = not direction
        elif method == 'D':
            if len(queue):
                if direction:
                    queue.popleft()
                else:
                    queue.pop()
            else:
                isError = True
                break

    if isError:
        print('error')
    elif direction:
        answer = '['
        for i in range(0, len(queue)):
            answer += str(queue[i])
            if i != len(queue) - 1:
                answer += ','
        answer += ']'

        print(answer)
    else:
        answer = '['
        for i in range(len(queue) - 1, -1, -1):
            answer += str(queue[i])
            if i != 0:
                answer += ','
        answer += ']'

        print(answer)