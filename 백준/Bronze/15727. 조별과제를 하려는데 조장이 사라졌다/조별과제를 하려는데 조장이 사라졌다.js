const fs = require('fs')
const n = parseInt(fs.readFileSync(0, 'utf8').trim(), 10)

console.log(Math.ceil(n / 5))