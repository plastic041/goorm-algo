function solve(lines: string[]) {
  const [N, M, K] = lines.shift()!.split(" ").map(Number);

  const graph: number[][] = new Array(N + 1).fill(null).map(() => []);
  for (const edge of lines) {
    const [from, to] = edge.split(" ").map(Number);
    graph[from].push(to);
    graph[to].push(from);
  }

  const visited = new Array(N + 1).fill(false);
  visited[K] = true;
  let currentNode = K;
  let lastNode = K;
  let visitedCount = 1;

  while (true) {
    let minNextNode = Infinity;
    for (const neighbor of graph[currentNode]) {
      if (!visited[neighbor] && neighbor < minNextNode) {
        minNextNode = neighbor;
      }
    }

    if (minNextNode === Infinity) {
      break;
    }

    visited[minNextNode] = true;
    currentNode = minNextNode;
    lastNode = minNextNode;
    visitedCount++;
  }

  return `${visitedCount} ${lastNode}`;
}

const data1 = `6 6 1
1 2
1 3
2 3
3 4
3 5
4 6`;

console.log(solve(data1.split("\n")));

const data2 = `6 5 1
1 2
2 3
3 4
4 5
5 6`;

console.log(solve(data2.split("\n")));
