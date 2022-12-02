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

function mapSymbol(symbol: string) {
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
      throw new Error(`Unknown symbol: ${symbol}`);
  }
}

function calculatePoints(game: Weapon[]) {
  const theirs = game[0];
  const mine = game[1];

  let outcome: Outcome;
  if (theirs === mine) {
    outcome = Outcome.DRAW;
  }
  else if (
    (theirs === Weapon.ROCK && mine === Weapon.PAPER) ||
    (theirs === Weapon.PAPER && mine === Weapon.SCISSORS) ||
    (theirs === Weapon.SCISSORS && mine === Weapon.ROCK)
  ) {
    outcome = Outcome.WIN;
  }
  else if (
    (theirs === Weapon.ROCK && mine === Weapon.SCISSORS) ||
    (theirs === Weapon.PAPER && mine === Weapon.ROCK) ||
    (theirs === Weapon.SCISSORS && mine === Weapon.PAPER)
  ) {
    outcome = Outcome.LOSS;
  }
  else {
    throw new Error('Unknown pairing!');
  }

  return outcome + mine;
}

export function calculateWinningPoints() {
  const fileContents = readFileSync('src/02/input.txt', 'utf-8');
  const games = fileContents
    .trim()
    .split('\n')
    .map((l) => l.split(' ').map((s) => mapSymbol(s.trim())));
  const gamePoints = games.map((g) => calculatePoints(g));
  const totalPoints = gamePoints.reduce((p, c) => p + c);

  return totalPoints;
}
