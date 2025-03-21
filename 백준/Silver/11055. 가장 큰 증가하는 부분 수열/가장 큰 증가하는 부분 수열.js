const fs = require('fs');
const [N, input] = fs.readFileSync(0, 'utf8').trim().split('\n');
const n = parseInt(N, 10);

const sequence = input.split(' ').map(Number);
const dp = [...sequence];

for (let i = 1; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (sequence[j] < sequence[i]) {
      dp[i] = Math.max(dp[i], dp[j] + sequence[i]);
    }
  }
}

console.log(Math.max(...dp));