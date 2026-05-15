import React from "react";
import { render } from "@testing-library/react";

import { KaboomAsync } from "./Kaboom";
import { HTTPLogger } from "../logger/HTTPLogger";
import { LoggerProvider } from "../logger";
import { ErrorScreenProvider } from "./ErrorScreenContext";

import { rest } from "msw";
import { setupMockServer } from "api/mock/mock.server";
import { BASE_URL } from "env/config";

const kaboomFn = async () => {
  throw new TypeError("undefined is not a function");
}

describe("ErrorScreenContext", () => {
  let spy: jest.Mock

  setupMockServer(
    rest.post(`${BASE_URL}/logs`, async (req, res, ctx) => {
      req.id = ''; // wywala niedeterministyczny id requestu ustawiany przez msw
      spy(req)
      return res(ctx.status(200))
    }),
  )

  it("should send HTTP POST /logs if ErrorPage was displayed", async () => {
    spy = jest.fn()
    const logger = new HTTPLogger();
    const { findByText } = render(
      <LoggerProvider logger={logger}>
        <ErrorScreenProvider>
          <KaboomAsync kaboomFn={kaboomFn} layout="ERROR_PAGE" />
        </ErrorScreenProvider>
      </LoggerProvider>
    );

    await findByText("Oops...");

    expect(spy.mock.calls).toMatchSnapshot();
  });
});
