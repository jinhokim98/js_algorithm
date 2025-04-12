import sys
import math
from heapq import heappush, heappop

n, m, t, d = list(map(int, input().split(' ')))
matrix = [[ord(char) - 65 if ord(char) - 65 <= 25 else ord(char) - 71 for char in line] for line in sys.stdin.read().splitlines()]
directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]


def dijkstra(sx, sy):
    distance = [[math.inf for _ in range(m)] for _ in range(n)]
    distance[sx][sy] = 0 # 시작점은 0
    
    heap = []
    heappush(heap, (0, [sx, sy])) # curDistance, x, y
    
    # 높이 올라갈 수 있는 것 찾기
    while len(heap):
        cost, point = heappop(heap)
        x, y = point
    
        if distance[x][y] < cost:
            continue
        
        for dx, dy in directions:
            nx, ny = x + dx, y + dy
    
            # 범위 내에 있고 다음 칸이 오르내릴 수 있는 칸이라면
            if 0 <= nx < n and 0 <= ny < m:
                heightDiff = matrix[nx][ny] - matrix[x][y]
                if abs(heightDiff) <= t:
                    if matrix[nx][ny] <= matrix[x][y]:
                        nextCost = cost + 1
                    else:
                        nextCost = cost + (matrix[nx][ny] - matrix[x][y]) ** 2
                    
                    if distance[nx][ny] > nextCost:
                        distance[nx][ny] = nextCost
                        heappush(heap, (nextCost, [nx, ny]))
    return distance        


upDistance = dijkstra(0, 0)
maxHeight = matrix[0][0]

for i in range(n):
    for j in range(m):
        downDistance = dijkstra(i, j)
        total = upDistance[i][j] + downDistance[0][0]
        if total <= d:
            maxHeight = max(maxHeight, matrix[i][j])

print(maxHeight)