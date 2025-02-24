class Heap {
    constructor() {
        this.heap = [];
    }
    
    getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1;
    getRightChildIndex = (parentIndex) => parentIndex * 2 + 2;
    getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2);
    peek = () => this.heap[0];

    insert = (key, value) => {
        const node = {key, value};
        this.heap.push(node);
        this.heapifyUp();
    }
    
    heapifyUp = () => {
        let index = this.heap.length - 1;
        const lastInsertedNode = this.heap[index];
        
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            
            if (this.heap[parentIndex].key > lastInsertedNode.key) {
                this.heap[index] = this.heap[parentIndex];
                index = parentIndex;
            } else break;
        }
        
        this.heap[index] = lastInsertedNode;
    }
    
    remove = () => {
        const size = this.heap.length;
        const rootNode = this.heap[0];
        
        if (size === 0) return undefined;
        if (size === 1) return this.heap.pop();
        else {
            this.heap[0] = this.heap.pop();
            this.heapifyDown();
        }
        
        return rootNode;
    }
    
    heapifyDown = () => {
        let index = 0;
        const rootNode = this.heap[0];
        const size = this.heap.length;
        
        while (this.getLeftChildIndex(index) < size) {
            const leftChildIndex = this.getLeftChildIndex(index);
            const rightChildIndex = this.getRightChildIndex(index);
            
            const smallerChildIndex = rightChildIndex < size && this.heap[rightChildIndex].key < this.heap[leftChildIndex].key ? rightChildIndex : leftChildIndex;
            
            if (this.heap[smallerChildIndex].key < rootNode.key) {
                this.heap[index] = this.heap[smallerChildIndex];
                index = smallerChildIndex;
            } else break;
        }
        
        this.heap[index] = rootNode;
    }
}

class PriorityQueue extends Heap {
    constructor() {
        super();
    }
    
    push = (key, value) => this.insert(key, value);
    pop = () => this.remove();
    isEmpty = () => this.heap.length <= 0;
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

let inputIndex = 0;
let playCount = 1;

const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

while (parseInt(input[inputIndex], 10) !== 0) {
    const n = parseInt(input[inputIndex], 10);
    inputIndex++;
    const matrix = input.slice(inputIndex, inputIndex + n).map((row) => row.split(' ').map(Number));
    inputIndex += n;
    
    const distance = Array.from({length: n}, () => Array.from({length: n}).fill(Infinity));
    
    const pq = new PriorityQueue();
    const start = [0, 0]
    const startCost = matrix[0][0];
    pq.push(startCost, [start, startCost]);
    distance[0][0] = startCost;
    
    while(!pq.isEmpty()) {
        const [cur, cost] = pq.pop().value;
        const [x, y] = cur;
        
        if (distance[x][y] < cost) continue;
        
        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;
            
            if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
            const newCost = cost + matrix[nx][ny];
            
            if (newCost < distance[nx][ny]) {
                pq.push(newCost, [[nx, ny], newCost]);
                distance[nx][ny] = newCost;
            }
        }
    }
    
    console.log(`Problem ${playCount}: ${distance[n - 1][n - 1]}`);
    playCount++
}


