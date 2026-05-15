/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { createContext, memo, useCallback, useContext, useReducer, useState } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';

import produce from 'immer'
import { Button } from 'ui/atoms';
import { Section } from 'ui/layout';
import { Person, mockJohn } from 'mocks';
import { TextField } from 'ui/molecules';

import { lessons } from 'stories';
export default {
  title: lessons.m5.add('Immer').toString(),
  argTypes: {
  },
} as Meta;

type PersonState = Person
const initialStateValue: PersonState = mockJohn

const PersonStateContext = createContext<PersonState>(initialStateValue)

type PersonUpdate = (update: (value: PersonState) => void) => void

const PersonUpdateContext = createContext<PersonUpdate>(() => {})

// ten hook jest wykorzystywany jako 1 z 3 (alternatywnych) rozwiązań w PersonProvider poniżej
function useImmutableState<TState>(initial: TState){
  const [state, setState] = useState(initial)

  // stateless callback, DOESN'T cause rerenders
  const updateState = useCallback((update: (value: TState) => void) =>
    setState(produce(update) as any),
    []
  )
  // stateful callback, CAUSES rerenders
  // const updateState = useCallback((update: (value: TState) => void) =>
  //   setState(produce(state, update)),
  //   [state]
  // )

  return [state, updateState] as const
}



const PersonProvider: React.FC = (props) => {
  const { children } = props

  // każde z 3 rozwiązań działa

  // inline:
  // const [state, setState] = useState(initialStateValue)
  // const updateState = (update: (value: PersonState) => void) => setState(produce(state, update))

  // custom hook extracted:
  // const [state, updateState] = useImmutableState(initialStateValue)

  // 🔥 immer-based useReducer
  const [state, updateState] = useReducer(produce as any, initialStateValue) as any
  // reducer ma sygnaturę: (STATE, ACTION) => STATE
  // a produce: (STATE, TRANSFORM-FN) => STATE
  // (!) sprytne rozwiązanie polega na potraktowaniu transforma jako akcji
  // wówczas konsumenci wysyłają nie akcje, tylko funkcje tranformujące, zaś immer opędza niemutowalność
  // jest tylko problem z typami :( typy reacta i immera są niekompatybilne
  // (state unknown bo nie może wywnioskować generyka z czegoś co samo jest generykiem)
  // (zaś updateState wnioskuje jako dispatchWithoutAction, które nie pozwoli przyjąć parametru - akcji)
  // powyżej - w konsekwencji [S,U] jest any więc i oba elementy są typu any i wpychając je do providera - wchodzi any

  return <PersonStateContext.Provider value={state}>
    <PersonUpdateContext.Provider value={updateState}>
      {children}
    </PersonUpdateContext.Provider>
  </PersonStateContext.Provider>
}

// read only
const PersonInfo = () => {
  const person = useContext(PersonStateContext)
  return <Section>
    {person.firstName} {person.lastName}, age: {person.age},
    address: {person.address.city}, {person.address.country}
  </Section>
}

// read write
const PersonName = () => {
  const person = useContext(PersonStateContext)
  const update = useContext(PersonUpdateContext)
  const changeProp = <K extends keyof PersonState>(
    key: K, value: PersonState[K]) => update(e => { e[key] = value }
  )

  return <Section>
    <TextField
      id="firstname"
      label="first name"
      defaultValue={person.firstName}
      onChange={value => changeProp('firstName', value)}
    />
    <TextField
      id="lastname"
      label="last name"
      defaultValue={person.lastName}
      onChange={value => changeProp('lastName', value)}
    />
  </Section>
}

// write only
const PersonAge = memo(() => {
  const update = useContext(PersonUpdateContext)
  const makeOlder = useCallback(() => update(e => { e.age += 1 }), [update])
  return <Section>
    <Button variant="SECONDARY" onClick={makeOlder}>make him older</Button>
  </Section>
})
PersonAge.displayName = "PersonAge"

export const ImmerProvider = () => {
  return <PersonProvider>
    <PersonInfo />
    <PersonAge />
    <PersonName />
  </PersonProvider>
}
