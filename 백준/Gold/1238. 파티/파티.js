class Heap {
    constructor() {
        this.heap = [];
    }
    
    getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1;
    getRightChildIndex = (parentIndex) => parentIndex * 2 + 2;
    getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2);
    
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
            const parentNode = this.heap[parentIndex];
            
            if (parentNode.key > lastInsertedNode.key) {
                this.heap[index] = parentNode;
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
        const rootNode = this.heap[index];
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
    constructor() {super()}
    
    push = (key, value) => this.insert(key, value);
    pop = () => this.remove();
    isEmpty = () => this.heap.length <= 0;
}

const fs = require('fs');
const [input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, m, x] = input.split(' ').map(Number);
const graph = Array.from({length: n + 1}, () => []);

rest.forEach((line) => {
    const [start, end, dist] = line.split(' ').map(Number);
    graph[start].push([end, dist]);
});

const beforeArrivedX = [];

for (let i = 1; i <= n; i++) {
    const distance = Array.from({length: n + 1}).fill(Infinity);
    const pq = new PriorityQueue();
    
    if (i === x) continue;
    pq.push(0, [i, 0]);
    distance[i] = 0;
    
    while(!pq.isEmpty()) {
        const [curNode, cost] = pq.pop().value;
        
        for (const [node, dist] of graph[curNode]) {
            const newCost = dist + cost;
            
            if (newCost < distance[node]) {
                pq.push(newCost, [node, newCost]);
                distance[node] = newCost;
            }
        }
    }
    
    beforeArrivedX.push(distance[x]);
}

const afterDepartMentX = [];

for (let i = 1; i <= n; i++) {
    const distance = Array.from({length: n + 1}).fill(Infinity);
    const pq = new PriorityQueue();
    
    if (i === x) continue;
    pq.push(0, [x, 0]);
    distance[x] = 0;
    
    while(!pq.isEmpty()) {
        const [curNode, cost] = pq.pop().value;
        
        for (const [node, dist] of graph[curNode]) {
            const newCost = dist + cost;
            
            if (newCost < distance[node]) {
                pq.push(newCost, [node, newCost]);
                distance[node] = newCost;
            }
        }
    }
    
    afterDepartMentX.push(distance[i]);
}

let answer = -Infinity;

for (let i = 0; i < n - 1; i++) {
  answer = Math.max(answer, beforeArrivedX[i] + afterDepartMentX[i]);
}

console.log(answer)
