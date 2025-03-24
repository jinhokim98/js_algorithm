import sys

start, end = list(map(int, sys.stdin.read().strip().split(' ')))

def getPrimeNumber(start, end):
    isPrime = [True for i in range(end + 1)]
    p = 2
    
    while (p * p <= end):
        if isPrime[p]:
            for i in range(p * p, end + 1, p):
                isPrime[i] = False
        p += 1
    primeNumbers = [p for p in range(2, end + 1) if isPrime[p] and p >= start]
    return primeNumbers

answer = getPrimeNumber(start, end)

for i in answer:
    print(i)
    