const fs = require('fs');
const [input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const [r, c] = input.split(' ').map(Number);
const matrix = rest.map(row => row.split(''));

const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const fireQueue = [];
const personQueue = [];
const fireVisited = Array.from({length: r}, () => Array(c).fill(false));
const personVisited = Array.from({length: r}, () => Array(c).fill(false));

for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
        if (matrix[i][j] === 'F') {
            fireQueue.push([i, j]);
            fireVisited[i][j] = true;
        } else if (matrix[i][j] === 'J') {
            personQueue.push([i, j, 0]);
            personVisited[i][j] = true;
        }
    }
}

const bfs = () => {
    while (fireQueue.length || personQueue.length) {
        const fireLen = fireQueue.length;
        for (let i = 0; i < fireLen; i++) {
            const [x, y] = fireQueue.shift();
            for (const [dx, dy] of directions) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < r && ny >= 0 && ny < c &&
                    !fireVisited[nx][ny] && matrix[nx][ny] === '.') {
                    matrix[nx][ny] = 'F';
                    fireVisited[nx][ny] = true;
                    fireQueue.push([nx, ny]);
                }
            }
        }

        const personLen = personQueue.length;
        for (let i = 0; i < personLen; i++) {
            const [x, y, dist] = personQueue.shift();
            
            if (x === 0 || y === 0 || x === r - 1 || y === c - 1) {
                return dist + 1;
            }

            for (const [dx, dy] of directions) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < r && ny >= 0 && ny < c &&
                    !personVisited[nx][ny] && matrix[nx][ny] === '.') {
                    personVisited[nx][ny] = true;
                    personQueue.push([nx, ny, dist + 1]);
                }
            }
        }
    }
    return "IMPOSSIBLE";
};

console.log(bfs());
