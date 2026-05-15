export {}

declare const expr: 0 | 1 | 2 | false | true | null | "" | "elo"
declare const bool: boolean

// type guard
if (expr){
  expr
}

// short curcuit operators
const exprOr = expr || bool // zatrzymuje się na boolu, odsiewa falsy values ze zbioru
const exprAnd = expr && bool // jeśli expr falsy, zatrzymuje się, jeśli truthy - bierze boolean

// type narrowing
let a
a = 1
a.toFixed()
a = 'anf'
a.toUpperCase()
a = []
a.length
