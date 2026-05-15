jest.mock("./AlbumDAO", () => ({
  saveAlbums: async () => {}
}));
import * as AlbumDAO from "./AlbumDAO";

test("module should have only the specified elements mocked", () => {
  expect(AlbumDAO.baseURL).toBeUndefined(); // ❗️ nie ma
  expect(AlbumDAO.fetchAlbums).toBeUndefined(); // ❗️ nie ma
  expect(AlbumDAO.saveAlbums).toBeInstanceOf(Function);
});
