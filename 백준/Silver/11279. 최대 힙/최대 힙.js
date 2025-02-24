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
            
            if (this.heap[biggerChildIndex].key >= rootNode.key) {
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
}

const fs = require('fs')
const [n, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n').map(Number);

const pq = new PriorityQueue();
const answer = [];

rest.forEach((number) => {
    if (number === 0) {
        answer.push(pq.pop()?.value ?? 0);
    } else {
        pq.push(number, number);               
    }
});
                    
console.log(answer.join('\n'));
                    