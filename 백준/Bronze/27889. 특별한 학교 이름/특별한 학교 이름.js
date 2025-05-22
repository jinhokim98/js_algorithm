const fs = require('fs')
const word = fs.readFileSync(0, 'utf8').trim()

if (word === 'NLCS') {
    console.log('North London Collegiate School')
}

if (word === 'BHA') {
    console.log('Branksome Hall Asia')
}

if (word === 'KIS') {
    console.log('Korea International School')
}

if (word === 'SJA') {
    console.log('St. Johnsbury Academy')
}