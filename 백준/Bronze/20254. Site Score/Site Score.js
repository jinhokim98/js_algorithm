const fs = require('fs')
const [a, b, c, d] = fs.readFileSync(0, 'utf8').trim().split(' ').map(Number)

console.log(56 * a + 24 * b + 14 * c + 6 * d)