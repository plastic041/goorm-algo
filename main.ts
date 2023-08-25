const data = `4
4 2
2 4
1L 3D 3L 1U
2D 2L 4U 1U
2D 2L 4U 3L
4D 4D 1R 4R`.split("\n");

function solve(lines: string[]) {
  const commands = {
    U: [-1, 0],
    D: [1, 0],
    R: [0, 1],
    L: [0, -1],
  } as const;

  const inputs = lines.map((line) => line.trim().split(/\s+/));
  const size = Number(inputs.shift()![0]);
  const goormStart = inputs.shift()!.map((item) => Number(item) - 1); // subtract 1 for 0-based index
  const playerStart = inputs.shift()!.map((item) => Number(item) - 1);
  const board = inputs.map((row) =>
    row.map((item) => ({
      count: Number(item.slice(0, -1)),
      command: item.slice(-1),
    }))
  );

  const result = {
    goorm: 0,
    player: 0,
  };

  function run(name: keyof typeof result, start: number[]) {
    const visited = Array(size).fill(0).map(() => Array(size).fill(false));
    let [y, x] = start;
    let score = 0;

    while (!visited[y][x]) {
      score++;
      visited[y][x] = true;

      const { count, command } = board[y][x];
      // console.log(`${count}${command} ${name} ${score}`);
      for (let i = 0; i < count; i++) {
        y = (y + commands[command as keyof typeof commands][0] + size) % size;
        x = (x + commands[command as keyof typeof commands][1] + size) % size;
        if (visited[y][x]) {
          break;
        }
        if (i < count - 1) {
          score++;
          visited[y][x] = true;
          // const current = board[y][x];
          // console.log(`${current.count}${current.command} ${name} ${score}`);
        }
      }
    }

    result[name] = score;
  }

  run("goorm", goormStart);
  run("player", playerStart);

  return result.goorm > result.player
    ? "goorm " + result.goorm
    : "player " + result.player;
}

console.log(solve(data));
