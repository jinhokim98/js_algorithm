const fs = require('fs')
const [a, b] = fs.readFileSync(0, 'utf8').trim().split('\n')

console.log(a.length < b.length ? 'no' : 'go')