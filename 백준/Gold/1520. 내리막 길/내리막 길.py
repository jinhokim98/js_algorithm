import sys
sys.setrecursionlimit(10**6)

input = sys.stdin.read().strip().split('\n')

n, m = list(map(int, input[0].split(' ')))
matrix = [list(map(int, line.split(' '))) for line in input[1:]]

directions = [[-1, 0], [1, 0], [0, 1], [0, -1]]
visited = [[-1] * m for _ in range(n)]

def dfs(curX, curY):
    if curX == n - 1 and curY == m - 1:
        return 1

    if visited[curX][curY] != -1:
        return visited[curX][curY]

    count = 0
    for dx, dy in directions:
        nx = curX + dx
        ny = curY + dy
        
        if 0 <= nx < n and 0 <= ny < m and matrix[curX][curY] > matrix[nx][ny]:
            count += dfs(nx, ny)

    visited[curX][curY] = count
    return count

print(dfs(0, 0))