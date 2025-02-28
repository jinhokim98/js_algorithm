const fs = require('fs');
const [input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, q] = input.split(' ').map(Number);
const matrix = rest.slice(0, 2 ** n).map((row) => row.split(' ').map(Number));
const magics = rest[2 ** n].split(' ').map(Number);

const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

const rotateMatrixBySize = (size, x, y) => {
    const temp = Array.from({ length: size }, () => Array(size).fill(0));

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            temp[j][size - i - 1] = matrix[x + i][y + j];
        }
    }

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            matrix[x + i][y + j] = temp[i][j];
        }
    }
};

magics.forEach((magic) => {
    const fireStomeSize = 2 ** magic;
    const matrixSize = 2 ** n;

    for (let i = 0; i < matrixSize / fireStomeSize; i++) {
        for (let j = 0; j < matrixSize / fireStomeSize; j++) {
            rotateMatrixBySize(fireStomeSize, i * fireStomeSize, j * fireStomeSize);
        }
    }

    const decreaseList = [];

    for (let i = 0; i < matrixSize; i++) {
        for (let j = 0; j < matrixSize; j++) {
            if (matrix[i][j] === 0) continue;

            let count = 0;
            for (const [dx, dy] of directions) {
                const nx = i + dx;
                const ny = j + dy;

                if (nx < 0 || nx >= matrixSize || ny < 0 || ny >= matrixSize) continue;
                if (matrix[nx][ny] !== 0) {
                    count++;
                }
            }

            if (count < 3) {
                decreaseList.push([i, j]);
            }
        }
    }

    decreaseList.forEach(([x, y]) => {
        matrix[x][y]--;
    });
});

let iceSum = matrix.flat().reduce((sum, val) => sum + val, 0);

const matrixRowSize = 2 ** n;
const visited = Array.from({ length: matrixRowSize }, () => Array(matrixRowSize).fill(false));

const bfs = (startX, startY) => {
    const queue = [[startX, startY]];
    let count = 1; 

    visited[startX][startY] = true;

    while (queue.length) {
        const [x, y] = queue.shift();

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx < 0 || nx >= matrixRowSize || ny < 0 || ny >= matrixRowSize) continue;
            if (!visited[nx][ny] && matrix[nx][ny] !== 0) {
                visited[nx][ny] = true;
                queue.push([nx, ny]);
                count++;
            }
        }
    }

    return count;
};

let maxChunk = 0;

for (let i = 0; i < matrixRowSize; i++) {
    for (let j = 0; j < matrixRowSize; j++) {
        if (!visited[i][j] && matrix[i][j] !== 0) {
            maxChunk = Math.max(maxChunk, bfs(i, j));
        }
    }
}

console.log(iceSum);
console.log(maxChunk);
