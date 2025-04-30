import sys
t = int(sys.stdin.readline().strip())
numbers = [int(number) for number in sys.stdin.read().strip().split('\n')]
maxNum = max(numbers)

d = [(0, 0) for _ in range(41)] # i번째의 0과 1 출력 수
d[0] = (1, 0)
d[1] = (0, 1)
d[2] = (1, 1)

for i in range(3, maxNum + 1):
    prevZero, prevOne = d[i - 1]
    morePrevZero, morePrevOne = d[i - 2]
    
    d[i] = (prevZero + morePrevZero, prevOne + morePrevOne)
    
for num in numbers:
    print(*d[num])
