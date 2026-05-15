// in setupTests.js
require('isomorphic-fetch')
jest.mock('node-fetch', () => require('fetch-mock').sandbox())
const fetchMock = require('fetch-mock')

import { fetchAlbums, baseURL } from "./AlbumDAO";

describe('HTTP and fetch-mock', () => {
  it('should make an actual call', async () => {
    // act
    const res = await fetchAlbums()
    // assert
    expect(fetchMock.calls(/albums/)).toHaveLength(0)
  });

  it('should mock the call', async () => {
    // arrange
    const item = { userId: 1, id: 1, title: "księga tajemnicza. prolog" }
    fetchMock.mock(`${baseURL}/albums`, [item])
    // act
    const res = await fetchAlbums()
    // assert
    expect(fetchMock.calls(/albums/)).toHaveLength(1)
    fetchMock.restore()
  });
});
