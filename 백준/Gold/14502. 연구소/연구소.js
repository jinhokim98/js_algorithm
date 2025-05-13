const fs = require('fs')
const [input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n')
const [n, m] = input.split(' ').map(Number)

const originalMatrix = rest.map((line) => line.split(' ').map(Number))

const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]]

const bfs = (tempMatrix, startX, startY, visited) => {
    const queue = [[startX, startY]]
    visited[startX][startY] = true
    
    while (queue.length) {
        const [x, y] = queue.shift()
        
        for (const [dx, dy] of directions) {
            const nx = x + dx
            const ny = y + dy
            
            if (
                nx >= 0 && nx < n && ny >= 0 && ny < m &&
                !visited[nx][ny] && tempMatrix[nx][ny] === 0
            ) {
                visited[nx][ny] = true
                tempMatrix[nx][ny] = 2
                queue.push([nx, ny])
            }
        }
    }
}

const spreadVirusAndGetSafeArea = (matrixWithWalls) => {
    const tempMatrix = matrixWithWalls.map(row => [...row])
    const visited = Array.from({length: n}, () => Array(m).fill(false))
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (tempMatrix[i][j] === 2 && !visited[i][j]) {
                bfs(tempMatrix, i, j, visited)
            }
        }
    }
    
    let remain = 0
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (tempMatrix[i][j] === 0) {
                remain++
            }
        }
    }
    return remain
}

let max = 0

const makeWall = (count) => {
    if (count === 3) {
        const safeArea = spreadVirusAndGetSafeArea(originalMatrix)
        max = Math.max(max, safeArea)
        return
    }
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (originalMatrix[i][j] === 0) {
                originalMatrix[i][j] = 1
                makeWall(count + 1)
                originalMatrix[i][j] = 0
            }
        }
    }
}

makeWall(0)
console.log(max)
