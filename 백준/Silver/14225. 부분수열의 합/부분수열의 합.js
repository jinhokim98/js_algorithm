const fs = require('fs');
const [input, rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const n = parseInt(input, 10);
const sequence = rest.split(' ').map(Number);
const maxSum = sequence.reduce((acc, cur) => acc + cur, 0);

const prequencyList = Array.from({length: maxSum + 2}, () => 0);

const dfs = (index, sum) => {
    if (index === n) return;
    
    sum += sequence[index];
    prequencyList[sum]++;
    
    dfs(index + 1, sum);
    dfs(index + 1, sum - sequence[index]);
}

dfs(0, 0);
const answer = prequencyList.slice(1).findIndex((prequency) => prequency === 0);
console.log(answer + 1);
