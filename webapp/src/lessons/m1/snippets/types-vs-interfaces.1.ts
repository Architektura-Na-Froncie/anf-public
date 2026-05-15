export {}
// objects

interface Human {
  name: string
}

type Person = {
  name: string
}

// primitives

type MyNumber = number
var n1: MyNumber = 5

interface _MyNumber extends Number {}
var n2: _MyNumber = 2



// PODOBIEŃSTWA

// - oba mają nazwy w przestrzeni typów. W przypadku błędu, kompilator wyświetli nazwy w obu przypadkach
var h: Human = {}
var p: Person = {}
// no chyba że podamy typ anonimowy, to nie ma się do czego odwołać
var x: { name: string } = {}

// - oba można rozszerzać

interface Worker extends Human {
  company: string
}
interface _Worker extends Person {
  company: string
}
// można także tworzyć typy rozszerzające
type __Worker = Person & {
  company: string
}
const w: __Worker = {}


// - oba można implementować

class FactoryWorker implements Human {
  name: string = "John"
}

class _FactoryWorker implements Person {
  name: string = "John"
}

// RÓŻNICE

// - nie mogę unii jako interfejsu

type Payment =
  | { type: "TRANSFER" }
  | { type: "LOAN" }
interface BankPayment extends Payment {} // ❌
// An interface can only extend an object type or intersection of object types with statically known members.

// - nie mogę conditional types jako interfejsu
  // wynik zaaplikowania typu do conditional type (który zwraca konkretny typ) - tak; ale bezpośrednio generyczny conditional - nie
type Debt<T> = T extends { debt: number } ? { debt: number, due: Date }: never
type PrivateDebt = Debt<{ id: number, debt: number }> // evaluated to Debt<T>

interface _Payment extends PrivateDebt {}
interface __Payment<T> extends Debt<T> {}// ❌
// An interface can only extend an object type or intersection of object types with statically known members.

  // typy mogą obsługiwać struktury, których pola nie są znane z góry własnie dlatego, że nie są keszowane. To logiczne. Nie mogę w pełni skeszować czegoś, czego jeszcze nie znam. A w przypadku typów - nie są keszowane, więc i problemu nie ma

// - typy nie obsługują declaration merging (a interfejsy tak) - to ważne dla autorów bibliotek

interface DefaultRootState {
  defaultData: number
}

interface DefaultRootState {
  myAppData: string
}

const state: DefaultRootState = {} // ❌ missing: defaultData, myAppDatats
// dla typów: ❌ Duplicate identifier
