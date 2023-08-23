const data = `100`.split("\n");

const HEALS = {
  BANDAGE: 1,
  MEDICINE: 7,
  PAINKILLER: 14,
} as const;

function solve(lines: Array<string>): string {
  let n = lines.shift() as unknown as number;
  let healCount = 0;

  const maxPainkiller = Math.floor(n / HEALS.PAINKILLER);
  if (maxPainkiller > 0) {
    n -= maxPainkiller * HEALS.PAINKILLER;
    healCount += maxPainkiller;
  }

  const maxMedicine = Math.floor(n / HEALS.MEDICINE);
  if (maxMedicine > 0) {
    n -= maxMedicine * HEALS.MEDICINE;
    healCount += maxMedicine;
  }

  const maxBandage = Math.floor(n / HEALS.BANDAGE);
  if (maxBandage > 0) {
    n -= maxBandage * HEALS.BANDAGE;
    healCount += maxBandage;
  }

  return `${healCount}`;
}

console.log(solve(data));
