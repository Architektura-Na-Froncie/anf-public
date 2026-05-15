export {}
// kopia z pliku z generykami

type GenericFn = <T>(a: T, b: T) => { a: T, b: T }
type ParametrizedFn<T> = (a: T, b: T) => { a: T, b: T }

declare let parametrizedFn: ParametrizedFn<string>
declare let genericFn: GenericFn


parametrizedFn = genericFn
  // parametrizedFn musi obsłużyć stringi
  // a że genericFn obsłuży COKOLWIEK - to da radę
genericFn = parametrizedFn // ❌
  // genericFn musi obsłużyć cokolwiek
  // ale parametrizedFn potrafi obsługiwać tylko stringi
    // Type 'T' is not assignable to type 'string'
