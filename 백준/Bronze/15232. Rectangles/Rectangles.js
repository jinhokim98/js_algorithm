const fs = require('fs')
const [n, m] = fs.readFileSync(0, 'utf8').trim().split('\n').map(Number)

const answer = []
for (let i = 0; i < n; i++) {
    let star = ''
    for (let j = 0; j < m; j++) {
        star += '*'
    }
    answer.push(star)
}

console.log(answer.join('\n'))