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
            const parentNode = this.heap[parentIndex];
            
            if (parentNode.key > lastInsertedNode.key) {
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
        const size = this.heap.length;
        const rootNode = this.heap[index];
        
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
const [condition, start, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const [v, e] = condition.split(' ').map(Number);
const startVertex = parseInt(start, 10);

const graph = Array.from({length: v + 1}, () => []);
const distance = Array.from({length: v + 1}).fill(Infinity);

rest.forEach((lineInfo) => {
    const [start, end, dist] = lineInfo.split(' ').map(Number);
    graph[start].push([end, dist]);
});

const pq = new PriorityQueue();
pq.push(0, [startVertex, 0]);
distance[startVertex] = 0;

while (!pq.isEmpty()) {
    const [currentNode, dist] = pq.pop().value;

    if (distance[currentNode] < dist) continue;
    
    for (const [node, cost] of graph[currentNode]) {
        const newCost = dist + cost;
        
        if (newCost < distance[node]) {
            pq.push(newCost, [node, newCost]);
            distance[node] = newCost;
        }
    }
}


distance.slice(1).forEach((dist) => {
  if (dist === Infinity) {
    console.log('INF');
  } else {
    console.log(dist);
  }
});

