import sys

def getIsPalindrome(number):
    toString = str(number)
    left = 0
    right = len(toString) - 1

    while left <= right:
        if toString[left] != toString[right]:
            return False
        left += 1
        right -= 1
    return True

n = int(input())
limit = 1003001

isPrime = [True for _ in range(limit + 1)]
isPrime[0] = isPrime[1] = False

p = 2
while p * p <= limit:
    if isPrime[p]:
        for i in range(p * p, limit + 1, p):
            isPrime[i] = False
    p += 1

for i in range(n, limit + 1):
    if isPrime[i] and getIsPalindrome(i):
        print(i)
        sys.exit()
