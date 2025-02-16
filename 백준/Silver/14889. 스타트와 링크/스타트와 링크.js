const fs = require('fs');
const [input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const n = parseInt(input, 10);
const matrix = rest.map((row) => row.split(' ').map(Number));

const teamNumber = Array.from({length: n}).map((_, index) => index);
const teamCombinationResult = [];

const combination = (current, index) => {
    if (current.length === n / 2) {
        teamCombinationResult.push([...current]);
        return;
    }
    
    for (let i = index; i < n; i++) {
        current.push(i);
        combination(current, i + 1);
        current.pop();
    }
}

combination([], 0);

const combinationPair = (current, index, result, list) => {
    if (current.length === 2) {
        result.push([...current]);
        return;
    }
    
    for (let i = index; i < list.length; i++) {
        current.push(list[i]);
        combinationPair(current, i + 1, result, list);
        current.pop();
    }
}

let answer = Infinity;

const teamLength = teamCombinationResult.length;

teamCombinationResult.forEach((team, index) => {
    const compositeTeam = teamCombinationResult[teamLength - 1 - index];

    const teamCombination = [];
    const compositeTeamCombination = [];
    
    combinationPair([], 0, teamCombination, team);
    combinationPair([], 0, compositeTeamCombination, compositeTeam);
  
    const teamAbility = teamCombination.reduce((acc, cur) => {
        const [i, j] = cur;
        return acc + matrix[i][j] + matrix[j][i];
    }, 0);
    
    const compositeTeamAbility = compositeTeamCombination.reduce((acc, cur) => {
        const [i, j] = cur;
        return acc + matrix[i][j] + matrix[j][i];
    }, 0);
    
    answer = Math.min(answer, Math.abs(teamAbility - compositeTeamAbility));
});

console.log(answer);
