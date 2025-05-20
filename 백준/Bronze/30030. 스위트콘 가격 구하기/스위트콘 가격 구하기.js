const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();

const B = parseInt(input, 10);
const A = Math.floor(B * 10 / 11);

console.log(A);
