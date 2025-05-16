class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1;
    getRightChildIndex = (parentIndex) => parentIndex * 2 + 2;
    getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2);

    compareKey = (a, b) => {
      if (a[0] !== b[0]) return a[0] - b[0]
      return b[1] - a[1];
    }

    push = (key, value) => {
        const node = { key, value };
        this.heap.push(node);
        this.heapifyUp();
    }

    heapifyUp = () => {
        let index = this.heap.length - 1;
        const node = this.heap[index];

        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            if (this.compareKey(node.key, this.heap[parentIndex].key) > 0) {
                this.heap[index] = this.heap[parentIndex];
                index = parentIndex;
            } else break;
        }

        this.heap[index] = node;
    }

    pop = () => {
        if (this.heap.length === 0) return undefined;
        if (this.heap.length === 1) return this.heap.pop();

        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return root;
    }

    heapifyDown = () => {
        let index = 0;
        const node = this.heap[index];
        const size = this.heap.length;

        while (this.getLeftChildIndex(index) < size) {
            const left = this.getLeftChildIndex(index);
            const right = this.getRightChildIndex(index);

            let betterChild = left;

            if (
                right < size &&
                this.compareKey(this.heap[right].key, this.heap[left].key) > 0
            ) {
                betterChild = right;
            }

            if (this.compareKey(this.heap[betterChild].key, node.key) > 0) {
                this.heap[index] = this.heap[betterChild];
                index = betterChild;
            } else break;
        }

        this.heap[index] = node;
    }

    isEmpty = () => this.heap.length === 0;

    peek = () => this.heap[0];
}

const fs = require('fs')
const [first, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n')
const [t, n] = first.split(' ').map(Number)
const pq = new PriorityQueue()


let currentTime = 0
const answer = []

for (let i = 0; i < n; i++) {
    const [id, time, priority] = rest[i].split(' ').map(Number)
    pq.push([priority, id], time)
}

while (currentTime < t) {
    const {key: [priority, id], value: time} = pq.pop()
    // 현재 프로세스 시간--, 우선순위--
    if (time > 1) {
        pq.push([priority - 1, id], time - 1)
        answer.push(id)
    } else {
        answer.push(id)
    }
    currentTime++
}

console.log(answer.join('\n'))
