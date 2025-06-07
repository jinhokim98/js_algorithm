const fs = require('fs');
let binary = fs.readFileSync(0, 'utf8').trim();

while (binary.length % 3 !== 0) {
  binary = '0' + binary;
}

let result = '';
for (let i = 0; i < binary.length; i += 3) {
  const chunk = binary.slice(i, i + 3);
  result += parseInt(chunk, 2).toString();
}

console.log(result);
