const fs = require('fs')
const lower = fs.readFileSync(0, 'utf8').trim()

console.log(lower.toUpperCase())