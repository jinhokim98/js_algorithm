const fs = require('fs')
const year = parseInt(fs.readFileSync(0, 'utf8').trim(), 10)
console.log(year - 2024)