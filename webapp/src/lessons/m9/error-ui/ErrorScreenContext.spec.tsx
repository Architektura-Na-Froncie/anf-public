import React from "react";
import { render } from "@testing-library/react";
import axios from "axios";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { ErrorScreenProvider } from "./ErrorScreenContext";
import { LoggerProvider } from "../logger";
import { MockLogger } from "../logger/Logger.mock";
import { KaboomAsync } from "./Kaboom";

const handlers = [
  rest.get("/mocks/errors/network", async (req, res, ctx) => {
    return res.networkError("Failed to connect");
  }),
  rest.get(`/mocks/errors/410`, async (req, res, ctx) => {
    return res(ctx.status(410, `Backend error message 410`));
  }),
];
const server = setupServer(...handlers);

describe("ErrorScreen", () => {
  beforeAll(() =>
    server.listen({
      onUnhandledRequest: "warn",
    }),
  );
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  type TestCase = {
    name: string;
    kaboomFn: () => Promise<unknown>;
    expectedText: string;
  };
  const testcases: TestCase[] = [
    {
      name: "unknown error (TypeError)",
      kaboomFn: async () => {
        throw new TypeError("undefined is not a function");
      },
      expectedText: "Unexpected error occurred. Please contact Support.",
    },
    {
      name: "Network Error",
      kaboomFn: async () => axios.get("/mocks/errors/network"),
      expectedText: "Internet connection error. Check your wires!",
    },
    {
      name: "TIMEOUT",
      kaboomFn: async () => axios.get("/mocks/errors/410"),
      expectedText: "This resource is no longer available.",
    },
  ];

  for (const { name, kaboomFn, expectedText } of testcases) {
    it(`should display message "${expectedText}" when ${name} was thrown`, async () => {
      const { findByText } = render(
        <ErrorScreenProvider>
          <KaboomAsync kaboomFn={kaboomFn} layout="ERROR_PAGE" />
        </ErrorScreenProvider>
      );

      await findByText(expectedText);
    });
  }

  for (const { name, kaboomFn, expectedText } of testcases) {
    it(`should send ERROR log (${expectedText}) if ErrorPage was displayed`, async () => {
      const mockLogger = new MockLogger();
      const { findByText } = render(
        <LoggerProvider logger={mockLogger}>
          <ErrorScreenProvider>
            <KaboomAsync kaboomFn={kaboomFn} layout="ERROR_PAGE" />
          </ErrorScreenProvider>
        </LoggerProvider>
      );

      await findByText("Oops...");

      mockLogger.expectLogs.toMatchSnapshot();
    });
  }
});
