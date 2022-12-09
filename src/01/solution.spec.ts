import { aggregateCaloriesPerElf, getTopXHighestAggregatedCalories, parseInput } from './solution';

describe('Day 1', () => {
  it('should parse input correctly into data structure', () => {
    const parsed = parseInput('src/01/test-input.txt');
    expect(parsed.length).toBe(2);
    expect(parsed[0][0]).toBe(1);
  });

  it('should aggregate data per Elf correctly', () => {
    const parsed = parseInput('src/01/test-input.txt');
    const aggregated = aggregateCaloriesPerElf(parsed);
    expect(aggregated.length).toBe(2);
    expect(aggregated[0]).toBe(6);
    expect(aggregated[1]).toBe(15);
  });

  it('should get highest aggregated calories correctly', () => {
    const parsed = parseInput('src/01/test-input.txt');
    const topCalories = getTopXHighestAggregatedCalories(parsed, 1)[0];
    expect(topCalories).toBe(15);
  });
});
