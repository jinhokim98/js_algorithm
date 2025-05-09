const fs = require('fs')
const [input, rest] = fs.readFileSync(0, 'utf8').trim().split('\n')
const n = parseInt(input, 10)
const sequence = rest.split(' ').map(Number)

const lis = []
const dp = [[0, sequence[0]]] // index, value

const binarySearch = (e) => {
    let start = 0
    let end = lis.length
    while (start < end) {
        let mid = Math.floor((start + end) / 2)
        if (lis[mid] < e) start = mid + 1
        else end = mid
    }
    return start
}

sequence.forEach((number) => {
    if (number > lis[lis.length - 1]) { // lis의 마지막보다 현재 수가 크다면
        lis.push(number)
        dp.push([lis.length - 1, number]) // lis에 푸시하고 인덱스와 수를 저장
    } else { // 다른 수와 대체해야 함
        const index = binarySearch(number)
        lis[index] = number
        dp.push([index, number])
    }
})

let lastIndex = lis.length - 1
const result = []
// 역추적하기
for (let i = dp.length - 1; i >= 0; i--) {
    if (dp[i][0] === lastIndex) {
        result.push(dp[i][1])
        lastIndex--
    }
}

console.log(lis.length)
console.log(result.reverse().join(' '))
