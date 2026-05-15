import { create } from 'rxjs-spy'
import { tag } from "rxjs-spy/operators/tag"

import { interval } from 'rxjs'

// BRAKUJĄCA METODA NA INTERFEJSIE
// w oficjalnych typach dla rxjs-spy brakuje na interfejsie tej jednej metody
// wg designu, `undo` powinno być wołane jedynie manualnie, np. z konsoli, a nie z kodu
// ale że chcemy żeby nam się kompilował plik z demo, to ¯\_(ツ)_/¯ rozszerzamy interfejs
// (gdyby nie kontekst szkolenia, nie robilibyśmy tego)
// https://github.com/cartant/rxjs-spy/pull/57#issuecomment-787188079
declare module 'rxjs-spy/cjs/spy-interface' {
  interface Spy {
    undo(...calls: number[]): void;
  }
}

// stream spy "instance"
const spy = create();

const source$ = interval(1000)
// on an existing stream we set a "tag", which will control this point of the stream
const spied$ = source$.pipe(
  tag("lookup"),
)

spied$.subscribe(console.log)

spy.show() // console.group
spy.show("lookup") // filtered

spy.log() // log each notification
spy.log("lookup") // log, filtered

spy.undo() // list of all things to teardown

const deck = spy.pause("lookup")
// or: spy.deck() // list all decks
// or: const deck = spy.deck(1) // get deck
deck.log() // log all
deck.step() // release one notification (next / complete / error)
deck.resume() // release all
