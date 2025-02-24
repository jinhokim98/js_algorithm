const fs = require('fs');
const [S, Q, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');
const splitS = S.split('');

const questions = rest.map((row) => row.split(' '));

const prefixSumByAlphabet = Array.from({length: 26}, () => Array.from({length: S.length + 1}).fill(0));

for (let i = 0; i < 26; i++) {
    const alphabet = String.fromCharCode(97 + i);
    for (let j = 1; j <= S.length; j++) {
        prefixSumByAlphabet[i][j] = prefixSumByAlphabet[i][j - 1] + (S[j - 1] === alphabet ? 1 : 0);
    }
}

let result = [];
questions.forEach(([alphabet, left, right]) => {
    const index = alphabet.charCodeAt(0) - 97;
    left = Number(left);
    right = Number(right);

    result.push(prefixSumByAlphabet[index][right + 1] - prefixSumByAlphabet[index][left]);
});

console.log(result.join('\n'));