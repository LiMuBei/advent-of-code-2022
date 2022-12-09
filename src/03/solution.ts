import { readFileSync } from 'fs';

interface Item {
  type: string;
  priority?: number;
}

interface Rucksack {
  first: Item[];
  second: Item[];
}

export function parseInput(path: string): Rucksack[] {
  azArray();
  const fileContents = readFileSync(path, 'utf-8');
  const lines = fileContents.split('\n');
  const splitIntoCompartments = lines.map((l) => {
    const firstStr = l.slice(0, l.length / 2);
    const secondStr = l.slice(l.length / 2);

    const first = strToItems(firstStr);
    const second = strToItems(secondStr);

    return { first, second };
  });
  return splitIntoCompartments;
}

export function strToItems(s: string) {
  return Array.from(s).map((c) => ({ type: c, priority: assignPriority(c) }));
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

export function findSharedTypes(rucksack: Rucksack) {
  const s = rucksack.second.map((i) => i.type);
  const shared = rucksack.first.filter((i) => s.includes(i.type));

  return shared;
}

function solvePart1() {
    const parsed = parseInput('src/03/input.txt');
    const shared = parsed.map((r) => {
        const s = findSharedTypes(r);
        return s.length > 0 ? s[0]: undefined;
    })

    const sum = shared.map((i) => i?.priority ?? 0).reduce((p, c) => p + c);
    return sum;
}

export function solveDay3() {
  console.log(`Sum of all shared types is: ${solvePart1()}`);
}
