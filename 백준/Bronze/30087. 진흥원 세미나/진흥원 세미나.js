const table = {
    Algorithm: '204',
    DataAnalysis: '207',
    ArtificialIntelligence: '302',
    CyberSecurity: 'B101',
    Network: '303',
    Startup: '501',
    TestStrategy: '105'
}

const answer = []

const fs = require('fs')
const [first, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n')

rest.forEach((semina) => {
    answer.push(table[semina])
})

console.log(answer.join('\n'))