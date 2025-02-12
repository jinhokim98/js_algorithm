const fs = require('fs');
const [NM, nList] = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, m] = NM.split(' ').map(Number);
const sortedNList = nList.split(' ').map(Number).sort((a,b) => a-b);
const visitedMap = new Map();

sortedNList.forEach((number) => {
  visitedMap.set(number, false);
})

const answerList = []

const dfs = (sequence) => {
    if (sequence.length === m) {
        answerList.push(sequence.join(' '));
        return;
    }
    
    sortedNList.forEach((number) => {
      if (!visitedMap.get(number)) {
        visitedMap.set(number, true)
        dfs([...sequence, number]);
        visitedMap.set(number, false)
      }
    })
}

dfs([]);
console.log(answerList.join('\n'));
