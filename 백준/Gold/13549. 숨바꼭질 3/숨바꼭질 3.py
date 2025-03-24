import sys
from collections import deque

n, k = map(int, sys.stdin.read().strip().split())

def getDirections(x):
    return [[2 * x, 0], [x - 1, 1], [x + 1, 1]]

queue = deque()
visited = [False] * 100001

def bfs():
    queue.append((n, 0))
    visited[n] = True

    while queue:
        cur, dist = queue.popleft()

        if cur == k:
            print(dist)
            return

        for dx, time in getDirections(cur):
            if 0 <= dx <= 100000 and not visited[dx]:
                visited[dx] = True
                if time == 0:  
                    queue.appendleft((dx, dist))
                else:  
                    queue.append((dx, dist + 1))

bfs()
