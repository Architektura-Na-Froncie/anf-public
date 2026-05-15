import React, { useRef, useState } from 'react';
import { action } from '@storybook/addon-actions';

import { Button } from 'ui/atoms';
import { Description } from 'ui/molecules';

const countAction = action('count')

export const ReactRefLostUpdate = () => {
  const [countA, setCountA] = useState(0)
  const countB = useRef(0)

  return <>
    <Description header="React.ref lost update">{Block => <>
      <Block>Wartości przechowywane pod <code>React.ref</code> możemy aktualizować ręcznie. Ale nie powodują one rerenderów Reacta. W momencie, kiedy aktualizujemy wartość <code>ref</code>a, jesteśmy sami odpowiedzialni za jego aktualizację.</Block>
      <Block>W poniższym kodzie A jest śledzone przez Reacta (<code>useState</code>), zaś B jest pod <code>useRef</code>. Aktualizacja B nie powoduje rerendera, choć wartość została zaktualizowana. Jeśli później zaktualizujemy A, to spowoduje rerender i wyświetlona zostanie również najświeższa wartość B.</Block>
    </>}</Description>
    <p>values: A={countA}, B={countB.current}</p>
    <Button
      variant="PRIMARY"
      onClick={() => {
        setCountA(a => a+1)
        countAction('a')
      }}
    >inc A</Button>
    <Button
      variant="PRIMARY"
      onClick={() => {
        countB.current += 1
        countAction('b')
      }}
    >inc B</Button>
  </>
}
