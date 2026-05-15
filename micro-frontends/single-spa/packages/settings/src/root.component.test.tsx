import { render } from "@testing-library/react";
import Root from "./root.component";

jest.mock('@anf-mfe/pubsub', () => ({
  pubsub: {
    subscribe: jest.fn()
  }
}));

describe("Root component", () => {
  it("should be in the document", () => {
    const { getByText } = render(<Root />);
    expect(getByText(/Ustawienia/i)).toBeInTheDocument();
  });
});
