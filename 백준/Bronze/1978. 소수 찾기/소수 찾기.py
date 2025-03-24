import sys
import math

input = sys.stdin.read().strip().split('\n')
n = int(input[0])
numbers = list(map(int, input[1].split(' ')))

def getPrimeNumbers(number):
    is_prime = [True for x in range(number + 1)]
    p = 2
    while (p * p <= number):
        if is_prime[p]:
            for i in range(p * p, number + 1, p):
                is_prime[i] = False
        p += 1
    prime_numbers = [p for p in range(2, number + 1) if is_prime[p]]
    
    return prime_numbers


primeNumbers = set(getPrimeNumbers(max(numbers)))
answer = [num for num in numbers if num in primeNumbers]
print(len(answer))
