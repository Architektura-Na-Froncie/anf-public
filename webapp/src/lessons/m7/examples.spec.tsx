import React from 'react'
import { render, screen } from "@testing-library/react"

describe('examples', () => {
  it('should find element by both testid and role', () => {
    const { getByTestId } = render(<label> choose your destiny
      <input data-testid="choose-your-destiny" />
    </label>)

    const input1 = getByTestId("choose-your-destiny")
    const input2 = screen.getByRole('textbox', {name: /choose your destiny/i})
  });
});
