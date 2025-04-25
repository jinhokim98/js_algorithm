import sys

sequence = []
for i in range(3):
    sequence.append(int(sys.stdin.readline().strip()))
    
sequence.sort()

print(sequence[1])