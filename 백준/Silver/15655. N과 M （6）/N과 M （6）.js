const fs = require('fs');
const [input, rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, m] = input.split(' ').map(Number);
const list = rest.split(' ').map(Number).sort((a,b) => a-b);

const visited = new Map();
list.forEach((number) => {
    visited.set(number, false);
});

const answerList = []

const dfs = (sequence) => {
    if (sequence.length === m) {
        const sortedSequence = [...sequence].sort((a,b) => a-b);
        for (let i = 0; i < sequence.length; i++) {
            if (sequence[i] !== sortedSequence[i]) {
                return;
            }
        }
        answerList.push(sequence.join(' '));
        return;
    }
    
    list.forEach((number) => {
        if (!visited.get(number)) {
            visited.set(number, true);
            dfs([...sequence, number]);
            visited.set(number, false);
        }
    })
};

dfs([]);
console.log(answerList.join('\n'));