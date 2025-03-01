const fs = require('fs');
const [input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const n = parseInt(input, 10);
rest.forEach((line, index) => {
    const [a, b] = line.split(' ').map(Number);
    console.log(`Case #${index + 1}: ${a + b}`);
});
