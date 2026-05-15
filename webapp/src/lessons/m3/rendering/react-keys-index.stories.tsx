/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState } from 'react';

import { Button } from 'ui/atoms';
import { Description, TextField } from 'ui/molecules';
import { Section } from 'ui/layout';

import { getShortId } from './short-id' // JS imported into TS

export const ReactKeysIndex = () => {
  const [items, setItems] = useState([
    { id: getShortId(), name: getShortId() },
    { id: getShortId(), name: getShortId() }
  ])
  const addItem = () => {
    setItems([{ id: getShortId(), name: getShortId() + '' }, ...items])
  }

  return <>
    <Description header="React:keys index">{Block => <>
      <Block>DEMO: wpisz tekst do wszystkich inputów, a następnie kliknij "add", które dodaje element na początku arraya</Block>
      <Block>PROBLEM: w przypadku pierwszym (key=index) React gubi powiązanie między elementami DOM a swoim wirtualnym drzewem. Przypadek jest szczególny, bo zarówno dodajemy z przodu listy, jak i inputy są uncontrolled, ale jeśli taki przypadek ma miejsce - tzn. jeśli React nie ma powodu aby komponent przerenderować, to tego nie zrobi, a to może potencjalnie powodować poważne bugi.</Block>
    </>}</Description>

    <h3>index keys</h3>
    {items.map((i, idx) => <Section key={idx}>
      <TextField
        id={i.id + ''}
        label={i.name}
      />
    </Section>)}
    <h3>id keys</h3>
    {items.map((i, idx) => <Section key={i.id}>
      <TextField
        id={i.id + ''}
        label={i.name}
      />
    </Section>)}
    <Button variant="SECONDARY" onClick={addItem}>add</Button>
  </>
}
