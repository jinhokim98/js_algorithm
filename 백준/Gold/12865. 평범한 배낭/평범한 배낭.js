const fs = require('fs');
const [input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, k] = input.split(' ').map(Number);
const items = rest.map((line) => line.split(' ').map(Number));

const dp = Array(n + 1).fill().map(() => Array(k + 1).fill(0));

for (let i = 1; i <= n; i++) {
    const [weight, value] = items[i - 1];
    for (let w = 0; w <= k; w++) {
        if (w < weight) {
            dp[i][w] = dp[i - 1][w];
        } else {
            dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weight] + value);
        }
    }
}

console.log(dp[n][k]);
