import { readFileSync } from 'fs';

function sum(a: number, b: number): number {
  return a + b;
}

export function parseInput(path: string) {
  const fileContents = readFileSync(path, 'utf-8');
  const numbers = fileContents.split('\n\n').map((e) =>
    e.split('\n').map((i) => {
      const converted: number = +i;
      return converted;
    }),
  );

  return numbers;
}

export function aggregateCaloriesPerElf(data: number[][]) {
  return data.map((d) => d.reduce(sum));
}

export function getTopXHighestAggregatedCalories(rawCalories: number[][], top: number) {
  const aggregated = aggregateCaloriesPerElf(rawCalories);
  const sortedDesc = aggregated.sort((l, r) => r - l);
  return sortedDesc.slice(0, top);
}

export function solveDay1() {
  const parsed = parseInput('src/01/input.txt');
  const top3Elves = getTopXHighestAggregatedCalories(parsed, 3);
  console.log(`Part 1: Max sum of calories is ${top3Elves[0]}`);
  const top3Sum = top3Elves.reduce(sum);
  console.log(`Part 2: Sum of top 3 elves is ${top3Sum}`);
}
