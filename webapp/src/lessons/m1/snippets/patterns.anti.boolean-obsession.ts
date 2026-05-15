export {}

// mamy jakieś tamm dane...
type Data = number

// i budujemy typ stanu, który ma sporo pól opcjonalnych 😓
type StateBefore = {
  loading: boolean
  error?: Error
  data?: Data
}

// dlaczego "boolean obsession"?
// Bo mamy ewidentnie trzy stany: LOADING, SUCCESS, ERROR
//
// A boolean, będąc JEDYNYM property dostępnym na obiekcie zawsze, jest polem, od którego najczęściej ludzie zaczyną IFy. No bo tylko ono na pewno istnieje
// Ale boolean mieści tylko 2 wartości, a my mamy do czynienia z 3.

// wnioski?
// 1. Przydałaby się reprezentacja która uwzględni 3 stany (i pozwoli dodawać kolejne)
// 2. Przy powyższej definicji można stworzyć stany nieprawidłowe 😓

let state: StateBefore
state = { loading: true } // ✅
state = { loading: false } // 😱 ani loading, ani error, ani data
state = { loading: true, error: new Error(), data: 125 } // 😱 na bogato - wszystkie stany naraz
// wbrew pozorom, opcjonalność jest ryzykowna 🔥
// niewłaściwie używana bardziej szkodzi niż pomaga...


// w miarę jak aplikacja się rozrasta, booleany często przestają być wystarczające i trzeba je refaktorować. Jeśli się da zrefaktorować, pół biedy; a jeśli refactor jest za drogi, to się robi obejścia na złym designie.

// wniosek:
// jeśli komponent na starcie ma co najmniej 2 stany, warto zacząć od enumów niż od booleana
// bo jak dojdą kolejne stany, to rozszerzamy enuma
// zamiast wylewać kolejną warstwę gnoju 💩 i zagnieżdżać IFy

type StateAfter =
  | { type: "LOADING" }
  | { type: "ERROR", error: Error }
  | { type: "DATA_LOADED", data: Data }

let s: StateAfter
s = { type: "LOADING" } // boolean jest niepotrzebny, bo został wchłonięty przez enuma
s = { type: "ERROR" } // nie można rozspójnić stanu
s = { type: "ERROR", error: new Error(), data: 125 } // i, dopóki używamy literałów (chroni nas excessive attribute check) nie można dać nadmiarowych
