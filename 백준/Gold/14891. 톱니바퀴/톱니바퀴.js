const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const wheels = input.slice(0, 4).map((row) => row.split('').map(Number));

const k = parseInt(input[4], 10);
const rotates = input.slice(5, 5 + k).map((row) => row.split(' ').map(Number));

// 맞닿은 인덱스는 2번
// 회전 [3, -1] 3번 반시계

const rotateWheel = (current, direction, isRotate) => {
    // 범위에 맞지 않다면 중단
    if (current < 0 || current >= 4) return;
    if (isRotate[current]) return;

    const left = current - 1;
    const right = current + 1;

    if (direction === 1) {
        // 시계방향
        const lastElement = wheels[current].pop();
        wheels[current].unshift(lastElement);
        isRotate[current] = true;

        // 극이 다른 경우
        if (left >= 0 && wheels[left][2] !== wheels[current][7]) {
            rotateWheel(left, -1, isRotate);
        }
        
        if (right < 4 && wheels[right][6] !== wheels[current][3]) {
            rotateWheel(right, -1, isRotate);
        }
        
    } else {
        // 반시계방향
        const firstElement = wheels[current].shift();
        wheels[current].push(firstElement);
        isRotate[current] = true;
        
        // 극이 다른 경우 
        if (left >= 0 && wheels[left][2] !== wheels[current][5]) {
            rotateWheel(left, 1, isRotate);
        }
        
        if (right < 4 && wheels[right][6] !== wheels[current][1]) {
            rotateWheel(right, 1, isRotate);
        }
    }
}

rotates.forEach(([wheel, direction], index) => {
    const isRotate = Array.from({length: 4}).fill(false);
    rotateWheel(wheel - 1, direction, isRotate);
});


let answer = 0;

for (let i = 0; i < 4; i++) {
    if (wheels[i][0] === 1) {
        answer += Math.pow(2, i);
    }
}

console.log(answer);
