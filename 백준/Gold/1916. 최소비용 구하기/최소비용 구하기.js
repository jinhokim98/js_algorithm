class PriorityQueue {
    constructor() {
        this.heap = [];
    }
    
    getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1;
    getRightChildIndex = (parentIndex) => parentIndex * 2 + 2;
    getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2);
    isEmpty = () => this.heap.length <= 0;
    
    push = (key, value) => {
        const node = {key, value};
        this.heap.push(node);
        this.heapifyUp();
    }
    
    heapifyUp = () => {
        let index = this.heap.length - 1;
        const lastInsertedNode = this.heap[index];
        
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            const parentNode = this.heap[parentIndex];
            
            if (parentNode.key > lastInsertedNode.key) {
                this.heap[index] = this.heap[parentIndex];
                index = parentIndex;
            } else break;
        }
        
        this.heap[index] = lastInsertedNode;
    }
    
    pop = () => {
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
        const size = this.heap.length;
        const rootNode = this.heap[index];
        
        while (this.getLeftChildIndex(index) < size) {
            const leftChildIndex = this.getLeftChildIndex(index);
            const rightChildIndex = this.getRightChildIndex(index);
            
            const smallerChildIndex = rightChildIndex < size && this.heap[rightChildIndex].key < this.heap[leftChildIndex].key ? rightChildIndex : leftChildIndex;
            
            if (this.heap[smallerChildIndex].key < rootNode.key) {
                this.heap[index] = this.heap[smallerChildIndex];
                index = smallerChildIndex
            } else break;
        }
        
        this.heap[index] = rootNode;
    }
}

const fs = require('fs');
const [n, m, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const cities = parseInt(n, 10);
const bus = parseInt(m, 10);

const graph = Array.from({length: cities + 1}, () => []);
const distance = Array.from({length: cities + 1}).fill(Infinity);

rest.slice(0, bus).forEach((line) => {
    const [start, end, dist] = line.split(' ').map(Number);
    graph[start].push([end, dist]);
});

const [start, end] = rest[m].split(' ').map(Number);

const pq = new PriorityQueue();
pq.push(0, start);
distance[start] = 0;

while (!pq.isEmpty()) {
    const {key: cost, value: cur} = pq.pop();
    
    if (cost > distance[cur]) continue;

    for (const [node, dist] of graph[cur]) {
        const newCost = dist + cost;
        
        if (newCost < distance[node]) {
            pq.push(newCost, node);
            distance[node] = newCost;
        }
    }
}

console.log(distance[end]);
