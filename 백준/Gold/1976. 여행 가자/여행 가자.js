const fs = require('fs');
const [N, M, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const n = parseInt(N, 10);
const m = parseInt(M, 10);
const matrix = rest.slice(0, n).map((row) => row.split(' ').map(Number));
const tripRoot = rest[n].split(' ').map((x) => parseInt(x, 10) - 1);

const parent = Array.from({length: n}).map((_, index) => index);

const find = (x) => {
    if (x !== parent[x]) {
        parent[x] = find(parent[x]); 
    }
    return parent[x];
}

const union = (x, y) => {
    const findX = find(x);
    const findY = find(y);
    
    if (findX === findY) return;
    
    if (findX < findY) {
        parent[findY] = findX
    } else {
        parent[findX] = findY;
    }
}

const isUnion = (x, y) => {
    const findX = find(x);
    const findY = find(y);
    
    return findX === findY;
}

for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (matrix[i][j] === 1) {
            union(i, j);
        }
    }
}

const root = find(tripRoot[0]);
const isConnected = tripRoot.every((city) => find(city) === root);

console.log(isConnected ? 'YES' : 'NO');
