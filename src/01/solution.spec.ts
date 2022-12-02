import { findHighestNumberOfCalories, findSumOfCalories } from './solution';

describe('Day 1', () => {
  it('should retrieve the highest number of calories', () => {
    console.log(`Day 1/1: ${findHighestNumberOfCalories(1)[0]}`);
  });

  it("should find sum of the top 3 highest calories", () => {
    const top = findHighestNumberOfCalories(3);
    console.log(`Day 1/2: ${findSumOfCalories(top)}`);
  })
});
