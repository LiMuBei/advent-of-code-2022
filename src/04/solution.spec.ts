import { fullyContained, parseInput, partialOverlap, Section, SectionPair, solvePart1, solvePart2 } from './solution';

describe('Day 4 solution', () => {
  it('should parse input into list of section pairs', () => {
    const parsed = parseInput('src/04/test-input.txt');
    expect(parsed[0].first).toEqual({ start: 49, end: 51 });
  });

  test.each([
    [{ first: { start: 1, end: 3 }, second: { start: 4, end: 6 } }, false],
    [{ first: { start: 1, end: 3 }, second: { start: 1, end: 2 } }, true],
    [{ first: { start: 1, end: 5 }, second: { start: 4, end: 6 } }, false],
    [{ first: { start: 2, end: 3 }, second: { start: 1, end: 6 } }, true],
  ])(
    'should determine if one section is completely contained into the other of a pair',
    (pair: SectionPair, expected: boolean) => {
      expect(fullyContained(pair)).toBe(expected);
    },
  );

  test.each([
    [{ first: { start: 1, end: 3 }, second: { start: 3, end: 4 } }, true],
    [{ first: { start: 1, end: 3 }, second: { start: 4, end: 5 } }, false],
    [{ first: { start: 1, end: 6 }, second: { start: 3, end: 4 } }, true],
    [{ first: { start: 3, end: 4 }, second: { start: 2, end: 4 } }, true],
    [{ first: { start: 5, end: 18 }, second: { start: 3, end: 4 } }, false],
  ])('should determin if one section has any overlap with the other', (pair: SectionPair, expected: boolean) => {
    expect(partialOverlap(pair)).toBe(expected);
  });

  it('should solve part 1', () => {
    expect(solvePart1('src/04/test-input.txt')).toBe(1);
  });

  it('should solve part 2', () => {
    expect(solvePart2('src/04/test-input.txt')).toBe(4);
  });
});
