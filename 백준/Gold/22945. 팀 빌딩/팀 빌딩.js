const fs = require('fs');
const [n, input] = fs.readFileSync(0, 'utf8').trim().split('\n');

const sequence = input.split(' ').map(Number);

let left = 0;
let right = sequence.length - 1;
let answer = 0;

while (left <= right) {
    const min = Math.min(sequence[left], sequence[right]);
    answer = Math.max(min*(right-left-1), answer);

    if (sequence[left] < sequence[right]) {
        left++
    } else {
        right--
    }
}

console.log(answer);
