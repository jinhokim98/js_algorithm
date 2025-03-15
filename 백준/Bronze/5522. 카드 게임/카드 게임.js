const fs = require('fs');
const sequence = fs.readFileSync(0, 'utf8').trim().split('\n').map(Number);

console.log(sequence.reduce((acc, cur) => acc + cur, 0));
