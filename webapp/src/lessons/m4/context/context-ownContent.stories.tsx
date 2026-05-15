/* eslint-disable import/first */
import React from 'react';

import { Description } from 'ui/molecules';

import { renderAction } from 'stories';
import { useChangingState } from './utils';


import { DummyStateContext, initialDummyValue } from './DummyContext';
import { DummyDispatcher, DummyListing } from './DummyComponents';

const NonSubscriber = () => {
  renderAction('NonSubscriber')
  return <>
    <p>some non-subscribing content</p>
    <DummyListing />
  </>
}



const OwnProvider = () => {
  const [state, update] = useChangingState(initialDummyValue)
  renderAction('Provider')
  return <DummyStateContext.Provider value={{ ...state, update }}>
    <DummyDispatcher />
    <NonSubscriber />
  </DummyStateContext.Provider>
}

export const OwnContent = () => {
  return <>
    <Description header="Context with Own Content">{Block => <>
      <Block>Ten <code>Provider</code> w swojej deklaracji zawiera wywołania komponentów. Wie, jak je tworzyć, sam przekazuje im propsy itp.</Block>
      <Block>W konsekwencji - kiedy Provider się renderuje, jak każdy komponent renderuje całą swoją zawartość. Wszystkie jego komponenty-dzieci podlegają renderom "od rodzica". Nawet jeśli wartość kontekstu się nie zmienia, a Provider się renderuje - dzieci razem z nim także.</Block>
    </>}</Description>
    <OwnProvider />
  </>
}



const ChildrenProvider: React.FC = (props) => {
  const { children } = props
  const [state, update] = useChangingState(initialDummyValue)
  renderAction('Provider')
  return <DummyStateContext.Provider value={{ ...state, update }}>
    <DummyDispatcher />
    { children }
  </DummyStateContext.Provider>
}

export const ChildrenContent = () => {
  return <>
    <Description header="Context with Children Content">{Block => <>
      <Block>Ten <code>Provider</code> w swojej deklaracji nie ma wywołania własnej zawartości, tylko przekazuje <code>children</code>, które sam otrzymuje od rodzica.</Block>
      <Block>W związku z tym, że sam nie wywołuje komponentów zawartych w <code>children</code>, nie potrafi ich tworzyć, nawet nie wie czym one są ani co zawierają. Rodzic przekazuje mu już "wyprodukowane" komponenty. A ten Provider nimi nie zarządza</Block>
      <Block>W konsekwencji - kiedy Provider się renderuje, NIE może przerenderować dzieci, bo tego nie umie robić. W związku z tym <code>children</code> nie podlega renderom "od rodzica".</Block>
      <Block>Natomiast wśród <code>children</code> są zapewne komponenty konsumujące kontekst - one będą się renderowały "od kontekstu" - i tego nie da się ominąć.</Block>
    </>}</Description>
    <ChildrenProvider>
      <NonSubscriber />
    </ChildrenProvider>
  </>
}
