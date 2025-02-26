const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
let inputIndex = 0;

const combination = (current, index, list, result) => {
    if (current.length === 6) {
        result.push(current.join(' '));
        return;
    }
    
    for (let i = index; i < list.length; i++) {
        current.push(list[i]);
        combination(current, i + 1, list, result);
        current.pop();
    }
}

while (true) {
    if (parseInt(input[inputIndex]) === 0) {
      break;
    } else if (inputIndex !== 0) {
      console.log('')
    }
  
    const [k, ...s] = input[inputIndex].split(' ').map(Number);
    const answer = [];
    combination([], 0, s, answer);
    
    console.log(answer.join('\n'));
    inputIndex++;
}