/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { memo, useMemo, useCallback } from 'react';
import { renderAction } from 'stories';
import { Button } from 'ui/atoms';

import { useToggle } from 'ui/hooks';
import { CheckboxField, Description } from 'ui/molecules';

interface MemoizedComponentProps {
  data: { value: number }
  onClick(): void
}
const MemoizedComponent: React.FC<MemoizedComponentProps> = memo(
  (props) => {
    renderAction(`render MemoizedComponent`)
    return <div>
      This is my data value: <code>{props.data.value}</code>
      <Button variant="SECONDARY" onClick={props.onClick}>this is my button</Button>
    </div>
  }
)
MemoizedComponent.displayName = "MemoizedComponent"

export const ReactUseMemoUseCallback = () => {
  const [checked, toggle] = useToggle()
  renderAction(`render parent (ReactUseMemo)`)

  // przy każdym renderze jest nowy obiekt (to nie problem) z nową referencją (to problem)
  // const data = useMemo(() => ({value: 125}), [])
  // const onClick = useCallback(() => alert('elo'), [])

  return <>
    <Description header="dziecko dostaje każdorazowo nową referencję">{Block => <>
      <Block>Komponent-dziecko jest memoizowany, ale co z tego, jeśli (przez nieuwagę?) to dziecko dostaje props z nową referencją każdorazowo.</Block>
      <Block>Fix prosty - trzeba zapewnić "stabilną" referencję (referential equality)</Block>
    </>}</Description>
    <CheckboxField
      id="demo-checkbox"
      label="toggle checkbox"
      defaultChecked={checked}
      onChange={toggle}
    />
    <MemoizedComponent data={{value: 125}} onClick={() => alert('elo')} />
    {/* <MemoizedComponent data={data} onClick={onClick} /> */}
  </>
}
