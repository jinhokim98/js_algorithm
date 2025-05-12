const fs = require('fs')
const [N, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n')
const n = parseInt(N, 10)
const appointments = rest.map((line) => line.split(' ').map(Number))

const calendar = Array.from({length: 367}).fill(0)

appointments.forEach(([start, end]) => {
    for (let i = start; i <= end; i++) {
        calendar[i]++
    }
})

let answer = 0
let start = 0
let end = 0
let max = 0

calendar.forEach((day, index) => {
    if (day > 0) {
        if (start === 0) {
            start = index
        }
        max = Math.max(max, day)
    } else if (start !== 0) {
        end = index - 1
        answer += (end - start + 1) * max
        start = 0
        end = 0
        max = 0
    } 
})

console.log(answer)
