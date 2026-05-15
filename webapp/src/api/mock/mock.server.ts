import { setupServer } from 'msw/node';

type HandlerParams = Parameters<typeof setupServer>
export function setupMockServer(...handlers: HandlerParams){
  const server = setupServer(...handlers)

  beforeAll(() => server.listen({
    onUnhandledRequest: 'warn',
  }))
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  return server
}
