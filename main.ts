function solve(lines: string[]): number {
  const [_, money] = lines.shift()!.split(" ").map(Number);
  const fruits = lines.map((line) => line.split(" "))
    .map(
      ([pStr, vStr]) => ({
        price: Number(pStr),
        value: Number(vStr),
        unitValue: Number(vStr) / Number(pStr),
      }),
    )
    .sort((a, b) => b.unitValue - a.unitValue);

  let totalValue = 0;
  let spent = 0;

  for (const fruit of fruits) {
    const { price, value } = fruit;

    if (spent + price <= money) {
      spent += price;
      totalValue += value;
    } else {
      const availableMoney = money - spent;
      const availableValue = availableMoney * fruit.unitValue;
      spent += availableMoney;
      totalValue += availableValue;
    }
  }

  return totalValue;
}

const data1 = `6 13
2 8
7 35
1 5
3 12
10 30
1 7`;

console.log(solve(data1.split("\n")));

const data2 = `5 4
1 999999996
1 999999997
1 999999998
1 999999999
1 1000000000`;

console.log(solve(data2.split("\n")));

const data3 = `1 1
1000000000 1000000000`;

console.log(solve(data3.split("\n")));
