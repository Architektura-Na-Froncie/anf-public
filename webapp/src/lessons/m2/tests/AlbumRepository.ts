import { Album } from "./Album"
import { saveAlbums } from "./AlbumDAO"

export class AlbumRepository {
  private data: Album[] = []

  add(album: Album){
    this.data.push(album)
    this.sync()
  }

  sync(){
    saveAlbums(this.data)
  }
}
