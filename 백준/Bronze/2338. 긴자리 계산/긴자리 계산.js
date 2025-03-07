const fs = require('fs');
const [a, b] = fs.readFileSync(0, 'utf8').trim().split('\n').map(BigInt);

console.log((a + b).toString());
console.log((a - b).toString());
console.log((a * b).toString());
