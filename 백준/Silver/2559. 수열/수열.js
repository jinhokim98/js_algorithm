const fs = require('fs');
const [input, rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, k] = input.split(' ').map(Number);
const sequence = rest.split(' ').map(Number);

let sum = 0;
for (let i = 0; i < k; i++) {
    sum += sequence[i];
}

let max = sum;

for (let i = k; i < sequence.length; i++) {
    sum = sum - sequence[i - k] + sequence[i];
    max = Math.max(max, sum);
}

console.log(max);
