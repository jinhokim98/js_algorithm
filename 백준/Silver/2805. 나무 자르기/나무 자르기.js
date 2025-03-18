const fs = require('fs');
const [input, rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, m] = input.split(' ').map(Number);
const trees = rest.split(' ').map(Number);

const getWoodBlock = (height) => {
    return trees.reduce((acc, cur) => {
        if (cur - height < 0) {
            return acc;
        } else {
            return acc + cur - height;
        }
    }, 0);
}

let left = 1;
let right = Math.max(...trees);
let upperBoundPoint = 0;

while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    if (getWoodBlock(mid) >= m) {
        upperBoundPoint = mid;
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}

console.log(upperBoundPoint)
