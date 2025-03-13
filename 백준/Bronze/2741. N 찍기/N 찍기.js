const fs = require('fs');
const input = parseInt(fs.readFileSync(0, 'utf8').trim(), 10);

for (let i = 1; i <= input; i++) {
    console.log(i);
}
