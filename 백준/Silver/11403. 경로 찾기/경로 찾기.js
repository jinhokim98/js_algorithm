const fs = require('fs');
const [input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const n = parseInt(input, 10);
const matrix = rest.map((row) => row.split(' ').map(Number));

for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][k] && matrix[k][j]) {
                matrix[i][j] = 1;
            }
        }
    }
}

matrix.forEach(row => {
  console.log(row.join(' '));
});
