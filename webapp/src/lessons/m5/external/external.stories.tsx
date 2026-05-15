/* eslint-disable import/first */
import React, { memo, useState, useRef, useEffect } from 'react';
import { Meta } from '@storybook/react/types-6-0';

import { lessons, renderAction } from 'stories';
import { Button } from 'ui/atoms';

export default {
  title: lessons.m5.add('External').toString(),
  argTypes: {
  },
} as Meta;

const delay = (ms: number) => {
  return new Promise((res, rej) => {
    setTimeout(res, ms)
  })
}

type SubscribeFn = () => void

/**
 * 🤓 KONTEKST:
 * 
 * istnieje pewien obiekt ze swoim stanem
 * i chcemy go modyfikować - a jego aktualizacje wyświetlać w Reakcie.
 * ALE 😱 ten obiekt jest poza ekosystemem Reacta - React nie potrafi śledzić na nim zmian
 * i wiąże się z tym masa spraw, o które muszą się zatroszczyć narzędzia typu external-state (Redux, MobX, ...)
 */
class StatefulObject {

  state = {
    type: "INITIAL"
  }

  log(){
    renderAction('update', this.state.type)
  }
  
  // subscriberFn?: SubscribeFn
  // subscribe(fn: SubscribeFn){
  //   this.subscriberFn = fn
  // }
  notify(){
    // this.subscriberFn?.()
  }

  async execute(){
    this.state.type = "STARTED" // 👀 mutable
    // this.state = { // 👀 immutable
    //   ...this.state, 
    //   type: "STARTED"
    // }
    this.notify()
    this.log()

    await delay(1000)

    this.state.type = "IN PROGRESS" // 👀 mutable
    // this.state = { // 👀 immutable
    //   ...this.state, 
    //   type: "IN PROGRESS"
    // }
    this.notify()
    this.log()
    await delay(1000)

    this.state.type = "COMPLETE" // 👀 mutable
    // this.state = { // 👀 immutable
    //   ...this.state, 
    //   type: "COMPLETE"
    // }
    this.notify()
    this.log()
  }
}


/**
 * 😈 Przygotowany stan jest celowo zagnieżdżony, żeby zahaczyć o trudniejszy przypadek (kwestia zmiennych referencji). Z prymitywami byłoby łatwiej.
 * 😈 i żeby referencje miały znaczenie, zaraz zmemoizujemy komponent
 * 🤔 powyższe czynniki (a także inne) muszą być obsłużone w przypadku integrowania stanu zewnętrznego
 */
type Stateful = {
  state: {
    type: string
  }
}

const StatefulInfo: React.FC<Stateful> = /* memo */((props) => {
  return <pre>state: {props.state.type}</pre>
})

const useForceRender = () => {
  const [, setState] = useState<{}>()
  return () => setState({})
}

const externalState = new StatefulObject()

export const Example = () => {
  const stateful = useRef(externalState)

  // const forceRender = useForceRender()
  // useEffect(() => {
  //   stateful.current.subscribe(forceRender)
  // }, [stateful, forceRender])

  return <>
    <StatefulInfo state={stateful.current.state} />
    <Button variant="SECONDARY" onClick={() => stateful.current.execute()}>execute</Button>
  </>
}















/**
 * DEMO:
 * 0. co robi execute? w metodzie symulujemy sekwencję asynchronicznych zmian, które potem oglądamy w storybooku
 * 1. mutable object; klikamy "execute" w storybooku (widzimy w addon/actions kiedy obiekt zmienia stan).
 *    actions są, ale komponent leży drętwy - nie działa :)
 * 2. dodajemy subscribe - komponent renderuje aktualny stan
 *    potrzebne wysłanie sygnału do komponentu: "TERAZ!"
 * 3. dodajemy memo(StatefulInfo) - znowu nie działa
 *    bo referencja jest ta sama (React wymaga niemutowalności)
 * 4. immutable & memo(StatefulInfo) - komponent renderuje stan po zmianie
 *    musimy stworzyć nowe referencje po każdej zmianie, w przeciwnym razie niektóre update'y zostaną zignorowane
 *    (memo, PureComponent, useEffect, etc.)
 *    WAŻNE: same nowe referencje to za mało. Komponent musi dodatkowo wiedzieć KIEDY stan się zmienia (bo React mu tego nie powie, bo stan przecież jest zewnętrzny).
 *    Dlatego - żeby powyższy komponent z memo/Pure/... renderował się - trzeba ZARÓWNO zapewnić niemutowalność + zapiąć subskrypcję ("kiedy zmiana")
 */
