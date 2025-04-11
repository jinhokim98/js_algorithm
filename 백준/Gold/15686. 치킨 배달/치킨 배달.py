import sys
import copy
import math
from itertools import combinations

inputs = sys.stdin.read().splitlines()

n, m = list(map(int, inputs[0].split(' ')))
matrix = [list(map(int, line.split(' '))) for line in inputs[1:]]

chickens = []

for i in range(n):
    for j in range(n):
        if matrix[i][j] == 2:
            chickens.append([i, j])

combChickens = list(combinations(chickens, m))

def deleteChickensExlcludeComb(comb):
    combSet = set()
    for x, y in comb:
        combSet.add(f'{x} {y}')
        
    tempMatrix = copy.deepcopy(matrix)
    for i in range(n):
        for j in range(n):
            if tempMatrix[i][j] == 2 and f'{i} {j}' not in combSet:
                tempMatrix[i][j] = 0
                
    return tempMatrix

answer = math.inf

for comb in combChickens:
    deleteResult = deleteChickensExlcludeComb(comb)
    distanceSum = 0
    for i in range(n):
        for j in range(n):
            if deleteResult[i][j] == 1:
                chickenDistance = [abs(i - x) + abs(j - y) for x, y in comb]
                distanceSum += min(chickenDistance)

    answer = min(answer, distanceSum)

print(answer)