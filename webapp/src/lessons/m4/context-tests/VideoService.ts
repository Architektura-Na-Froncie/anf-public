import { Participant } from "./api";

// 🔥 normalnie, oczywiście, rozzbilibyśmy do osobnych plików interfejs, implementację i mocka

export interface VideoService {
  fetchParticipants(): Promise<Participant[]>
}

// 🔥 zapamięta wszystkie wywołania
export class MockVideoService implements VideoService {
  fetchParticipants = jest.fn()
}

// 🔥 zamiast funkcji, która jest w pliku api.ts
export const HTTPVideoService: VideoService = {
  async fetchParticipants(): Promise<Participant[]> {
    // some dummy resource
    const response = await fetch('http://jsonplaceholder.typicode.com/users')
    return response.json()
  }
}
