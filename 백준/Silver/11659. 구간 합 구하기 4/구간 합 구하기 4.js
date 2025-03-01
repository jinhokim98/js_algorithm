const fs = require('fs');
const [input, sequenceInput, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, m] = input.split(' ').map(Number);
const sequence = sequenceInput.split(' ').map(Number);

const prefixSum = Array.from({length: n + 1}).fill(0);

for (let i = 1; i <= n; i++) {
    prefixSum[i] = prefixSum[i - 1] + sequence[i - 1];
}

rest.forEach((line) => {
    const [left, right] = line.split(' ').map(Number);
    console.log(prefixSum[right] - prefixSum[left - 1]);
})
