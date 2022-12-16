import { readFileSync } from 'fs';

export interface Section {
  start: number;
  end: number;
}

export interface SectionPair {
  first: Section;
  second: Section;
}

export function parseInput(path: string): SectionPair[] {
  const fileContents = readFileSync(path, 'utf-8');
  const lines = fileContents.trim().split('\n');

  const pairs = lines.map((l) => {
    const splitted = l.split(',');
    if (splitted.length !== 2) {
      throw new Error(`Line did not contain 2 pairs: ${splitted}`);
    }
    const linePair = splitted.map((s) => {
      const spl = s.split('-');
      if (spl.length !== 2) {
        throw new Error('Could not split into section start/end');
      }
      return {
        start: +spl[0],
        end: +spl[1],
      };
    });
    return {
      first: linePair[0],
      second: linePair[1],
    };
  });

  return pairs;
}

export function fullyContained(pair: SectionPair): boolean {
  if (pair.first.start <= pair.second.start) {
    if (pair.first.end >= pair.second.end) {
      return true;
    }
  }

  if (pair.first.start >= pair.second.start) {
    if (pair.first.end <= pair.second.end) {
      return true;
    }
  }
  return false;
}

export function partialOverlap(pair: SectionPair): boolean {
  if (pair.first.start <= pair.second.start && pair.first.end >= pair.second.start) {
    return true;
  }
  if (pair.second.start <= pair.first.start && pair.second.end >= pair.first.start) {
    return true;
  }
  return false;
}

export function solvePart1(path: string) {
  const parsed = parseInput(path);
  return parsed
    .map((pair) => fullyContained(pair))
    .map((b) => +b)
    .reduce((p, c) => p + c);
}

export function solvePart2(path: string) {
  const parsed = parseInput(path);
  return parsed
    .map((pair) => partialOverlap(pair))
    .map((b) => +b)
    .reduce((p, c) => p + c);
}

export function solveDay4() {
  console.log(`Number of pairs with full overlap: ${solvePart1('src/04/input.txt')}`);
  console.log(`Number of pairs with partial overlap: ${solvePart2('src/04/input.txt')}`);
}
