from collections import deque

n = int(input())
papers = list(map(int, input().split(' ')))

queue = deque()
for index, paper in enumerate(papers, start=1):
    queue.append([index, paper])

answer = []

while len(queue):
    index, move = queue.popleft()
    answer.append(index)
    
    if queue:
        if move > 0:
            queue.rotate(-(move - 1))
        else:
            queue.rotate(-move)
    
print(*answer)    