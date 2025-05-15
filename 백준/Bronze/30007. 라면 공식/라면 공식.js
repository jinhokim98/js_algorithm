const fs = require('fs')
const [N, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n')
const n = parseInt(N, 10)

const answer = []
rest.forEach((line) => {
    const [a, b, x] = line.split(' ').map(Number)
    answer.push(a * (x - 1) + b)
})

console.log(answer.join('\n'))