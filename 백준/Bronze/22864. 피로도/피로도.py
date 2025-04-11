a, b, c, m = list(map(int, input().split(' ')))

# a 1시간에 피로도 쌓이는 정도
# b 1시간에 한 일의 양
# c 1시간 쉴 때 피로도 줄어드는 정도
# m 피로도 한계치

fatigue = 0
worked = 0
hours = 24

for i in range(hours):
    if fatigue + a <= m: # 이번 시간에 일을 해도 피로도가 한계를 넘지 않을 때
        worked += b
        fatigue += a
    else:
        decrease = fatigue - c
        if decrease < 0:
            fatigue = 0
        else:
            fatigue = decrease    

print(worked)
