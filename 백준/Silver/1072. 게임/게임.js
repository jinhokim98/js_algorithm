const fs = require('fs');
const [total, win] = fs.readFileSync(0, 'utf8').trim().split(' ').map(Number);

const winPercent = Math.floor((win * 100) / total);
let left = 1;
let right = 1000000000;
let answer = -1;

while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let newWinPercent = Math.floor((100 * (win + mid)) / (total + mid));

    if (newWinPercent > winPercent) {
        answer = mid;
        right = mid - 1;
    } else {
        left = mid + 1;
    }
}

console.log(answer);
