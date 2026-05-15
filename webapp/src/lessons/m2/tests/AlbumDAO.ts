import { Album } from "./Album"

export const baseURL = 'https://jsonplaceholder.typicode.com'

// actual HTTP client
export const fetchAlbums = async (): Promise<Album[]> => {
  const response = await fetch(`${baseURL}/albums`)
  return response.json()
}

export const saveAlbums = async (data: Album[]) => {
  const response = await fetch(`${baseURL}/albums`, {
    method: 'POST',
    body: JSON.stringify(data),
    // ...
  })
  return response.json()
}
