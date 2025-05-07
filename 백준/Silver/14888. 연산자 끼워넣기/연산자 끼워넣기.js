const fs = require('fs');
const [nInput, numberInput, operatorsInput] = fs.readFileSync(0, 'utf8').trim().split('\n');
const n = parseInt(nInput, 10);
const numbers = numberInput.split(' ').map(Number);
const operators = operatorsInput.split(' ').map(Number); // + - * /

let max = -1_000_000_000;
let min = 1_000_000_000;

const calculate = [
  (a, b) => a + b,
  (a, b) => a - b,
  (a, b) => a * b,
  (a, b) => ~~(a / b)
];

const dfs = (count = 0, result = numbers[0]) => {
  if (count === n - 1) {
    max = Math.max(max, result);
    min = Math.min(min, result);
  } else {
    for (let i = 0; i < 4 ; i++) {
      if (!operators[i]) {
        continue;
      }
      operators[i]--;
      dfs(count + 1, calculate[i](result, numbers[count + 1]));
      operators[i]++;
    }
  }
};

dfs();
console.log(max);
console.log(min);
