import { fireEvent, render } from "@testing-library/react"

export const StyledInput = () => <input type="checkbox" />

test('input should be unchecked by default (FALSE PASS)', () => {
  const { container } = render(<StyledInput />)
  // expect((container.querySelector('input') as HTMLInputElement).checked).toBe(undefined)
  expect((container as HTMLInputElement).checked).toBe(undefined)
})





const AndrzejuDzialaj = () => { throw new Error("Andrzej to walnie!") }

test.skip('Andrzej daje rade (FALSE PASS)', () => {
  Promise.resolve()
    .then(AndrzejuDzialaj)
})

test.skip('Andrzej daje rade', async () => {
  await Promise.resolve()
    .then(AndrzejuDzialaj)
})




type Shipment = {
  shipmentId: string
  expiryDate: Date
}
const mockShipment: Shipment = {
  shipmentId: "346-4567-35467-4567",
  expiryDate: new Date("2020-06-01")
}

const ShipButton: React.FC<{ shipment: Shipment }> = (props) => {
  const { shipment } = props
  const now = new Date()
  const expired = now >= shipment.expiryDate
  return <button
    data-testid="proceed-btn"
    disabled={expired}
  >proceed with shipment{ shipment.shipmentId }</button>
} 

// test był pisany dawno temu 🙃
test.skip('should display active button (FALSE FAIL)', () => {
  const { getByTestId } = render(<ShipButton shipment={mockShipment} />)
  const btn = getByTestId('proceed-btn')
  expect(btn).not.toBeDisabled()
})
