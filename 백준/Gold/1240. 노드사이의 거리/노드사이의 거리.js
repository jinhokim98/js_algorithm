const fs = require('fs')
const [first, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n')
const [n, m] = first.split(' ').map(Number)

const graph = Array.from({length: n + 1}, () => [])
for (let i = 0; i < n - 1; i++) {
    const [start, end, dist] = rest[i].split(' ').map(Number)
    graph[start].push([end, dist])
    graph[end].push([start, dist])
}

let answer = []
const dfs = (node, end, visited, distance) => {
    visited[node] = true
    
    if (node === end) {
      answer.push(distance)
      return
    }
    
    for (const [neighbor, dist] of graph[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor, end, visited, dist + distance)
        }
    }
}

for (let i = 0; i < m; i++) {
    const [start, end] = rest[n + i - 1].split(' ').map(Number)
    const visited = Array.from({length: n + 1}).fill(false)
    dfs(start, end, visited, 0)
}

console.log(answer.join('\n'))

