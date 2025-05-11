const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 점수 계산 함수
function calculateScore([T, F, S, P, C]) {
  return T * 6 + F * 3 + S * 2 + P * 1 + C * 2;
}

// 방문 팀과 홈 팀 입력 파싱
const visiting = input[0].split(' ').map(Number);
const home = input[1].split(' ').map(Number);

// 점수 계산
const visitingScore = calculateScore(visiting);
const homeScore = calculateScore(home);

// 결과 출력
console.log(`${visitingScore} ${homeScore}`);
