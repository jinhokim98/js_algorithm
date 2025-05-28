const fs = require('fs')
const n = parseInt(fs.readFileSync(0, 'utf8').trim())
const answer = []

for (let i = n; i > 0; i--) {
    answer.push(i)
}

console.log(answer.join('\n'))