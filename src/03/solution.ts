import { readFileSync } from 'fs';
import { groupBy } from '../util';

interface Rucksack {
  first: string[];
  second: string[];
}

export function parseInput(path: string): Rucksack[] {
  azArray();
  const fileContents = readFileSync(path, 'utf-8');
  const lines = fileContents.split('\n');
  const splitIntoCompartments = lines.map((l) => {
    const firstStr = l.slice(0, l.length / 2);
    const secondStr = l.slice(l.length / 2);

    const first = strToArray(firstStr);
    const second = strToArray(secondStr);

    return { first, second };
  });
  return splitIntoCompartments;
}

export function strToArray(s: string) {
  return Array.from(s);
}

function distinct<T>(v: T, index: number, self: Array<T>) {
  return self.indexOf(v) === index;
}

function azArray() {
  const AZ = Array.from(Array(26)).map((_c, i) => String.fromCharCode(i + 65));
  const az = AZ.map((c) => c.toLowerCase());

  return az.concat(AZ);
}

const prioritiesIndex = azArray();

export function assignPriority(type: string) {
  return prioritiesIndex.indexOf(type) + 1;
}

export function findSharedItemsInCompartments(rucksack: Rucksack) {
  const shared = rucksack.first.filter((i) => rucksack.second.some((i2) => i === i2));
  return shared;
}

function solvePart1() {
  const rucksacks = parseInput('src/03/input.txt');
  const shared = rucksacks.map((r) => findSharedItemsInCompartments(r)).reduce((p, c) => p.concat(c));

  const sharedPrios = shared.map((i) => assignPriority(i));
  return sharedPrios.reduce((p, c) => p + c);
}

export function findSharedItems(sacks: Rucksack[]) {
  if (sacks.length !== 3) {
    throw new Error('Not exactly 3 rucksacks provided!');
  }

  const all = sacks
    .map((r, i) =>
      r.first
        .concat(r.second)
        .filter(distinct)
        .map((item) => ({ n: i, item })),
    )
    .reduce((p, c) => p.concat(c));

  const grouped = groupBy(all, (i) => i.item);

  const r = Object.entries(grouped).filter((g) => g[1].length === 3);
  const containedInAll = r.map((i) => i[0]);
  if (containedInAll.length === 0) return undefined;

  return containedInAll;
}

function solvePart2() {
  const parsed = parseInput('src/03/input.txt');
  const sharedPerGroup: string[][] = [];
  for (let index = 0; index < parsed.length - 3; index += 3) {
    const s = findSharedItems(parsed.slice(index, index + 3));
    sharedPerGroup.push(s);
  }
  
  const shared = sharedPerGroup.reduce((p, c) => p.concat(c));
  const prios = shared.map((i) => assignPriority(i));
  return prios.reduce((p, c) => p + c);
}

export function solveDay3() {
  console.log(`Sum of all shared types is: ${solvePart1()}`);
  console.log(`Sum of all Elf groups is: ${solvePart2()}`);
}
