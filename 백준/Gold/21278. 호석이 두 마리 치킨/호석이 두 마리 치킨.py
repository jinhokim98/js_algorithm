import sys
import math
n, m = list(map(int, input().split(' ')))

distance = [[math.inf for _ in range(n + 1)] for _ in range(n + 1)]
inputs = sys.stdin.read().splitlines()

for i in range(n + 1):
    distance[i][i] = 0

for line in inputs:
    start, end = list(map(int, line.split(' ')))
    distance[start][end] = 1
    distance[end][start] = 1


for k in range(1, n + 1):
    for i in range(1, n + 1):
        for j in range(1, n + 1):
            if distance[i][j] > distance[i][k] + distance[k][j]:
                distance[i][j] = distance[i][k] + distance[k][j]
    
answerComb = None
minDistance = math.inf

for i in range(1, n + 1):
    for j in range(1, n + 1):
        if i != j:
            distanceList = [min(distance[i][num], distance[j][num]) for num in range(1, n + 1)]
            distanceSum = sum(distanceList)
            if minDistance > distanceSum:
                minDistance = distanceSum
                answerComb = (i, j)

print(answerComb[0], answerComb[1], minDistance * 2)