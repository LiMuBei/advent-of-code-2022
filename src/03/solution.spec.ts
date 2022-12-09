import { assignPriority, findSharedTypes, parseInput, solveDay3 } from './solution';

describe('Day 3 solution', () => {
  it('should parse input correctly', () => {
    const parsed = parseInput('src/03/test-input.txt');
    expect(parsed[0].first[0]).toStrictEqual({ type: 'a', priority: 1 });
    expect(parsed[0].second[0]).toStrictEqual({ type: 'c', priority: 3 });
    expect(parsed[1].first[0]).toStrictEqual({ type: 'e', priority: 5 });
    expect(parsed[1].second[0]).toStrictEqual({ type: 'g', priority: 7 });
  });

  test.each([
    ['a', 1],
    ['b', 2],
    ['C', 29],
  ])('should assign correct priority for %s, %d', (type, expected) => {
    expect(assignPriority(type)).toBe(expected);
  });

  it('should find shared items', () => {
    const r1 = { first: [{ type: 'a', priority: 1 }], second: [{ type: 'a', priority: 1 }] };
    expect(findSharedTypes(r1)).toStrictEqual([{ type: 'a', priority: 1 }]);

    const r2 = {
      first: [
        { type: 'a', priority: 1 },
        { type: 'D', priority: 30 },
      ],
      second: [
        { type: 'a', priority: 1 },
        { type: 'a', priority: 1 },
        { type: 'D', priority: 30 },
      ],
    };
    expect(findSharedTypes(r2)).toStrictEqual([
      { type: 'a', priority: 1 },
      { type: 'D', priority: 30 },
    ]);
  });

  it('should return empty array if no shared types', () => {
    const r = { first: [{ type: 'a', priority: 1 }], second: [{ type: 'b', priority: 2 }] };
    expect(findSharedTypes(r)).toStrictEqual([]);
  });

  it('should solve', () => {
    solveDay3();
  });
});
