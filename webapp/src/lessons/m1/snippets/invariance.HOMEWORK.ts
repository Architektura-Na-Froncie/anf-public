// inwariancja

// znowu mamy relację: nadtyp / typ / podtyp
declare const baseProperty: Base<PropertyKey> // najszerszy typ
declare const baseStringNumber: Base<string | number>
declare const baseString: Base<string> // najwęższy typ

// i funkcję, która oczekuje typu "środkowego"
function doSomething(base: Base<string | number>){
  base.add(1, "yo")
}


// zdefiniujmy typ obiektowy Base, który będzie miał metody wykorzystujące T
// ale nie jako metody `get(): T` tylko jako arrows: `get: () => T`
interface Base<T> {
  get: () => T // covariant position
  add: (a: T, b: T) =>  void // contravariant position
}

// i wywołania:
doSomething(baseProperty) // nadtyp, contravariant - fails
doSomething(baseStringNumber) // typ, invariant - always passes
doSomething(baseString) // podtyp, covariant - fails


// co się dzieje?
// T jest JEDNOCZEŚNIE na "covariant position" i "contravariant position"
// co to oznacza? (patrz nazwa pliku)
