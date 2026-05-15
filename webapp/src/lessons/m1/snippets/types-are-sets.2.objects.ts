export {}

interface Human {
  name: string
}
declare let someone: Human

interface Developer extends Human {
  languages: string[]
}
declare let developer: Developer

interface TaxiDriver extends Human {
  drive(): void
}
declare let taxiDriver: TaxiDriver

type DriverDeveloperIntersection = Developer & TaxiDriver




// kompatybilność

declare let ddIntersection: DriverDeveloperIntersection
ddIntersection = developer
ddIntersection = taxiDriver
// 🤔 dlaczego rzuca błąd?
// jakie wyrażenie spełniłoby oczekiwania?

type DriverDeveloperUnion = Developer | TaxiDriver

declare let ddUnion: DriverDeveloperUnion
ddUnion = developer
ddUnion = taxiDriver
// 🤔 a to dlaczego przechodzi?




// jakie pola są dostępne na unii?
declare let unionObject: DriverDeveloperUnion
// unionObject.

// a jakie na przecięciu?
declare let intersectionObject: DriverDeveloperIntersection
// intersectionObject.



// część wspólna jest ROZDZIELNA (distributive) względem unii

// (A ^ B) v C == to samo

// (A v B) ^ C == A ^ C v B ^ C // rozdzielność

type Employee = Developer | TaxiDriver
type FlyingEmployee = Employee & { fly(): void }
// (Developer & { fly(): void; }) | (TaxiDriver & { fly(): void; })

