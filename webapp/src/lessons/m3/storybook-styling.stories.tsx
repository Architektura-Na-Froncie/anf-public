/* eslint-disable import/first */
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';

import styled, { css } from 'styled-components';
import { action } from '@storybook/addon-actions';

import { lessons } from 'stories';
export default {
  title: lessons.m3.add('Broken child').toString(),
  argTypes: {
  },
} as Meta;

/*****************************************************************************
 * FIXME! FIXME! FIXME! - to jest tylko prototyp do zainicjowania dyskusji.  *
 * Zdecydowanie wymaga poprawienia!                                          *
 *****************************************************************************/

const AppBox = styled.div<{ height?: number, marginBottom?: number }>`
  background: rgba(0, 0, 0, .15);
  height: ${(props) => props.height || 20}px;
  width: 100%;
  margin: 0 0 ${(props) => typeof props.marginBottom === 'number' ? props.marginBottom : 15}px;
`;

const AppUI = styled.div`
  display: flex;
  flex-flow: row nowrap;
  background: #fff;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const AppMenu = styled.div`
  display: flex;
  flex-flow: column;
  flex: 0 0 180px;
  max-width: 800px;
  width: 100%;
  padding: 15px;
  border-right: 1px solid #ccc;
`;

const DummyAppContent: React.FC = (props) => {
  return <AppUI>
    <AppMenu>
      <AppBox height={60} marginBottom={50} />
      <AppBox />
      <AppBox />
      <AppBox />
      <AppBox />
      <AppBox marginBottom={50} />

      <AppBox />
      <AppBox />
      <AppBox marginBottom={50} />

      <div style={{ display: 'flex', flexFlow: 'row nowrap', margin: 'auto 0 0', alignItems: 'center' }}>
        <div style={{ display: 'block', borderRadius: '50%', width: '40px', height: '40px', flex: '0 0 40px', background: 'rgba(0, 0, 0, .15)' }}></div>
        <div style={{ flex: '1 1 auto', marginLeft: '15px' }}>
          <AppBox height={15} marginBottom={10} />
          <AppBox height={15} marginBottom={0} style={{ width: '75%' }}/>
        </div>
      </div>
    </AppMenu>
    <main style={{ display: 'flex', flexFlow: 'column', flex: '1 1 auto', justifyContent: 'flex-start', padding: '15px'  }}>
      <div style={{ display: 'flex', flexFlow: 'row no-wrap', justifyContent: 'flex-end', flex: '0 0 auto', paddingBottom: '15px' }}>
        <AppBox style={{ width: '120px', marginBottom: 0 }} />
        <AppBox style={{ width: '120px', marginBottom: 0, marginLeft: '15px' }} />
      </div>
      <AppBox style={{ width: '100%', flex: '0 0 calc(40% - 15px)', marginBottom: '15px' }} />
      <div style={{ flex: '0 0 calc(28% - 15px)', display: 'flex', flexFlow: 'row no-wrap', marginBottom: '15px' }}>
        <AppBox style={{ height: '100%', flex: '0 0 calc(50% - 10px)', marginBottom: 0, marginRight: '10px' }} />
        <AppBox style={{ height: '100%', flex: '0 0 calc(50% - 10px)', marginBottom: 0, marginLeft: '10px' }} />
      </div>
      <div style={{ flex: '0 0 calc(28% - 15px)', display: 'flex', flexFlow: 'row no-wrap' }}>
        <AppBox style={{ height: '100%', flex: '0 0 calc(50% - 10px)', marginBottom: 0, marginRight: '10px' }} />
        <AppBox style={{ height: '100%', flex: '0 0 calc(50% - 10px)', marginBottom: 0, marginLeft: '10px' }} />
      </div>
    </main>
    <footer></footer>
    <NotificationsContainer>
      {props.children}
    </NotificationsContainer>
  </AppUI>
}


const NotificationsContainer = styled.div`

`;

const Notification = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
  background: #333;
  color: #fff;
  font-weight: normal;
  padding: 15px 20px;
  border-radius: 8px;
`;

const CloseButton = styled.button`
  padding: 0;
  background: none;
  border: none;
  appearance: none;
  box-shadow: none;
  text-transform: uppercase;
  font-size: inherit;
  color: inherit;
  margin: 0 .5rem;
  cursor: pointer;
  font-weight: bold;
`
CloseButton.defaultProps = { type: 'button' };

export const ChildWithParent = () => <>
  <DummyAppContent>
    <Notification>
      Akcja została wykonana pomyślnie.
      {' '}
      <CloseButton>Zamknij</CloseButton>
    </Notification>
  </DummyAppContent>
</>

export const ChildOnly = () => <>
  <Notification>
    Akcja została wykonana pomyślnie.
    {' '}
    <CloseButton>Zamknij</CloseButton>
  </Notification>
</>

import { Panel } from 'ui/layout';
import { Button, Typography } from 'ui/atoms';
import { ButtonList, Editor } from 'ui/molecules';
import { RichtextTask } from 'api/exams';

const exampleRichTextTask: RichtextTask = {
  type: 'RICHTEXT',
  id: '317b9c4e-77d0-4c6c-9fa5-31e1df7ea1f4',
  question: "How worried are you about global warming?",
}

export const ChildWithParentLogic = () => {

  return <Panel>
    <Typography variant="h4">{ exampleRichTextTask.question }</Typography>
    <Editor onChange={action('update')} />

    <ButtonList align="center">
      <Button variant="PRIMARY" onClick={action('next')}>
        Next task
      </Button>
    </ButtonList>
  </Panel>
}
