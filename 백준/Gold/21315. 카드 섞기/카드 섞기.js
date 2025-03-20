const fs = require('fs');
const [input, rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const n = parseInt(input, 10);
const cards = rest.split(' ').map(Number);
// K 찾기

let canK = [];
for (let i = 1; i < n; i++) {
    if (Math.pow(2, i) < n) {
        canK.push(i);
    } else break;
}

const candidate = [];

const permutation = (current) => {
    if (current.length === 2) {
        candidate.push([...current]);
        return;
    }

    for (let i = 0; i < canK.length; i++) {
        permutation([...current, canK[i]]);
    }
};

// 가능한 K 전부 구해두기
permutation([]);

let cardState = Array.from({length: n}).map((_, index) => index + 1);

const cardMagic = (k) => {
    const firstMagicSlice = cardState.slice(-Math.pow(2, k));
    cardState = [...firstMagicSlice, ...cardState];
    cardState.splice(n);

    for (let i = 2; i <= k + 1; i++) {
        const start = Math.pow(2, k - i + 1);
        const end = Math.pow(2, k - i + 1) * 2;
        const magicSlice = cardState.slice(start, end);
        for (let i = start; i < end; i++) {
          cardState[i] = 0;
        }
        cardState.unshift(...magicSlice);
        cardState = cardState.filter((number) => number !== 0);
    }
}

const getIsSame = (origin, result) => {
    for (let i = 0; i < origin.length; i++) {
        if (origin[i] !== result[i]) {
            return false
        }
    }
    
    return true;
}

for (let i = 0; i < candidate.length; i++) {
    const [first, second] = candidate[i];

    cardMagic(first);
    cardMagic(second);

    if (getIsSame(cards, cardState)) {
        console.log(first, second);
        break;
    }
    
    cardState = Array.from({length: n}).map((_, index) => index + 1);
}
