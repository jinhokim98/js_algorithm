from bisect import bisect_left

n = int(input())
sequence = list(map(lambda x: int(x) * -1, input().split(' ')))

d = [sequence[0]]

for i in range(n):
    if sequence[i] > d[-1]:
        d.append(sequence[i])
    else:
        index = bisect_left(d, sequence[i])
        d[index] = sequence[i]
        
print(len(d))
        