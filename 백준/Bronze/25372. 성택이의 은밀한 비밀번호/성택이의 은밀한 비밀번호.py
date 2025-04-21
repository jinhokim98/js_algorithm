import sys

t = int(input())

for i in range(t):
    password = sys.stdin.readline().strip()
    if 6 <= len(password) <= 9:
        print('yes')
    else:
        print('no')