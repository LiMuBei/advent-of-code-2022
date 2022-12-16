import {
  assignPriority,
  findSharedItems,
  findSharedItemsInCompartments,
  parseInput,
  solveDay3,
  strToArray,
} from './solution';

describe('Day 3 solution', () => {
  it('should parse input correctly', () => {
    const parsed = parseInput('src/03/test-input.txt');
    expect(parsed[0].first[0]).toBe('a');
    expect(parsed[0].second[0]).toBe('c');
    expect(parsed[1].first[0]).toBe('e');
    expect(parsed[1].second[0]).toBe('g');
  });

  test.each([
    ['a', 1],
    ['b', 2],
    ['C', 29],
  ])('should assign correct priority for %s, %d', (type, expected) => {
    expect(assignPriority(type)).toBe(expected);
  });

  it('should find shared items', () => {
    const r1 = { first: ['a'], second: ['a'] };
    expect(findSharedItemsInCompartments(r1)).toStrictEqual(['a']);

    const r2 = {
      first: ['a', 'D'],
      second: ['a', 'a', 'D'],
    };
    expect(findSharedItemsInCompartments(r2)).toStrictEqual(['a', 'D']);
  });

  it('should return empty array if no shared types', () => {
    const r = { first: ['a'], second: ['b'] };
    expect(findSharedItemsInCompartments(r)).toStrictEqual([]);
  });

  it('should find common item in group of 3 rucksacks', () => {
    const r1 = { first: strToArray('vJrwpWtwJgWr'), second: strToArray('hcsFMMfFFhFp') };
    const r2 = { first: strToArray('jqHRNqRjqzjGDLGL'), second: strToArray('rsFMfFZSrLrFZsSL') };
    const r3 = { first: strToArray('PmmdzqPr'), second: strToArray('VvPwwTWBwg') };

    const shared = findSharedItems([r1, r2, r3]);
    expect(shared).toStrictEqual(['r']);
  });

  it('should solve', () => {
    solveDay3();
  });
});
