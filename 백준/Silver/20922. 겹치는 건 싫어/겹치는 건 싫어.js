const fs = require('fs');
const [input, rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, k] = input.split(' ').map(Number);
const sequence = rest.split(' ').map(Number);

let prequencyMap = new Map();

// 수열의 인덱스
let left = 0;
let right = 0;
let answer = 0;

prequencyMap.set(sequence[left], 1);

// 수열을 돌면서 체크
while (left <= right && right < n) {
    // 오른쪽으로 이동했을 때 정해진 수만큼 숫자가 있지 않을 때
    if (prequencyMap.get(sequence[right]) <= k) {
        right++;
        const numberPrequency = prequencyMap.get(sequence[right]);
        if (numberPrequency === undefined) {
            // 빈도가 없다면 새로 추가
            prequencyMap.set(sequence[right], 1);
        } else {
            // 있다면 1을 더해서 set
            prequencyMap.set(sequence[right], numberPrequency + 1);
        }
        // 수열의 길이 최댓값 저장
        answer = Math.max(answer, right - left);
    } else {
        // 오른쪽으로 갔을 때 정해진 수만큼 숫자 존재한다면 왼쪽 포인터 오른쪽으로 이동
        while (prequencyMap.get(sequence[right]) > k) {
        // 오른쪽 숫자 빈도가 k 이하가 될 때까지
            const numberPrequency = prequencyMap.get(sequence[left]); // 왼쪽의 수를 가져와서
            if (numberPrequency === 1) {
                // 빈도가 1이라면 아예 삭제
                prequencyMap.delete(sequence[left]);
            } else {
                // 있다면 1을 빼서 set
                prequencyMap.set(sequence[left], numberPrequency - 1);
            }
            left++;
        }        
    }
}

console.log(answer);
