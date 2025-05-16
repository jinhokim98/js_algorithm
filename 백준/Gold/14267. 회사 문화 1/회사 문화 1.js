const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const superiors = input[1].split(' ').map(Number);

const graph = Array.from({ length: n + 1 }, () => []);
for (let i = 0; i < n; i++) {
    const sup = superiors[i];
    if (sup !== -1) {
        graph[sup].push(i + 1);
    }
}

const scores = Array(n + 1).fill(0);
for (let i = 2; i < 2 + m; i++) {
    const [who, s] = input[i].split(' ').map(Number);
    scores[who] += s;
}

const dfs = (node) => {
    for (const child of graph[node]) {
        scores[child] += scores[node];
        dfs(child);
    }
};

dfs(1);
console.log(scores.slice(1).join(' '));
