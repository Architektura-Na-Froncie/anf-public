/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { createContext, useContext } from 'react';

import { Button } from 'ui/atoms';
import { Description } from 'ui/molecules';

import { renderAction } from 'stories';
import { useChangingState } from './utils';


import { DummyStateContext, initialDummyValue, useDummy } from './DummyContext';
import { ItemsList } from 'lessons/m3/typescript/RenderProp';

export const DummyListing: React.FC = () => {
  const { persons } = useDummy()
  renderAction('Listing')

  return <ItemsList
    items={persons}
    renderItem={p => <span>{p.firstName} {p.lastName}</span>}
  />
}

const DummyDispatchContext = createContext(() => {})

const useDummyDispatch = () => useContext(DummyDispatchContext)

// utility for components which require both read and write
/**
 * 🔥 Jeśli połączymy oba konteksty w 1 hooku
 * to komponenty uzywające hooka będą z powrotem zubskrybowały oba konteksty
 * a po to ROZBIJAMY konteksty, żeby nier subskrybować OBU
 */
// const useBoth = () => {
//   return [useDummyState(), useDummyDispatch()] as const
// }

const DummySeparateDispatcher = () => {
  const update = useDummyDispatch()
  renderAction('Dispatcher')

  return <Button variant="SECONDARY" onClick={update}>update</Button>
}

const SeparateProviders: React.FC = (props) => {
  const { children } = props
  const [state, update] = useChangingState(initialDummyValue)
  renderAction('Provider')
  return <DummyDispatchContext.Provider value={update}>
    <DummyStateContext.Provider value={state}>
      { children }
    </DummyStateContext.Provider>
  </DummyDispatchContext.Provider>
}

const NonSubscriber = () => {
  renderAction('NonSubscriber')
  return <>
    <p>some non-subscribing content</p>
    <DummySeparateDispatcher />
    <DummyListing />
  </>
}

export const SeparateContexts = () => {
  return <>
    <Description header="Separate Contexts (getter, setter)">{Block => <>
      <Block>W tym wypadku tworzymy osobne <code>Provider</code>y - jeden na pion odczytu (read), drugi na pion zapisu (write).</Block>
      <Block>Pamiętajmy, że zmiana wartości kontekstu przerenderuje wszystkich konsumentów. Jeśli wartością kontekstu jest zarówno stan (read) jak i funkcje go modyfikujące (write), to zmiana stanu wpływa na zmianę całej zawartości kontekstu. I to że funkcja sama w sobie się nie zmienia jest bez znaczenia, bo bezpośrednia wartość kontekstu się zmienia (zmienia się jej referencja) i następuje rerender wszystkich konsumentów.</Block>
      <Block>Zmiana wartości stanu jest "stracona", bo jak sie zmieni, to logicznie i tak będą rerendery. Ale funkcje modyfikujące kontekst mogą być "stabilne" (nie zmieniać referencji) - wydzielamy je do "technicznego", osobnego kontekstu. Ten kontekst z założenia nigdy nie zmieni swojego stanu.</Block>
      <Block>W konsekwencji zyskujemy to, że komponenty modyfikujące kontekst (jednocześnie NIE czytające z niego stanu) nie będą przerenderowywane.</Block>
    </>}</Description>
    <SeparateProviders>
      <NonSubscriber />
    </SeparateProviders>
  </>
}
