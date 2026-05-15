jest.mock("./AlbumDAO");
import * as AlbumDAO from "./AlbumDAO";

test("module should have all functions mocked", () => {
  expect(AlbumDAO.baseURL).toMatchInlineSnapshot(
    `"https://jsonplaceholder.typicode.com"`
  );
  expect(AlbumDAO.fetchAlbums).toBeInstanceOf(Function);
  expect(AlbumDAO.saveAlbums).toBeInstanceOf(Function);
});
