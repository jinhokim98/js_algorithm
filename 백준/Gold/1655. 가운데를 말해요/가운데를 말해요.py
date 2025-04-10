import sys
from heapq import heappush, heappop

n = int(input())

maxHeap = []
minHeap = []

for i in range(n):
    number = int(sys.stdin.readline().strip())
    if len(maxHeap) == len(minHeap):
        heappush(maxHeap, (-number, number))
    else:
        heappush(minHeap, number)

    if minHeap and maxHeap[0][1] > minHeap[0]:
        tempMin = heappop(minHeap)
        tempMax = heappop(maxHeap)[1]
        heappush(minHeap, tempMax)
        heappush(maxHeap, (-tempMin, tempMin))

    print(maxHeap[0][1])