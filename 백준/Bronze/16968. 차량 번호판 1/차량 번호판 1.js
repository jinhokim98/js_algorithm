const fs = require('fs');
const inputForm = fs.readFileSync(0, 'utf8').trim();

// 입력 형식 파악
// d d c d
// d d d c

let answer = 1;

if (inputForm[0] === 'd') {
  answer = 10;
} else {
  answer = 26;
}

for (let i = 1; i < inputForm.length; i++) {
  if (inputForm[i] === 'd') {
    if (inputForm[i - 1] === 'd') {
      answer *= 9;
    } else {
      answer *= 10;
    }
  }
  
  if (inputForm[i] === 'c') {
    if (inputForm[i - 1] === 'c') {
      answer *= 25;
    } else {
      answer *= 26;
    }
  }
}

console.log(answer);
