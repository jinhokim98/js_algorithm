const fs = require('fs');
const [input, ...rest] = fs.readFileSync(0, 'utf8').trim().split('\n');

const [bus, arriveTime] = input.split(' ').map(Number);
const busTimeTable = [];

rest.forEach((line) => {
    const [startTime, interval, count] = line.split(' ').map(Number);
    for (let i = 0; i < count; i++) {
        busTimeTable.push(startTime + interval * i);
    }
});

busTimeTable.sort((a, b) => a - b);

let left = 0;
let right = busTimeTable.length - 1;
let target = -1;

while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (busTimeTable[mid] >= arriveTime) {
        target = mid;
        right = mid - 1;
    } else {
        left = mid + 1;
    }
}

if (target === -1) {
    console.log(-1)
} else {
    console.log(busTimeTable[target] - arriveTime);
}
