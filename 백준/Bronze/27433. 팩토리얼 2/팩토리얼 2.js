const fs = require('fs')
const n = parseInt(fs.readFileSync(0, 'utf8').trim(), 10)

let answer = 1

for (let i = 1; i <= n; i++) {
    answer *= i
}

console.log(answer)