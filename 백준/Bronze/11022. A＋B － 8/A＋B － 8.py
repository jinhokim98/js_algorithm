t = int(input())

for i in range(t):
    a, b = list(map(int, input().split()))
    print(f'Case #{i + 1}: {a} + {b} = {a + b}')