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
  };

  heapifyUp = () => {
    let index = this.heap.length - 1;
    const lastInsertedNode = this.heap[index];

    while (index > 0) {
      const parentIndex = this.getParentIndex(index);

      // 최소 힙이므로 부모가 더 크면 순서 바꿔주어야 함
      if (lastInsertedNode.key < this.heap[parentIndex].key) {
        this.heap[index] = this.heap[parentIndex];
        index = parentIndex;
      } else break;
    }

    this.heap[index] = lastInsertedNode;
  };

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
  };

  heapifyDown = () => {
    let index = 0;
    const rootNode = this.heap[index];
    const size = this.heap.length;

    while (this.getLeftChildIndex(index) < size) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);
      const smallerChildIndex =
        rightChildIndex < size && this.heap[rightChildIndex].key < this.heap[leftChildIndex].key
          ? rightChildIndex
          : leftChildIndex;

      // 최소 힙이므로 자식이 더 작으면 바꿔주어야 함
      if (rootNode.key > this.heap[smallerChildIndex].key) {
        this.heap[index] = this.heap[smallerChildIndex];
        index = smallerChildIndex;
      } else break;
    }

    this.heap[index] = rootNode;
  };

  isEmpty = () => this.heap.length <= 0;
}

const fs = require('fs')
const [first, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n')
const [n, k] = first.split(' ').map(Number)
const jewels = rest.slice(0, n).map((line) => line.split(' ').map(Number)).sort((a, b) => a[0] - b[0])
const bags = rest.slice(n).map(Number).sort((a, b) => a - b)

let answer = 0
const pq = new PriorityQueue()
let index = 0

for (let i = 0; i < k; i++) {
    while (index < n && jewels[index][0] <= bags[i]) {
        const [m, v] = jewels[index]
        pq.push(-v, m)
        index++
    }
    const popped = pq.pop()
    if (popped) {
        const {key: v, value: m} = popped
        answer += Math.abs(v)
    }
}

console.log(answer)
