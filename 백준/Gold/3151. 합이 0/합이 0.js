const fs = require('fs');
const [N, input] = fs.readFileSync(0, 'utf8').trim().split('\n');
const n = parseInt(N, 10);

const sequence = input.split(' ').map(Number);
sequence.sort((a, b) => a - b);

const lowerBound = (arr, target, start) => {
    let left = start, right = arr.length;
    while (left < right) {
        let mid = Math.floor((left + right) / 2); 
        if (arr[mid] >= target) right = mid;
        else left = mid + 1;
    }
    return left;
};

const upperBound = (arr, target, start) => {
    let left = start, right = arr.length;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] > target) right = mid;
        else left = mid + 1;
    }
    return left;
};

let answer = 0;

for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
        let cnt = sequence[i] + sequence[j];
        let idx1 = lowerBound(sequence, -cnt, j + 1);
        let idx2 = upperBound(sequence, -cnt, j + 1);
        answer += idx2 - idx1;
    }
}

console.log(answer);
