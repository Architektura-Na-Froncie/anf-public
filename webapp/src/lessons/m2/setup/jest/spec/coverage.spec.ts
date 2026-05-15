import { branches } from "../src/branches"
import { getPerson } from "../src/coverage"

test('getPerson', () => {
  expect(getPerson(true, true, false)).toEqual({ age: 18, company: "ACME" })
})

// toBe vs toEqual
//     If it should pass with deep equality, replace "toBe" with "toStrictEqual"
// Expected: {"age": 18, "company": "ACME"}
// Received: serializes to the same string

test('branches', () => {
  branches(true, true)
  branches(false, false)

  // poniższe FUNKCJONALNOŚCI nie są pokryte, ale pokrycie kodu 100%.
  // branches(true, false)
  // branches(false, true)
})
