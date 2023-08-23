const data = `4 2
0 0 0 1
0 0 1 0
0 0 1 0
0 1 1 1`.split("\n");

type CoordString = `${number},${number}`;

function getCoordString(x: number, y: number): CoordString {
  return `${x},${y}`;
}

function solve(lines: Array<string>): string {
  const [_, k] = lines.shift()!.split(" ").map(Number);

  const map: Map<CoordString, boolean> = new Map();

  lines.forEach((line, y) => {
    line.split(" ").forEach((value, x) => {
      map.set(`${x},${y}`, value === "1");
    });
  });

  let hasKNeighborsCount = 0;
  [...map].forEach(([coordString, value]) => {
    if (!value) {
      let neighborsCount = 0;
      const [x, y] = coordString.split(",").map(Number);
      if (map.get(getCoordString(x - 1, y - 1))) neighborsCount++;
      if (map.get(getCoordString(x, y - 1))) neighborsCount++;
      if (map.get(getCoordString(x + 1, y - 1))) neighborsCount++;
      if (map.get(getCoordString(x - 1, y))) neighborsCount++;
      if (map.get(getCoordString(x + 1, y))) neighborsCount++;
      if (map.get(getCoordString(x - 1, y + 1))) neighborsCount++;
      if (map.get(getCoordString(x, y + 1))) neighborsCount++;
      if (map.get(getCoordString(x + 1, y + 1))) neighborsCount++;

      if (neighborsCount === k) hasKNeighborsCount++;
    }
  });

  return String(hasKNeighborsCount);
}

console.log(solve(data));
