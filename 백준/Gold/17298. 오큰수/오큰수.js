const fs = require('fs');
const [input, rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const n = parseInt(input, 10);
const sequence = rest.split(' ').map(Number);
let stack = [];

for (let i = 0; i < n; i++) {
    while (stack.length > 0 && sequence[stack[stack.length - 1]] < sequence[i]) {
        sequence[stack.pop()] = sequence[i];
    }
    
    stack.push(i);
}

while (stack.length > 0) {
    sequence[stack.pop()] = -1;
}

console.log(sequence.join(' '));
