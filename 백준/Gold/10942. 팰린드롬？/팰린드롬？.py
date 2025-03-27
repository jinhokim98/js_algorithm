import sys

# 빠른 입력
input = sys.stdin.readline

# 입력 받기
n = int(input().strip())
sequence = list(map(int, input().split()))

# DP 테이블 초기화
d = [[0] * n for _ in range(n)]

# 길이 1 (모든 숫자는 자기 자신으로 팰린드롬)
for i in range(n):
    d[i][i] = 1

# 길이 2 (연속된 두 숫자가 같으면 팰린드롬)
for i in range(n - 1):
    if sequence[i] == sequence[i + 1]:
        d[i][i + 1] = 1

# 길이 3 이상
for length in range(3, n + 1):
    for i in range(n - length + 1):
        j = i + length - 1
        if sequence[i] == sequence[j] and d[i + 1][j - 1] == 1:
            d[i][j] = 1

# 질의 처리 (빠른 입력 + 빠른 출력)
m = int(input().strip())

queries = sys.stdin.read().splitlines()  # 한 번에 입력 받기
result = []

for i in range(m):
    s, e = map(int, queries[i].split())
    result.append(str(d[s - 1][e - 1]))  # 출력 리스트에 저장

sys.stdout.write("\n".join(result) + "\n")  # 한 번에 출력
