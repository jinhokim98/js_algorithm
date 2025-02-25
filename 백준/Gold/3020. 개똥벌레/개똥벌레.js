const fs = require('fs');
const [input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, h] = input.split(' ').map(Number);

const down = Array.from({length: h + 1}, () => 0);
const up = Array.from({length: h + 1}, () => 0);

rest.forEach((element, index) => {
    const height = parseInt(element, 10);
    // 석순
    if (index % 2 === 0) {
        down[height]++;
    } // 종유석 
    else {
        up[h- height + 1]++;
    }
});

for (let i = h - 1; i > 0; i--) {
  down[i] += down[i + 1];
}

for (let i = 1; i <= h; i++) {
  up[i] += up[i - 1];
}

let min = n;
let count = 0;

for (let i = 1; i <= h; i++) {
    const upAndDownBreak = down[i] + up[i];
    if (upAndDownBreak < min) {
        min = upAndDownBreak;
        count = 1;
    } else if (min === upAndDownBreak) {
        count++;
    }
}

console.log(`${min} ${count}`);
