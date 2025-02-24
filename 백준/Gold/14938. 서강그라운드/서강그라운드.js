const fs = require('fs');
const [field, itemInput, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, m, r] = field.split(' ').map(Number);
const items = [0, ...itemInput.split(' ').map(Number)];

const graph = Array.from({length: n + 1}, () => Array.from({length: n + 1}).fill(Infinity));

for (let i = 1; i <= n; i++) {
    graph[i][i] = 0;
}

rest.forEach((row) => {
    const [start, end, dist] = row.split(' ').map(Number);
    graph[start][end] = dist;
    graph[end][start] = dist;
});


for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    for (let k = 1; k <= n; k++) {
      if (graph[j][k] > graph[j][i] + graph[i][k]) {
        graph[j][k] = graph[j][i] + graph[i][k]
      }
    }
  }
}

let answer = 0;

for (let i = 1; i <= n; i++) {
    let current = 0;

    for (let j = 1; j <= n; j++) {
        if (graph[i][j] <= m) { 
            current += items[j];
        }
    }

    answer = Math.max(answer, current);
}

console.log(answer);


