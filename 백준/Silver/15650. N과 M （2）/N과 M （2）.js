const fs = require('fs');
const [n, m] = fs.readFileSync(0, 'utf8').trim().split(' ').map(Number);

const array = Array.from({length: n}).map((_, index) => index + 1);
const visited = Array.from({length: m + 1}).fill(false);

const dfs = (sequence) => {
  if (sequence.length === m) {
    const sortedSequence = [...sequence].sort((a,b) => a-b);
    for (let i = 0; i < sequence.length; i++) {
      if (sequence[i] !== sortedSequence[i] ) {
        return;
      }
    }
    console.log(sequence.join(' '));
  }
  
  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      visited[i] = true;
      dfs([...sequence, i]);
      visited[i] = false
    }
  }
}

dfs([]);
