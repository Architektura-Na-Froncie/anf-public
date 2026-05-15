import { v4 as uuid } from 'uuid';
import { delay } from 'lib/async';

export interface Person {
  id: string
  firstName: string
  lastName: string
  age: number
  address: {
    city: string
    country: string
  }
}

export const mockJohn: Person = {
  id: uuid(),
  firstName: "John",
  lastName: "Lennon",
  age: 40,
  address: {
    city: "Liverpool",
    country: "Great Britain",
  }
}

export const mockPersons: Person[] = [
  mockJohn,
  { ...mockJohn, id: uuid(), firstName: "Paul", lastName: "McCartney" },
  { ...mockJohn, id: uuid(), firstName: "George", lastName: "Harrison" },
  { ...mockJohn, id: uuid(), firstName: "Ringo", lastName: "Starr" },
]

export const fetchMockPersons = async () => {
  await delay(1000)
  return mockPersons
}
