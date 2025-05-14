const fs = require('fs');
const [w, h] = fs.readFileSync(0, 'utf8').trim().split(' ').map(Number);
console.log((w * h / 2).toFixed(1));
