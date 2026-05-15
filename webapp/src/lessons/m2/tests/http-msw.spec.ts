import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { baseURL, fetchAlbums, saveAlbums } from './AlbumDAO'

const handlers = [
  rest.get(`${baseURL}/albums`, async (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.json([{ id: 1 }]),
    )
  }),
  rest.post(`${baseURL}/albums`, async (req, res, ctx) => {
    throw new SyntaxError('Unexpected token')
  }),
]
const server = setupServer(...handlers)

describe('AlbumDAO', () => {
  beforeAll(() => server.listen({
    onUnhandledRequest: 'error',
  }))
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('should mock the call', async () => {
    const response = await fetchAlbums()
    expect(response).toEqual([{ id: 1 }])
  })

  test('should mock a failure', async () => {
    await expect(saveAlbums([])).rejects.toThrow('Network request failed')
  })
})
