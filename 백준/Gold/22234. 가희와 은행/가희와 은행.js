class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1;
    getRightChildIndex = (parentIndex) => parentIndex * 2 + 2;
    getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2);

    compareKey = (a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return a[1] - b[1];
    }

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

            if (this.compareKey(this.heap[parentIndex].key, lastInsertedNode.key) > 0) {
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
        const rootNode = this.heap[index];
        const size = this.heap.length;

        while (this.getLeftChildIndex(index) < size) {
            const leftChildIndex = this.getLeftChildIndex(index);
            const rightChildIndex = this.getRightChildIndex(index);

            let smallerChildIndex = leftChildIndex;

            if (
                rightChildIndex < size &&
                this.compareKey(this.heap[rightChildIndex].key, this.heap[leftChildIndex].key) < 0
            ) {
                smallerChildIndex = rightChildIndex;
            }

            if (this.compareKey(this.heap[smallerChildIndex].key, rootNode.key) < 0) {
                this.heap[index] = this.heap[smallerChildIndex];
                index = smallerChildIndex;
            } else break;
        }

        this.heap[index] = rootNode;
    }

    isEmpty = () => this.heap.length === 0;

    peek = () => this.heap[0];
}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, t, w] = input[0].split(' ').map(Number);
const startWaiting = input.slice(1, 1 + n).map(line => line.split(' ').map(Number));
const m = parseInt(input[n + 1]);
const afterWaiting = input.slice(n + 2).map(line => line.split(' ').map(Number));

const pq = new PriorityQueue();
let order = 0;

for (let i = 0; i < m; i++) {
    const [id, time, arriveTime] = afterWaiting[i];
    pq.push([arriveTime, order++], [id, time]);
}

const waiting = [...startWaiting];
const answer = [];
let currentTime = 0;

let current = null;
let remaining = 0;
let currentId = null;

while (currentTime < w) {
    while (!pq.isEmpty() && pq.peek().key[0] === currentTime) {
        const { value } = pq.pop();
        waiting.push(value);
    }

    if (remaining === 0) {
        if (waiting.length > 0) {
            [currentId, remaining] = waiting.shift();
            if (remaining > t) {
                pq.push([currentTime + t, order++], [currentId, remaining - t]);
                remaining = t;
            }
        }
    }

    if (remaining > 0) {
        answer.push(currentId);
        remaining--;
    }

    currentTime++;
}

console.log(answer.join('\n'));
