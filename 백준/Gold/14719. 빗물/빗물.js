const fs = require('fs')
const [matrix, heightsInput] = fs.readFileSync(0, 'utf8').trim().split('\n')
const [n, m] = matrix.split(' ').map(Number)
const heights = heightsInput.split(' ').map(Number)

const leftMax = Array.from({length: m}).fill(0)
const rightMax = Array.from({length: m}).fill(0)

leftMax[0] = heights[0]
rightMax[m - 1] = heights[m - 1]

for (let i = 1; i < m; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], heights[i])
}

for (let i = m - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], heights[i])
}

let answer = 0

for (let i = 0; i < m; i++) {
    const level = Math.min(leftMax[i], rightMax[i])
    const pools = level - heights[i]
    if (pools > 0) {
        answer += pools
    }
}

console.log(answer)
