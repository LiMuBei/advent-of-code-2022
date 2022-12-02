import { readFileSync } from 'fs';

export function parseInput() {
  const fileContents = readFileSync('./input.txt', 'utf-8');
  const numbers = fileContents.split('\n\n').map((e) => e.split('\n').map((i) => {
    const converted: number = +i;
    return converted;
  }));

  return numbers;
}

export function findHighestNumberOfCalories(top: number) {
  const numbers = parseInput();
  const sums = numbers.map((ns) => ns.reduce((p, c) => p + c));
  const sortedDesc = sums.sort((l, r) => r -l);
  return sortedDesc.slice(0, top);
}

export function findSumOfCalories(calories: number[]) {
  const sum = calories.reduce((p, c) => p + c);
  return sum;
}
