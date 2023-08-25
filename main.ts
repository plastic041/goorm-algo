const data = `4 4
0 0 @ 0
0 0 0 0
0 # 0 0
0 0 0 @
2 2
2 3
1 4
1 4`.split("\n");

type Terrain = "@" | "#" | "0";

type Point = {
  x: number;
  y: number;
};

type Tile = {
  terrain: Terrain;
  point: Point;
  num: number;
};

function solve(lines: Array<string>): string {
  const [width, height] = lines[0].split(" ").map(Number);
  const map: Map<`${number},${number}`, Tile> = new Map();
  for (let y = 1; y <= height; y++) {
    const row = lines[y].split(" ");
    for (let x = 1; x <= width; x++) {
      const terrain = row[x - 1] as Terrain;
      map.set(`${x},${y}`, {
        terrain,
        point: { x, y },
        num: 0,
      });
    }
  }

  lines.slice(height + 1).forEach((line) => {
    const [y, x] = line.split(" ").map(Number);
    const neighbors: Array<`${number},${number}`> = [
      `${x},${y}`,
      `${x - 1},${y}`,
      `${x + 1},${y}`,
      `${x},${y - 1}`,
      `${x},${y + 1}`,
    ];
    neighbors.forEach((neighbor) => {
      const tile = map.get(neighbor);
      if (tile) {
        if (tile.terrain === "@") {
          tile.num += 2;
        } else if (tile.terrain === "#") {
          tile.num += 0;
        } else if (tile.terrain === "0") {
          tile.num += 1;
        }
      }
    });
  });

  const a = Array.from(map.values()).map((tile) => tile.num);
  // log 4 x 4
  console.log(a.slice(0, 4));
  console.log(a.slice(4, 8));
  console.log(a.slice(8, 12));
  console.log(a.slice(12, 16));

  const tiles = Array.from(map.values());
  const max = Math.max(...tiles.map((tile) => tile.num));

  return max.toString();
}

console.log(solve(data));
