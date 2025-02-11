const fs = require('fs');
const [n, m] = fs.readFileSync(0, 'utf8').trim().split(' ').map(Number);

const numbers = Array.from({length: n}).map((_, index) => index + 1);
const visited = Array.from({length: n + 1}).fill(false);

const dfs = (sequence) => {
  if (sequence.length === m) {
    console.log(sequence.join(' '));
    return;
  }
  
  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      visited[i] = true;
      dfs([...sequence, i]);
      visited[i] = false;
    }
  }
}

dfs([])