const fs = require('fs')
const [input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n')
const [n, m] = input.split(' ').map(Number)
const matrix = rest.map((line) => line.split(''))
const visited = Array.from({length: n}, () => Array.from({length: m}).fill(false))
const finished = Array.from({length: n}, () => Array.from({length: m}).fill(false))

let cycleCount = 0

const getDirection = (direction, x, y) => {
    if (direction === 'U') {
        return [x - 1, y]
    }
    if (direction === 'D') {
        return [x + 1, y]
    }
    if (direction === 'L') {
        return [x, y - 1]
    }
    if (direction === 'R') {
        return [x, y + 1]
    }
}

const dfs = (x, y) => {
    if (x < 0 || x >= n || y < 0 || y >= m) return
    visited[x][y] = true
    
    const direction = matrix[x][y]
    const [nextX, nextY] = getDirection(direction, x, y)
    if (nextX < 0 || nextX >= n || nextY < 0 || nextY >= m) return

    if (!visited[nextX][nextY]) {
        dfs(nextX, nextY)
    } else if (!finished[nextX][nextY]) {
        cycleCount++
    }
    
    finished[x][y] = true
}

for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        if (!visited[i][j]) {
            dfs(i, j)
        }
    }
}

console.log(cycleCount)
