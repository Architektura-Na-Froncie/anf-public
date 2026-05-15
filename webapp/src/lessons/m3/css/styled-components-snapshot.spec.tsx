import { render } from "@testing-library/react";

import { Button } from "ui/atoms";

// unskip the test to see the difference caused by jest-styled-components
test.skip("Button should match snapshot", () => {
  const { container } = render(
    <Button variant="PRIMARY">click me</Button>
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <button
        class="sc-bdfBwQ bkknMa"
      >
        click me
      </button>
    </div>
  `);
});
