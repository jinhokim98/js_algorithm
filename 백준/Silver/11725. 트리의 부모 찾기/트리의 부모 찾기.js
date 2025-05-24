const fs = require('fs')
const [first, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n')
const n = parseInt(first, 10)

const tree = Array.from({length: n + 1}, () => [])
rest.forEach((line) => {
    const [start, end] = line.split(' ').map(Number)
    tree[start].push(end)
    tree[end].push(start)
})

const visited = Array.from({length: n + 1}).fill(0)

const dfs = (node, parent) => {    
    for (const child of tree[node]) {
        if (visited[child] === 0) {
            visited[child] = node
            dfs(child, node)
        }
    }
}

dfs(1, -1)

for (let i = 2; i <= n; i++) {
  console.log(visited[i])
}