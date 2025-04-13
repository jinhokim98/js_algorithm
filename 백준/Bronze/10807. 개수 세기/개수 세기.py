n = int(input())
sequence = list(map(int, input().split(' ')))
target = int(input())

count = 0
for i in sequence:
    if i == target:
        count += 1
        
print(count)