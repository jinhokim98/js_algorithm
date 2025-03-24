import sys
from queue import Queue

n, k = list(map(int, sys.stdin.read().strip().split(' ')))

def getDirections(x):
    return [x - 1, x + 1, 2 * x]

visited = [False for i in range(100001)]
queue = Queue()

def dfs():
    queue.put((n, 0))
    visited[n] = True
    
    while queue.qsize():
        cur, dist = queue.get()
        
        if cur == k:
            return dist
        
        for nx in getDirections(cur):
            if nx >= 0 and nx <= 100000 and not visited[nx]:
                visited[nx] = True
                queue.put((nx, dist + 1))
        
print(dfs())
