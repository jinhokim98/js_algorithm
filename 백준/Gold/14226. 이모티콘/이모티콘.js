const fs = require('fs');
const s = parseInt(fs.readFileSync(0, 'utf8').trim(), 10);

const visited = Array.from({ length: 1001 }, () => Array(1001).fill(false));

const bfs = () => {
    const queue = [[1, 0, 0]]; // 화면 이모지 수, 시간, 클립보드 이모지 수
    visited[1][0] = true;

    while (queue.length) {
        const [cur, time, clipboard] = queue.shift();

        if (cur === s) {
            console.log(time);
            return;
        }

        if (!visited[cur][cur]) {
            visited[cur][cur] = true;
            queue.push([cur, time + 1, cur]);
        }

        if (clipboard > 0 && cur + clipboard <= 1000 && !visited[cur + clipboard][clipboard]) {
            visited[cur + clipboard][clipboard] = true;
            queue.push([cur + clipboard, time + 1, clipboard]);
        }

        if (cur > 0 && !visited[cur - 1][clipboard]) {
            visited[cur - 1][clipboard] = true;
            queue.push([cur - 1, time + 1, clipboard]);
        }
    }
};

bfs();
