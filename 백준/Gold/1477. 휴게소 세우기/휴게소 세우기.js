const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, m, l] = input[0].split(' ').map(Number);
const places = input[1] ? input[1].split(' ').map(Number) : [];

const location = [0, ...(places ?? []), l].sort((a, b) => a - b);

const diff = [];
for (let i = 0; i < location.length - 1; i++) {
  diff.push(location[i + 1] - location[i]);
}

let left = 1;
let right = l - 1;
let answer = 0;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  let cnt = 0;
  for (const d of diff) {
    cnt += Math.floor((d - 1) / mid);
  }

  if (cnt > m) {
    left = mid + 1;
  } else {
    answer = mid;
    right = mid - 1;
  }
}

console.log(answer);
