const fs = require('fs');
const [S, Q, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');
const splitS = S.split('');

const questions = rest.map((row) => row.split(' '));

const prefixSumByAlphabet = Array.from({length: 26}, () => Array.from({length: S.length + 1}).fill(0));

// const findAlphabetCount = (alphabet, endPoint) => {
//   const sliceS = splitS.slice(0, endPoint);
//   console.log(sliceS)
//   const map = new Map();
//   map.set()
  
//   const count = sliceS.filter((alpha) => alpha === alphabet).length;
//   return count
// }


for (let i = 97; i <= 122; i++) {
    const alphabet = String.fromCharCode(i);
    for (let j = 1; j <= S.length; j++) {
        const count = S[j - 1] === alphabet ? 1 : 0;
        prefixSumByAlphabet[i - 97][j] = prefixSumByAlphabet[i - 97][j - 1] + count;
        
    }
}


questions.forEach((question) => {
    const [alphabet, ...range] = question;
    const [left, right] = range.map(Number);
    const alphabetASCIIIndex = alphabet.charCodeAt() - 97;

    if (right - left === 0) {
      console.log(S[right] === alphabet ? 1 : 0);
    } else {
      console.log(prefixSumByAlphabet[alphabetASCIIIndex][right + 1] - prefixSumByAlphabet[alphabetASCIIIndex][left]);
    }
    
});
