import sys
input_ = sys.stdin.read().strip().split('\n')

n, m = list(map(int, input_[0].split(' ')))
pocketmonsKeyNumber = {}
pocketmonsKeyName = {}

for index, pocketmon in enumerate(input_[1:n + 1], start=1):
    pocketmonsKeyNumber[index] = pocketmon
    pocketmonsKeyName[pocketmon] = index

for quiz in input_[n + 1:]:
    if quiz.isdigit(): # 숫자라면
        print(pocketmonsKeyNumber[int(quiz)])
    else:
        print(pocketmonsKeyName[quiz])