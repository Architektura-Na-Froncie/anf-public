export { }

// 1. PRYMITYWY

// skoro `let`, to może się zmienić, więc rozszerzamy do string
let napis1 = 'napis'

// skoro `const`, to prymityw (!) się nie zmieni, więc zawężamy do literału
const napis2 = 'napis'

const prawda = true
const falsz = false


const napisRozszerzonyPrzezAnotacje: string = 'napis'


// 2. OBIEKTY

type Currency = "EUR" | "PLN"

type Payment = {
    amount: number
    currency: Currency
}

const payment1 = {
  amount: 1000500100900,
  currency: "EUR" // string, bo TS nie zakłada, że to enum
}
// trzeba mu powiedzieć
const payment2 = {
  amount: 1000500100900,
  currency: "EUR" as Currency
}
// albo
const payment3: Payment = {
  amount: 1000500100900,
  currency: "EUR"
}



// 3. ZAGNIEŻDŻONE OBIEKTY

type Order = {
    date: Date
    payment: Payment
}

const obj = {
    date: new Date(),
    payment: {
        amount: 10.56,
        currency: "PLN"
    } // as Payment
} // as const

const order: Order = obj
// domyślnie zagnieżdżony obiekt rozszerzy pola prymitywów
// w związku z czym, TS uzna, że próbujemy przypisać za szeroki typ (string) do węższego (tylko "EUR" i "PLN" ale żaden inny)
// opcja 1: as Payment
// opcja 2: as const



// 4. LITERAŁY OBIEKTÓW

// wnioskowanie dotyczy miejsca deklaracji
const tuBedaStringi = [] // tu kompilator musi coś postanowić 🤨
tuBedaStringi.push(true)
tuBedaStringi.push(125)



const items = [
  { key: "A", value: 1 },
  { key: "B", value: 2 },
  { key: "C", value: 3 },
]
const result3 = items.reduce((acc, item) => {
  acc[item.key] = item.value
  return acc
}, {}) // tu jest wnioskowanie - widać jedynie {}
type Result = { [key: string]: number }
// opcja 1 - {} as Result
// opcja 2 - reduce<Result> (rekomendowana, bo explicit)



// 5. FUNKCJE

// bez kontekstu
const add = (a, b) => a + b // any any
const result1 = [1,2,3,4].reduce(add) // nadal any any

// z kontekstem
const result2 = [1,2,3,4].reduce((a, b) => a + b) // number number

// typ wynikowy
const czasemDaSieOkreslic = (a, b) => '' + a + b



// 6. ZEWNĘTRZNE ŹRÓDŁA DANYCH (nieznane w runtime)

const getSomeData = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/albums')
  const data = await response.json()
  return data.hejaho[1000500100900].Kaboom()[Math.random()].iWszystkoSieZgadza
}
// a wynik to i tak Promise<any> 😅


// więcej tu: http://ducin.it/typescript-type-inference-guide
