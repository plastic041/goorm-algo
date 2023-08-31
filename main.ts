type Cell = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

function solve(lines: string[]): number {
  const [size, k] = lines.shift()!.split(" ").map(Number);
  const matrix: Cell[][] = lines.map((line) =>
    line.split(" ").map((cell) => Number(cell) as Cell)
  );

  const visited: boolean[][] = matrix.map((row) => row.map(() => false));

  const cells = new Map<Cell, number>();

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const stack: [number, number][] = [];

      let cellCount = 0;
      const currentCell = matrix[row][col];

      if (!visited[row][col]) {
        stack.push([row, col]);
        visited[row][col] = true;
        cellCount++;
      }

      while (stack.length > 0) {
        const [r, c] = stack.pop()!;
        if (
          r - 1 >= 0 && !visited[r - 1][c] && matrix[r - 1][c] === currentCell
        ) {
          stack.push([r - 1, c]);
          visited[r - 1][c] = true;
          cellCount++;
        }
        if (
          r + 1 < size && !visited[r + 1][c] && matrix[r + 1][c] === currentCell
        ) {
          stack.push([r + 1, c]);
          visited[r + 1][c] = true;
          cellCount++;
        }
        if (
          c - 1 >= 0 && !visited[r][c - 1] && matrix[r][c - 1] === currentCell
        ) {
          stack.push([r, c - 1]);
          visited[r][c - 1] = true;
          cellCount++;
        }
        if (
          c + 1 < size && !visited[r][c + 1] && matrix[r][c + 1] === currentCell
        ) {
          stack.push([r, c + 1]);
          visited[r][c + 1] = true;
          cellCount++;
        }
      }

      if (cellCount >= k) {
        cells.set(matrix[row][col], (cells.get(matrix[row][col]) || 0) + 1);
      }
    }
  }

  const sortedCells = [...cells.entries()].sort((a, b) => {
    if (b[1] === a[1]) {
      return b[0] - a[0];
    }
    return b[1] - a[1];
  });

  return sortedCells[0][0];
}

const data1 = `3 2
1 1 3
2 2 3
3 3 2`;

console.log(solve(data1.split("\n")));

const data2 = `5 3
1 1 1 2 2
3 3 3 1 2
1 1 2 1 1
1 2 2 2 2
3 1 1 1 1`;

console.log(solve(data2.split("\n")));
