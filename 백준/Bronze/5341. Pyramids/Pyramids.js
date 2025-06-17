const fs = require('fs')
const inputs = fs.readFileSync(0, 'utf8').trim().split('\n').slice(0, -1)

const answer = []

inputs.forEach((input) => {
    const number = parseInt(input, 10)
    let blocks = 0
    for (let i = number; i > 0; i--) {
        blocks += i
    }
    answer.push(blocks)
})

console.log(answer.join('\n'))