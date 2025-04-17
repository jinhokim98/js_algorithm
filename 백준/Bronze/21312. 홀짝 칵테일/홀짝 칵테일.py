a, b, c = list(map(int, input().split(' ')))

combinations = [a, b, c, a * b, a * c, b * c, a * b * c]

#홀수가 짝수보다 우세
#모두 짝수나 홀수라면 큰 수가 우세

notOddComb = sorted(list(filter(lambda x: False if x % 2 else True, combinations)), reverse=True)
oddComb = sorted(list(filter(lambda x: x % 2, combinations)), reverse=True)

if len(oddComb) > 0:
    print(oddComb[0])
else:
    print(notOddComb[0])