import assert from 'assert'
import { expect } from 'chai';

import { Calculator } from '../src/calc';

describe('calculator', () => {
  it('should add 2 numbers', () => {
    assert.equal(Calculator.add(1, 2), 3, '1+2 is 3, dude!')
    assert.strictEqual(Calculator.add(1, 2), 3, '1+2 is 3, dude!')
    assert.notEqual(Calculator.add(1, 2), 1500, 'should not be, dude!')
    assert.notStrictEqual(Calculator.add(1, 2), 1500, 'should not be, dude!')

    expect(Calculator.add(1, 2) == 3, '1+2 is 3, dude!').to.be.true
  })

  xit('(xit) skipped - never gets run', () => {
    assert.fail()
  })
})
