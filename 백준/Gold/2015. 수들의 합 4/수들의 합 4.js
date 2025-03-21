const fs = require('fs');
const [input, rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, k] = input.split(' ').map(Number);
const seqeunce = rest.split(' ').map(Number);

let prefixSum = 0;
let count = 0;
let sumMap = new Map();

sumMap.set(0, 1);

for (let i = 0; i < n; i++) {
    prefixSum += seqeunce[i];
    
    if (sumMap.has(prefixSum - k)) {
        count += sumMap.get(prefixSum - k);
    }
    
    sumMap.set(prefixSum, (sumMap.get(prefixSum) || 0) + 1);
}

console.log(count);
