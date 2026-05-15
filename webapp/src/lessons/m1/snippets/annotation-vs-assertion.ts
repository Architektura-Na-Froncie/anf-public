export {}

interface Human {
  name: string
}
declare let human: Human

interface Developer extends Human {
  languages: string[]
  code(): void
}
declare let developer: Developer

interface TaxiDriver extends Human {
  drive(): void
}
declare let taxiDriver: TaxiDriver

// Osoba jest albo developerem albo kierowcą (albo i jednym i drugim!)
type Person =
  | Developer
  | TaxiDriver


// funkcja - potrzebny developer, który pomoże naprawić komputer z windowsem
function pomozMiZWindowsem(developer: Developer){
  developer.code()
}

// fabryka ludzi ¯\_(ツ)_/¯ co za czasy
const producePerson = (): Person => {
  if (Math.random()){
    return {
      name: "Zbychu",
      drive(){ console.log('vroom!') }
    }
  } else {
    return {
      name: "Krzychu",
      languages: ['TypeScript'],
      code(){ console.log('klepu klepu!') }
    }
  }
}


// 👍 anotacja sprawdza kompatybilność
const p1: Person = producePerson() // miał być person i jest person
const p2: Developer = producePerson() // 👍 słusznie, bo nie wiadomo czy będzie Person

// 🔥 asercja pozwala przypisać podtyp lub nadtyp
const p3 = producePerson() as Person // (niepotrzebnie) "rzutujemy" Person na Person
const p4 = producePerson() as Developer // 😳 ale lipa!

pomozMiZWindowsem(producePerson())
pomozMiZWindowsem(producePerson() as Developer) // 😳 ale lipa!

// wniosek:
// anotacje są bezpieczne (na tyle na ile definicje typu są precyzyjne)
// a z asercjami trzeba bardzo ostrożnie, bo jeśli się pomylimy, to przepuścimy babole do runtime'u
