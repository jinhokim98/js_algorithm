const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

let idx = 0;
let caseNum = 1;
const results = [];

while (true) {
    const [n, m] = input[idx++].split(' ').map(Number);
    if (n === 0 && m === 0) break;

    const graph = Array.from({ length: n + 1 }, () => []);
    for (let i = 0; i < m; i++) {
        const [a, b] = input[idx++].split(' ').map(Number);
        graph[a].push(b);
        graph[b].push(a);
    }

    const visited = Array(n + 1).fill(false);
    let treeCount = 0;

    const dfs = (node, parent) => {
        visited[node] = true;
        for (const neighbor of graph[node]) {
            if (!visited[neighbor]) {
                if (!dfs(neighbor, node)) return false;
            } else if (neighbor !== parent) {
                return false;
            }
        }
        return true;
    };

    for (let i = 1; i <= n; i++) {
        if (!visited[i]) {
            if (dfs(i, 0)) treeCount++;
        }
    }

    if (treeCount === 0) {
        results.push(`Case ${caseNum}: No trees.`);
    } else if (treeCount === 1) {
        results.push(`Case ${caseNum}: There is one tree.`);
    } else {
        results.push(`Case ${caseNum}: A forest of ${treeCount} trees.`);
    }

    caseNum++;
}

console.log(results.join('\n'));
