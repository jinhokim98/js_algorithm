const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const t = parseInt(input[0]);
const testcase = input.slice(1).map(Number);
const maxValue = Math.max(...testcase);

const dp = Array.from({ length: maxValue + 1 }, () => Array(4).fill(0));

dp[1][1] = 1; 
dp[2][1] = 1;
dp[2][2] = 1;
dp[3][1] = 1;
dp[3][2] = 1;
dp[3][3] = 1;

for (let i = 4; i <= maxValue; i++) {
    dp[i][1] = dp[i - 1][1];
    dp[i][2] = dp[i - 2][1] + dp[i - 2][2]; 
    dp[i][3] = dp[i - 3][1] + dp[i - 3][2] + dp[i - 3][3];
}

for (let test of testcase) {
    console.log(dp[test][1] + dp[test][2] + dp[test][3]); 
}
