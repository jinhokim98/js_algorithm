const fs = require('fs');
const [input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const [r, c, totalTime] = input.split(' ').map(Number);
const matrix = rest.map((line) => line.split('').map((point) => point === 'O' ? 0 : null));

const directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [0, 0]];

const getIsBurst = (time) => {
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            if (matrix[i][j] !== null && time - matrix[i][j] === 3) {
                return true;
            }
        }
    }
    
    return false;
}

// time까지 반복 1초는 아무것도 하지 않으므로 제외
for (let time = 2; time <= totalTime; time++) {
    // 터지는지 선조사
    const isBurst = getIsBurst(time);
    const burstPoint = [];

    // 행렬 순회
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            if (!isBurst && matrix[i][j] === null) {
                // 터지지 않고 비어있을 때 폭탄 채움
                matrix[i][j] = time;
            } else if (isBurst && matrix[i][j] !== null && time - matrix[i][j] === 3) {
                // 터질 때는
                for (const [dx, dy] of directions) {
                    const nx = i + dx;
                    const ny = j + dy;
                    
                    // 범위 내에 있는 것만 터뜨리는 배열 추가
                    if (nx >= 0 && nx < r && ny >= 0 && ny < c) {
                        burstPoint.push([nx, ny]);
                    }
                }
            }
        }
    }
    
    // 터뜨리기
    if (isBurst) {
        burstPoint.forEach((point) => {
            const [x, y] = point;
            matrix[x][y] = null;
        })
    }
}

// 출력하기 전 처리
for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
        if (matrix[i][j] !== null) {
            matrix[i][j] = 'O';
        } else {
            matrix[i][j] = '.';
        }
    }
}

for (let i = 0; i < r; i++) {
    const row = matrix[i].join('');
    console.log(row)
}

