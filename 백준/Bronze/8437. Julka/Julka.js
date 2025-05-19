const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const total = BigInt(input[0]);
const diff = BigInt(input[1]);

const klaudia = (total + diff) / 2n;
const natalia = (total - diff) / 2n;

console.log(klaudia.toString());
console.log(natalia.toString());
