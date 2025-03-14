const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(' ').map(Number);
// king, queen, look, bishop, knight, pawn

const validPiece = [1, 1, 2, 2, 2, 8];
const result = [];

validPiece.forEach((valid, index) => {
    result.push(valid - input[index]);
});

console.log(result.join(' '));
