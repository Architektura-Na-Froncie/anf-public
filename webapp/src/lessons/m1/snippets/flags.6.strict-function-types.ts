export {}

interface Human {
  name: string
}
declare let human: Human

interface Developer extends Human {
  languages: string[]
}
declare let developer: Developer

interface TaxiDriver extends Human {
  drive(): void
}
declare let taxiDriver: TaxiDriver

interface WebDeveloper extends Developer {
  cutPhotoshopIntoHTML(): void
}
declare let webDeveloper: WebDeveloper

declare function processHuman(h: Human): void
declare function processDeveloper(d: Developer): void
declare function processWebDeveloper(d: WebDeveloper): void
declare function processTaxiDriver(td: TaxiDriver): void

function appEngine(
  processFn: (d: Developer) => void,
  dev: Developer
) {
  processFn(dev)
}


appEngine(processDeveloper, developer) // ✅
appEngine(processHuman, developer) // ✅
appEngine(processWebDeveloper, developer) // ❌



// INNY PRZYKŁAD - kontrawariancja na prymitywach (nie obiektach)


// na starcie wszystko przechodzi, bo akurat OperationType i AccountOperation są strukturalnie takie same
// ale po jakimś czasie OperationType zostaje rozbudowane:
// 🤓 zakomentuj "przed" + odkomentuj "po"

// przed:
type OperationType = "LOAN" | "INVESTMENT"
// po:
// type OperationType = "LOAN" | "INVESTMENT" | "INCOME" | "OUTCOME"

declare const operations: OperationType[]

type AccountOperation = "LOAN" | "INVESTMENT"

const isAccountOperationValid = (operation: AccountOperation) => true // some logic

// operations.filter oczekuje: (value: OperationType) -> bool
// czyli OperationType jest na pozycji KONTRAwariancyjnej
// i jak przekażemy funkcję, której parametr jest PODTYPem (isAccountOperationValid) to lipton
// w praktyce - dlaczego?
//    Bo array będzie karmił callbacka takimi wartościami: "LOAN" | "INVESTMENT" | "INCOME" | "OUTCOME"
//    A funkcja umie obsłużyć jedynie takie: "LOAN" | "INVESTMENT"
//    "INCOME" | "OUTCOME" _potencjalnie_ wybuchną w runtime
operations.filter(isAccountOperationValid)

// wyjaśnie komunikatów błędów:
//  Overload 1 of 2,  Overload 2 of 2, [...] - Array.filter ma 2 overloady, więc TS czarno na białym wyświetla nam wszystkie swoje próby. A nie pasuje mu żaden overload -> i stąd błąd.

// TypeScriptowy komunikat błędu - odwrócenie:

//    Argument of type '(operation: AccountOperation) => boolean' is not assignable to parameter of type '(value: OperationType, index: number, array: OperationType[]) => value is OperationType'.
// 🤔 tu jest pierwotna kolejność: AO is not assignable to OT
//      Types of parameters 'operation' and 'value' are incompatible.
// 🤔 przechodzimy przez pozycję KONTRAwariancyjną
//        Type 'OperationType' is not assignable to type 'AccountOperation'.
//          Type '"INCOME"' is not assignable to type 'AccountOperation'.
// 🤔 i mamy "odwróconą" kolejność: OT is not assignable to AT
// 🤔 komuuniat, oczywiście, jest poprawny. Ale to odwrócenie w komunikacie potrafi być kłopotliwe
// 🤔 jeśli w swoich komunikatach błędów widzisz to odwrócenie - to właśnie przeszłaś/edłeś przez pozycję kontrawariancyjną. To powinno dużo podpowiedzieć przy debugowaniu.
