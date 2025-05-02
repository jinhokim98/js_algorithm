const fs = require('fs')
let number = Number(fs.readFileSync(0, 'utf8').trim())

const factors = []
let divisor = 2

while (number >= 2) {
   if (number % divisor === 0) {
       factors.push(divisor)
       number /= divisor
   } else {
       divisor++
   }
}

console.log(factors.join('\n'))
