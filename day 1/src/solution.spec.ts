import { findHighestNumberOfCalories, findSumOfCalories } from './solution';

describe('Solution', () => {
  it('should retrieve the highest number of calories', () => {
    console.log(findHighestNumberOfCalories(1));
  });

  it("should find sum of the top 3 highest calories", () => {
    const top = findHighestNumberOfCalories(3);
    console.log(findSumOfCalories(top));
  })
});
