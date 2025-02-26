const fs = require('fs');
const [N, M, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const n = parseInt(N, 10);
const m = parseInt(M, 10);

const distance = Array.from({length: n + 1}, () => Array.from({length: n + 1}).fill(Infinity));

for (let i = 1; i <= n; i++) {
    distance[i][i] = 0;
}

rest.forEach((bus) => {
    const [start, end, dist] = bus.split(' ').map(Number);
    distance[start][end] = Math.min(distance[start][end], dist);
});

for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
            if (distance[i][j] > distance[i][k] + distance[k][j]) {
                distance[i][j] = distance[i][k] + distance[k][j];         
            }
        }
    }
}

for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
        if (i !== j && distance[i][j] === Infinity) {
            distance[i][j] = 0;
        }
    }
}

distance.forEach((row, index) => {
    if (index > 0) console.log(row.slice(1).join(' '));    
});
