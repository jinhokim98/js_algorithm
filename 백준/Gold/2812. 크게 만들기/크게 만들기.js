const fs = require('fs')
const [first, rest] = fs.readFileSync(0, 'utf8').trim().split('\n')
const [n, k] = first.split(' ').map(Number)
const numbers = rest.split('').map(Number)

const stack = []
let deleteCount = 0

for (let i = 0; i < n; i++) {
    while (stack.length && deleteCount < k && numbers[i] > stack[stack.length - 1]) {
        stack.pop()
        deleteCount++
    }
    
    stack.push(numbers[i])
}

while (deleteCount < k) {
  stack.pop()
  deleteCount++
}

console.log(stack.join(''))