const fs = require('fs')
const [T, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n')
const t = parseInt(T, 10)
let inputIndex = 0

for (let test = 0; test < t; test++) {
    const string = rest[inputIndex]
    const k = parseInt(rest[inputIndex + 1], 10)

    let words = Array.from({length: 26}, () => [])
    for (let i = 0; i < string.length; i++) {
        words[string[i].charCodeAt() - 97].push(i) // 각 문자가 나온 인덱스를 push
    }
    
    let min = Infinity
    let max = -Infinity
    
    for (let i = 0; i < 26; i++) {
        if (words[i].length >= k) {
            for (let j = 0; j <= words[i].length - k; j++) {
                min = Math.min(min, words[i][j + k - 1] - words[i][j] + 1)
                max = Math.max(max, words[i][j + k - 1] - words[i][j] + 1)
            }
        }
    }
    
    if (min === Infinity || max === -Infinity) {
        console.log(-1)
    } else {
        console.log(`${min} ${max}`)
    }
    
    inputIndex += 2
}