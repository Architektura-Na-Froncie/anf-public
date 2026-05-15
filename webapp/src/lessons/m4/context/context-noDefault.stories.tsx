/* eslint-disable import/first */
import React, { createContext, useContext } from 'react';

import { Description, CheckboxField } from 'ui/molecules';

import { useChangingState } from './utils';
import { Person } from 'mocks';
import { ItemsList } from 'lessons/m3/typescript/RenderProp';


import { initialDummyValue } from './DummyContext';
import { useToggle } from 'ui/hooks';

type DummyContextState = {
  persons: Person[]
  loading: boolean
  error?: Error
  update: () => void
}

/*
export const initialDummyValue: DummyContextState = {
  persons: mockPersons,
  loading: false,
  update: () => {}, // this makes no sense!
}
export const DummyStateContext = createContext<DummyContextState>(initialDummyValue)
*/

const DummyStateContext = createContext<DummyContextState | undefined>(undefined)

const useDummy = () => {
  const ctx = useContext(DummyStateContext)

  if (!ctx) {
    throw new Error('Component beyond DummyContext!')
  }

  return ctx
}

const DummyProvider: React.FC = (props) => {
  const { children } = props
  const [state, update] = useChangingState(initialDummyValue)
  return <DummyStateContext.Provider value={{ ...state, update }}>
    { children }
  </DummyStateContext.Provider>
}

const DummyListing: React.FC = () => {
  const { persons } = useDummy()

  return <ItemsList
    items={persons}
    renderItem={p => <span>{p.firstName} {p.lastName}</span>}
  />
}

export const NoDefaultValue_WithinContext = () => {
  return <>
    <Description header="No Default Value Context">{Block => <>
      <Block>PROBLEM: jeśli kontekst jest stanowy, a konteksty aplikacyjne (tj. tworzone w aplikacji, a nie brane z zewn. bibliotek) bardzo często są stanowe, to jaką domyślną wartość należy umieścić dla funkcji, które modyfikują stan kontekstu?</Block>
      <Block>Pamiętajmy, że w przypadku danych statycznych (niezmiennych w czasie) kontekst nie jest konieczny - można zastosować zwykły JSowy statyczny <code>import</code>.</Block>
      <Block>Jeśli zaś dane się zmieniają, to musi być funkcja, która modyfikuje stan. I ta funkcja będzie istniała dopiero w jakimś komponencie, który korzysta z <code>setState</code>/<code>useState</code>/<code>useReducer</code>. A w momencie tworzenia kontekstu (poza komponentem), taka funkcja nie może istnieć - i nie ma sensownej wartości domyślnej.</Block>
      <Block>ROZWIĄZANIE: skoro sensowna wartość domyślna nie istnieje - to jej nie twórzmy. Rozszerzamy typ kontekstu o <code>undefined</code>, to właśnie czynimy wartością domyślną. Provider wewnętrznie tworzy właściwą wartość kontekstu. Zaś konsumpcja kontekstu - która odnosi się zarówno do typu kontekstu jak i <code>undefined</code>, używa TS type guards w celu "odsiania" <code>undefined</code>, rzucając wyjatek (fail-fast), jeśli komponent znajduje się poza kontekstem (w przypadku stanowego kontekstu komponent-konsument poza kontekstem i tak nie ma sensu, więc fail-fast jak najbardziej pasuje).</Block>
    </>}</Description>
    <DummyProvider>
      <DummyListing />
    </DummyProvider>
  </>
}

export const NoDefaultValue_OutsideContext = () => {
  const [checked, toggle] = useToggle(false)
  return <>
    <Description header="No Default Value Context">{Block => <>
      <Block>Komponent konsumujący kontekst, znajdując się poza kontekstem, wybucha (fail-fast).</Block>
      <Block>Jeśli w praktyce taki błąd się przydarza, oznacza on błędną konfigurację modułu (błedne umiejscowienie kontekstów w stukturze aplikacji). Błąd wychwytywany bardzo wcześnie, niesie minimalne ryzyko wystąpienia na produkcji, jeśli aplikacja jest testowana.</Block>
      <Block>Kliknięcie checkboxa spowoduje, że dodatkowo (warunkowo) wyświetli się komponent, który akurat subskrybuje kontekst. I wtedy załączy się subskrybujący hook, który wybuchnie.</Block>
    </>}</Description>
    <CheckboxField
      id="demo-checkbox"
      label="zaznacz aby wyświetlić komponent"
      defaultChecked={checked}
      onChange={toggle}
    />
    {checked && <DummyListing />}
  </>
}
