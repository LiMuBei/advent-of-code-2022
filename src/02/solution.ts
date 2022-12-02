import { readFileSync } from 'fs';

enum Weapon {
  ROCK = 1,
  PAPER = 2,
  SCISSORS = 3,
}

enum Outcome {
  LOSS,
  DRAW = 3,
  WIN = 6,
}

function mapWeapon(symbol: string) {
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

function mapOutcome(symbol: string) {
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

function calculatePoints(game: Weapon[]) {
  const theirs = game[0];
  const mine = game[1];

  let outcome: Outcome;
  if (theirs === mine) {
    outcome = Outcome.DRAW;
  } else if (
    (theirs === Weapon.ROCK && mine === Weapon.PAPER) ||
    (theirs === Weapon.PAPER && mine === Weapon.SCISSORS) ||
    (theirs === Weapon.SCISSORS && mine === Weapon.ROCK)
  ) {
    outcome = Outcome.WIN;
  } else if (
    (theirs === Weapon.ROCK && mine === Weapon.SCISSORS) ||
    (theirs === Weapon.PAPER && mine === Weapon.ROCK) ||
    (theirs === Weapon.SCISSORS && mine === Weapon.PAPER)
  ) {
    outcome = Outcome.LOSS;
  } else {
    throw new Error('Unknown pairing!');
  }

  return outcome + mine;
}

function choiceForOutcome(theirs: Weapon, outcome: Outcome): Weapon {
  if (outcome === Outcome.DRAW) {
    return theirs;
  }

  if (outcome === Outcome.WIN) {
    switch (theirs) {
      case Weapon.ROCK:
        return Weapon.PAPER;
      case Weapon.PAPER:
        return Weapon.SCISSORS;
      case Weapon.SCISSORS:
        return Weapon.ROCK;
      default:
        throw new Error('Unknown weapon from them');
    }
  } else if (outcome === Outcome.LOSS) {
    switch (theirs) {
      case Weapon.ROCK:
        return Weapon.SCISSORS;
      case Weapon.PAPER:
        return Weapon.ROCK;
      case Weapon.SCISSORS:
        return Weapon.PAPER;
      default:
        throw new Error('Unknown weapon from them');
    }
  }
}

function parseInput() {
  const fileContents = readFileSync('src/02/input.txt', 'utf-8');
  const games = fileContents
    .trim()
    .split('\n')
    .map((l) => l.split(' '));
  return games;
}

export function calculateWinningPointsPart1() {
  const games = parseInput();
  const gamesWithSymbols = games.map((g) => g.map((s) => mapWeapon(s)));
  const gamePoints = gamesWithSymbols.map((g) => calculatePoints(g));
  const totalPoints = gamePoints.reduce((p, c) => p + c);

  return totalPoints;
}

export function calculateWinningPointsPart2() {
  const games = parseInput();
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
