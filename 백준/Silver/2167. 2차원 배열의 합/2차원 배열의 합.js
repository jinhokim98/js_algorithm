const fs = require('fs');
const [input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, m] = input.split(' ').map(Number);
const matrix = rest.slice(0, n).map((row) => row.split(' ').map(Number));
const k = parseInt(rest[n], 10);
const points = rest.slice(n + 1, n + 1 + k).map((row) => row.split(' ').map(Number));

const prefixSum = Array.from({length: n + 1}, () => Array.from({length: m + 1}).fill(0));

for (let i = 1; i <=n; i++) {
    for (let j = 1; j <= m; j++) {
        prefixSum[i][j] = matrix[i - 1][j - 1] + prefixSum[i - 1][j] + prefixSum[i][j - 1] - prefixSum[i - 1][j - 1];
    }
}

points.forEach((point) => {
    const [i, j, x, y] = point;
    const prefixSumResult = prefixSum[x][y] - prefixSum[x][j - 1] - prefixSum[i - 1][y] + prefixSum[i - 1][j - 1];
    console.log(prefixSumResult);
})
