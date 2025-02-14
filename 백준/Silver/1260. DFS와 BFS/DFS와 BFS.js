const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M, V] = input[0].split(" ").map(Number);

const edges = input.slice(1).map((line) => line.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);

edges.forEach(([from, to]) => {
  graph[from].push(to);
  graph[to].push(from);
});

const BFS = (graph, startNode) => {
  let visited = [];
  let needVisit = [];

  needVisit.push(startNode);

  while (needVisit.length !== 0) {
    const node = needVisit.shift();
    if (!visited.includes(node)) {
      visited.push(node);
      needVisit = [...needVisit, ...graph[node].sort((a, b) => a - b)];
    }
  }

  return visited;
};

const DFS = (graph, startNode) => {
  let visited = [];
  let needVisit = [];

  needVisit.push(startNode);

  while (needVisit.length !== 0) {
    const node = needVisit.pop();
    if (!visited.includes(node)) {
      visited.push(node);
      needVisit = [...needVisit, ...graph[node].sort((a, b) => b - a)];
    }
  }

  return visited;
};

console.log(DFS(graph, V).join(" "));
console.log(BFS(graph, V).join(" "));
