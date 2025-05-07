const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('');

const stack = [];

for (let i = 0; i < input.length; i++) {
    const ch = input[i];

    if (ch === '(' || ch === '[') {
        stack.push(ch);
    } else {
        let temp = 0;

        while (stack.length > 0) {
            const top = stack.pop();

            if (typeof top === 'number') {
                temp += top;
            } else {
                if ((ch === ')' && top === '(') || (ch === ']' && top === '[')) {
                    const multiplier = ch === ')' ? 2 : 3;
                    stack.push(temp === 0 ? multiplier : temp * multiplier);
                    break;
                } else {
                    console.log(0);
                    return;
                }
            }
        }

        if (stack.length === 0 && (ch === ')' || ch === ']')) {
            console.log(0);
            return;
        }
    }
}

let result = 0;
for (let val of stack) {
    if (typeof val !== 'number') {
        console.log(0);
        return;
    }
    result += val;
}

console.log(result);
