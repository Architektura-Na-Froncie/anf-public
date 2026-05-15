jest.mock("./AlbumDAO", () => ({
  saveAlbums: async () => {}
}));
import * as AlbumDAO from "./AlbumDAO";
const { fetchAlbums } = jest.requireActual('./AlbumDAO');

test(`module should have only the specified elements mocked
          and original items imported via requireActual are available`, () => {
  expect(AlbumDAO.baseURL).toBeUndefined(); // ❗️ nie ma
  expect(fetchAlbums).toBeInstanceOf(Function); // ❗️ jest, prawdziwe
  expect(AlbumDAO.saveAlbums).toBeInstanceOf(Function);
});
