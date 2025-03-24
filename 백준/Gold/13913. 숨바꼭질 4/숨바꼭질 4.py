import sys
import math
from queue import Queue

n, k = list(map(int, sys.stdin.read().strip().split(' ')))

def getDirections(x):
    return [x - 1, x + 1, 2 * x]

visited = [[False, math.inf] for i in range(100001)]
queue = Queue()

def bfs():
    queue.put((n, 0))
    visited[n] = [True, -1]
    
    while queue.qsize():
        cur, dist = queue.get()
        
        if cur == k:
            print(dist)
            break
        
        for nx in getDirections(cur):
            if nx >= 0 and nx <= 100000 and not visited[nx][0]:
                visited[nx] = [True, cur]
                queue.put((nx, dist + 1))
    
    traking = [k]
    cur = k
    while visited[cur][1] != -1:
        traking.append(visited[cur][1])
        cur = visited[cur][1]

    traking.reverse()
    print(*traking)
    

bfs()
