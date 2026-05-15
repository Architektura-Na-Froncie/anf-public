import React from 'react';
import { action } from '@storybook/addon-actions';
import { useStepper } from 'stories';

import { Button } from 'ui/atoms';
import { Description } from 'ui/molecules';
import { Section } from 'ui/layout';

import { TextTask } from 'api/exams'
import { TextTaskView } from 'ui/tasks/TextTaskView'

const tasks: TextTask[] = [{
  type: 'TEXT',
  id: '222bb37c-4a0a-11eb-b378-0242ac130002',
  question: "How much does a banana cost?",
}, {
  type: 'TEXT',
  id: 'fe5eaea6-040e-4ca4-9c61-cd77314b703c',
  question: "How many water drops are in the ocean?",
}, {
  type: 'TEXT',
  id: '01611500-b310-45b0-81ff-16e7ccb19e08',
  question: "Are you living the life of your dreams?",
}, {
  type: 'TEXT',
  id: '205bca17-74b0-4f73-9122-23cb13393bb7',
  question: "What would you do if fear was not a factor and you could not fail?",
}, {
  type: 'TEXT',
  id: '358c75a5-638e-44c6-bcaa-9bfde4335743',
  question: "What were you doing when you felt most passionate and alive?",
}]

export const ReactKeysUnmount = () => {
  const { current: currentTask, idx, isFirst, isLast, next, prev } = useStepper(tasks)
  if (!currentTask){
    return "no items"
  }

  return <>
    <Description header="React:keys unmount">{Block => <>
      <Block>DEMO: wypełniaj odpowiedzi na trudne pytania, przechodząc do następnych.</Block>
      <Block>PROBLEM: stan ze starego pytania (komponentu) przechodzi do nowego. Sytuacja ma miejsce, kiedy przed renderem i po renderze w tym samym miejscu występuje ten sam komponent - choć w naszym kodzie logicznie on może reprezentować całkowicie inną encję/obiekt. Jeśli przekażemy komponentowi jedynie nowe propsy, react go przerenderuje z nowymi propsami - ale dotychczasowy stan zachowa.</Block>
      <Block>odkomentuj linijkę defniującą key attribute, aby resetować stan</Block>
    </>}</Description>
    {/* {currentTask.id} */}
    <TextTaskView
      // key={currentTask.id}
      task={currentTask}
      onAnswerChange={action('answer changed')}
    />
    <Section>
      <Button variant="SECONDARY" disabled={isFirst} onClick={prev}>prev</Button>
      <Button variant="SECONDARY" disabled={isLast} onClick={next}>next</Button>
    </Section>
  </>
}
