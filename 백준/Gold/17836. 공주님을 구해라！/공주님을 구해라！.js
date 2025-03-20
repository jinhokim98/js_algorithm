const fs = require('fs');
const [input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, m, time] = input.split(' ').map(Number);
const matrix = rest.map((row) => row.split(' ').map(Number));

const distance = Array.from({length: n}, () => Array.from({length: m}, () => [Infinity, Infinity]));

const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

const bfs = () => {
    const queue = [[0, 0, 0, 0]];
    distance[0][0] = [0, 0];

    while (queue.length) {
        const [x, y, dist, gramMagic] = queue.shift();
        
        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;
            
            if (nx >= 0 && nx < n && ny >= 0 && ny < m && distance[nx][ny][gramMagic] > dist + 1) {
                if (matrix[nx][ny] === 0 && gramMagic === 0) {
                    // 검 얻기 전이라면 0 제한
                    distance[nx][ny][0] = dist + 1;
                    queue.push([nx, ny, dist + 1, gramMagic]);
                } else if (gramMagic === 1) {
                    // 검을 얻은 뒤라면 0제한 사라짐
                    distance[nx][ny][gramMagic] = dist + 1;
                    queue.push([nx, ny, dist + 1, 1]);
                } else if (matrix[nx][ny] === 2) {
                    // 검을 만난 순간 검 획득
                    distance[nx][ny][0] = dist + 1;
                    distance[nx][ny][1] = dist + 1;
                    queue.push([nx, ny, dist + 1, 1]);
                }
            }
        }
    }
}

bfs();

const min = Math.min(...distance[n - 1][m - 1]);
if (min > time) console.log('Fail');
else console.log(min);
