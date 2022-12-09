import { readFileSync } from 'fs';

export enum Weapon {
  ROCK = 1,
  PAPER = 2,
  SCISSORS = 3,
}

export function next(w: Weapon): Weapon {
  const n = w + 1;
  if (n > 3) return 1;
  return n;
}

export function prev(w: Weapon): Weapon {
  const n = w - 1;
  if (n < 1) return 3;
  return n;
}

export enum Outcome {
  LOSS = 0,
  DRAW = 3,
  WIN = 6,
}

export function mapWeapon(symbol: string) {
  switch (symbol) {
    case 'A':
    case 'X':
      return Weapon.ROCK;
    case 'B':
    case 'Y':
      return Weapon.PAPER;
    case 'C':
    case 'Z':
      return Weapon.SCISSORS;
    default:
      throw new Error(`Unknown weapon symbol: ${symbol}`);
  }
}

export function mapOutcome(symbol: string) {
  switch (symbol) {
    case 'X':
      return Outcome.LOSS;
    case 'Y':
      return Outcome.DRAW;
    case 'Z':
      return Outcome.WIN;
    default:
      throw new Error(`Unknown outcome symbol: ${symbol}`);
  }
}

export function calculatePoints(game: Weapon[]) {
  const theirs = game[0];
  const mine = game[1];

  const outcome = determineOutcome(theirs, mine);

  return outcome + mine;
}

export function determineOutcome(theirs: Weapon, mine: Weapon): Outcome {
  const p = prev(theirs);
  const n = next(theirs);
  if (p === mine) return Outcome.LOSS;
  if (n === mine) return Outcome.WIN;
  return Outcome.DRAW;
}

export function choiceForOutcome(theirs: Weapon, outcome: Outcome): Weapon {
  if (outcome === Outcome.DRAW) {
    return theirs;
  }

  if (outcome === Outcome.WIN) {
    return next(theirs);
  }

  if (outcome === Outcome.LOSS) {
    return prev(theirs);
  }
}

export function parseInput(path: string) {
  const fileContents = readFileSync(path, 'utf-8');
  const games = fileContents
    .trim()
    .split('\n')
    .map((l) => l.split(' '));
  return games;
}

export function calculateWinningPointsPart1(path: string) {
  const games = parseInput(path);
  const gamesWithSymbols = games.map((g) => g.map((s) => mapWeapon(s)));
  const gamePoints = gamesWithSymbols.map((g) => calculatePoints(g));
  const totalPoints = gamePoints.reduce((p, c) => p + c);

  return totalPoints;
}

export function calculateWinningPointsPart2(path) {
  const games = parseInput(path);
  const gamesWithTheirsAndOutcome = games.map((g) => [mapWeapon(g[0]), mapOutcome(g[1])]);
  const gamesWithTheirsAndOutcomeAndRequiredMine = gamesWithTheirsAndOutcome.map(([theirs, outcome]) => [
    theirs,
    outcome,
    choiceForOutcome(theirs as Weapon, outcome as Outcome),
  ]);

  const gamePoints = gamesWithTheirsAndOutcomeAndRequiredMine.map((g) =>
    calculatePoints([g[0] as Weapon, g[2] as Weapon]),
  );

  const totalPoints = gamePoints.reduce((p, c) => p + c);
  return totalPoints;
}

export function solveDay2() {
  console.log(`Part 1: total Points is ${calculateWinningPointsPart1('src/02/input.txt')}`);
  console.log(`Part 2: total Points is ${calculateWinningPointsPart2('src/02/input.txt')}`);
}
