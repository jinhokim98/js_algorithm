import sys
from queue import Queue

n, h, d = list(map(int, input().split(' ')))
matrix = [list(line) for line in sys.stdin.read().splitlines()]
directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]
visited = [[0 for _ in range(n)] for _ in range(n)] 

start = None

# 시작지점 찾기
for i in range(n):
    for j in range(n):
        if matrix[i][j] == 'S':
            start = (i, j)
            
def bfs():
    queue = Queue()
    queue.put((start, h, 0, 0)) # 지점, 현재 체력, 이동 거리, 우산의 내구도
    visited[start[0]][start[1]] = h
    
    while not queue.empty():
        point, curH, curDistance, curUmbrella = queue.get()
        x, y = point
        
        for dx, dy in directions:
            nx = x + dx
            ny = y + dy
            
            if not (0 <= nx < n and 0 <= ny < n):
                continue
            
            nextH = curH
            nextUmbrella = curUmbrella
            
            if matrix[nx][ny] == 'E':
                print(curDistance + 1)
                return
            
            if matrix[nx][ny] == 'U': # 다음 칸이 우산이라면
                nextUmbrella = d
                
            if nextUmbrella > 0:
                nextUmbrella -= 1
            else:
                nextH -= 1
                
            if nextH <= 0:
                continue
                
            if visited[nx][ny] < nextH:
                visited[nx][ny] = nextH
                queue.put(((nx, ny), nextH, curDistance + 1, nextUmbrella))

    print(-1)

bfs()