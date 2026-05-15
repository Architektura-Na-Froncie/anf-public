import { fireEvent, render } from "@testing-library/react"

/**
 * Większość z poniższych testów jest celowo skonfigurowana tak, aby failowały.
 * Odkomentowując (usuwając .skip) sprawdzamy jak dokładny jest komunikat błędu.
 * Każdy test, jaki piszemy, powinniśmy celowo odwrócić, aby sprawdzić, na ile komunikat błędu jest pomocny - i czy można to poprawić.
 */

test.skip("should divide numbers", () => {
  var a: number = 100, b: number = 0
  const result = a / b

  if (!Number.isFinite(result)){
    throw new Error(`Number ${result} is not finite`)
  }
})

test.skip("should display some text", () => {
  const { getByText } = render(<p>Architektura na Froncie</p>)
  getByText("Kiełbasa")
})

const BigComponent = () => {
  return <input type="checkbox" />
}

// w markupie brakuje elementu o odpowiednim ID
test.skip("button should be checked", () => {
  // given
  const { getByTestId } = render(<BigComponent />)
  const checkboxEl = getByTestId("checkbox")

  // when
  fireEvent.click(checkboxEl)

  // then
  expect(checkboxEl).not.toBeChecked()
})

test("checkbox should be checked", () => {
  const { getByTestId } = render(<input
    type="checkbox"
    data-testid="checkbox"
    defaultChecked
  />)
  const checkboxEl = getByTestId("checkbox")

  fireEvent.click(checkboxEl)

  expect(checkboxEl).not.toBeChecked()
})

// krótka ilustracja podejścia arrange/act/assert lub given/when/then
// brakuje implementacji Page Objectu - więcej w module poświęconym testom integracyjnym
test.skip("AcceptTerms should have 'accept terms' unchecked after opening the modal and closing it without accepting", async () => {
  // arrange
  const acceptTermsPO = AcceptTermsPO.render();

  // assert
  acceptTermsPO.acceptTermsShouldBeUnchecked();

  // act
  await acceptTermsPO.openAcceptTermsModal().andClickCancel();

  // assert
  acceptTermsPO.acceptTermsShouldBeUnchecked();
});

const john = {
  firstName: "John",
  lastName: "Lennon",
}

test('john clone should equal to john, but be a separate object', () => {
  const johnClone = { ...john }
  expect(johnClone).toEqual(john)
  expect(johnClone).not.toBe(john)
})

const items = [1, 2, 3, 4, 5]

test.skip('mapped result should have the same length', () => {
  const result = items.map(x => x**2)
  // expect(result.length == items.length + 1).toBe(true)
  // expect(result.length).toEqual(items.length + 1)
  expect(result).toHaveLength(items.length + 1)
})

const getJohn = (age?: number) => ({
  name: "John Lennon",
  ...(age && { age })
})

// dodaj parametr: getJohn(40)
test.skip('should conditionally add `age` property', () => {
  const newJohn = getJohn()
  expect('age' in newJohn).toBe(true)
  expect(newJohn).toHaveProperty('age', 40)
})
