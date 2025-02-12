const fs = require('fs');
const [n, m] = fs.readFileSync(0, 'utf8').trim().split(' ').map(Number);

const answerList = [];

const dfs = (sequence, start) => {
    if (sequence.length === m) {
        answerList.push(sequence.join(' '));
        return;
    }
    
    for (let i = start; i <= n; i++) {
        sequence.push(i);
        dfs(sequence, i); 
        sequence.pop();
    }
}

dfs([], 1);
console.log(answerList.join('\n'));
