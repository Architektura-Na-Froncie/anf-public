// 1. TYPEOF 

import { Currency, Employee } from "./types"

var config = {
  API: "http://host/path/to/api",
  token: "jw3t-4w4j-5t04-5jt0-445t-fe98",
  locale: "en-us",
  language: "en",
  currency: "USD" as Currency,
  modules: ["admin", "orders", "stock"],
  excessiveAttribute: 'additional field'
}

type Config = typeof config



// 2. KEYOF

type KeysOfConfig = keyof Config
// ... a teraz dodajmy pole do obiektu `config`




// 3. LOOKUP

// na typie obiektowym
type Module = Config // ['modules'] // [number]

// na arrayu/krotce
const tuple = ["PLN", 125, true] as const

type Pierwszy = typeof tuple[0]
type Drugi = typeof tuple[1]
type Dowolny = typeof tuple[number]
type SpozaZakresu = typeof tuple[3] // ❌ zgodnie z oczekiwaniami




// 4. RETURN TYPE

function producePerson() {
  return {
    name: "John Lennon",
    age: 40,
    city: "Liverpool"
  }
}

type Person = ReturnType<typeof producePerson>

// ... a teraz dodajmy coś do literału zwracanego z funkcji



// 5. TYPY MAPOWANE

// zdefiniuj typ EmployeeCard, który zawiera jedynie 'firstName', 'lastName' i 'title'

type EmployeeCard = Pick<Employee, 'firstName' | 'lastName' | 'title'>

const johnCard: EmployeeCard = {
  "firstName": "John",
  "lastName": "Lennon",
  "title": "JavaScript Developer",
}

// zdefiniuj typ EmployeeOfficial, który zawiera wszystko POZA polem `salary`

type EmployeeOfficial = Omit<Employee, 'salary'>
const officialJohn: EmployeeOfficial = {
  "id": '10a961c7-cb1c-4486-8d89-e3e2b055650a',
  "firstName": "John",
  "lastName": "Lennon",
  "title": "JavaScript Developer",
}

// ... a teraz zmieńmy coś w definicji Employee
