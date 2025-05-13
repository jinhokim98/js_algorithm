const fs = require('fs')
const input = fs.readFileSync(0, 'utf8').trim().split('\n')
const n = parseInt(input[0], 10)
const parents = input[1].split(' ').map(Number)
const deleteNode = parseInt(input[2], 10)

const tree = Array.from({length: n + 1}, () => [])

let rootIndex = 0
parents.forEach((parent, index) => {
    if (parent === -1) {
        rootIndex = index
    } else {
        tree[parent].push(index)
    }
})

const dfs = (node) => {
    if (node === deleteNode) return 0;
    const validChildren = tree[node].filter(child => child !== deleteNode);

    if (validChildren.length === 0) {
        return 1;
    }

    let count = 0;
    for (const child of tree[node]) {
        if (deleteNode !== child) count += dfs(child);
    }
    
    return count;
};


console.log(dfs(rootIndex, 0))
