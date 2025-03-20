class PriorityQueue {
    constructor() {
        this.heap = [];
    }
    
    getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1;
    getRightChildIndex = (parentIndex) => parentIndex * 2 + 2;
    getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2);

    push = (key, value) => {
        const node = { key, value };
        this.heap.push(node);
        this.heapifyUp();
    }

    heapifyUp = () => {
        let index = this.heap.length - 1;
        const lastInsertedNode = this.heap[index];

        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            if (parentIndex >= 0 && this.heap[parentIndex].key > lastInsertedNode.key) {
                this.heap[index] = this.heap[parentIndex];
                index = parentIndex;
            } else break;
        }

        this.heap[index] = lastInsertedNode;
    }

    pop = () => {
        const size = this.heap.length;
        if (size === 0) return undefined;
        if (size === 1) return this.heap.pop();

        const rootNode = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();

        return rootNode;
    }

    heapifyDown = () => {
        let index = 0;
        const size = this.heap.length;
        const rootNode = this.heap[0];

        while (this.getLeftChildIndex(index) < size) {
            const leftChildIndex = this.getLeftChildIndex(index);
            const rightChildIndex = this.getRightChildIndex(index);

            let smallerChildIndex = leftChildIndex;
            if (rightChildIndex < size && this.heap[rightChildIndex].key < this.heap[leftChildIndex].key) {
                smallerChildIndex = rightChildIndex;
            }

            if (this.heap[smallerChildIndex].key < rootNode.key) {
                this.heap[index] = this.heap[smallerChildIndex];
                index = smallerChildIndex;
            } else break;
        }

        this.heap[index] = rootNode;
    }

    isEmpty = () => this.heap.length === 0;
}

const fs = require('fs');
const [N, places, M, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const n = parseInt(N, 10);
const m = parseInt(M, 10);

const graph = Array.from({length: n + 1}, () => []);

// 거리 정보 저장
rest.forEach((line) => {
    const [start, end, dist] = line.split(' ').map(Number);
    graph[start].push([end, dist]);
    graph[end].push([start, dist]);
});

const dijkstra = (place) => {
    const distance = Array.from({length: n + 1}).fill(Infinity);
    
    const pq = new PriorityQueue();
    pq.push(0, place);
    distance[place] = 0;
    
    while (!pq.isEmpty()) {
        const {key: cost, value: curPlace} = pq.pop();
        
        if (distance[curPlace] < cost) continue;
        
        for (const [nextPlace, dist] of graph[curPlace]) {
            const newCost = cost + dist;
            
            if (distance[nextPlace] > newCost) {
                distance[nextPlace] = newCost;
                pq.push(newCost, nextPlace);
            }
        }
    }
    
    return distance;
}

let answer = 0;
let max = 0;

const [a, b, c] = places.split(' ').map(Number);
const distA = dijkstra(a);
const distB = dijkstra(b);
const distC = dijkstra(c);

for (let i = 1; i <= n; i++) {    
    if (i !== a && i !== b && i !== c) {
        const minDistance = Math.min(distA[i], distB[i], distC[i]);
        if (max < minDistance) {
            max = minDistance;
            answer = i;
        }
    }
}

console.log(answer);
