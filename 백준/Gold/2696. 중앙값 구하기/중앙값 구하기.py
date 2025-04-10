import sys
from heapq import heappush, heappop

inputs = sys.stdin.read().splitlines()

t = int(inputs[0])

inputIndex = 1
for i in range(t):
    m = int(inputs[inputIndex])
    sequence = []
    
    for line in range((m // 10) + 1):
        index = inputIndex + 1 + line
        sequence.extend(list(map(int, inputs[index].split(' '))))

    maxHeap = []
    minHeap = []
    answer = []
    for index, number in enumerate(sequence, start=1):
        if len(maxHeap) == len(minHeap):
            heappush(maxHeap, (-number, number))
        else:
            heappush(minHeap, number)
        
        if minHeap and maxHeap[0][1] > minHeap[0]:
            tempMin = heappop(minHeap)
            tempMax = heappop(maxHeap)[1]
            heappush(minHeap, tempMax)
            heappush(maxHeap, (-tempMin, tempMin))
        
        if index % 2 != 0: # 홀수일 때 중앙값 계산
            answer.append(maxHeap[0][1])
    
    print(len(answer))
    chunks = [answer[i:i + 10] for i in range(0, len(answer), 10)]

    if len(chunks) == 1:
        print(*chunks[0])
    else:
        for chunk in chunks:
            print(*chunk)

    inputIndex += (m // 10) + 2
