const fs = require('fs');
const [N, input] = fs.readFileSync(0, 'utf8').trim().split('\n');

const n = parseInt(N, 10);
const numbers = input.split(' ').map(Number).sort((a, b) => a - b);

const visited = new Array(n).fill(false);
let answer = 0;

const calculate = (list) => {
    let sum = 0;
    for (let i = 0; i < n - 1; i++) {
        sum += Math.abs(list[i] - list[i + 1]);
    }
    return sum;
};

const permutation = (current) => {
    if (current.length === n) {
        answer = Math.max(answer, calculate(current));
        return;
    }

    for (let i = 0; i < n; i++) {
        if (visited[i]) continue;
        
        visited[i] = true;
        permutation([...current, numbers[i]]);
        visited[i] = false;
    }
};

permutation([]);
console.log(answer);
