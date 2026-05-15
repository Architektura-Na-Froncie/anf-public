import { Calculator } from "../src/calc"

describe('calculator', () => {
  it('should add 2 numbers', () => {
    expect(Calculator.add(1, 2)).toEqual(3)
  })
})
