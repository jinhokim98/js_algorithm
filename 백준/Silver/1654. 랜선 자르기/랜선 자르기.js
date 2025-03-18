const fs = require('fs');
const [input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const [k, n] = input.split(' ').map(Number);
const lans = rest.map(Number);

let left = 1;
let right = Math.max(...lans);

const getSliceCount = (unit) => {
    return lans.reduce((acc, cur) => acc + Math.floor(cur / unit), 0);
}

let upperBoundPoint = 0;

while (left <= right) { 
    let mid = Math.floor((left + right) / 2);
    
    if (getSliceCount(mid) >= n) {
        upperBoundPoint = mid;
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}

console.log(upperBoundPoint);
