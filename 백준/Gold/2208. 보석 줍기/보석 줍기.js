const fs = require('fs');
const [input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, m] = input.split(' ').map(Number);
const jewels = [0, ...rest.map(Number)];

const prefixSum = Array.from({length: n + 1}).fill(0);

for (let i = 1; i <= n; i++) {
    prefixSum[i] = prefixSum[i - 1] + jewels[i];
}

// 시간은 O(N)으로 끝내야한다. O(N^2) 불가능
// d[i] => i위치까지 보석을 주웠을 때 최댓값
// d[i] = max(d[i - 1], d[i - 1] + i);
// 여기서 조건 (길이는 무조건 m 이상이어야 함) -> i위치에서 i-3까지는 무조건 가야함

const dp = Array.from({length: n + 1}).fill(0);

dp[m] = prefixSum[m] - prefixSum[0];

for (let i = m + 1; i <= n; i++) {
  dp[i] = Math.max(dp[i - 1] + jewels[i], prefixSum[i] - prefixSum[i - m]);
}

console.log(Math.max(...dp));
