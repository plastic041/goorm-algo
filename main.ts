function solve(lines: string[]): number {
  const [N, _] = lines.shift()!.split(" ").map(Number);
  const graph = new Map<number, Set<number>>();

  for (const line of lines) {
    const [from, to] = line.split(" ").map(Number);
    if (!graph.has(from)) {
      graph.set(from, new Set());
    }
    graph.get(from)?.add(to);
  }

  const pairs = new Map<number, Set<number>>();
  const visitedNodes = new Set<number>();
  for (const node of graph.keys()) {
    if (visitedNodes.has(node)) {
      continue;
    }
    const stack = [node];
    const visited = new Set<number>();
    while (stack.length > 0) {
      const current = stack.pop()!;
      if (visited.has(current)) {
        continue;
      }
      visited.add(current);

      [...graph.get(current) || []]
        .filter((neighbor) => !visited.has(neighbor))
        .filter((neighbor) =>
          graph.get(current)?.has(neighbor) && graph.get(neighbor)?.has(current)
        )
        .forEach((neighbor) => {
          // console.log(neighbor, current);
          stack.push(neighbor);
        });
    }

    visited.delete(node);
    if (visited.size > 0) {
      pairs.set(node, visited);
      visited.forEach((node) => visitedNodes.add(node));
    }
  }

  let pairsCount = 0;
  let nodesUsedCount = 0;
  for (const pair of pairs.values()) {
    pairsCount++;
    nodesUsedCount += pair.size + 1;
  }
  return N - nodesUsedCount + pairsCount;
}

const data1 = `4 6
2 3
4 1
1 2
3 4
1 4
2 4`;

console.log(solve(data1.split("\n")), 3);

const data2 = `3 6
1 2
1 3
2 1
2 3
3 1
3 2`;

console.log(solve(data2.split("\n")), 1);
