import React from "react";
import { render } from "@testing-library/react";

import { useStuff } from "./stuff-context";
jest.mock("./stuff-context", () => ({
  useStuff: () => ({ value: "honk honk" }),
}));

export const Stuff: React.FC = () => {
  const { value } = useStuff();
  return <>the value is: {value}</>;
};

test("component should access mocked context via hook", () => {
  const { container } = render(<Stuff />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      the value is: 
      honk honk
    </div>
  `);
});
