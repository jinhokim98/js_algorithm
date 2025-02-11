const fs = require('fs');
const [n, ...input] = fs.readFileSync(0, 'utf8').trim().split('\n');

let inputIndex = 0;

const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

const bfs = (M, N, startX, startY, matrix) => {
  const queue = [[startX, startY]];
  matrix[startX][startY] = 0;

  while(queue.length > 0) {
    const [x, y] = queue.shift();

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      
      if (nx >= 0 && nx < N && ny >= 0 && ny < M && matrix[nx][ny] === 1) {
        matrix[nx][ny] = 0;
        queue.push([nx, ny]);
      }
    }
  }
}

for (let i = 0; i < parseInt(n); i++) {
    const [M, N, K] = input[inputIndex].split(' ').map(Number);
    inputIndex++;
    const matrix = Array.from({length: N}, () => Array.from({length: M}).fill(0));

    for (let j = 0; j < K; j++) {
      const [x, y] = input[inputIndex + j].split(' ').map(Number);
      matrix[y][x] = 1;
    }
    
    let whiteWorm = 0;
    
    for (let row = 0; row < N; row++) {
      for (let column = 0; column < M; column++) {
        if (matrix[row][column] === 1) {
          bfs(M, N, row, column, matrix);
          whiteWorm++;
        }
      }
    }

    console.log(whiteWorm);
    inputIndex += K;
}