import { calculateWinningPointsPart1, calculateWinningPointsPart2 } from './solution';

describe('Day 2', () => {
  it('should calculate the number of points following the guide', () => {
    const result = calculateWinningPointsPart1();
    console.log(`Day 2/1: ${result}`);
  });

  it('should calculate the number of points following the desired outcomes', () => {
    const result = calculateWinningPointsPart2();
    console.log(`Day 2/2: ${result}`);
  });
});
