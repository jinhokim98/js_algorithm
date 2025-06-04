const fs = require('fs')
const [x, y] = fs.readFileSync(0, 'utf8').trim().split('\n').map(Number)
console.log(x * y)