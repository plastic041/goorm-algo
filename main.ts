function solve(lines: string[]): string {
  const [N, K, _] = lines.shift()!.split(" ").map(Number);

  function getCoord(index: number): [number, number] {
    return [Math.floor(index / N), index % N];
  }

  function getIndex(coord: [number, number]): number {
    return coord[0] * N + coord[1];
  }

  function getNeighborsIndex(index: number): number[] {
    const [x, y] = getCoord(index);
    const neighbors: number[] = [];

    if (x > 0) {
      neighbors.push(getIndex([x - 1, y]));
    }
    if (x < N - 1) {
      neighbors.push(getIndex([x + 1, y]));
    }
    if (y > 0) {
      neighbors.push(getIndex([x, y - 1]));
    }
    if (y < N - 1) {
      neighbors.push(getIndex([x, y + 1]));
    }

    return neighbors;
  }

  function getGroupsWithDfs(graph: Array<string>) {
    const visited: Array<boolean> = [];
    const groups: Array<Array<number>> = [];

    for (let i = 0; i < N * N; i++) {
      if (visited[i] || graph[i] === ".") {
        continue;
      }
      const char = graph[i];
      const group: Array<number> = [];
      const stack = [i];

      while (stack.length > 0) {
        const index = stack.pop()!;

        if (visited[index]) {
          continue;
        }

        const neighbors = getNeighborsIndex(index);
        if (char !== graph[index]) {
          continue;
        }

        group.push(index);
        visited[index] = true;

        neighbors.forEach((neighbor) => stack.push(neighbor));
      }

      if (group.length > 0) {
        groups.push(group);
      }
    }

    return groups;
  }

  const graph = lines.slice(0, N).join("").split("");
  const queries = lines.slice(N).map((line) => line.split(" ")); // [y, x, char]

  for (const query of queries) {
    const [y, x, char] = query;
    const index = getIndex([Number(y) - 1, Number(x) - 1]);
    graph[index] = char;

    getGroupsWithDfs(graph)
      .filter((group) => group.length >= K)
      .flat()
      .forEach((index) => graph[index] = ".");
  }

  return graph.join("").match(new RegExp(`.{${N}}`, "g"))!.join("\n");
}

const data1 = `5 5 6
AB..C
BBAZZ
....A
BBB.B
CCBAB
3 4 A
3 1 A
3 3 A
3 2 B
3 2 A
1 2 D`;

console.log(
  solve(data1.split("\n")),
  `AD..C
...ZZ
.....
....B
CC.AB`,
);

const data2 = `3 3 1
ABA
B.B
ABA
2 2 A`;

console.log(
  solve(data2.split("\n")),
  `ABA
BAB
ABA`,
);

// const data3 = `9 10 1 9
// 1 2
// 1 3
// 3 4
// 2 5
// 4 5
// 5 6
// 6 7
// 5 8
// 7 9
// 8 9`;

// console.log(
//   solve(data3.split("\n")),
//   `-1
// 6
// 5
// 5
// -1
// 5
// 5
// 6
// -1`,
// );
