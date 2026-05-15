export {}
// ogólnie dla & oraz | kompatybilność sprawdzana jest po kolei dla kazdego membera. Zaś dla interfejsów - jako całość, bo interfejs ma skeszowany kształt

interface Human {
  name: string
}

type Person = {
  name: string
}

interface WorkerInterface extends Person {
  company: string
}

type WorkerType = Person & {
  company: string
}
const w_i: WorkerInterface = {} // odwołuje się od razu do WorkerInterface (ma jego skeszowaną zawartość)
// Type '{}' is missing the following properties from type 'WorkerInterface': company, name
const w_t: WorkerType = {} // odwołuje się do elementów źródłowych tego typu (najpierw wspomina o Person), co wydłuża kompilację, bo trzeba najpierw sprawdzić wszystkie składowe
// Type '{}' is not assignable to type 'WorkerType'.
//  Property 'name' is missing in type '{}' but required in type 'Person'.





// w związku z tym, jeśli można, to:

// 1. prefer base types over unions (if possible)
  // argument has to be compared to each element of the union. For a two-element union, this is trivial and inexpensive.

// before:
type _Developer = Human & {
  languages: string[]
}

type _TaxiDriver = Human & {
  drive(): void
}

// sprawdzając występowanie w argumencie funkcji wymaganych pól, albo sprawdzanie nadmiatowych pól itp - w przypadku unii trzeba porównywać z każdym typem z osobna
function _employ(employee: _Developer | _TaxiDriver){}

// after:
interface Developer extends Human {
  languages: string[]
}

interface TaxiDriver extends Human {
  drive(): void
}

// sprawdzając kompatybilność argumentu funkcji, porównujemy go z prostym typem
function employ(employee: Human){}



// 2. prefer interfaces over intersections
  // Interfaces create a single flat object type that detects property conflicts
  // Intersections on the other hand just recursively merge properties

interface speaksSpanish {
  speakSpanish(): void
}

interface speaksFrench {
  speakFrench(): void
}

// before:
type _InternationalWorker = Human & speaksSpanish & speaksFrench
// after:
interface InternationalWorker extends Human, speaksSpanish, speaksFrench {}
// const i: InternationalWorker = {}

// jakie to ma znaczenie? Jeśli używasz wielu generyków, zwłaszcza zagnieżdżonych i wszystko robisz na przecięciach i uniach, to kompilacja może coraz bardziej zwalniać
