const fs = require('fs');
const number = parseInt(fs.readFileSync(0, 'utf8').trim(), 10);

let answer = 0;

for (let i = 1; i <= number; i++) {
    answer += i;
}

console.log(answer);
