const fs = require('fs')
const [input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n')
const [n, w] = input.split(' ').map(Number)
const nodes = rest.map((line) => line.split(' ').map(Number))

const tree = Array.from({length: n + 1}, () => [])

nodes.forEach(([start, end]) => {
    tree[start].push(end)
    tree[end].push(start)
})

let leafs = 0

// 루트는 리프가 될 수 없으므로 제외
for (let i = 2; i <= n; i++) {
    if (tree[i].length === 1) leafs++
}

console.log(w / leafs)