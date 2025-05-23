const fs = require('fs');
const [first, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');
const n = parseInt(first, 10);

let answer = 0;
const stack = [];

for (let i = 0; i < n; i++) {
    const [x, height] = rest[i].split(' ').map(Number);

    while (stack.length && stack[stack.length - 1] > height) {
        stack.pop();
        answer++;
    }

    if (stack[stack.length - 1] !== height) {
        stack.push(height);
    }
}

while (stack.length && stack[stack.length - 1] > 0) {
    stack.pop();
    answer++;
}

console.log(answer);
