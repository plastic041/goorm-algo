type Cell = 0 | 1;

function solve(lines: string[]): number {
  // don't use recursion
  const size = Number(lines.shift());
  const matrix: Cell[][] = lines.map((line) =>
    line.split(" ").map((cell) => Number(cell) as Cell)
  );

  const visited: boolean[][] = matrix.map((row) => row.map(() => false));

  let count = 0;

  // function dfs(row: number, col: number): void {
  //   if (row < 0 || col < 0 || row >= size || col >= size) return;
  //   if (visited[row][col]) return;
  //   if (matrix[row][col] === 0) return;

  //   visited[row][col] = true;

  //   dfs(row - 1, col);
  //   dfs(row + 1, col);
  //   dfs(row, col - 1);
  //   dfs(row, col + 1);
  // }

  // don't use recursion
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const stack: [number, number][] = [];
      if (!visited[row][col] && matrix[row][col] === 1) {
        stack.push([row, col]);
        visited[row][col] = true;
        count++;
      }

      while (stack.length > 0) {
        const [r, c] = stack.pop()!;
        if (r - 1 >= 0 && !visited[r - 1][c] && matrix[r - 1][c] === 1) {
          stack.push([r - 1, c]);
          visited[r - 1][c] = true;
        }
        if (r + 1 < size && !visited[r + 1][c] && matrix[r + 1][c] === 1) {
          stack.push([r + 1, c]);
          visited[r + 1][c] = true;
        }
        if (c - 1 >= 0 && !visited[r][c - 1] && matrix[r][c - 1] === 1) {
          stack.push([r, c - 1]);
          visited[r][c - 1] = true;
        }
        if (c + 1 < size && !visited[r][c + 1] && matrix[r][c + 1] === 1) {
          stack.push([r, c + 1]);
          visited[r][c + 1] = true;
        }
      }
    }
  }

  // for (let row = 0; row < size; row++) {
  //   for (let col = 0; col < size; col++) {
  //     if (!visited[row][col] && matrix[row][col] === 1) {
  //       dfs(row, col);
  //       count++;
  //     }
  //   }
  // }

  return count;
}

const data1 = `3
0 1 0
1 0 1
1 1 1`;

console.log(solve(data1.split("\n")));

const data2 = `4
1 1 1 1
0 0 0 1
1 1 1 1
1 0 0 1`;

console.log(solve(data2.split("\n")));
