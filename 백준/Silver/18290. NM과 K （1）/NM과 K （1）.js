const fs = require('fs');
const [input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, m, k] = input.split(' ').map(Number);
const matrix = rest.map((row) => row.split(' ').map(Number));

const visited = Array.from({ length: n }, () => Array.from({length: m}).fill(false));
let answer = -Infinity;

const directions = [
  [-1, 0], [1, 0], [0, -1], [0, 1]
];

const backtrack = (count, sum) => {
  if (count === k) {
    answer = Math.max(answer, sum);
    return;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (visited[i][j]) continue;
      
      let canSelect = true;
      for (const [dx, dy] of directions) {
        const nx = i + dx;
        const ny = j + dy;
        
        if (nx >= 0 && nx < n && ny >= 0 && ny < m && visited[nx][ny]) {
          canSelect = false;
          break;
        }
      }

      if (canSelect){
        visited[i][j] = true;
        backtrack(count + 1, sum + matrix[i][j]);
        visited[i][j] = false;
      }
    }
  }
};

backtrack(0, 0);
console.log(answer);
