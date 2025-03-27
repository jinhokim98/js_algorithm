from queue import Queue
import math

n = int(input())
maze = list(map(int, input().split(' ')))

queue = Queue()
distance = [math.inf] * 1001
distance[0] = 0

def bfs():
    queue.put(0)
    
    while not queue.empty():
        start = queue.get()

        for i in range(1, maze[start] + 1):
            next = start + i
            if next >= n:
                continue

            if distance[next] == math.inf:
                distance[next] = distance[start] + 1
                queue.put(next)

bfs()
print(distance[n - 1] if distance[n - 1] != math.inf else -1)
