const fs = require('fs');
const [n, ...input] = fs.readFileSync(0, 'utf8').trim().split('\n');

input.forEach((line) => {
    let answer = line[0] + line[line.length - 1]
    console.log(answer);
});
