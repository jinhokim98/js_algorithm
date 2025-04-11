start = int(input())
end = int(input())

def getPrimeNumber(start, end):
    isPrime = [True for _ in range(end + 1)]
    p = 2
    
    while p * p <= end:
        if isPrime[p]:
            for i in range(p * p, end + 1, p):
                isPrime[i] = False
        p += 1
    
    return [p for p in range(2, end + 1) if isPrime[p] and p >= start]

primeNumbers = getPrimeNumber(start, end)
if len(primeNumbers) == 0:
    print(-1)
else:
    print(sum(primeNumbers))
    print(primeNumbers[0])
