/* eslint-disable import/first */
import React, { PropsWithChildren, PropsWithRef } from 'react';
import { renderAction } from 'stories';

import { Description } from 'ui/molecules';
import { useChangingState } from './utils';

import { DummyContextState, DummyStateContext, initialDummyValue, useDummy } from './DummyContext';
import { Button, Typography } from 'ui/atoms';

const Updater: React.FC = () => {
  const { update } = useDummy()
  return <Button variant="SECONDARY" onClick={update}>update</Button>
}

const SampleData: React.FC<{ data: boolean, label: string }> =
  (props) => {
    renderAction('sample data', props.label)
    return <Typography variant="h3">state: {props.data + ''}({props.label})</Typography>
  }

const NoMemo = () => {
  const { loading } = useDummy()
  return <SampleData data={loading} label="no memo" />
}

/**
 * 🔥 🔥 🔥 PROOF OF CONCEPT
 * analogicznie do `react-redux`:connect HOC
 * natomiast wielu rzeczy nie obsługujemy
 */
const ConnectedToDummy = <TSelectorResult, TProps extends TSelectorResult>(
  contextSelector: (ctxValue: DummyContextState) => TSelectorResult,
  Component: React.FC<TProps>,
) => {
  const Memoized = React.memo(Component) as any as React.FC<TProps>
  const Connected: React.FC<Omit<TProps, keyof TSelectorResult>> = (props) => {
    const ctx = useDummy()
    const selected = contextSelector(ctx)
    return <Memoized children={props.children} {...props} {...selected as TProps} />
  }
  return Connected
}

// 🔥 analogicznie co `react-redux`:connect
const ConnectedMemoizedConsumer = ConnectedToDummy(
  ctx => ({ data: ctx.loading }), SampleData,
)

const ChildrenProvider: React.FC = (props) => {
  const { children } = props
  const [state, update] = useChangingState(initialDummyValue)
  renderAction('Provider')
  return <DummyStateContext.Provider value={{ ...state, update }}>
    { children }
  </DummyStateContext.Provider>
}

export const ConnectedAndMemoized = () => {
  return <>
    <Description header="Context-Connected and Memoized Components">{Block => <>
      <Block>Mamy tu wyrenderowane kolejno: <code>Updater</code> (button), <code>NoMemo</code> (napis loading) oraz <code>ConnectedMemoizedConsumer</code> (drugi raz to samo, ale connected & memoized)</Block>
      <Block>Kontekst jest 1 (state oraz dispatch w tym samym kontekście) - dlatego, kiedy zmieni się wartość kontekstu, to <code>Updater</code> również się renderuje. Domyślnie konteksty, niestety, tak mają.</Block>
      <Block><code>NoMemo</code> - subskrybuje kontekst i ciągnie z niego dane. Renderuje się, kiedy zmienia się wartość</Block>
      <Block><code>ConnectedMemoizedConsumer</code> - subskrybuje kontekst, tak samo jak <code>NoMemo</code> - ale tu jest dodatkowo zmemoizowany. To jest <strong>Proof of Concept</strong> (niegotowy do produkcyjnego zastosowania) analogicznego rozwiązania, które ma Redux... Otóż - Reduxowy <strong>Connected component</strong> subskrybuje store'a i jednocześnie uruchamia selektory. Nawet jeśli wartość stanu w storze się zmieniła - ale selektor cały czas <strong>zwraca to samo</strong>, to komponent <strong>nie będzie przerenderowany</strong>, bo to nie miałoby sensu. Konteksty domyślnie takiego rozwiązania NIE implementują. I ten tutaj ConnectedMemoized to Proof of Concept analogicznego mechanizmu - aby zasubskrybować na kontekst, uruchamiać selektora - i dopóki wartość jest ta sama - "odbijać" rendery na poziomie <code>memo</code>. A Redux daje nam to out-of-the-box.</Block>
      <Block><strong>sample data</strong> występuje poniżej 2 razy (NoMemo oraz Connected) - ale rendery idą tylko na jednym, bo Memoized "odbija" niepotrzebne rerendery</Block>
    </>}</Description>
    <ChildrenProvider>
      <Updater />
      <NoMemo />
      <ConnectedMemoizedConsumer label="connected & memoized" />
    </ChildrenProvider>
  </>
}
