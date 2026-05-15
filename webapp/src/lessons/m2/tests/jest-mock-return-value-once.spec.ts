jest.mock("./AlbumDAO", () => ({
  // fetchAlbums: () => [] // fake
  fetchAlbums: jest.fn() // mock
}));

import { fetchAlbums } from './AlbumDAO'

test("mocked function should return values as specified in sequence (return)", async () => {
  const spy = (fetchAlbums as jest.Mock)
    .mockReturnValue(Promise.resolve([]))
    .mockReturnValueOnce(Promise.resolve([{ id: 1 }]))
    .mockReturnValueOnce(Promise.resolve([{ id: 2 }]))
    .mockReturnValueOnce(Promise.resolve([{ id: 3 }]))
  const result1 = await fetchAlbums()
  expect(result1).toEqual([{ id: 1 }])
  const result2 = await fetchAlbums()
  expect(result2).toEqual([{ id: 2 }])
  const result3 = await fetchAlbums()
  expect(result3).toEqual([{ id: 3 }])
  const result4 = await fetchAlbums()
  expect(result4).toEqual([])
});

test("mocked function should return values as specified in sequence (resolved)", async () => {
  (fetchAlbums as jest.Mock)
    .mockResolvedValue([])
    .mockResolvedValueOnce([{ id: 1 }])
    
  const result1 = await fetchAlbums()
  expect(result1).toEqual([{ id: 1 }])
  const result2 = await fetchAlbums()
  expect(result2).toEqual([])
});
