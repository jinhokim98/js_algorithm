const fs = require('fs');
const [input, rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const k = parseInt(input, 10);
const inEqualitySignList = rest.split(' ');

const answerList = [];

const visited = Array.from({length: 10}).fill(false);

const canAnswerPermutation = (permutation) => {
    const canAnswerList = new Set([true]);
    
    for (let i = 0; i < k; i++) {
        let left = i;
        let right = i + 1;
        
        const equalitySign = inEqualitySignList[i];
        
        if (equalitySign === '>') {
            canAnswerList.add(permutation[left] > permutation[right]);
        } else {
            canAnswerList.add(permutation[left] < permutation[right]);
        }
    }
    
    return canAnswerList.size !== 2;
}
      
const permutation = (current) => {
    if (current.length === k + 1) {
        if (canAnswerPermutation(current)) {
            answerList.push(parseInt(current.join(''), 0));
        }
        return;
    }
    
    for (let i = 0; i < 10; i++) {
        if (!visited[i]) {
            visited[i] = true
            permutation([...current, i]);
            visited[i] = false;
        }
    }
}

permutation([]);

const max = Math.max(...answerList);
const min = Math.min(...answerList);

console.log(max);
console.log(min.toString().padStart(k+1, '0'));