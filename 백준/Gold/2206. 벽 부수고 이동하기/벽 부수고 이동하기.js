class Queue {
    constructor() {
        this.storage = new Object();
        this.front = 0;
        this.rear = 0;
    }
    
    size() {
        return this.rear - this.front;
    }
    
    enqueue(element) {
        this.storage[this.rear] = element;
        this.rear++;
    }
    
    dequeue() {
        let removed = this.storage[this.front];
        delete this.storage[this.front];
        this.front++;
        
        if (this.front === this.rear) {
            this.front = 0;
            this.rear = 0;
        }
        
        return removed;
    }
}

const fs = require('fs');
const [input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, m] = input.split(' ').map(Number);
const matrix = rest.map((row) => row.split('').map(Number));
const visited = Array.from({ length: n }, () =>
  Array.from({ length: m }, () => [Infinity, Infinity])
);
const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];

const bfs = (startX, startY) => {   
    const queue = new Queue();
    queue.enqueue([startX, startY, 0]);
    visited[startX][startY][0] = 1;

    while(queue.size() > 0) {
        const [x, y, isPunch] = queue.dequeue();
        
        // 도착 지점에 도달하면
        if (x === n-1 && y === m-1) {
          return visited[x][y][isPunch];
        }

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            // 유효한 좌표이고, 벽을 부수지 않은 경로와 벽을 부순 경로를 모두 탐색
            if (nx >= 0 && nx < n && ny >= 0 && ny < m) {
                const nextDistance = visited[x][y][isPunch] + 1;

                // 벽이 아닌 곳
                if (matrix[nx][ny] === 0 && visited[nx][ny][isPunch] > nextDistance) {
                    visited[nx][ny][isPunch] = nextDistance;
                    queue.enqueue([nx, ny, isPunch]);
                }
                // 벽이고, 벽을 부수지 않았다면
                else if (matrix[nx][ny] === 1 && isPunch === 0 && visited[nx][ny][1] > nextDistance) {
                    visited[nx][ny][1] = nextDistance;
                    queue.enqueue([nx, ny, 1]);
                }
            }
        }
    }
    
    return -1; // 도달 불가능
}

console.log(bfs(0, 0));
