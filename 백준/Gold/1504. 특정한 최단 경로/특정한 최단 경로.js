class PriorityQueue {
    constructor () {
        this.heap = [];
    }
    
    getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1;
    getRightChildIndex = (parentIndex) => parentIndex * 2 + 2;
    getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2);
    
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
            
            if (lastInsertedNode.key < this.heap[parentIndex].key ) {
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
    
    isEmpty = () => this.heap.length <= 0;
}

const fs = require('fs');
const [input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, e] = input.split(' ').map(Number);
const graph = Array.from({length: n + 1}, () => []);

rest.slice(0, e).forEach((line) => {
    const [start, end, dist] = line.split(' ').map(Number);
    graph[start].push([end, dist]);
    graph[end].push([start, dist]);
});

const [mustA, mustB] = rest[e].split(' ').map(Number);

const dijkstra = (start) => {
    const distList = Array.from({length: n + 1}).fill(Infinity);
    const pq = new PriorityQueue();
    pq.push(0, start);
    distList[start] = 0;
    
    while (!pq.isEmpty()) {
        const {key: cost, value: node} = pq.pop();
        
        if (cost > distList[node]) continue;
        for (const [next, dist] of graph[node]) {
            const newCost = cost + dist;

            if (newCost < distList[next]) {
                distList[next] = newCost;
                pq.push(newCost, next);
            }
        }
    }
    
    return distList;
}

const distFrom1 = dijkstra(1);
const distFromA = dijkstra(mustA);
const distFromB = dijkstra(mustB);

const route1 = distFrom1[mustA] + distFromA[mustB] + distFromB[n];
const route2 = distFrom1[mustB] + distFromB[mustA] + distFromA[n];

const answer = Math.min(route1, route2);
console.log(answer === Infinity ? -1 : answer);
