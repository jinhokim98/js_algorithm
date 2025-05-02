const fs = require('fs')
const [a, b] = fs.readFileSync(0, 'utf8').trim().split(' ')

const gcd = (a, b) => {
    if (b > 0) {
        return gcd(b, a % b)
    } else {
        return a
    }
}

const lcm = (a, b) => {
    return a * b / gcd(a, b)
}

console.log(gcd(a, b))
console.log(lcm(a, b))