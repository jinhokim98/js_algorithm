class Queue {
    constructor() {
        this.storage = new Object();
        this.front = 0;
        this.rear = 0;
    }
    
    size() {
        return this.rear - this.front;
    }
    
    push(element) {
        this.storage[this.rear] = element;
        this.rear++;
    }
    
    pop() {
        const removeElement = this.storage[this.front];
        delete this.storage[this.front];
        this.front++;
        
        if (this.front === this.rear) {
            this.front = 0;
            this.rear = 0;
        } 
        
        return removeElement
    }
}


const fs = require('fs');
const [N, ...input] = fs.readFileSync(0, 'utf8').trim().split('\n');
const n = parseInt(N);

const matrix = input.map((row) => row.split(''));
const redEqualGreenMatrix = matrix.map((row) => row.map((point) => {
    if (point === 'R') {
        return 'G';
    } else {
        return point;
    }
}));


const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const visited = Array.from({length: n}, () => Array.from({length: n}, () => [false, false]));

const bfs = (startX, startY, matrix, isRedAndGreenEqual) => {
    const queue = new Queue();
    queue.push([startX, startY]);
    visited[startX][startY][isRedAndGreenEqual] = true;

    while(queue.size() > 0) {
        const [x, y] = queue.pop();
        visited[x][y][isRedAndGreenEqual] = true;
        
        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;
            
            // 방문하지 않았고 주변과 현재 색이 동일할 때
            if (nx >= 0 && nx < n && ny >= 0 && ny < n && !visited[nx][ny][isRedAndGreenEqual] && matrix[x][y] === matrix[nx][ny]) {
                visited[nx][ny][isRedAndGreenEqual] = true;
                queue.push([nx, ny]);
            }
        }
    }
}

let answer = [0, 0];

for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (!visited[i][j][0]) {
            bfs(i, j, matrix, 0);
            answer[0]++
        }
        
        if (!visited[i][j][1]) {
            bfs(i, j, redEqualGreenMatrix, 1);
            answer[1]++;
        }
    }
}

console.log(answer.join(' '));
