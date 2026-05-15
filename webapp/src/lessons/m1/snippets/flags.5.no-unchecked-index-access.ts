import { Employee } from "./types"

const john: Employee = {
  'id': '7eb67e83-8475-4843-ac74-b6ebcd1e63e6',
  'firstName': 'John',
  'lastName': 'Lennon',
  'salary': 10000,
  'title': 'musician'
}

// index signature

type EmployeeMap = {
  [key in Employee['id']]: Employee
}
const employeeMap: EmployeeMap = {
  [john.id]: john
}

const employeeFromMap = employeeMap['7eb67e83-8475-4843-ac74-b6ebcd1e63e6']

// record

type EmployeeRecord = Record<Employee['id'], Employee>
const employeeRecord: EmployeeRecord = {
  [john.id]: john
}

const employeeFromRecord = employeeRecord['7eb67e83-8475-4843-ac74-b6ebcd1e63e6']


// przydaś 🙃
const randomIdx = (length: number) =>
  Math.floor( Math.random() * length )

// poniższa funkcja przyjmuje kolekcję i zwraca domknięcie
// które każdorazowo "wyjmuje" jeden element z kolekcji - i go zwraca
// naturalnie, kolekcja się uszczupla, aż staje się pusta
// a wtedy na pewno NIE zwraca T, tylko undefined
// więc, summa summarum, powinno byc T | undefined
function randomItemOnceFrom<T>(collection: ReadonlyArray<T>){
  const itemsLeft = [...collection]
  return () => {
    const idx = randomIdx(collection.length)
    const spliceChunk = itemsLeft.splice(idx, 1)

    // jak możemy uchronić się przed błędem związanym z undefined?
    // 1. manualne akrobacje (czyt. type assertion) 🙃
    const element = spliceChunk[0] as T | undefined
    // 2. noUncheckedIndexedAccess + linijka poniżej
    // return spliceChunk[0]
  }
}
