const fs = require('fs')
const [N, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n')
const n = parseInt(N, 10)

const numbers = [0, ...rest.map(Number)]
let visited = Array.from({length: n + 1}).fill(false)
let finished = Array.from({length: n + 1}).fill(false)

const cycledNode = []

const dfs = (node) => {
    visited[node] = true
    const next = numbers[node]

    if (!visited[next]) {
        dfs(next)
    } else if (!finished[next]) { // cycle
        let current = next
        cycledNode.push(current)
        while (current !== node) {
            current = numbers[current]
            cycledNode.push(current)
        }
    }
    
    finished[node] = true
}


for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
        dfs(i)
    }
}

console.log(cycledNode.length)
cycledNode.sort((a, b) => a - b)
console.log(cycledNode.join('\n'))
