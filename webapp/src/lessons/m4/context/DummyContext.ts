import { createContext, useContext } from "react"

import { mockPersons, Person } from 'mocks';

export type DummyContextState = {
  persons: Person[]
  loading: boolean
  error?: Error
  update: () => void
}

export const initialDummyValue: DummyContextState = {
  persons: mockPersons,
  loading: false,
  update: () => {},
}

export const DummyStateContext = createContext<DummyContextState>(initialDummyValue)

export const useDummy = () => {
  return useContext(DummyStateContext)
}
