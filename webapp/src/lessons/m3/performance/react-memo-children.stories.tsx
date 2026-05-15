/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { memo } from 'react';
import { renderAction } from 'stories';

import { useToggle } from 'ui/hooks';
import { CheckboxField, Description } from 'ui/molecules';

const MemoizedComponent: React.FC<{ checked?: boolean }> = memo(
  ({ children, checked }) => {
    renderAction(`render MemoizedComponent`)
    return <div>
      I hereby display my <code>children</code>:
      { children }
      { (checked !== undefined) && <> and { checked ? "is" : "is not" } checked</> }
    </div>
  }
)
MemoizedComponent.displayName = "MemoizedComponent"

export const ReactMemoWithPropsAndTextChildren = () => {
  const [checked, toggle] = useToggle()
  renderAction(`render parent (ReactMemoWithPropsAndTextChildren)`)

  return <>
    <Description header="React.memo z propsem oraz text-children">{Block => <>
      <Block>Zmemoizowany komponent przerenderuje się wtedy, gdy dostanie co najmniej 1 nowego propsa.</Block>
    </>}</Description>
    <CheckboxField
      id="demo-checkbox"
      label="toggle checkbox"
      defaultChecked={checked}
      onChange={toggle}
    />
    <MemoizedComponent checked={checked}>text and props</MemoizedComponent>
  </>
}

export const ReactMemoChildrenTextOnly = () => {
  const [checked, toggle] = useToggle()
  renderAction(`render parent (ReactMemoChildrenTextOnly)`)

  return <>
    <Description header="React.memo z propsem children: text-only">{Block => <>
      <Block>Zmemoizowany komponent nigdy się nie przerenderuje, bo react przekazuje text jako string (prymityw, reprezentowany przez wartość, nie referencję jak obiekt).</Block>
    </>}</Description>
    <CheckboxField
      id="demo-checkbox"
      label="toggle checkbox"
      defaultChecked={checked}
      onChange={toggle}
    />
    <MemoizedComponent>text only</MemoizedComponent>
  </>
}

export const ReactMemoChildrenWithMarkup = () => {
  const [checked, toggle] = useToggle()
  renderAction(`render parent (ReactMemoChildrenWithMarkup)`)

  return <>
    <Description header="React.memo z propsem children-with-markup">{Block => <>
      <Block>Zmemoizowany komponent zawsze się przerenderuje, bo rodzic co chwilę przesyła nowo zbudowane <code>children</code> (children zawiera diva).</Block>
    </>}</Description>
    <CheckboxField
      id="demo-checkbox"
      label="toggle checkbox"
      defaultChecked={checked}
      onChange={toggle}
    />
    <MemoizedComponent>
      <div>text only</div>
    </MemoizedComponent>
  </>
}
