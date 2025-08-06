const fs = require('fs')
const [input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n')
const [n, m] = input.split(' ').map(Number)

const ladders = rest.slice(0, n).map((line) => line.split(' ').map(Number))
const snakes = rest.slice(n, n + m).map((line) => line.split(' ').map(Number))

const laddersMap = new Map()
const snakesMap = new Map()

for (const [start, end] of ladders) {
    laddersMap.set(start, end)
}

for (const [start, end] of snakes) {
    snakesMap.set(start, end)
}

const distance = Array.from({length: 101}).fill(Infinity)
const dice = [1, 2, 3, 4, 5, 6]

const bfs = () => {
    const queue = [[1, 0]] // 현재 지점, 이동거리
    distance[1] = 0

    while (queue.length) {
        const [cur, dist] = queue.shift()
        
        if (cur === 100) {
            console.log(dist)
            break;
        }
        
        for (const number of dice) {
            let next = cur + number
            
            if (laddersMap.has(next)) {
                const end = laddersMap.get(next)
                next = end
            }
            
            if (snakesMap.has(next)) {
                const end = snakesMap.get(next)
                next = end
            }
                        
            if (next <= 100 && distance[next] > dist + 1) {
                distance[next] = dist + 1
                queue.push([next, dist + 1])
            }
        }
    }
}

bfs()
