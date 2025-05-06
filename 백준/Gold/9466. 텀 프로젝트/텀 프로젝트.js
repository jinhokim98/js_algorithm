const fs = require('fs')
const [t, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n')
const testcase = parseInt(t, 10)
let index = 0
let nodeOrder = 0
let grouped = 0

const dfs = (node, graph, discovered, finished) => {
    discovered[node] = nodeOrder++
    const cur = graph[node]
    
    if (discovered[cur] === -1) {
        dfs(cur, graph, discovered, finished)
    } else if (!finished[cur]) {
        grouped += discovered[node] - discovered[cur] + 1
    }
    
    finished[node] = true
}

for (let i = 0; i < testcase; i++) {
    nodeOrder = 0
    grouped = 0
    const n = parseInt(rest[index], 10)
    const chooseResult = [0, ...rest[index + 1].split(' ').map(Number)]
    const discovered = Array.from({length: n + 1}).fill(-1)
    const finished = Array.from({length: n + 1}).fill(false)

    for (let i = 1; i <= n; i++) {
        if (!finished[i]) dfs(i, chooseResult, discovered, finished)
    }
    
    console.log(n - grouped)
    index += 2
}