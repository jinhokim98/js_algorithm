const fs = require('fs')
const [integer, decimal] = fs.readFileSync(0, 'utf8').trim().split('.').map(Number)
console.log(integer)