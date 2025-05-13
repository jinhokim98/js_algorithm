const fs = require('fs')
const [input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n')
const [n, m] = input.split(' ').map(Number)

const graph = Array.from({length: n + 1}, () => [])
const edges = rest.slice(0, -1).map((line) => line.split(' ').map(Number)).sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0]
    else return a[1] - b[1]
})

for (let i = 0; i < m; i++) {
    const [start, end] = edges[i]
    graph[start].push(end)
    graph[end].push(start)
}

const [s, e] = rest[m].split(' ').map(Number)
let visited = Array.from({length: n + 1}).fill(null)

const targetBfs = (start, target) => {
    visited[start] = -1
    const queue = [[start, 0]]
    
    while (queue.length) {
        const [cur, dist] = queue.shift()
        if (cur === target) {
            return dist
        }
        
        for (const neighbor of graph[cur]) {
            if (!visited[neighbor]) {
                visited[neighbor] = cur
                queue.push([neighbor, dist + 1])
            }
        }
    }
}

const getRoute = () => {
  const route = []
  let current = e // 마지막 노드에서 출발
  
  while (current !== s) {
    const parent = visited[current]
    route.push(parent)
    current = parent
  }
  
  return route
}

const backStartBfs = (target, start) => {
    const queue = [[target, 0]]
    visited[start] = false
    
    while (queue.length) {
        const [cur, dist] = queue.shift()
        if (cur === start) {
            return dist
        }
        
        for (const neighbor of graph[cur]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true
                queue.push([neighbor, dist + 1])
            }
        }
    }
}

const firstDist = targetBfs(s, e)
const route = getRoute()

// 초기화 한 후
visited = Array.from({length: n + 1}).fill(null)
route.forEach((element) => {
  visited[element] = true
})

visited[s] = false
visited[e] = false

const secondDist = backStartBfs(e, s)
console.log(firstDist + secondDist)

