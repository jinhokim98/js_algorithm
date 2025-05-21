const fs = require('fs');

const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const a = input[0].trim();

const b = input[1].trim();

function addBigNumbers(a, b) {

  let result = '';

  let carry = 0;

  // 자릿수를 맞추기 위해 짧은 쪽에 0을 추가

  const maxLength = Math.max(a.length, b.length);

  const aPadded = a.padStart(maxLength, '0');

  const bPadded = b.padStart(maxLength, '0');

  // 뒤에서부터 각 자릿수 더하기

  for (let i = maxLength - 1; i >= 0; i--) {

    const sum = parseInt(aPadded[i]) + parseInt(bPadded[i]) + carry;

    result = (sum % 10) + result;

    carry = Math.floor(sum / 10);

  }

  // 마지막 자리 올림수 처리

  if (carry > 0) {

    result = carry + result;

  }

  return result;

}

console.log(addBigNumbers(a, b));