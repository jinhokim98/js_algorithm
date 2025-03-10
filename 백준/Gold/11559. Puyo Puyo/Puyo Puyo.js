const fs = require('fs');
const matrix = fs.readFileSync(0, 'utf8').trim().split('\n').map((row) => row.split(''));
const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];

let puyo = Array.from({ length: 6 }, () => Array.from({ length: 12 }));

for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 6; j++) {
        puyo[j][i] = matrix[i][j];
    }
}

const bfs = (startX, startY, target) => {
    let canPuyo = false;
    const deletePuyo = [[startX, startY]];
    const queue = [[startX, startY]];
    let visited = Array.from({ length: 6 }, () => Array(12).fill(false));

    visited[startX][startY] = true;

    while (queue.length) {
        const [x, y] = queue.shift();

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx >= 0 && nx < 6 && ny >= 0 && ny < 12 && !visited[nx][ny] && puyo[nx][ny] === target) {
                visited[nx][ny] = true;
                queue.push([nx, ny]);
                deletePuyo.push([nx, ny]);
            }
        }
    }

    if (deletePuyo.length >= 4) {
        canPuyo = true;
        deletePuyo.forEach(([x, y]) => {
            puyo[x][y] = '.';
        });
    }

    return canPuyo;
};

const puyoShift = () => {
    for (let i = 0; i < 6; i++) {
        puyo[i] = puyo[i].filter((v) => v !== '.');
        while (puyo[i].length < 12) {
            puyo[i].unshift('.');
        }
    }
};

let puyoCount = 0;

while (true) {
    let isExploded = false;
    let visited = Array.from({ length: 6 }, () => Array(12).fill(false));

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 12; j++) {
            if (!visited[i][j] && puyo[i][j] !== '.') {
                if (bfs(i, j, puyo[i][j])) {
                    isExploded = true;
                }
            }
        }
    }

    if (!isExploded) break;

    puyoShift();
    puyoCount++;
}

console.log(puyoCount);
