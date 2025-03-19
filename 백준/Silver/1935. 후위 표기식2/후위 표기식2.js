const fs = require('fs');
const [n, expression, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const numbers = rest.map(Number);
let stack = [];

const getNumberByAlphabet = (alphabet) => {
    return numbers[alphabet.charCodeAt() - 65]
}

for (let i = 0; i < expression.length; i++) {
    const code = expression[i].charCodeAt();

    // A~Z
    if (code >= 65 && code <= 90) {
        stack.push(getNumberByAlphabet(expression[i]));
    } else if (expression[i] === '+') {
        const a = stack.pop();
        const b = stack.pop();
        stack.push(b + a);
    } else if (expression[i] === '-') {
        const a = stack.pop();
        const b = stack.pop();
        stack.push(b - a);
    } else if (expression[i] === '*') {
        const a = stack.pop();
        const b = stack.pop();
        stack.push(b * a);
    } else if (expression[i] === '/') {
        const a = stack.pop();
        const b = stack.pop();
        stack.push(b / a);
    }
}

console.log((Math.round(stack[0] * 100) / 100).toFixed(2));
