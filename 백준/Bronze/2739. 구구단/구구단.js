const fs = require('fs');
const input = parseInt(fs.readFileSync(0, 'utf8').trim(), 10);

[1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((number) => {
    console.log(`${input} * ${number} = ${input * number}`);
});
