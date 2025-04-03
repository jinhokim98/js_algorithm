import sys
import heapq

n = int(sys.stdin.readline().strip())

heap = []
for _ in range(n):
    for number in map(int, sys.stdin.readline().split()):
        if len(heap) < n:
            heapq.heappush(heap, number)
        elif number > heap[0]:
            heapq.heappushpop(heap, number)

print(heap[0])
