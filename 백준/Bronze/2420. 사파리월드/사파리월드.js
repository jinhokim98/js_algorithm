const fs = require('fs')
const [n, m] = fs.readFileSync(0, 'utf8').trim().split(' ').map(Number)
console.log(Math.abs(n - m))