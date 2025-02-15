const fs = require('fs');
const [input, rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, m] = input.split(' ').map(Number);
const list = rest.split(' ').map(Number).sort((a,b) => a-b);

const answerList = [];

const dfs = (sequence) => {
    if (sequence.length === m && m > 1) {
        for (let i = 0; i < m; i++) {
            if (sequence[i] > sequence[i + 1]) {
                return;
            }
        }
        answerList.push(sequence.join(' '));
        return;
        
    } else if (sequence.length === m && m === 1) {
        answerList.push(sequence[0]);
        return;
    }
    
    list.forEach((number) => {
        dfs([...sequence, number]);
    });
}

dfs([]);
console.log(answerList.join('\n'));
