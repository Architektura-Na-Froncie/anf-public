export {}

// 1. CONTROL FLOW ANALYSIS
// och, jak to pięknie brzmi 😍



// to zmieńmy nieco klimat - mamy takie oto zmienne:
declare const trocheSzajsu: true | 0 | 'a' | undefined
declare const trocheSmiecia: false | 1 | null

// i zapodajemy tzw. short-circuit operators 🏎

const or = trocheSzajsu || trocheSmiecia // boolean | "a" | 1 | null
// JS-logical-or-operator działa następująco:
// jeśli wyrażenie-po-LEWEJ jest TRUTHY, to zwracamy wyrażenie-po-LEWEJ
// a jeśli wyrażenie-po-LEWEJ jest FALSY, to zwracamy wyrażenie-po-PRAWEJ

// (true | 0 | 'a' | undefined) OR (false | 1 | null)
//    usuwamy falsy values, go gdyby było falsy, to weżmie wyrażenie-po-PRAWEJ
// (true | 'a' ) OR (false | 1 | null)
//    no i bierzemy wszystkie możliwe wartości wyrażenia-po-PRAWEJ
//                   false | 1 | null
//    ostatecznie
// (true | 'a') | (false | 1 | null)
// (true | false) | ('a' | 1 | null)
// boolean | ('a' | 1 | null)
// boolean | 'a' | 1 | null



// naturalnie, jak odwrócimy OR kolejnością
const orOdwrocony = trocheSmiecia || trocheSzajsu
// to też sobie poradzi, analogicznie:
// true | 0 | 1 | "a" | undefined

// i oczywiście nie zawiedzie nas jak damy logiczne AND
const and = trocheSzajsu && trocheSmiecia
// jak po wyrażenie-po-LEWEJ jest FALSY - kończymy (bo sprawa przegrana)
// więc z lewej bierzemy tylko FALSY values
// a z wyrażenia-po-PRAWEJ bierzemy wszystko

// (true | 0 | 'a' | undefined) && (false | 1 | null)
//     z lewej bierzemy tylko FALSY
// (       0       | undefined) && (false | 1 | null)
//     no i jest
// 0 | undefined | false | 1 | null)


// o w ku!@#$%^&*() 😳
// https://i.makeagif.com/media/2-09-2017/HQlKgP.gif
// TypeScript sporo ogarnia 🤓



// 2. ZAWĘŻANIE TYPÓW (type narrowing)

// zawężanie już nie zrobi takiego wrażenia 😅

if (trocheSzajsu){
  console.log(trocheSzajsu) // przechodzą tylko truthy
}


// 3. ROZSZERZANIE (type widening)

// w zasadzie tylko zmienne `let`
const sztywne_EURO = 'EUR' // "EUR"
let niesztywne_EURO = sztywne_EURO // string


// 4. TYPE GUARDS


// type guardy "chronią i bronią"
// ach ta pandemia

if (typeof trocheSmiecia === 'number'){
  console.log(trocheSmiecia)
}
// tak miedzy nami, to IF na górze, || i && - to wszystko type guardy


// type guardów jest wiele, m.in. na interfejsy:
interface ŁosośNorweski {
  smaczny: boolean
  krajPochodzenia: string
}

function jestŁososiemNorweskim(ryba: any): ryba is ŁosośNorweski {
  return (
    typeof ryba.smaczny == 'boolean'
    && ["Brazylia", "Wietnam", "Chile"].includes(ryba.krajPochodzenia)
  )
}

// niegdyś synonim luksusu - dziś dostępny w Leklerku
declare const rybaZLeklerka: unknown
if (jestŁososiemNorweskim(rybaZLeklerka)){
  console.log(rybaZLeklerka)
}

// możemy też zrobić sobie duże zapasy żywności na kolejny lockdown:
const rozmaiteJedzenie: unknown[] = [
  67, 'elo', true,
  { name: "John Lennon" },
  trocheSmiecia, trocheSzajsu,
  // co kto lubi
]

const tylkoŁososieNorweskie = rozmaiteJedzenie.filter(jestŁososiemNorweskim)

// 👍



// 5. ASSERT FUNCTIONS

// dokończmy to demo konsekwentnie:
// jeśli jedzenie to nie łosoś, to robimy awanturę   (╯°□°)╯︵ ┻━┻
// tzn. rzucamy wyjątek

function awanturaJeśliNieŁosoś(czyżbyŁosoś: unknown): asserts czyżbyŁosoś is ŁosośNorweski {
  if (jestŁososiemNorweskim(czyżbyŁosoś)){
    // jeśli pochodzi z Chile to jeszcze przejdzie
    // ale Brazylia i Wietnam to już nie
    if (czyżbyŁosoś.krajPochodzenia !== 'Chile') { 
      throw new Error('Żądam zwrotu pieniędzy')
    }
  } else {
    throw new Error('Żądam zwrotu pieniędzy')
  }
}


// wracamy do ryby z leklerka:
function obiadWWykwintnejRestauracji(){
  rybaZLeklerka // unknown
  awanturaJeśliNieŁosoś(rybaZLeklerka)
  rybaZLeklerka
  // 👍
}

// jakie to proste!



// bonus!


// a wracając do tematu control flow analysis...

declare const naPewnoŁosoś: ŁosośNorweski

let cokolwiek // any
cokolwiek = naPewnoŁosoś
cokolwiek
// nie może być nic innego

// https://media.tenor.com/images/9f005edb649e847cc9250fbce91d4b23/tenor.gif
