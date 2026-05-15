export {}

// 1. GENERYCZNE TYPY, INTERFEJSY, KLASY

// typ generyczny T jest WYMAGANY
type Storage<T> = {
  data: T[]
  add(t: T): void
}
interface IStorage<T> {
  data: T[]
  add(t: T): void
}

class StorageClass<T> {
// class StorageClass<T> implements Storage { // ❌ trzeba podać T
// class StorageClass<T> implements IStorage { // ❌ trzeba podać T
// class StorageClass<T> implements Storage<T> { // ✅
// class StorageClass<T> implements IStorage<T> { // ✅
  constructor(
    public data: T[]
  ){}

  add(t: T){
    this.data.push(t)
  }
}
const storage = new StorageClass(['ANF'])



// 2. GENERIC CONSTRAINTS (obostrzenia)

class AnotherStorage<T > {
  constructor(
    public data: T[]
  ){}

  add(t: T){
    this.data.push(t)
  }

  findById(id: string){
    return this.data.find(item => item.id == id) // ❌
    // nic nie gwarantuje, że `id` istnieje
  }
}
const anotherStorage = new AnotherStorage(['ANF'])
const element = anotherStorage.findById('95c5a122-6973-4139-98ea-7e23f3ea3546')
// no chyba, że dodamy generic constraint: `extends { id: string }`




// 3. GENERYCZNE FUNKCJE

const genericArrow = <T>(a: T, b: T) => ({ a, b })
function combineFn<T>(a: T, b: T){
  return { a, b }
} // return type: { a: T, b: T }

// generyk może być INNY dla każdego WYWOŁANIA
// (nie jest stały dla funkcji)
const combinedStrings = combineFn('a', 'b') // { a: string, b: string }
const combinedNumbers = combineFn(1, 2) // { a: number, b: number }




// 4. 🔥 GENERYCZNE FUNKCJE         vs      funkcja ze SPARAMETRYZOWANYM TYPEM
//      (każde wywołanie ma inny generyk)
//                                          (generyk jest stały dla funkcji)


     type GenericFn = <T>(a: T, b: T) => { a: T, b: T }
type ParametrizedFn<T> = (a: T, b: T) => { a: T, b: T }

declare let _parametrizedFn: ParametrizedFn // ❌ musi mieć z góry znane T
declare let parametrizedFn: ParametrizedFn<string>
declare let genericFn: GenericFn //  nie musi, bo każde wywołanie może mieć inne T

parametrizedFn('ANF', 'ANF') // ✅ miał być string
parametrizedFn(125, 125) // ❌ miał być string
genericFn('ANF', 'ANF') // ✅ cokolwiek
genericFn(125, 125) // ✅ cokolwiek




// jeden wspólny generyk na poziomie klasy
class GenerykKlasy<T> {
  constructor(
    public data: T
  ){}

  metoda1(another: T){
    return this.data == another
  }

  metoda2(another: T){
    return this.data === another
  }
}
const obiektA = new GenerykKlasy('ANF')
obiektA.metoda1('ANF')
obiektA.metoda1(125) // ❌ zgodnie z oczekiwaniami
obiektA.metoda1(true) // ❌ zgodnie z oczekiwaniami
// może nie ma to większego sensu 😅
// ale jest 1 wspólny generyk dla całej klasy


// 1 generyk na poziomie klasy
// a inny na poziomie wywołania
class GenerykiWywolan<T> {
  constructor(
    public data: T
  ){}

  metoda1<T>(another: T){
    return this.data == another
  }

  metoda2<T>(one: T, another: T){
    return this.data === another
  }
}

const obiektB = new GenerykiWywolan('ANF')
obiektB.metoda1('ANF')
obiektB.metoda1(125)
obiektB.metoda1(true)

// wniosek:
// definiując generyki świadomie decydujmmy:
// czy mają być stałe dla całej klasy
// czy różne dla każdego wywołania

