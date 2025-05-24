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
            
            // 최대 힙이니깐 부모보다 마지막의 노드가 더 작다면 바꾸기 
            if (this.heap[parentIndex].key < lastInsertedNode.key) {
                this.heap[index] = this.heap[parentIndex];
                index = parentIndex;
            } else break;
        }
        
        this.heap[index] = lastInsertedNode;
    }
    
    remove = () => {
        const size = this.heap.length;
        const rootNode = this.heap[0];
        
        if (size <= 0) return undefined;
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
        
        // 계속해서 왼쪽 자식이 있을 때까지 반복
        while (this.getLeftChildIndex(index) < size) {
            const leftChildIndex = this.getLeftChildIndex(index);
            const rightChildIndex = this.getRightChildIndex(index);
            
            const biggerChildIndex = rightChildIndex < size && this.heap[rightChildIndex].key > this.heap[leftChildIndex].key ? rightChildIndex : leftChildIndex;
            
            if (this.heap[biggerChildIndex].key > rootNode.key) {
                this.heap[index] = this.heap[biggerChildIndex];
                index = biggerChildIndex;
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
    peek = () => this.heap[0].value
}

const fs = require('fs')
const [first, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n')
const n = parseInt(first, 10)
const gasStations = rest.slice(0, -1).map((line) => line.split(' ').map(Number))
const [town, startGas] = rest[rest.length - 1].split(' ').map(Number)

gasStations.sort((a, b) => a[0] - b[0])

let answer = 0;
let canGo = startGas;
let i = 0;
const pq = new PriorityQueue();

while (canGo < town) {
    while (i < gasStations.length && gasStations[i][0] <= canGo) {
        pq.push(gasStations[i][1], gasStations[i][0])
        i++;
    }

    if (pq.isEmpty()) {
        answer = -1;
        break;
    }

    const gas = pq.pop().key;
    canGo += gas;
    answer++;
}

console.log(answer)

