const fs = require('fs');
const [input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const n = parseInt(input, 10);
const matrix = rest.map((row) => row.split(' ').map(Number));

const teams = [];

const combination = (current, index, count) => {
    if (current.length === count) {
        teams.push([...current]);
        return;
    }
    
    for (let i = index; i < n; i++) {
        current.push(i);
        combination(current, i + 1, count);
        current.pop();
    }
}

for (let i = 1; i <= Math.floor(n / 2); i++) {
  combination([], 0, i)
}

const combinationPair = (current, index, result, list) => {
    if (current.length === 2) {
        result.push([...current]);
        return;
    }

    if (list.length <= 2) {
        result.push([...list])
        return;
    }
    
    for (let i = index; i < list.length; i++) {
        current.push(list[i]);
        combinationPair(current, i + 1, result, list);
        current.pop();
    }
}

const teamLength = teams.length;

const getCompositeTeam = (team) => {
    const teamSet = new Set([...team]);
    const people = new Set([...Array.from({length: n}).map((_, index) => index)]);
    const composit = [...people].filter((person) => !teamSet.has(person));
    return composit;
}

let answer = Infinity;

teams.forEach((team, index) => {
    const compositeTeam = getCompositeTeam(team);

    const teamCombination = [];
    const compositeTeamCombination = [];
    
    combinationPair([], 0, teamCombination, team);
    combinationPair([], 0, compositeTeamCombination, compositeTeam);

    const teamAbility = teamCombination.reduce((acc, cur) => {
        if (cur.length === 1) {
            return acc;
        } else {
            const [i, j] = cur;
            return acc + matrix[i][j] + matrix[j][i];
        }
    }, 0);
    
    const compositeTeamAbility = compositeTeamCombination.reduce((acc, cur) => {
        if (cur.length === 1) {
            return acc;
        } else {
            const [i, j] = cur;
            return acc + matrix[i][j] + matrix[j][i];
        }
    }, 0);
    
    answer = Math.min(answer, Math.abs(teamAbility - compositeTeamAbility));
});

console.log(answer);
