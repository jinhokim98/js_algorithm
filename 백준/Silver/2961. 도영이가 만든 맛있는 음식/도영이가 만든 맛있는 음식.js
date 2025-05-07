const fs = require('fs')
const [N, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n')
const n = parseInt(N, 10)
const ingredients = rest.map((line) => line.split(' ').map(Number))

let minDiff = Infinity

for (let mask = 1; mask < (1 << n); mask++) {
    let totalSour = 1
    let totalBitter = 0
    
    // 부분집합을 만들어내는 역할
    for (let i = 0; i < n; i++) {
        if (mask & (1 << i)) {
            const [sour, bitter] = ingredients[i]
            totalSour *= sour
            totalBitter += bitter
        }
    }
    
    const diff = Math.abs(totalSour - totalBitter);
    minDiff = Math.min(minDiff, diff);
}

console.log(minDiff);