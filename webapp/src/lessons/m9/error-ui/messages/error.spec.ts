import axios from "axios";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { getUserErrorMessage } from "./error-user";
import { HTTPStatusCodeToErrorMessageMap } from "./error-messages";

const handlers = [
  rest.get("/mocks/errors/network", async (req, res, ctx) => {
    return res.networkError("Failed to connect");
  }),
  rest.get(`/mocks/errors/403`, async (req, res, ctx) => {
    return res(ctx.status(403, `Backend error message 403`));
  }),
  rest.get(`/mocks/errors/404`, async (req, res, ctx) => {
    return res(ctx.status(404, `Backend error message 404`));
  }),
  rest.get(`/mocks/errors/410`, async (req, res, ctx) => {
    return res(ctx.status(410, `Backend error message 410`));
  }),
];
const server = setupServer(...handlers);

describe("getUserErrorMessage", () => {
  beforeAll(() =>
    server.listen({
      onUnhandledRequest: "warn",
    })
  );
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should produce UNEXPECTED_ERROR if a non-error was thrown", () => {
    expect(getUserErrorMessage(1)).toMatchInlineSnapshot(`
      Object {
        "type": "UNEXPECTED_ERROR",
      }
    `);
  });

  it("should produce UNEXPECTED_ERROR if a TypeError was thrown", () => {
    const error = new TypeError("undefined is not a function");
    expect(getUserErrorMessage(error)).toMatchInlineSnapshot(`
      Object {
        "type": "UNEXPECTED_ERROR",
      }
    `);
  });

  it("should produce CONNECTION_FAILURE if a HTTP NetworkError was thrown", async () => {
    try {
      await axios.get("/mocks/errors/network");
      fail(
        "error should be thrown, if it's not then probably HTTP is misconfigured"
      );
    } catch (error: unknown) {
      expect(getUserErrorMessage(error)).toMatchInlineSnapshot(`
        Object {
          "type": "CONNECTION_FAILURE",
        }
      `);
    }
  });

  const testcases = Object.entries(HTTPStatusCodeToErrorMessageMap)
    .map(([code, status]) => [status, parseInt(code)] as const)

  it.each(testcases)(`should produce %s if a HTTP %s was thrown`, async (errorMessage, statusCode) => {
    try {
      await axios.get(`/mocks/errors/${statusCode}`);
      fail("error should be thrown, if it's not then probably HTTP is misconfigured");
    } catch (error: unknown) {
      // Jest: Multiple inline snapshots for the same call are not supported. :(
      expect(getUserErrorMessage(error)).toMatchSnapshot();
    }
  })
});
