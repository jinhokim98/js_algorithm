const fs = require('fs');
const [input, rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, s] = input.split(' ').map(Number);
const sequence = rest.split(' ').map(Number);

let answer = 0;

const dfs = (sum, index) => {
    if (index === n) return;
    
    sum += sequence[index];
    if (sum === s) answer++;
    
    dfs(sum, index + 1);
    dfs(sum - sequence[index], index + 1);
}

dfs(0, 0);
console.log(answer);
