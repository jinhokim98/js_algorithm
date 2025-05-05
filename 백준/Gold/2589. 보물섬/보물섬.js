const fs = require('fs')
const [input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n')
const [n, m] = input.split(' ').map(Number)
const matrix = rest.map(line => line.split(''))
const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]

const bfs = (startX, startY) => {
    const visited = Array.from({length: n}, () => Array.from({length: m}).fill(false))
    const queue = []
    queue.push([startX, startY, 0])
    visited[startX][startY] = true
    
    let max = 0;
    while (queue.length) {
        const [x, y, dist] = queue.shift()
        
        for ([dx, dy] of directions) {
            const nx = x + dx
            const ny = y + dy
            
            if (nx >= 0 && nx < n && ny >= 0 && ny < m && !visited[nx][ny] && matrix[nx][ny] === 'L') {
                visited[nx][ny] = true
                queue.push([nx, ny, dist + 1])
                max = Math.max(dist + 1, max)
            }
        }
    }
    return max
}

let max = 0
for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        if (matrix[i][j] === 'L') {
            const result = bfs(i, j)
            max = Math.max(max, result)
        }
    }
}

console.log(max)