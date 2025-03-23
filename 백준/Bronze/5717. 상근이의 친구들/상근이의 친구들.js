const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

for (let i = 0; i < input.length - 1; i++) {
    const [a, b] = input[i].split(' ').map(Number);
    console.log(a + b);
}