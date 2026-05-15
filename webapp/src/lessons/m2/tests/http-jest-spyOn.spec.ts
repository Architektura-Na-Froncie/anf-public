import { AlbumRepository } from "./AlbumRepository";

describe('jest spyOn', () => {

  it('should make an actual call', async () => {
    // arrange
    const repo = new AlbumRepository()
    const spy = jest.spyOn(repo, 'sync')
    // act
    const album = { userId: 1, id: 1, title: "księga tajemnicza. prolog" }
    repo.add(album)
    // assert
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith()
    spy.mockRestore()
  });

  it('should mock the call', async () => {
    // arrange
    const repo = new AlbumRepository()
    const spy = jest.spyOn(repo, 'sync')
      .mockImplementation(async () => {})
    // act
    const album = { userId: 1, id: 1, title: "księga tajemnicza. prolog" }
    repo.add(album)
    // assert
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith()
    spy.mockRestore()
  });
});
