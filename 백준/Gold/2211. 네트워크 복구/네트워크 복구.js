class PriorityQueue {
    constructor() {
        this.heap = []
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
            
            if (this.heap[parentIndex].key > lastInsertedNode.key) {
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

const [n, m] = input.split(' ').map(Number);
const graph = Array.from({length: n + 1}, () => []);

rest.forEach((line) => {
    const [start, end, dist] = line.split(' ').map(Number);
    graph[start].push([end, dist]);
    graph[end].push([start, dist]);
});

// 1. 최소 개수의 회선 복구
// -> 1에서 다른 컴퓨터로 보낼 수 있는 최단거리 루트들 구하기
// 2. 슈퍼컴퓨터가 다른 컴퓨터에 전송할 때 시간이 최소

const route = new Set();

const distance = Array.from({length: n + 1}).fill({prev: null, cost: Infinity});
const pq = new PriorityQueue();
pq.push(0, 1); // 시작은 1
distance[1] = {prev: -1, dist: 0};

while (!pq.isEmpty()) {
    const {key: cost, value: cur} = pq.pop();

    if (cost > distance[cur].cost) continue;

    for (const [next, dist] of graph[cur]) {
        const newCost = dist + cost;

        if (newCost < distance[next].cost) {
            pq.push(newCost, next);
            distance[next] = {prev: cur, cost: newCost}
        }
    }
}

for (let i = 2; i <= n; i++) {
    let current = i;
    const paths = [];
    
    while (current !== -1) {
        if (current !== 1) {
          paths.push(`${distance[current].prev} ${current}`)
        };
        current = distance[current].prev
    }
    
    paths.reverse().forEach((path) => {
      route.add(path);
    });
}

console.log(route.size);
console.log([...route].join('\n'));
