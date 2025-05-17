const fs = require('fs')
const n = parseInt(fs.readFileSync(0, 'utf8').trim(), 10)

let answer = ''
for (let i = 0; i < n; i++) {
    answer += 'LoveisKoreaUniversity '
}

console.log(answer.trim())