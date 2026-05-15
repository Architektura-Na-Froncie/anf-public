import React from 'react';
import { ItemsList } from "lessons/m3/typescript/RenderProp"
import { useDummy } from "./DummyContext"
import { Button } from 'ui/atoms';

// just displaying a list
export const DummyListing: React.FC = () => {
  const { persons } = useDummy()

  return <ItemsList
    items={persons}
    renderItem={p => <span>{p.firstName} {p.lastName}</span>}
  />
}

export const DummyDispatcher = () => {
  const { update } = useDummy()

  return <Button variant="SECONDARY" onClick={update}>update</Button>
}
