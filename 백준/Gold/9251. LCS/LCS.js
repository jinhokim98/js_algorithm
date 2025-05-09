const fs = require('fs')
const [str1, str2] = fs.readFileSync(0, 'utf8').trim().split('\n')

const n = str1.length
const m = str2.length
const dp = Array.from({length: n + 1}, () => Array.from({length: m + 1}).fill(0))
// dp[i][j] str1의 i번째 문자열까지와 str2의 j번째 문자열까지 비교했을 때 최장공통길이

for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
        if (str1[i - 1] === str2[j - 1]) {
            dp[i][j] = dp[i - 1][j - 1] + 1
        } else {
            dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
        }
    }
}

console.log(dp[n][m])