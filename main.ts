function solve(lines: string[]): string {
  type Node = number;

  const [N, M, START, END] = lines.shift()!.split(" ").map(Number);
  const graphFrom: Map<Node, Set<Node>> = new Map();
  const graphTo: Map<Node, Set<Node>> = new Map();
  lines.forEach((line) => {
    const [from, to] = line.split(" ").map(Number);
    if (!graphFrom.has(from)) {
      graphFrom.set(from, new Set());
    }
    graphFrom.get(from)?.add(to);
    if (!graphTo.has(to)) {
      graphTo.set(to, new Set());
    }
    graphTo.get(to)?.add(from);
  });

  function dfs(disabled: number) {
    const queue: Array<[Node, number]> = [[START, 1]];
    const visited: Set<Node> = new Set();

    if (disabled === START || disabled === END) {
      return -1;
    }

    while (queue.length > 0) {
      const [node, steps] = queue.shift()!;
      if (node === END) {
        return steps;
      }
      visited.add(node);
      const nextNodesFrom = graphFrom.get(node);
      const nextNodesTo = graphTo.get(node);
      if (nextNodesFrom) {
        nextNodesFrom.forEach((nextNode) => {
          if (nextNode !== disabled && !visited.has(nextNode)) {
            queue.push([nextNode, steps + 1]);
          }
        });
      }
      if (nextNodesTo) {
        nextNodesTo.forEach((nextNode) => {
          if (nextNode !== disabled && !visited.has(nextNode)) {
            queue.push([nextNode, steps + 1]);
          }
        });
      }
    }
    return -1;
  }

  let result = "";
  for (let i = 1; i <= N; i++) {
    result += `${dfs(i)}
`;
  }

  return result;
}

const data1 = `5 5 1 4
1 3
4 3
2 5
4 2
1 5`;

console.log(
  solve(data1.split("\n")),
  `-1
3
4
-1
3`,
);

// const data2 = `4 4 3 1
// 4 1
// 4 3
// 3 2
// 2 1`;

// console.log(
//   solve(data2.split("\n")),
//   `-1
// 3
// -1
// 3`,
// );

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
