// PRACA DOMOWA - przeanalizuj i wyjaśnij jak działa poniższy typ UnionToIntersection

// https://stackoverflow.com/a/50375286

type UnionToIntersection<U> = 
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

type DataUnion =
  | { data: string | number }
  | { data: string | boolean }

let u: DataUnion
u = { data: 'yo' } // ✅
u = { data: true } // ✅
u = { data: 125 } // ✅

type DataIntersection = UnionToIntersection<DataUnion>

let i: DataIntersection
i = { data: 'yo' } // ✅
i = { data: true } // ❌ Type 'boolean' is not assignable to type 'string'.
i = { data: 125 } // ❌ Type 'number' is not assignable to type 'string'.
