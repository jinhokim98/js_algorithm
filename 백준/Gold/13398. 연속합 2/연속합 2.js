const fs = require('fs')
const [N, input] = fs.readFileSync(0, 'utf8').trim().split('\n')

const n = parseInt(N, 10)
const sequence = input.split(' ').map(Number)

const dp1 = Array.from({length: n}).fill(0)
const dp2 = Array.from({length: n}).fill(0)

dp1[0] = sequence[0]
dp2[n - 1] = sequence[n - 1];

for (let i = 1; i < n; i++) {
    dp1[i] = Math.max(sequence[i], dp1[i - 1] + sequence[i])    
}

for (let i = n - 2; i >= 0; i--) {
    dp2[i] = Math.max(sequence[i], dp2[i + 1] + sequence[i]);
}

let answer = Math.max(...dp1)

for (let i = 1; i < n - 1; i++) {
  const removed = dp1[i - 1] + dp2[i + 1];
  answer = Math.max(answer, removed);
}

console.log(answer)
