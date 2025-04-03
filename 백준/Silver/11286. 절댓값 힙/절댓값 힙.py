from heapq import heappush, heappop
import sys

input_ = sys.stdin.read().splitlines()
n = int(input_[0])
calculation = list(map(int, input_[1:]))

heap = []

for i in calculation:
    if i > 0:
        heappush(heap, (i + 0.5, i))
    elif i < 0:
        heappush(heap, (-i, i))
    else:
        if len(heap) <= 0:
            print(0)
        else:
            print(heappop(heap)[1])
    