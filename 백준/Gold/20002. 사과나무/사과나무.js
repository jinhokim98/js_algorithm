const fs = require('fs');
const [n, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');
const size = parseInt(n, 10);

const matrix = rest.map((line) => line.split(' ').map(Number));
const prefixSum = Array.from({length: size + 1}, () => Array.from({length: size + 1}).fill(0));

for (let i = 1; i <= size; i++) {
    for (let j = 1; j <= size; j++) {
        prefixSum[i][j] = prefixSum[i - 1][j] + prefixSum[i][j - 1] - prefixSum[i - 1][j - 1] + matrix[i - 1][j - 1];
    }
}

const getPrefixSum = (i, j, x, y) => {
    return prefixSum[x][y] - prefixSum[i - 1][y] - prefixSum[x][j - 1] + prefixSum[i - 1][j - 1];
}

let answer = -Infinity;

for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
        let max = -Infinity;
        for (let k = 0; k < size; k++) {
            const startX = i + 1;
            const startY = j + 1;
            const endX = i + k + 1;
            const endY = j + k + 1;
            
            if (startX <= n && startY <= n && endX <= n && endY <= n) {
                const rangeSum = getPrefixSum(startX, startY, endX, endY);
                max = Math.max(max, rangeSum);
            }
        }
        
        answer = Math.max(answer, max);
    }
}

console.log(answer);
