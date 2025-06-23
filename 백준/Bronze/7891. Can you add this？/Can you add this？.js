const fs = require('fs')
const [first, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n')

const result = []
rest.forEach((line) => {
    const [a, b] = line.split(' ').map(Number)
    result.push(a + b)
})

console.log(result.join('\n'))