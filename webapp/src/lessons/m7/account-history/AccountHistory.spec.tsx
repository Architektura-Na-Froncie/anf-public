import React from "react";
import { render } from "@testing-library/react";

import { AccountHistory } from "ui/transfers/AccountHistory";

import { transfersMockHandlersWithSpy } from "api/mock/transfers.mock";
import { setupMockServer } from "api/mock/mock.server";
import { BASE_URL } from "env/config";

const spy = jest.fn();
describe("AccountHistory", () => {
  setupMockServer(...transfersMockHandlersWithSpy(spy));

  beforeEach(() => {
    spy.mockClear();
  });

  it("should make an HTTP call", async () => {
    const { findByText } = render(<AccountHistory />);

    await findByText("Handmade Cotton Towels");
    await findByText("250 Bos weg, Wonne Sannedonk, Soedan");

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          Object {
            "body": "",
            "bodyUsed": false,
            "cache": "default",
            "cookies": Object {},
            "credentials": "omit",
            "destination": "document",
            "headers": HeadersPolyfill {
              "headers": Object {
                "accept": "application/json, text/plain, */*",
              },
              "names": Map {
                "accept" => "Accept",
              },
            },
            "id": "",
            "integrity": "",
            "keepalive": false,
            "method": "GET",
            "mode": "cors",
            "params": Object {},
            "redirect": "manual",
            "referrer": "",
            "referrerPolicy": "no-referrer",
            "url": "${BASE_URL}/account/transfers",
          },
        ],
      ]
    `);
  });

  it("should make an HTTP call once although it has been rerendered", async () => {
    const { findByText, rerender } = render(<AccountHistory />);

    await findByText("Handmade Cotton Towels");
    await findByText("250 Bos weg, Wonne Sannedonk, Soedan");

    expect(spy).toHaveBeenCalledTimes(1);

    // re-renderujemy  (np. z powodu rodzica), ale wewn. implementacja komponentu nie ponawia żądania HTTP  (useEffect/dependencies)
    rerender(<AccountHistory />);

    await findByText("Handmade Cotton Towels");
    await findByText("250 Bos weg, Wonne Sannedonk, Soedan");

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
