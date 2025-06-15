const fs = require('fs')
const word = fs.readFileSync(0, 'utf8').trim().toLowerCase()

const prequency = Array.from({length: 26}).fill(0)

for (let i = 0; i < word.length; i++) {
    const ascil = word[i].charCodeAt() - 97
    prequency[ascil]++
}

const maxValue = Math.max(...prequency)

const result = []
for (let i = 0; i < prequency.length; i++) {
    if (prequency[i] === maxValue) {
        result.push(i)
    }
}

if (result.length >= 2) {
    console.log('?')
} else {
    console.log(String.fromCharCode(result[0] + 65))
}

