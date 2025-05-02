const fs = require('fs')
const numbers = fs.readFileSync(0, 'utf8').trim().split('\n').map(Number).slice(0, -1)

const maxNumber = Math.max(...numbers);
const eratosthenes = (start, end) => {
    const isPrime = Array.from({length: maxNumber * 2 + 1}).fill(true)
    
    let p = 2;
    while (p * p <= end) {
        if (isPrime[p]) {
            for (let i = p * p; i < end + 1; i += p) {
                isPrime[i] = false
            }
        }
        p++
    }
    const primeNumbers = [];
    for (let i = start + 1; i <= end; i++) {
        if (isPrime[i]) primeNumbers.push(i);
    }

    return primeNumbers;
}

const answer = []

numbers.forEach((number) => {
    const primeNumbers = eratosthenes(number, number * 2);
    answer.push(primeNumbers.length)
});

console.log(answer.join('\n'))
