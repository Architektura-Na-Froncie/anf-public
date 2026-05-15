/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useRef, useState } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';

import { Button } from 'ui/atoms';
import { Description } from 'ui/molecules';

import { v4 as uuid } from 'uuid'
import { connect, Provider, useDispatch, useSelector } from 'react-redux';
import { getStore, changeProperty, SampleState } from './redux-sample'
import { renderAction } from 'stories';
import { Section } from 'ui/layout';

import { lessons } from 'stories';
export default {
  title: lessons.m5.add('Redux').toString(),
  argTypes: {
  },
} as Meta;

const Consumer: React.FC<{ prop: string, value: string }> = ({ prop, value }) => {
  renderAction(`ConnectConsumer${prop}`)
  return <>value A is: { value }</>
}

const ConnectConsumerA = connect((state: SampleState) => ({ prop: "A", value: state.A }))(Consumer)
const ConnectConsumerB = connect((state: SampleState) => ({ prop: "B", value: state.B }))(Consumer)

const UseSelectorConsumerA = () => {
  renderAction('UseSelectorConsumerA')
  const A = useSelector((state: SampleState) => state.A)
  return <>value A is: { A }</>
}

const UseSelectorConsumerB = () => {
  renderAction('UseSelectorConsumerB')
  const B = useSelector((state: SampleState) => state.B)
  return <>value B is: { B }</>
}

const DispatchConsumer = () => {
  renderAction('DispatchConsumer')
  const dispatch = useDispatch()
  return <>
    <Button variant="SECONDARY" onClick={() => dispatch(changeProperty("A", uuid()))}>change A</Button>
    <Button variant="SECONDARY" onClick={() => dispatch(changeProperty("B", uuid()))}>change B</Button>
  </>
}

export const ReduxUseSelector = () => {
  return <>
    <Description header="Redux useSelector">{Block => <>
      <Block>Komponent-konsument czytający z kontekstu poprzez <code>useSelector</code> albo <code>connect</code> przerenderowuje się tylko wtedy, gdy zmieni się kawałek stanu, na który subskrybuje w "selektorze".</Block>
      <Block>A Komponent-konsument używający jedynie <code>dispatch</code> nie ma w ogóle potrzeby się przerenderowywać.</Block>
    </>}</Description>
    <Provider store={getStore()}>
      <Section><ConnectConsumerA /></Section>
      <Section><UseSelectorConsumerA /></Section>
      <Section><ConnectConsumerB /></Section>
      <Section><UseSelectorConsumerB /></Section>
      <Section><DispatchConsumer /></Section>
    </Provider>
  </>
}
