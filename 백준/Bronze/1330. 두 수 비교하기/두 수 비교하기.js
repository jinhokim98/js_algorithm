const fs = require('fs');
const [a, b] = fs.readFileSync(0, 'utf8').trim().split(' ').map(Number);

if (a > b) {
    console.log('>');
} else if (a === b) {
    console.log('==');
} else {
    console.log('<')
}