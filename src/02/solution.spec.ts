import { calculatePoints, choiceForOutcome, determineOutcome, mapOutcome, mapWeapon, Outcome, parseInput, Weapon } from './solution';

describe('Day 2', () => {
  it('should convert input correctly into part 1 format', () => {
    const parsed = parseInput('src/02/test-input.txt');
    expect(parsed[0][0]).toBe('C');
    expect(parsed[0][1]).toBe('Z');
  });

  it('should map weapons correctly', () => {
    const games = [
      ['A', 'X'],
      ['B', 'Y'],
      ['C', 'Z'],
    ];

    const mapped = games.map((g) => [mapWeapon(g[0]), mapWeapon(g[1])]);
    expect(mapped[0][0]).toBe(Weapon.ROCK);
    expect(mapped[0][1]).toBe(Weapon.ROCK);
    expect(mapped[1][0]).toBe(Weapon.PAPER);
    expect(mapped[1][1]).toBe(Weapon.PAPER);
    expect(mapped[2][0]).toBe(Weapon.SCISSORS);
    expect(mapped[2][1]).toBe(Weapon.SCISSORS);
  });

  it('should map outcomes correctly', () => {
    expect(mapOutcome('X')).toBe(Outcome.LOSS);
    expect(mapOutcome('Y')).toBe(Outcome.DRAW);
    expect(mapOutcome('Z')).toBe(Outcome.WIN);
  });

  test.each([
    [Weapon.PAPER, Weapon.ROCK, 1],
    [Weapon.SCISSORS, Weapon.PAPER, 2],
    [Weapon.ROCK, Weapon.SCISSORS, 3],
    [Weapon.ROCK, Weapon.ROCK, 4],
    [Weapon.PAPER, Weapon.PAPER, 5],
    [Weapon.SCISSORS, Weapon.SCISSORS, 6],
    [Weapon.SCISSORS, Weapon.ROCK, 7],
    [Weapon.ROCK, Weapon.PAPER, 8],
    [Weapon.PAPER, Weapon.SCISSORS, 9],
  ])('should calculate points for win correctly', (player1, player2, expected) => {
    expect(calculatePoints([player1, player2])).toBe(expected);
  });

  test.each([
    [Weapon.ROCK, Weapon.ROCK, Outcome.DRAW],
    [Weapon.ROCK, Weapon.PAPER, Outcome.WIN],
    [Weapon.ROCK, Weapon.SCISSORS, Outcome.LOSS],
    [Weapon.PAPER, Weapon.ROCK, Outcome.LOSS],
    [Weapon.PAPER, Weapon.PAPER, Outcome.DRAW],
    [Weapon.PAPER, Weapon.SCISSORS, Outcome.WIN],
    [Weapon.SCISSORS, Weapon.ROCK, Outcome.WIN],
    [Weapon.SCISSORS, Weapon.PAPER, Outcome.LOSS],
    [Weapon.SCISSORS, Weapon.SCISSORS, Outcome.DRAW]
  ])('should determine correct outcome for (%d, %d, %d)', (theirs, mine, outcome) => {
    expect(determineOutcome(theirs, mine)).toBe(outcome);
  })

  test.each([
    [Weapon.ROCK, Outcome.WIN, Weapon.PAPER],
    [Weapon.ROCK, Outcome.DRAW, Weapon.ROCK],
    [Weapon.ROCK, Outcome.LOSS, Weapon.SCISSORS],
    [Weapon.PAPER, Outcome.WIN, Weapon.SCISSORS],
    [Weapon.PAPER, Outcome.DRAW, Weapon.PAPER],
    [Weapon.PAPER, Outcome.LOSS, Weapon.ROCK],
    [Weapon.SCISSORS, Outcome.WIN, Weapon.ROCK],
    [Weapon.SCISSORS, Outcome.DRAW, Weapon.SCISSORS],
    [Weapon.SCISSORS, Outcome.LOSS, Weapon.PAPER]
  ])('should chose correct weapon for desired outcome for (%d, %d, %d)', (theirs, outcome, choice) => {
    expect(choiceForOutcome(theirs, outcome)).toBe(choice);
  })
});
