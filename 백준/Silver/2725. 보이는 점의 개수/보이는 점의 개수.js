const fs = require('fs')
const [first, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n')
const n = parseInt(first, 10)

const dp = Array.from({length: 1001}).fill(0)
dp[0] = 0
dp[1] = 3

const gcd = (a, b) => {
    if (b > 0) return gcd(b, a % b)
    else return a
}

for (let i = 2; i <= 1000; i++) {
    let disjointCount = 0
    for (let j = 1; j < i; j++) {
        if (gcd(i, j) === 1) {
            disjointCount++
        }
    }
    dp[i] = dp[i - 1] + disjointCount * 2
}

const answer = []
rest.forEach((line) => {
    answer.push(dp[parseInt(line, 10)])
})

console.log(answer.join('\n'))