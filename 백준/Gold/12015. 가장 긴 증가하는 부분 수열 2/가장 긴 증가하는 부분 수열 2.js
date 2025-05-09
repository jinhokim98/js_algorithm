const fs = require('fs')
const [input, rest] = fs.readFileSync(0, 'utf8').trim().split('\n')
const n = parseInt(input, 10)
const sequence = rest.split(' ').map(Number)

const lis = []
sequence.forEach((number) => {
    let left = 0
    let right = lis.length
    
    while (left < right) {
        let mid = Math.floor((left + right) / 2)
        if (lis[mid] < number) left = mid + 1
        else right = mid
    }
    
    if (left === lis.length) lis.push(number)
    else lis[left] = number
})

console.log(lis.length)