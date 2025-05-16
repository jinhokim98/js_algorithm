const fs = require('fs')
const [first, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n')
const [n, m] = first.split(' ').map(Number)

const parent = Array.from({length: n + 1}, (_, i) => i)

const find = (x) => {
    if (parent[x] !== x) {
        parent[x] = find(parent[x])
    }
    return parent[x]
}

const union = (a, b) => {
    const rootA = find(a)
    const rootB = find(b)
    
    if (rootA === rootB) return
    
    if (rootA > rootB) {
        parent[rootA] = rootB
    } else {
        parent[rootB] = rootA
    }
    
}

const answer = []

rest.forEach((line) => {
    const [calc, a, b] = line.split(' ').map(Number)
    if (calc === 0) {
        union(a, b)
    } else {
        const rootA = find(a)
        const rootB = find(b)
        answer.push(rootA === rootB ? 'YES' : 'NO')
    }
})

console.log(answer.join('\n'))
