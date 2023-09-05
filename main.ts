function solve(lines: string[]): string {
  const [pcCount, edgeCount] = lines.shift()!.split(" ").map(Number);
  const map = new Map<number, Set<number>>();
  lines
    .map((line) => line.split(" ").map(Number))
    .forEach(([from, to]) => {
      if (!map.has(from)) {
        map.set(from, new Set());
      }
      map.set(from, map.get(from)!.add(to));
      if (!map.has(to)) {
        map.set(to, new Set());
      }
      map.set(to, map.get(to)!.add(from));
    });

  const clusters: Array<Array<number>> = [];
  const visited = new Set<number>();

  map.forEach((_tos, from) => {
    if (!visited.has(from)) {
      const cluster: Array<number> = [];

      const queue = [from];
      while (queue.length > 0) {
        const current = queue.shift()!;
        if (!visited.has(current)) {
          visited.add(current);
          cluster.push(current);
          map.get(current)?.forEach((to) => {
            if (!visited.has(to)) {
              queue.push(to);
            }
          });
        }
      }

      clusters.push(cluster);
    }
  });

  function calculateDensity(cluster: Array<number>) {
    if (cluster.length === 0) throw new Error("cluster size is 0");
    const edgesCount = [...cluster].reduce(
      (count, from) => count + map.get(from)!.size,
      0,
    ) / 2;

    return edgesCount / cluster.length;
  }

  function getResultString(cluster: Array<number>) {
    return `${[...cluster].sort((a, b) => a - b).join(" ")} `;
  }

  const densities: Map<Array<number>, number> = clusters.reduce(
    (map, cluster) => map.set(cluster, calculateDensity(cluster)),
    new Map(),
  );
  const highestDensity = Math.max(...densities.values());

  const clustersWithHighestDensity = clusters
    .filter((cluster) => densities.get(cluster) === highestDensity);

  if (clustersWithHighestDensity.length === 1) {
    return getResultString(clustersWithHighestDensity[0]);
  }

  const lowestSize = Math.min(
    ...clustersWithHighestDensity.map((cluster) => cluster.length),
  );
  const clustersWithLowestSize = clustersWithHighestDensity.filter(
    (cluster) => cluster.length === lowestSize,
  );

  if (clustersWithLowestSize.length === 1) {
    return getResultString(clustersWithLowestSize[0]);
  }

  const lowestValue = Math.min(
    ...clustersWithLowestSize.map((cluster) => Math.min(...cluster)),
  );
  const clustersWithLowestValue = clustersWithHighestDensity.find(
    (cluster) => cluster.includes(lowestValue),
  )!;

  return getResultString(clustersWithLowestValue);
}

const data1 = `7 6
1 3
5 3
3 7
7 1
2 4
4 6`;

console.log(solve(data1.split("\n")), "1 3 5 7 ");

const data2 = `6 6
2 3
5 3
2 6
1 2
1 4
5 4`;

console.log(solve(data2.split("\n")), "1 2 3 4 5 6 ");

const data3 = `17 4
16 17
3 16
1 17
7 5`;

console.log(solve(data3.split("\n")), "1 3 16 17 ");
