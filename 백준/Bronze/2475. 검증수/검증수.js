const fs = require('fs');
const sequence = fs.readFileSync(0, 'utf8').trim().split(' ').map(Number);

const answer = (sequence.reduce((acc, cur) => acc + Math.pow(cur, 2), 0)) % 10;
console.log(answer)
