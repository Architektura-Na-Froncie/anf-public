export interface Participant {
  id: number
  name: string
}

export const fetchParticipants = async (): Promise<Participant[]> => {
  // some dummy resource
  const response = await fetch('http://jsonplaceholder.typicode.com/users')
  return response.json()
}
