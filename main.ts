function solve(lines: string[]): number {
  const [size, rayCount] = lines.shift()!.split(" ").map(Number);

  type Direction = "R" | "L" | "U" | "D";

  type Cell = {
    horizontalRayCount: number;
    verticalRayCount: number;
  };

  type Coord = {
    x: number;
    y: number;
  };

  type RayDirection = "horizontal" | "vertical";

  function getCrossoverCount(cell: Cell): number {
    return cell.horizontalRayCount * cell.verticalRayCount;
  }

  function getCell(cells: Cell[], coord: Coord): Cell {
    const { x, y } = coord;

    return cells[x + y * size];
  }

  function addRayToCell(
    cells: Cell[],
    coord: Coord,
    direction: RayDirection,
  ): Cell {
    const cell = getCell(cells, coord);
    cell[`${direction}RayCount`]++;

    return cell;
  }

  const cells = new Array(size * size).fill(0).map(() => ({
    horizontalRayCount: 0,
    verticalRayCount: 0,
  }));
  lines.forEach((line) => {
    const [y, x, direction] = line.split(" ");
    const coord = { x: Number(x) - 1, y: Number(y) - 1 };

    if (direction === "R") {
      for (let i = coord.x; i < size; i++) {
        addRayToCell(cells, { x: i, y: coord.y }, "horizontal");
      }
    } else if (direction === "L") {
      for (let i = coord.x; i >= 0; i--) {
        addRayToCell(cells, { x: i, y: coord.y }, "horizontal");
      }
    } else if (direction === "U") {
      for (let i = coord.y; i >= 0; i--) {
        addRayToCell(cells, { x: coord.x, y: i }, "vertical");
      }
    } else if (direction === "D") {
      for (let i = coord.y; i < size; i++) {
        addRayToCell(cells, { x: coord.x, y: i }, "vertical");
      }
    }
  });

  return cells.reduce((acc, cell) => {
    return acc + getCrossoverCount(cell);
  }, 0);
}

const data1 = `3 5
2 1 R
1 1 D
2 3 L
3 3 U
2 2 D`;

console.log(solve(data1.split("\n")), 6);

const data2 = `3 3
2 2 R
2 2 L
1 2 D`;

console.log(solve(data2.split("\n")), 2);
