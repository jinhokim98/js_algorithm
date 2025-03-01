const fs = require('fs');
const [w, input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const wantSize = parseInt(w, 10);
const [m, n] = input.split(' ').map(Number); // m은 A피자 조각 수, n은 B피자 조각 수

const aSlice = rest.slice(0, m).map(Number);
const bSlice = rest.slice(m, m + n).map(Number);

const getSubSums = (list) => {
    const len = list.length
    const subSum = [];
    
    for (let i = 0; i < len; i++) {
        let sum = 0;
        for (let j = 0; j < len - 1; j++) {
            sum += list[(i + j) % len];
            subSum.push(sum);
        }
    }
    
    subSum.push(list.reduce((acc, cur) => acc + cur, 0));
    return subSum;
}

const aSubSum = getSubSums(aSlice);
const bSubSum = getSubSums(bSlice);


aSubSum.sort((a, b) => a - b);
bSubSum.sort((a, b) => a - b);


const getCount = (list, target) => {
  const lowerBound = (list, target) => {
    let left = 0;
    let right = list.length;
    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (list[mid] < target) left = mid + 1;
      else right = mid;
    }
    
    return left;
  }
  
  const upperBound = (list, target) => {
    let left = 0;
    let right = list.length;
    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (list[mid] <= target) left = mid + 1;
      else right = mid;
    }
    
    return left;
  }
  
  return upperBound(list, target) - lowerBound(list, target);
}

let result = 0;

result += getCount(aSubSum, wantSize);
result += getCount(bSubSum, wantSize);

for (let a of aSubSum) {
    result += getCount(bSubSum, wantSize - a);
}

console.log(result);
