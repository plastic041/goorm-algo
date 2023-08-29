import { assertEquals } from "https://deno.land/std@0.200.0/assert/mod.ts";

function solve(lines: string[]): number {
  const damage = Number(lines.shift());
  const items = lines.shift()!.split(" ").map(Number);

  const dp: number[] = Array(damage + 1).fill(Infinity);
  dp[0] = 0;

  for (const item of items) {
    for (let i = item; i < dp.length; i++) {
      dp[i] = Math.min(dp[i], dp[i - item] + 1);
    }
  }

  if (dp[damage] === Infinity) {
    return -1;
  }
  return dp[damage];
}

// Deno.test("solve", () => {
//   assertEquals(
//     solve(`11
// 2 7`.split("\n")),
//     3,
//   );

//   assertEquals(
//     solve(`10000
// 4 13`.split("\n")),
//     772,
//   );

//   assertEquals(
//     solve(`10
// 3 5`.split("\n")),
//     2,
//   );
// });

console.log(solve([...Array(2)].map(() => prompt()) as string[]));
