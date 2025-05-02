const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n').map(Number);
const rest = input.slice(1).sort((a, b) => a - b);

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

const differences = [];
for (let i = 0; i < rest.length - 1; i++) {
    differences.push(rest[i + 1] - rest[i]);
}

if (differences.length === 0) {
    console.log('');
    return;
}

const totalGcd = differences.reduce((acc, cur) => gcd(acc, cur));

const divisors = new Set();

for (let i = 2; i <= Math.floor(Math.sqrt(totalGcd)); i++) {
    if (totalGcd % i === 0) {
        divisors.add(i);
        divisors.add(totalGcd / i);
    }
}

divisors.add(totalGcd);

const result = Array.from(divisors).sort((a, b) => a - b);
console.log(result.join(' '));
