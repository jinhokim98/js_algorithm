const fs = require('fs')
const number = parseInt(fs.readFileSync(0, 'utf8').trim(), 10)

console.log(number % 21)