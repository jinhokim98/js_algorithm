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
        this.heapifyUp(); // 배열의 끝에 넣고 다시 min heap으로
    }
    
    heapifyUp = () => {
        let index = this.heap.length - 1; // 끝의 인덱스
        const lastInsertedNode = this.heap[index];
        
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            
            // 부모보다 자식이 크다면 자식과 부모의 순서를 바꾼다.
            if (this.heap[parentIndex].key > lastInsertedNode.key) {
                this.heap[index] = this.heap[parentIndex];
                index = parentIndex; // 바꾼 후 현재 인덱스를 부모로 옮기기
            } else break;
        }
        
        // 마지막 찾은 곳이 들어올 곳
        this.heap[index] = lastInsertedNode;
    }
    
    remove = () => {
        const count = this.heap.length;
        const rootNode = this.heap[0];
        
        if (count <= 0) return undefined;
        if (count === 1) this.heap = [];
        else {
            this.heap[0] = this.heap.pop(); // 끝 노드를 가져와서 루트로 만든다.
            this.heapifyDown();
        }
        
        return rootNode;
    }
    
    heapifyDown = () => {
        let index = 0;
        const count = this.heap.length;
        const rootNode = this.heap[index];
        
        // 계속해서 left child가 있을 때까지 검사한다.
        while (this.getLeftChildIndex(index) < count) {
            const leftChildIndex = this.getLeftChildIndex(index);
            const rightChildIndex = this.getRightChildIndex(index);
            
            // 왼쪽 오른쪽 중에 더 작은 노드를 구한다.
            const smallerChildIndex = rightChildIndex < count && this.heap[rightChildIndex].key < this.heap[leftChildIndex].key ? rightChildIndex : leftChildIndex;
            
            // 자식 노드의 키 값이 루트노드보다 작다면 위로 올린다.
            if (this.heap[smallerChildIndex].key <= rootNode.key) {
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
    
    push = (priority, value) => this.insert(priority, value);
    pop = () => this.remove();
    isEmpty = () => this.heap.length <= 0;
}

const fs = require('fs');
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

console.log(answer.join('\n'))