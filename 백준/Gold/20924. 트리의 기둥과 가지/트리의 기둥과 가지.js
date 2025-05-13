const fs = require('fs');
const [input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');
const [n, root] = input.split(' ').map(Number);

const tree = Array.from({ length: n + 1 }, () => []);
rest.forEach(line => {
    const [start, end, dist] = line.split(' ').map(Number);
    tree[start].push([end, dist]);
    tree[end].push([start, dist]);
});

let visited = Array(n + 1).fill(false);
let trunk = 0;
let branch = 0;

const findTrunk = (node) => {
    while (tree[node].length === 2) {
        for (const [next, dist] of tree[node]) {
            if (!visited[next]) {
                visited[next] = true;
                trunk += dist;
                node = next;
                break
            }
        }
    }
    return node;
};

const findBranch = (node, length) => {
    if (tree[node].length === 1) {
        branch = Math.max(branch, length);
    }

    for (const [next, dist] of tree[node]) {
        if (!visited[next]) {
            visited[next] = true;
            findBranch(next, length + dist);
            visited[next] = false;
        }
    }
};

visited[root] = true;

if (tree[root].length === 1) {
    const [next, dist] = tree[root][0];
    visited[next] = true;
    trunk += dist;
    const gigaNode = findTrunk(next);
    findBranch(gigaNode, 0);
} else {
    findBranch(root, 0);
}

console.log(`${trunk} ${branch}`);
