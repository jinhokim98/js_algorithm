const fs = require('fs');
const [input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, m] = input.split(' ').map(Number);
const matrix = rest.map((row) => row.split(' ').map(Number));

const prefixSum = Array.from({length: n + 1}, () => Array.from({length: m + 1}).fill(0));

for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
        prefixSum[i][j] = prefixSum[i - 1][j] + prefixSum[i][j - 1] - prefixSum[i - 1][j - 1] + matrix[i - 1][j - 1];
    }
}

let max = -Infinity;

for (let i = 1; i <=n; i++) {
  for (let j = 1; j <=m; j++) {
    for (let x = i; x <= n; x++) {
      for (let y = j; y <= m; y++) {
        max = Math.max(max, prefixSum[x][y] - prefixSum[x][j-1] - prefixSum[i-1][y] + prefixSum[i-1][j-1])
      }
    }
  }
}

console.log(max);
